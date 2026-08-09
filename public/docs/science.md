# CoreSense — The Science

Every number below lives once in [`packages/heat-core/src/constants.ts`](../packages/heat-core/src/constants.ts) and is mirrored in the C++ firmware. This document states the methods exactly, with citations, so a technical judge can verify them against the source papers.

**Framing (non-negotiable):** CoreSense **estimates heat _strain_** and produces an **advisory**. It is not a clinical thermometer. See [`limitations.md`](limitations.md).

---

## 1. ECTemp — core-temperature estimation from heart rate (Buller 2013)

ECTemp treats core temperature (CT) as the hidden state of an extended Kalman filter driven by heart-rate observations. The observation model is a published population quadratic relating expected HR to CT, and the filter is a scalar EKF run once per 60 s on a 60-second aggregate HR.

### 1.1 Observation model

```
HR = B2·CT² + B1·CT + B0        (HR in bpm, CT in °C)
```

with the **published coefficients**:

| Coefficient | Value | Note |
|---|---|---|
| `B2` | **−4.5714** | **negative** — dropping the sign inverts the parabola |
| `B1` | **384.4286** | |
| `B0` | **−7887.1** | **negative** |

The observation Jacobian (used to linearize the update) is:

```
c = dHR/dCT = 2·B2·CT + B1 = −9.1428·CT + 384.4286
```

### 1.2 Noise parameters — the single most important detail

| Parameter | Symbol | Value | Meaning |
|---|---|---|---|
| Process noise SD | `GAMMA` | 0.022 °C/min | a **standard deviation** |
| Process **variance** | `GAMMA2` | **0.000484** °C²/min | `= 0.022²` — **this is what the filter adds** |
| Measurement noise SD | `SIGMA` | 18.88 bpm | population HR↔CT regression scatter |
| Measurement **variance** | `SIGMA2` | **356.4544** bpm² | `= 18.88²` |

> **The γ-variance trap.** `gamma = 0.022` is a *standard deviation*. The Kalman prediction step must add the **variance** `gamma² = 0.000484`, not `0.022`. Using `0.022` as the variance is wrong by ~45× and silently destroys convergence — the filter never tightens, the confidence band never narrows, and RED can never legitimately fire. This is guarded by the golden-trace convergence test and by having the constant exist in exactly one place.

> **`SIGMA` is not sensor noise.** 18.88 bpm is the scatter of the *population* HR-to-CT regression, not the MAX30102 signal-to-noise ratio. Do not substitute a sensor spec.

### 1.3 The exact EKF (per 60 s, scalar state `{ct, v}`)

In matrix notation this is a **one-state** filter, not a two-state temperature/velocity model:

```
x_k = A·x_(k-1) + w_k       A = [1]       Q = [0.000484] °C²
z_k = h(x_k) + n_k          R = [356.4544] bpm²
h(x) = −4.5714x² + 384.4286x − 7887.1
H(x) = dh/dx = [−9.1428x + 384.4286]
```

`ct` is the one-element state vector; `v` is its covariance, not a second physiological state. The persistent mutable implementation is therefore **two float32 values = 8 bytes**. Counting the seven float constants as RAM as well gives the conservative 36-byte state-plus-constants figure, but compile-time constants normally reside in flash or registers.

```
PREDICT
    ct_pred = ct_prev                      // random-walk state model
    v_pred  = v_prev + GAMMA2              //        = v_prev + 0.000484

UPDATE (only if a valid 60 s HR is available)
    c    = 2·B2·ct_pred + B1               // Jacobian at the prediction
    K    = (v_pred·c) / (c²·v_pred + SIGMA2)          // Kalman gain
    innov= HR_obs − (B2·ct_pred² + B1·ct_pred + B0)   // innovation
    ct   = ct_pred + K·innov
    v    = (1 − K·c)·v_pred

CONFIDENCE
    covariance_halfwidth = 1.96·√v         // nominal model-uncertainty ribbon
```

If no valid HR is available for the minute (motion, poor contact), the filter runs **predict-only**: `ct` is held and `v` grows by `GAMMA2`. The model-uncertainty band widens automatically and the system becomes more conservative — it never fabricates an observation. This is implemented exactly in [`ectemp.ts`](../packages/heat-core/src/ectemp.ts). The `1.96√v` ribbon is a nominal EKF covariance band under the model assumptions, not an empirically calibrated 95% coverage claim for Malaysian workers.

### 1.4 Field initial conditions (not the paper's lab seed)

