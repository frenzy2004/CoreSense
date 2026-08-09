# CoreSense video AIGC asset provenance

**Generated:** 9 August 2026  
**Generator path:** OpenAI built-in image generation  
**Intended use:** clearly labelled concept visuals in the Icy-led hackathon video  
**Not evidence of:** a deployment, partner, customer, field pilot, measured outcome, or finished product

## Required disclosure

Every frame using these assets must carry:

`AI-GENERATED CONCEPT VISUAL · NOT FIELD FOOTAGE`

Do not crop, animate, or cover this disclosure in the master edit. Generated
watch-like objects are atmosphere only; use real CoreSense screen captures for
all interface and technical claims.

## Assets

### `icy-aigc-01-heat-construction.png`

- Dimensions: 1672 × 941
- SHA-256: `46295a7d5c7fafdc4b146ff76502b60acbd1c632bf3f75e9394a2cb24a264bcc`
- Scene: Malaysian construction worker in correct PPE checking the wrist near a shaded hydration station under high heat.
- Prompt intent: cinematic documentary realism; worker on the right with negative space; dignified urgency; no text, logo, injury, collapse, fake dashboard, or hologram.

### `icy-aigc-02-storm-shelter.png`

- Dimensions: 1672 × 941
- SHA-256: `b72110ec643e66d8804b0184e070dcef98ce4798a95379582cc1821bef444e53`
- Scene: palm-estate workers calmly returning toward a shelter before a tropical storm while a supervisor guides the group.
- Prompt intent: proactive prevention rather than disaster spectacle; no flood, lightning strike, injury, panic, logo, fake UI, or implication that an accelerometer detected the weather.

### `icy-aigc-03-sector-impact.png`

- Dimensions: 1672 × 941
- SHA-256: `efc253c5aac3885e27d0a4299b5f529c62972c63106f90ebc638ea4bc00a2def`
- Scene: connected construction, palm-estate, and logistics-worker settings with correct PPE and an optimistic prevention theme.
- Prompt intent: multi-sector closing concept; no text, logo, injury, fake statistics, invented UI, medical claim, or surveillance mood.

### `icy-aigc-04-product-reference.png`

- Dimensions: 1672 × 941
- SHA-256: `c2ecefd8e67bce66a02dcda6ab0e9dd91817561d677df489aa18d8a78e12016c`
- Scene: studio hero concept of a rugged round-display worker band with a dark TPU strap and a single side control.
- Prompt intent: consistent image-to-video reference for product storytelling.
- Boundary: not CAD, final industrial design, assembled hardware, waterproofing evidence, certification evidence, or measured product footage.

## Local AIGC motion proxies

These eight-second H.264 clips were produced locally from the stills with a
restrained push-in. They are not Sora outputs and do not contain synthesized
human motion. Each carries a burned-in `AIGC CONCEPT FOOTAGE` watermark; the
master edit must still add the complete required disclosure above.

| Clip | Resolution / duration | SHA-256 |
|---|---|---|
| `icy-aigc-motion-01-heat-impact.mp4` | 1920 × 1080 / 8.00 s | `44d5e5563cec5156ca5b641a920e8465a977e4ec217df8ba69db0ea439e5faa2` |
| `icy-aigc-motion-02-storm-action.mp4` | 1920 × 1080 / 8.00 s | `839beb7813daedf2bf7d92d0c60204583ef158de883f02aad62cceae2f3609ba` |
| `icy-aigc-motion-03-sector-impact.mp4` | 1920 × 1080 / 8.00 s | `1ab731ca455e6b85d1d91ce6c73f8dbff3a89ca5106b17b351943ceb7dcb4ff3` |
| `icy-aigc-motion-04-product-hero.mp4` | 1920 × 1080 / 8.00 s | `0c0350c70bf18571645f8be0cabbb56eca61b240b2b4ebec8162c890d403e56d` |

Visual QC contact sheet: `icy-aigc-motion-contact-sheet.jpg`  
SHA-256: `97204aa394ba66a13df75bce3cdb976887a0983482b480051b4bb96ec06b0d7a`

