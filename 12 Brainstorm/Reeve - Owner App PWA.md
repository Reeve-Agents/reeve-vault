---
aliases:
  - Owner app
  - Reeve PWA
tags:
  - brainstorm
  - reeve
  - type/page
scraped: 2026-10-18
source: reeve/apps/web/src/owner
up: "[[Brainstorm]]"
---

# Reeve - Owner App PWA

> [!summary] Summary
> - UMKM owners mostly run their business from a phone, so the owner's side of Reeve is a **simple PWA**: installed from the browser, no app store.
> - Built 18 Oct 2026 in `reeve/apps/web` next to the studio dashboard. Phones and the installed app open the owner view; desktop opens the studio. `?view=owner` forces it.
> - Every figure is read from the run's real simulation events through one shared module, `@reeve/core/simview`, which the landing page uses too.

## Tabs

| Tab | What the owner sees | Source |
|---|---|---|
| Today | Money collected against the monthly target, rooms paid, late fees, exit notices, and what Reeve did on a simulated day (‹ › to move between days) | `roomsAt`, `dayLines`, the KPI alert event |
| Approvals | The audited rulebook waiting for approval (rules, Auditor PASS, planted bugs caught, receipt), approved with a **fingerprint** (WebAuthn passkey); the Auditor's questions | `/rulebooks/:id/approve/*` (existing passkey flow) |
| Entities (named by the pack: Rooms for kos) | 30 rooms on any day: paid, part paid, exit notice, late-fee dot; tap one for where it stands | `pack.view().entities` |
| Ledger | The hash-chained track record, newest first | `/ledger` |

## What the real engine says (and the landing now matches)

| Day | Engine output |
|---|---|
| Nov 1 | 30 invoices, 20 paid the same day, 1 overpayment kept as credit |
| Nov 4 | 10 reminders |
| Nov 8 | 5 late fees of Rp75,000 |
| Nov 11 | 6 second reminders, 1 late fee after a long-stay tenant's 3-day grace |
| Nov 15 | 6 exit notices (unpaid rent **or unpaid fees**), Rp41.5 jt of Rp45 jt collected, owner alerted |
| Nov 30 | 26 of 30 rooms settled, 4 still on notice |

> [!warning] Correction
> The first landing build derived these figures by hand and showed 27/3 on Nov 15 and 29/1 on Nov 30. The engine also puts tenants who paid rent but not the late fee on notice, so the real figures are 24/6 and 26/4. The landing now reads `fixtures/kos-melati/sim-events.json` (the 185 events of run `run_mvdetcvcug1b`) instead.

## PWA

- `public/manifest.webmanifest`: standalone, portrait, `start_url` `/?view=owner`, PNG icons 192/512 (+ maskable) and SVG.
- `public/sw.js`: caches the app shell and hashed assets; `/api` always goes to the network, so approvals and money never come from a cache. Registered only in production builds.
- Verified in a production preview (`npm run build -w @reeve/web && npm run preview -w @reeve/web -- --port 4173`): service worker activated, manifest standalone. Installing on a real phone not yet tried; a passkey approval from the phone needs the owner's own fingerprint.

## Related
- Up: [[Brainstorm]]
- [[Reeve - Domain Packs]]: the Today and entity tabs are rendered from the pack, so other businesses get their own nouns. `?view=owner&sample=minimarket` shows pack 2's real CreateOS run, read-only
- [[Reeve - Screens Demo and MVP]] · [[Reeve - Landing Page]] · [[Reeve - Payment Rails Indonesia]]

## Any SOP on the phone (19 Oct 2026)

The generic pack plugs into the same four tabs:
- **Today** lists what the rules did, in the owner's own rule titles ("Pengingat SPP via Telegram (H-3): 2 times").
- **The entity tab** takes its name from the data ("Siswa"). Each record shows whether it was acted on, is waiting, or was blocked.
- **Approvals** shows actions held above the limit. In a live run each one is sent with the fingerprint or declined.

Checked at 375px on the tutoring rulebook compiled from a live Google Sheet.
