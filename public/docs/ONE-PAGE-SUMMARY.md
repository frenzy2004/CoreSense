# CoreSense — heat risk workers can act on

**Asian Action Hackathon 2026 · Theme 3: Heat Health**  
**Prototype integration brief · 4 August 2026**

## Problem statement

Heat strain is personal, dynamic, and often invisible until a worker is already impaired. A site-level WBGT reading can describe the environment, but it cannot show how one person is responding to workload, acclimatisation, clothing, hydration, and recovery. Supervisors also need more than another graph: they need a clear action, a reliable escalation path, and a timestamped record of what was detected and what response followed.

Current gaps are operational as much as technical:

- workers may miss early physiological strain while continuing physical work;
- a single ambient threshold cannot represent every worker;
- raw physiological surveillance can damage trust and increase privacy risk; and
- alerts without acknowledgement, recovery tracking, or an audit trail are difficult to manage and defend.

## Solution overview

CoreSense is an action-first worker band plus site intelligence system. The ESP32-C3 band uses MAX30102 heart-rate data to run the published Buller ECTemp estimator locally, carries the model uncertainty forward, and converts the result into three instructions: **BAND OK**, **CAUTION**, or **REST NOW**. Skin temperature and local air temperature/humidity are shown as separate measurements; they are not presented as clinical core temperature.

The new worker interface is designed for a **1.28-inch, 240 × 240 round GC9A01A TFT**. An MPU6050/GY-521 motion interrupt wakes the prototype when the worker raises their wrist; the gyro is enabled only briefly to confirm the turn. A button tap wakes the screen or acknowledges RED, a hold of at least 650 ms changes page, and the display switches off after 10 seconds. Repeating haptics continue during an unacknowledged RED alert even while the screen is off.

## How the system works

**Sense → Estimate → Decide → Act → Record**

1. **Sense:** minute heart-rate aggregate, skin temperature, local air/RH, and site WBGT.
2. **Estimate:** on-device ECTemp extended Kalman filter with a visible uncertainty band.
3. **Decide:** personal strain and environmental exposure are evaluated conservatively; missing or stale inputs never become a silent green.
4. **Act:** the worker receives text, shape, colour, and haptic instructions; supervisors receive the higher-level alert and response workflow.
5. **Record:** pseudonymous derived metrics, alert state, acknowledgement, and recovery events form an exportable audit trail. Raw PPG does not leave the band.

## Why this approach matters

- **Individual plus environmental:** personal heat-strain evidence complements WBGT instead of replacing it.
- **Works at the edge:** the worker still receives an action when internet service is unavailable; ESP-NOW avoids one SIM per band.
- **Privacy by construction:** the radio packet carries derived, pseudonymous scalars—not raw PPG or a worker name.
- **Operationally legible:** the smallest screen prioritises the next safe action, while detailed trends and evidence stay on the supervisor dashboard.
- **Built for accountable pilots:** construction, plantations, utilities, logistics, and municipal field teams can test the same measurable safety workflow.

## Evidence boundary

The algorithm implementation, simulator, dashboard, round-GUI contract, firmware build path, and versioned power model are local engineering evidence. **NOT_MEASURED:** physical display readability, false wrist wakes/misses, GY-521 module current, glove/button usability, 10-hour assembled runtime, ingress/sweat durability, clinical accuracy in the target workforce, field effectiveness, and legal or certification compliance. CoreSense is a safety decision-support prototype—not a clinical thermometer, medical device, DOSH approval, or ESG assurance.

**Technical references:** Buller MJ et al., *Physiological Measurement* 34(7):781–798 (2013), DOI 10.1088/0967-3334/34/7/781 · ISO 7243:2017 · TDK MPU-6000/MPU-6050 product specification and register map · Adafruit 1.28-inch 240 × 240 round GC9A01A guide.
