---
aliases:
  - Underwriting blueprints
  - Insurance underwriting blueprints
tags:
  - createos/blueprint
  - type/page
source: https://createos.sh/case-studies?kind=blueprint
scraped: 2026-10-17
up: "[[Solution Blueprints]]"
---

# Blueprints - Underwriting

> [!summary] Summary
> - 4 commercial insurance underwriting blueprints (slug prefix `uw-`) for a "mid-size commercial carrier": submission intake and quote, the 70% non-underwriting problem, complex specialty book, and defensible pricing.
> - All figures are **modelled**, not measured. Shared baseline: 100 underwriters seeing roughly 80 submissions each a month (about 96,000 a year), a $20M operations line (~$208 to process a submission), submission to quote about 8 days and quote to bind about 12 days, a $500M book.
> - Shared design: agent crew reads broker emails and attachments, applies appetite, enriches, prices against the carrier's filed rates; underwriter keeps appetite, pricing authority and bind; fork per submission; eBPF egress allowlist; self-hosted; SOC 2 Type II and ISO 27001.
> - Source: https://createos.sh/case-studies?kind=blueprint (individual URLs below)

## Reading a Broker Submission the Moment It Arrives
- **URL:** https://createos.sh/case-studies/uw-01-quote-in-minutes
- **Persona:** Mid-size commercial carrier. Tags: Underwriting, Quote.
- **Problem:**
  - Each submission is a broker email with ACORD forms, loss runs, financials and a schedule of values; intake review is 45 to 90 minutes per mid-complexity submission, 60 to 120 hours a month per underwriter before judgment.
  - Underwriters spend 70% of their time on non-underwriting (40% administrative, 30% negotiation and sales support; Accenture with The Institutes, 2022); 86% spend more than two hours a day on manual data entry (hyperexponential, State of Pricing 2024).
  - Eight days to quote, twelve more to bind; competitors with automated intake respond in 24 to 48 hours.
  - Earlier proposals stalled in review: the rating model is the insurer's own regulatory responsibility.
- **Proposed workflow:**
  - Crew takes a submission from inbox to priced, enriched, appetite-checked quote; standard in-appetite risks quoted straight through; complex or out-of-appetite risks routed with analysis and referral reasons written.
  - Appetite decides the path at intake (straight-through, refer, decline-to-quote); untrusted attachments handled in the most contained environment; third-party enrichment in parallel with extraction.
  - Priced against the carrier's filed rates with factors exposed; fresh isolated environment forks per submission; pause when waiting on the broker.
  - Control plane in the carrier's infrastructure; egress allowlisted in the kernel; full decision and rating-factor log.
- **Assumptions:** 30% is the conservative committed floor, 40% the figure "reported in production deployments"; growth model assumes ~15% bind rate at ~$35,000 average premium and a 96% combined ratio (replaced with carrier actuals); 50% to 70% straight-through applies to standard risks only; no loss-ratio improvement claimed.
- **Proof plan:**
  - Weeks 1 to 2: baseline time to quote, intake capacity loss, straight-through rate, expense ratio, loss ratio on the target line.
  - Weeks 2 to 6: build and integrate policy administration, rating engine, document intake, data providers; scoped to one line of business; self-hosted.
  - Weeks 6 to 10: champion-challenger shadow run, binding nothing, testing for unfair and proxy discrimination.
  - Week 10 onward: controlled go-live on cleanest standard risks.
  - Success criteria: time to quote down at least 40%, admin burden down at least 38%, straight-through materially lifted, no loss-ratio degradation, no unfair or proxy discrimination, 100% explainable rating-factor coverage.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Annual cost reduction, underwriting operations | $20M line | $6.0M to $8.0M |
| Time to quote, standard risks | ~8 days | Minutes to hours |
| Quote to bind | ~12 days | 24 to 48 hours |
| Straight-through processing | 10% to 15% | 50% to 70% on standard risks |
| Underwriter admin burden | Baseline | Down 38% or more |
| Quote capacity, same team | Baseline | Up 25% to 40% (24,000 to 38,400 more submissions a year) |
| Intake review per submission | 45 to 90 minutes | Minutes, agent-handled |
| Growth illustration | One point of hit rate | 960 more bound policies, $33.6M new written premium, roughly $1.3M underwriting profit |
| Audit coverage | Partial | 100% of decisions and rating factors logged |

