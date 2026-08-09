# CoreSense Content Rebrand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the existing viAct smart-watch clone into a fully local, responsive CoreSense heat-risk product page using the supplied CoreSense documents and media.

**Architecture:** Keep the existing single-page React/Vinext structure and CSS layout, but move all CoreSense copy and asset references into a focused data module. The client component renders that data, preserves the existing interactions, and serves only local media from `public/coresense/`. Verification combines source-level regression tests, production builds, and real-browser desktop/mobile checks.

**Tech Stack:** React 19, TypeScript, Vinext, Vite, native CSS, Node test runner, Vercel static deployment

## Global Constraints

- Preserve the existing clone's section order, spacing rhythm, responsive behavior, and logo-only black header.
- Remove every viAct name, URL, customer claim, testimonial, external image, and footer reference from the rendered site.
- Present CoreSense as a safety decision-support prototype, not a medical device, clinical thermometer, certified product, or completed deployment.
- Label every AI-generated field or product image `AI-GENERATED CONCEPT VISUAL - NOT FIELD FOOTAGE`.
- Do not use, store, print, or deploy the exposed API key.
- Use local files under `public/coresense/`; do not depend on the viAct Wix CDN.
- Keep native keyboard-operable tabs and FAQ controls with visible focus states.
- Use ASCII punctuation in all new page copy; no em dashes.
- Brief inference: faithful B2B industrial-safety rebrand for pilot partners and judges, not a greenfield redesign.
- Design dials: `DESIGN_VARIANCE=3`, `MOTION_INTENSITY=1`, `VISUAL_DENSITY=6`.
- Aesthetic: native-CSS industrial editorial, anchored in black, white, warm safety orange, and restrained cyan status accents.

---

### Task 1: Lock The Rebrand Contract With Failing Tests

**Files:**
- Modify: `tests/rendered-html.test.mjs`
- Test: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `app/SmartWatchClone.tsx`, `app/coresense-content.ts`, `app/globals.css`, `public/coresense/*`
- Produces: regression assertions for brand copy, evidence boundaries, local assets, and removed viAct content

- [ ] **Step 1: Replace the old viAct copy fixtures with CoreSense fixtures**

Use these exact fixture groups:

```js
const expectedCoreSenseCopy = [
  "CoreSense",
  "Heat risk workers can act on.",
  "From signal to safer action",
  "Sense. Estimate. Decide. Act. Record.",
  "Uncertainty-aware heat estimation",
  "Action-first worker interface",
  "Environmental fallback",
  "Edge connectivity without one SIM per worker",
  "Privacy and auditability",
  "What CoreSense can prove today",
  "Turn invisible heat strain into one clear action.",
];

const expectedEvidenceBoundaries = [
  "safety decision-support prototype",
  "not a clinical thermometer or medical device",
  "AI-GENERATED CONCEPT VISUAL - NOT FIELD FOOTAGE",
  "Raw PPG does not leave the band",
];

const removedViActCopy = [
  "viAct",
  "viact.ai",
  "What do people say about us?",
  "Schedule Demo",
  "Request A Demo",
  "Talk To Sales",
];
```

- [ ] **Step 2: Add tests for CoreSense copy, evidence boundaries, local assets, and removed content**

```js
test("renders the approved CoreSense product story", () => {
  for (const phrase of expectedCoreSenseCopy) {
    assert.match(appSource, new RegExp(escapeRegExp(phrase)));
  }
});

test("keeps the CoreSense evidence boundaries visible", () => {
  for (const phrase of expectedEvidenceBoundaries) {
    assert.match(allPageSource, new RegExp(escapeRegExp(phrase), "i"));
  }
});

test("removes viAct branding, links, and testimonial claims", () => {
  for (const phrase of removedViActCopy) {
    assert.doesNotMatch(allPageSource, new RegExp(escapeRegExp(phrase), "i"));
  }
  assert.doesNotMatch(allPageSource, /https?:\/\//);
});

test("references only existing local CoreSense media", async () => {
  const assetPaths = [...allPageSource.matchAll(/\/coresense\/[a-z0-9./-]+/g)].map(
    ([assetPath]) => assetPath,
  );
  assert.ok(assetPaths.length >= 7);
  for (const assetPath of new Set(assetPaths)) {
    await access(new URL(`../public${assetPath}`, import.meta.url));
  }
});
```

- [ ] **Step 3: Run the test and verify RED**

Run: `node --test tests/rendered-html.test.mjs`

Expected: FAIL because CoreSense copy and local assets do not exist yet, while viAct content is still present.

- [ ] **Step 4: Commit the failing contract**

```bash
git add tests/rendered-html.test.mjs
git commit -m "test: define CoreSense rebrand contract"
```

---

