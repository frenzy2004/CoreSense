# CoreSense — FROZEN Interface Contract

The interfaces below are frozen so hardware and software can be built independently. Source of truth: [`packages/protocol/src/packet.ts`](../packages/protocol/src/packet.ts) (mirrored by `firmware/lib/coresense_common/packet.hpp`), [`supabase/functions/ingest/index.ts`](../supabase/functions/ingest/index.ts), and [`supabase/migrations/0001_schema.sql`](../supabase/migrations/0001_schema.sql).

**All multi-byte fields are little-endian.** `PROTO_VERSION = 1`. Every packet ends in a CRC-8 (poly `0x07`, init `0x00`) over all preceding bytes. A wrong version byte or CRC → **reject, do not misparse**. **No raw HR/PPG field ever appears in any packet or table.**

---

## 1. ESP-NOW `BandPacket` — 20 bytes, `msg_type = 1`

Temps sent as `int16 = round(°C × 100)`. Ints clamped to `[0,255]` where noted.

| Offset | Bytes | Field | Type | Notes |
|---|---|---|---|---|
| 0 | 1 | `proto_ver` | uint8 | must be `1` |
| 1 | 1 | `msg_type` | uint8 | `1` (Band) |
| 2 | 3 | `device_id[3]` | uint8×3 | anonymized site-unique id |
| 5 | 2 | `seq` | uint16 | wraps |
| 7 | 4 | `uptime_s` | uint32 | |
| 11 | 1 | `strain_score` | uint8 | 0..100 (PSI×10) |
| 12 | 1 | `alert_state` | uint8 | 0=green 1=amber 2=red 3=ack |
| 13 | 1 | `batt_pct` | uint8 | 0..100 |
| 14 | 1 | `hr_quality` | uint8 | 0..100 signal confidence (**not** a HR) |
| 15 | 2 | `core_temp_c` | int16 | °C × 100 |
| 17 | 2 | `core_temp_ci_c` | int16 | 95% half-width °C × 100 |
| 19 | 1 | `crc8` | uint8 | over bytes 0..18 |

`BAND_PACKET_LEN = 20`.

---

## 2. ESP-NOW `SitePacket` — 23 bytes, `msg_type = 2`

| Offset | Bytes | Field | Type | Notes |
|---|---|---|---|---|
| 0 | 1 | `proto_ver` | uint8 | `1` |
| 1 | 1 | `msg_type` | uint8 | `2` (Site) |
| 2 | 3 | `device_id[3]` | uint8×3 | |
| 5 | 2 | `seq` | uint16 | |
| 7 | 4 | `uptime_s` | uint32 | |
| 11 | 2 | `wbgt_c` | int16 | °C × 100 (WBGT-indicative) |
| 13 | 2 | `t_globe_c` | int16 | °C × 100 |
| 15 | 2 | `t_wet_c` | int16 | °C × 100 (natural wet-bulb) |
| 17 | 2 | `t_dry_c` | int16 | °C × 100 |
| 19 | 2 | `humidity_pct` | uint16 | % × 100 |
| 21 | 1 | `tnwb_source` | uint8 | 0=wick 1=stull |
| 22 | 1 | `crc8` | uint8 | over bytes 0..21 |

`SITE_PACKET_LEN = 23`. Enums: `AlertState{Green=0,Amber=1,Red=2,Ack=3}`, `TnwbSourceCode{Wick=0,Stull=1}`, `MsgType{Band=1,Site=2}`.

---

## 3. Ingest POST payload

`POST {INGEST_URL}` → `POST http://127.0.0.1:54321/functions/v1/ingest`

**Headers:** `x-api-key: <plaintext gateway key>` (server matches `sha256(key)` against `devices.api_key_hash`, `kind='gateway'`), `content-type: application/json`.

**Body:**

```jsonc
{
  "readings": [
    {
      "worker_code":   "W-01",     // string, resolved to workers.id for this gateway's site
      "source_event_key":"band-a1-boot7-seq4213", // gateway-stable retry key (required)
      "strain_score":  62,          // int, strict 0..100         (required)
      "core_temp_est": 38.34,       // number, valid range 30..43 (required)
      "core_temp_ci":  0.31,        // nominal covariance half-width 0..5 (required)
      "alert_state":   "amber",     // "green" | "amber" | "red"   (required)
      "hr_quality":    94,          // int, strict 0..100          (required)
      "batt_pct":      88,          // int, strict 0..100          (required)
      "env_mode":      false,       // bool                        (default false)
      "ts":            "2026-07-06T09:15:00Z" // ISO offset timestamp (required)
    }
  ],
  "wbgt": {                         // optional; one site reading per POST
    "wbgt":         30.4,           // number (required if wbgt present)
    "site_code":    "DEMO-SITE",
    "source_event_key":"site-a1-boot3-seq120",
    "t_globe":      41.2,
    "t_wet":        27.1,
    "t_dry":        33.0,
    "humidity_pct": 62.0,
    "tnwb_source":  "wick",         // "wick" | "stull"  (default "wick")
    "ts":           "2026-07-06T09:15:00Z"
  }
}
```

