# CoreSense — Icy-led 8-minute video production pack

**Version:** 1.0 · 9 August 2026  
**Target master:** 7:45, leaving 15 seconds of platform and export safety  
**Primary presenter / narrative owner:** Icy  
**Purpose:** finalist-quality Asian Action Hackathon 2026 submission  
**Evidence rule:** real captures prove the product; AIGC only illustrates context or future impact and is always labelled.

## 1. The one-sentence story

CoreSense turns invisible, individual heat strain into a clear worker action, a coordinated supervisor response, and a reviewable evidence trail—without pretending that a forecast replaces WBGT, a wristband is a clinical thermometer, or a software demo is field validation.

## 2. Production decision

Make a **7:45 evidence-led mini-documentary**, not an eight-minute feature tour.

The emotional arc is:

1. **Invisible risk:** a shared hot environment does not affect every worker equally.
2. **Personal action:** the band estimates strain, preserves uncertainty, and tells the worker what to do.
3. **Site coordination:** WBGT, official warnings, forecasts, incidents, acknowledgements, and recovery become one operating loop.
4. **Commercial proof path:** Icy shows who benefits, who buys, how a bounded pilot works, and what evidence is still missing.
5. **Credible ask:** recruit a host, independent reviewer, and worker-rights route for a governed pilot.

Icy should appear on camera at the opening, the commercial transition, and the closing. Use Icy's voice for the whole master unless the team can record clean, consistent audio from every member. Teammate appearances can be brief visual handoffs with their names and roles.

## 3. Exact 7:45 master script and shot plan

Read at a calm **135–145 words per minute**. Do not rush the safety boundaries. The quoted narration below is the recording script.

### 0:00–0:22 — Cold open: the risk nobody can see

**Picture**

- 0:00–0:04 black screen, distant worksite ambience, one haptic pulse.
- 0:04–0:14 use `icy-aigc-01-heat-construction.png` with a slow 4% push-in.
- 0:14–0:22 cut to Icy on camera, medium close-up, real prototype or round-watch preview visible beside her.
- AIGC lower-third for the generated shot: **AI-GENERATED CONCEPT VISUAL**.

**Icy — verbatim**

> “Heat risk can become dangerous before a worker looks unwell. A site reading tells us about the environment, but not why one person is struggling sooner than everyone else. CoreSense closes that gap—without replacing the controls already protecting the site.”

**On-screen text**

`ONE SITE · DIFFERENT HUMAN RESPONSE`

### 0:22–0:52 — Problem and beneficiaries

**Picture**

- Clean three-column motion graphic: Worker → Supervisor → HSE / ESG.
- Insert real `/icy` screen capture at “who benefits”.

**Icy — verbatim**

> “The worker needs one immediate action. The supervisor needs to know who acknowledged, who rested, and who still needs help. HSE and ESG teams need a traceable record with clear limits. Our first beneficiary is the heat-exposed worker; our operating users are supervisors and Safety and Health Officers; and our buyer hypothesis is the employer or site operator responsible for HSE, operations, or sustainability.”

**On-screen text**

`Worker action · Supervisor coordination · Reviewable evidence`

### 0:52–1:22 — Solution overview

**Picture**

- Animated system line: wristband → ESP-NOW gateway → supervisor dashboard → evidence export.
- Real close-up of the round 240 × 240 watch preview.
- Show no physical downlink animation unless the overlay says **SIMULATED GATEWAY / FLEET**.

**Icy — verbatim**

> “CoreSense is an ESP32-C3 worker band, a shared site heat station, and a supervisor dashboard. The band processes heart rate locally, estimates core temperature with uncertainty, and turns the result into BAND OK, CAUTION, or REST NOW. Only pseudonymous derived metrics leave the band—never raw PPG and never a worker’s name in the radio packet.”

**On-screen text**

`Sense → Estimate → Decide → Act → Record`

