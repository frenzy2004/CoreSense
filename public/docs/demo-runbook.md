# CoreSense — Demo Runbook

The exact on-table procedure for a live judge demo, in both **mock** (default, network-free) and **wppconnect** (real WhatsApp) modes, plus pre-flight, the ~90-second money-shot sequence, and a fallback table.

**Golden rule:** the demo runs in `mock` by default and is fully deterministic. `wppconnect` is a bonus showcase, never a dependency. A pre-recorded backup exists.

---

## 0. Pre-flight checklist

Do this **before** judges arrive. Everything must be green.

| ✓ | Check | Command / how |
|---|---|---|
| ☐ | Packages built | `pnpm build` clean |
| ☐ | Golden fixture present | `pnpm fixture` → `fixtures/golden-trace.json` written |
| ☐ | Supabase up | `supabase start`; `supabase status` all healthy |
| ☐ | `.env.local` populated | `supabase status -o env \| Out-File -Encoding utf8 .env.local` + ingest/relay/sim vars appended (see README) |
| ☐ | DB migrated + seeded | `supabase db reset` then `pnpm db:setup` (idempotent) |
| ☐ | Ingest function served | `supabase functions serve --env-file .env.local` responding on `/functions/v1/ingest` |
| ☐ | Dashboard up | `pnpm web` → http://localhost:3000 |
| ☐ | Logged in | `supervisor@coresense.demo` / `coresense-demo`, site-wall shows 6 workers green |
| ☐ | Relay up | `pnpm relay` (mode per `ALERT_TRANSPORT`) |
| ☐ | Simulator ready | terminal parked at `pnpm sim heavy-heat`, **not yet run** |
| ☐ | "Accelerated 30×" badge visible | confirm `SIM_TIME_SCALE=30` and the badge renders |
| ☐ | **(wppconnect only)** WhatsApp session linked | **morning-of**: QR-link the WPPConnect session; send one test message; confirm `acked` round-trips |
| ☐ | Backup video queued | pre-recorded full-stack run open in a tab, ready to play |

**Terminal layout (5 panes recommended):** (1) `supabase functions serve`, (2) `pnpm web`, (3) `pnpm relay`, (4) `pnpm sim heavy-heat` parked, (5) free pane for `supabase status` / ad-hoc.

---

## 1. Mode selection

### Mock mode (default — use this unless you deliberately want live WhatsApp)

```powershell
# .env.local
ALERT_TRANSPORT=mock
```

The dashboard renders a pixel-accurate WhatsApp bubble from the `alerts` realtime stream. No network, fully deterministic. Restart `pnpm relay` after changing the var.

### WPPConnect mode (live WhatsApp showcase)

```powershell
# .env.local
ALERT_TRANSPORT=wppconnect
WPPCONNECT_URL=http://localhost:21465
WPPCONNECT_SESSION=coresense
WPPCONNECT_SECRET_KEY=THISISMYSECURETOKEN
WPPCONNECT_TOKEN=<token from the generate-token call>
DEMO_SUPERVISOR_PHONE=<your test phone, E.164 no '+'>
```

Morning-of steps:
1. Start the local WPPConnect server (`http://localhost:21465`).
2. Generate a session token, put it in `WPPCONNECT_TOKEN`.
3. Start the session and **scan the QR with the demo phone's WhatsApp** to link it.
4. Send one test message and reply "ACK" to confirm the inbound → `acked_at` path works.
5. Restart `pnpm relay`.

If any WPPConnect step is shaky at demo time, **switch `ALERT_TRANSPORT=mock` and restart the relay** — the on-screen bubble carries the same information.

---

## 2. The ~90-second money shot

Narrate as you go. Start with all tiles green.

