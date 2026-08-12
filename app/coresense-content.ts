export type Media = {
  kind: "image" | "video";
  src: string;
  alt: string;
  poster?: string;
  concept?: boolean;
  evidenceLabel?: string;
  position?: string;
};

export type SourceCard = {
  lens: string;
  title: string;
  url: string;
  copy: string;
  boundary: string;
};

export const demoUrl = "https://coresense-demo.vercel.app/demo";

export const labels = {
  conceptVisual: "AI-GENERATED CONCEPT VISUAL · NOT FIELD FOOTAGE",
  conceptProduct: "AI-GENERATED CONCEPT — NOT THE ACTUAL PRODUCT",
  realSoftware: "REAL SOFTWARE CAPTURE",
  authenticPrototype: "AUTHENTIC PROTOTYPE CAPTURE",
  wokwi: "WOKWI BEHAVIORAL MODEL · SIMULATION",
  simulation: "DETERMINISTIC SIMULATION · NO PHYSICAL DOWNLINK",
  accelerated: "DETERMINISTIC SIMULATION · ACCELERATED 30×",
} as const;

export const coreSentence =
  "CoreSense is an action-first worker band and site-intelligence system that turns individual heat-strain signals and environmental context into a clear worker action, a supervisor response and a reviewable evidence trail.";

export const requiredBoundary =
  "CoreSense is an occupational heat-strain screening and decision-support prototype. It does not clinically measure core temperature, replace site risk assessment or measured WBGT, provide medical advice, contact emergency services, certify MSPO conformity, or prove legal compliance.";

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
  applicationConstruction: {
    kind: "image",
    src: "/coresense/application-construction.jpg",
    alt: "Construction worker taking a preventive hydration break with a supervisor nearby",
    concept: true,
    position: "center center",
  },
  applicationPlantation: {
    kind: "image",
    src: "/coresense/application-plantation.jpg",
    alt: "Palm-estate crew returning calmly to a shaded rest shelter",
    concept: true,
    position: "center center",
  },
  applicationLogistics: {
    kind: "image",
    src: "/coresense/application-logistics.jpg",
    alt: "Logistics crew receiving a heat-safety briefing beside a shaded recovery point",
    concept: true,
    position: "center center",
  },
  product: {
    kind: "image",
    src: "/coresense/product-concept.png",
    alt: "CoreSense rugged round-display worker band concept",
    concept: true,
    evidenceLabel: labels.conceptProduct,
    position: "center center",
  },
  productVideo: {
    kind: "video",
    src: "/coresense/product-assembly-concept.mp4",
    poster: "/coresense/product-assembly-concept-poster.jpg",
    alt: "CoreSense round-display worker band shown through a concept assembly sequence",
    concept: true,
    evidenceLabel: labels.conceptProduct,
    position: "center center",
  },
  heatVideo: {
    kind: "video",
    src: "/coresense/heat-hydration.mp4",
    poster: "/coresense/heat-hydration-poster.jpg",
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
    evidenceLabel: labels.wokwi,
    position: "center center",
  },
  wokwiLive: {
    kind: "image",
    src: "/coresense/wokwi-live-preview.png",
    alt: "CoreSense live Wokwi prototype preview",
    evidenceLabel: labels.wokwi,
    position: "center center",
  },
  wokwiDiagram: {
    kind: "image",
    src: "/coresense/wokwi-build-preview.svg",
    alt: "CoreSense wearable prototype component diagram",
    evidenceLabel: labels.wokwi,
    position: "center center",
  },
} satisfies Record<string, Media>;

export const hero = {
  eyebrow: "ACTION 2026 · Heat Health Protection",
  title: "Heat risk workers can act on.",
  body: "Heat strain is personal, dynamic and often invisible until a worker is already impaired. CoreSense turns individual heat-strain signals and environmental context into one clear worker instruction, a supervisor response and a reviewable evidence trail.",
  note: "Read-only software demonstration · no worker data · no physical downlink · field validation remains open",
};

