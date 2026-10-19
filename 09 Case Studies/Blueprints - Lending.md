---
aliases:
  - Lending blueprints
tags:
  - createos/blueprint
  - type/page
source: https://createos.sh/case-studies?kind=blueprint
scraped: 2026-10-17
up: "[[Solution Blueprints]]"
---

# Blueprints - Lending

> [!summary] Summary
> - 3 lending solution blueprints (slug prefix `lending-`): cost to originate, speed to decision and abandonment, and commercial credit files.
> - All figures are **modelled**, not measured. Shared baseline: a mid-size bank originating 10,000 loans a year, assumed ~$9,000 all-in cost to originate ($90M annual origination spend), benchmarked 2025 and 2026 ranges applied to it.
> - Shared design: agent crew builds the file, underwriter decides; fork per applicant from a template, Firecracker micro-VM per case, eBPF egress allowlist to approved bureaus, self-hosted in the bank's region.
> - Source: https://createos.sh/case-studies?kind=blueprint (individual URLs below)

## $9,000 to Originate a Loan, Most of It Not Credit Work
- **URL:** https://createos.sh/case-studies/lending-01-the-9000-dollar-loan
- **Persona:** Mid-size commercial bank originating 10,000 loans a year across consumer and small-business lending. Tags: Lending, Underwriting.
- **Problem:**
  - Roughly $9,000 all-in to originate one loan, mostly expert labour.
  - About 60% of the working day is not underwriting (tax returns, spreading statements, chasing documents).
  - Manual underwriting runs 10 to 21 days against 24 to 72 hours for an automated path; credit memos are hours of assembly.
  - Earlier attempts died in risk review: income documents, tax returns, bank statements and bureau pulls on infrastructure the bank does not control.
- **Proposed workflow:**
  - Agent workforce built, deployed and operated inside the bank's environment.
  - Document extraction and spreading; bureau, banking and third-party data arrive as one picture; scoring against the bank's models and policy with factors shown and exceptions flagged.
  - Adverse-action reasons explainable by construction; memo drafted in the bank's format in well under a minute; straight-through, escalate, or hold by credit policy; underwriter keeps the credit decision.
  - Risk-review answer: Firecracker micro-VM per case, eBPF egress allowlist, self-hosting and data residency, template forked per applicant for reproducibility (fair-lending consistency); SOC 2 Type II and ISO 27001.
- **Assumptions:** 10,000 loans a year; $9,000 all-in cost is CreateOS's stated modelling assumption (replaced by the client's measured cost in Phase 0); impact figures are benchmarked ranges from 2025 and 2026 deployments.
- **Proof plan:**
  - Phase 0, weeks 1 to 2: baseline cost to originate, time-to-decision, underwriter throughput, default rate, abandonment.
  - Phase 1, weeks 2 to 6: integrate origination system, bureaus, banking-data providers, document store; encode credit policy; self-host.
  - Phase 2, weeks 6 to 10: champion-challenger shadow run, binding nothing, with disparate-impact testing.
  - Phase 3, weeks 10 onward: controlled go-live on cleanest in-policy segments, humans on every decline and exception.
  - Success criteria: time-to-decision down at least 40%, cost per loan down at least 15%, throughput up at least 20%, no default-rate degradation, no disparate impact, 100% explainable adverse-action coverage.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Cost per loan originated | $9,000 | ~$7,000 to $7,650 |
| Operational cost to originate | Baseline | Down 15% to 22% |
| Annual cost reduction | $90M base | $13.5M to $19.8M per year |
| Underwriter time on data assembly | ~60% of the day | Reclaimed to credit judgment |
| Underwriter productivity | Baseline | Up 20% to 40% submissions per head |
| Credit-memo drafting | Hours | Minutes |
| Time-to-decision | 10 to 21 days | Down 40% to 50% |
| Adverse-action coverage | Inconsistent | 100% explainable and replayable |

## Applicants Abandon the Form in Under Nineteen Minutes
- **URL:** https://createos.sh/case-studies/lending-02-nineteen-minutes
- **Persona:** Mid-size retail bank (10,000-loan-a-year baseline). Tags: Lending, Speed to Decision.
- **Problem:**
  - Lending is framed as a revenue story: 68% of European consumers have abandoned a financial-services application (Signicat, The Battle to Onboard, 2022, up from 63% two years earlier), leaving after an average of 18 minutes 53 seconds (down from 26 minutes in 2020).
  - Manual underwriting 10 to 21 days versus 24 to 72 hours automated; commercial cycles run into a second week.
  - Delay is queueing: clean in-policy applications sit in the same human queue as complex ones; ~60% of underwriter day is data assembly.
- **Proposed workflow (crew):**
  - Orchestrator and intake: opens an isolated case environment on arrival and routes straight-through, escalate, or hold.
  - Document processing and spreading (flags missing documents immediately); data gathering and enrichment in parallel with extraction.
  - Credit analysis and risk scoring against the bank's models; credit-memo drafting (~40 seconds document-to-draft); policy, fair lending and explainability.
  - Speed mechanisms: fork per applicant from a template, pause and resume for missing documents (no compute burned), Firecracker micro-VM per case, eBPF egress allowlist, self-hosting.
