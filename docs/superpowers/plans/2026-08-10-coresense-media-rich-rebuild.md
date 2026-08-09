# CoreSense Media-Rich Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the CoreSense smart-watch page as a viAct-faithful, media-rich industrial product experience using the complete supplied CoreSense asset pack.

**Architecture:** Extend the existing content module with typed image/video media and keep the page as one client component with small local media helpers. Serve all media from `public/coresense`, use native video with posters and reduced-motion handling, and preserve the existing static export/Vercel deployment path.

**Tech Stack:** Next.js 16, React 19, TypeScript, CSS, Node test runner, Vercel static build

## Global Constraints

- The header contains only the CoreSense wordmark.
- Use the exact disclosure `AI-GENERATED CONCEPT VISUAL - NOT FIELD FOOTAGE` on generated media.
- Generated or stock media must not imply deployment, customers, partners, pilots, measured outcomes, or field validation.
- CoreSense remains a safety decision-support prototype, not a clinical thermometer, medical device, emergency service, certification, or replacement for site WBGT.
- Videos are local, muted, looping, inline, poster-backed, and controllable; reduced-motion users receive the poster rather than autoplay.
- No new runtime dependency or remote asset host.

---

### Task 1: Define The Media Contract

**Files:**
- Modify: `tests/rendered-html.test.mjs`
- Modify: `app/coresense-content.ts`
- Create: `public/coresense/product-hero.mp4`
- Create: `public/coresense/heat-hydration.mp4`
- Create: `public/coresense/storm-recall.mp4`

**Interfaces:**
- Produces: `Media` with `kind: "image" | "video"`, optional `poster`, `concept`, and `evidenceLabel` fields.
- Produces: unique hero, overview, feature, and use-case media records consumed by `SmartWatchClone`.

- [ ] **Step 1: Write failing source-contract tests**

Assert that the rendered page source contains all three local MP4 paths, the exact concept disclosure, CoreSense action copy, and no viAct navigation or testimonials.

- [ ] **Step 2: Run the contract test and confirm failure**

Run: `npm test`

Expected: FAIL because video media is not yet defined or rendered.

- [ ] **Step 3: Copy the three approved silent CoreSense clips**

Copy the product, heat/hydration, and storm/recall silent MP4 files from `/Users/muthuramanpalaniappan/Downloads/docs/video-assets/` into `public/coresense/` with the names above.

- [ ] **Step 4: Extend the content model**

Add typed video media, posters, per-media disclosure metadata, a five-step system loop, three focused feature stories, media-rich use cases, and a panorama-led industry list. Keep copy sourced from `ONE-PAGE-SUMMARY.md`, `video-script.md`, `limitations.md`, and `architecture.md`.

- [ ] **Step 5: Run the contract test**

Run: `npm test`

Expected: tests may still fail on rendering until Task 2, but content-level assertions pass.

### Task 2: Build Accessible Media Components And Page Composition

**Files:**
- Modify: `app/SmartWatchClone.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: the extended `Media`, system-loop, feature, use-case, industry, and evidence records from `coresense-content.ts`.
- Produces: `MediaFrame`, `VideoControl`, the rebuilt hero/bento/features/system-loop/use-case/industry/evidence sections, and stable desktop/mobile layouts.

- [ ] **Step 1: Add a reusable media renderer**

Render images and videos through one `MediaFrame` helper. Videos use `muted`, `loop`, `playsInline`, `preload`, and poster attributes. Add an icon-based play/pause control with an accessible label and avoid autoplay when `prefers-reduced-motion: reduce` matches.

- [ ] **Step 2: Recompose the hero and overview**

Use the product clip as the foreground product signal and the heat construction still as context. Build the viAct-style bento with one distinct asset per card and keep the concept labels readable.

- [ ] **Step 3: Recompose the long-form story**

Render three feature rows, the five-step system loop, media-switching use-case tabs, the sector panorama plus industry index, and image-backed engineering evidence.

- [ ] **Step 4: Implement responsive and reduced-motion CSS**

Use stable aspect ratios, desktop cinematic grids, tablet stacking, mobile media-first feature rows, scrollable use-case tabs, and poster-only reduced-motion behavior. Keep orange for actions and cyan for technical proof.

- [ ] **Step 5: Run tests**

Run: `npm test`

Expected: PASS.

### Task 3: Validate Production Output

**Files:**
- Modify only if verification exposes a defect: `app/SmartWatchClone.tsx`, `app/coresense-content.ts`, `app/globals.css`

**Interfaces:**
- Consumes: the complete rebuilt page.
- Produces: a lint-clean, statically exported production build.

- [ ] **Step 1: Run static checks**

Run: `npm run lint`

Expected: PASS.

- [ ] **Step 2: Build the production export**

Run: `npm run vercel-build`

Expected: PASS and `out/index.html` contains local CoreSense media paths.

- [ ] **Step 3: Inspect generated output**

Run the rendered HTML test against `out/index.html` and confirm the MP4, poster, disclosure, CoreSense, and no-viAct contracts.

### Task 4: Browser Verification And Deployment

**Files:**
- Modify only if browser verification exposes a defect.

**Interfaces:**
- Consumes: the successful production build.
- Produces: verified desktop/mobile behavior and an updated Vercel production deployment.

- [ ] **Step 1: Start a local production server**

Serve `out/` on an unused local port.

- [ ] **Step 2: Verify desktop**

At 1440 by 900, capture the hero, middle sections, industries, and evidence. Confirm videos or posters are visible, controls work, tabs switch media, FAQ opens, no media fails, and there is no horizontal overflow or console error.

- [ ] **Step 3: Verify mobile**

At 390 by 844, confirm the brand and CoreSense claim appear in the first viewport, all text fits, controls remain reachable, use-case tabs scroll, disclosures remain legible, and there is no horizontal overflow.

- [ ] **Step 4: Deploy to Vercel production**

Run the existing project deployment command and confirm the production alias resolves to the new deployment.

- [ ] **Step 5: Verify the production URL**

Repeat load, asset, interaction, overflow, and console checks on `https://https-www-viact-ai-iot-smart.vercel.app/`.

