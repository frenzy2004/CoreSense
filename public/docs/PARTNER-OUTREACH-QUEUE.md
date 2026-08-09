# CoreSense Partner Outreach Approval Queue

> **External action is blocked.** This workflow prepares drafts only. It cannot send email, submit a form, message a contact, publish a case study, or approve its own work.

**Research snapshot:** 2026-07-29  
**Draft count:** 10  
**Approved current drafts:** 0  
**Sending capability:** not implemented

## Queue

| Priority | Partner | Role | State | Draft hash | Official route |
|---:|---|---|---|---|---|
| 1 | Sunway iLabs and Sunway Construction | Construction site host and corporate innovation route | WAITING_FOR_USER_APPROVAL | `d963360f3f91` | [Official route](https://www.sunwayconstruction.com.my/contact-us) |
| 2 | CREAM / CIDB Malaysia | Independent construction research and industry-convening partner | WAITING_FOR_USER_APPROVAL | `9117914ac44e` | [Official route](https://www.cream.my/home) |
| 3 | IOI Plantation and Universiti Putra Malaysia | Plantation site host with independent academic oversight | WAITING_FOR_USER_APPROVAL | `d10505fccba8` | [Official route](https://www.ioigroup.com/contact-us/) |
| 4 | NIOSH Malaysia | Independent method, comparator, training, and research partner | WAITING_FOR_USER_APPROVAL | `fbc8be465dfe` | [Official route](https://www.niosh.com.my/contact-us/headquarters) |
| 5 | Gamuda Engineering | Alternative construction site host | WAITING_FOR_USER_APPROVAL | `d1a18209593d` | [Official route](https://gamuda.com/contact-us/) |
| 6 | IJM Construction | Second-wave construction site host | WAITING_FOR_USER_APPROVAL | `507fbd3ae506` | [Official route](https://www.ijm.com/contact-us) |
| 7 | SD Guthrie | Alternative plantation host and later scale test | WAITING_FOR_USER_APPROVAL | `ed5e13023be4` | [Official route](https://www.sdguthrie.com/contact-us) |
| 8 | Master Builders Association Malaysia | Contractor recruitment and industry dissemination | WAITING_FOR_USER_APPROVAL | `2ad448912b79` | [Official route](https://mbam.org.my/contact-us-2/) |
| 9 | Malaysian Palm Oil Association | Estate recruitment and sector-diversity route | WAITING_FOR_USER_APPROVAL | `03f09d5df559` | [Official route](https://www.mpoa.org.my/secretariat.php) |
| 10 | MTUC or the relevant worker-representation channel | Independent worker-side materials and fairness review | WAITING_FOR_USER_APPROVAL | `ea1cea7f37a3` | [Official route](https://mtuc.org.my/) |

## Approval contract

Approval must identify one partner and the full SHA-256 of the reviewed draft. A changed draft automatically makes the previous approval stale. Approval locks the text for the next manual step; it does **not** authorize sending, form submission, publication, data collection, site access, expenditure, or use of a partner's name or logo.

Exact approval phrases for the current drafts:

- `APPROVE PARTNER DRAFT sunway-ilabs-suncon d963360f3f9173e9c29d56d7da76daf66299be164934584fc4bba2e481fcff06`
- `APPROVE PARTNER DRAFT cream-cidb 9117914ac44ef34bcdec90b202932cc586fb058654cfa7c0770a4e446148c933`
- `APPROVE PARTNER DRAFT ioi-upm d10505fccba85662c23e5bd0f94e584f005dccd30821f03fd8844f671f5c511b`
- `APPROVE PARTNER DRAFT niosh-malaysia fbc8be465dfe5a9d68daef988768f7639b5e1a45c5a8a75f63a2115177d1b45c`
- `APPROVE PARTNER DRAFT gamuda-engineering d1a18209593d2d13787aaf6faa0b5ffd7003c874cb2aa109bf4a88c9b23e342e`
- `APPROVE PARTNER DRAFT ijm-construction 507fbd3ae5066d969ac161cae6376199638ab5c7086692166aca7b530e4f0fc3`
- `APPROVE PARTNER DRAFT sd-guthrie ed5e13023be45f113f26f5a285798cfdaa2dc3f8ac0eafac35ed76aca599eb51`
- `APPROVE PARTNER DRAFT mbam 2ad448912b79f8a231bc141658360ef2af052c0930cdf96fc89b21753f4a9b1c`
- `APPROVE PARTNER DRAFT mpoa 03f09d5df55987a5426a11448333279ddf7203f9c7d111ac2d740e5685744116`
- `APPROVE PARTNER DRAFT mtuc-worker-review ea1cea7f37a3fbef79e3e6d3ae740192a223c32c971f067a6538bef4dcb1de8d`

## Mandatory review before approval

1. Read the complete partner draft in `docs/outreach-drafts/`.
2. Confirm the target organization and recipient route.
3. Confirm the factual claims against the linked official sources.
4. Confirm that the proposed study boundary, benefits, and safeguards match the intended partner.
5. Approve one exact draft, request changes, or reject it.

## System boundaries

- No raw PPG upload or physiological-stream export.
- No discipline, pay, attendance, immigration, productivity scoring, unrelated surveillance, or medical diagnosis use.
- No claim of DOSH/JKKP approval, MSPO certification, ESG assurance, or partner endorsement.
- No worker recruitment before the applicable ethics, site, legal, consent, and worker-representation routes are documented.
- No external action without a new, explicit user instruction after draft approval.
