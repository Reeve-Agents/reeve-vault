---
aliases:
  - Reconciliation blueprints
tags:
  - createos/blueprint
  - type/page
source: https://createos.sh/case-studies?kind=blueprint
scraped: 2026-10-17
up: "[[Solution Blueprints]]"
---

# Blueprints - Reconciliation

> [!summary] Summary
> - 4 reconciliation solution blueprints (slug prefix `recon-`) for a "mid-size commercial bank": month-end close, exception investigation, revenue leakage, and in-kernel posting control.
> - Listed by CreateOS as blueprints (modelled, not measured), although recon-03 text describes its leakage figure as "measured rather than modelled" on the bank's own books; both statements are recorded as found.
> - Shared baseline: ~1.8M transactions a month (card, ACH, wire, real-time rails, nostro/vostro), 97% auto-match, 54,000 exceptions a month (648,000 a year), 180-person function (about 126 on exceptions) costing ~$20M a year, 22 minutes average per exception, 8-day close.
> - Shared design: six-agent crew, Firecracker micro-VM per agent, fork per exception, eBPF egress allowlist to sanctioned ledger and payment paths, matching stays deterministic, self-hosted.
> - Source: https://createos.sh/case-studies?kind=blueprint (individual URLs below)

## 8,000 Hours of Work Inside an 8,064-Hour Window
- **URL:** https://createos.sh/case-studies/recon-01-compressing-the-close
- **Persona:** Mid-size commercial bank, ~1.8M transactions per month; month-end close running 8 business days (96 days a year closing). Tags: Reconciliation, Close.
- **Problem:**
  - Matching clears 97% of transactions; the close is slow because of the exception queue: ~21,600 of 54,000 monthly exceptions land in the month-end window, 22 minutes each, against 126 analysts working eight-hour days for eight business days (8,000 analyst-hours in an 8,064-hour window).
  - Financial reporting waits eight days; liquidity held against unconfirmed positions; manual error rate in the 2% to 5% band; post-close adjustments routine; aged exceptions become write-offs and uncaptured fees.
  - Controller will not allow an autonomous system near the ledger without a hard guarantee.
- **Proposed workflow:**
  - Matching stays deterministic, rules-based and exact (probabilistic reasoning barred from asserting a match).
  - Each break traced to root cause; fork-per-exception works thousands of items concurrently; blocked items pause instead of burning compute.
  - Posting separated from investigation; bank thresholds with the orchestrator; above-threshold postings route to a named human.
  - eBPF egress allowlist (resolution agent reaches sanctioned ledger and payment paths only); self-hosted; SOC 2 Type II and ISO 27001.
- **Assumptions:** baseline figures above are the modelled client profile; "hours" close is the ceiling for cleanest cycles, two days is the commitment; no dollar figure put on freed liquidity.
- **Proof plan:**
  - Phase 0, weeks 1 to 2: baseline close time, exception volume and handling time, auto-match rate, error and post-close adjustment rate, liquidity held.
  - Phase 1, weeks 2 to 6: build and integrate general ledger, payment rails, reconciliation tooling; encode rules and thresholds.
  - Phase 2, weeks 6 to 9: shadow run (page states nine weeks of shadow mode before real posting), no posting.
  - Phase 3, weeks 9 onward: automated posting for lowest-risk within-threshold types, above threshold to human.
  - Success criteria: close time down at least 75%, exception-handling time down at least 60%, accuracy at or above current, zero unauthorized postings, 100% audit coverage.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Close time | 8 business days (96 days a year) | Down 75% committed (to 2 days, ~24 days a year); as low as hours in cleanest cycles |
| Error rate | 2% to 5% manual band | Toward 0.01% |
| Average exception handling | 22 minutes | Roughly 9 minutes |
| Post-close adjustments | Routine | Materially reduced |
| Unauthorized postings | Risk | Zero, enforced in the kernel |
| Audit coverage | Partial | 100% of matches, exceptions, postings |

