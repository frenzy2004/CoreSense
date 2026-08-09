# CoreSense weather intelligence and supervisor command boundary

Status: implemented as a weather-and-hazard dashboard, immutable **simulated** fleet-command workflow, and in-app incident queue. Physical band transmission is intentionally locked.

## Decision

CoreSense uses three different evidence layers. They are complementary and must not be presented as interchangeable:

1. The site WBGT instrument is the current local environmental authority for the heat-control loop.
2. Worker-band signals support the individual heat-strain decision.
3. Weather APIs provide planning lead time for rain, thunderstorms, wind, haze and forecast heat.

A forecast must never be relabelled as measured site WBGT. A generic forecast must never automatically issue a stop-work or return-to-shelter command.

## Data sources

- MET Malaysia through `api.data.gov.my/weather/forecast` supplies the official seven-day general forecast.
- MET Malaysia through `api.data.gov.my/weather/warning` supplies official warnings. The adapter normalizes thunderstorm, heavy rain, strong wind, continuous rain, tropical cyclone, earthquake, tsunami, and other official-warning text. A warning is site-applicable only when the configured region name appears in its bilingual text; unmatched items remain visible as national context.
- MET Malaysia through `api.data.gov.my/weather/earthquake` supplies earthquake reports. They are displayed with issue time, event time, magnitude, location, coordinate and tsunami advisory, but they do not automatically issue a band command.
- Open-Meteo supplies coordinate-based current and hourly values for the technical prototype: temperature, relative humidity, apparent temperature, precipitation probability, precipitation, WMO weather code and wind gust.

`GET /api/weather` polls these providers through an eight-second per-provider timeout. The dashboard refreshes every five minutes. Each normalized warning includes its provider, issue and validity times, freshness, affected-region copy, site-applicability result, and provider availability. Failed providers are shown as unavailable instead of being replaced with optimistic data. Expired or unavailable data cannot generate a safety command.

Flood automation remains `NOT_VERIFIED`: no flood feed is treated as operational until an official Malaysian machine-readable source and its reliability contract have been reviewed. An MPU6050 is never used to infer rain, flood, earthquake, or other natural hazards.

The public Open-Meteo endpoint is suitable for evaluation and non-commercial prototyping. Commercial deployment requires its commercial endpoint/API key, another appropriately licensed provider, or a self-hosted service. Attribution is mandatory. MET Malaysia/data.gov.my should remain the official Malaysian warning source.

## Deterministic forecast gates

These are prototype supervisor-review thresholds, not statutory weather limits. A pilot safety lead must approve them before field use.

| Level | Quantitative trigger examples | Result |
|---|---|---|
| Normal | No trigger | Continue site monitoring |
| Watch | precipitation probability >= 70%, rain >= 5 mm/h, gust >= 40 km/h, or apparent temperature >= 38 C | Brief supervisor and monitor |
| Prepare | rain >= 10 mm/h, probability >= 80% with rain >= 5 mm/h, gust >= 50 km/h, heavy-shower code, or apparent temperature >= 40 C | Confirm shelter, muster route, crew location and communications |
| Recall review | thunderstorm code, rain >= 20 mm/h, gust >= 60 km/h, or site-matched active official warning | Supervisor reviews return-to-shelter command |

The risk function is versioned in `apps/web/lib/weather-risk.mjs` and covered by unit tests. Forecast heat is planning evidence only; it is not a WBGT calculation.

## Dashboard workflow

```text
MET Malaysia warning + daily forecast     coordinate hourly forecast
                   \                       /
                    deterministic forecast triage
                               |
            supervisor sees source, age, hazard and lead time
                               |
                 supervisor selects approved bilingual action
                               |
               create immutable simulated fleet command
                               |
        independent delivery/display/ACK/unreachable receipts
                               |
               PHYSICAL BAND SEND REMAINS LOCKED
```

The Hazard Command Center keeps measured WBGT in a separate authority panel, shows the next 12 hours of forecast planning risk and official Malaysian alerts, and supports site, provisioned-zone, and crew targeting. Only `supervisor`, `hse_manager`, and `site_admin` roles can simulate a command or manage an incident.

