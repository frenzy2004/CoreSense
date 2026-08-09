# CoreSense Huaqiangbei / 1688 wearable sourcing gate

**Decision:** use the Shenzhen/Huaqiangbei ecosystem to accelerate mechanical,
display, charging and assembly work, while retaining a controllable CoreSense
electronics/firmware baseline until an OEM board passes the technical gate.

The canonical, machine-checked component record is
`hardware/sourcing/huaqiangbei-wearable-catalog.json`. Regenerate the dashboard
view with `pnpm sourcing:refresh` and enforce its fail-closed decisions with
`pnpm sourcing:test`. As reviewed on **2026-08-09**, no supplier is selected,
marketplace pricing is `NOT_VERIFIED`, and no sourced assembly is production-ready.

## Recommended architecture: hybrid reuse

| Path | Time/cost advantage | CoreSense risk | Decision |
|---|---|---|---|
| Complete generic smartwatch PCBA + vendor firmware | Fastest cosmetic prototype | Closed SDK, unknown sensor access, hard-to-audit algorithms, weak pin/radio control, discontinuation risk | Evaluation only |
| Custom ESP32-C3 PCB and fully custom enclosure | Maximum control and traceability | More PCB, mechanical and certification work | Engineering baseline |
| Commodity enclosure/display/strap/charger/battery mechanics + custom CoreSense PCB/sensors | Reuses the strongest supply-chain pieces while preserving firmware/data control | Mechanical adaptation and connector qualification still required | **Recommended** |

A 1.43-inch AMOLED kit is not a drop-in substitute for the current 1.28-inch
240×240 GC9A01A design. It changes enclosure geometry, display driver, power
budget, framebuffer memory, UI scaling and possibly MCU choice. Treat it as a
separate hardware variant, not a silent parts substitution.

## Search routes

Use these phrases for discovery; supplier identity and pricing remain
`NOT_VERIFIED` until a written quotation and sample inspection:

- `智能穿戴 PCBA 方案` — smart-wearable PCBA solution.
- `ESP32 智能手表 开发板 圆屏` — ESP32 smartwatch development board, round display.
- `1.28寸 GC9A01 圆屏 总成` — current round-display assembly route.
- `1.43寸 AMOLED 屏幕总成` — alternative AMOLED assembly route.
- `GH3011 心率模块` / `HX3605 传感器小板` — PPG modules.
- `602030 锂电池 带保护板 NTC` — size-coded pouch cell with protection and thermistor.
- `智能手表磁吸充电线 2pin 通用` — two-pin magnetic charging cable.
- `TPU 表带 开模 智能手表` — TPU strap/tooling route.

The indicative Taobao/1688 prices supplied by the team are planning inputs only;
they are not used in the BOM until dated quotations include MOQ, tooling, tax,
freight, yield, warranty and sample cost.

## Supplier pass/fail gate

Reject a board or module if any required item is unavailable.

### Mainboard / display

- Full schematic, pin map, board dimensions, connector drawings and layer stack.
- MCU exact part and revision; SDK/toolchain license; source-level application
  access; flashing/recovery procedure; bootloader and OTA control.
- Ability to read raw or minimally processed PPG data at the required rate.
- Ability to control display sleep/backlight, single button, haptic driver,
  accelerometer interrupt and battery ADC.
- Measured sleep, screen-off monitoring, screen-on, radio and vibration current
  from a physical sample—not a catalogue claim.
- Display datasheet, initialization sequence, lifetime/brightness data and a
  guaranteed replacement path.
- No mandatory vendor cloud, hidden identifier upload or locked companion app.

### PPG / skin and environmental sensors

- Exact sensor and LED/photodiode optical stack, not merely a glowing rear cover.
- Datasheet, reference schematic/layout, register access, driver source or
  redistributable binary license, algorithm licensing terms and sample code.
- Evaluation-board and optical-path test support.
- Mechanical guidance for skin contact, ambient-light blocking and LED-to-PD
  spacing.
- Lot traceability and PCBA test report.