export const problem = {
  eyebrow: "The problem",
  title: "One hot site. Different workers. Different risk.",
  body: "A site-level heat index can describe the environment, but it cannot show how one person is responding to workload, acclimatisation, clothing, hydration, recovery and signal uncertainty. Workers need a clear next action. Supervisors need more than another graph: they need acknowledgement, escalation, rest/recovery follow-through and a reviewable timeline.",
};

export const problemCards = [
  {
    number: "01",
    title: "Individual strain can be missed",
    body: "Environmental conditions matter, but a single ambient threshold cannot represent every worker's response during physical work.",
  },
  {
    number: "02",
    title: "Alerts can stop at the screen",
    body: "A notification without acknowledgement, rest, escalation and exception records is difficult to manage or review.",
  },
  {
    number: "03",
    title: "Safety data can harm trust",
    body: "Collect only what the decision needs. Raw PPG and worker names do not need to travel through the CoreSense heat-risk loop.",
  },
];

export const solution = {
  eyebrow: "The CoreSense loop",
  title: "Sense. Estimate. Decide. Act. Record.",
  body: "CoreSense links an action-first worker band to site intelligence. The worker sees the immediate instruction; the supervisor sees the response loop and evidence context.",
  boundary:
    "CoreSense estimates heat strain from heart-rate behaviour; it does not clinically measure core temperature. Skin temperature and ambient readings remain separate measurements. On-site WBGT remains the authority for current environmental heat exposure when a suitably maintained site instrument is available.",
};

export const systemSteps = [
  {
    step: "01",
    title: "Sense",
    body: "The prototype uses wrist PPG for heart-rate aggregates, a skin-temperature input, local environmental inputs and a separate site heat context.",
  },
  {
    step: "02",
    title: "Estimate",
    body: "The ESP32-C3 runs the Buller ECTemp estimator locally and carries uncertainty forward instead of displaying false precision.",
  },
  {
    step: "03",
    title: "Decide",
    body: "Personal strain can escalate above the environmental advisory, but it cannot lower the safety floor set by the site heat context. Low-quality signals use a visible fallback rather than a silent green.",
  },
  {
    step: "04",
    title: "Act",
    body: "The worker sees BAND OK, CAUTION or REST NOW. Approved bilingual supervisor instructions, manual SOS and possible-fall workflows are modelled in the dashboard.",
  },
  {
    step: "05",
    title: "Record",
    body: "Pseudonymous derived metrics, alert state, acknowledgement, rest/recovery and exceptions can form a reviewable evidence record.",
  },
];

export const workerExperience = {
  eyebrow: "What workers see",
  title: "One small screen. One clear action.",
  body: "The worker interface is designed for a 1.28-inch, 240 × 240 circular GC9A01A display. Critical instructions stay in the centre of the round screen; supporting details sit within the safe circular area. English and Bahasa Melayu copy remains short enough to read under stress.",
  boundary:
    "Round-screen behaviour is implemented in the browser and firmware contract. Physical usability, glove operation, wrist-raise accuracy, vibration, battery runtime and field reliability remain NOT_MEASURED until assembled-device testing.",
};

export const workerInteractions = [
  "Wrist raise wakes the prototype display without changing the selected page.",
  "A short press wakes the screen or advances one normal page.",
  "During an urgent command, a short press acknowledges and silences the haptic pattern while keeping the instruction visible.",
  "A deliberate five-second hold triggers manual SOS once.",
  "The display turns off after ten seconds of inactivity; an active emergency becomes the next screen on wake.",
];

export const supervisorExperience = {
  eyebrow: "What supervisors see",
  title: "A supervisor response loop, not a worker-surveillance dashboard.",
  body: "The supervisor view separates current site heat authority from weather planning context, individual advisory state, acknowledgement, rest/recovery and exception handling. It is designed to support accountable action without exporting raw PPG or worker names.",
};