## Gemini concept-motion clips

These are fictional, AI-generated video scenes. The original files retain the
provider AAC track for provenance; use the silent derivatives in the master.
Both field clips passed a full-file decode check and a 20-frame sampled visual
review. That is not an every-frame or full-playback human review.

| Clip | Resolution / duration | Edit decision | SHA-256 |
|---|---|---|---|
| `gemini-coresense-field-heat-hydration.mp4` | 1280 × 720 / 10.005 s | archive only | `0BF310DE9FCBF889830A25D0D35D01AB1F96C53BBB8FADBFBE6C9CD2D275D762` |
| `gemini-coresense-field-heat-hydration-silent.mp4` | 1280 × 720 / 10.005 s | preferred; use ≤6 s with disclosure | `D1F05E9757EA45AAB2BDD94D78F22323D04819A85B7E258C8A2CCC9CC437D5E0` |
| `gemini-coresense-field-storm-recall.mp4` | 1280 × 720 / 10.005 s | archive only | `5374BE31CB18F72E63CE10F8ABE156E43EA95AC6BCB7D9E3DD6EE6B1DAEA8D34` |
| `gemini-coresense-field-storm-recall-silent.mp4` | 1280 × 720 / 10.005 s | preferred; use ≤6 s with crop and disclosure | `F5424CD23F06F761968CF4954879F3416FC32F2DE95AF80B94D1D3FA113BDFB1` |

QC sheets:

- `gemini-coresense-field-heat-hydration-qc-20frames.jpg`
- `gemini-coresense-field-storm-recall-qc-20frames.jpg`

The heat clip shows a generic wearable rather than verified CoreSense hardware.
The storm clip shows the intended human response but not a legible API warning
or a command delivered to a physical watch. Neither clip is field evidence.

The canonical manifest is
[`../CONCEPT-FOOTAGE-MANIFEST.json`](../CONCEPT-FOOTAGE-MANIFEST.json), and the
editor-facing sequence is
[`../ICY-CONCEPT-FOOTAGE-PACK.md`](../ICY-CONCEPT-FOOTAGE-PACK.md).

## Licensed stock sources and prepared cuts

The `stock/` folder contains three downloaded Pexels sources, their four-second
silent edit cuts, and sampled-frame QC sheets. The downloaded files have full
decode checks and hashes in the canonical manifest. They have not received a
continuous full-duration human playback review, so the edit cuts remain gated
until the final editor watches them from start to end.

| Prepared edit cut | Source creator | Use boundary |
|---|---|---|
| `stock/pexels-8964930-construction-heat-edit-4s.mp4` | Mikael Blomkvist | neutral construction context only |
| `stock/pexels-6107944-tropical-heavy-rain-edit-4s.mp4` | Ankit Bhattacharjee | weather context only; not a device detection claim |
| `stock/pexels-4281403-warehouse-briefing-edit-4s.mp4` | Tiger Lily | neutral logistics context only |

Every stock shot containing identifiable people must carry
`LICENSED STOCK FOOTAGE · NOT A CORESENSE SITE` and must not imply that the
people or brands endorse CoreSense. License: <https://www.pexels.com/license/>.

## Sora status on 9 August 2026

The Sora web/app interface is discontinued. The API remains documented until
24 September 2026, but this workspace did not have `OPENAI_API_KEY` configured,
so no Sora generation was submitted. The four API-ready jobs and their exact
motion constraints are stored in `../SORA-VIDEO-JOB-MANIFEST.json`; the guarded
runner is `../../scripts/generate-sora-video-pack.ps1`.

## Motion-generation rule

If these stills are used as references in Sora or another image-to-video model,
use the locked motion prompts in
[`../ICY-8-MINUTE-VIDEO-PRODUCTION-PACK.md`](../ICY-8-MINUTE-VIDEO-PRODUCTION-PACK.md).
The generated clip must preserve people, PPE, hands, wrist objects, site
geometry, and safety conditions. Reject any clip that adds a logo, injury,
alarm text, responder, disaster, or product behaviour not present in the real
CoreSense evidence.
