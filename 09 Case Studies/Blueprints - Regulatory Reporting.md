---
aliases:
  - Regulatory reporting blueprints
  - Reg reporting blueprints
tags:
  - createos/blueprint
  - type/page
source: https://createos.sh/case-studies?kind=blueprint
scraped: 2026-10-17
up: "[[Solution Blueprints]]"
---

# Blueprints - Regulatory Reporting

> [!summary] Summary
> - 4 regulatory-reporting solution blueprints (slug prefix `reg-`) for a "mid-size financial institution": the reporting cycle, regulatory change monitoring, continuous audit readiness, and lineage as the deliverable.
> - All figures are **modelled**, not measured. Shared baseline (stated assumptions, replaced with client actuals in Phase 0): more than $200M a year on compliance, roughly 40% on technology (over $80M), a $30M reporting and audit-preparation base.
> - Shared design: nothing filed autonomously (human attests every submission), lineage written in the runtime, eBPF egress allowlist to internal systems and sanctioned regulator endpoints, Firecracker micro-VM per run, templated reproducible environments, self-hosted.
> - Source: https://createos.sh/case-studies?kind=blueprint (individual URLs below)

## Dozens of Systems That Do Not Agree With Each Other
- **URL:** https://createos.sh/case-studies/reg-01-the-reporting-cycle
- **Persona:** Mid-size financial institution. Tags: Regulatory Reporting.
- **Problem:**
  - Data is pulled from dozens of disagreeing systems, reconciled by hand in spreadsheets by senior people, formatted to a regulator's specification; the institution runs many regimes (call reports, capital and liquidity returns, transaction reporting, incident reporting, disclosure).
  - Employee hours complying with financial regulation rose 61% between 2016 and 2023 while aggregate hours rose 20% (Bank Policy Institute, 2024).
  - Federal Reserve, OCC and FDIC joint request for information on streamlining the Call Report, published 1 December 2025, comments due 30 January 2026 (OCC Bulletin 2025-42).
  - Proposals stalled because tooling wanted reporting data in a vendor cloud.
- **Proposed workflow:**
  - Crew takes a cycle from open to regulator-ready return with every figure traced to source, waiting for a human to attest; nothing filed autonomously.
  - Reporting corpus assembles itself; breaks flagged against reporting rules; return drafted in the regulator's format including narrative.
  - Lineage native to the runtime (tamper-evident); gathering, validation, assembly and lineage in separate contained environments; cycles fork and run in parallel across entities, jurisdictions and regimes.
- **Assumptions:** $30M reporting and audit-preparation base; 25% is the conservative floor, 40% the upper end of general compliance-automation evidence; page notes fewer hard published percentages than KYC or AML.
- **Proof plan:**
  - Weeks 1 to 2: baseline reporting cost and cycle time, change-monitoring capacity, error and finding history, audit-prep effort.
  - Weeks 2 to 6: build and integrate, scoped to a defined set of returns, self-hosted.
  - Weeks 6 to 9: parallel run; every figure and its lineage compared with the institution's own filed reports.
  - Week 9 onward: controlled adoption for proven regimes, human attestation always.
  - Success criteria: reporting cost down at least 25%, cycle time materially compressed, accuracy at or above current, full source-to-report lineage on every figure, human attestation preserved, zero data-residency or leakage incidents.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Operational cost, reporting and audit prep | $30M base | Down 25% to 40% ($7.5M to $12.0M a year) |
| Reporting cycle time | Days to weeks | Sharply compressed |
| Data lineage and traceability | Partial | 100% source-to-report |
| Reporting error rate | Baseline | Reduced via automated validation |
| Unauthorized data egress | Risk | Zero, enforced in-kernel |
| Human attestation on submissions | Manual | Preserved by design |
| Senior time context | 42% of C-suite and 43% of board time on regulatory and supervisory compliance | Returns from assembly to oversight |

## Reading What the Regulators Published This Week
- **URL:** https://createos.sh/case-studies/reg-02-the-change-treadmill
- **Persona:** Mid-size financial institution (120-person compliance team model). Tags: Regulatory Reporting.
- **Problem:**
  - Someone must read new regulation, decide if it applies (entity, jurisdiction, product), map it to policies and controls and find gaps; the work is unbounded.
  - Juniper Research forecasts regtech spend up 124% between 2023 and 2028, from $83 billion to $207 billion.
  - 42% of C-suite time and 43% of board time now goes to regulatory and supervisory compliance (up from 24% and 27% in 2016); the only response was to hire.
- **Proposed workflow:**
  - A regulatory-change-monitoring agent runs continuously inside the institution's boundary: scans regulatory sources, filters for relevance, maps each obligation to affected policies and controls, flags gaps.
  - Short list on a compliance officer's desk; judgment stays human; monitoring is auditable (what was published, assessed, mapped, who decided).
  - Policy and control library never leaves; the agent's outbound path is defined in the kernel (approved regulatory sources only); disposable guest kernel for untrusted external content.
- **Assumptions:** 120-person team at a fully loaded $150,000 per head is roughly $18M of annual capacity, 20% to 30% (that is $3.6M to $5.4M) spent on change tracking; honest recovery is smaller than the full figure because assessment stays human.
- **Proof plan:**
  - Weeks 1 to 2: baseline what is spent on change tracking, by whom, across which regimes and jurisdictions.
  - Weeks 2 to 6: build and integrate, ingest policy library, control framework and risk taxonomy.
  - Weeks 6 to 9: parallel run; compare in both directions (changes flagged by the agent versus the team).
  - Week 9 onward: controlled adoption with human judgment on every material change.
  - Success criteria: change-tracking capacity down at least 60%, zero material changes missed in the parallel run, every flagged change mapped to controls with replayable trail, human decision preserved.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Capacity spent tracking regulatory change | 20% to 30% of the compliance team | A fraction of one FTE |
