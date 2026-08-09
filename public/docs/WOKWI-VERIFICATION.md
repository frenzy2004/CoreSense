# CoreSense Wokwi verification

This fixture runs CoreSense's shared ECTemp, one-button, haptic, display-power,
sensor-ingest and `DEMO_UNVALIDATED_V1` possible-fall logic on an ESP32-C3.
It is a software simulation—not a physical, clinical, environmental, radio or
power measurement.

## Current status — 9 August 2026

| Gate | Result |
|---|---|
| ESP32-C3 `wokwi-band` PlatformIO build | **PASS** — 14,588 B RAM; 292,150 B flash; 305,520 B firmware image |
| MAX30102 behavioral-model WASM | **PASS** — controllable HR, signal-quality and contact inputs |
| SHT31 behavioral-model WASM | **PASS** — controllable air-temperature and humidity inputs |
| 240×240 round-display-model WASM | **PASS** — four pages, alert ring, backlight wake/sleep and metrics frame |
| Static diagram and connection contract | **PASS** |
| Automation scenario definitions | **5/5 PASS** statically |
| VS Code Wokwi diagram | **OPENED** — see `WOKWI-VSCODE-LIVE.png` |
| Live Wokwi scenario completion through CLI | **NOT_RUN** — `WOKWI_CLI_TOKEN` is not configured |
| Live serial `WOKWI_READY` capture in this run | **NOT_CONFIRMED** |

The VS Code diagram editor is open with the green Wokwi play button. Press it
to start the interactive run. If the extension reports a license problem, use
**Wokwi: Request a New License**; the earlier 9 August attempt reported an
expired license, so a successful live run must not be claimed until the serial
monitor reaches `WOKWI_READY` in the current session.

## Simulated topology

- **ESP32-C3 DevKitM-1:** real emulated CPU, GPIO, ADC, I2C, SPI and UART.
- **MAX30102 model at `0x57`:** interactive heart-rate, signal-quality and
  wrist-contact controls. It supplies derived values; it does not simulate LED,
  photodiode, skin optics, motion artefacts or the production SparkFun driver.
- **SHT31 model at `0x44`:** interactive air-temperature and relative-humidity
  controls. It does not reproduce sensor tolerances, lag, condensation or CRC
  fault behavior.
- **MPU6050:** Wokwi's native accelerometer/gyro controls feed the synthetic
  wrist-raise and possible-fall path.
- **Skin NTC:** native Wokwi analog temperature control on GPIO0.
- **Battery level:** native slide potentiometer on GPIO1 as an ADC input proxy.
  It is not a LiPo discharge or protection model.
- **Round display model:** custom 240×240 framebuffer on GPIO4/5/6/7/10/18.
  It shows Action, Body, Environment and Device pages and the ten-second
  backlight timeout, but uses a compact simulation frame rather than validating
  GC9A01A electrical timing or the production Adafruit driver.
- **One button:** tap wake/acknowledge, 650–4,999 ms page hold, and five-second
  one-shot SOS.
- **Haptic proxy:** LED plus logic-analyzer channel on GPIO3 verifies the
  motor-safe pulse schedule; it does not simulate motor current or vibration.
- **Logic analyzer:** haptic, button, display-CS and display-clock channels.

## Run in VS Code

1. From the project root, build and verify:

   ```powershell
   pnpm wokwi:verify
   ```

2. Open `diagram.json`. The Wokwi Diagram Editor should show every component.
3. Click the green play button or run **Wokwi: Start Simulator**.
4. Confirm the serial monitor prints:

   ```text
   CORESENSE_WOKWI_SIMULATION_ONLY
   COMPONENT_MODELS=MAX30102_BEHAVIORAL,SHT31_BEHAVIORAL,GC9A01_FRAMEBUFFER
   MODEL_PROBE,max30102=1,sht31=1,mpu6050=1
   FALL_PROFILE=DEMO_UNVALIDATED_V1
   ECTEMP_STATE_BYTES=8
   WOKWI_READY
   ```

5. Change the MAX30102 HR/contact/quality controls, SHT31 temperature/humidity,
   skin NTC, battery slider and MPU6050 motion controls. Verify `MEASURE` lines
   update and the display pages remain consistent.
6. Press the blue button briefly to wake. Hold 650–4,999 ms to change page. Hold
   five seconds to trigger exactly one `SOS_TRIGGERED` plus
   `SOS_NOT_DELIVERED_USE_SITE_RADIO`.
7. Type `COMMAND`, `ACK`, `ALL_CLEAR`, `RED`, `REPORT`, `RESET_FALL` or
   `SOS_CLEAR` into the serial monitor to test the safety state machine.

With a private CLI token configured, run:

```powershell
$env:WOKWI_CLI_TOKEN = '<set privately; do not commit>'
.\tools\wokwi-cli.exe . --scenario firmware/wokwi/scenarios/button-and-sos.yaml --timeout 10000 --timeout-exit-code 0
```

## Rebuild custom chips

The project-pinned Wokwi CLI is `tools/wokwi-cli.exe` version 0.26.1.

```powershell
.\tools\wokwi-cli.exe chip compile firmware/wokwi/chips/max30102-model.chip.c -o firmware/wokwi/chips/max30102-model.chip.wasm
.\tools\wokwi-cli.exe chip compile firmware/wokwi/chips/sht31-model.chip.c -o firmware/wokwi/chips/sht31-model.chip.wasm
.\tools\wokwi-cli.exe chip compile firmware/wokwi/chips/gc9a01-model.chip.c -o firmware/wokwi/chips/gc9a01-model.chip.wasm
```

Wokwi's Custom Chips API is beta. The `.chip.c`, `.chip.json` and compiled
`.chip.wasm` files are therefore retained together for review and repeatable
rebuilds.

## Evidence boundary

| Claim | Wokwi evidence |
|---|---|
| Firmware algorithms, button boundaries and control flow | Supported |
| I2C/SPI/ADC/GPIO integration against behavioral models | Supported |
| Sensor-control changes reach ECTemp and the four display pages | Supported after live serial confirmation |
| MAX30102 optical accuracy and motion-artifact performance | `NOT_MEASURED` — bench and field protocol required |
| SHT31 accuracy under solar load, sweat or condensation | `NOT_MEASURED` |
| GC9A01A pixel timing, backlight current and sleep current | `NOT_MEASURED` |
| Vibration strength, driver temperature and back-EMF | `NOT_MEASURED` |
| Whole-device current and ten-hour battery runtime | `NOT_MEASURED` — assembled-board current profiling required |
| ESP-NOW fleet reliability and radio range | `NOT_MEASURED` |
| Fall sensitivity/specificity | `NOT_MEASURED` — synthetic traces are not field validation |
| Clinical core-temperature accuracy | Not claimed or measured |

