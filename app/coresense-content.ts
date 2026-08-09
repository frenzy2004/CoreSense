export type Media = {
  kind: "image" | "video";
  src: string;
  alt: string;
  poster?: string;
  concept?: boolean;
  evidenceLabel?: string;
  position?: string;
};

export type OverviewTile = {
  title: string;
  bullets: string[];
  media: Media;
};

export type FeatureRow = {
  eyebrow: string;
  title: string;
  body: string;
  media: Media;
  imageFirst: boolean;
  proof: string;
  sourceDoc: string;
};

export type UseCase = {
  label: string;
  title: string;
  body: string;
  media: Media;
};

export const conceptDisclosure =
  "AI-GENERATED CONCEPT VISUAL - NOT FIELD FOOTAGE";

export const hero = {
  eyebrow: "Personal heat-risk intelligence at the edge",
  title: "Heat risk workers can act on.",
  body: "CoreSense turns personal heat strain into one clear wrist action, a coordinated supervisor response, and a reviewable evidence trail.",
};

export const coreSenseImages = {
  heat: {
    kind: "image",
    src: "/coresense/heat-construction.png",
    alt: "Construction worker checking a wrist band in hot site conditions",
    concept: true,
    position: "center center",
  },
  storm: {
    kind: "image",
    src: "/coresense/storm-shelter.png",
    alt: "Field workers returning to shelter before a tropical storm",
    concept: true,
    position: "center center",
  },
  sectors: {
    kind: "image",
    src: "/coresense/sector-impact.png",
    alt: "Construction, plantation, and logistics work settings",
    concept: true,
    position: "center center",
  },
  product: {
    kind: "image",
    src: "/coresense/product-concept.png",
    alt: "CoreSense rugged round-display worker band concept",
    concept: true,
    position: "center center",
  },
  productVideo: {
    kind: "video",
    src: "/coresense/product-hero.mp4",
    poster: "/coresense/product-concept.png",
    alt: "CoreSense rugged round-display band rotating in a studio concept",
    concept: true,
    position: "center center",
  },
  heatVideo: {
    kind: "video",
    src: "/coresense/heat-hydration.mp4",
    poster: "/coresense/heat-construction.png",
    alt: "Worker checks a wearable and walks toward a shaded hydration point",
    concept: true,
    position: "center center",
  },
  stormVideo: {
    kind: "video",
    src: "/coresense/storm-recall.mp4",
    poster: "/coresense/storm-shelter.png",
    alt: "Field crew follows a supervisor toward shelter before a storm",
    concept: true,
    position: "center center",
  },
  wokwiBuild: {
    kind: "image",
    src: "/coresense/wokwi-build-preview.png",
    alt: "CoreSense Wokwi firmware build preview",
    evidenceLabel: "PROTOTYPE BUILD PREVIEW",
    position: "center center",
  },
  wokwiLive: {
    kind: "image",
    src: "/coresense/wokwi-live-preview.png",
    alt: "CoreSense live Wokwi prototype preview",
    evidenceLabel: "SIMULATED PROTOTYPE PREVIEW",
    position: "center center",
  },
  wokwiDiagram: {
    kind: "image",
    src: "/coresense/wokwi-build-preview.svg",
    alt: "CoreSense wearable prototype component diagram",
    evidenceLabel: "PROTOTYPE COMPONENT PATH",
    position: "center center",
  },
} satisfies Record<string, Media>;

export const overviewLead = {
  title: "Sense. Estimate. Decide. Act. Record.",
  body: "The band senses personal and site conditions, estimates heat strain with uncertainty, chooses a worker action, escalates when needed, and records the response.",
  media: coreSenseImages.productVideo,
};

export const overviewTiles: OverviewTile[] = [
  {
    title: "Individual plus environmental",
    bullets: [
      "Personal heat-strain evidence complements site WBGT.",
      "One ambient number is never treated as every worker's condition.",
    ],
    media: coreSenseImages.heatVideo,
  },
  {
    title: "Action before the graph",
    bullets: [
      "BAND OK, CAUTION, or REST NOW stays prominent on the wrist.",
      "The response path continues from worker acknowledgement to supervisor review.",
    ],
    media: coreSenseImages.stormVideo,
  },
  {
    title: "Edge-first decisions",
    bullets: [
      "The same decision contract is designed for firmware, simulator, and dashboard.",
      "Local guidance can continue when internet service is unavailable.",
    ],
    media: coreSenseImages.wokwiLive,
  },
  {
    title: "Privacy by construction",
    bullets: [
      "Raw PPG does not leave the band.",
      "Pseudonymous derived metrics form the minimum operational record.",
    ],
    media: coreSenseImages.wokwiDiagram,
  },
];