| Capacity returned | N/A | 24 to 36 full-time roles' worth |
| Recovery | $3.6M to $5.4M going to the prerequisite | $2.2M to $4.0M honest recovery per year |
| Change identification | Periodic, manual, best-effort | Continuous |
| Obligation-to-control mapping | Manual, per analyst | Automated, with lineage |
| Evidence that change is monitored | Assertion | Logged, replayable trail |

## The Evidence Existed and Nobody Could Find It
- **URL:** https://createos.sh/case-studies/reg-03-continuous-audit-readiness
- **Persona:** Mid-size financial institution. Tags: Regulatory Reporting, Audit.
- **Problem:**
  - An examination notice stops the institution for weeks of evidence assembly (control documentation, transaction samples, policy versions as at a date, reasoning behind past decisions) scattered across ledgers, document stores, ticketing, email and memory.
  - Nothing assembled last time is reusable; the work lands on senior people under deadline; the disruption cost (stopped reporting, deferred remediation) is larger and unmeasured.
  - Some findings are evidence failures, not control failures.
- **Proposed workflow:**
  - An audit-evidence and examiner-response agent keeps evidence packages assembled as a standing state; a request list returns retrieval and review.
  - The agent does not answer the regulator: it drafts, assembles and evidences; a human reviews every response.
  - Lineage written as the work happens; reproducible templated environment; evidence stays inside the boundary; each run in its own guest kernel.
- **Assumptions:** audit and examination prep is roughly 20% of the $30M base, or $6.0M a year; the 25% to 40% reduction band applied to that slice gives the range; disruption cost deliberately not priced.
- **Proof plan:**
  - Weeks 1 to 2: baseline audit-preparation hours per examination and cycle, who is pulled in, finding history.
  - Weeks 2 to 6: build and integrate, scoped to one examination or audit scope.
  - Weeks 6 to 9: parallel run; nothing goes to an examiner from the agent; packages compared on completeness, accuracy and lineage.
  - Week 9 onward: controlled adoption with human review of every package.
  - Success criteria: audit-preparation effort down at least 25%, packages complete and accurate at or above current, full lineage, human ownership of the regulator relationship preserved, zero data-residency or leakage incidents.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Audit preparation cost | ~$6.0M a year slice of $30M base | $1.5M to $2.4M a year taken out |
| Audit preparation | Per-cycle scramble | Continuous readiness |
| Examiner-response time | Weeks of assembly | Materially faster, retrieval not excavation |
| Data lineage behind evidence | Partial, reconstructed | 100% source-to-report, logged as it happens |
| Process consistency | Drifts cycle to cycle | Identical templated runs, auditable |
| Reuse between audit cycles | None | Standing evidence base |

## $200 Million a Year on Compliance, Returns Still by Hand
- **URL:** https://createos.sh/case-studies/reg-04-lineage-is-the-deliverable
- **Persona:** Mid-size financial institution spending over $200M a year on compliance (stated assumption). Tags: Regulatory Reporting, Lineage.
- **Problem:**
  - Roughly 40% of that is technology (over $80M annually, both figures assumptions), yet returns are still reconciled by hand; Juniper Research forecasts regtech spend rising from $83 billion to $207 billion (2023 to 2028).
  - Reporting data cannot go to a vendor cloud; pilots get scoped to a sanitised copy and end; lineage assembled outside the boundary is defended on faith.
- **Proposed workflow:**
  - Agent workforce on infrastructure the institution hosts, with lineage built into the runtime and written in sequence as each step executes.
  - Self-hosted control plane and storage in the institution's jurisdiction; eBPF egress allowlist to approved internal systems and sanctioned regulator endpoints; per-VM isolation; reproducible templated runs.
  - Agents assemble, validate and draft; a human attests and signs every submission; SOC 2 Type II and ISO 27001.
- **Assumptions:** no cost-out figure of its own "on purpose"; page references the other three reg- cases as bankable only after this clears security review.
- **Proof plan:**
  - Weeks 1 to 2: baseline lineage coverage, data-residency requirements by jurisdiction, control framework, internal audit and infosec gates.
  - Weeks 2 to 6: deploy self-hosted; every outbound path defined in the kernel and approved before it exists.
  - Weeks 6 to 9: parallel run; every figure's lineage walked back to source.
  - Week 9 onward: controlled adoption with human attestation.
  - Success criteria: 100% source-to-report lineage, zero unauthorized data egress, zero data-residency incidents, accuracy at or above current, human attestation preserved, infosec and internal-audit sign-off before go-live.
- **Modelled metrics:**

| Metric (modelled) | Before | After |
|---|---|---|
| Where reporting data lives | Vendor cloud | Institution's own infrastructure and jurisdiction |
| Data lineage | Assembled outside the boundary, partial | 100% source-to-report, tamper-evident |
| Outbound data egress | Policy-enforced | Allowlisted in-kernel with eBPF |
| Isolation model | Shared tenancy | Per-VM Firecracker micro-VM |
| Pilot data | Sanitized copy | Real reporting data, inside the boundary |
| Dependent value cited in other reg- cases | N/A | $7.5M to $12.0M reporting, $2.2M to $4.0M change monitoring, $1.5M to $2.4M audit readiness |

## Related
- Up: [[Solution Blueprints]]
- [[Case Studies]]
- [[Blueprints - Reconciliation]]: related finance-control blueprints
- [[Blueprints - AML]]
- [[Industry - Financial Services]]
- [[Industries]]
- [[Service - AI Agents]]
- [[Product - Sandbox]]
- [[Egress Governance]]
- [[Self-Host]]
