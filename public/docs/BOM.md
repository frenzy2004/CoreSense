# CoreSense — Bill of Materials

Frugal-engineering claim, itemized. Prices are indicative single-unit retail in Malaysian Ringgit (RM) sourced from typical MY/SEA hobby-electronics suppliers; volume pricing is materially lower. Ranges reflect supplier and quality spread.

**Cloud/software cost can be near zero for a local demo:** Supabase free tier, the current local WPPConnect option and ESP-NOW avoid a SIM per worker. Production messaging, hosting, monitoring, support and approved WhatsApp routes must be quoted; they are not a zero-cost commercial assumption.

---

## Baseline per band (without display) — ~RM90–140

The worn wristband. One per worker.

| # | Component | Purpose | Indicative (RM) |
|---|---|---|---|
| 1 | **ESP32-C3** (DevKitM-1 prototype; ESP32-C3FH4X-based production target) | MCU + 2.4 GHz radio for on-wrist EKF and ESP-NOW TX | 12–22 |
| 2 | **MAX30102** PPG/pulse-oximeter breakout | optical heartbeat detection (raw PPG stays on-wrist) | 8–16 |
| 3 | **SHT31** temperature/humidity sensor | skin-side / ambient reference | 12–20 |
| 4 | **NTC thermistor** (10k) | supplementary skin-contact temperature | 1–3 |
| 5 | **LiPo cell** (~250–400 mAh) | battery | 8–15 |
| 6 | **TP4056** LiPo charger/protection module | USB charging + protection | 3–6 |
| 7 | **Coin vibration motor** + driver transistor | haptic amber-pulse / red-continuous alert | 3–6 |
| 8 | **Tactile button** | worker ACK | 0.5–1.5 |
| 9 | **PETG enclosure** (3D-printed) + strap | wrist-worn case | 6–12 |
| 10 | Passives, wiring, connectors | resistors, caps, JST, wire | 5–10 |
| | **Pre-display band subtotal** | | **~RM90–140** |

Notes: the MAX30102 samples internally at 100–400 Hz for beat detection; only a 60-second aggregate HR reaches the EKF and only derived scalars leave the band. This remains the evidenced, display-free cost baseline.

### Sensor and component decision record

| Function | Current / proposed selection | Decision | Proof still required |
|---|---|---|---|
| Wrist PPG | MAX30102 | Keep for prototype: documented I²C part, raw red/IR access and existing firmware support | High-exertion reference-HR comparison, skin-tone/contact coverage, sunlight and sweat |
| Motion / wrist wake | MPU6050 on GY-521 for the prototype; bare MPU6050 or a lower-power accelerometer for production | Use its motion interrupt for wake and enable the gyro only briefly to confirm a wrist turn. The current PPG filter still does **not** use acceleration for artifact cancellation | GY-521 module current, enclosure-axis calibration, false-wake/false-miss rate, synchronized PPG/acceleration dataset |
| Skin temperature | 10 kΩ NTC for cheap experiments; MAX30205-class part only if accuracy justifies it | Treat as independent corroboration/quality data, never a truth signal that vetoes environment or EKF without a validated fusion model | Contact pressure, lag, ambient leakage, calibration and false-alarm study |
| Ambient temperature/RH | Keep SHT31 during the current build | Do not switch to AHT20/SHT40 on unit price alone | Outdoor drift, condensation, shield response and supplier qualification |
| Worker MCU/radio | DevKitM-1 prototype; ESP32-C3FH4X-based production target | Keep the architecture; exact ordering code is mandatory because current C3 lifecycle status varies by variant. Fixed binary ESP-NOW packet is already 20 bytes | Application ACK/retry/loss test, coexistence, authorized-source traceability and assembled-antenna range |

### Huaqiangbei hybrid prototype track

CoreSense will use the Huaqiangbei wearable ecosystem as a **qualified parts and
mechanics source**, not as permission to replace the safety architecture with an
unknown smartwatch board. The current selected experiment is Rev A-HQ: reuse a
matching round display assembly, enclosure, strap, lens/seals and magnetic-charge
mechanics around the controlled ESP32-C3 PCB, power tree and sensors.