### Task 2: Add Local Media And CoreSense Content Data

**Files:**
- Create: `app/coresense-content.ts`
- Create: `public/coresense/heat-construction.png`
- Create: `public/coresense/storm-shelter.png`
- Create: `public/coresense/sector-impact.png`
- Create: `public/coresense/product-concept.png`
- Create: `public/coresense/wokwi-build-preview.png`
- Create: `public/coresense/wokwi-live-preview.png`
- Create: `public/coresense/wokwi-build-preview.svg`
- Modify: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: `/Users/muthuramanpalaniappan/Downloads/docs/ONE-PAGE-SUMMARY.md`, `architecture.md`, `limitations.md`, `science.md`, `WEATHER-INTELLIGENCE.md`, and the listed media files
- Produces: `coreSenseImages`, `overviewLead`, `overviewTiles`, `featureRows`, `useCases`, `industries`, `evidenceCards`, `faqs`, and `footerLinks`

- [ ] **Step 1: Copy the seven approved source assets into `public/coresense/`**

Use these source-to-destination mappings:

```text
video-assets/icy-aigc-01-heat-construction.png -> public/coresense/heat-construction.png
video-assets/icy-aigc-02-storm-shelter.png -> public/coresense/storm-shelter.png
video-assets/icy-aigc-03-sector-impact.png -> public/coresense/sector-impact.png
video-assets/icy-aigc-04-product-reference.png -> public/coresense/product-concept.png
WOKWI-BUILD-PREVIEW.png -> public/coresense/wokwi-build-preview.png
WOKWI-VSCODE-LIVE.png -> public/coresense/wokwi-live-preview.png
WOKWI-BUILD-PREVIEW.svg -> public/coresense/wokwi-build-preview.svg
```

- [ ] **Step 2: Create typed CoreSense content data**

Define and export these types and values:

```ts
export type Media = {
  src: string;
  alt: string;
  concept?: boolean;
};

export type UseCase = {
  label: string;
  title: string;
  body: string;
  media: Media;
};

export const conceptDisclosure =
  "AI-GENERATED CONCEPT VISUAL - NOT FIELD FOOTAGE";

export const coreSenseImages = {
  heat: { src: "/coresense/heat-construction.png", alt: "Construction worker checking a wrist band in hot site conditions", concept: true },
  storm: { src: "/coresense/storm-shelter.png", alt: "Field workers returning to shelter before a tropical storm", concept: true },
  sectors: { src: "/coresense/sector-impact.png", alt: "Construction, plantation, and logistics work settings", concept: true },
  product: { src: "/coresense/product-concept.png", alt: "CoreSense rugged round-display worker band concept", concept: true },
  wokwiBuild: { src: "/coresense/wokwi-build-preview.png", alt: "CoreSense Wokwi firmware build preview" },
  wokwiLive: { src: "/coresense/wokwi-live-preview.png", alt: "CoreSense live Wokwi prototype preview" },
} satisfies Record<string, Media>;
```

Populate all exported arrays with the exact headings from the approved design. Body copy must paraphrase the supplied documents, stay under 45 words per item, and include no deployment, certification, medical, or measured-outcome claim.

- [ ] **Step 3: Update the test source aggregation**

Read `app/coresense-content.ts` and concatenate it with the component and CSS sources:

```js
const contentSource = await readFile(
  new URL("../app/coresense-content.ts", import.meta.url),
  "utf8",
);
const allPageSource = `${appSource}\n${contentSource}\n${cssSource}`;
```

- [ ] **Step 4: Run the focused test and verify it remains RED for the component**

Run: `node --test tests/rendered-html.test.mjs`

Expected: asset resolution passes, but brand and removal assertions still fail because `SmartWatchClone.tsx` renders viAct.

- [ ] **Step 5: Commit the content and assets**

```bash
git add app/coresense-content.ts public/coresense tests/rendered-html.test.mjs
git commit -m "feat: add CoreSense content and local media"
```

---

### Task 3: Rebrand The React Page And Preserve Interactions

**Files:**
- Modify: `app/SmartWatchClone.tsx`
- Test: `tests/rendered-html.test.mjs`

**Interfaces:**
- Consumes: all exports from `app/coresense-content.ts`
- Produces: the complete CoreSense page with functional tabs, FAQ accordions, local media, internal CTAs, and evidence disclosures

- [ ] **Step 1: Replace viAct imports and inline data with CoreSense imports**

Import the content contract:

```ts
import {
  conceptDisclosure,
  coreSenseImages,
  evidenceCards,
  faqs,
  featureRows,
  footerLinks,
  industries,
  overviewLead,
  overviewTiles,
  useCases,
} from "./coresense-content";
```

Delete the old external image map, URL maps, footer maps, viAct arrays, testimonials, and social links.

