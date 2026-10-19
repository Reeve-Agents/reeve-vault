---
aliases:
  - Fraud blueprints
tags:
  - createos/blueprint
  - type/page
source: https://createos.sh/case-studies?kind=blueprint
scraped: 2026-10-17
up: "[[Solution Blueprints]]"
---

# Blueprints - Fraud

> [!summary] Summary
> - 4 fraud solution blueprints (slug prefix `fraud-`): false declines, Regulation E dispute handling, first-party fraud denials, and kernel-level limits on money movement.
> - All figures are **modelled**, not measured, on a representative mid-size card issuer or bank; each page has a "Modelled on a representative mid-size ..." assumptions table and a "We commit to / We validate on your data" proof table.
> - Shared design: agents run in per-job Firecracker micro-VMs, egress allowlisted in the kernel (eBPF) to sanctioned payment-system paths, VM suspension as kill switch, self-hosted in the bank's region.
> - Source: https://createos.sh/case-studies?kind=blueprint (individual URLs below)

## $213 Billion Lost to Declines That Were Never Fraud
- **URL:** https://createos.sh/case-studies/fraud-01-false-declines
- **Persona:** Mid-size card issuer. Tags: Fraud, False Declines.
- **Problem:**
  - Tuning fraud rules too loose lets fraud through, too tight declines good customers; false declines cost the payments industry $213B in 2025, on track for $297B by 2029 (Datos Insights, The Smart Approval Advantage, 2026).
  - 78% of financial institutions say failed payments critically hurt customer experience; a third lost between 2% and 5% of customers (Datos Insights, 2026); each false decline seeds a complaint or dispute at roughly $10.
  - US ecommerce and retail merchants incur $4.61 per $1 of fraud, up from $3.16 in 2022 (LexisNexis Risk Solutions, True Cost of Fraud Study, 2025); 90% of financial institutions already use AI in fraud prevention (Feedzai survey of 562 practitioners, 2025).
- **Proposed workflow:**
  - Real-time fraud-scoring agent crew inside the bank's environment, running as a persistent warm service to score inside the authorization window.
  - Behavioural, device and counterparty signals on every transaction; every score carries a defensible reason.
  - Each agent has its own guest kernel; action agent egress allowlisted to sanctioned payment-system paths; VM suspension is the kill switch.
- **Assumptions (representative mid-size card issuer):** 500 million annual card transactions; $50 average ticket; $25.0B annual purchase volume; 10% decline rate (50M declined); 15% of declines driven by fraud rules (7.5M); 60% of those legitimate (4.5M false declines, 0.9% of all transactions); blended 1.5% interchange take rate; ~$10 per downstream case.
- **Proof plan:**
  - First deliverable is the bank's measured baseline (false-decline rate, catch rate, cost per case), which becomes the contract yardstick.
  - Shadow mode proves no catch-rate degradation before any live decision.
  - Committed: 40% false-decline reduction, no catch-rate degradation, 100% audit coverage, zero unauthorized money movement. Validated on client data: fraud-loss reduction, retention value, interchange take rate and dispute volume, peak-concurrency scoring latency.
- **Modelled metrics:**

| Metric (modelled) | Figure |
|---|---|
| False declines today | 4.5 million a year; $225M legitimate volume wrongly declined; ~$3.4M interchange forgone |
| False declines eliminated at committed 40% | 1.8 million per year |
| Legitimate purchase volume restored | $90M per year |
| Direct interchange recovered | ~$1.35M per year |
| Downstream case-handling avoided | ~$0.9M per year |
| Headline | ~$2.25M per year directly attributable P&L against $90M restored spend |
| Catch rate | Held flat, proven in shadow mode |
| Audit coverage of scoring decisions | 100% |

## Closing a Regulation E Dispute Inside Ten Business Days
- **URL:** https://createos.sh/case-studies/fraud-02-disputes-ten-day-clock
- **Persona:** Mid-size commercial bank. Tags: Fraud, Disputes.
- **Problem:**
  - Regulation E gives ten business days to investigate a fraud claim (12 CFR 1005.11(c)(1)); investigation can run to 45 days only if provisional credit is issued inside the ten; missing the deadline forces credit whatever the evidence shows.
  - $9.08 to $10.32 per disputed transaction; US chargeback volume projected at 146 million cases worth $15.3B in 2026; global chargeback value $33.79B in 2025 toward $41.69B by 2028; dispute rates up 78% year over year in one recent quarter.
  - Day is spent assembling evidence, not deciding; disputes lagged other fraud work because they touch live payment data and can move money.
- **Proposed workflow:**
  - Dispute investigation crew in the bank's environment; each dispute opens its own isolated case environment with the deadline tracked from intake.
  - Evidence (transaction history, device signals, counterparty patterns, prior behaviour) gathered in parallel; bank's loss policy applied consistently; accept-or-deny rationale prepared inside the deadline.
  - Clear cases resolve in minutes; exceptions reach a person with the case assembled; egress allowlisted to payment-system paths.
- **Assumptions (representative mid-size bank):** 1,500,000 fraud and dispute cases a year; $10 fully loaded handling cost per case (research range $9.08 to $10.32); ~200 FTE dispute operation; ~$105 average dispute value (146M US cases at $15.3B). Range is CreateOS's own, built from the bank's cost per case rather than a third-party benchmark.
- **Proof plan:**
  - Baseline: actual cost per case, volume, current Regulation E performance.
  - Committed: 25% to 40% case-handling cost reduction, 100% Reg E resolution inside the clock, 100% audit coverage, zero unauthorized money movement.
  - Validated on client data: Reg E miss rate and provisional-credit absorption, wrongful-denial and overturn rates, true fully loaded cost, clear-cut versus contested case mix.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Cost per case | $10 | $6.00 to $7.50 |
