export type Media = {
  src: string;
  alt: string;
  concept?: boolean;
};

export type OverviewTile = {
  title: string;
  bullets: string[];
  media: Media;
};

export type FeatureRow = {
  title: string;
  body: string;
  media: Media;
  imageFirst: boolean;
  proof: string;
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
  body: "Personal heat-strain guidance on the wrist, with clear escalation and an evidence trail for supervisors.",
};

export const coreSenseImages = {
  heat: {
    src: "/coresense/heat-construction.png",
    alt: "Construction worker checking a wrist band in hot site conditions",
    concept: true,
  },
  storm: {
    src: "/coresense/storm-shelter.png",
    alt: "Field workers returning to shelter before a tropical storm",
    concept: true,
  },
  sectors: {
    src: "/coresense/sector-impact.png",
    alt: "Construction, plantation, and logistics work settings",
    concept: true,
  },
  product: {
    src: "/coresense/product-concept.png",
    alt: "CoreSense rugged round-display worker band concept",
    concept: true,
  },
  wokwiBuild: {
    src: "/coresense/wokwi-build-preview.png",
    alt: "CoreSense Wokwi firmware build preview",
  },
  wokwiLive: {
    src: "/coresense/wokwi-live-preview.png",
    alt: "CoreSense live Wokwi prototype preview",
  },
  wokwiDiagram: {
    src: "/coresense/wokwi-build-preview.svg",
    alt: "CoreSense wearable prototype component diagram",
  },
} satisfies Record<string, Media>;

export const overviewLead = {
  title: "Sense. Estimate. Decide. Act. Record.",
  body: "CoreSense turns worker and site signals into a clear on-wrist instruction, a supervisor response path, and a timestamped record of what happened next.",
  media: coreSenseImages.product,
};

export const overviewTiles: OverviewTile[] = [
  {
    title: "Individual plus environmental",
    bullets: [
      "Personal heat-strain evidence complements site WBGT.",
      "One ambient number is never treated as every worker's condition.",
    ],
    media: coreSenseImages.heat,
  },
  {
    title: "Edge-first decisions",
    bullets: [
      "The band estimates strain and selects the worker action locally.",
      "Guidance can continue when the internet connection is unavailable.",
    ],
    media: coreSenseImages.wokwiBuild,
  },
  {
    title: "Privacy by construction",
    bullets: [
      "Raw PPG does not leave the band.",
      "Radio packets carry pseudonymous derived metrics instead of worker names.",
    ],
    media: coreSenseImages.wokwiDiagram,
  },
  {
    title: "Operationally legible",
    bullets: [
      "The small screen prioritizes BAND OK, CAUTION, or REST NOW.",
      "Haptics continue for an unacknowledged high-risk instruction.",
    ],
    media: coreSenseImages.storm,
  },
];

export const featureRows: FeatureRow[] = [
  {
    title: "Uncertainty-aware heat estimation",
    body: "The published Buller ECTemp estimator runs once per minute from an aggregated heart-rate signal. Its uncertainty remains visible, and a high-risk alert requires both convergence and a conservative lower-bound check.",
    media: coreSenseImages.wokwiLive,
    imageFirst: false,
    proof: "Source: science.md",
  },
  {
    title: "Action-first worker interface",
    body: "A round 240 by 240 display keeps the next safe action prominent. Wrist raise, button acknowledgement, timed display sleep, and repeating haptics are defined for the prototype workflow.",
    media: coreSenseImages.product,
    imageFirst: true,
    proof: "Source: ONE-PAGE-SUMMARY.md",
  },
  {
    title: "Environmental fallback",
    body: "If wrist signal quality drops, CoreSense widens the uncertainty band and falls back to environmental guidance. Missing or stale input never becomes a confident green state.",
    media: coreSenseImages.heat,
    imageFirst: false,
    proof: "Source: limitations.md",
  },
  {
    title: "Edge connectivity without one SIM per worker",
    body: "Bands use ESP-NOW to reach a shared site gateway. The on-wrist action remains local, while the gateway can relay higher-level events and acknowledgements when connectivity is available.",
    media: coreSenseImages.wokwiDiagram,
    imageFirst: true,
    proof: "Source: architecture.md",
  },
  {
    title: "Privacy and auditability",
    body: "Derived metrics, alert state, acknowledgements, and recovery events form the review trail. The design separates worker guidance from supervisor context and avoids transmitting raw optical waveforms.",
    media: coreSenseImages.sectors,
    imageFirst: false,
    proof: "Source: architecture.md",
  },
];

