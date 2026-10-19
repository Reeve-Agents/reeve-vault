---
aliases:
  - Claims blueprints
  - Insurance claims blueprints
tags:
  - createos/blueprint
  - type/page
source: https://createos.sh/case-studies?kind=blueprint
scraped: 2026-10-17
up: "[[Solution Blueprints]]"
---

# Blueprints - Claims

> [!summary] Summary
> - 4 property and casualty claims blueprints (slug prefix `claims-`) for a "mid-size P&C carrier": FNOL to settlement, claims leakage, containment of untrusted files, and fair handling.
> - All figures are **modelled**, not measured, even though pages are written in the past tense. Shared baseline: roughly 250,000 claims a year, $500M paid losses, $30M claims-handling cost (~$120 per claim).
> - Shared design: agent recommends, adjuster decides (denials, large losses, litigated matters stay human); one configured environment forks per claim; untrusted attachments in a disposable micro-VM; settlement egress allowlisted in the kernel; self-hosted; SOC 2 Type II and ISO 27001; four weeks of shadow before settling anything.
> - Source: https://createos.sh/case-studies?kind=blueprint (individual URLs below)

## Claims Processing Automation, FNOL to Settlement
- **URL:** https://createos.sh/case-studies/claims-01-fnol-to-settlement
- **Persona:** Mid-size P&C carrier handling roughly 250,000 claims a year. Tags: Claims, FNOL.
- **Problem:**
  - J.D. Power 2025 U.S. Property Claims Satisfaction Study: average homeowners-property claim 44 days from first notice of loss to payment (longest since 2008); auto repairable vehicle 19.3 days.
  - Simple claims queue behind complex ones; a large share of the lifecycle is mechanical (reading FNOL form and photos, chasing reports, keying estimates, checking coverage and limits).
  - $120 a claim, roughly $30M a year; the earlier evaluation died in procurement over unvetted files and good-faith/timeliness regulation.
- **Proposed workflow:**
  - Agent workforce deployed on CreateOS infrastructure inside the carrier's boundary, operated against agreed service levels and settlement authority.
  - Triage at intake by severity and complexity; agent recommends, adjuster decides (denials, large losses, litigated and complex claims route to a human).
  - One configured environment forks per claim; untrusted attachments in disposable per-claim micro-VMs; settlement egress allowlisted in the kernel.
  - Shadow against real claims first, settling nothing; straight-through settlement on simplest, lowest-value claims first.
- **Assumptions:** conservative 30% to 40% improvement on a $30M base; claims leakage (7% to 14% of payouts per Insurance Thought Leadership, 2026) explicitly not claimed here.
- **Proof plan:** shadow mode in parallel with adjusters until evidence is in (page has no separate proof-plan section); leakage recovery left to the next engagement.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Cycle time, simple claims | Up to 44 days | Under 1 day, minutes for many |
| Straight-through processing, simple claims | Low | 60% to 70% |
| Cost per claim, fully loaded | $120 | $72 to $84 |
| Annual claims-handling cost | $30.0M | $18.0M to $21.0M ($9.0M to $12.0M saved a year) |
| Lifecycle work done before adjuster opens file | Baseline | 30% to 40% |
| Audit coverage of automated decisions | Partial | 100% replayable |
| Unauthorized payments | Risk | Zero, enforced in-kernel |

## Recovering What Was Overpaid and Never Reviewed
- **URL:** https://createos.sh/case-studies/claims-02-claims-leakage
- **Persona:** Mid-size P&C carrier paying roughly $500M in losses a year across 250,000 claims. Tags: Claims, Leakage.
- **Problem:**
  - Leakage is the gap between what was paid and what should have been paid; named industry estimates put it between 7% and 14% of total claims payouts (Insurance Thought Leadership, 2026), roughly $35M to $70M of this book.
  - Not mainly fraud: unvalidated estimates, unchased subrogation, loosely applied limits, duplicate invoices; cause is adjuster capacity, so quality tracks how busy the file's adjuster was.
  - Combined ratios above 100 mean a point of recovery decides underwriting profit.
- **Proposed workflow:**
  - Builds on an existing claims-handling agent deployment; applies the same complete investigation to every claim.
  - Every estimate validated against expected cost (damage type, region, repair); fraud screening across the book (same shop, claimant behaviour, narrative); coverage, limits and exclusions checked equally each time.
  - Identical logic on every claim; within a claim coverage, valuation and fraud run in parallel; untrusted attachments contained; settlement egress allowlisted; claimant data stays in the carrier's boundary.
