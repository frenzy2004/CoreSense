# CoreSense Partner Outreach Automation

## Outcome

This workflow automatically turns the reviewed partner registry into tailored outreach drafts, a hash-locked approval queue, and a machine-readable manifest. It is deliberately **draft-only**.

It cannot:

- send an email or message;
- submit a website form;
- contact a partner through social media;
- approve its own draft;
- recruit a worker or authorize data collection;
- publish a case study or use a partner logo;
- claim DOSH/JKKP approval, MSPO certification, ESG assurance, or partner endorsement.

## Files

| File | Purpose |
|---|---|
| `partnerships/partners.json` | Structured partner registry, value exchange, first ask, and official routes |
| `partnerships/approvals.json` | User-only, hash-bound approvals; initially empty |
| `partnerships/outreach-manifest.json` | Generated machine-readable workflow state |
| `docs/PARTNER-OUTREACH-QUEUE.md` | Human approval dashboard |
| `docs/outreach-drafts/*.md` | One tailored draft per partner |
| `scripts/partner-outreach.mjs` | Deterministic generator and validator; no delivery code |
| `scripts/partner-outreach.test.mjs` | Safety, schema, hash, and no-send tests |

## Commands

```powershell
pnpm partner:prepare
pnpm partner:check
pnpm partner:test
pnpm partner:status
```

`partner:prepare` regenerates all draft artifacts. `partner:check` fails when any generated draft or manifest is stale. `partner:test` verifies the registry, approval boundary, draft safeguards, hash invalidation, and absence of network or messaging primitives.

## Approval sequence

1. Open `docs/PARTNER-OUTREACH-QUEUE.md`.
2. Read the complete draft for one partner.
3. Verify the intended recipient, official route, claims, proposed ask, benefits, and safeguards.
4. Give the exact approval phrase containing the partner id and full draft SHA-256, or request revisions.
5. A human-controlled step records the approval in `partnerships/approvals.json` with `approvedBy: "user"`.
6. Regenerate and recheck the queue. Any text change invalidates the prior approval.
7. Sending remains blocked. Creating or sending an external draft requires a separate, explicit instruction and a separately reviewed connector or manual action.

## Recurring refresh contract

The companion Codex automation may refresh official-source research, update the registry, regenerate drafts, run the tests, and present the changed hashes for review. It must stop at `WAITING_FOR_USER_APPROVAL`. It must never contact a party or write its own approval record.

## Participant and claim safeguards

- Raw PPG never leaves the band or enters outreach evidence claims.
- Worker participation is voluntary, multilingual, and withdrawable without employment consequences.
- No use for discipline, pay, attendance, immigration, productivity scoring, unrelated surveillance, or medical diagnosis.
- Existing heat controls, competent-person decisions, emergency authority, and stop-work rights remain primary.
- Published capabilities show potential fit only; current availability and willingness must be reconfirmed.