**Behavior (frozen):**
- The authenticated gateway’s hardware/site identifiers must match the strict payload. Unknown worker codes or invalid fields reject the batch; they are never silently converted into optimistic defaults.
- Body size is capped at 512 KiB; readings and breaks are capped at 200 each. Timestamps must be within the seven-day catch-up window and no more than five minutes in the future.
- The Edge Function scopes and hashes each gateway event key, then calls `ingest_gateway_batch` once. Telemetry, WBGT, alerts, breaks and gateway heartbeat therefore commit or fail together; a retry is logically idempotent.
- An **alert row is inserted only on an escalating transition** (green→amber, amber→red, green→red), with an hourly site/worker/state de-duplication key.

**Response:** `200 { ok, telemetry, alerts, wbgt, breaks_started, breaks_ended, skipped: 0 }`. Errors: `401` missing/bad key, `400` invalid JSON, `403` gateway/site mismatch, `413` oversized body, `422` invalid batch/timestamp/worker, `405` non-POST, `500` transactional failure.

---

## 4. Database columns (writer-facing subset)

Full DDL in `0001_schema.sql`. **`telemetry` has no `hr` column; `workers` has no name/IC/phone column** — privacy is structural.

**`telemetry`** — written only by the `ingest` Edge Function (service role):

| Column | Type | Notes |
|---|---|---|
| `worker_id` | uuid | FK workers |
| `shift_id` | uuid? | FK shifts |
| `ts` | timestamptz | |
| `strain_score` | smallint | 0..100 |
| `core_temp_est` | numeric(4,2) | °C |
| `core_temp_ci` | numeric(4,2) | nominal 1.96-sigma EKF covariance half-width °C; field coverage not proven |
| `alert_state` | enum | green/amber/red |
| `hr_quality` | smallint | 0..100 (confidence, not HR) |
| `batt_pct` | smallint | |
| `env_mode` | boolean | environmental fallback active |

**`wbgt_readings`**: `site_id, device_id, ts, t_globe, t_wet, t_dry, wbgt (not null), tnwb_source(enum wick/stull), humidity_pct`.

**`alerts`**: `id, site_id, worker_id?, kind(enum), state(enum), core_temp_est, wbgt, fired_at, acked_at, acked_by, escalated, delivered, dedup_key (UNIQUE), detail(jsonb)`.

Authenticated clients have no direct `UPDATE` privilege on `alerts`. They acknowledge an alert through `acknowledge_alert(alert_id)`, which checks site membership/role and can mutate only `acked_at` and `acked_by`. Provider/relay updates remain a separately controlled service path.

**`breaks`**: `id, worker_id, shift_id?, started_at, ended_at, triggered_by(enum), linked_alert_id?, core_temp_start, core_temp_end`.

**`workers`**: `id, site_id, worker_code (unique per site), metabolic_class(enum), acclimatized, band_device_id?, consent, consent_at, locale`. **No PII columns.**

**`devices`**: `id, site_id, kind(enum band/gateway/site_node), hw_id (unique), api_key_hash (gateways only: sha256 hex of ingest key), firmware_version, last_seen_at`.

**Enums:** `alert_state{green,amber,red}`, `device_kind{band,gateway,site_node}`, `alert_kind{individual_strain,wbgt_site,battery_low,signal_lost}`, `break_trigger{auto_amber,auto_red,supervisor,wbgt_advisory,worker_manual}`, `tnwb_source{wick,stull}`, `metabolic_class{light,moderate,heavy,very_heavy}`, `advisory_level{normal,caution,high,very_high,extreme}`.

---

## 5. Invariants (do not break)

1. `PROTO_VERSION` bump is required for **any** packet layout change; decoders reject mismatched versions.
2. CRC-8 (poly `0x07`, init `0x00`) covers the whole packet except its final byte.
3. Temperatures on the wire are `int16 = round(°C × 100)`; humidity is `uint16 = round(% × 100)`.
4. Only the service-role `ingest` function writes `telemetry` — there is **no** anon/authenticated INSERT policy.
5. No raw HR/PPG field exists anywhere in the packet, the payload, or the schema.
6. Gateway retries reuse `source_event_key`; the Edge Function scopes/hashes it and writes through the transactional RPC only.

---

## 6. Emergency-coordination simulation contract

Migration `0008_emergency_coordination.sql` adds this contract without changing
either frozen telemetry packet. No command is transmitted over ESP-NOW in this
milestone.

- `site_zones` plus worker/device `zone_id` and `crew_code` fields define the
  provisioned site, zone, and crew targets. GPS is not used.
- `safety_commands` stores an approved template key, hazard, target, muster code,
  issue/expiry times, supervisor, sanitized source snapshot, command token, and
  SHA-256 audit receipt. Rows are immutable and non-deletable.
- `command_receipts` stores independent virtual-band states: `queued`,
  `delivered`, `displayed`, `acknowledged`, `unreachable`, or `expired`.
- `incidents` stores only `manual_sos`, `possible_fall`, or `fall_cancelled` with
  the lifecycle `new -> acknowledged -> responder_assigned -> resolved` or
  `false_alarm`. Raw IMU/PPG trace keys are rejected by a database constraint.
- Only `supervisor`, `hse_manager`, and `site_admin` site memberships may call the
  security-definer simulation/transition functions. Direct authenticated writes
  are revoked.
- Simulation functions force `simulation_only = true` and
  `physical_transmission = false`. They make no phone call, WhatsApp send, 999
  request, or radio downlink.

The HTTP interfaces are `GET|POST /api/safety/commands` and
`GET|POST|PATCH /api/safety/incidents`. Arbitrary command copy, raw motion data,
and claims that assistance is dispatched are outside this contract.
