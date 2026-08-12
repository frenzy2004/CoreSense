import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const readSource = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), "utf8").catch(() => "");

const [
  appSource,
  evidenceMapSource,
  cssSource,
  contentSource,
  documentLibrarySource,
  docsManifestSource,
  layoutSource,
  pageSource,
  indexSource,
  faviconSource,
] = await Promise.all([
  readSource("app/SmartWatchClone.tsx"),
  readSource("app/MalaysiaEvidenceMap.tsx"),
  readSource("app/globals.css"),
  readSource("app/coresense-content.ts"),
  readSource("app/DocumentLibrary.tsx"),
  readSource("app/docs-manifest.ts"),
  readSource("app/layout.tsx"),
  readSource("app/page.tsx"),
  readSource("index.html"),
  readSource("public/favicon.svg"),
]);

const allPageSource = [
  appSource,
  evidenceMapSource,
  contentSource,
  documentLibrarySource,
  docsManifestSource,
  cssSource,
  layoutSource,
  pageSource,
  indexSource,
  faviconSource,
].join("\n");

const vercelConfig = JSON.parse(await readSource("vercel.json"));
const demoUrl = "https://core-sense-demo.vercel.app/demo";
const officialSourceUrls = [
  "https://dosh.gov.my/wp-content/uploads/2025/03/Act-514-Reprint-Version-1.6.2024_English.pdf",
  "https://dosh.gov.my/wp-content/uploads/2026/03/ve_gl_heat-stress-management-at-wplace-2016.pdf",
  "https://dosh.gov.my/wp-content/uploads/2024/10/Peraturan-Peraturan-Keselamatan-Dan-Kesihatan-Pekerjaan-Kerja-Pembinaan-Reka-Bentuk-Dan-Pengurusan-2024.pdf",
  "https://mspo.org.my/standards/",
  "https://www.sc.com.my/nsrf/resources/policy-documents",
  "https://www.sc.com.my/api/documentms/download.ashx?id=3c97696b-29ce-4dd1-b6e3-0ea9da412a32",
  "https://www.sc.com.my/api/documentms/download.ashx?id=3e75904e-7289-4294-b9df-548f74e65965",
  "https://developer.data.gov.my/realtime-api/weather",
];

const requiredCopy = [
  "ACTION 2026 · Heat Health Protection",
  "Heat risk workers can act on.",
  "One hot site. Different workers. Different risk.",
  "Sense. Estimate. Decide. Act. Record.",
  "One small screen. One clear action.",
  "A supervisor response loop, not a worker-surveillance dashboard.",
  "Evidence, not a compliance badge.",
  "Show the proof. Keep the gates visible.",
  "Built for workers. Evaluated with site teams.",
  "Start shadow-first. Earn the right to scale.",
  "A consolidated AI Use Declaration accompanies the ACTION 2026 submission.",
  "CoreSense · Heat-health decision support · read-only demonstration · field, clinical, hardware and compliance validation remain open",
];

const requiredBoundaries = [
  "CoreSense is an occupational heat-strain screening and decision-support prototype.",
  "does not clinically measure core temperature",
  "Read-only software demonstration · no worker data · no physical downlink · field validation remains open",
  "DETERMINISTIC SIMULATION · NO PHYSICAL DOWNLINK",
  "WOKWI BEHAVIORAL MODEL · SIMULATION",
  "AI-GENERATED CONCEPT VISUAL · NOT FIELD FOOTAGE",
  "AI-GENERATED CONCEPT — NOT THE ACTUAL PRODUCT",
  "DEMO_UNVALIDATED_V1",
  "Official sources reviewed 10 August 2026",
];

const sectionIds = [
  'id="top"',
  'id="problem"',
  'id="solution-loop"',
  'id="worker-experience"',
  'id="supervisor-experience"',
  'id="use-cases"',
  'id="malaysia-evidence"',
  'id="technical-proof"',
  'id="pilot"',
  'id="ai-use"',
];

test("renders the approved CoreSense public narrative", () => {
  for (const phrase of [...requiredCopy, ...requiredBoundaries]) {
    assert.match(allPageSource, new RegExp(escapeRegExp(phrase), "i"));
  }
});

test("renders public sections in the approved order", () => {
  let priorIndex = -1;
  for (const marker of sectionIds) {
    const index = appSource.indexOf(marker);
    assert.ok(index > priorIndex, `${marker} must follow the previous section`);
    priorIndex = index;
  }
});

