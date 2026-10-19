---
aliases:
  - KYC blueprints
tags:
  - createos/blueprint
  - type/page
source: https://createos.sh/case-studies?kind=blueprint
scraped: 2026-10-17
up: "[[Solution Blueprints]]"
---

# Blueprints - KYC

> [!summary] Summary
> - 4 know-your-customer solution blueprints (slug prefix `kyc-`) for banks: retail account opening, sanctions/PEP screening noise, corporate onboarding with beneficial owners (UBO), and audit trail plus perpetual KYC.
> - All figures are **modelled**, not measured: workflows CreateOS has designed but not yet delivered, with assumptions and a proof plan on each page.
> - Shared design: clean files clear straight through with a recorded rationale, low-confidence cases route to a named human, self-hosted in the bank's boundary, per-case guest kernel, kernel egress allowlist; SOC 2 Type II and ISO 27001.
> - Source: https://createos.sh/case-studies?kind=blueprint (individual URLs below)

## KYC Automation That Clears the Clean Files First
- **URL:** https://createos.sh/case-studies/kyc-01-retail-account-opening
- **Persona:** Mid-size retail bank. Tags: KYC, Onboarding, Self-Hosted.
- **Problem:**
  - Roughly 300,000 new retail accounts a year all enter one queue; clean files wait behind complex ones.
  - $40 per retail case and days of cycle time, mostly keying data from identity documents, proofs of address and income records.
  - Screening, verification and risk-rating run by hand; applicants abandon while waiting.
  - Earlier proposals died in security review (untrusted files from the open internet into the bank's most sensitive data).
- **Proposed workflow:**
  - Clean files clear straight through with recorded rationale; low-confidence goes to a named human.
  - Documents read and authenticated rather than keyed; untrusted-file handling in the tightest boundary.
  - Screening noise (sanctions, PEP, adverse media) absorbed before it reaches a person.
  - Beneficial owners resolved and screened in parallel (environment forks per person).
  - Every decision replayable, including clears; data stays in the bank's region and boundary.
- **Assumptions:** 300,000 accounts a year; $12.0M retail line ($40 per case); committed floor 40% reduction, 48% top of "our own modelled range, not a published benchmark"; recovered-revenue model (5% of abandoned applications) depends on the bank's own abandonment rate and customer value.
- **Proof plan:**
  - Weeks 1 to 2: baseline cost per case, cycle time, straight-through rate, false-positive rate.
  - Weeks 2 to 6: build and integrate along allowlisted paths, self-hosted.
  - Weeks 6 to 8: shadow run alongside the human team, no binding decisions.
  - Week 8 onward: controlled go-live, low-risk retail first, humans on every exception.
  - Success criteria: cost per case down at least 40%, straight-through 35% or better, extraction accuracy 95% or better, 100% audit coverage.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Annual cost reduction (retail book) | $12.0M line | $7.2M to $8.6M |
| Onboarding cycle time | Days | Under 5 minutes |
| Cost per retail case | $40 | $10 to $12 |
| Straight-through processing | None | 35% to 55% |
| Document extraction accuracy | Variable, manual | 95% to 99% |
| Manual processing time | Baseline | Down 78% |
| Screening false positives | ~42% of alerts | Volume halved |
| Fraud detection | Baseline | Up 45% to 61% |
| Audit coverage | Partial | 100% replayable |

## Sanctions Screening Alerts That Are Never Matches
- **URL:** https://createos.sh/case-studies/kyc-02-screening-false-positives
- **Persona:** Large bank. Tags: KYC, Sanctions, PEP, Self-Hosted.
- **Problem:**
  - Roughly 600,000 screening alerts a year, around 42% false positives, each opened, checked, documented and closed (about twenty minutes).
  - Teams at the largest institutions run into the thousands; average annual AML/KYC operations spend $72.9M per firm and about two-thirds of periodic KYC review work still manual (Fenergo, 2025 Financial Crime Industry Trends, 600 senior decision-makers).
  - Noise erodes attention; queues grow faster than headcount; rules-based tuning trades recall for precision.
- **Proposed workflow:**
  - Sanctions, PEP and adverse-media alerts worked the way an analyst would, so only alerts worth a human arrive.
  - Pre-clearing with recorded rationale; human decides every genuine hit and low-confidence alert.
  - Same self-hosted, per-case kernel, egress-allowlisted runtime as the other KYC blueprints.
- **Assumptions:** alert volume and false-positive rate are stated and replaced with client actuals; false-positive triage described as the largest driver inside the 40% to 48% KYC cost reduction committed to.
- **Proof plan:**
  - Weeks 1 to 2: baseline alert volume, false-positive rate, review time, true-hit rate.
  - Weeks 2 to 6: build and integrate with screening providers, self-hosted.
  - Weeks 6 to 8: shadow run, every agent clear compared with the human clear; recall is the metric watched.
  - Week 8 onward: pre-clearing only for categories showing no true-positive loss.
  - Success criteria: false-positive volume reaching a human halved, zero true-positive loss against shadow baseline, 100% audit coverage of automated clears.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Screening false-positive rate | 42% average, up to 95% at scale | Volume halved |
| Noise alerts reviewed by humans | 252,000 to 570,000 a year | Cut by half |
| Analyst hours on noise | 84,000 to 190,000 a year | 42,000 to 95,000 returned |
| Direct labour recovered | Baseline | $1.9M to $4.3M a year |
| Fraud and true-hit detection | Baseline | Up 45% to 61% |
| Manual processing time | About two thirds of KYC tasks manual | Down 78% |
| Audit coverage of clears | Partial | 100% replayable |

## KYC Automation for Banks, Down to Every Owner
- **URL:** https://createos.sh/case-studies/kyc-03-corporate-onboarding-ubo
- **Persona:** Large commercial bank. Tags: KYC, UBO, Corporate Onboarding, Self-Hosted.
- **Problem:**
  - A corporate applicant has holding structures, sometimes cross-jurisdiction, with natural persons behind; each beneficial owner needs the checks a retail applicant needs.
  - $2,001 to $2,500 per corporate KYC review; 8,000 clients a year at a $2,250 midpoint is an $18.0M line; a large institution can spend up to $35M.
  - Weeks of cycle time because steps serialise behind one analyst and stall on missing documents.
- **Proposed workflow:**
  - Ownership chain resolved and every owner screened before a human opens the file; one environment forks per person so the structure unfolds in parallel.
  - Document extraction and authentication, screening-noise pre-clearing across the structure, replayable rationale for each ownership-chain link.
  - Humans on every exception; self-hosted inside the bank's boundary.
- **Assumptions:** 8,000 corporate clients a year; $2,250 per review midpoint; 40% committed floor, 48% top of modelled range; corporate integration surface is wider than retail (planned for openly); average number of beneficial owners per file measured in Phase 0.
- **Proof plan:**
  - Weeks 1 to 2: baseline cost per corporate review, cycle time, owners per file, straight-through and false-positive rates.
  - Weeks 2 to 6: integrate document store, corporate registries, identity sources, screening providers.
  - Weeks 6 to 8: shadow run comparing agent ownership chains to analyst chains; missed control relationships watched.
  - Week 8 onward: straight-through for simple single-jurisdiction structures first, expanding to layered cross-border.
  - Success criteria: cost per corporate review down at least 40%, cycle time under 2 days, corporate straight-through 15% or better, extraction 95% or better, 100% audit coverage including every ownership-chain link.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Annual cost reduction (corporate book) | $18.0M line | $7.2M to $8.6M |
| Onboarding cycle time | Weeks | 1 to 2 days |
| Cost per corporate KYC review | $2,250 | $1,150 to $1,350 |
| Straight-through processing | None | 15% to 25% |
| Beneficial owners | Processed sequentially | In parallel, no marginal delay |
| Document extraction accuracy | Variable, manual | 95% to 99% |
| Manual processing time | Baseline | Down 78% |
| Fraud detection | Baseline | Up 45% to 61% |
| Audit coverage of ownership chain | Partial | 100% replayable |

## Compliance Approved It, Information Security Did Not
- **URL:** https://createos.sh/case-studies/kyc-04-audit-trail-perpetual-kyc
- **Persona:** Mid-size commercial bank. Tags: KYC, Audit Trail, Perpetual KYC, Self-Hosted.
- **Problem:**
  - Onboarding pilots pass the proof of concept and then die in information security review, which asks about the runtime: where data sits, what the agent can reach on the network, what was logged.
  - Typical vendor answer (someone else's cloud, config-file egress, application-chosen logging) ends the deal; an unexplained auto-clear is an indefensible regulated decision.
  - Periodic refresh goes stale between cycles; a rating computed eighteen months ago is not evidence of current diligence.
- **Proposed workflow:**
  - Self-hosted deployment in the bank's region; agents run per session in disposable micro-VMs; egress allowlisted in the kernel via eBPF; all decisions logged and replayable.
  - Perpetual KYC: refresh becomes continuous rather than periodic; regulatory look-back becomes a query against the decision record.
  - Cases awaiting input hold state at zero compute and resume intact.
- **Assumptions:** cost figures drawn from published industry benchmarks (Fenergo, Statista, ComplyCube, BCG) applied to a representative bank profile; refresh volume, cycle and per-review cost are stated assumptions replaced with client actuals in Phase 0; platform claims describe CreateOS.
- **Proof plan:**
  - Weeks 1 to 2: baseline audit coverage, look-back cost, cycle time, refresh volume by risk band, cost per refresh; infosec requirements agreed in writing first.
  - Weeks 2 to 6: deploy self-hosted; kernel egress allowlists signed off source by source by the bank's security team.
  - Weeks 6 to 8: shadow run; bank's own audit function replays random closed cases end to end.
  - Week 8 onward: automated refresh for the low-risk band first, expanding with audit sign-off.
  - Success criteria: 100% audit coverage, every decision replayable without CreateOS involvement, refresh cost per case down at least 40%, zero egress outside the signed-off allowlist.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Annual cost reduction on perpetual refresh | Back-book refresh | $13.6M to $16.3M |
| Periodic refresh cost per review | Full manual cost | Down 40% to 48% |
| Audit coverage of automated decisions | Partial, reconstructed | 100%, replayable |
| Regulatory look-back | Manual project, weeks to months | Query against the decision record |
| Document blast radius | Host-level exposure | Contained to a disposable micro-VM |
| Data egress control | Policy and configuration | Allowlisted in the kernel via eBPF |
| Data residency | Vendor-dependent | Bank's own region and boundary |
| Certification posture | Gate to procurement | SOC 2 Type II, ISO 27001 |

## Related
- Up: [[Solution Blueprints]]
- [[Case Studies]]
- [[Blueprints - AML]]: sibling self-hosted banking blueprints
- [[Blueprints - Lending]]
- [[Industry - Financial Services]]
- [[Industries]]
- [[Service - AI Agents]]
- [[Product - Sandbox]]
- [[Egress Governance]]
- [[Self-Host]]
- [[Security]]