## Underwriting Automation and the 70% Problem
- **URL:** https://createos.sh/case-studies/uw-02-the-70-percent-problem
- **Persona:** Mid-size commercial carrier. Tags: Underwriting.
- **Problem:**
  - Roughly 70% of the underwriter day goes to non-underwriting work (Accenture with The Institutes, 2022); 86% spend over two hours a day on manual data entry (hyperexponential, 2024).
  - Intake alone costs $7.2M to $14.4M a year: 72,000 to 144,000 hours at roughly $100 an hour; underwriters are the growth bottleneck and senior people leave.
  - Headcount and offshore intake moved the cost, not the constraint.
- **Proposed workflow:**
  - Agent crew does intake so the underwriter underwrites: appetite applied first; broker email, ACORD forms, loss runs, schedules of values and financials read and normalised; enrichment from approved providers; first-pass price with rating factors exposed and referral reasons written.
  - Underwriter's first action is a decision; each submission forks into its own isolated environment; waits pause.
  - Pricing models and policyholder data never leave; egress allowlisted in the kernel.
- **Assumptions:** carrier paying for a hundred underwriters and getting the output of roughly thirty; 38% admin cut returns 27,000 to 55,000 hours (14 to 27 underwriters); 30% floor, 40% production-reported; 70% does not become 0%; no loss-ratio claim.
- **Proof plan:**
  - Weeks 1 to 2: baseline where underwriter hours go, intake time, straight-through rate, expense ratio.
  - Weeks 2 to 6: build and integrate, self-hosted.
  - Weeks 6 to 10: champion-challenger shadow run measuring hours actually returned, with unfair and proxy discrimination testing.
  - Week 10 onward: controlled go-live across the standard book first.
  - Success criteria: admin burden down at least 38%, quote capacity up at least 25%, time to quote down at least 40%, no loss-ratio degradation, 100% explainable rating-factor coverage.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Underwriter time on non-underwriting work | ~70% | Materially reversed |