Goodix still publishes a [GH3011 product page](https://www.goodix.com/en/product/sensors/health_sensors/gh3011),
but a [2026 answer from a Goodix employee in the company developer community](https://developers.goodix.com/en/bbs/detail/e97d96ee39b04abca6c2e769626a1a7b) says
GH3011 and GH3018 are already EOL. CoreSense therefore marks GH3011
**blocked for a new production design** unless Goodix sales provides a direct,
written lifecycle correction and authorized-stock path. A remaining-stock module
is not a lifecycle strategy.

The current [Goodix GH3026 page](https://www.goodix.com/en/product/sensors/health_sensors/ppg_afe/gh3026/)
describes a wearable PPG AFE, but some design resources require account or NDA
access. GH3026 is an evaluation candidate only until CoreSense has the full
register interface, raw-data path, optical reference design, SDK/algorithm rights,
evaluation hardware and a written lifecycle statement.

The HX3605 manufacturer describes it as an ultra-low-power I2C optical sensor
for wearables. Require the full datasheet, SDK/algorithm rights and evaluation
hardware directly from the vendor before selection:
https://tianyihexin.com/en/product_page-844.html

### Current part disposition

| Part or assembly | CoreSense disposition | Reason |
|---|---|---|
| ESP32-C3FH4X-based custom board | **Keep controlled** | Current firmware/radio architecture; exact ordering code avoids EOL/NRND C3 variants |
| 1.28-inch GC9A01A display assembly | **Sample for reuse** | Current UI target if controller, FPC, sleep and backlight current match |
| Enclosure, TPU strap, lens/seals | **Sample for reuse** | High-value supply-chain shortcut after fit, material, ingress, optical and RF tests |
| Two-pin magnetic contact/cable | **Sample for reuse** | Mechanics only; polarity, short, current, temperature and corrosion must pass |
| Protected 602030 cell with NTC | **Sample for mechanics** | `602030` states dimensions, not capacity; the Rev A model currently selects 650 mAh |
| MAX30102 | **Keep prototype baseline** | Existing source, firmware and behavioral simulation; field optical accuracy remains open |
| GH3026 / HX3605 | **Evaluate on separate adapter boards** | No firmware switch until raw access, SDK rights, optics, lifecycle and measured power pass |
| GH3011 | **Blocked for new design** | Current EOL risk |
| 1.43-inch AMOLED | **Separate Rev B branch** | New display/UI/enclosure/power/memory design, not a Rev A substitution |
| RTL8762/8763-labelled complete PCBA | **Blocked pending documentation** | Supplier label alone does not prove source control, raw PPG, security, radio fit or lifecycle |
| BQ24074/TPS62840/TPS7A0218/MAX17048 | **Keep controlled** | Charging, rails, PPG noise and battery state stay auditable on the CoreSense PCB |

### Battery and charging

- `602030` is a dimensional code, not proof of capacity, safety or quality.
- Require cell manufacturer, chemistry, nominal/rated capacity, impedance,
  cycle data, date code and lot traceability.
- Require a protection circuit covering overcharge, over-discharge, overcurrent
  and short circuit plus a cell NTC where the charging design supports it.
- Obtain the applicable UN 38.3 test summary for transport and IEC 62133-2
  evidence for portable lithium-cell/battery safety. IEC's current consolidated
  publication is listed here: https://webstore.iec.ch/en/publication/65948
- Run incoming capacity/impedance sampling, hot-enclosure charge testing,
  charger-contact short tests and assembled-device runtime profiling.
- Do not charge while the unit is on a worker unless the final safety assessment
  explicitly permits it.

## Sample order plan

Order samples before any tooling commitment:

1. Two display/enclosure/strap sets for dimensional and optical inspection.
2. Three candidate PCBA boards: one destructive engineering unit, one firmware
   integration unit and one retained control sample.
3. Five PPG modules per candidate for basic yield and motion tests.
4. Ten batteries from one traceable lot for capacity, impedance and protection
   checks; do not infer mass-production quality from one cell.
5. Two charger/cable variants for polarity, retention, contact-temperature and
   short-circuit tests.

## Supplier questions to send

1. Can we obtain the schematic, pin map, display initialization code and SDK
   before placing a production order?
2. Can our firmware access raw PPG samples and accelerometer data without the
   vendor cloud or phone app?
3. Which components may be substituted without notice? Provide the approved
   vendor list and change-notification period.
4. What are the sample price, MOQ, tooling charge, lead time and annual capacity?
5. Provide test reports and lot codes for the cell, protection board, charger,
   PPG module and finished PCBA.
6. Can you manufacture our custom PCB in the existing enclosure and use the
   same display, strap, battery and magnetic-charging mechanics?
7. Can the factory provide ICT/programming fixtures, firmware version records,
   serialized test logs and failed-unit return analysis?

## Prototype decision experiment

Compare the current ESP32-C3 reference unit against one supplier-kit unit on:

- usable firmware access and reproducible builds;
- ECTemp processing and data-privacy contract;
- PPG signal quality during rest, tool handling and walking;
- screen-off, screen-on, radio and haptic current;
- ten-hour shift reserve on assembled samples;
- display readability in sun, glove interaction and ten-second auto-off;
- BOM at 10, 100 and 1,000 units including tooling, test and expected scrap;
- availability of second sources and written PCN/EOL terms.

No supplier kit becomes the CoreSense production design solely because it is
cheap or visually polished. It must win this controlled comparison.