test("uses the interactive demo as the single primary external action", () => {
  assert.match(contentSource, new RegExp(escapeRegExp(demoUrl)));
  assert.match(appSource, /Open interactive demo/g);
  assert.match(appSource, /target="_blank"/);
  assert.match(appSource, /rel="noreferrer"/);
  assert.doesNotMatch(appSource, /Schedule Demo|Request A Demo|Talk To Sales/i);

  const supervisorSection = appSource.slice(
    appSource.indexOf('id="supervisor-experience"'),
    appSource.indexOf('id="malaysia-evidence"'),
  );
  assert.match(
    supervisorSection,
    /<Button href=\{demoUrl\}>Open interactive demo<\/Button>/,
  );
});

test("includes only the approved official source links", () => {
  for (const url of officialSourceUrls) {
    assert.match(contentSource, new RegExp(escapeRegExp(url)));
  }

  const publicUrls = [
    ...`${appSource}\n${evidenceMapSource}\n${contentSource}`.matchAll(
      /https:\/\/[^"'\s]+/g,
    ),
  ].map(([url]) => url);
  const allowList = new Set([demoUrl, ...officialSourceUrls]);
  for (const url of publicUrls) {
    assert.ok(allowList.has(url), `unexpected public URL: ${url}`);
  }
});

test("does not publish prohibited claims or the previous brand", () => {
  for (const phrase of [
    "DOSH approved",
    "OSHA compliant",
    "MSPO certified",
    "ESG assurance-ready",
    "prevents all heat illness",
    "calls 999",
    "sends real WhatsApp alerts",
    "10-hour battery life",
  ]) {
    assert.doesNotMatch(allPageSource, new RegExp(escapeRegExp(phrase), "i"));
  }
  const previousBrandPattern = new RegExp(`\\b${"vi" + "act"}\\b`, "i");
  assert.doesNotMatch(allPageSource, previousBrandPattern);
});

test("references existing local CoreSense media and preserves motion labels", async () => {
  const assetPaths = [...allPageSource.matchAll(/\/coresense\/[a-z0-9./-]+/g)].map(
    ([assetPath]) => assetPath,
  );
  assert.ok(assetPaths.length >= 7);
  for (const assetPath of new Set(assetPaths)) {
    await access(new URL(`../public${assetPath}`, import.meta.url));
  }
  for (const video of [
    "/coresense/product-assembly-concept.mp4",
    "/coresense/heat-hydration.mp4",
    "/coresense/storm-recall.mp4",
    "/coresense/use-case-construction-heat.mp4",
    "/coresense/use-case-plantation-shelter.mp4",
  ]) {
    assert.match(contentSource, new RegExp(escapeRegExp(video)));
  }
  assert.match(appSource, /autoPlay/);
  assert.match(appSource, /playsInline/);
  assert.match(appSource, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(appSource, /video-control/);
  for (const applicationImage of [
    "/coresense/application-construction.jpg",
    "/coresense/application-plantation.jpg",
    "/coresense/application-logistics.jpg",
  ]) {
    assert.match(contentSource, new RegExp(escapeRegExp(applicationImage)));
  }
  assert.doesNotMatch(appSource, /coreSenseImages\.sectors/);
  assert.match(appSource, /useCaseScenes\.map/);
  assert.match(cssSource, /\.use-case-grid/);
});

test("does not repeat the same visual family across adjacent story sections", () => {
  const renderedMedia = [
    ...appSource.matchAll(/media=\{coreSenseImages\.([A-Za-z0-9]+)\}/g),
  ].map(([, mediaKey]) => mediaKey);

  assert.ok(
    !(renderedMedia.includes("productVideo") && renderedMedia.includes("product")),
    "the product video and its static poster must not both be rendered",
  );

  const proofMedia = appSource
    .match(/<div className="proof-media-grid">([\s\S]*?)<\/div>/)?.[1]
    .matchAll(/media=\{coreSenseImages\.([A-Za-z0-9]+)\}/g);

  assert.equal(
    proofMedia ? [...proofMedia].length : 0,
    1,
    "technical proof should show one focused Wokwi visual",
  );

  const heatVideoDefinition = contentSource.match(
    /heatVideo:\s*\{[\s\S]*?\n {2}\},/,
  )?.[0];
  assert.ok(heatVideoDefinition, "worker heat-action media must be defined");
  assert.match(
    heatVideoDefinition,
    /poster:\s*"\/coresense\/heat-hydration-poster\.jpg"/,
    "the worker clip needs a poster distinct from the hero image",
  );
});

test("ships every Markdown document with phone-native selection", async () => {
  const docPaths = [...docsManifestSource.matchAll(/path:\s*"([^"]+\.md)"/g)].map(
    ([, docPath]) => docPath,
  );
  assert.equal(docPaths.length, 31);
  for (const docPath of docPaths) {
    await access(new URL(`../public/docs/${docPath}`, import.meta.url));
  }
  assert.match(documentLibrarySource, /ReactMarkdown/);
  assert.match(documentLibrarySource, /remarkGfm/);
  assert.match(documentLibrarySource, /htmlFor="document-select"/);
  assert.match(documentLibrarySource, /id="document-select"/);
  assert.match(documentLibrarySource, /aria-label="Close document viewer"/);
  assert.match(appSource, /Browse project documents/);
});

test("encodes mobile layout safeguards", () => {
  assert.match(cssSource, /overflow-x:\s*clip/);
  assert.match(cssSource, /min-height:\s*44px/);
  assert.match(cssSource, /@media\s*\(min-width:\s*768px\)/);
  assert.match(cssSource, /\.document-mobile-select/);
  assert.doesNotMatch(cssSource, /min-height:\s*(470|490)px/);
  assert.doesNotMatch(cssSource, /\.system-loop-steps\s*\{[^}]*overflow-x:\s*auto/s);
  assert.doesNotMatch(cssSource, /\.case-tabs\s*\{[^}]*overflow-x:\s*auto/s);
});

test("keeps phone source links on one line and long manifest terms wrappable", () => {
  const compactSourceLinks = cssSource.match(
    /\.additional-sources a,\s*\.document-trigger\s*\{([^}]*)\}/s,
  )?.[1];

  assert.ok(compactSourceLinks);
  assert.match(compactSourceLinks, /font-size:\s*0\.82rem/);
  assert.match(compactSourceLinks, /white-space:\s*nowrap/);
  assert.match(
    cssSource,
    /\.manifest-panel p\s*\{[^}]*overflow-wrap:\s*anywhere/s,
  );
});