### 1:22–2:04 — Technical core: Buller ECTemp on the edge

**Picture**

- Hongshen or Muthu points to the scalar EKF equation.
- Animate only two mutable boxes: `CT` and `variance`.
- Show the real native diff-test result and firmware build result, not invented benchmark graphics.
- Optional 3-second Wokwi insert only after the license is renewed and the serial monitor visibly reaches `WOKWI_READY`.

**Icy — verbatim**

> “Every minute, the firmware averages usable heart-rate evidence and runs the published Buller ECTemp extended Kalman filter. The mutable estimator state is only two 32-bit floats: core-temperature estimate and variance. Process noise prevents false certainty; observation noise prevents one heart-rate spike from moving the estimate too far. Our C++ firmware is diff-tested against the TypeScript reference to less than one ten-thousandth of a degree. This is an estimate for active workers—not a clinical thermometer and not a diagnosis.”

**On-screen text**

`ECTemp mutable state: 8 bytes · C++ ↔ TypeScript parity < 1e−4 °C`

### 2:04–2:42 — Honest uncertainty and environmental fallback

**Picture**

- Real `dropout` simulator capture.
- Show confidence ribbon widening, RED withheld, and environmental fallback state.
- Keep `ACCELERATED 30×` visible for every compressed simulation shot.

**Icy — verbatim**

> “The important feature is not just the estimate—it is knowing when not to trust it. When optical signal quality degrades, the confidence band widens. CoreSense does not silently guess. A conservative red decision requires both the point estimate and its lower confidence bound to clear the threshold. If the personal signal becomes unusable, the system visibly falls back to the site’s environmental advisory.”

**On-screen text**

`NO SILENT GREEN · NO CONFIDENT GUESS`

### 2:42–3:28 — Worker interface, fall check, and SOS

**Picture**

- Real `/device-preview` capture inside the 1.28-inch round mask.
- Demonstrate: short tap wake; 650–4,999 ms page hold; 5,000 ms SOS; 10-second screen timeout.
- Demonstrate one urgent command acknowledgement and one possible-fall cancellation.

**Icy — verbatim**

> “The round interface is deliberately small and action-first. A tap wakes the display or acknowledges an urgent instruction. A medium hold changes the page. A five-second hold raises a manual SOS once. The screen sleeps after ten seconds, while an urgent instruction remains pinned for the next wake. The MPU6050 may trigger a ten-second ‘Are you OK?’ check after suspicious motion. We call every result a possible fall because the current profile is synthetic and unvalidated. The accelerometer does not detect rain, floods, or earthquakes.”

**On-screen text**

`DEMO_UNVALIDATED_V1 · POSSIBLE FALL · DERIVED FEATURES ONLY`

### 3:28–4:22 — Weather intelligence and the command loop

**Picture**

- Start with the real measured-WBGT authority panel.
- Then reveal official MET Malaysia warnings and the 12-hour Open-Meteo planning forecast as separate panels.
- Use `icy-aigc-02-storm-shelter.png` for no more than six seconds during the prevention example; label it AIGC.
- Return immediately to the real Hazard Command Center.
- Simulate **RETURN TO SHELTER / KEMBALI KE TEMPAT PERLINDUNGAN** to 50 virtual bands.

**Icy — verbatim**

> “Current on-site heat authority remains the measured WBGT-indicative station. Forecasts help planning, while official Malaysian warnings add hazard context; neither automatically replaces the site measurement or sends a command. In this simulated command loop, an authorised supervisor selects a bilingual approved action, a site, zone, or crew, an expiry, and a muster code. Fifty virtual watches receive the same immutable command token, while delivery and acknowledgement remain independent. This milestone does not transmit to physical bands and does not contact 999.”

**On-screen text**

`MEASURED WBGT ≠ FORECAST ≠ OFFICIAL WARNING`

### 4:22–5:07 — The complete dashboard loop

**Picture**

