# CoreSense — Architecture

CoreSense is a three-part system joined by one shared algorithm package. This document covers the parts, the end-to-end data flow, the single-source-of-truth pattern, the privacy architecture, and the ESP-NOW/Wi-Fi radio constraint that shapes the whole edge design.

---

## 1. The three parts

```
┌──────────────────────┐      ┌──────────────────────┐      ┌──────────────────────────────┐
│  1. THE BAND         │      │  2. THE SITE NODE    │      │  3. DASHBOARD + ALERT SPINE  │
│  (worn, real fw)     │      │  (fixed, simulated)  │      │  (cloud + local)             │
│                      │      │                      │      │                              │
│  ESP32-C3            │      │  ESP32               │      │  Supabase (Postgres,         │
│  MAX30102 PPG        │      │  globe + wet + dry   │      │   Auth, Realtime,            │
│  SHT31 skin/amb      │      │  temperature probes  │      │   Edge Functions)            │
│  vibration motor     │      │                      │      │  Next.js 15 dashboard        │
│  ACK button          │      │  computes WBGT       │      │  alert-relay (LOCAL)         │
│  round GUI + LiPo    │      │  (ISO 7243)          │      │  WPPConnect (LOCAL, optional)│
│                      │      │                      │      │                              │
│  on-device:          │      │  on-device:          │      │  - RLS-scoped reads          │
│   60 s HR → ECTemp   │      │   Tnwb/Tg/Tdb → WBGT │      │  - realtime site-wall        │
│   EKF → PSI → zone   │      │   + Stull fallback   │      │  - WhatsApp on amber/red     │
│   → haptics          │      │   + globe correction │      │  - DOSH/ESG compliance log   │
└──────────┬───────────┘      └──────────┬───────────┘      └──────────────┬───────────────┘
           │  ESP-NOW (2.4 GHz, connectionless)                            │
           └──────────────┬──────────────┘                                 │
                          ▼                                                 │
                 ┌─────────────────┐        HTTPS POST (x-api-key)          │
                 │  GATEWAY        │ ───────────────────────────────────────┘
                 │  (simulated)    │        /functions/v1/ingest
                 │  ESP-NOW ⇄ WiFi │
                 └─────────────────┘
```

**1. The band** — an ESP32-C3 wristband. A MAX30102 optical sensor detects heartbeats; the firmware forms a 60-second trimmed-mean HR, runs the ECTemp EKF, computes PSI, evaluates the dual-gated zone state machine, and drives haptics, a tap/hold button, an MPU6050 prototype wrist-wake path, and a 1.28-inch 240 × 240 round GC9A01A display. It transmits **only derived, anonymized scalars** over ESP-NOW. The band does not yet receive a site downlink, so green is labelled **BAND OK / FOLLOW SITE ADVICE**, never an unconditional safe-to-work decision. **This firmware is real** and diff-tested against the TypeScript reference; the display wiring, wrist classifier, GY-521 current, enclosure and full-shift runtime remain hardware gates.

The product now has a controlled supply architecture. Rev A keeps an exact
ESP32-C3FH4X-based custom electronics target, the auditable power tree, MAX30102
prototype path and current firmware. Rev A-HQ is the preferred Huaqiangbei
cost-down experiment: qualified display, enclosure, strap, lens/seals, charging
contacts and battery mechanics wrap around that controlled PCB. A 1.43-inch
AMOLED is a separate Rev B redesign, and a complete third-party smartwatch PCBA
is evaluation-only. The canonical decision record is
`hardware/sourcing/huaqiangbei-wearable-catalog.json`; supplier selection,
marketplace price, compatibility and field performance are not yet verified.

**2. The site node** — a fixed WBGT station: a matte-black globe (radiant load), a wetted-wick natural wet-bulb, and a shielded dry-bulb, read by an ESP32. It computes WBGT (ISO 7243) with a Stull natural-wet-bulb fallback and an ISO 7726 globe-diameter correction for a non-standard DIY globe. **In Phase 0 this node is simulated**; the simulator emits a diurnal WBGT curve. Real site-node firmware and a 3D-printed station are a Phase-1 extension.

**3. The dashboard + alert spine** — Supabase (Postgres + Auth + Realtime + Edge Functions) is the cloud backbone; a Next.js 15 dashboard gives supervisors a live site-wall, per-worker core-temp ribbons, the fused advisory, one-click compliance export, and a Hazard Command Center. The latter combines measured WBGT, official MET Malaysia warnings/earthquakes, coordinate-based planning forecasts, approved bilingual command simulations, per-band virtual receipts, and an in-app SOS/possible-fall response queue. The existing **local** `alert-relay` can turn heat-alert rows into supervisor WhatsApp messages; the new emergency-coordination workflow remains in-app/mock and does not contact WhatsApp or 999.

### Emergency coordination path (simulation milestone)

```text
MET Malaysia warning/earthquake + Open-Meteo forecast     measured site WBGT
                             \                              /
                              Hazard Command Center
                                      |
                   authorized supervisor selects fixed EN/MS action
                                      |
                   one immutable safety_command + SHA-256 receipt
                                      |
                    50 independent virtual command_receipts
                                      |
                 round device preview receives same simulation tick

MPU6050 derived fall features or five-second SOS
                                      |
                         in-app incident queue only
                                      |
              acknowledge -> assign responder -> resolve/false alarm
```