| Supply-chain item | Integrate now? | Required evidence before design-in |
|---|---|---|
| 1.28-inch GC9A01A display/FPC assembly | Sample | Controller, pinout, initialization, sleep/backlight current, sunlight and replacement path |
| Watch enclosure, TPU strap and lens/seals | Sample | STEP/2D drawings, skin/material statement, PPG contact, RF keep-out, drop/lug/ingress tests |
| Two-pin magnetic contact and cable | Sample | Pitch/polarity, short/reverse protection, temperature, corrosion and retention cycles |
| Protected 602030 pouch cell with NTC | Mechanical sample only | Manufacturer/lot, measured capacity, protection, transport/safety evidence and hot-enclosure charging; size code is not capacity |
| GH3026 or HX3605 PPG module | Adapter-board evaluation | Raw samples, full documentation, SDK/algorithm rights, optics, lifecycle, measured current and reference-HR study |
| GH3011 module | **No new design** | Current EOL risk; direct manufacturer correction required before reconsideration |
| 1.43-inch AMOLED kit | Separate Rev B investigation | Controller, memory, power, lifetime, UI and enclosure redesign |
| Complete RTL8762/8763-labelled PCBA | Benchmark only | Exact silicon, source build, raw sensor access, provisioning/security, radio migration, no-cloud and PCN/EOL proof |

Supplier identities, marketplace availability and the team-provided Taobao/1688
prices remain `NOT_VERIFIED`. The source phrases, part statuses and sample gates
live in `hardware/sourcing/huaqiangbei-wearable-catalog.json` and are checked by
`pnpm sourcing:test`; see `docs/HUAQIANGBEI-WEARABLE-SOURCING-GATE.md` for the RFQ.

### Display-equipped worker GUI — unpriced prototype delta

The approved worker GUI now assumes a **1.28-inch, 240 × 240 round GC9A01A SPI display**. Confirm the controller on the purchased module before assembly. Do not add the old ~RM115 midpoint to a commercial quote unchanged: the display, larger enclosure, battery impact, regulator sizing, assembly, and durability have not yet been supplier-quoted or field-tested.

| Added / changed item | Requirement | Commercial status |
|---|---|---|
| GC9A01A round display breakout | 3.3 V logic, 240 × 240, controllable backlight, sunlight/readability test required | Controller and quote pending |
| Backlight transistor + resistor | GPIO18 is control only; never power the LED directly from a GPIO | Quote pending |
| Regulated 3.3 V rail + local decoupling | Size for ESP32 radio + display peak current; place 0.1 µF and bulk capacitance near display | Electrical validation pending |
| Protected 1S 650 mAh LiPo with 10 kΩ NTC | First pack size that clears the versioned normal-shift model | Cell qualification and runtime test pending |
| BQ24074 power-path charger | Charge/load sharing with battery-temperature input | Charger thermal and enclosure test pending |
| TPS62840 3.3 V buck + inductor | Low-quiescent main rail sized above the ESP32-C3 radio peak | Layout and transient test pending |
| TPS7A0218 + I²C level shifter | Quiet 1.8 V MAX30102 core rail separated from the 3.3 V LED rail | Noise and signal-quality test pending |
| MAX17048 fuel gauge | Battery state without a continuously loaded low-value ADC divider | State-of-charge characterization pending |
| MPU6050 / GY-521 prototype | Accelerometer motion interrupt; brief gyro confirmation on GPIO20; button-only fallback if absent | GY-521 current and wrist classifier are NOT_MEASURED; production sensor decision pending |
| Enclosure window, sealing, and strap | Glove/button access, sweat, impact, ingress, and direct-sun thermal test | Mechanical validation pending |

The 1.28-inch display/enclosure/contact assembly may come from a Huaqiangbei
wearable supplier after qualification. This changes the mechanical source, not
the Rev A electrical interfaces or firmware contract. The proposed 1.43-inch
AMOLED assembly belongs to Rev B and is excluded from the power figures below.

**Power warning:** TP4056 is a Li-ion charger/protection module, not a 3.3 V regulator. A custom board needs a correctly sized regulated rail. A DevKitM-1 prototype may use its onboard regulator only after its current and thermal headroom are verified.

**Ten-hour battery gate:** the versioned normal-shift calculation currently models **43.18 mA** after conversion loss and 25% engineering margin, requires **540 mAh** for ten hours plus 20% reserve, blocks 400 mAh, and selects a protected **650 mAh** pack. It assumes continuous PPG, an 80 MHz MCU, one radio burst and environmental read per minute, ten 10-second display views per hour, and a conservative 6 mA allowance for the GY-521 regulator/power LED. ESP32-C3 chip figures do not describe the full band. Runtime is not guaranteed until a power analyser records the assembled device, including GY-521 overhead, radio peaks and an extended RED event. Reproduce the numbers with `pnpm power:refresh` and `pnpm power:test`; see `hardware/pcb/POWER-ARCHITECTURE.md` for the circuit and layout contract.

