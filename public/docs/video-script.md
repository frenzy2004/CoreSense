# CoreSense — 3-Minute Video Script

> For the Icy-led finalist submission, use the expanded
> [`ICY-8-MINUTE-VIDEO-PRODUCTION-PACK.md`](ICY-8-MINUTE-VIDEO-PRODUCTION-PACK.md),
> which includes the exact 7:45 narration, dashboard capture plan, commercial
> and pilot story, AIGC disclosures, image-to-video prompts, and final QC gate.

Target: **3:00**. Judge-facing. Three WOW moments carry the story; every judged criterion is mapped to something visibly on screen. Voiceover (VO) is written to be read at ~150 wpm.

Legend: **[SHOT]** = what's on screen · **VO:** = narration · **(on-screen text)** = lower-third or callout.

---

## Cold open — the problem (0:00–0:20)

**[SHOT]** Real footage: outdoor/industrial workers in heat, sun glare. Cut to a WBGT meter reading a single ambient number.

**VO:** "Heat kills workers before anyone sees it coming. The standard tool measures the *environment* — one number for everyone. But two workers in the same heat are not in the same danger. CoreSense measures the *worker*."

**(on-screen text):** *CoreSense — one decision: work, or rest now.*

---

## What it is (0:20–0:40)

**[SHOT]** The band (or render): ESP32-C3 + MAX30102 on a wrist. Quick diagram: wrist → gateway → dashboard → WhatsApp.

**VO:** "A frugal wristband estimates core body temperature *non-invasively from heart rate*, using the published Buller Kalman filter — the exact same algorithm that runs on our band, our simulator, and our dashboard, proven identical to four decimal places. It decides heat strain on the wrist, buzzes the worker, and alerts the supervisor."

**(on-screen text):** *Buller et al. 2013 · ECTemp EKF · ±≈0.3 °C in active workers · estimates strain, not a clinical thermometer.*

---

## WOW #1 — the individual fires early (0:40–1:20)

**[SHOT]** Dashboard site-wall, six green tiles, **"Accelerated 30×"** badge. Ribbons start wide, then narrow. One worker's core-temp curve pulls away from the pack and crosses amber, then red. The **FusedLoopCard** annotates: *"individual fired N min before pure-WBGT."* Band buzzes; WhatsApp fires.

**VO:** "Watch. Same site, same environment. One worker heats faster — and CoreSense flags him **minutes before** an environment-only threshold ever would. That lead time is the whole point: a WBGT station can't see an individual. The band pulses on his wrist, and the supervisor gets a WhatsApp — in his own language — with his ID, his core temp, and 'take a break.'"

**(on-screen text):** *Individual early-warning vs. ambient WBGT — the defensible novelty.*

---

## WOW #2 — honest under uncertainty (1:20–2:00)

**[SHOT]** Trigger the `dropout` scenario. A worker's PPG degrades; the confidence **ribbon balloons**; RED is *withheld*; the tile flips to **Environmental mode**. Show the "WBGT-indicative" badge and the widening band.

**VO:** "Here's what makes it trustworthy. When the wrist signal gets noisy, CoreSense does **not** guess. The confidence band widens, the red alarm is held back — because red requires the *lower* bound to clear the line — and the worker automatically falls back to the environmental advisory. It degrades to a known-good safety net instead of a confident wrong number. It's honest about what it doesn't know."

**(on-screen text):** *Confidence band always · dual-gated RED · environmental fallback = the kill-criterion.*

---

## WOW #3 — scale and cost (2:00–2:35)

**[SHOT]** `multi-worker` scenario fills the wall to **50 tiles** updating live on one channel. ESP-NOW mesh diagram: bands → one gateway → internet. BOM callout.

**VO:** "And it scales. Fifty simulated workers update on a single realtime channel. The planned bands talk over ESP-NOW — **no SIM, no router, no internet per worker.** Our pre-display prototype band baseline is roughly ninety to one hundred and forty ringgit; the display and production service remain to be quoted and validated. The environment station and gateway are shared. Frugal by design, from the silicon up."

**(on-screen text):** *50 simulated workers · 1 uplink · pre-display band RM90–140 · display delta TBD.*

---

## Close — compliance and the ask (2:35–3:00)

**[SHOT]** Core-temp curve falls after the logged break; break marker on the ribbon. Open `/compliance`, one-click export CSV/PDF with Bengali/Nepali text rendering cleanly.

**VO:** "After rest, the estimated core temp comes back down — and every alert and break becomes timestamped evidence for DOSH and ESG review, exportable with its scope and limitations, in the languages your workforce actually speaks. CoreSense turns invisible heat strain into one clear decision — and a traceable record of the response."

**(on-screen text):** *DOSH/ESG review evidence · not certification or assurance · en · ms · bn · ne.*

---

## Criterion → on-screen map (for the judges)

| Judged criterion | What proves it on screen | Timestamp |
|---|---|---|
| **Technical innovation** | FusedLoopCard: individual RED annotated *N min before* pure-WBGT | 0:40–1:20 |
| **Technical feasibility** | "same algorithm, proven identical <1e-4" + live simulator driving the full stack + Buller citation | 0:20–0:40 |
| **Health-impact metrics** | core-temp reduction after break, break marker, `/metrics` + `/validation` | 2:35–3:00 |
| **Scalability** | 50-tile wall on one channel + ESP-NOW mesh (no per-worker internet) | 2:00–2:35 |
| **Commercial viability** | pre-display band BOM range, display delta marked TBD, evidence export | 2:00–3:00 |
| **Scientific integrity** | confidence ribbon, dual-gate, environmental fallback, "WBGT-indicative", "estimates strain not clinical" | 1:20–2:00 |

## Production notes

- Keep the **"Accelerated 30×"** badge visible whenever time is compressed — never imply real-time response speed.
- Prefer real dashboard capture over mockups; the deterministic simulator makes every take identical.
- If shooting the real band, cap its screen time at ~10 s; the simulator is the hero driver.
- Have a fully pre-recorded run as backup (see [`demo-runbook.md`](demo-runbook.md)).