- **Assumptions:** 0.8% origination fee assumed (replaced with bank actuals in Phase 0); recovering 10% of lost applications on a 10,000-loan base is roughly 1,000 funded loans a year; no third-party approval-uplift figure is quoted.
- **Proof plan:**
  - Phase 0 (weeks 1 to 2): baseline abandonment, time-to-decision, cost to originate, throughput and where applicants drop in the funnel.
  - Phase 1 (weeks 2 to 6): build and integrate, encode credit policy, self-host.
  - Phase 2 (weeks 6 to 10): champion-challenger shadow run with disparate-impact test.
  - Phase 3 (week 10 onward): controlled go-live on clean in-policy segments.
  - Success criteria: time-to-decision down at least 40%, measurable abandonment reduction, cost per loan down at least 15%, throughput up at least 20%, no default degradation, no disparate impact, 100% explainable adverse-action coverage.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Time-to-decision, consumer | 10 to 21 days | Hours for in-policy cases |
| Time-to-decision, commercial | 12 to 15 days | 6 to 8 days, falling with confidence |
| Time-to-decision, overall | Baseline | Down 40% to 50% |
| Credit-memo drafting | Hours | ~40 seconds document-to-draft |
| Application abandonment | ~68% | Reduced through speed and responsiveness |
| Underwriter productivity | Baseline | Up 20% to 40% submissions per head |
| Recovered loans (10% of lost applications) | N/A | ~1,000 funded loans a year |
| Origination fee on 1,000 recovered loans at 0.8% | N/A | $0.4M ($50,000 loans), $1.2M ($150,000), $2.4M ($300,000) |

## Giving Credit Analysts an Assembled File to Judge
- **URL:** https://createos.sh/case-studies/lending-03-twelve-days-to-six
- **Persona:** Mid-size commercial bank (commercial credit). Tags: Lending, Credit Memo.
- **Problem:**
  - A commercial file includes an operating company, three years of financials, guarantors, collateral and entity structure; the judgment is expert work but almost nothing before it is.
  - About 60% of the day on data assembly; memos take hours per file; commercial approval runs into a second week, losing deals where borrowers shop two or three banks.
  - ~$9,000 all-in cost to originate (stated assumption, not a published benchmark); analyst turnover as an unquantified cost.
- **Proposed workflow (crew):**
  - Orchestrator and intake; document processing and spreading (entity financials, tax returns, bank statements, guarantor statements); data enrichment across entity and every guarantor in parallel.
  - Credit analysis and risk scoring; policy and fair lending (exceptions flagged, adverse-action reasons); credit-memo drafting in the bank's format (~40 seconds); explainability and audit log.
  - The agents build the file, the underwriter makes the call; commercial straight-through processing is explicitly not the goal.
  - Infrastructure: fork per entity within a case, private overlay network with private DNS, Firecracker micro-VM per case, eBPF egress allowlist, self-hosting, pause and resume.
- **Assumptions:** $9,000 cost to originate is modelled; benchmarked 20% to 40% productivity lift; turnover benefit not measured or numbered.
- **Proof plan:**
  - Phase 0 (weeks 1 to 2): baseline commercial cycle time, cost to originate, analyst throughput, memo turnaround, where files stall.
  - Phase 1 (weeks 2 to 6): build and integrate, encode credit policy and memo format.
  - Phase 2 (weeks 6 to 10): champion-challenger shadow run comparing spread accuracy, memo quality, exception detection, plus disparate-impact test.
  - Phase 3 (week 10 onward): controlled go-live on cleanest segments.
  - Success criteria: commercial time-to-decision down at least 40%, memo turnaround hours to minutes, throughput up at least 20%, cost per loan down at least 15%, no default degradation, no disparate impact, 100% explainable adverse-action coverage.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Time-to-decision, commercial | 12 to 15 days | 6 to 8 days, falling with confidence |
| Credit-memo drafting | Hours per file | ~40 seconds document-to-draft |
| Analyst time on data assembly | ~60% of the day | Reclaimed to credit judgment |
| Underwriter productivity | Baseline | Up 20% to 40% submissions per head |
| Cost to originate | ~$9,000 | Down 15% to 22% |
| Policy exceptions | Found by hand | Flagged explicitly on every file |
| Adverse-action coverage | Inconsistent | 100% explainable and replayable |

## Related
- Up: [[Solution Blueprints]]
- [[Case Studies]]
- [[Blueprints - KYC]]: onboarding blueprints on the same self-hosted runtime
- [[Blueprints - Underwriting]]: insurance underwriting counterpart
- [[Industry - Financial Services]]
- [[Industries]]
- [[Service - AI Agents]]
- [[Product - Sandbox]]
- [[Self-Host]]