| t (approx) | Action | What the judge sees | Say |
|---|---|---|---|
| 0:00 | Run `pnpm sim heavy-heat` | 6 tiles green; CT ribbons **wide** (cold-start, honest uncertainty); "Accelerated 30×" badge | "Six workers, one site. Time is compressed 30×, labelled up top." |
| 0:10 | (filter converging) | Ribbons **narrow** as `v` drops below 0.08 | "The band earns confidence before it's allowed to alarm — this kills false alarms." |
| 0:25 | Heat exposure ramps | One worker's CT curve climbs past the pack | "Same environment, but this worker is heating faster — that's the individual signal WBGT alone can't see." |
| 0:35 | CT crosses 38.0 °C | Tile flips **amber**; **band buzzes** (pulse); FusedLoop annotates the lead time | "Amber. On the wrist that's a pulse. Note: fired **N minutes before** a pure-WBGT threshold would." |
| 0:50 | CT ≥ 38.5, lower bound ≥ 38.0, converged | Tile flips **red**; **band buzzes continuously** | "Red — dual-gated: point estimate *and* the lower confidence bound clear the line." |
| 0:55 | Alert fires | **WhatsApp bubble** (mock) or **real WhatsApp** (wppconnect) to supervisor, localized | "The supervisor gets a WhatsApp in the worker's language — Worker ID, core temp, WBGT, 'take a break'." |
| 1:05 | Break logged | Supervisor logs the break (or ACK reply); a **break marker** appears on the ribbon | "Break logged. Reply 'ACK' and the row acknowledges." |
| 1:15 | Recovery decay | CT curve **falls** after rest; tile returns amber→green | "After rest the estimated core temp comes back down — the loop closes." |
| 1:25 | Export | Open `/compliance`, export CSV/PDF | "Every alert and break becomes timestamped DOSH/ESG review evidence — exportable with its scope and limitations." |

**Optional bonus (30 s):** run `pnpm sim dropout` to show a worker's ribbon balloon on poor PPG and auto-switch to **Environmental mode** — the honest kill-criterion. And `pnpm sim multi-worker` to fill the wall to 50 tiles on one realtime channel (scalability).

**Teammate tour (60 s, software-only):** open `/device-preview` to show English/Bahasa Melayu, REST NOW acknowledgement, low-signal, low-battery, and fault states. Then open `/pilot-compliance` for beneficiaries, the ten-week pilot, cost boundaries, Malaysian requirement mapping, evidence-chain hardening, and go/no-go gates.

### Hazard coordination sequence (90 s, simulation only)

1. Open `/` and identify the three separate authorities: measured **WBGT-indicative**, Open-Meteo 12-hour planning, and official MET Malaysia warnings/earthquake context.
2. State the boundary aloud: forecast data never replaces the site WBGT and never sends an automatic worker command.
3. In **Supervisor command simulator**, keep the whole-site target, choose an approved bilingual action, tick the simulation consent, then select **Simulate broadcast**.
4. Point out that the 50 virtual bands share one immutable command token while receipt, display, acknowledgement and unreachable states remain independent. No physical radio or external message is sent.
5. Open `/device-preview`, select **Receive site warning**, acknowledge it with a tap, and show that the action remains pinned. Demonstrate the ten-second screen timeout and next-wake retention.
6. Back on `/`, select **Simulate 5 s SOS**, then acknowledge, assign `HSE-01`, and resolve it. Explain that this is an in-app site-response workflow—not a 999 request and not proof that help is coming.
7. Show the possible-fall cancellation path. Say **possible fall**, `DEMO_UNVALIDATED_V1`, derived features only, and no raw IMU trace.

Do not call these screens field-ready emergency delivery, validated fall detection, or measured battery life. The milestone is a simulated gateway/fleet plus firmware-aligned local interaction behavior.

---

## 3. "If X fails, do Y" fallback table

| If this fails | Do this |
|---|---|
| WPPConnect won't link / send | Set `ALERT_TRANSPORT=mock`, restart `pnpm relay`. Same info on the dashboard bubble. |
| Dashboard shows no live updates | Confirm migration `0003_realtime` applied (`supabase db reset`) and the browser client called `realtime.setAuth` before subscribe; hard-refresh the page. |
| Ingest returns 401 | `INGEST_API_KEY` in `.env.local` must match the seeded gateway key; re-run `pnpm db:setup`. |
| `pnpm db:setup` errors on service key | Ensure `SUPABASE_SERVICE_ROLE_KEY` is set (from `supabase status`); the seed needs it. |
| Simulator posts but no tiles move | Check `SIM_SITE_CODE=DEMO-SITE` matches the seeded site; confirm `functions serve` is running. |
| Supabase won't start | Confirm Docker Desktop is running; `supabase stop` then `supabase start`. |
| Anything is slow / flaky live | **Play the pre-recorded backup video.** State plainly that it is the same stack recorded earlier. |
| Physical band not cooperating | The simulator is the primary driver; the band is a ≤30 s bonus. Skip it, keep narrating the sim. |

---

## 4. Reset between runs

```powershell
supabase db reset        # clean DB
pnpm db:setup            # re-seed
```

Re-running `pnpm sim heavy-heat` on a fresh DB reproduces the identical trace (the forward-model is deterministic), so back-to-back demos look the same every time.