| Underwriter admin burden | Baseline | Down 38%, up to 52% |
| Quote capacity, same team | Baseline | Up 25% to 40% |
| Underwriting operations cost | $20M | Down 30% to 40% ($6.0M to $8.0M a year) |
| Hours returned | 72,000 to 144,000 hours on intake | 27,000 to 55,000 hours (14 to 27 underwriters' equivalent) |
| Intake review per submission | 45 to 90 minutes | Minutes, agent-handled |
| Underwriting expense ratio | Above target band | Toward the 20% to 30% band |
| Audit coverage | Partial | 100% of decisions logged |

## Nobody Had Capacity to Write the Complex Book
- **URL:** https://createos.sh/case-studies/uw-03-complex-commercial-specialty
- **Persona:** Mid-size commercial carrier (multi-location property and specialty accounts). Tags: Underwriting, Specialty.
- **Problem:**
  - The complex book (schedules of values running to hundreds of rows, five-year loss runs in varied formats, financials, supplementals, broker context) gets the least underwriting time.
  - About 38,400 hours a year (~$3.8M) on document reconciliation; about 24,000 hours (~$2.4M) on business ultimately declined (a fifth of submissions fell outside appetite); quote takes ~8 days and bind another ~12.
  - Tools said the segment could not be done because they scrape forms rather than reconcile documents.
- **Proposed workflow:**
  - Agent crew for documents that defeat generic intake: out-of-appetite risks declined in minutes with reason written; documents reconciled against each other (a schedule-of-values location matched to its loss-run losses); missing fields identified and broker chase list produced.
  - Enrichment lookups, first-pass assessment and price with factors exposed; output is a fully assembled, reconciled, enriched, first-pass-priced submission with open questions surfaced.
  - A hundred complex accounts work in parallel in isolated forked environments; extraction runs in its own guest kernel; egress allowlisted.
- **Assumptions:** straight-through processing deliberately stays low (close to zero on large schedule-of-values accounts); 60,000+ hours (~$6M a year) sits inside the $6.0M to $8.0M total operations reduction across the line; no loss-ratio claim.
- **Proof plan:**
  - Weeks 1 to 2: baseline intake and reconciliation time on complex submissions, hours on declined business, time to quote, quote-to-bind, loss ratio.
  - Weeks 2 to 6: build and integrate, scoped to one specialty line.
  - Weeks 6 to 10: champion-challenger shadow run comparing the assembled file with the underwriter's by-hand file; discrimination testing.
  - Week 10 onward: agent intake and appetite triage across the complex book, all referral, decline and bind decisions stay with the underwriter.
  - Success criteria: intake and reconciliation time down at least 40%, out-of-appetite triaged before underwriter review, time to quote down at least 40%, no loss-ratio degradation or discrimination, 100% explainable rating-factor coverage.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Intake and reconciliation per complex submission | ~2 hours | Minutes, agent-handled |
| Underwriter hours on complex intake | ~38,400 a year | Largely returned |
| Time to quote, complex risks | 8 days and up | 1 to 2 days |
| Quote to bind | ~12 days | Materially compressed |
| Hours on declined business | ~24,000 a year | Substantially eliminated |
| Out-of-appetite risks identified | After underwriter review | In minutes, before review |
| Straight-through processing | 10% to 15% | Deliberately stays low here |
| Audit coverage | Partial | 100% of decisions and rating factors logged |

## Defending a Price Two Years After It Was Set
- **URL:** https://createos.sh/case-studies/uw-04-pricing-you-can-defend
- **Persona:** Mid-size commercial carrier with a $500M book. Tags: Underwriting, Pricing.
- **Problem:**
  - Insurance pricing is rate-regulated; an examiner asks why a risk was priced that way, whether a comparable risk was priced the same, and whether any factor acts as a proxy.
  - A hundred underwriters pricing by hand produced inconsistency; on a $500M book a single loss-ratio point is $5M; rating factors lived in an underwriter's head or file note.
  - Vendor solutions wanted filed rates, rating model and policyholder data in their cloud and returned a black-box price.
- **Proposed workflow:**
  - Reproducibility by construction: environment baked as a template and forked per submission so every risk runs identical logic.
  - Narrow agents with clear responsibilities form a chain examinable at each link; every pricing decision logged with rating factors and appetite checks.
  - Rating model never leaves the carrier's boundary; egress allowlisted to approved data providers; per-VM isolation; underwriter keeps pricing authority and bind.
- **Assumptions:** no loss-ratio gain is claimed before champion-challenger testing on the carrier's own book; page states bias-testing tooling and formal model documentation support are "still being built out" (open engineering priority); a single point on $500M is $5M and three points $15M versus $6M to $8M operational saving.
- **Proof plan:**
  - Weeks 1 to 2: baseline pricing consistency across underwriters on comparable risks, rating-factor coverage, loss ratio, fairness testing posture.
  - Weeks 2 to 6: build and integrate, self-hosted.
  - Weeks 6 to 10: champion-challenger shadow run, nothing goes live until pricing is shown both better and fair.
  - Week 10 onward: controlled go-live on cleanest standard in-appetite risks.
  - Success criteria: 100% explainable rating-factor coverage, reproducible pricing on comparable risks, no unfair or proxy discrimination, no loss-ratio degradation, validated loss-ratio improvement on the carrier's own book.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Pricing consistency | Varies by underwriter | Reproducible by construction |
| Rating-factor coverage | Partial, often in the file note | 100% of decisions logged with factors |
| Decision replay | Find the underwriter, hope they recall | Replayable from the audit log |
| Bias testing | Not systematically possible | Testable factor by factor |
| Model ownership | At risk in vendor clouds | Stays inside the carrier's boundary |
| Data egress | Broad vendor access | Kernel-allowlisted, approved paths only |
| Loss ratio | Baseline | Not claimed; tested champion-challenger first |

## Related
- Up: [[Solution Blueprints]]
- [[Case Studies]]
- [[Blueprints - Claims]]: sibling insurance blueprints
- [[Blueprints - Lending]]: banking underwriting counterpart
- [[Industry - Financial Services]]
- [[Industries]]
- [[Service - AI Agents]]
- [[Product - Sandbox]]
- [[Egress Governance]]
- [[Self-Host]]