The paper example seeds the filter at `CT0 = 37.1 °C` with `v0 = 0`. In the field we cannot claim certainty in an unmeasured baseline, so CoreSense intentionally uses a **diffuse** seed and a convergence gate:

| Constant | Value | Purpose |
|---|---|---|
| `CT0` | **37.0 °C** | resting prior |
| `V0` | **0.75** °C² | diffuse initial variance (wide band at cold start) |
| `CONVERGENCE_V` | **0.08** | require `v < 0.08` (95% band ≈ ±0.55 °C) before any RED |

Requiring convergence before escalation **kills cold-start false alarms** and is the honest-about-uncertainty behavior shown in the demo: the ribbon starts wide and narrows over ~15 sim-minutes.

### 1.5 Cadence

Exactly **one EKF update per 60 s**, on a **60-second trimmed-mean HR**. The MAX30102 is sampled internally at 100–400 Hz for beat detection, then decimated to a per-minute HR. The update is **not** run at the raw sample rate.

That one-minute aggregation is the implemented estimator cadence; it is not evidence that every person has a fixed physiological HR-to-core-temperature delay of exactly 60 seconds.

---

## 2. PSI — Physiological Strain Index (Moran 1998)

A corroborating 0–10 strain scalar combining core-temperature rise and heart-rate rise from baseline:

```
PSI = 5·(CT − CT0)/(39.5 − CT0) + 5·(HR − HR0)/(180 − HR0),   clamped to [0, 10]
```

with reference maxima `PSI_CT_MAX = 39.5 °C` and `PSI_HR_MAX = 180 bpm`, and per-worker resting baselines `CT0`, `HR0`. PSI is shown as a **secondary corroboration** in the UI; it does not by itself drive the RED trigger.

---

## 3. WBGT — Wet-Bulb Globe Temperature (ISO 7243:2017)

The environmental heat-stress index, computed by the site node.

```
Outdoor / solar load:   WBGT = 0.7·Tnwb + 0.2·Tg + 0.1·Tdb
Indoor / no solar:      WBGT = 0.7·Tnwb + 0.3·Tg
```

where `Tnwb` = natural wet-bulb, `Tg` = globe, `Tdb` = dry-bulb. The outdoor/indoor branch is auto-selected on a solar flag (default `Tg − Tdb > 4 °C`), and the flag is stored so the choice is auditable. Implemented in [`wbgt.ts`](../packages/heat-core/src/wbgt.ts).

### 3.1 Stull natural-wet-bulb fallback (labelled)

When a wetted-wick `Tnwb` is unavailable, we estimate the psychrometric wet-bulb from dry-bulb and RH using Stull (2011):

```
Tw = T·atan(0.151977·√(RH + 8.313659)) + atan(T + RH) − atan(RH − 1.676331)
     + 0.00391838·RH^1.5·atan(0.023101·RH) − 4.686035
```

The Stull result is the **psychrometric (aspirated)** wet-bulb, which under sun runs **1–3 °C below** the true *natural* wet-bulb. So in Stull mode we add a conservative offset (`STULL_NWB_OFFSET = 1.5 °C`) toward `Tnwb`, and the advisory is **never allowed to de-escalate** on a Stull-derived number. Every such WBGT carries a permanent **"WBGT-indicative"** label.

### 3.2 ISO 7726 natural-convection globe conversion (for a DIY globe)

The standard globe is 150 mm; a frugal DIY globe (e.g. a 40 mm painted ball) is not. Mean radiant temperature is a property of the *environment*, so we (a) compute MRT from the small globe using the ISO 7726 natural-convection relation, then (b) invert the same relation for a 150 mm globe (bisection) to report the equivalent standard-globe temperature:

```
MRT = [ (Tg+273.15)^4 + (2.5e7/ε)·(|Tg−Tdb|/D)^0.25 · (Tg−Tdb) ]^0.25 − 273.15
```

with `D` in metres and `ε = 0.95`. At `D = 150 mm` this reduces to the familiar standard form, so the correction is a no-op for a reference globe and only adjusts DIY globes. `globe_diameter_mm` is site configuration, never hardcoded.

There is **no universal 40 mm or 50 mm correction factor**. The result depends on the observed small-globe temperature, dry-bulb temperature, emissivity, diameter and convection regime. Under the current natural-convection implementation, for an illustrative `Tdb = 32 °C`:

| Small-globe `Tg` | 40 mm → equivalent 150 mm | Additive delta | 50 mm → equivalent 150 mm | Additive delta |
|---:|---:|---:|---:|---:|
| 35 °C | 35.348 °C | +0.348 °C | 35.281 °C | +0.281 °C |
| 40 °C | 41.042 °C | +1.042 °C | 40.843 °C | +0.843 °C |
| 45 °C | 46.763 °C | +1.763 °C | 46.426 °C | +1.426 °C |

These are deterministic scenario calculations, not calibration claims. Outdoor air movement can change the convective balance materially. Until air speed is measured and a prototype is co-located against a traceable 150 mm instrument, the output stays labelled **WBGT-indicative**. ISO 7243 defines the WBGT assessment; ISO 7726 covers the measuring-instrument quantities. ISO 7726:2025 superseded the withdrawn 1998 edition, and a controlled copy must be reviewed before claiming conformity to the 2025 text.

---

## 4. The canonical RED trigger (ship exactly this, everywhere)

RED is **dual-gated AND convergence-guarded**. Implemented in [`zones.ts`](../packages/heat-core/src/zones.ts).

```
Convergence gate (latched): the filter must have reached v < 0.08 at least once
                            before ANY escalation above green (kills cold-start RED).

RED   iff  CT_est ≥ 38.5 °C  AND  (CT_est − 1.96·√v) ≥ 38.0 °C  AND  currently v < 0.08
AMBER iff  CT_est ≥ 38.0 °C
GREEN otherwise

Hysteresis:  leave RED only below 38.3 °C;  leave AMBER only below 37.8 °C.
```

The RED lower-bound gate (`CI-lower ≥ 38.0`) means the system **won't cry wolf while uncertainty is high** — e.g. during a sensor dropout the ribbon balloons, the lower bound drops below 38.0, and RED is withheld even if the point estimate spikes. The convergence and hysteresis terms prevent flapping.

**Fusion is at the advisory layer only:** `final_zone = max(env_zone, band_zone)`. The environment sets a **floor**; an individual band can escalate a worker *upward* (the early-warning novelty) but can **never de-escalate** below the environmental advisory.

---

## 5. Work–rest thresholds (ACGIH / NIOSH)

Work–rest ceilings are shipped as an **editable config table** ([`packages/config/thresholds.json`](../packages/config/src/thresholds.json)) seeded with representative, publicly-cited values and an explicit `standard` field (`"ACGIH-representative (configurable per site)"`). The copyrighted tables are never redistributed; each site configures its own limits. An unacclimatized penalty (`unacclimatizedPenaltyC = 2.5 °C`) and ACGIH clothing adjustment factors are applied to measured WBGT before lookup.

---

## 6. Validation summary

Against synthetic ground truth (the golden trace), the EKF reproduces the reference to `< 1e-4 °C` on the firmware, converges within ~15 sim-minutes, and shows bias ≈ −0.03 °C / RMSE ≈ 0.32 °C — consistent with the Buller literature. See [`limitations.md`](limitations.md) for the validation *domain* (active/military cohorts) and where the method under-reads (at rest).

---

## References

1. **Buller MJ, Tharion WJ, Cheuvront SN, Montain SJ, Kenefick RW, Castellani J, Latzka WA, Roberts WS, Richter M, Jenkins OC, Hoyt RW.** "Estimation of human core temperature from sequential heart rate observations." *Physiological Measurement* **34**(7):781–798, 2013.
2. **USARIEM.** US Patent **US20140180027A1**, "Estimation of human core temperature based on heart rate system and method." (Coefficient cross-check.)
3. **ISO 7243:2017.** Ergonomics of the thermal environment — Assessment of heat stress using the WBGT index.
4. **ISO 7726:2025.** Ergonomics of the thermal environment — Instruments for measuring physical quantities. Published October 2025; supersedes the withdrawn 1998 edition. The current code uses the documented natural-convection heat-balance relation and does not claim full 2025 conformity.
5. **Stull R.** "Wet-bulb temperature from relative humidity and air temperature." *Journal of Applied Meteorology and Climatology* **50**(11):2267–2269, 2011.
6. **Moran DS, Shitzer A, Pandolf KB.** "A physiological strain index to evaluate heat stress." *American Journal of Physiology* **275**(1):R129–R134, 1998.
7. **ACGIH** TLVs and BEIs (heat stress and heat strain); **NIOSH** Criteria for a Recommended Standard: Occupational Exposure to Heat and Hot Environments (2016). Referenced for work–rest structure; representative values only, configured per site.
