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
  "A fitness tracker counts steps and sleep. viAct IoT Safety Watch monitors worker health, location, movement, and environment in real time - detecting fatigue, falls, distress, and triggering alerts.",
  "What does an industrial IoT smart watch actually monitor in real time?",
  "It monitors seven categories: heart rate (BPM), body temperature for heat stress, blood oxygen (SpO2 for confined spaces), movement and posture for falls or motionless states",
  "How does safety monitoring with viAct IoT smart watch work end-to-end?",
  "Three stages: Capture - sensors collect vitals, movement, and location, and can keep working offline.",
  "Can viAct IoT smart watch detect worker fatigue?",
  "Yes. Fatigue is a major risk, with 50% of workers reporting fatigue.",
  "How does a smart safety watch detect fall events and worker distress?",
  "Fall detection uses the accelerometer and gyroscope to detect sudden impact and a motionless state",
  "Which industries benefit most from an IoT Safety Watch integration?",
  "Construction benefits from fall, heat stress, and fatigue detection and supports Hong Kong 4S requirements",
  "How does viAct Industrial Smart Watch detect and help prevent workplace heat stress?",
  "It continuously monitors skin temperature, heart rate, and SpO2, cross-referenced with weather station ambient data.",
  "How does the Smart Watch protect lone workers in remote, confined, underground, or isolated environments with low connectivity?",
  "It combines real-time location tracking with GPS and indoor positioning, motionless worker detection, fall and impact detection",
  "How much does viAct's Smart Watch cost, and is it available on subscription?",
  "There is no fixed public price. Cost depends on number of devices, AI modules, connectivity, deployment model, and contract duration.",
  "How does viAct's Smart Watch protect worker privacy while monitoring health data?",
  "Data is classified as safety and operational data, not surveillance.",
];

const expectedUseCases = [
  "Work Safety Monitoring",
  "Real-Time Health Tracking",
  "Emergency Response Coordination",
  "Regulatory Compliance and Reporting",
  "Remote Monitoring for Supervisors",
];

const expectedOverviewCopy = [
  "Revolutionize Workplace Safety with the Smartest Watch Yet",
  "Experience the Perfect Fusion of AI and IoT for Unparalleled",
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

const expectedFooterCopy = [
  "Empower your team—wearable AI that watches your back in real time",
  "Request A Demo",
  "Talk To Sales",
  "AI Monitoring That Redefines Workplace Safety",
  "Work at Height Safety",
  "Digital Works Supervision System",
  "Copyright © 2026 | All Rights Reserved",
  "Terms Of Service",
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
    ...expectedFooterCopy,
  ]) {
    assert.match(source, new RegExp(escapeRegExp(phrase)));
  }
});

test("does not render the awards logo bar below the hero", () => {
  assert.doesNotMatch(source, /aria-label="Awards and recognition"/);
});

test("keeps only the viAct brand link in the header", () => {
  assert.doesNotMatch(source, /aria-label="Main navigation"/);
  assert.doesNotMatch(source, />Schedule Demo</);
  assert.doesNotMatch(source, /aria-label="Toggle navigation"/);
});

test("keeps demo destinations", () => {
  for (const useCase of expectedUseCases) {
    assert.match(source, new RegExp(escapeRegExp(useCase)));
  }

  assert.equal(
    [...source.matchAll(/https:\/\/www\.viact\.ai\/demo/g)].length,
    4,
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