test("keeps closed data-truth cards compact when a sibling is expanded", () => {
  assert.match(
    cssSource,
    /\.truth-ladder-list\s*\{[^}]*align-items:\s*start/s,
  );
  assert.match(
    cssSource,
    /\.truth-card summary::after\s*\{[^}]*right:\s*1rem/s,
  );
});

test("keeps beneficiary cards independent with inset accordion controls", () => {
  assert.match(
    cssSource,
    /\.beneficiary-grid\s*\{[^}]*align-items:\s*start/s,
  );
  assert.match(
    cssSource,
    /\.beneficiary-grid summary::after\s*\{[^}]*right:\s*1rem/s,
  );
});

test("ships the approved search and share metadata", async () => {
  const title = "CoreSense — Heat-health actions workers can use";
  const description =
    "CoreSense is a privacy-limited worker heat-strain advisory system that combines an action-first wrist display, site heat context, supervisor response and a reviewable evidence trail.";
  const social =
    "From invisible heat strain to one clear action: work safely, pause, or rest now.";

  for (const source of [layoutSource, pageSource, indexSource]) {
    assert.match(source, new RegExp(escapeRegExp(title)));
    assert.match(source, new RegExp(escapeRegExp(description)));
    assert.match(source, new RegExp(escapeRegExp(social)));
  }
  assert.match(layoutSource, /https:\/\/core-sense\.vercel\.app/);
  assert.match(faviconSource, />CS<\/text>/);
  await access(new URL("../public/og.png", import.meta.url));
});

test("keeps the brand-only header and removes the old attribution bar", () => {
  assert.doesNotMatch(appSource, /aria-label="Main navigation"/);
  assert.doesNotMatch(appSource, /aria-label="Toggle navigation"/);
  assert.doesNotMatch(appSource, /footer-bottom/);
  assert.doesNotMatch(appSource, /prototype integration brief, 2026/i);
  assert.doesNotMatch(
    appSource,
    /Source material supplied with the project documentation/i,
  );
});

test("ships the expected Vercel static output contract", () => {
  assert.equal(vercelConfig.buildCommand, "npm run vercel-build");
  assert.equal(vercelConfig.outputDirectory, "dist/vercel");
  assert.deepEqual(vercelConfig.rewrites, [
    { source: "/(.*)", destination: "/index.html" },
  ]);
});

test("does not persist secrets", () => {
  assert.doesNotMatch(allPageSource, /sk-[a-z]+-[A-Za-z0-9_-]{20,}/i);
});

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
