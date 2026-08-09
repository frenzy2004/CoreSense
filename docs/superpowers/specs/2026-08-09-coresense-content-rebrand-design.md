# CoreSense Content Rebrand Design

## Goal

Keep the existing viAct smart-watch clone's page structure, spacing, responsive behavior, and dark industrial visual language while replacing every viAct-specific brand, claim, image, link, and content block with accurate CoreSense material from `/Users/muthuramanpalaniappan/Downloads/docs/`.

The result should read as a complete CoreSense product page, not as a viAct page with isolated text substitutions.

## Product Positioning

CoreSense is an action-first worker band and site intelligence system for personal heat-strain awareness. The central story is:

**Sense -> Estimate -> Decide -> Act -> Record**

The page will explain that the prototype combines individual physiological signals with environmental heat information, estimates strain at the edge, communicates a clear action to the worker, escalates higher-risk events to supervisors, and records derived events for review.

The page must preserve the evidence boundaries documented in the source package:

- CoreSense is a safety decision-support prototype, not a clinical thermometer or medical device.
- The product render and field scenes are concept visuals, not deployment evidence.
- Skin temperature and local air temperature are separate measurements and are not presented as measured core temperature.
- Physical durability, assembled runtime, field effectiveness, certification, and target-workforce clinical accuracy are not yet validated.
- Missing or stale inputs must never be described as a silent safe state.

## Design Direction

### Preserved from the clone

- Single-logo black header with no navigation controls.
- Full-bleed dark hero with left-aligned copy and product imagery.
- White overview band with a wide lead tile and four supporting tiles.
- Black alternating feature section.
- Interactive use-case tabs.
- Industry card grid.
- Dark card-based evidence section in the location currently used for reviews.
- FAQ accordion, final CTA, and footer.
- Existing desktop and mobile breakpoints, section rhythm, card radii, and orange accent role.

### Changed for CoreSense

- Replace the viAct logo with a restrained text-based CoreSense wordmark so no unsupported logo asset is invented.
- Shift the accent from viAct orange-red to a heat-safety amber/orange supported by cyan status accents from the supplied product concept.
- Remove all viAct URLs, social profiles, address details, legal links, product names, customer claims, and testimonial language.
- Use local assets only for product and editorial media so the page is independent of viAct's Wix CDN.
- Add compact, persistent disclosure labels to AI-generated concept visuals.

## Section Mapping

### Header

- Keep the current 96px black bar and logo-only structure.
- Display a linked `CoreSense` wordmark.
- Link to `#top` because no public CoreSense corporate URL is supplied.

### Hero

- Eyebrow: `Personal heat-risk intelligence at the edge`.
- Headline: `Heat risk workers can act on.`
- Supporting copy: explain individual heat-strain awareness, clear on-wrist instructions, supervisor escalation, and continued edge operation when internet service is unavailable.
- Primary action: `Explore CoreSense`, linked to `#overview`.
- Background: `video-assets/icy-aigc-01-heat-construction.png`.
- Product visual: a transparent-background derivative based on `video-assets/icy-aigc-04-product-reference.png`, created only to fit the existing product stage. The page must label it `AI-GENERATED CONCEPT VISUAL - NOT FIELD FOOTAGE`.

### Overview

- Heading: `From signal to safer action`.
- Lead tile: describe the full `Sense -> Estimate -> Decide -> Act -> Record` loop.
- Supporting tiles:
  - `Individual + environmental`: personal evidence complements site WBGT.
  - `Edge-first decisions`: the worker still receives an action during connectivity loss.
  - `Privacy by construction`: derived pseudonymous scalars leave the band; raw PPG does not.
  - `Operationally legible`: the smallest screen prioritizes `BAND OK`, `CAUTION`, or `REST NOW`.
- Use supplied product, heat, sector, and Wokwi preview assets with source-appropriate disclosure labels.

### Unique Features

Retain five alternating rows and replace their content with:

1. `Uncertainty-aware heat estimation` - Buller ECTemp estimator, visible uncertainty, and conservative decision logic.
2. `Action-first worker interface` - round 240 x 240 display, haptics, acknowledgement, and wake behavior.
3. `Environmental fallback` - personal strain and WBGT complement each other; degraded signals do not produce false confidence.
4. `Edge connectivity without one SIM per worker` - ESP-NOW bands, site gateway, and optional cloud alert spine.
5. `Privacy and auditability` - derived metrics, acknowledgements, recovery events, role-scoped supervisor context, and exportable records.

