---
aliases:
  - AML blueprints
tags:
  - createos/blueprint
  - type/page
source: https://createos.sh/case-studies?kind=blueprint
scraped: 2026-10-17
up: "[[Solution Blueprints]]"
---

# Blueprints - AML

> [!summary] Summary
> - 4 anti-money-laundering solution blueprints (slug prefix `aml-`), all for a "mid-size commercial bank" composite: alert triage, case management and SAR drafting, network analysis, and defensibility.
> - All figures are **modelled**, not measured: CreateOS describes these as workflows it has designed but not yet delivered, with assumptions and a proof plan on each page.
> - Shared baseline in the series: 500,000 alerts a year, 95%+ false positives (stated assumption), roughly 25,000 escalated investigations. Filing decision stays with a human.
> - Source: https://createos.sh/case-studies?kind=blueprint (individual URLs below)

## AML Transaction Monitoring When 95% Is Noise
- **URL:** https://createos.sh/case-studies/aml-01-draining-the-alert-queue
- **Persona:** Mid-size commercial bank (Financial Services AI, Banking). Tags: AML, Transaction Monitoring, Multi-Agent, Self-Hosted.
- **Problem:**
  - Rules and thresholds generate roughly 500,000 alerts a year, over 95% false positives; every one lands in a queue for an analyst.
  - $25 million a year, roughly $50 fully loaded cost per alert; 20 minutes for routine triage, two hours for a SAR case, 20+ hours for complex ones.
  - Labour is around 57% of financial crime compliance spend; noise buries real signal.
  - Examiner asks about the clears, not just the catches; earlier pilots died in procurement (infosec on third-party processing, second line on black-box scores).
- **Proposed workflow:**
  - Every alert triaged; noise clears with a documented rationale; genuine risk is enriched, classified and escalated as a near-complete case.
  - Evidence assembled in parallel before a person opens the case (KYC profile, transaction history, counterparties, adverse media).
  - Classification against known typologies and the bank's own scenario library; many narrow agents (separation of duties), not one model.
  - Runs inside the bank's boundary: each investigation in a Firecracker micro-VM with its own guest kernel, eBPF egress allowlist, self-hosted control plane; one environment forks per alert; paused cases burn no compute.
  - Filing decision stays with a human.
- **Assumptions:**
  - Industry-norm 95%+ false-positive rate; $50 fully loaded cost per alert; committed floor 40% to 50% cost reduction, a sustained 60% treated as upside.
  - Platform claims stated as of July 2026 (SOC 2 Type II and ISO 27001, per-VM kernel isolation, eBPF egress, self-hosted control plane); built for the OCC's April 2026 model-risk expectations.
- **Proof plan:**
  - Phase 0, weeks 1 to 2: baseline (cost per alert, false positive rate, investigation time, catch rate) from the bank's own numbers.
  - Build and integration, weeks 2 to 6: monitoring system, KYC store, transaction data, enrichment providers on allowlisted paths.
  - Shadow mode, weeks 6 to 10: proving no false negatives is "the entire game".
  - Controlled go-live from week 10: auto-clear on lowest-risk, highest-noise alert types first, with audit logging and human spot-checks.
  - Success criteria: false positive reduction at least 50%, no degradation in catch rate, cost per alert down at least 40%, 100% audit coverage including auto-clears.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Annual alert investigation cost | $25.0M | $12.5M to $15.0M ($10M to $12.5M removed a year) |
| False positives removed before a human sees them | 95%+ of alerts are false positives | 50% to 65% |
| Fully loaded cost per alert | $50 | $25 to $30 |
| Alerts reaching a human | 500,000 | 191,000 to 263,000 |
| Analyst hours returned | Baseline | 79,000 to 103,000 |
| Escalated investigation time (~2 hours) | ~2 hours | Down 50% to 60% |
| Time to detection, genuine activity | Baseline | Down 35% to 50% |
| Decisions replayable | Partial | 100% including auto-clears |
| Fines context (not a promise) | Fines $3.8 billion in 2025 | No dollar figure put on avoided fines |

## AML Case Management Without the Two-Hour Assembly
- **URL:** https://createos.sh/case-studies/aml-02-from-alert-to-filed-sar
- **Persona:** Mid-size commercial bank. Tags: AML, SAR, Investigation, Self-Hosted.
- **Problem:**
  - Roughly 25,000 alerts a year escalate; each takes about two hours of assembly (KYC, transactions, counterparties, adverse media, timeline); past 20 hours for complex cases.
  - $435 per escalated investigation, about $10.9M a year; experienced investigators spend the week on data entry.
  - Time to detection suffers; SAR narrative quality is uneven (FinCEN SAR FAQs of 9 October 2025 cited on completeness).
  - The bank wants everything before the decision removed, not the investigator.
- **Proposed workflow:**
  - Same agent crew as AML triage: evidence assembled in parallel, typology classification, narrative drafted from gathered evidence.
  - SAR narrative drafting from hours to minutes; every draft built on the same evidentiary structure.
  - Self-hosted, per-investigation guest kernel, kernel-level egress allowlist; filing decision stays human.
- **Assumptions:** 25,000 escalated investigations; ~$435 per investigation; time-to-detection target measured against the bank's Phase 0 baseline, not an industry benchmark.
- **Proof plan:**
  - Phase 0 measures investigation time per case, cost per case, SAR volume, time to detection and the bank's narrative quality bar.
  - Shadow mode: agents assemble cases in parallel with humans, draft narratives never filed; dispositions compared case by case.
  - Go-live gated on disposition agreement and narrative quality, not speed.
  - Success criteria: investigation time down at least 50%, no change in disposition accuracy, drafts meet the existing quality bar without rework, 100% audit coverage.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Annual investigation cost | $10.9M | $4.4M to $5.4M ($5.4M to $6.5M saved per year) |
