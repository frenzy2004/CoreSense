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

const expectedOverviewCopy = [
  "More Than a Wearable",
  "A cutting-edge tool designed to enhance safety and productivity in demanding work environments.",
  "Advanced AI Capabilities",
  "Delivers real-time health monitoring.",
  "Robust IoT Integration",
  "Ensures uninterrupted communication across teams.",
  "Versatile Applications",
  "Empowering the Workforce",
];

const expectedFeatureCopy = [
  "AI-Enhanced Monitoring",
  "The viAct Smart Watch leverages proprietary computer vision AI to provide real-time health and safety monitoring.",
  "Customizable Alerts",
  "Tailor notifications to specific needs, such as health metrics or safety warnings.",
  "Seamless IoT Integration",
  "Designed to integrate effortlessly with other IoT devices in the Smart Site Safety System",
  "Rugged Durability with Sleek Design",
  "Extended Battery Life",
];

const expectedIndustryCopy = [
  "Delivers real-time safety alerts and seamless communication to reduce incident response times and improve on-site safety.",
  "Continuously monitors worker health, detecting fatigue or distress early to minimize workplace accidents and improve well-being.",
  "Ensures safety in high-risk environments with health monitoring and immediate alerts, allowing for prompt action to prevent accidents.",
  "Provides instant hazard alerts and communication tools to keep miners connected and informed in real-time, enhancing safety protocols.",
  "Enhances team coordination with instant messaging and alerts, boosting operational efficiency in warehouses and during transport operations.",
];

const expectedReviewCopy = [
  "What do people say about us?",
  "The Smart Watch has transformed our safety protocols. It alerts us to potential hazards before they happen, making our team feel much safer on site!",
  "The AI features are impressive! The predictive alerts have helped us prevent accidents and improve overall site safety in real time.",
  "I love how user-friendly the Smart Watch is! It keeps me connected without being distracting, and the health tracking features give me peace of mind.",
  "We implemented the Smart Watch across our workforce, and the feedback has been overwhelmingly positive. It's a game-changer for worker safety!",
  "The ability to monitor my team's health and safety in real-time has been invaluable.",
];

test("matches the original smart watch FAQ set", () => {
  for (const faq of expectedFaqs) {
    assert.match(source, new RegExp(escapeRegExp(faq)));
  }
});

test("keeps screenshot-visible smart watch section copy", () => {
  for (const phrase of [
    ...expectedOverviewCopy,
    ...expectedFeatureCopy,
    ...expectedUseCases,
    ...expectedIndustryCopy,
    ...expectedReviewCopy,
  ]) {
    assert.match(source, new RegExp(escapeRegExp(phrase)));
  }
});

test("keeps demo destinations", () => {
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