export const featureRows: FeatureRow[] = [
  {
    eyebrow: "Estimate",
    title: "Uncertainty-aware heat estimation",
    body: "The published Buller ECTemp estimator runs from a minute heart-rate aggregate. Its confidence band stays visible, and RED requires convergence plus a conservative lower-bound gate. The point is not only the estimate, but knowing when not to trust it.",
    media: coreSenseImages.wokwiBuild,
    imageFirst: false,
    proof: "Engineering basis: science.md and WOKWI-VERIFICATION.md",
    sourceDoc: "science.md",
  },
  {
    eyebrow: "Act",
    title: "Action-first worker interface",
    body: "A 240 by 240 round display prioritizes the next safe action. Wrist raise wakes the screen, a tap acknowledges RED, and repeating haptics continue while a high-risk instruction remains unacknowledged.",
    media: coreSenseImages.heat,
    imageFirst: true,
    proof: "Interaction contract: ONE-PAGE-SUMMARY.md",
    sourceDoc: "ONE-PAGE-SUMMARY.md",
  },
  {
    eyebrow: "Fallback",
    title: "Environmental fallback",
    body: "When optical signal quality degrades, uncertainty widens and CoreSense does not silently guess. The worker visibly falls back to the site environmental advisory, so missing or stale personal input never becomes a confident green.",
    media: coreSenseImages.storm,
    imageFirst: false,
    proof: "Claim boundary: limitations.md",
    sourceDoc: "limitations.md",
  },
];

export const systemSteps = [
  {
    step: "01",
    title: "Sense",
    body: "Heart rate, skin-side temperature, local air and humidity, motion, and site WBGT.",
  },
  {
    step: "02",
    title: "Estimate",
    body: "On-device ECTemp filtering carries model uncertainty forward instead of hiding it.",
  },
  {
    step: "03",
    title: "Decide",
    body: "Personal strain and environmental exposure are evaluated conservatively.",
  },
  {
    step: "04",
    title: "Act",
    body: "Text, shape, color, and haptics tell the worker what to do next.",
  },
  {
    step: "05",
    title: "Record",
    body: "Alert, acknowledgement, rest, recovery, and exceptions form the review trail.",
  },
];

export const useCases: UseCase[] = [
  {
    label: "Early heat-strain action",
    title: "Act before heat strain becomes obvious",
    body: "Combine a worker's changing physiological response with site heat conditions, then present a direct work, caution, or rest instruction on the wrist.",
    media: coreSenseImages.heatVideo,
  },
  {
    label: "Signal-quality fallback",
    title: "Degrade honestly when the signal weakens",
    body: "Poor wrist contact widens uncertainty and shifts the worker to environmental guidance instead of inventing a precise personal reading.",
    media: coreSenseImages.wokwiLive,
  },
  {
    label: "Supervisor escalation",
    title: "Coordinate the response, not only the alert",
    body: "An escalated event can carry the band state, site advisory, acknowledgement status, selected action, and response context for the supervisor.",
    media: coreSenseImages.stormVideo,
  },
  {
    label: "Recovery and audit trail",
    title: "Record what happened next",
    body: "Acknowledgement, rest, recovery, and exception events create a timestamped trail for internal safety review with its limits attached.",
    media: coreSenseImages.productVideo,
  },
  {
    label: "Offline site operation",
    title: "Keep the worker action at the edge",
    body: "Edge connectivity without one SIM per worker reduces cloud dependence while keeping the local action available and existing site procedures authoritative.",
    media: coreSenseImages.sectors,
  },
];

export const industriesIntro = {
  title: "One operating loop across heat-exposed work",
  body: "The same worker action, supervisor response, and reviewable record can be evaluated beside existing controls in five pilot settings.",
  media: coreSenseImages.sectors,
};

