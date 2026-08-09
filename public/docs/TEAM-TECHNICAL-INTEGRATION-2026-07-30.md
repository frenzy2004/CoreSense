# CoreSense cross-team technical integration

**Prepared for:** Hongshen, Phi, Muthu and Icy  
**Evidence date:** 30 July 2026  
**Release label:** integrated software candidate; physical and field validation open

This report turns the four workstreams into one product contract. “Prepared” means the math, software contract or test plan exists in this checkout. It does not mean a wearable, enclosure, battery, message provider, WBGT instrument or field outcome has been independently proven.

## 1. System decision

The band estimates personal heat strain locally and sends only derived, pseudonymous scalars. A site node measures environmental heat. The gateway joins those two authorities, writes RLS-scoped evidence, and the dashboard shows the action, acknowledgement, rest/escalation and outcome. The worker screen cannot declare the site safe until a current fused-site downlink exists.

| Boundary | Format | Privacy and authority rule |
|---|---|---|
| PPG/accelerometer → band algorithm | local samples only | Raw waveforms remain on the device and are discarded after quality/aggregation |
| Band → gateway | 20-byte binary ESP-NOW packet + CRC-8 | Anonymous 3-byte band ID, sequence, uptime, derived strain/zone/battery/quality/ECTemp/CI only |
| Site node → gateway | 23-byte binary ESP-NOW packet + CRC-8 | Site environment only; no worker identity |
| Gateway → ingest | schema-validated JSON over authenticated HTTPS | JSON belongs here, where debuggability is worth the overhead |
| Database → dashboard/export | signed-in site membership under RLS | Random worker code maps to metrics; names, national IDs and phone numbers are absent from worker telemetry |

## 2. Hongshen — estimator, globe and mechanical proof

### 2.1 Exact Buller scalar EKF

The published model has one hidden state, core temperature:

```
x_k = A x_(k-1) + w_k       A = [1]       Q = [0.000484] °C²
z_k = h(x_k) + n_k          R = [356.4544] bpm²
h(x) = -4.5714x² + 384.4286x - 7887.1
H(x) = [-9.1428x + 384.4286]
```

Each minute: hold the predicted CT, add `Q` to variance, calculate the Jacobian, calculate the scalar gain, apply the HR innovation, then update variance with `(1 − K·H)P`. The mutable state is `CT` plus `P`: two float32 values or **8 bytes**. The often-quoted **36 bytes** counts those two values plus seven float constants as if all nine floats were RAM-resident. On an ESP32-C3, compile-time constants normally live in flash/registers.

The paper’s example initializes at `37.1 °C, v=0`; CoreSense deliberately uses `37.0 °C, v=0.75 °C²` because a field prior is not a measured core temperature. RED is convergence-gated. One-minute HR is an aggregation/update cadence, not evidence of a universal 60-second physiological lag.

The TypeScript and C++ implementations already mirror these constants, and the new `pnpm engineering:test` gate locks `A`, `Q`, `R`, memory accounting and the field/paper distinction.

### 2.2 Small black globe: calculation, not a fixed factor

ISO 7243:2017 defines the WBGT assessment. A non-standard globe conversion is an instrument heat-balance problem associated with ISO 7726. CoreSense currently uses the natural-convection relation:

```
MRT = [(Tg + 273.15)^4 + (2.5e7/epsilon)(|Tg-Tdb|/D)^0.25(Tg-Tdb)]^0.25 - 273.15
```

The implementation obtains MRT from the small globe, then numerically solves for the 150 mm globe temperature with the same MRT. At `Tdb=32 °C`, emissivity `0.95`, natural-convection assumption:

| Small reading | 40 mm equivalent / delta | 50 mm equivalent / delta |
|---:|---:|---:|
| 35 °C | 35.348 / +0.348 °C | 35.281 / +0.281 °C |
| 40 °C | 41.042 / +1.042 °C | 40.843 / +0.843 °C |
| 45 °C | 46.763 / +1.763 °C | 46.426 / +1.426 °C |

Therefore no single multiplier can be written on the enclosure. Air velocity is a critical missing input under outdoor forced/mixed convection. The site node remains “WBGT-indicative” until it is co-located against a traceable 150 mm reference across sun, shade, wind and wet-bulb conditions. ISO 7726:2025 is the current published edition; a controlled copy must be reviewed before a conformity claim.

### 2.3 Mechanical architecture and proof route

Use a rigid, ribbed serviceable pod plus a replaceable TPU 95A strap/bumper/seal. TPU absorbs impact and fits the wrist; it should not carry the PCB/battery fastener loads. The rigid pod needs filleted ribs, load-aligned standoffs, a sealed display window, dark PPG optical baffle, sweat drainage and a guarded charge interface. Keep carbon-filled material away from the ESP32 antenna and reserve an unfilled RF window.

Material selection must be coupon-led:

| Part | Prototype candidate | Why | Blocked claim |
|---|---|---|---|
| Strap/bumper/seal | TPU 95A | Compliance and impact isolation | Skin safety, sweat/cleaner durability and bend life unverified |
| Rigid pod, early | PETG or ASA | Printable toughness and serviceable iteration | Heat/UV/creep/ingress still need testing |
| Rigid pod, later | PC or PA-CF after coupons | Higher stiffness/temperature potential | RF attenuation, moisture, anisotropy and process control unverified |

No CAD/mesh/solver result exists in this checkout yet, so FEA/CFD is not claimed. Freeze PCB/battery/display geometry, create the parametric enclosure, test printed coupons in three orientations, then use measured properties for strap-lug/pod structural loads. A separate thermal model must cover direct sun, radio TX, display/backlight and charging. Physical pull, drop, sweat, ingress and RF tests remain the acceptance authority.

### 2.4 ELEGOO Centauri Carbon 2 TPU preparation

Use the machine’s TPU profile and the spool data sheet, not one universal internet profile. ELEGOO lists TPU as supported; its Centauri Carbon 2 Combo procedure requires the flexible-filament adapter/PTFE path and disconnecting CANVAS before TPU loading. Power off/unplug before changing that path. Start with a dried manufacturer spool, print flow/retraction/bend coupons, record the complete slicer profile and lot, then print the strap. ELEGOO Rapid TPU 95A publishes a 200–230 °C nozzle range, but another TPU must follow its own sheet.

## 3. Phi — radio, privacy, cloud and alert spine

### 3.1 Do not send JSON over ESP-NOW

The existing fixed binary packets are the correct decision: band `20 B` (8.0% of the ESP-NOW v1 250-byte body) and site `23 B` (9.2%). JSON would add keys, parsing and allocation without improving radio delivery. Keep version, message type, sequence, uptime and CRC. Add application-level ACK, bounded retry with jitter, sequence de-duplication, callback serialization, and measured packet-loss/latency counters. MAC-layer delivery success is not end-to-end evidence that the gateway stored the reading.

### 3.2 Anonymized-by-design data model

The current schema’s design direction is correct: `workers` carry a random code and site/consent state; telemetry references opaque UUIDs; raw HR/PPG fields are absent; site membership and RLS scope access; consent triggers block unauthorized telemetry. Identity, if a pilot needs it at all, should live in a separate access domain controlled by the host—not in CoreSense telemetry. Keep exports site-scoped and pseudonymous, enforce retention/deletion, and log access and purpose changes.

Database QC currently verifies eight invariants: RLS, security-invoker analytics, consent enforcement, privacy-column absence, safety constraints, service-role separation, gateway RPC execution and ACK-only alert mutation. The local ingest check also proves that replaying an identical batch adds zero duplicate telemetry/WBGT rows. Deployment proof is still required against the actual production project.

### 3.3 n8n/Twilio capacity and failure design

Twilio documents a default WhatsApp sender throughput of 80 messages/second; eligible text senders may request higher throughput, while messages over the rate are queued and the queue has a maximum age. Those are provider limits, not a design capacity promise. Unique-recipient messaging tiers and quality limits are separate constraints.

If n8n is used, run queue mode with Redis/workers for horizontal execution, but do not make an n8n workflow the safety record. The database needs an idempotent outbox with alert ID, worker/site pseudonym, template/version, attempt, status, provider SID, timestamps, last error and acknowledgement. Workers claim jobs, apply bounded retry/backoff and dead-letter persistent failures; provider callbacks reconcile delivery. Dashboard/haptic/supervisor procedures remain available when WhatsApp is delayed or unavailable.

Capacity test: replay the largest credible site burst plus retry traffic, demonstrate no duplicate worker notifications, retain every transition, and measure p50/p95/p99 enqueue-to-provider and provider-to-delivery time. Production throughput is the lowest verified limit across Supabase, webhook ingress, n8n workers, Redis, provider sender and destination policy.

### 3.4 PCB architecture gate

Freeze the schematic only after peak-current and pin budgets are explicit: protected LiPo path, charger/power-path decision, efficient 3.3 V regulator, bulk/local decoupling at ESP32/display/PPG, PPG optical layout, accelerometer, haptic driver with flyback protection as applicable, battery measurement, debug pads, ESD protection and antenna keep-out. TP4056 alone is not a regulator or complete power-path solution. Review the PCB against enclosure fasteners, PPG window, strap loads, service access and RF window before ordering.

## 4. Muthu — firmware, motion and shift runtime

### 4.1 Honest motion-artifact pipeline

The current firmware has useful first-line rejection: IR contact floor, plausible BPM bounds, rejection of large beat-interval jumps, a four-sample rolling average and a per-minute trimmed mean. It does **not** yet perform motion cancellation because no accelerometer signal enters the filter.

Add a synchronized LIS2DH12-class stream and build quality gating in layers:

1. remove DC/baseline and band-limit the PPG channel;
2. compute accelerometer magnitude/high-pass energy in the same windows;
3. detect PPG peaks only when morphology and refractory rules pass;
4. lower quality or reject windows where acceleration energy and spectral overlap indicate motion;
5. aggregate only accepted beats; if insufficient, call the EKF predict-only and widen uncertainty;
6. never let skin temperature “confirm” an unsafe estimate into a clinical fact or override environmental escalation without validation.