- Real screen capture only.
- Sequence: worker becomes amber/red → acknowledgement → rest logged → recovery curve → `/metrics`.
- Show manual SOS incident: new → acknowledged → responder assigned → resolved.
- Keep mock/simulation badges visible.

**Icy — verbatim**

> “For the supervisor, the dashboard answers four questions: what is happening now, what action is required, who has responded, and what remains unresolved. An alert can be acknowledged, linked to a rest intervention, and reviewed against the worker’s recovery. A manual SOS or possible fall enters the site response queue and is not allowed to say ‘help is coming’ until a responder acknowledges it. This closes the loop from signal to action to outcome.”

**On-screen text**

`DETECT → ACKNOWLEDGE → INTERVENE → VERIFY RECOVERY`

### 5:07–5:50 — Icy’s compliance and audit-trail story

**Picture**

- Icy on camera for the first sentence.
- Cut to `/compliance`, event chronology, CSV/PDF export, hash receipt, and controlled source status.
- Zoom into scope, site, issue time, actor, acknowledgement, decision snapshot, and SHA-256 fields.

**Icy — verbatim**

> “My responsibility is to make this operationally and commercially defensible. CoreSense records the alert, source state, selected action, delivery, acknowledgement, responder, rest, recovery, and exception. The export is site-scoped and carries deterministic ordering, row count, and a content hash. This can support DOSH, internal HSE, contractor, MSPO, and ESG review. It is not DOSH approval, legal compliance by default, certification, or external assurance. Evidence is useful only when its completeness, integrity, and control effectiveness can be examined.”

**On-screen text**

`AUDIT SUPPORT · NOT CERTIFICATION OR ASSURANCE`

### 5:50–6:31 — Commercial viability and buying system

**Picture**

- Real `/pilot-compliance#beneficiaries`, then `/pilot-compliance#commercial`.
- Display two buyer cards: Construction and Palm Oil.
- Cost card must say **prototype baseline / not final price**.

**Icy — verbatim**

> “Our beachhead hypotheses are Malaysian construction and palm-oil operations. In construction, the economic buyer may be group HSE, a project director, or principal contractor. In plantations, it may be operations, estate leadership, or group sustainability. The pre-display single-unit prototype baseline is roughly ninety to one hundred and forty ringgit, but the round display, assembled service, calibrated comparison, training, support, spares, and replacement burden are not yet fully quoted. We will sell a governed pilot and its evidence—not fear, medical certainty, or a compliance badge.”

**On-screen text**

`PRICE HYPOTHESIS ≠ VERIFIED UNIT ECONOMICS`

### 6:31–7:08 — Ten-week pilot and collaboration ask

**Picture**

- Real ten-week pilot timeline from `/pilot-compliance#pilot`.
- Show the partner model as three circles: host site + independent reviewer + worker-rights route.
- Show shortlist names only as research targets; do not show their logos or imply endorsement.

**Icy — verbatim**

> “The next milestone is a ten-week, shadow-first pilot. Week one freezes governance, consent, scope, and success metrics. Weeks two and three close bench and people readiness. Weeks four and five run beside existing controls. Only after those gates pass do weeks six to eight test active advisory under a documented supervisor protocol. Week nine evaluates safety, reliability, adoption, cost, and auditability. Week ten makes a go, revise, or stop decision. We are seeking one host site, one independent technical or research reviewer, and one worker-rights or ethics route.”

**On-screen text**

`SHADOW FIRST · EXISTING CONTROLS REMAIN ACTIVE`

### 7:08–7:45 — Closing: impact with an honest boundary

**Picture**

- Icy returns on camera for “Today”.
- At 7:23, dissolve into `icy-aigc-03-sector-impact.png` with a gentle 3% pull-back.
- At 7:36, land on CoreSense wordmark and the exact pilot ask.
- Label the generated montage **AI-GENERATED IMPACT CONCEPT**.

**Icy — verbatim**