export const supervisorCapabilities = [
  {
    title: "Measured site conditions",
    body: "Retain source, time, quality and maintenance/calibration status when connected.",
  },
  {
    title: "Derived individual advisory",
    body: "Retain uncertainty, signal quality and fallback state; do not label it as clinical temperature.",
  },
  {
    title: "Weather context",
    body: "Use forecasts and official warnings for planning; never relabel them as on-site WBGT or use them for automatic worker commands.",
  },
  {
    title: "Command simulation",
    body: "Demonstrate one approved bilingual instruction across virtual site, zone or crew assignments with independent simulated receipts.",
  },
  {
    title: "Incident workflow",
    body: "Route manual SOS and possible-fall events to the site supervisor/HSE queue; no call, WhatsApp message or 999 request is made.",
  },
];

export const weatherContext = {
  eyebrow: "Weather and emergency context",
  title: "Plan ahead. Keep the local authority local.",
  body: "Official weather warnings and forecasts help supervisors prepare for rain, thunderstorms, wind and forecast heat. They provide planning lead time, while on-site conditions and existing site procedures remain the operational authority.",
};

export const weatherRules = [
  "Forecasts and official warnings never replace measured site WBGT.",
  "A weather API cannot automatically issue a worker command.",
  "The MPU6050 is used for wrist motion and possible-fall features only; it does not detect rain, flood, earthquakes or other natural hazards.",
  "A possible fall is not a confirmed fall. The current profile is DEMO_UNVALIDATED_V1 and synthetic-test only.",
  "If a command transport is unavailable, the worker must use existing site radio, supervisor, siren, public-address and muster procedures.",
];

export const emergencyCopy = [
  "RETURN TO SHELTER",
  "Severe weather is forecast. Stop work and report to the designated muster point.",
  "KEMBALI KE TEMPAT BERLINDUNG",
  "Cuaca buruk diramal. Hentikan kerja dan lapor ke tempat berkumpul yang ditetapkan.",
];

export const malaysiaEvidence = {
  eyebrow: "Malaysia · OSH · ESG · source-led",
  title: "Evidence, not a compliance badge.",
  intro:
    "CoreSense is designed to turn a heat-risk event into a reviewable trace: conditions, decision, worker action, supervisor response and export context. Official duties, guidance, certification and sustainability reporting remain separate routes with competent human review.",
  reviewDate: "Official sources reviewed 10 August 2026",
  disclaimer:
    "Planning and evidence-support material only. CoreSense does not provide legal, medical, DOSH, certification or assurance advice. Site applicability, thresholds, controls and reportability require the responsible employer and competent Malaysian OSH reviewers.",
};

export const officialSources: SourceCard[] = [
  {
    lens: "Workplace duty",
    title: "Occupational Safety and Health Act 1994 (Act 514), reprint as at 1 June 2024 · DOSH",
    url: "https://dosh.gov.my/wp-content/uploads/2025/03/Act-514-Reprint-Version-1.6.2024_English.pdf",
    copy: "Name the employer/principal, site boundary, control owner and worker communication path before any device notification is treated as operational evidence.",
    boundary: "A competent Malaysian OSH or legal reviewer determines applicability for each site and duty holder.",
  },
  {
    lens: "Heat-risk control",
    title: "Guidelines on Heat Stress Management at Workplace 2016 · DOSH",
    url: "https://dosh.gov.my/wp-content/uploads/2026/03/ve_gl_heat-stress-management-at-wplace-2016.pdf",
    copy: "Keep on-site WBGT authoritative for current heat exposure. Retain task, clothing, acclimatisation and work/rest context around measured conditions and response.",
    boundary: "The guidance is not a universal statutory exposure limit and does not make CoreSense a certified WBGT instrument.",
  },
  {
    lens: "Construction planning",
    title: "Occupational Safety and Health (Construction Work) (Design and Management) Regulations 2024 · DOSH",
    url: "https://dosh.gov.my/wp-content/uploads/2024/10/Peraturan-Peraturan-Keselamatan-Dan-Kesihatan-Pekerjaan-Kerja-Pembinaan-Reka-Bentuk-Dan-Pengurusan-2024.pdf",
    copy: "For a construction pilot, connect work zone, induction, welfare/rest readiness, emergency arrangements and actual supervisor response to the existing site plan.",
    boundary: "The regulations do not turn a wearable alert into a legal conclusion or numeric WBGT limit.",
  },
  {
    lens: "Plantation audit context",
    title: "MSPO 2.0, MS 2530:2022 series",
    url: "https://mspo.org.my/standards/",
    copy: "For an estate or mill, map records to the applicable controlled MSPO standard part, scope and existing OSH audit process.",
    boundary: "Only the controlled standard and accredited certification process determine conformity.",
  },
  {
    lens: "Climate-risk reporting",
    title: "National Sustainability Reporting Framework policy documents · Securities Commission Malaysia",
    url: "https://www.sc.com.my/nsrf/resources/policy-documents",
    copy: "For an in-scope reporting entity, heat can be one evidence stream only where governance, methods, reporting boundaries and material-risk linkage are defensible.",
    boundary: "Heat evidence matters only where it supports a material risk or opportunity inside the reporting entity's boundary.",
  },
];