- **Assumptions:** no portable leakage percentage quoted; the baseline is measured on the carrier's own book in shadow; lower figures that circulate "have no study behind them".
- **Proof plan:**
  - A baseline on the target line comes first and becomes the yardstick.
  - Agents run in shadow for four weeks against real claims, settling nothing; each case compared claim by claim to find overvalued estimates, missed recoveries, fraud patterns, coverage limits missed under time pressure.
- **Modelled metrics:**

| Lever (modelled) | Base | Value of recovery |
|---|---|---|
| Claims-handling cost reduction (engagement 1) | $30.0M | $9.0M to $12.0M per year |
| Leakage, 1 point of paid losses recovered | $500M | $5.0M per year |
| Leakage, 2 points recovered | $500M | $10.0M per year |
| Leakage, 3 points recovered | $500M | $15.0M per year |

## A Million Unvetted Files Reach a System That Pays
- **URL:** https://createos.sh/case-studies/claims-03-containment
- **Persona:** Mid-size P&C carrier processing 250,000 claims a year (about a million inbound attachments). Tags: Claims, Containment.
- **Problem:**
  - Untrusted input (claimant phone photos, body-shop PDFs, vendor reports, medical documents) at one end and money at the other, with software making decisions between.
  - US insurance fraud put at $308.6 billion a year across all lines, about $90 billion property and casualty (Coalition Against Insurance Fraud, 2022).
  - The last evaluation died in procurement: shared-cloud tenancy and application-layer controls; claims data in several lines is health-adjacent.
- **Proposed workflow:**
  - Controls moved below the application into the kernel and hypervisor.
  - Every untrusted file processed in a disposable Firecracker micro-VM destroyed after extraction; settlement egress allowlisted in the kernel (eBPF); human sign-off above authority thresholds.
  - Control plane and storage inside the carrier's infrastructure and region.
- **Assumptions:** platform claims (SOC 2 Type II, ISO 27001, self-hosting) as stated by CreateOS; cycle time and efficiency benefits are available from many vendors, per the page.
- **Proof plan:** information-security review as the gate (page has no separate proof-plan section); outcomes below stated as "year one".
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Untrusted files processed in year one | N/A | ~1M, each bounded to a disposable VM |
| Untrusted document processing | Shared tenancy, application sandbox | Firecracker micro-VM, own guest kernel, destroyed after use |
| Blast radius of a malicious attachment | The processing environment | One disposable VM |
| Payment path control | Application-layer logic | Kernel-level eBPF egress allowlist |
| Unauthorized payment | Mitigated by correct software | Zero, structurally impossible |
| Claimant data residency | Vendor cloud | Inside the carrier's boundary |
| Audit coverage of decisions | Partial | 100% replayable |

## The Bad-Faith Exposure Hiding in Inconsistent Denials
- **URL:** https://createos.sh/case-studies/claims-04-fair-handling
- **Persona:** Mid-size P&C carrier. Tags: Claims, Bad Faith Defense.
- **Problem:**
  - A wrongful denial is bad-faith exposure; claims handling is regulated for good faith and timeliness; late payment is a market-conduct finding.
  - Examiners ask about consistency (similar claimants treated similarly); human consistency at volume does not exist (the adjuster with eleven open files versus three); defence depended on file notes of uneven quality.
- **Proposed workflow:**
  - The agent never denies a claim; denials, large losses, litigated matters and complex claims route to a human with settlement authority.
  - Identical logic on every claim regardless of volume or day; every decision and its coverage and fraud rationale logged as it happens (recommendation and human decision both recorded).
  - Routine claims compressed to under a day reduces timeliness exposure; controls run below the application (contained attachments, settlement egress allowlist, data in the carrier's boundary).
- **Assumptions:** carrier's own coverage rules and fair-claims standards are encoded, not CreateOS's; consistency only as good as the rules encoded.
- **Proof plan:** "no increase in wrongful denials" is a gate agreed in writing before the pilot; four weeks of shadow running (denying and settling nothing), then straight-through settlement on the simplest claims first.
- **Modelled metrics:**

| Fair-handling dimension (modelled) | Manual baseline | With the agent workforce |
|---|---|---|
| Consistency of investigation | Varies by adjuster workload and timing | Identical logic on every claim |
| Denial authority | Human | Human, unchanged |
| Wrongful denials | Unmeasured | No increase, proven in shadow before go-live |
| Decision rationale on file | File notes, quality varies | Full chain logged as it happens |
| Audit coverage | Partial | 100% of decisions replayable |
| Timeliness exposure | Up to 44-day cycle | Routine claims under 1 day |

## Related
- Up: [[Solution Blueprints]]
- [[Case Studies]]
- [[Blueprints - Underwriting]]: sibling insurance blueprints
- [[Industry - Financial Services]]
- [[Industries]]
- [[Service - AI Agents]]
- [[Product - Sandbox]]
- [[Egress Governance]]
- [[Self-Host]]