> “Today, CoreSense is an integrated software and firmware candidate with deterministic simulations, a complete dashboard, and explicit open hardware and field gates. It is not yet a mature field product. But the operating idea is ready to test: give each worker an action they can understand, give each supervisor a response they can close, and give each organisation evidence it can honestly review. Help us turn this governed pilot candidate into measured protection for real workers.”

**Final card**

`CORESENSE`  
`Seeking: host site · independent validator · worker-rights review`  
`Pilot, measure, improve—without weakening existing controls.`

## 4. Icy’s on-camera performance plan

### Recording blocks

Record Icy in four short blocks rather than one long take:

| Block | Script sections | Target recorded duration | Camera |
|---|---|---:|---|
| A | Cold open + beneficiaries | 50 s | Medium close-up, eye line into lens |
| B | Compliance story | 43 s | Standing beside monitor, three-quarter angle |
| C | Commercial + pilot | 78 s | Seated/standing transition, restrained hand gestures |
| D | Closing | 37 s | Same framing as opening, slightly wider |

Record two clean takes and one safety take per block. Leave two seconds of room tone before and after each take.

### Delivery direction

- Speak as a product owner, not an advertisement narrator.
- Stress: **worker**, **action**, **acknowledgement**, **shadow-first**, and **measured**.
- Pause half a beat after every boundary: “not a clinical thermometer”, “does not contact 999”, and “not yet a mature field product”.
- Look at the lens for the problem, claim boundary, and final ask. Look toward the dashboard only when describing a visible interaction.
- Avoid “bulletproof”, “guaranteed”, “prevents all”, “DOSH approved”, “AI detects disasters”, or “help is coming”.

## 5. Real capture list

Capture these at 1920 × 1080 or higher with browser zoom at 100%, the cursor parked away from the evidence, and no personal notifications visible.

| ID | Real screen / shot | Required visible evidence | Length |
|---|---|---|---:|
| R01 | `/icy` | beneficiary, buyer, prepared/open gates | 8 s |
| R02 | `/device-preview` normal | round screen and Action/Body/Environment/Device pages | 12 s |
| R03 | `/device-preview` emergency | five-second SOS, urgent acknowledgement, 10 s timeout | 15 s |
| R04 | heavy-heat simulation | `ACCELERATED 30×`, confidence ribbon, amber/red | 22 s |
| R05 | dropout simulation | widening uncertainty and environmental fallback | 18 s |
| R06 | Hazard Command Center | separate WBGT/forecast/warning authorities | 12 s |
| R07 | 50-band command simulation | SIMULATION label, receipt counters, immutable token | 16 s |
| R08 | incident workflow | new → acknowledged → assigned → resolved | 14 s |
| R09 | `/metrics` | recovery and operational evidence | 8 s |
| R10 | `/compliance` | event chain and hashed export | 18 s |
| R11 | `/pilot-compliance` | beneficiaries, commercial boundary, ten-week plan | 18 s |
| R12 | firmware proof | ECTemp native test and successful PlatformIO build | 8 s |
| R13 | physical prototype | wrist raise, short tap, long hold; no unsupported claims | 10 s |
| R14 | optional Wokwi | only after `WOKWI_READY`; label simulated | 5 s |

Do not use R14 while the VS Code extension reports an expired license. The compiled Wokwi build remains useful engineering evidence, but it is not a live run.

## 6. AIGC asset plan

### Generated project assets

| ID | File | Use | Maximum screen time |
|---|---|---|---:|
| A01 | `video-assets/icy-aigc-01-heat-construction.png` | opening context | 10 s |
| A02 | `video-assets/icy-aigc-02-storm-shelter.png` | forecast-to-supervisor-action concept | 6 s |
| A03 | `video-assets/icy-aigc-03-sector-impact.png` | closing multi-sector impact | 12 s |

All three are generated concept images, not evidence of a deployment, customer, partner, pilot, or measured outcome.

