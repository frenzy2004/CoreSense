# CoreSense product maturity plan

**Owner for commercial, beneficiary, pilot and compliance readiness:** Icy  
**Current product state:** integrated software candidate for controlled review  
**Not yet:** field-released product, medical device, regulator-approved system, ESG assurance product or replacement for competent occupational-safety decisions

## Product aim

CoreSense should help a heat-exposed worksite complete one defensible operating loop:

1. Capture a worker’s privacy-limited personal strain signal and current site environment.
2. Fuse those signals under an explicit freshness and quality policy.
3. Present an unambiguous action to the worker and supervisor.
4. Record alert delivery, acknowledgement, rest or escalation and the observable outcome.
5. Export the RLS-scoped evidence with deterministic ordering, schema, row count and content hash.
6. Preserve the claim boundary: the system advises; the employer, competent HSE personnel and emergency process retain authority.

The target is not “more screens.” The target is a traceable path from signal to decision to intervention to evidence.

## What “mature product” means here

CoreSense can move beyond MVP language when all of the following are true:

- The main user journeys are integrated, accessible and covered by repeatable software tests.
- Safety states, stale data, missing data and degraded modes are explicit.
- Every export is scoped to the signed-in user’s site and can be reconciled to a deterministic content hash.
- Personal physiology stays purpose-limited; raw PPG is not uploaded or placed in employer reports.
- The wearable never declares site-level clearance without a verified fused-site downlink.
- Hardware, scientific, worker-rights, field-operations, deployment-security and commercial gates have named owners and retained evidence.
- A real host site has completed a shadow-first pilot under existing heat controls and stop-work authority.

Local software completion alone cannot satisfy the last three conditions. Until they are closed, the honest label is **integrated software candidate** or **governed pilot candidate**.

## Current prepared surfaces

| Capability | Current evidence | State |
|---|---|---|
| Live supervisor control room | Authenticated site shell, latest telemetry, WBGT and realtime surfaces | Prepared in software |
| Worker wearable GUI | Personal-signal states and safety-language boundary | Prepared for demonstration; fused downlink open |
| Fused-loop explanation | Explicit personal/site inputs and dominant-state logic | Prepared in software |
| Daily health-impact metrics | RLS security-invoker metrics functions and dashboard | Prepared in software; field interpretation open |
| Compliance event log | Alert, acknowledgement, break, outcome and delivery fields | Prepared in software |
| Evidence export | Deterministic CSV, hash-chained JSONL receipt and JSON manifest with SHA-256 content and chain roots | Prepared in software; database append-only proof remains open |
| Controlled source register | Primary legal, guidance, certification, reporting and contextual-data sources with retrieval state, content type and SHA-256 digest | Prepared in software; applicability remains a competent-review gate |
| Icy commercial and compliance dossier | Beneficiaries, buyer, pilot, Malaysian control map and claim limits | Prepared for partner review |
| Partner pipeline | Ten researched, tailored, hash-bound drafts | Waiting for user approval; no sending capability |
| Cross-team engineering proof | Reproducible EKF matrices/memory, packet sizes, small-globe scenarios and battery-current envelopes | Software calculations passed; physical, field and standards-conformity evidence open |

## Cross-team integration ownership

| Owner | Prepared now | Must be closed before the claim advances |
|---|---|---|
| Hongshen · mechanics/analysis | Exact Buller matrix form, dynamic small-globe examples, split rigid-pod/TPU architecture and mechanical test plan | CAD revision, measured material coupons, structural/thermal solver files, drop/pull/ingress/RF evidence and 150 mm co-location |
| Phi · cloud/protocol | Fixed 20/23-byte ESP-NOW contract, anonymized ingest boundary, RLS/consent/database invariant gate | Radio ACK/retry/loss telemetry, real gateway coexistence, production threat model and DB-backed alert outbox |
| Muthu · firmware/hardware | EKF parity, current rolling/trimmed HR rejection, watch GUI and explicit 10-hour current ceilings | Accelerometer-aided artifact benchmark, assembled power trace, fused-site downlink, physical GUI/haptic/sun/sweat tests |
| Icy · product/commercial | Unified dashboard, beneficiaries/buyer, audit exports, partner proposal/queue and pilot gates | Host, worker/ethics approval, independent validation, supplier quotes, procurement route and paid-pilot evidence |

## Release gates

### Gate A — software integrity

Pass evidence:

- Typecheck, unit tests and production build complete without error.
- Authenticated desktop and 320, 375, 414 and 768 px journeys have no blocked action, horizontal document overflow or unreadable state.
- Missing and stale data are tested and remain visibly degraded.
- CSV escaping, stable ordering, evidence-hash generation and receipt-chain tamper detection are unit tested.
- Controlled sources retain retrieval time, HTTP/content-type failures and content hashes; a failed source does not present as verified.
- Export queries stay under the caller’s RLS session; no service-role credential is used.
- Authenticated users cannot update alert rows directly; acknowledgement is restricted to the ACK-only RPC and supervisor/HSE/admin roles.
- The read-only local database gate confirms RLS, security-invoker views, consent triggers, privacy columns, safety constraints and gateway RPC privileges against the migrated schema.

