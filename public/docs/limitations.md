# CoreSense — Limitations & Honesty Boundary

This is the document a skeptical judge should read first. CoreSense is deliberately honest about what it is and is not. Every limitation below is surfaced as a **first-class UI element**, not buried as a disclaimer.

**The one sentence that governs everything:** CoreSense **estimates heat _strain_ from heart rate**; it does **not measure core temperature clinically**. It is an **occupational screening and advisory** tool.

---

## 1. What ECTemp is validated on — and where it under-reads

The Buller (2013) ECTemp method was developed and validated on **active and military cohorts** — people moving, exerting, and sweating. Its accuracy claims live in that domain.

- **Under-reads at rest.** The observation model maps *elevated, exertion-driven* heart rate to core temperature. At true rest, or when HR is elevated by something other than heat/exertion (caffeine, stress, arrhythmia, fever from illness), the estimate is less reliable and tends to **under-read** rising core temperature. CoreSense is positioned for **working** crews, and the convergence gate plus the wide diffuse prior make it conservative before it has earned confidence.
- **Accuracy envelope.** In its validated domain the method achieves roughly **±0.3 °C RMSE** (bias near zero). That is excellent for a wrist-worn, non-invasive estimate driving a work/rest decision — and nowhere near clinical thermometry. We report the confidence interval on *every* estimate rather than a single false-precision number.
- **Population model, not per-person calibration.** The HR↔CT quadratic and its scatter (`SIGMA = 18.88 bpm`) are *population* statistics. Individuals deviate. The 95% ribbon exists precisely because the point estimate is not the whole story.

**Not a medical device.** CoreSense is **not** a diagnostic or clinical device and makes no medical claim. It is occupational heat-strain **screening + advisory** only. It does not detect heat stroke, replace medical judgment, or substitute for a clinical core-temperature measurement.

---

## 2. Wrist PPG is noisy — and how we handle it honestly

Optical heart-rate at the wrist (MAX30102) is genuinely noisy: motion artifact, poor skin contact, perfusion changes, and ambient light all corrupt the signal. We do **not** pretend otherwise. Four mitigations, all visible:

1. **Signal-quality gating.** Each minute carries an `hr_quality` (0–100) confidence. Low-quality minutes are down-weighted or rejected outright before the EKF update.
2. **Predict-only on bad data.** When no valid HR is available, the filter runs predict-only: it **holds** the estimate and **grows the variance** by `GAMMA2`. It never fabricates a heartbeat.
3. **Confidence band, always.** The dashboard ribbon widens when data is poor and narrows when it is good. Uncertainty is shown, not hidden.
4. **Dual-gate on the lower bound.** RED requires the *lower* CI bound to clear 38.0 °C, so a noisy spike with a wide band cannot trip a red alert.

---

## 3. WBGT is "WBGT-indicative," not a certified reading

The site node measures WBGT with frugal parts, so its output is labelled **"WBGT-indicative"** everywhere — never presented as a certified instrument reading.

- **DIY globe ≠ 150 mm reference.** A small painted globe is not a standard 150 mm black globe. We apply the ISO 7726 diameter correction to report an *equivalent* standard-globe temperature, but this is an approximation, and the label says so.
- **Stull fallback biases low.** When a wetted-wick natural wet-bulb is unavailable, the Stull estimate gives the *psychrometric* wet-bulb, which under sun runs **1–3 °C below** the true natural wet-bulb. In Stull mode we add a conservative offset and the advisory is **never allowed to de-escalate** — a low-biased input can only make us *more* cautious, never less.
- **Direction of error is chosen to be safe.** Where we must approximate, we approximate toward caution.

---

## 4. The environmental-fallback kill-criterion

This is the honest pivot that makes the whole system trustworthy. If the individual (band) signal cannot be trusted — sustained low `hr_quality`, dropout, or a ballooning confidence band — CoreSense **does not guess a core temperature.** It falls back to an **environmental Exposure Index** driven by the site WBGT and the ACGIH/NIOSH work–rest advisory for that worker's metabolic class.

- The affected worker is visibly switched to **Environmental mode** on the dashboard.
- The advisory floor still protects them via `final_zone = max(env_zone, band_zone)`.
- The system degrades to a *known-good, environment-only* product rather than emitting a confident-but-wrong individual number.

This is a deliberate kill-criterion: **when in doubt, stop trusting the individual estimate and protect the worker with the environment.**

---

## 5. Privacy stance

Privacy is enforced by construction, not by promise (see [`architecture.md`](architecture.md) §4):

- Only **derived, anonymized scalars** leave the band. No raw HR field and no PPG waveform in the ESP-NOW packet.
- The database has **no `hr` column** and **no name/IC/phone columns** on workers — the raw and identifying data are not representable.
- Workers are anonymized codes (`W-01`); re-identification lives outside the database.
- **RLS** isolates sites; the dashboard's anon key is structurally unable to write telemetry.
- Consent is captured before a worker is provisioned.

---

## 6. Phase-0 scope honesty

- **Band firmware is real** and diff-tested against the TypeScript reference to `< 1e-4 °C`.
- **The gateway and WBGT site-node are simulated** in Phase 0. Their real firmware and a 3D-printed WBGT station are an explicit Phase-1 hardware extension. We do not claim the physical station exists yet.
- **Time is compressed** in the demo; whenever it is, an **"Accelerated 30×"** badge is shown. We never fake response speed.

---

## 7. Emergency coordination is simulated and fall detection is unvalidated

- Weather APIs are planning and warning inputs. **On-site WBGT remains authoritative** for current heat exposure, and provider data never issues an automatic worker command.
- The MPU6050 detects wrist motion and possible-fall features only. It cannot detect rain, flood, earthquake or other natural hazards. Flood-feed automation is `NOT_VERIFIED`.
- Sitewide commands use approved bilingual templates and provisioned site/zone/crew assignments. The current milestone writes immutable simulated commands and per-band receipts; **physical downlink is locked**.
- A wrist algorithm can miss falls or confuse normal manual work with a fall. Every result is labelled **possible fall** and `DEMO_UNVALIDATED_V1`; synthetic traces are not field validation.
- Manual SOS and possible-fall incidents enter the in-app supervisor/HSE queue. They do not contact WhatsApp, 999 or another external service, and the watch must not claim help is coming until a site responder acknowledges the incident.
- The haptic motor is pulsed, never held continuously on. GY-521 current, radio retry peaks, screen-on draw, vibration draw and full-shift runtime remain `NOT_MEASURED` until tested on the assembled prototype.

---

## Summary table

| Claim we DO make | Claim we do NOT make |
|---|---|
| Estimates heat **strain** from HR | Measures core temperature clinically |
| ±≈0.3 °C RMSE **in active workers** | Accurate at rest / for febrile illness |
| Occupational **screening + advisory** | Medical diagnosis or heat-stroke detection |
| **WBGT-indicative** environment index | Certified WBGT instrument reading |
| Confidence-banded, conservative under doubt | A single precise number to trust blindly |
| Private by schema (no raw HR, anonymized) | Storing or transmitting identifiable physiology |
| Real band firmware, diff-tested | Real gateway/site-node hardware (Phase-1) |
| Simulated command/incident audit trail | Physical fleet downlink or public emergency dispatch |
| Synthetic possible-fall state-machine tests | Validated wrist fall-detection sensitivity/specificity |
| Versioned battery design calculation | Measured ten-hour assembled-device runtime |