### Generated motion provenance — 9 August 2026

| Asset | Provider / state | Local QC | Allowed use |
|---|---|---|---|
| `video-assets/gemini-coresense-product-hero.mp4` | Gemini Videos / Omni, completed | 10.005 s, 1280×720, 24 fps; 20-frame sampled geometry is consistent; provider audio and small decorative sparkle present | source archive only |
| `video-assets/gemini-coresense-product-hero-silent.mp4` | audio-stripped derivative | H.264 video retained without the generated AAC track | preferred product-concept edit source |
| `video-assets/gemini-coresense-product-hero-contact-sheet.jpg` | local QC derivative | five sampled frames | review evidence only |
| `video-assets/gemini-coresense-product-hero-qc-20frames.jpg` | local QC derivative | 20 frames at 0.5-second intervals | review evidence only |
| A01 reference-image field animation | Gemini Videos / Omni, rejected by provider | no media produced | do not use |
| `video-assets/gemini-coresense-field-heat-hydration.mp4` | Gemini Videos / Omni, completed | 10.005 s, 1280×720, 24 fps; full decode + 20-frame sampled review | archive with provider audio |
| `video-assets/gemini-coresense-field-heat-hydration-silent.mp4` | audio-stripped derivative | wrist check → calm walk → shaded hydration station; no visible logo, injury, or fake UI in sampled frames | preferred A01 edit source; maximum 6 s with disclosure |
| `video-assets/gemini-coresense-field-storm-recall.mp4` | Gemini Videos / Omni, completed | 10.005 s, 1280×720, 24 fps; full decode + 20-frame sampled review | archive with provider audio |
| `video-assets/gemini-coresense-field-storm-recall-silent.mp4` | audio-stripped derivative | supervisor gesture → coordinated crew walk → shelter; panoramic composition | preferred A02 edit source; maximum 6 s with crop and disclosure |

The two field sequences passed full-file decode checks and 20-frame sampled
visual review, but they have **not** received an every-frame/full-playback human
review. Their exact edit placements, hashes, stock alternatives, and final QC
gate are in [`ICY-CONCEPT-FOOTAGE-PACK.md`](ICY-CONCEPT-FOOTAGE-PACK.md).

The Gemini product render is an **AI-generated industrial-design concept**, not
footage of an assembled CoreSense device. Keep the required disclosure visible
for its full on-screen duration. Provider completion does not establish physical
fit, sensor placement, UI accuracy, battery performance, ingress protection, or
field readiness.

### Required disclosure

Place this in the lower-left for the full duration of every generated shot:

`AI-GENERATED CONCEPT VISUAL · NOT FIELD FOOTAGE`

Use 22–26 px at 1080p, solid navy backing at 85% opacity, and keep it inside title-safe margins. Also list the three generated shots in the end-credit source card.

### Image-to-video prompts for Sora or another generator

Use the project still as the visual reference. Generate each clip at 16:9, 24 fps, without audio, dialogue, text, logos, or added objects.

**A01 motion prompt — opening heat pressure, 6 seconds**

> Slow cinematic dolly-in toward the worker checking the wrist. Very subtle humid heat haze moves above the ground; the safety vest shifts slightly in a light breeze; distant workers at the shaded hydration station make small natural movements. Preserve the worker, PPE, wrist, construction geometry, and rest station exactly. Documentary realism, stable camera, no new people, no injury, no collapse, no text, no logo, no hologram, no altered hands.

**A02 motion prompt — proactive shelter return, 6 seconds**

> Slow lateral tracking shot as workers calmly continue along the safe path toward the shelter. Palm fronds move in strengthening wind and the first light rain begins; the supervisor makes one clear guiding gesture. Preserve all worker identities, PPE, wrist device, path, and shelter. No flood, no lightning strike, no panic, no running, no injury, no disaster spectacle, no text, no logo, no claim that the watch detected weather.

