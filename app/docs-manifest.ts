export type CoreSenseDocument = {
  path: string;
  title: string;
  category: "Core" | "Engineering" | "Pilot" | "Production" | "Outreach";
};

export const coreSenseDocuments: CoreSenseDocument[] = [
  { path: "ONE-PAGE-SUMMARY.md", title: "One-Page Summary", category: "Core" },
  { path: "CONTRACT.md", title: "Product Contract", category: "Core" },
  { path: "architecture.md", title: "System Architecture", category: "Engineering" },
  { path: "science.md", title: "Scientific Basis", category: "Engineering" },
  { path: "limitations.md", title: "Limitations and Claim Boundaries", category: "Engineering" },
  { path: "BOM.md", title: "Bill of Materials", category: "Engineering" },
  { path: "WOKWI-VERIFICATION.md", title: "Wokwi Verification", category: "Engineering" },
  { path: "WEATHER-INTELLIGENCE.md", title: "Weather Intelligence", category: "Engineering" },
  { path: "PRODUCT-MATURITY-PLAN.md", title: "Product Maturity Plan", category: "Engineering" },
  { path: "HUAQIANGBEI-WEARABLE-SOURCING-GATE.md", title: "Wearable Sourcing Gate", category: "Engineering" },
  { path: "RESEARCH-AND-UPGRADE-LOOP-2026-07-30.md", title: "Research and Upgrade Loop", category: "Engineering" },
  { path: "TEAM-TECHNICAL-INTEGRATION-2026-07-30.md", title: "Team Technical Integration", category: "Engineering" },
  { path: "demo-runbook.md", title: "Demo Runbook", category: "Production" },
  { path: "video-script.md", title: "Three-Minute Video Script", category: "Production" },
  { path: "ICY-8-MINUTE-VIDEO-PRODUCTION-PACK.md", title: "Eight-Minute Video Production Pack", category: "Production" },
  { path: "ICY-CONCEPT-FOOTAGE-PACK.md", title: "Concept Footage Pack", category: "Production" },
  { path: "FIELD-FOOTAGE-AND-PRODUCT-SHOOT-PACK.md", title: "Field Footage and Product Shoot Pack", category: "Production" },
  { path: "video-assets/README.md", title: "Video Asset Register", category: "Production" },
  { path: "PILOT-PARTNER-SHORTLIST.md", title: "Pilot Partner Shortlist", category: "Pilot" },
  { path: "PARTNER-OUTREACH-AUTOMATION.md", title: "Partner Outreach Automation", category: "Pilot" },
  { path: "PARTNER-OUTREACH-QUEUE.md", title: "Partner Outreach Queue", category: "Pilot" },
  { path: "outreach-drafts/cream-cidb.md", title: "CREAM and CIDB Outreach", category: "Outreach" },
  { path: "outreach-drafts/gamuda-engineering.md", title: "Gamuda Engineering Outreach", category: "Outreach" },
  { path: "outreach-drafts/ijm-construction.md", title: "IJM Construction Outreach", category: "Outreach" },
  { path: "outreach-drafts/ioi-upm.md", title: "IOI and UPM Outreach", category: "Outreach" },
  { path: "outreach-drafts/mbam.md", title: "MBAM Outreach", category: "Outreach" },
  { path: "outreach-drafts/mpoa.md", title: "MPOA Outreach", category: "Outreach" },
  { path: "outreach-drafts/mtuc-worker-review.md", title: "MTUC Worker Review Outreach", category: "Outreach" },
  { path: "outreach-drafts/niosh-malaysia.md", title: "NIOSH Malaysia Outreach", category: "Outreach" },
  { path: "outreach-drafts/sd-guthrie.md", title: "SD Guthrie Outreach", category: "Outreach" },
  { path: "outreach-drafts/sunway-ilabs-suncon.md", title: "Sunway iLabs and SunCon Outreach", category: "Outreach" },
];

export function getCoreSenseDocument(path: string) {
  return coreSenseDocuments.find((document) => document.path === path);
}