Benchmark against a reference chest strap/ECG during rest, walking, lifting, tool vibration, sweat and direct sun. Report MAE, coverage/dropout, false beat rate and alert impact across skin/contact conditions. Compare current rules, median/low-pass, acceleration gate and any adaptive filter on the same held-out sessions.

### 4.2 Ten-hour power proof

ESP32-C3 datasheet figures include about 130 µA light sleep under stated chip conditions and TX peaks up to about 335 mA depending on mode. They do not include the assembled display, PPG LEDs, haptic motor or conversion losses. With 20% reserve, maximum measured average current for ten hours is:

| Cell | Maximum full-device average |
|---:|---:|
| 250 mAh | 20 mA |
| 400 mAh | 32 mA |
| 650 mAh | 52 mA |
| 1000 mAh | 80 mA |

Instrument the battery rail and capture idle, PPG sampling, screen active/dim, radio send/retry, amber haptic, red haptic and worst concurrent peak. Integrate energy over a representative ten-hour trace, then repeat across cell tolerance and hot conditions. Brownout, regulator thermal headroom, charge time, protection and ageing are separate pass gates.

### 4.3 Worker GUI contract

The current watch GUI is a real firmware surface and has source/firmware parity checks. Keep the hierarchy: action first, personal state second, quality/freshness visible, acknowledgement reachable with gloves. Green must say “BAND OK / FOLLOW SITE ADVICE” until a versioned, fresh fused-site packet and disconnect timeout are implemented. Physical sunlight, sweat, motion, haptic and glove-use tests remain open.

## 5. Icy — one dashboard and one buyer story

Icy’s dashboard now needs to show the cross-team proof without turning open work into green status. The commercial story is defensible when it is phrased as: a privacy-limited heat-strain advisory and audit trail that helps Malaysian employers demonstrate monitoring, communicated action, acknowledgement and follow-through under their own competent OSH process. It is not regulator approval, clinical diagnosis, certified WBGT or ESG assurance.

The pilot offer should benefit both parties: the host receives a site heat-risk baseline, workflow gap map, bounded dashboard/evidence configuration, training/drill report and a de-identified findings brief; CoreSense receives consented, purpose-limited validation data and usability/reliability evidence. Existing controls stay authoritative in a shadow-first phase.

Icy’s go/no-go view must keep four states distinct:

- **Calculated in software:** Buller constants, packet sizes, globe scenarios, battery current envelopes.
- **Implemented locally:** dashboard, RLS/consent schema, export evidence, band estimator/watch GUI.
- **Needs physical proof:** motion performance, battery runtime, enclosure, radio, site node and display/haptics.
- **Needs external approval:** host, worker/ethics route, independent reviewer, legal/OSH applicability, supplier/commercial agreement.

## 6. Acceptance sequence

1. Keep `pnpm engineering:test`, core unit tests, protocol/firmware diffs, database invariants, typecheck and production build green.
2. Freeze schematic and enclosure interfaces; print coupons and a non-worn engineering unit.
3. Validate PPG plus acceleration and power on the bench; implement radio ACK/retry and fused downlink.
4. Co-locate the site node with a traceable 150 mm reference across relevant airflow/solar conditions.
5. Complete worker-rights, site, ethics/research and emergency-process approvals.
6. Run a shadow pilot; no CoreSense output changes existing work/rest or emergency decisions.
7. Independently review scientific, hardware, data-governance and commercial evidence before a bounded active phase.

## 7. Primary references

- Buller et al. (2013), *Estimation of human core temperature from sequential heart rate observations*, DOI 10.1088/0967-3334/34/7/781: https://www.researchgate.net/publication/239948087_Estimation_of_human_core_temperature_from_sequential_heart_rate_observations
- ISO 7243:2017 current catalogue status: https://www.iso.org/standard/67188.html
- ISO 7726:2025 current catalogue status: https://www.iso.org/standard/78238.html
- Espressif ESP-NOW programming guide: https://docs.espressif.com/projects/esp-idf/en/v5.2/esp32c3/api-reference/network/esp_now.html
- Espressif ESP32-C3 datasheet: https://documentation.espressif.com/esp32-c3_datasheet_en.pdf
- Analog Devices MAX30102 datasheet: https://www.analog.com/media/en/technical-documentation/data-sheets/MAX30102.pdf
- STMicroelectronics LIS2DH12 product specification: https://www.st.com/content/st_com/en/products/mems-and-sensors/accelerometers/lis2dh12.html
- Twilio WhatsApp best practices and rate guidance: https://www.twilio.com/docs/whatsapp/best-practices-and-faqs
- n8n queue mode: https://docs.n8n.io/hosting/scaling/queue-mode/
- ELEGOO Centauri Carbon 2 TPU procedure: https://wiki.elegoo.com/en/centauri-carbon-2-combo/how-to-print-tpu
