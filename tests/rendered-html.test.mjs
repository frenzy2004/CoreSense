import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const appSource = await readFile(
  new URL("../app/SmartWatchClone.tsx", import.meta.url),
  "utf8",
);
const cssSource = await readFile(
  new URL("../app/globals.css", import.meta.url),
  "utf8",
);
const contentSource = await readFile(
  new URL("../app/coresense-content.ts", import.meta.url),
  "utf8",
);
const layoutSource = await readFile(
  new URL("../app/layout.tsx", import.meta.url),
  "utf8",
);
const pageSource = await readFile(
  new URL("../app/page.tsx", import.meta.url),
  "utf8",
);
const indexSource = await readFile(
  new URL("../index.html", import.meta.url),
  "utf8",
);
const faviconSource = await readFile(
  new URL("../public/favicon.svg", import.meta.url),
  "utf8",
);
const allPageSource = `${appSource}\n${contentSource}\n${cssSource}\n${layoutSource}\n${pageSource}\n${indexSource}\n${faviconSource}`;
const vercelConfig = JSON.parse(
  await readFile(new URL("../vercel.json", import.meta.url), "utf8"),
);

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

const expectedUseCases = [
  "Early heat-strain action",
  "Signal-quality fallback",
  "Supervisor escalation",
  "Recovery and audit trail",
  "Offline site operation",
];

const expectedIndustries = [
  "Construction",
  "Plantations",
  "Utilities",
  "Logistics",
  "Municipal field teams",
];

const removedViActCopy = [
  "viAct",
  "viact.ai",
  "What do people say about us?",
  "Schedule Demo",
  "Request A Demo",
  "Talk To Sales",
];

test("renders the approved CoreSense product story", () => {
  for (const phrase of [
    ...expectedCoreSenseCopy,
    ...expectedUseCases,
    ...expectedIndustries,
  ]) {
    assert.match(allPageSource, new RegExp(escapeRegExp(phrase)));
  }
});

test("keeps the CoreSense evidence boundaries visible", () => {
  for (const phrase of expectedEvidenceBoundaries) {
    assert.match(allPageSource, new RegExp(escapeRegExp(phrase), "i"));
  }
});

test("removes viAct branding, links, and testimonial claims", () => {
  for (const phrase of removedViActCopy) {
    assert.doesNotMatch(
      allPageSource,
      new RegExp(escapeRegExp(phrase), "i"),
    );
  }
  assert.doesNotMatch(
    `${appSource}\n${contentSource}\n${layoutSource}\n${pageSource}\n${indexSource}`,
    /https?:\/\//,
  );
});

test("references only existing local CoreSense media", async () => {
  const assetPaths = [
    ...allPageSource.matchAll(/\/coresense\/[a-z0-9./-]+/g),
  ].map(([assetPath]) => assetPath);

  assert.ok(assetPaths.length >= 7);
  for (const assetPath of new Set(assetPaths)) {
    await access(new URL(`../public${assetPath}`, import.meta.url));
  }
});

test("keeps a logo-only header", () => {
  assert.doesNotMatch(appSource, /aria-label="Main navigation"/);
  assert.doesNotMatch(appSource, />Schedule Demo</);
  assert.doesNotMatch(appSource, /aria-label="Toggle navigation"/);
});

test("keeps new visible copy free of em dashes", () => {
  assert.doesNotMatch(allPageSource, /\u2014/);
});

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

test("constrains the mobile hero to the viewport", () => {
  assert.match(cssSource, /grid-template-columns:\s*minmax\(0, 1fr\)/);
  assert.match(cssSource, /\.hero-copy\s*{[^}]*min-width:\s*0/s);
});

test("ships CoreSense metadata and identity assets", async () => {
  for (const phrase of [
    "CoreSense | Personal Heat-Risk Safety",
    "Individual heat-strain guidance for industrial workers",
  ]) {
    assert.match(layoutSource, new RegExp(escapeRegExp(phrase)));
    assert.match(pageSource, new RegExp(escapeRegExp(phrase)));
    assert.match(indexSource, new RegExp(escapeRegExp(phrase)));
  }
  assert.match(faviconSource, />CS<\/text>/);
  await access(new URL("../public/og.png", import.meta.url));
});

test("ships a Vercel static site instead of an empty Vinext client folder", () => {
  assert.equal(vercelConfig.buildCommand, "npm run vercel-build");
  assert.equal(vercelConfig.outputDirectory, "dist/vercel");
  assert.deepEqual(vercelConfig.rewrites, [
    { source: "/(.*)", destination: "/index.html" },
  ]);
});

test("does not persist pasted API keys", () => {
  assert.doesNotMatch(allPageSource, /sk-proj-/);
});

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