| Standard investigation time | ~2 hours | 48 to 60 minutes |
| Complex investigation | 20+ hours | 8 to 10 hours |
| Cost per escalated investigation | ~$435 | $174 to $218 |
| Analyst hours on investigation | 72,500 | 36,000 to 44,000 hours returned |
| Time to detection | Baseline | Down 35% to 50% |
| SAR narrative drafting | Hours | Minutes |
| Audit coverage | Partial | 100% of decisions replayable |

## The Network Behind a Single AML Alert
- **URL:** https://createos.sh/case-studies/aml-03-seeing-the-whole-network
- **Persona:** Mid-size commercial bank. Tags: AML, Network Analysis, Link Analysis, Self-Hosted.
- **Problem:**
  - An alert is one account at one moment, while mule networks, layering chains and structuring rings are defined by relationships a single-alert queue cannot represent.
  - Wider counterparty chasing is punitively expensive, so depth is set by queue length rather than risk; detection of a network can take months.
  - Page frames this as an effectiveness argument, not a savings argument; no credible industry benchmark for link-analysis uplift is claimed.
- **Proposed workflow:**
  - The unit of investigation becomes the network; link analysis across accounts, counterparties and entities resolves related alerts into one case.
  - One configured investigation environment forks per counterparty hypothesis, so all branches are chased in parallel.
  - Resolved network classified against typologies; the investigator receives members, money flows, typology and reasoning; contained per-VM egress allowlist; human decides to file.
- **Assumptions (illustrative model, separated on the page):** 15% of 25,000 escalated cases belong to networks; networks average three linked alerts; 95% false-positive rate assumed; $150 per hour fully loaded; two hours per investigation. Client replaces with actuals in Phase 0.
- **Proof plan:**
  - Phase 0 baseline plus a retrospective sample: run the network agent over a closed historical period and compare to what humans found.
  - Shadow mode in parallel with the live team; investigators judge whether each agent-surfaced network is real.
  - Success criteria: time to detection down at least 35%, no degradation in catch rate, networks surfaced in the retrospective sample that manual work missed, 100% audit coverage including dismissed relationships.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Time to detection, genuine activity | Baseline | Down 35% to 50% (target) |
| Unit of investigation | The alert | The network |
| Redundant investigations removed | N/A | ~2,500 per year (illustrative) |
| Illustrative saving | N/A | ~5,000 analyst hours, roughly $0.75 million; 3,750 alerts become ~1,250 networks |
| Audit coverage | Partial | 100% replayable, including dismissed relationships |

## The Second Line Asked Why It Cleared That Alert
- **URL:** https://createos.sh/case-studies/aml-04-defensible-by-design
- **Persona:** Mid-size commercial bank. Tags: AML, Model Risk, Audit, Self-Hosted.
- **Problem:**
  - Two earlier automation attempts failed in procurement on three questions: why did it clear that alert, where is our transaction data, whose model is this.
  - Vendor offered a score not a reason; data on vendor infrastructure under contract only; OCC Bulletin 2026-13 (17 April 2026) replaced detailed model-risk expectations with principles and left generative and agentic AI out of scope.
  - Context numbers: fines $3.8 billion in 2025 (down from $4.6 billion in 2024); $206.1 billion financial crime compliance cost (LexisNexis Risk Solutions and Forrester Consulting, 2023).
- **Proposed workflow:**
  - Every decision reasoned, including clears (evidence gathered, typology tested, relationships dismissed, written rationale).
  - Bank owns the model: control plane and storage fully self-hosted in the bank's region.
  - Egress allowlisted in the kernel (cannot leave, not promised not to); blast radius one disposable micro-VM, destroyed when the case closes.
  - Human keeps the filing decision. Page states model risk management tooling aligned to the OCC 2026 framework is in progress.
- **Assumptions:** the bank is an illustrative composite; the argument that the bank rather than the vendor must own the framework is CreateOS's, not a requirement of the bulletin; platform claims as of July 2026.
- **Proof plan:**
  - Examiner simulation: bank model-risk and compliance functions pull random shadow-mode alerts (including auto-clears) and demand the full rationale chain.
  - Security review: architecture handed to infosec, egress allowlisting tested by trying to violate it.
  - Model documentation produced for the bank's model risk function.
  - Success criteria: 100% of decisions replayable to the second line's satisfaction, egress controls verified by the bank's own testing, documentation accepted before any production auto-clear.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Decisions with replayable rationale | Partial | 100%, including every auto-clear |
| Model risk ownership | Vendor's black box | Bank's, documented and self-hosted |
| Outbound data paths | Trust-based, contractual | Allowlisted in the kernel |
| Blast radius of a compromised agent | Platform-wide | One disposable micro-VM |
| Basis for auto-clear | Score | Written rationale |
| Certification posture | N/A | SOC 2 Type II, ISO 27001 |
| Context: auto-cleared volume | N/A | 285,000 alerts a year referenced |

## Related
- Up: [[Solution Blueprints]]
- [[Case Studies]]: hub for customer stories and blueprints
- [[Blueprints - KYC]]: sibling banking blueprints sharing the same self-hosted runtime
- [[Blueprints - Fraud]]
- [[Industry - Financial Services]]
- [[Industries]]
- [[Service - AI Agents]]
- [[Product - Sandbox]]: Firecracker micro-VM runtime referenced in these blueprints
- [[Egress Governance]]: kernel-level egress allowlisting
- [[Self-Host]]