| Annual case-handling cost | $15.0M | $9.0M to $11.25M |
| Annual saving | N/A | $3.75M to $6.0M |
| Capacity returned | N/A | 50 to 80 FTE-equivalents (redeployed, not removed) |
| Time to action on reported fraud | Hours to days | Near-real-time; minutes on clear cases |
| Regulation E resolution | Variable | 100% within the ten-day clock |
| Unauthorized money movement | Risk | Zero, enforced in-kernel |
| Audit coverage | Partial | 100% |

## The Bank Cannot Simply Disbelieve the Customer
- **URL:** https://createos.sh/case-studies/fraud-03-defensible-denials
- **Persona:** Mid-size commercial bank. Tags: Fraud, First-Party Fraud.
- **Problem:**
  - When a customer disputes a charge they made, the bank must prove it from transaction history, device signals, location, behaviour and claim history inside ten business days.
  - First-party fraud was the leading fraud type globally in 2024 at 36% of reported fraud, up from 15% the year before (LexisNexis Risk Solutions, Cybercrime Report, 2025, 104 billion transactions).
  - Under-deny: the bank funds losses it never owed. Over-deny: complaints, overturns, regulatory record. Run past the clock: provisional credit issues automatically.
- **Proposed workflow:**
  - Investigation and decision crew inside the bank's environment; evidence pack assembled in parallel (transaction history, device and counterparty signals, geolocation, merchant relationship, prior claims) before a human opens the case.
  - Bank sets the loss policy; agent applies it consistently; low-confidence first-party-fraud findings route to a human by policy.
  - Every denial replayable years later; egress allowlisted to payment-system paths; data stays in the bank's region.
- **Assumptions (representative mid-size bank):** 1,500,000 cases a year; ~$105 average disputed value; $157.5M total disputed value; first-party share of disputes 23% (assumption, measured in Phase 0); ~345,000 cases where the customer made the transaction (~$36.2M); 35% denials evidenced today; 10% of cases miss the ten-day clock. Page states if the evidenced-denial rate is already 55%, recovery is smaller.
- **Proof plan:**
  - Baseline: first-party claims funded today, undefendable denials, how often the clock wins.
  - Shadow mode: agents run against live cases without binding authority, compared decision by decision; confirms additional denials are the evidenced ones, not a lower bar.
  - Committed: 100% denials with replayable evidence, 100% Reg E resolution in the clock, 100% audit coverage, no increase in wrongful denials, zero unauthorized money movement.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| First-party fraud evidenced and correctly denied | 35% | 60% (modelled) |
| First-party fraud losses recovered | N/A | ~$9.1M per year (modelled) |
| First-party fraud absorbed for want of evidence | ~$23.5M | N/A |
| Provisional credit forced by missed deadlines | ~$15.75M | Approaching zero |
| Reg E resolution inside the clock | ~90% (assumed) | 100% |
| Evidence pack assembled | Days of investigator time | Minutes |
| Denials carrying replayable evidence | Partial | 100% |

## What Stops a Fraud Agent From Moving Money
- **URL:** https://createos.sh/case-studies/fraud-04-kernel-money-movement
- **Persona:** Mid-size commercial bank. Tags: Fraud, Kernel Controls.
- **Problem:**
  - 90% of financial institutions already use AI in fraud detection; projects die on how agent authority is bounded.
  - A useful fraud agent must act (block, freeze a card, issue provisional credit, raise a chargeback), and those actions are irreversible and taken at volume against live money.
  - Prompt guardrails and application-layer policy put the control inside the thing that might malfunction; inputs are adversarial; vendors own the model and rent the runtime.
- **Proposed workflow:**
  - Egress allowlisted in the kernel (eBPF): sanctioned payment paths are the only paths that exist.
  - Each scoring job and investigation in its own Firecracker micro-VM; kill switch is VM suspension.
  - Scoring stays warm for the authorization window; investigations fork per case; agents coordinate over a private overlay network with private DNS.
  - Money-movement actions confirmation-gated; the bank chooses which require a human; control plane self-hosted in the bank's region.
- **Assumptions:** representative mid-size bank with 1,500,000 fraud and dispute cases a year at ~$105 average disputed value, giving ~$157.5M annual money-movement authority; scoring latency to be measured against the bank's own peak concurrency in baselining.
- **Proof plan:**
  - Shadow mode against the current program, scoring and investigating real cases without binding authority.
  - Go-live enables action on the clearest, lowest-risk case types first, expanding as the audit record builds.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Annual money-movement authority bounded | N/A | $157.5M |
| Unauthorized money movement | Bounded by policy and model behaviour | Zero, enforced in-kernel |
| Blast radius of a compromised agent | Shared host, lateral movement possible | Single disposable micro-VM |
| Time to halt a misbehaving agent | Minutes to hours | Immediate, VM suspension |
| Payment data egress | Vendor-dependent | Kernel-allowlisted paths only |
| Data residency | Vendor region | Bank's region, self-hosted |
| Audit coverage of scores and actions | Partial | 100%, replayable |

## Related
- Up: [[Solution Blueprints]]
- [[Case Studies]]
- [[Blueprints - AML]]: sibling financial-crime blueprints
- [[Blueprints - Reconciliation]]: kernel-level posting control, same pattern
- [[Industry - Financial Services]]
- [[Industries]]
- [[Service - AI Agents]]
- [[Integration - Stripe]]
- [[Product - Sandbox]]
- [[Egress Governance]]
- [[Security]]