- [ ] **Step 2: Rebuild the header and hero with the approved CoreSense story**

Render a text wordmark, internal anchor, short hero stack, local heat image, product concept image, and one disclosure:

```tsx
<header className="topbar">
  <a className="brand" href="#top" aria-label="CoreSense home">
    <span className="brand-mark" aria-hidden>CS</span>
    <span>CoreSense</span>
  </a>
</header>
```

The hero must contain `Personal heat-risk intelligence at the edge`, `Heat risk workers can act on.`, a maximum 20-word supporting sentence, and an `Explore CoreSense` button linked to `#overview`.

- [ ] **Step 3: Rebuild overview, feature, use-case, industry, evidence, FAQ, CTA, and footer sections**

Use semantic sections and map the data arrays. For every `Media` object, render a compact disclosure only when `media.concept` is true. Give the use-case panel `role="tabpanel"`, an id derived from the selected index, and `aria-labelledby` connected to the active tab button.

Replace the reviews section id with `evidence`, but preserve its position and dark card grid. Remove quotation marks, avatars, role/company labels, and testimonial styling semantics.

Use only internal CTA destinations: `#overview`, `#features`, `#use-cases`, `#industries`, `#evidence`, and `#faq`.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `node --test tests/rendered-html.test.mjs`

Expected: all tests pass, including zero viAct strings/URLs and valid local asset paths.

- [ ] **Step 5: Commit the component rebrand**

```bash
git add app/SmartWatchClone.tsx tests/rendered-html.test.mjs
git commit -m "feat: rebrand smart watch page as CoreSense"
```

---

### Task 4: Refine Styling, Verify, And Deploy

**Files:**
- Modify: `app/globals.css`
- Modify: `tests/rendered-html.test.mjs` only if a discovered visual defect requires a regression assertion

**Interfaces:**
- Consumes: CoreSense component class names and local image proportions
- Produces: responsive desktop/mobile page and verified Vercel production deployment

- [ ] **Step 1: Write a failing style-contract assertion before CSS changes**

Add assertions for the new classes that must be styled:

```js
test("styles CoreSense branding, disclosures, and evidence cards", () => {
  for (const selector of [
    ".brand-mark",
    ".media-disclosure",
    ".evidence-card",
    ".evidence-source",
  ]) {
    assert.match(cssSource, new RegExp(escapeRegExp(selector)));
  }
});
```

Run: `node --test tests/rendered-html.test.mjs`

Expected: FAIL because the new selectors are not implemented yet.

- [ ] **Step 2: Update the CSS design tokens and component styles**

Set `--accent: #ff7a1a`, `--accent-dark: #dc5f00`, and `--status-cyan: #41d9df`. Keep an 8px base radius, remove pill styling from the evidence badge, and style `.media-disclosure` as a compact rectangular caption below or within the media boundary without covering the subject.

Keep the product concept unframed in the hero, use a black-background blend at desktop, and move it below hero copy on narrow screens. Ensure the hero CTA is visible in the first viewport, the headline stays at two lines desktop, and every card/text block has explicit responsive constraints.

- [ ] **Step 3: Run focused tests and the full quality suite**

Run:

```bash
node --test tests/rendered-html.test.mjs
npm test
npm run vercel-build
npm run lint
```

Expected: tests and builds pass; lint exits zero with no newly introduced warnings.

- [ ] **Step 4: Start the dev server and verify real browser behavior**

Run `npm run dev` on an available port. Verify at 1440 x 900 and 390 x 844:

- Header shows only the CoreSense wordmark.
- Hero headline, CTA, worker, and product concept are visible without incoherent overlap.
- All concept images have readable disclosures.
- All five use-case tabs change title, body, and image.
- FAQ controls open and close.
- Evidence cards contain no quote marks, avatars, or customer claims.
- No horizontal overflow, blank media, console error, or failed network request exists.

- [ ] **Step 5: Run the frontend pre-flight audit**

Confirm the approved clone-preserving exceptions and verify: one accent system, one radius system, no em dashes, no invented contacts, no external media, no fake screenshots, no unsupported claims, visible focus states, reduced-motion safety, stable media dimensions, and readable mobile text.

- [ ] **Step 6: Commit the responsive styling**

```bash
git add app/globals.css tests/rendered-html.test.mjs
git commit -m "style: finish responsive CoreSense presentation"
```

- [ ] **Step 7: Deploy and verify production**

Deploy the current worktree to the linked Vercel production project, confirm the existing alias returns HTTP 200, and repeat the desktop/mobile hero, tabs, FAQ, console, and network checks against the production URL.

- [ ] **Step 8: Record final evidence**

Capture the deployment URL, alias, commit id, automated test totals, lint status, and browser verification results for the completion response.