export const additionalOfficialSources = [
  {
    title: "Construction illustrative sustainability report",
    url: "https://www.sc.com.my/api/documentms/download.ashx?id=3c97696b-29ce-4dd1-b6e3-0ea9da412a32",
  },
  {
    title: "Plantation illustrative sustainability report",
    url: "https://www.sc.com.my/api/documentms/download.ashx?id=3e75904e-7289-4294-b9df-548f74e65965",
  },
  {
    title: "Malaysia weather API documentation",
    url: "https://developer.data.gov.my/realtime-api/weather",
  },
];

export const dataTruthRows = [
  {
    dataClass: "On-site conditions",
    meaning: "A local environmental input with device, place, time, source mode and QA/calibration state.",
    notProof: "A forecast, historical grid or displayed demo is not on-site WBGT.",
  },
  {
    dataClass: "Decision support",
    meaning: "A derived strain estimate, uncertainty, signal-quality state and requested action.",
    notProof: "Clinical core-temperature measurement, diagnosis or permission to continue work.",
  },
  {
    dataClass: "Response record",
    meaning: "Alert issue, delivery, acknowledgement, rest/escalation, exception and reviewer context.",
    notProof: "Legal compliance or control effectiveness merely because a record exists.",
  },
  {
    dataClass: "Demo evidence",
    meaning: "Browser, 50-band receipt and Wokwi behavioural workflows.",
    notProof: "Physical downlink, emergency dispatch, validated fall detection or completed battery-duration proof.",
  },
];

export const pilotEvidenceManifest =
  "A governed pilot should be able to export site/zone/shift and duty-holder scope; pseudonymous device and consent context; environmental source and timestamp; task context; model/ruleset/firmware version; requested action and supervisor rationale; delivery/acknowledgement/rest/escalation; and export/reviewer/access records. This is a proposed evidence design, not a claim that a field dataset, certification, assurance or complete site assessment already exists.";

export const technicalProof = {
  eyebrow: "Technical proof and boundaries",
  title: "Show the proof. Keep the gates visible.",
};

export const implementedProof = [
  "Shared ECTemp algorithm implementation and deterministic test path.",
  "ESP32-C3 firmware build path and 1.28-inch circular GUI contract.",
  "Pseudonymous, derived-only telemetry design.",
  "Read-only dashboard, profile studio, weather context, command receipts and audit preview.",
  "Wokwi behavioural model and PlatformIO compilation evidence.",
];

export const openValidationGates = [
  "Assembled-device current draw and full-shift battery duration.",
  "Display readability, wrist-raise, glove/button, sweat, ingress and durability testing.",
  "Physical gateway/downlink and representative-site radio testing.",
  "Field validation, worker acceptability and response-effectiveness evidence.",
  "Clinical validation, legal applicability, MSPO conformity and external assurance.",
];