## 3% of Transactions Take the Whole Reconciliation Team
- **URL:** https://createos.sh/case-studies/recon-02-exception-investigation
- **Persona:** Mid-size commercial bank, 97% auto-match, 54,000 exceptions per month, 180-person reconciliation function. Tags: Reconciliation, Exceptions.
- **Problem:**
  - Bank is staffed for the 3%: of a 180-person team costing ~$20M a year, ~126 do only exceptions: 242,000 analyst-hours and $21.60 labour per break.
  - 22 minutes average, hours for hard ones; queueing stretches the close; breaks never investigated age into write-offs, uncaptured fees, duplicates.
  - Vendors led with auto-match rate; real blocker was control over what an autonomous system could touch.
- **Proposed workflow:**
  - Six specialised agents, each in its own Firecracker micro-VM, coordinating over a private overlay network; matching, investigating and posting are separate jobs (financial control).
  - Investigation never starts cold: history assembled, root-cause hypothesis formed; reconciled position and close reports assemble themselves.
  - Postings only via sanctioned ledger and payment paths within bank thresholds; above threshold to a named human; everything logged with rationale.
  - One investigation environment forks per break; self-hosted.
- **Assumptions:** 648,000 exceptions a year; bridge from 60% time saving to committed $6.0M to $8.0M (30% to 40% of the base) because matching, close and reporting overhead remain, hard breaks still go to humans, some capacity is redeployed; leakage measured against the client's own ledger and reported separately (category rule of thumb of 1% to 2% of net revenue has no named study behind it).
- **Proof plan:**
  - Four phases against a measured baseline, roughly nine weeks to controlled go-live (Phase 0 baseline, weeks 2 to 6 build, weeks 6 to 9 shadow, week 9 onward go-live).
  - Success criteria: exception-handling time down at least 60%, close time down at least 75%, accuracy at or above current, leakage surfaced and quantified, zero unauthorized postings, 100% audit coverage.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Exception investigation time | 22 minutes average | Down 60% (roughly 9 minutes) |
| Cost per exception | $21.60 | Roughly $9 to $12 |
| Annual operational cost | $20.0M | $12.0M to $14.0M ($6.0M to $8.0M saved, 30% to 40% of base) |
| Gross time freed (60% of $14M exception labour) | N/A | $8.4M |
| Audit coverage | Partial | 100% of matches, exceptions, postings |

## Finding the Money in Items Nobody Ever Opened
- **URL:** https://createos.sh/case-studies/recon-03-revenue-leakage
- **Persona:** Mid-size commercial bank, ~1.8M transactions a month, ~$1.2B net revenue. Tags: Reconciliation, Revenue Leakage.
- **Problem:**
  - 126 analysts on exception duty against 648,000 investigations a year; roughly 26,000 items (about 4% of volume) age out unexamined, sitting in suspense, batch-closed with generic codes, or written off under materiality thresholds.
  - Inside them: duplicate payments never clawed back, uncaptured or underbilled fees, expired interchange and chargeback recoveries.
  - The category rule of thumb (1% to 2% of net revenue, no named study) would imply $12M to $24M; the page declines to use it.
- **Proposed workflow:**
  - Every aged item opened, not sampled; fork-per-exception removes the queue, so no item ages out.
  - Break traced across systems to root cause; deterministic match kept exact; recoveries post through sanctioned paths only inside bank thresholds (eBPF egress allowlist), above-threshold to a named human; every finding logged.
  - Commercial structure: value share on funds actually recovered plus a platform fee for operational work.
- **Assumptions:** page states figures as "measured rather than modelled" on the bank's own books in shadow mode; leakage kept separate from the $6.0M to $8.0M operational cost reduction (cost reduction is a commitment, leakage recovery a validated outcome).
- **Proof plan:**
  - Phase 0, weeks 1 to 2: baseline exception volume, aged-item volume, disposition of unworked items, suspense balances, write-offs.
  - Phase 1, weeks 2 to 6: build and integrate.
  - Phase 2, weeks 6 to 9: shadow run and leakage discovery on every exception including aged-out ones; categorised into recoverable and time-barred.
  - Phase 3, weeks 9 onward: controlled go-live and recovery within windows.
  - Success criteria: every exception worked, zero items aged out unexamined, leakage identified and categorised against the bank's own ledger, recoverable portion pursued, zero unauthorized postings, 100% audit coverage.