**A03 motion prompt — closing impact, 8 seconds**

> Gentle parallax across the three connected work settings, moving from construction hydration to palm-estate return and logistics shift briefing. Workers make small natural movements and interact respectfully. Warm light grows slightly as the camera pulls back. Preserve PPE and environments, no new panels, no fake screen, no statistic, no logo, no text, no medical scene, no surveillance atmosphere.

### What AIGC must never show

- a real company logo, uniform, site name, or partner endorsement;
- a worker collapsing for emotional effect;
- a fabricated watch interface or dashboard presented as the product;
- a wrist accelerometer detecting rain, floods, earthquakes, or storms;
- a command reaching a physical watch before physical downlink exists;
- invented accuracy, incident reduction, customer count, ROI, or market share;
- emergency services responding when the demo only creates an in-app/mock incident.

## 7. Graphics and edit language

### Visual system

- Base: deep navy / charcoal.
- Safe: teal-green.
- Caution: safety amber.
- Urgent: red used only for genuine alert states.
- Type: project display face for titles, monospace for metrics and evidence IDs.
- Transitions: straight cuts for proof, restrained dissolves for AIGC context, no glitch effects.
- Data animations: 400–600 ms, linear/ease-out, never faster than the viewer can read.

### Exact recurring badges

- `REAL DASHBOARD CAPTURE`
- `DETERMINISTIC SIMULATION · ACCELERATED 30×`
- `SIMULATED COMMAND · PHYSICAL TRANSMISSION FALSE`
- `DEMO_UNVALIDATED_V1 · POSSIBLE FALL`
- `AI-GENERATED CONCEPT VISUAL · NOT FIELD FOOTAGE`
- `NOT_MEASURED ON ASSEMBLED DEVICE`

### Audio

- One restrained cinematic bed, 70–85 BPM, no heroic trailer hits.
- Start with real worksite ambience and one haptic pulse.
- Lower music at least 12 dB under speech.
- Use one consistent haptic sound for worker alerts and a softer acknowledgement tone.
- Do not use sirens for simulated warnings or possible-fall events.
- Record narration at 48 kHz / 24-bit; target integrated loudness near −14 LUFS and true peak below −1 dBTP for web delivery.

## 8. Judge-criterion map

| Criterion | Primary proof in the film | Time |
|---|---|---|
| Problem significance | individual risk cannot be inferred from one ambient number | 0:00–0:52 |
| Technical innovation | on-device ECTemp + uncertainty + personal/environmental fallback | 1:22–2:42 |
| Feasibility | native parity test, firmware build, bounded watch interactions | 1:22–3:28 |
| Proposed solution | worker band + WBGT + weather intelligence + dashboard loop | 0:52–4:22 |
| Health impact pathway | alert → rest → recovery evidence; no invented outcome | 4:22–5:07 |
| Scalability | shared gateway model and 50 virtual receipt states | 3:28–4:22 |
| Commercial viability | named buyer system, cost boundary, governed pilot | 5:50–7:08 |
| Target beneficiaries | workers first, then operational and governance users | 0:22–0:52 |
| Implementation plan | ten-week shadow-first protocol | 6:31–7:08 |
| Integrity / maturity | explicit simulation, unvalidated, and `NOT_MEASURED` labels | throughout |

## 9. Shoot-day plan

### Before recording

1. Freeze the UI and firmware revision used for the video.
2. Run the complete local verification gate and save outputs with timestamps.
3. Reset deterministic demo data.
4. Record a full backup dashboard run before filming people.
5. Put every computer and phone into Do Not Disturb; hide bookmarks, credentials, phone numbers, and unrelated project names.
6. Print the four Icy recording blocks in 18–20 pt text.
7. Prepare water, a safe shaded location, correct PPE, and written permission for anyone filmed.

### Suggested half-day schedule