The only command choices are fixed English/Bahasa Melayu templates: weather watch, prepare shelter, return to shelter, stop work, evacuate to muster point, shelter in place, and all clear. A command stores its hazard, target, muster code, issue/expiry times, supervisor, sanitized source snapshot, and SHA-256 receipt. Arbitrary message text is not accepted.

**Simulate broadcast** creates one immutable command and independent virtual-band receipts on one simulation tick. Site targeting creates 50 receipts; zone and crew demonstrations use bounded subsets. This is a dashboard/device-preview demonstration: the database forces `simulation_only = true` and `physical_transmission = false`.

Manual SOS and possible-fall incidents use `new -> acknowledged -> responder_assigned -> resolved` or `false_alarm`. Notifications remain in-app/mock. CoreSense does not call 999, send WhatsApp, or promise that help is coming through this workflow.

`weather_command_drafts` remains intact for historical compatibility, but new demos use `safety_commands`, `command_receipts`, and `incidents` from migration `0008_emergency_coordination.sql`.

## Proposed authenticated downlink contract

This is the next implementation contract, not a currently working feature.

Gateway command payload:

```json
{
  "v": 1,
  "command_id": "uuid",
  "site_id": "uuid",
  "kind": "weather_return_to_shelter",
  "issued_at": "ISO-8601",
  "expires_at": "ISO-8601",
  "message_key": "weather.return_to_shelter",
  "muster_zone": "configured-zone-code",
  "source_snapshot_sha256": "64-char lowercase hex",
  "nonce": "monotonic-or-random-value"
}
```

Band acknowledgement payload:

```json
{
  "v": 1,
  "command_id": "uuid",
  "band_id": "pseudonymous-id",
  "state": "received|displayed|worker_ack",
  "ts": "ISO-8601",
  "battery_pct": 82
}
```

Required gates before enabling send:

- authenticated and encrypted gateway-to-band transport;
- monotonic nonce/replay rejection and a short command expiry;
- duplicate-safe delivery and acknowledgement aggregation;
- a band screen that keeps the action visible until acknowledged;
- bilingual message-key rendering with no free-form text overflow;
- offline behaviour and a supervisor view of unreachable bands;
- RF, latency, battery and recovery testing at representative sites;
- an immutable audit record linking warning snapshot, supervisor, command, delivery and acknowledgement;
- written emergency procedure stating when the supervisor must use sirens, radios, muster marshals or other controls instead of relying on the band.

## Worker display copy

English:

> RETURN TO SHELTER — Severe weather is forecast. Stop work and report to the designated muster point.

Bahasa Melayu:

> KEMBALI KE TEMPAT BERLINDUNG — Cuaca buruk diramal. Hentikan kerja dan lapor ke tempat berkumpul yang ditetapkan.

The small band renders a fixed command key and short pages rather than arbitrary cloud-generated prose. The first short tap acknowledges and silences the urgent haptic pattern; it must not dismiss the action or declare the site safe. Only all-clear or expiry removes the command. The simulator uses a 250 ms pulse every second for 30 seconds and then every five seconds until acknowledgement; the motor is never held continuously on.

## Operational failure cases

- API unavailable: keep the WBGT and local emergency procedure active; show forecast unavailable.
- Forecast stale: show the issue time and refuse automatic escalation.
- Coordinate wrong: label the site configuration as invalid; do not silently fall back in production.
- Warning outside region: keep it in national context but do not mark it site-applicable.
- Forecast misses a local storm: the supervisor, site node, lightning procedure and visual observation remain authoritative.
- Network or gateway failure: use radio, siren, public-address system and muster procedure.

## Primary references

- Malaysia official weather API documentation: <https://developer.data.gov.my/realtime-api/weather>
- MET Malaysia open-data overview: <https://www.met.gov.my/info/data-terbuka/>
- Open-Meteo forecast variables: <https://open-meteo.com/en/docs>
- Open-Meteo commercial-use boundary: <https://open-meteo.com/en/pricing>
