# CoreSense concept-footage pack

**Prepared:** 9 August 2026  
**Owner:** Icy — presentation video and product storytelling  
**Status:** two new field-concept clips, one product-concept clip, and three licensed-stock edit cuts are local and prepared. Final continuous-playback QC is still required before export.

## The edit strategy

Use real CoreSense screen recordings, firmware output, Wokwi evidence, and the physical prototype for every technical claim. Use licensed stock footage to establish real work environments. Use AI footage only for short transitions that show the intended human impact.

Every AI frame must display:

`AI-GENERATED CONCEPT VISUAL · NOT FIELD FOOTAGE`

Every stock shot containing workers must display:

`LICENSED STOCK FOOTAGE · NOT A CORESENSE SITE`

Neither category may be described as a customer, partner, pilot, deployment, field test, validated outcome, or working physical downlink.

## Ready now: generated motion

| Edit source | Recommended cut | Exact job | QC state | Decision |
|---|---:|---|---|---|
| `video-assets/gemini-coresense-field-heat-hydration-silent.mp4` | 00:04–00:10 | worker checks wrist, then acts by moving to hydration | full decode + 20-frame sampled review | use with full-duration disclosure |
| `video-assets/gemini-coresense-product-hero-silent.mp4` | 00:56–01:02 | six-second product-concept reveal before real UI/prototype proof | 20-frame sampled review | use with full-duration disclosure |
| `video-assets/gemini-coresense-field-storm-recall-silent.mp4` | 03:36–03:42 | supervisor guides crew calmly to shelter | full decode + 20-frame sampled review | use with disclosure and consistent crop |

The original files retain provider audio for provenance. The `-silent.mp4` files are the preferred edit sources; do not mix the generated audio into the finalist master.

### Heat and hydration cut

Start after the worker has raised the wrist and end when the hydration station becomes the visual focus. The clip supports the idea that an alert should lead to a clear action. It does **not** prove sensor accuracy, a real CoreSense site, or a completed CoreSense watch.

### Product hero cut

Keep it to six seconds. Add a small subtitle such as `INDUSTRIAL-DESIGN CONCEPT`, retain the required AI disclosure, then hard-cut to the real circular device-preview capture. This contrast makes the concept aspirational without confusing it with the prototype.

### Storm-recall cut

The generated scene is panoramic inside a 16:9 file. Either retain the cinematic bars intentionally across the whole six-second shot or crop once to a consistent 16:9 composition; do not animate between both. It supports forecast-to-action storytelling only. It does not show a verified API warning, a command reaching a physical watch, or an accelerometer detecting weather.

## Licensed stock shortlist

Pexels currently allows its photos and videos to be used and modified without required attribution. Its license also prohibits implying that identifiable people or brands endorse the product, so these shots must remain neutral context and carry the stock disclosure.

### Local edit cuts

| Edit source | Creator | Cut | QC state | Decision |
|---|---|---:|---|---|
| `video-assets/stock/pexels-8964930-construction-heat-edit-4s.mp4` | Mikael Blomkvist | 4.00 s, 1920×1080 | full decode + 10-frame cut review | edit-ready; final playback pending |
| `video-assets/stock/pexels-6107944-tropical-heavy-rain-edit-4s.mp4` | Ankit Bhattacharjee | 4.00 s, 1280×720 | full decode + 10-frame cut review | edit-ready; final playback pending |
| `video-assets/stock/pexels-4281403-warehouse-briefing-edit-4s.mp4` | Tiger Lily | 4.00 s, 1920×1080 | full decode + 10-frame cut review | edit-ready; final playback pending |

The complete downloaded source files are retained beside the cuts for provenance. The tropical-rain source includes audio, but its prepared edit cut is silent. The other prepared cuts are also silent.

### Additional online candidates

| Priority | Source page | Intended use | Current evidence state |
|---:|---|---|---|
| 1 | [Construction workers at a construction site](https://www.pexels.com/video/construction-workers-at-construction-site-10294766/) | manual-work montage | source page reviewed; download and full clip QC pending |
| 2 | [Top view of a palm tree plantation](https://www.pexels.com/video/top-view-of-a-palm-tree-plantation-12762096/) | palm-sector establishing shot | source page reviewed; download and full clip QC pending |
| 3 | [Men working in a warehouse](https://www.pexels.com/video/men-working-in-a-warehouse-4281405/) | closing sector montage | source page reviewed; download and full clip QC pending |

License reference: [Pexels license](https://www.pexels.com/license/).

Do not place an additional online candidate in the master until it has been downloaded into this project, decoded successfully, watched for its full duration, and entered in the manifest with source URL, creator, download date, resolution, duration, and SHA-256. The three local cuts already have provenance, decode, hash, and sampled-frame evidence; they still require one continuous playback review before final export.

## Exact concept-footage sequence

| Master time | Visual | Voiceover purpose | On-screen evidence label |
|---|---|---|---|
| 00:00–00:04 | licensed construction stock | establish the real occupational context | `LICENSED STOCK FOOTAGE · NOT A CORESENSE SITE` |
| 00:04–00:10 | AI heat/hydration action | show the human consequence: a warning becomes action | required AI disclosure |
| 00:56–01:02 | AI product hero | reveal the intended rugged form | required AI disclosure + `INDUSTRIAL-DESIGN CONCEPT` |
| 01:02 onward | real `/device-preview`, prototype, and dashboard | prove what has actually been built | `LIVE LOCAL BUILD` or precise simulation label |
| 03:32–03:36 | licensed heavy-rain stock | establish forecast risk | stock disclosure |
| 03:36–03:42 | AI storm recall | show calm prevention before conditions worsen | required AI disclosure |
| 03:42 onward | real Hazard Command Center and watch simulator | demonstrate the actual simulated coordination workflow | `SIMULATED FLEET · NO PHYSICAL DOWNLINK` |

## Finalist-quality rules

- Keep the combined AI-motion use at 18 seconds in this cut, below the 28-second cap.
- Never use a collapse, injury, panic, flood, or disaster spectacle for emotional manipulation.
- Never say that the wrist accelerometer detects rain, earthquakes, floods, or storms.
- Never show “help is coming” unless the incident screen also shows a supervisor acknowledgement.
- Put the strongest real proof immediately after each concept shot.
- Keep provider audio muted and use one consistent music bed plus purposeful alert/haptic sound design.
- Credit the AI provider and each downloaded stock creator in the end-source card even when attribution is not required.

## QC gate before export

- [ ] Every AI frame carries the full AI disclosure.
- [ ] Every stock worker shot carries the stock disclosure and does not imply endorsement.
- [ ] All downloaded stock footage has a local provenance record and full-duration review.
- [ ] No synthetic footage is labelled as a pilot, deployment, customer, partner, or measured outcome.
- [ ] Real screen recordings are current and show the correct `SIMULATION`, `DEMO_UNVALIDATED`, or `NOT_MEASURED` states.
- [ ] The full 7:45–8:00 master is watched from frame zero to the end after captions and audio are locked.

Machine-readable provenance and exact hashes are in [`CONCEPT-FOOTAGE-MANIFEST.json`](CONCEPT-FOOTAGE-MANIFEST.json).