export const industries = [
  {
    title: "Construction",
    kicker: "Outdoor build sites",
    body: "Evaluate personal guidance beside site WBGT, hydration, shade, and established work-rest procedures.",
  },
  {
    title: "Plantations",
    kicker: "Distributed field crews",
    body: "Support humid, sun-exposed work where conditions and individual workload can change quickly.",
  },
  {
    title: "Utilities",
    kicker: "Mobile maintenance teams",
    body: "Keep a local worker instruction available across exposed and remote infrastructure locations.",
  },
  {
    title: "Logistics",
    kicker: "Yards and warehouses",
    body: "Add personal heat-strain context to loading areas, vehicle yards, and high-workload shifts.",
  },
  {
    title: "Municipal field teams",
    kicker: "Public outdoor services",
    body: "Evaluate the action and acknowledgement workflow for maintenance and inspection crews.",
  },
];

export const evidenceLead = {
  label: "Engineering evidence",
  title: "A reproducible prototype path, not a field claim",
  body: "The local firmware build, Wokwi previews, deterministic scenarios, and versioned calculations show how CoreSense can be inspected. They do not prove assembled runtime, clinical accuracy, field effectiveness, or certification.",
  media: coreSenseImages.wokwiLive,
};

export const evidenceCards = [
  {
    label: "Published basis",
    title: "A documented estimator",
    body: "The implementation states the Buller model cadence, coefficients, uncertainty, and validation domain.",
    source: "science.md",
  },
  {
    label: "Shared logic",
    title: "One decision contract",
    body: "Firmware, simulator, and dashboard paths are designed around the same estimator and decision rules.",
    source: "architecture.md",
  },
  {
    label: "Data boundary",
    title: "Privacy and auditability",
    body: "Raw optical data stays on the band. Derived pseudonymous metrics and response events form the review record.",
    source: "ONE-PAGE-SUMMARY.md",
  },
  {
    label: "Validation backlog",
    title: "Unknowns stay visible",
    body: "Readability, false wrist wakes, assembled runtime, durability, target-workforce accuracy, field effectiveness, and certification remain open gates.",
    source: "limitations.md",
  },
];

export const faqs = [
  {
    question: "What does CoreSense measure and what does it estimate?",
    answer:
      "The prototype senses heart rate, skin-side temperature, local air conditions, motion, and site WBGT. It estimates heat strain and an advisory state. It does not directly measure clinical core temperature.",
  },
  {
    question: "How is CoreSense different from an ambient-only WBGT monitor?",
    answer:
      "WBGT describes site heat exposure. CoreSense adds individual physiological response so a worker can escalate above the site advisory, but the personal signal can never lower an environmental warning.",
  },
  {
    question: "What happens when wrist signal quality degrades?",
    answer:
      "The estimator runs predict-only, uncertainty grows, and high-risk escalation is withheld unless the conservative gates still pass. Environmental guidance remains available as the fallback.",
  },
  {
    question: "How do the band and site gateway communicate?",
    answer:
      "The proposed band uses ESP-NOW for short 2.4 GHz packets to a shared gateway. This avoids a SIM per worker while allowing the gateway to relay events when internet service is available.",
  },
  {
    question: "What data leaves the band?",
    answer:
      "Derived pseudonymous metrics, advisory state, acknowledgement, and recovery events can leave the band. Raw PPG does not leave the band, and a worker name is not part of the radio packet.",
  },
  {
    question: "Is CoreSense a medical device?",
    answer:
      "No. CoreSense is a safety decision-support prototype, not a clinical thermometer or medical device. It requires target-workforce validation before operational reliance.",
  },
  {
    question: "How mature are the battery and wearable hardware?",
    answer:
      "The baseline electronics, power model, display contract, and sourcing gates are documented. Assembled ten-hour runtime, enclosure durability, sweat resistance, RF range, and glove usability still require physical testing.",
  },
  {
    question: "Where could a CoreSense pilot be evaluated?",
    answer:
      "The brief identifies construction, plantations, utilities, logistics, and municipal field teams. A pilot must run beside existing heat controls, emergency procedures, and approved comparison instruments.",
  },
];

export const footerLinks = [
  { label: "Overview", href: "#overview" },
  { label: "Features", href: "#features" },
  { label: "Use cases", href: "#use-cases" },
  { label: "Industries", href: "#industries" },
  { label: "Evidence", href: "#evidence" },
  { label: "FAQ", href: "#faq" },
];