export const useCases: UseCase[] = [
  {
    label: "Early heat-strain action",
    title: "Act before heat strain becomes obvious",
    body: "Combine a worker's changing heart-rate pattern with site heat conditions, then present a direct work, caution, or rest instruction on the wrist.",
    media: coreSenseImages.heat,
  },
  {
    label: "Signal-quality fallback",
    title: "Degrade honestly when the signal weakens",
    body: "Poor wrist contact widens uncertainty and shifts the worker to environmental guidance instead of inventing a precise personal reading.",
    media: coreSenseImages.wokwiLive,
  },
  {
    label: "Supervisor escalation",
    title: "Give supervisors response context",
    body: "Escalated events can carry the band state, site advisory, acknowledgement status, and a traceable source snapshot for review.",
    media: coreSenseImages.storm,
  },
  {
    label: "Recovery and audit trail",
    title: "Record the response, not only the alert",
    body: "Acknowledgement and recovery events create a timestamped trail showing what was detected, what action followed, and when conditions improved.",
    media: coreSenseImages.product,
  },
  {
    label: "Offline site operation",
    title: "Keep the worker action at the edge",
    body: "The band and shared site gateway reduce dependence on one cloud connection or SIM per worker while keeping local procedures authoritative.",
    media: coreSenseImages.sectors,
  },
];

export const industries = [
  {
    title: "Construction",
    kicker: "Outdoor build sites",
    body: "Pilot personal heat guidance alongside site WBGT, hydration, shade, and established work-rest procedures.",
  },
  {
    title: "Plantations",
    kicker: "Distributed field crews",
    body: "Support workers across humid, sun-exposed areas where site conditions and individual workload can vary quickly.",
  },
  {
    title: "Utilities",
    kicker: "Mobile maintenance teams",
    body: "Keep a local worker instruction available while crews move between exposed, remote, and infrastructure-heavy locations.",
  },
  {
    title: "Logistics",
    kicker: "Yards and warehouses",
    body: "Add personal heat-strain context to shift planning, loading areas, vehicle yards, and high-workload operations.",
  },
  {
    title: "Municipal field teams",
    kicker: "Public outdoor services",
    body: "Evaluate the same action and acknowledgement workflow for maintenance, inspection, and emergency-support crews.",
  },
];

export const evidenceCards = [
  {
    label: "Published basis",
    title: "A documented estimator",
    body: "The implementation follows the published Buller heart-rate-to-ECTemp model and states its cadence, coefficients, uncertainty, and validation domain.",
    source: "science.md",
  },
  {
    label: "Shared logic",
    title: "One decision contract",
    body: "The same estimator and decision rules are intended for firmware, simulator, and dashboard paths to reduce silent drift between demonstrations.",
    source: "architecture.md",
  },
  {
    label: "Engineering evidence",
    title: "A reproducible prototype path",
    body: "Local firmware builds, Wokwi previews, deterministic scenarios, and versioned calculations show how the concept can be inspected and repeated.",
    source: "WOKWI-VERIFICATION.md",
  },
  {
    label: "Data boundary",
    title: "Privacy-aware by design",
    body: "Raw optical data stays on the band. Derived pseudonymous scalars, alert state, and acknowledgements form the minimum operational record.",
    source: "ONE-PAGE-SUMMARY.md",
  },
  {
    label: "Validation backlog",
    title: "Unknowns stay visible",
    body: "Readability, false wrist wakes, assembled runtime, durability, clinical accuracy, field effectiveness, and certification remain unmeasured or unverified.",
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
      "The estimator runs predict-only, its uncertainty grows, and high-risk escalation is withheld unless the conservative decision gates still pass. Environmental guidance remains available as the fallback.",
  },
  {
    question: "How do the band and site gateway communicate?",
    answer:
      "The proposed band uses ESP-NOW for short 2.4 GHz packets to a shared gateway. This avoids a SIM per worker while allowing a gateway to relay events when internet service is available.",
  },
  {
    question: "What data leaves the band?",
    answer:
      "Derived pseudonymous metrics, advisory state, acknowledgement, and recovery events can leave the band. Raw PPG does not leave the band, and a worker name is not part of the radio packet.",
  },
  {
    question: "Is CoreSense a medical device?",
    answer:
      "No. CoreSense is a safety decision-support prototype, not a clinical thermometer or medical device. Its estimator and interface require target-workforce validation before operational reliance.",
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