| Time | Activity |
|---|---|
| 00:00–00:30 | equipment, lighting, white balance, audio and privacy check |
| 00:30–01:20 | Icy blocks A–D, two good takes plus safety take |
| 01:20–02:00 | teammate technical inserts and physical prototype close-ups |
| 02:00–02:40 | real dashboard captures R01–R11 |
| 02:40–03:00 | firmware proof and optional licensed Wokwi capture |
| 03:00–03:20 | pickups, room tone, hands, band, hydration and site-detail B-roll |

## 10. Edit plan and file structure

```text
video/
  01_script/
  02_a-roll/icy/
  02_a-roll/team/
  03_product-band/
  04_dashboard-captures/
  05_aigc/
  06_audio/voice/
  06_audio/music-sfx/
  07_graphics/
  08_project/
  09_exports/review/
  09_exports/final/
```

Use filenames such as `R07-command-50bands-take01.mov` and `ICY-C-TAKE02.wav`. Do not use `final-final-v3` naming.

### Edit passes

1. **Radio cut:** narration only; must land between 7:20 and 7:35.
2. **Evidence cut:** add real product and dashboard proof.
3. **Context cut:** add no more than 28 seconds total of AIGC.
4. **Graphics pass:** badges, claims, source references, captions.
5. **Audio pass:** dialogue cleanup, music, haptics, loudness.
6. **Integrity pass:** verify every claim and simulation/AIGC disclosure frame-by-frame.
7. **Judge pass:** one person unfamiliar with CoreSense must explain the problem, solution, buyer, pilot, and open gates after one viewing.

## 11. Export and quality-control checklist

### Master export

- 3840 × 2160 preferred, otherwise 1920 × 1080.
- 16:9, progressive, 24 or 30 fps; do not mix frame rates without conforming.
- H.264 high profile, VBR, 25–45 Mbps for 4K or 12–20 Mbps for 1080p.
- AAC stereo, 48 kHz, 320 kbps.
- Burned-in English captions plus a clean subtitle file if the platform accepts one.
- Final duration **≤ 7:50**.

### Final gate

- [ ] Icy’s words match the approved script or remain inside the same claim boundary.
- [ ] All AIGC is disclosed for every visible frame.
- [ ] All accelerated footage says `ACCELERATED 30×`.
- [ ] All commands, incidents, and fleet deliveries say simulation/mock.
- [ ] Weather forecast never replaces measured WBGT.
- [ ] MPU6050 is never described as a rain or disaster detector.
- [ ] Possible fall remains `DEMO_UNVALIDATED_V1`.
- [ ] No statement implies clinical temperature, DOSH approval, certification, assurance, validated battery life, or field-ready downlink.
- [ ] No credentials, phone numbers, real worker records, browser notifications, or unrelated projects are visible.
- [ ] Partner names are described as researched candidates, never confirmed collaborators.
- [ ] A 30-second muted viewing still communicates problem, action, proof, buyer, and ask.
- [ ] A backup 1080p MP4 plays from a different laptop and offline.

## 12. Recommended title and thumbnail

**Video title:** `CoreSense: From Invisible Heat Strain to Accountable Action`

**Thumbnail copy:** `WORK — OR REST NOW?`

Use a real round-watch/dashboard composite for the thumbnail, not an AIGC product render. The AIGC construction frame can sit in the background only if it retains the disclosure in the video description or submission notes.

## 13. Final submission description

> CoreSense is a privacy-limited worker heat-strain advisory and supervisor evidence system developed for the Asian Action Hackathon 2026. The video combines real local software/firmware evidence, deterministic simulations, a physical-design concept, and clearly labelled AI-generated context visuals. Commands, incidents, fall traces, and the current fleet are simulated; assembled-device runtime, field fall performance, physical downlink, clinical accuracy, and operational impact remain validation gates. CoreSense does not replace WBGT assessment, competent HSE decisions, medical judgement, emergency services, certification, or legal review.