### Mechanical architecture and Centauri Carbon 2 TPU preparation

The strongest credible prototype concept is a **split enclosure**:

- A rigid, ribbed electronics pod carries the PCB, battery, display window and fasteners.
- A replaceable TPU 95A strap/bumper/seal provides compliance, impact isolation and skin comfort.
- The PPG window uses a dark optical baffle and controlled contact pressure; drainage paths keep sweat away from the optical cavity and charging contacts.
- Ribs, generous internal fillets and load-aligned standoffs add stiffness more efficiently than a uniformly thick shell.
- Keep the ESP32-C3 antenna keep-out free of battery, copper, fasteners and carbon-filled polymer. A carbon-filled shell can detune or attenuate 2.4 GHz; use an unfilled RF window and validate the printed assembly.

TPU is **not** the primary load-bearing shell and a generic filament is not automatically skin-safe. For the ELEGOO Centauri Carbon 2, start from the machine’s built-in TPU profile and the exact spool manufacturer’s temperature/speed limits. On the Combo workflow, follow ELEGOO’s flexible-filament adapter/PTFE procedure and disconnect CANVAS as instructed before loading TPU. Dry filament per its data sheet, print orientation/coupon trials before a full strap, and record nozzle, bed, flow, retraction, maximum volumetric flow and bend-cycle result for each spool lot.

The words “best weight-to-load ratio,” “CFD proven” or “simulation verified” remain blocked until there is controlled CAD geometry plus:

1. three print-orientation tensile/flexural coupon sets;
2. strap-lug pull and 1 m multi-face drop tests with defined pass loads;
3. static structural analysis using measured coupon properties and load cases;
4. enclosure thermal analysis at radio/display/charge peaks and direct-sun boundary conditions;
5. ingress, sweat, cleaner compatibility, skin-contact and RF-range evidence.

---

## Per WBGT site-node — ~RM120–180

The fixed environmental station. One per site (or per micro-climate zone), **not** one per worker.

| # | Component | Purpose | Indicative (RM) |
|---|---|---|---|
| 1 | **ESP32** (dev board) | MCU + radio; reads probes, computes WBGT, ESP-NOW TX | 15–30 |
| 2 | **3× NTC thermistors** (or 1× SHT31 + 2× NTC) | globe, natural wet-bulb, dry-bulb temperatures | 3–9 |
| 3 | **Matte-black globe** (DIY, e.g. painted metal ball) | radiant-load sensing (globe temperature) | 5–15 |
| 4 | **Cotton wick + water reservoir** | natural wet-bulb (evaporative) | 3–8 |
| 5 | **Radiation shield** (dry-bulb) | shade the air-temperature probe | 5–12 |
| 6 | **PETG enclosure / mast mount** (3D-printed) | weatherable housing + mounting | 10–20 |
| 7 | **Power** (LiPo + TP4056, or USB/solar) | field power | 12–25 |
| 8 | Passives, wiring, ADC references, connectors | | 8–15 |
| | **Site-node subtotal** | | **~RM120–180** |

Notes: the DIY globe is corrected toward a 150 mm reference via the ISO 7726 diameter model (`globe_diameter_mm` is config), and outputs are labelled **"WBGT-indicative."** The wick provides a true natural wet-bulb; the Stull fallback (from RH) is only a labelled backup.

---

## Cost to add one worker

> **The existing display-free baseline for one additional worker is ~RM90–140. A display-equipped worker is base band + an unpriced validated delta.**
>
> No new SIM, router or internet line is required **per worker**. A new band joins the site’s ESP-NOW network; the site node and gateway are shared fixed costs. The radio-side marginal hardware curve is therefore comparatively flat, but production messaging, cloud, support, spares, calibration and warranty costs still grow with deployment.

**Historical display-free illustration (30 workers, 1 gateway, 1 site node):**

| Item | Qty | Unit (RM, mid) | Line total (RM) |
|---|---|---|---|
| Band | 30 | 115 | 3,450 |
| WBGT site-node | 1 | 150 | 150 |
| Gateway (ESP32 bridge; ~cost of a bare ESP32 + case) | 1 | 40 | 40 |
| Cloud / WhatsApp | — | 0 | 0 |
| **Total** | | | **~RM3,640** |

Historical display-free marginal midpoint: **+~RM115**. Re-price before a display-equipped pilot. The fixed environmental + bridging infrastructure does not grow with headcount, but production cloud, support, spares, training, calibrated comparison, warranty, and connectivity are not zero-cost assumptions.
