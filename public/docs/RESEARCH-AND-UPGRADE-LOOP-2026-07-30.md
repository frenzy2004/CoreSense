# CoreSense research and upgrade loop — 30 July 2026

## Decision from this loop

The highest-value software-only upgrade is a **verifiable source-and-evidence chain**. CoreSense already records alerts, acknowledgement, rest and recovery, but the commercial and audit claim becomes stronger only when a reviewer can answer two questions:

1. Which controlled source and version informed the control map?
2. Can an exported event sequence be checked for mutation or reordering?

This loop therefore adds a live source registry and a portable SHA-256 receipt chain to the evidence bundle. It does **not** claim that the database is append-only, that every relevant event is complete, or that the records prove legal compliance.

## Current primary-source findings

### Malaysian occupational safety and health

- The Occupational Safety and Health (Amendment) Act 2022 came into operation on **1 June 2024**. The current Act 514 reprint includes section 18B, which requires an employer, self-employed person or principal to conduct a risk assessment and implement risk control where required. This makes a traceable hazard → assessment → control → response → review chain commercially relevant, but software records do not prove that every practicable control was implemented.
- The DOSH **Guidelines on Heat Stress Management at Workplace 2016** remain the listed official heat-stress guidance. They use adjusted WBGT with work, clothing, metabolic and acclimatisation context and describe monitoring, hydration, work-rest, engineering/administrative controls, first aid and emergency arrangements. They also describe gradual acclimatisation rather than treating fitness or training as a substitute.
- Construction Work (Design and Management) Regulations 2024 add a current construction duty-holder and planning context. CoreSense evidence should attach to the construction-phase plan and existing emergency/welfare controls; the wearable must not become a separate permission-to-work authority.

Primary sources:

- DOSH, [Act 514 reprint](https://dosh.gov.my/wp-content/uploads/2025/03/Act-514-Reprint-Version-1.6.2024_English.pdf)
- DOSH, [Act A1648 commencement notice](https://dosh.gov.my/wp-content/uploads/2024/10/Pemberitahuan-Tarikh-Kuat-Kuasa-Akta-A1648-PUB-128-2024.pdf)
- DOSH, [Heat Stress Management at Workplace 2016](https://dosh.gov.my/wp-content/uploads/2026/03/ve_gl_heat-stress-management-at-wplace-2016.pdf)
- DOSH, [Construction Work (Design and Management) Regulations 2024](https://dosh.gov.my/wp-content/uploads/2024/10/Peraturan-Peraturan-Keselamatan-Dan-Kesihatan-Pekerjaan-Kerja-Pembinaan-Reka-Bentuk-Dan-Pengurusan-2024.pdf)

### Palm oil and sustainability reporting

- MSPO 2.0 is the MS 2530:2022 series. Its worker-safety and health criterion includes implemented and communicated OSH controls and maintained records. CoreSense can supply bounded evidence to an estate or mill control system, but only the controlled standard and accredited certification process determine conformity.
- Malaysia's NSRF uses IFRS S1 and IFRS S2 as the baseline, with phased adoption. The Securities Commission now provides construction- and plantation-sector illustrative sustainability reports. Heat evidence is useful only where it connects to a material risk or opportunity, the reporting boundary, governance, operational response, metrics and financial prospects.

Primary sources:

- MSPO, [MSPO 2.0 standards](https://mspo.org.my/standards/)
- Securities Commission Malaysia, [NSRF policy documents](https://www.sc.com.my/nsrf/resources/policy-documents)
- Securities Commission Malaysia, [construction illustrative report](https://www.sc.com.my/api/documentms/download.ashx?id=3c97696b-29ce-4dd1-b6e3-0ea9da412a32)
- Securities Commission Malaysia, [plantation illustrative report](https://www.sc.com.my/api/documentms/download.ashx?id=3e75904e-7289-4294-b9df-548f74e65965)

### Real-data sources and authority boundary

| Source | Useful for | Resolution / freshness | CoreSense authority |
|---|---|---|---|
| On-site reference WBGT instrument | Pilot comparison, control decisions and calibration evidence | Site/task-specific; instrument cadence | Required field reference under competent site control |
| CoreSense site node | Continuous local WBGT-indicative trend | Site-specific; current node remains simulated | Advisory input only until physical validation and maintenance evidence exist |
| Band-derived strain data | Individual screening, uncertainty and early-warning evaluation | Worker minute-level; derived scalars only | Personal advisory input; no raw PPG/HR upload and no clinical diagnosis |
| MET Malaysia API V2.1 | Official regional forecast and warnings | Forecast/warning; service availability varies | Planning context only; never site WBGT or permission to work |
| NASA POWER | Historical/near-real-time gridded climate baselines and seasonality | Coarse meteorology grid; near-real-time delay | Research and pilot-planning context only; never safety-state authority |
| Supervisor/rest/outcome records | Response time, intervention completeness and operational learning | Event-level | Evidence of recorded action, not proof that the action was sufficient |
| Worker consultation and comprehension checks | Wearability, language, trust, non-retaliation and control usability | Pilot cohort | Governance evidence; must remain separated from discipline/productivity use |

Primary data-service sources:

- Malaysian Meteorological Department, [MET API V2.1](https://metapi2.met.gov.my/)
- NASA POWER, [temporal data APIs](https://power.larc.nasa.gov/docs/services/api/temporal/)

The live registry check on 30 July 2026 retrieved and hashed nine of ten sources. MET Malaysia returned HTTP 503 during the check and remains visibly `unreachable`; the system does not substitute a stale green state.

## Possibility map and priority score

Scores are 1–5. Total = safety value + audit/compliance value + commercial learning + software feasibility. High scores do not override external authority gates.

| Opportunity | Safety | Audit | Commercial | Feasible | Total | Decision |
|---|---:|---:|---:|---:|---:|---|
| Hash-chained evidence receipt and manifest | 4 | 5 | 4 | 5 | 18 | Implemented in this loop |
| Controlled source registry with live status and hashes | 3 | 5 | 4 | 5 | 17 | Implemented in this loop |
| Database append-only event ledger with concurrency-safe sequence | 4 | 5 | 4 | 3 | 16 | Next after live Postgres validation is available |
| Complete device/calibration/config/ruleset lineage | 5 | 5 | 4 | 3 | 17 | Next schema and ingest priority |
| Fused-site downlink with freshness/replay protection | 5 | 4 | 5 | 2 | 16 | Hardware/firmware authority gate |
| Physical WBGT node plus calibrated comparator workflow | 5 | 5 | 5 | 1 | 16 | Field partner and hardware gate |
| Offline gateway store-and-forward with idempotent replay | 5 | 4 | 4 | 3 | 16 | High-value reliability loop |
| Worker consent, withdrawal, grievance and non-retaliation workflow | 5 | 5 | 5 | 2 | 17 | Co-design with worker representatives before implementation |
| Multilingual drill and comprehension evidence | 5 | 4 | 4 | 3 | 16 | Pilot readiness; requires shaped-font/device proof |
| Forecast-informed shift planning | 3 | 3 | 4 | 4 | 14 | Useful context; never feeds the safety state |
| Heat-exposure map/digital twin | 3 | 3 | 4 | 2 | 12 | Defer until calibrated spatial sensors exist |
| Outcome and operating-cost cohort analytics | 3 | 4 | 5 | 4 | 16 | Implement after real pilot denominators exist |
| Enterprise access, retention, deletion and export-access logs | 4 | 5 | 5 | 3 | 17 | Production-security priority |
| Signed release/config registry and rollback evidence | 4 | 5 | 4 | 3 | 16 | Production engineering priority |

## Collaboration and mutual-benefit possibilities

The existing ten-partner approval queue is suitable for a first wave. The data exchange should be framed by partner type:

| Partner type | CoreSense receives | Partner receives | Non-negotiable boundary |
|---|---|---|---|
| Construction or plantation host | Shadow-mode work/task/environment/response evidence | Heat-control gap analysis and a reconciled pilot evidence pack | Existing controls and stop-work authority remain active |
| University / occupational-health research team | Comparator protocol, analysis and independent review | An applied Malaysian worker-heat study and governed dataset | Ethics, consent, withdrawal and publication rules before collection |
| NIOSH / competent industrial hygiene partner | Measurement method and training review | A testbed for worker-facing control communication | No claim of endorsement or approval |
| Worker union / representative group | Language, trust, burden and non-retaliation review | A worker-rights control with visible grievance and withdrawal evidence | No productivity, discipline, pay, attendance or immigration use |
| WBGT/calibration supplier | Comparator instrument and maintenance evidence | Pilot demand, field feedback and reference workflow | Supplier data never silently certifies the DIY site node |
| Insurer / SOCSO research route | De-identified aggregate outcome and intervention evidence | Prevention-learning hypothesis | No individual underwriting or employment decision use |

## Engineering loop and stop conditions

Each loop is bounded:

1. Research one high-risk gap with current primary sources.
2. State the authority and privacy boundary.
3. Select one change with a measurable acceptance gate.
4. Implement and test the smallest end-to-end slice.
5. Run unit, type, build, responsive, accessibility and adversarial checks proportional to the change.
6. Record what remains unproved.

The software loop stops and escalates instead of claiming completion when the next proof requires deployed-environment authority, physical hardware, a real host site, worker/ethics authority, a competent Malaysian reviewer, paid-provider access or field data. Local Postgres migration and invariant checks are automated; they do not prove production deployment. Those remaining items are maturation gates, not software defects that can be wished away.

## Acceptance gates for this loop

- Source checks retain HTTP failure, content-type drift, digest and retrieval time.
- A failed contextual source cannot become a healthy safety signal.
- Evidence receipt chains are deterministic across input order and change when a row changes.
- Empty bundles have a defined genesis root.
- Export manifests state that a portable chain does not prove database completeness or legal compliance.
- The Icy dashboard exposes source status and claim boundaries without adding a second page or changing the established control-room design.
- The local migrated database passes a read-only invariant gate for RLS, view security, consent triggers, sensitive-column exclusion, constraints and gateway RPC privileges.