- **Modelled metrics:**

| Metric (as stated on page) | Figure |
|---|---|
| Leakage identified on the bank's own books | $4.8M annually (0.4% of net revenue) |
| Aged items with genuine financial impact | 22%, some 5,700 of roughly 26,000, average value at risk around $840 |
| Aged items that were timing differences or noise | 78% |
| Recovered within claw-back windows, year one | $3.1M (roughly 65% of identified leakage) |
| Prevented from forming again | ~$1.7M a year (remaining 35%, time-barred) |
| Category rule of thumb not claimed | $12M to $24M (1% to 2% of $1.2B) |
| Separate operational cost reduction from same crew | $6.0M to $8.0M a year |

## The Agent Proposes a Posting and Cannot Make One
- **URL:** https://createos.sh/case-studies/recon-04-inkernel-posting-control
- **Persona:** Mid-size commercial bank, ~1.8M transactions per month. Tags: Reconciliation, Kernel Controls.
- **Problem:**
  - The blocker is permission, not accuracy: no vendor could say what an autonomous agent could and could not touch if wrong, manipulated or compromised; vendors answered with statements of intent (system prompt, guardrails, monitoring).
  - An agent with ledger write access and payment-rail initiation misstates the books if wrong and moves money if compromised; reconciliation ingests untrusted counterparty files continuously (prompt-injection risk).
  - Projects died and the function stayed manual with 126 analysts on exception duty.
- **Proposed workflow (six-agent crew with separated roles):**
  - Matching agent: rules-based and exact, barred from reasoning-based matches.
  - Investigation agent: investigates; does not post.
  - Resolution agent: egress allowlisted in the kernel (eBPF) to the sanctioned ledger endpoint and payment paths only.
  - Orchestrator: holds control thresholds; above-threshold postings route to a named human who signs.
  - Audit trail: every match, exception, investigation and posting logged with rationale.
  - Per-VM kernel isolation, kill path is VM suspension at the hypervisor, templated environment for reproducibility, full self-hosting.
- **Assumptions:** three threat-model scenarios walked for internal audit: agent simply wrong (bounded by the controller's threshold), counterparty file with injected instruction (fails at the kernel because the attacker's account is not on the allowlist), fully compromised agent trying to exfiltrate (no network path, VM destroyed); platform claims as stated by CreateOS.
- **Proof plan:**
  - Phase 0, weeks 1 to 2: baseline plus control mapping; egress allowlist agreed jointly with information security.
  - Phase 1, weeks 2 to 6: build and integrate, self-host.
  - Phase 2, weeks 6 to 9: shadow run; internal audit inspects the decision log against the human team's work.
  - Phase 3, weeks 9 onward: controlled go-live on internal audit's timeline.
  - Success criteria: zero unauthorized postings, 100% audit coverage, segregation of duties preserved, accuracy at or above current, infosec review closed on the architecture.
- **Modelled metrics:**

| Metric (modelled) | Figure |
|---|---|
| Unauthorized postings | Zero, structurally impossible |
| Audit coverage | 100% of matches, exceptions, postings, logged with rationale and replayable |
| Segregation of duties | Preserved; no agent both decides and executes above threshold |
| Certification | SOC 2 Type II and ISO 27001 |
| Dependent benefits cited | $6.0M to $8.0M operational cost, close from eight days to two, $4.8M leakage surfaced |

## Related
- Up: [[Solution Blueprints]]
- [[Case Studies]]
- [[Blueprints - Fraud]]: same kernel-level money-movement controls
- [[Blueprints - Regulatory Reporting]]
- [[Industry - Financial Services]]
- [[Industries]]
- [[Service - AI Agents]]
- [[Product - Sandbox]]
- [[Egress Governance]]
- [[Self-Host]]