There is deliberately no command decoder in the physical radio protocol for this
milestone. `simulation_only = true` and `physical_transmission = false` are stored
with every command. ESP-NOW encrypted-peer limits, replay protection, gateway
fan-out, RF latency, offline handling, and field procedures must be resolved before
physical downlink can be enabled.

---

## 2. Data flow

### Telemetry path (band → dashboard)

```
 Band                 Gateway            Ingest Edge Fn        Postgres           Dashboard
 ────                 ───────            ─────────────         ────────           ─────────
 MAX30102 beats
   │ 60 s trimmed-mean HR
   ▼
 ECTemp EKF ─► PSI ─► zone
   │ (strain_score, core_temp_est,
   │  core_temp_ci, alert_state,
   │  hr_quality, batt_pct, env_mode)
   ▼ encode BandPacket (20 B, CRC8)
 ESP-NOW ───────────► decode + batch
                      WBGT from site   ─► HTTPS POST {readings[], wbgt}
                      node                 header x-api-key
                                          ─────────────────► verify sha256(key)
                                                             == devices.api_key_hash
                                                             resolve worker_code→id
                                                             INSERT telemetry
                                                             INSERT wbgt_readings
                                                             INSERT alert ON state
                                                               transition (dedup_key)
                                                                    │
                                                                    ▼ logical replication
                                                             supabase_realtime publication
                                                                    │ postgres_changes
                                                                    ▼
                                                             RealtimeProvider updates
                                                             Map<worker_id, latest>,
                                                             rAF-batched render
```

Key properties:

- **The band does the physics.** The EKF runs on the wrist; the cloud only stores and displays derived numbers. The dashboard's analytics import the _same_ `@coresense/heat-core` functions, so any recomputation matches the band exactly.
- **Alerts fire only on an escalating transition** (green→amber, amber→red, green→red), never on every sample. Each carries a `dedup_key` of the form `worker:level:YYYYMMDDHH`; an `ON CONFLICT DO NOTHING` upsert means at most one alert per worker/level/hour. Hourly re-notification is intentional and documented.
- **Realtime requires two things**: the table must be in the `supabase_realtime` publication (migration `0003`), and `alerts`/`telemetry`/`breaks` carry `replica identity full` so RLS-filtered UPDATE payloads (e.g. an ack) include the columns the dashboard filters on. Without both, the socket connects but never fires.

### Alert path (alert → WhatsApp)

```
 Postgres alerts INSERT
   │ Supabase Realtime (INSERT on alerts)
   ▼
 alert-relay (LOCAL Node process)
   │ dedup
   ├── ALERT_TRANSPORT=mock  ──► no external call; dashboard renders a
   │                              pixel-accurate WhatsApp bubble from the
   │                              same realtime stream (fully deterministic)
   └── ALERT_TRANSPORT=wppconnect ──► POST http://localhost:21465/api/{session}/send-message
                                       { phone, message }  (token auth, QR-linked session)
                                       message built from i18n_strings keyed (level, locale)
                                            │
                                            ▼
                                    supervisor's WhatsApp
                                            │ reply "ACK"/"OK"/"DONE"
                                            ▼
                                    ack-listener → alerts.acked_at set → dashboard row greens
```

**Why the relay is local, not a cloud function:** WPPConnect drives a real WhatsApp Web session and only runs on `localhost`; a Supabase Edge Function in the cloud cannot reach it. So the relay subscribes to Supabase Realtime from the demo machine and dispatches locally. A `notify-supervisor` cloud stub is kept for portability but is not the demo path. `pg_cron` re-notifies an unacked RED after a threshold, guarded so it fires exactly once.

---

## 3. The single-source-of-truth pattern

```
                         packages/heat-core/src/constants.ts
                         (B2,B1,B0, GAMMA2, SIGMA2, CT0, V0,
                          convergence + zone thresholds)
                                       │
              ┌────────────────────────┼────────────────────────┐
              ▼                        ▼                         ▼
     packages/heat-core         apps/simulator            firmware/lib/
     ectemp.ts, zones.ts,       forward-model.ts          coresense_common/
     wbgt.ts, psi.ts,           imports heat-core          ectemp.hpp (C++ mirror)
     advisory.ts                                                  │
              │                                                   │
              ▼                                                   ▼
     apps/web analytics                                  [env:native-test]
     (dashboard recomputes                               diff-tests C++ EKF ==
      identically)                                       heat-core golden trace
                                                         to < 1e-4 °C
```

Every magic number lives **once** in `packages/heat-core/src/constants.ts`. The simulator, the dashboard analytics, and the C++ firmware all derive their numbers from it (the firmware via a hand-mirrored `ectemp.hpp` whose equality is _asserted_ by a native test against `fixtures/golden-trace.json`). Consequences:

- The simulator can drive the entire stack — Supabase → realtime dashboard → WhatsApp → compliance log — **deterministically, with no hardware**.
- We can truthfully claim **"firmware == reference"** and **"the simulated numbers are the real-band numbers."**
- The highest-risk constant, the process **variance** `GAMMA2 = 0.000484` (not the SD `0.022`), exists in exactly one place and is guarded by the golden-trace convergence test.

The `@coresense/config` package layers on top: site-configurable ACGIH/NIOSH work–rest thresholds are **data** (`thresholds.json`), not hardcoded logic, so a site sets its own limits without touching the algorithm.

---

## 4. Privacy architecture

Privacy is **structural**, not a policy promise — the raw data is simply never representable.

**Only derived scalars leave the band.** The ESP-NOW `BandPacket` (20 bytes) carries `strain_score`, `alert_state`, `batt_pct`, `hr_quality`, `core_temp_est`, `core_temp_ci`, and a pseudonymous 3-byte device id. **There is no raw HR field and no PPG waveform field** — the beat-detection and the EKF run on the wrist and are discarded there.

**No raw HR/PPG column exists.** The `telemetry` table has `strain_score`, `core_temp_est`, `core_temp_ci`, `alert_state`, `hr_quality` (a 0–100 signal-confidence number, _not_ a heart rate), `batt_pct`, and `env_mode`. There is deliberately **no `hr` column** — the schema cannot store a heartbeat even if someone tried.

**Pseudonymized worker codes.** The `workers` table has `worker_code` (e.g. `W-01`) and no `name`/`IC`/`phone` columns. Stable codes and longitudinal physiology remain linkable personal data, so this is not anonymous. Supervisor contact details for alerts live in a separate `worker_contacts` table (phone + locale) and are kept out of alert rows; any worker-code-to-person mapping belongs in a separately controlled host domain.

**RLS enforces site isolation.** A `security-definer` helper `is_site_member(site_id)` backs a `SELECT` policy on every table; a supervisor sees only sites they belong to. Critically, **there is no anon/authenticated INSERT policy on `telemetry`** — the anon key shipped in the dashboard bundle is structurally unable to write. Only the service-role `ingest` Edge Function writes telemetry. Compliance/metrics are exposed as `security_invoker` views so RLS still holds through them.

```
 Wrist (discarded here)     ESP-NOW packet          Database
 ───────────────────        ──────────────          ────────
 PPG waveform        ✗ ──►  (not present)    ──►    (no column)
 raw heart rate      ✗ ──►  (not present)    ──►    (no hr column)
 identity/name       ✗ ──►  deviceId[3] only ──►    worker_code only
 core_temp_est       ✓ ──►  int16 ×100       ──►    core_temp_est numeric
 alert_state         ✓ ──►  uint8            ──►    alert_state enum
```

---

## 5. The ESP-NOW / Wi-Fi same-channel constraint

ESP-NOW is a connectionless 2.4 GHz protocol built on the Wi-Fi PHY. Its hard rule: **an ESP-NOW peer and any Wi-Fi station interface must operate on the same channel.** This shapes the edge design:

- **Bands are ESP-NOW-only.** They never join Wi-Fi and need no router or SIM per worker. Whole-device power and encrypted peer capacity remain physical architecture gates.
- **The gateway is the only bridge.** It runs ESP-NOW and Wi-Fi simultaneously. Because both share one radio, the gateway must **pin ESP-NOW to the channel its Wi-Fi association lands on** (or lock the AP to a fixed channel). If the router silently roams the gateway's Wi-Fi to a new channel, ESP-NOW peers on the old channel go deaf — the classic failure mode.
- **Wi-Fi power-save must be off on the gateway** (`WiFi.setSleep(false)`), or the modem naps and drops ESP-NOW frames.
- **In Phase 0 the gateway is simulated**, so the channel pinning is documented rather than exercised; it becomes a real firmware concern in the Phase-1 hardware bring-up. The band firmware that transmits over ESP-NOW is real.

Design implication: one internet uplink can serve a whole crew, but a 50-worker deployment must not assume one encrypted ESP-NOW peer table. ESP-NOW documents 20 peers total and a lower encrypted-peer ceiling depending on configuration. Freeze and soak-test either a multi-gateway topology (for example, bounded groups) or a reviewed application-authentication design before making a 50-band reliability/security claim.

---

## Component responsibilities (summary)

| Component | Real/Sim | Responsibility |
|---|---|---|
| `packages/heat-core` | Real | ECTemp EKF, PSI, WBGT, zones, advisory — SSOT |
| `packages/protocol` | Real | frozen ESP-NOW packet encode/decode + CRC8 |
| `packages/config` | Real | site-configurable thresholds (data) |
| `packages/i18n` | Real | string keys for en/ms/bn/ne |
| `apps/simulator` | Real sw | forward-model drives the stack, no hardware |
| `apps/web` | Real sw | RLS-scoped realtime dashboard |
| `apps/alert-relay` | Real sw | local Realtime→WhatsApp relay (mock default) |
| `supabase/functions/ingest` | Real | the only telemetry writer; x-api-key auth |
| Band firmware | **Real** | on-wrist physics + haptics + ESP-NOW |
| Gateway, site-node firmware | **Sim (P0)** | provided by the simulator in Phase 0 |