Owner: software engineering.  
Current state: local software and migrated-database gates passed on 30 July 2026; deployed-environment verification remains open.

### Gate B — wearable and hardware authority

Pass evidence:

- Verified fused-site downlink, freshness timeout, disconnect state and protocol version.
- Full-shift battery and charging evidence.
- Sunlight, sweat, motion, ingress, haptic, button, enclosure and maintenance testing.
- The physical display never shows unconditional “SAFE”; loss of site authority degrades visibly.

Owner: device and firmware engineering.  
Current state: open external gate.

### Gate C — scientific validity

Pass evidence:

- Pre-registered comparator, population, sample size, agreement and failure criteria.
- Dropout, sensor-quality and missing-environment reporting.
- Independent review of thresholds and fallback behaviour.
- No clinical-temperature or illness-diagnosis claim beyond the evidence.

Owner: technical lead plus competent occupational-health research partner.  
Current state: open external gate.

### Gate D — worker rights and site governance

Pass evidence:

- Plain-language, multilingual, individual consent and withdrawal without employment consequence.
- Written prohibition on discipline, pay, attendance, immigration, productivity scoring and unrelated surveillance uses.
- Worker-representation, ethics, site, HSE and legal routes documented where applicable.
- Role access, retention, deletion, incident response and grievance procedures rehearsed.

Owner: host HSE, HR/privacy, worker representatives and research/ethics owner.  
Current state: open external gate.

### Gate E — field operations

Pass evidence:

- Shadow mode runs alongside all existing heat controls.
- Water, shade, rest, escalation and emergency resources are actually available.
- Supervisors complete acknowledgement and corrective-action drills.
- Pilot deviations and adverse events have a stop rule and named escalation owner.

Owner: host site manager and Safety and Health Officer.  
Current state: open external gate.

### Gate F — security and deployment

Pass evidence:

- Deployment threat model, secrets management, backup/restore, audit access and incident response are reviewed.
- Environment-specific configuration, monitoring and recovery objectives are tested.
- Dependency, database migration and production access gates are recorded.

Owner: software/security owner plus host IT.  
Current state: local evidence only; production gate open.

### Gate G — commercial viability

Pass evidence:

- Named sponsor and procurement route.
- Supplier quotes and fully burdened device, deployment, connectivity, training, support, replacement and compliance costs.
- Paid-pilot scope, support boundary, liability allocation and success criteria.
- Buyer interviews and documented willingness to pay.
- Benefit reporting avoids invented incident-reduction or return-on-investment claims.

Owner: Icy plus pilot sponsor.  
Current state: hypothesis prepared; external proof open.

## Icy workstream completion

Icy’s prepared package consists of:

- `/icy`: integrated product, beneficiary, commercial, partner and release command page.
- `/pilot-compliance`: detailed Malaysian occupational-safety, ESG and pilot dossier.
- `/metrics`: current daily operational evidence.
- `/compliance`: RLS-scoped event log plus CSV, PDF and hashed evidence-bundle exports.
- `docs/CoreSense-Pilot-Collaboration-Proposal.docx`: reusable collaboration proposal.
- `docs/PILOT-PARTNER-SHORTLIST.md`: evidence-based partner shortlist.
- `docs/PARTNER-OUTREACH-QUEUE.md`: user-only approval queue.

The outreach workflow remains draft-only. Approval of a draft does not authorise sending, form submission, site access, data collection, spend, publication or use of a partner’s name or logo.

## Recommended pilot sequence

1. **Partner scoping:** select one host, one independent research/technical reviewer and one worker-rights review route.
2. **Protocol freeze:** agree intended use, exclusions, data fields, thresholds, comparator, stop rules and ownership.
3. **Bench and usability proof:** verify firmware, display, battery, degraded states and multilingual comprehension.
4. **Shadow field phase:** collect consented data without changing existing work/rest or emergency decisions.
5. **Independent review:** reconcile protocol deviations, signal quality, evidence completeness and adverse events.
6. **Bounded active phase:** only after pre-agreed gates pass; retain competent-person override and existing controls.
7. **Commercial decision:** price only after actual support effort, replacement rates, procurement constraints and buyer value are known.

## Stop conditions

Do not advance or market the system as mature if any of these occurs:

- The wearable can imply site-level clearance without a current fused-site message.
- Missing or stale data is rendered as normal operation.
- Raw PPG or identifiable physiological streams enter employer or partner exports.
- Worker consent is absent, coerced or cannot be withdrawn safely.
- A host lacks water, shade, rest, escalation or stop-work capacity.
- A test, build, migration, browser journey, hardware flow or field gate is red or unverified.
- A partner is contacted without the user’s explicit approval of the exact draft and a separate instruction to perform that external action.