export const evidenceDocuments = [
  {
    label: "Scientific basis",
    title: "Estimator assumptions and limits",
    body: "The published Buller heart-rate-to-ECTemp model, coefficients, cadence, uncertainty and validation domain are documented.",
    source: "science.md",
  },
  {
    label: "System contract",
    title: "One decision path",
    body: "Firmware, simulator and dashboard are designed around the same estimator and decision rules so differences remain inspectable.",
    source: "architecture.md",
  },
  {
    label: "Prototype evidence",
    title: "Reproducible software workflow",
    body: "Local firmware builds, Wokwi previews, deterministic scenarios and versioned calculations show the current demonstrable scope.",
    source: "WOKWI-VERIFICATION.md",
  },
  {
    label: "Data boundary",
    title: "Privacy-aware by design",
    body: "Raw optical data stays on the band. Derived pseudonymous scalars, alert state and acknowledgement form the minimum operational record.",
    source: "ONE-PAGE-SUMMARY.md",
  },
  {
    label: "Validation backlog",
    title: "Unknowns stay visible",
    body: "Readability, runtime, durability, clinical accuracy, field effectiveness and certification remain unmeasured or unverified.",
    source: "limitations.md",
  },
];

export const beneficiaries = {
  eyebrow: "Beneficiaries and pilot",
  title: "Built for workers. Evaluated with site teams.",
};

export const applicationScenes = [
  {
    title: "Construction",
    body: "Support early hydration and rest action alongside measured site WBGT and existing work controls.",
    media: coreSenseImages.applicationConstruction,
  },
  {
    title: "Palm operations",
    body: "Give estate and mill teams a language-aware action and a reviewable shift-response context.",
    media: coreSenseImages.applicationPlantation,
  },
  {
    title: "Logistics",
    body: "Coordinate acknowledgement, recovery and escalation across hot yards and warehouse operations.",
    media: coreSenseImages.applicationLogistics,
  },
] as const;

export const beneficiaryCards = [
  {
    title: "Workers",
    body: "Receive a direct, language-aware action without routing raw PPG or names through the operational heat-risk loop.",
  },
  {
    title: "Site operations",
    body: "See risk, signal health, acknowledgement, rest and exceptions in one response timeline.",
  },
  {
    title: "Duty holders",
    body: "Connect hazards, controls, resources and response ownership across employer/principal/contractor or estate/mill contexts.",
  },
  {
    title: "HSE / ESG / audit teams",
    body: "Inspect source lineage, data-quality status, intervention context and open evidence gaps without treating CoreSense as the certifier.",
  },
];

export const pilotOffer = {
  title: "Start shadow-first. Earn the right to scale.",
  body: "CoreSense proposes a bounded, governed pilot for one site or zone. Existing heat controls remain active. The first phase measures implementation feasibility, signal quality, comparator agreement, worker comprehension, response burden, privacy safeguards and audit usability before any expansion decision.",
  note: "Seeking construction and plantation pilot collaborators.",
};

export const aiDisclosure = {
  eyebrow: "AI-use disclosure",
  title: "AI-assisted work stays labelled.",
  body: "A consolidated AI Use Declaration accompanies the ACTION 2026 submission. AI-assisted language, software and selected concept visuals are disclosed. AI-generated visuals are labelled where they appear and are not presented as field footage, prototype evidence, test data or measured results.",
};

export const faqs = [
  {
    question: "Does CoreSense measure core body temperature?",
    answer:
      "No. CoreSense estimates heat strain from heart-rate behaviour and carries uncertainty forward. Skin temperature, ambient conditions and site WBGT remain separate inputs.",
  },
  {
    question: "Can a forecast issue a worker instruction?",
    answer:
      "No. Forecasts and official warnings support planning. They do not replace measured site WBGT and cannot automatically issue a worker command.",
  },
  {
    question: "Does the demonstration contact emergency services?",
    answer:
      "No. Manual SOS and possible-fall events are modelled inside a read-only supervisor workflow. No call, message or emergency-services request is made.",
  },
  {
    question: "What remains unvalidated?",
    answer:
      "Assembled runtime, physical downlink, radio range, field effectiveness, worker acceptability, durability, clinical accuracy, legal applicability and certification remain open gates.",
  },
];

export const footerStatement =
  "CoreSense · Heat-health decision support · read-only demonstration · field, clinical, hardware and compliance validation remain open";

export const footerLinks = [
  { label: "How it works", href: "#solution-loop" },
  { label: "Worker experience", href: "#worker-experience" },
  { label: "Evidence boundary", href: "#technical-proof" },
  { label: "AI-use summary", href: "#ai-use" },
];
