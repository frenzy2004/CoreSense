import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(
  new URL("../app/SmartWatchClone.tsx", import.meta.url),
  "utf8",
);
const vercelConfig = JSON.parse(
  await readFile(new URL("../vercel.json", import.meta.url), "utf8"),
);

const expectedFaqs = [
  "How is an Industrial Smart Watch different from a normal fitness tracker?",
  "What does an industrial IoT smart watch actually monitor in real time?",
  "How does safety monitoring with viAct IoT smart watch work end-to-end?",
  "Can viAct IoT smart watch detect worker fatigue?",
  "How does a smart safety watch detect fall events and worker distress?",
  "Which industries benefit most from an IoT Safety Watch integration?",
  "How does viAct Industrial Smart Watch detect and help prevent workplace heat stress?",
  "How does the Smart Watch protect lone workers in remote, confined, underground, or isolated environments with low connectivity?",
  "How much does viAct's Smart Watch cost, and is it available on subscription?",
  "How does viAct's Smart Watch protect worker privacy while monitoring health data?",
];

const expectedUseCases = [
  "Work Safety Monitoring",
  "Real-Time Health Tracking",
  "Emergency Response Coordination",
  "Regulatory Compliance and Reporting",
  "Remote Monitoring for Supervisors",
];

test("matches the original smart watch FAQ set", () => {
  for (const faq of expectedFaqs) {
    assert.match(source, new RegExp(escapeRegExp(faq)));
  }
});

test("keeps the original use-case tab labels and demo destinations", () => {
  for (const useCase of expectedUseCases) {
    assert.match(source, new RegExp(escapeRegExp(useCase)));
  }

  assert.equal(
    [...source.matchAll(/https:\/\/www\.viact\.ai\/demo/g)].length,
    6,
  );
});

test("ships a Vercel static site instead of an empty Vinext client folder", () => {
  assert.equal(vercelConfig.buildCommand, "npm run vercel-build");
  assert.equal(vercelConfig.outputDirectory, "dist/vercel");
  assert.deepEqual(vercelConfig.rewrites, [
    { source: "/(.*)", destination: "/index.html" },
  ]);
});

test("does not persist pasted API keys", () => {
  assert.doesNotMatch(source, /sk-proj-/);
});

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