The section will use local concept imagery and real prototype/simulator captures. Interface and engineering claims should be paired with `WOKWI-BUILD-PREVIEW.png`, `WOKWI-VSCODE-LIVE.png`, or `WOKWI-BUILD-PREVIEW.svg` instead of fictional dashboard UI.

### Use Cases

Keep the interactive tabs and use a CoreSense-specific case set:

1. `Early heat-strain action`
2. `Signal-quality fallback`
3. `Supervisor escalation`
4. `Recovery and audit trail`
5. `Offline site operation`

Each tab changes both the title/body and the associated local image. No tab will claim a completed field deployment.

### Industries

Replace the five viAct sectors with the five sectors named in the CoreSense brief:

- Construction
- Plantations
- Utilities
- Logistics
- Municipal field teams

Use a consistent local icon set or simple CSS-supported symbols. Cards describe pilot applicability, not measured outcomes.

### Evidence And Readiness

Replace the fabricated testimonial section with five evidence cards:

- Published estimator basis
- Shared algorithm implementation
- Deterministic simulation path
- Privacy-aware packet design
- Explicit validation backlog

Cards will cite the relevant source document by name and distinguish local engineering evidence from `NOT_MEASURED` items. The heading becomes `What CoreSense can prove today`.

### FAQ

Replace all viAct FAQ content with concise answers derived from the supplied source package. Topics include:

- What CoreSense measures and estimates.
- How CoreSense differs from an ambient-only WBGT monitor.
- What happens when wrist signal quality degrades.
- How the edge and site gateway communicate.
- What data leaves the band.
- Whether CoreSense is a medical device.
- Current battery and hardware maturity.
- Which pilot environments fit the current concept.

Every answer must avoid unsupported precision or certification claims.

### Final CTA And Footer

- CTA heading: `Turn invisible heat strain into one clear action.`
- Primary action links to `#overview`.
- Secondary action links to `#evidence`.
- Footer contains the CoreSense wordmark, a one-sentence evidence boundary, internal section links, and a source-material acknowledgement.
- Do not invent contact details, social accounts, customer names, or legal entity information.

## Asset Handling

Create `public/coresense/` and copy only the files used by the site. Use descriptive lowercase filenames.

Planned source assets:

- `video-assets/icy-aigc-01-heat-construction.png`
- `video-assets/icy-aigc-02-storm-shelter.png`
- `video-assets/icy-aigc-03-sector-impact.png`
- `video-assets/icy-aigc-04-product-reference.png`
- `WOKWI-BUILD-PREVIEW.png`
- `WOKWI-VSCODE-LIVE.png`
- `WOKWI-BUILD-PREVIEW.svg`

The supplied product reference may be edited with the built-in image generation tool to create one transparent hero cutout. The prompt must preserve the round display, rugged dark housing, dark strap, single side control, orange heat reading, and studio-product realism while removing the background. The resulting asset remains a concept visual and receives the same disclosure label.

Do not use the exposed API key. Do not add it to environment files, source control, command history, or deployment settings.

## Interaction And Accessibility

- Use-case tabs remain keyboard-operable with accurate `aria-selected` values and tab/panel relationships.
- FAQ uses native `details` and `summary` controls.
- Images receive descriptive alt text when informative and empty alt text when decorative.
- Disclosure badges remain legible without blocking the subject.
- Buttons and links have visible focus states.
- Text must not overlap imagery at desktop, tablet, or mobile widths.
- Motion is optional and must respect reduced-motion preferences; static local images are the default.

## Performance

- Serve all new media locally from `public/coresense/`.
- Resize or encode oversized source images for their actual display size while retaining source files outside the app.
- Avoid loading the supplied long-form videos by default.
- Keep the hero's largest visual optimized for the first viewport.
- Preserve explicit dimensions or aspect ratios to prevent layout shifts.

## Verification

- Extend rendered HTML tests to assert the CoreSense wordmark and key section headings are present.
- Assert that `viAct`, `viact.ai`, the old testimonials, and the old header controls are absent from rendered output.
- Assert all CoreSense local asset references resolve to files in `public/coresense/`.
- Test use-case interaction and FAQ behavior in a real browser.
- Run `npm test`, `npm run vercel-build`, and `npm run lint`.
- Verify desktop and mobile screenshots for hero framing, disclosure visibility, readable cards, tab behavior, and absence of overlap.
- Deploy to the existing Vercel production project and repeat the production browser checks.

## Out Of Scope

- Building the CoreSense firmware, dashboard, data pipeline, or alert service.
- Publishing the full technical document archive through the marketing page.
- Claiming certification, medical accuracy, completed field pilots, customers, measured safety outcomes, or production readiness.
- Adding analytics, forms, authentication, a database, or a content-management system.
