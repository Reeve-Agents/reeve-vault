---
aliases:
  - Blueprints
  - Solution blueprints
tags:
  - createos/blueprint
  - type/hub
source: https://createos.sh/case-studies?kind=blueprint
scraped: 2026-10-17
up: "[[Case Studies]]"
---

# Solution Blueprints

> [!summary] Summary
> - 52 solution blueprints on createos.sh/case-studies: workflows CreateOS has designed but not yet delivered, each carrying its assumptions and a proof plan on the page.
> - They are **modelled, not measured**, and labelled as such on the site (llms.txt wording). Manufacturing pages state their figures are "targets and instrumentation, not results already delivered".
> - Grouped into 11 notes by slug prefix: 6 banking groups, 2 financial-services groups, 2 insurance groups and 1 manufacturing group. Delivered work is covered separately in [[Customer Stories]].
> - Source: https://createos.sh/case-studies?kind=blueprint (full list); each blueprint's full URL is in its group note.

## Groups

| Group note | Domain | Blueprints | Slug prefix |
|---|---|---|---|
| [[Blueprints - AML]] | Banking - AML | 4 | `aml-` |
| [[Blueprints - KYC]] | Banking - KYC | 4 | `kyc-` |
| [[Blueprints - Fraud]] | Banking - Fraud | 4 | `fraud-` |
| [[Blueprints - Customer Service]] | Banking - Customer Service | 4 | `cs-` |
| [[Blueprints - Lending]] | Banking - Lending | 3 | `lending-` |
| [[Blueprints - Reconciliation]] | Banking - Reconciliation | 4 | `recon-` |
| [[Blueprints - Investment Research]] | Financial Services - Investment Research | 4 | `ir-` |
| [[Blueprints - Regulatory Reporting]] | Financial Services - Regulatory Reporting | 4 | `reg-` |
| [[Blueprints - Claims]] | Insurance - Claims | 4 | `claims-` |
| [[Blueprints - Underwriting]] | Insurance - Underwriting | 4 | `uw-` |
| [[Blueprints - Manufacturing]] | Manufacturing (Industrial AI) | 13 | `mfg-` |
| **Total** |  | **52** |  |

## Common page structure
- Sections on almost every page: At a glance (headline metrics), Challenge, Solution, Outcome Derived, What We Would Prove and How, Highlights.
- Persona is a composite ("Mid-size commercial bank", "Mid-size P&C carrier", "Discrete manufacturer, multi-plant", and so on), not a named customer.
- Financial-services engagement pattern: Phase 0 baseline in weeks 1 to 2, build and integrate, shadow mode or parallel run, controlled go-live; success criteria agreed up front against the client's own baseline.
- Manufacturing engagement pattern: 60 to 90 day pilot on one line, cell, category or product family; baseline in weeks 1-2, watch-only in weeks 3-6, enforce, readout against one agreed number.
- Recurring platform claims on the financial-services pages: Firecracker micro-VM per case, eBPF kernel egress allowlist, self-hosted control plane, SOC 2 Type II and ISO 27001. The human keeps the regulated decision (filing, denial, attestation, underwriting call).

## All blueprints

URL paths are relative to https://createos.sh; the full URL is in the group note.

| Title | Domain | Persona | URL path | Group note |
|---|---|---|---|---|
| AML Transaction Monitoring When 95% Is Noise | Banking - AML | Mid-size commercial bank | `/case-studies/aml-01-draining-the-alert-queue` | [[Blueprints - AML]] |
| AML Case Management Without the Two-Hour Assembly | Banking - AML | Mid-size commercial bank | `/case-studies/aml-02-from-alert-to-filed-sar` | [[Blueprints - AML]] |
| The Network Behind a Single AML Alert | Banking - AML | Mid-size commercial bank | `/case-studies/aml-03-seeing-the-whole-network` | [[Blueprints - AML]] |
| The Second Line Asked Why It Cleared That Alert | Banking - AML | Mid-size commercial bank | `/case-studies/aml-04-defensible-by-design` | [[Blueprints - AML]] |
| KYC Automation That Clears the Clean Files First | Banking - KYC | Mid-size retail bank | `/case-studies/kyc-01-retail-account-opening` | [[Blueprints - KYC]] |
| Sanctions Screening Alerts That Are Never Matches | Banking - KYC | Large bank | `/case-studies/kyc-02-screening-false-positives` | [[Blueprints - KYC]] |
| KYC Automation for Banks, Down to Every Owner | Banking - KYC | Large commercial bank | `/case-studies/kyc-03-corporate-onboarding-ubo` | [[Blueprints - KYC]] |
| Compliance Approved It, Information Security Did Not | Banking - KYC | Mid-size commercial bank | `/case-studies/kyc-04-audit-trail-perpetual-kyc` | [[Blueprints - KYC]] |
| $213 Billion Lost to Declines That Were Never Fraud | Banking - Fraud | Mid-size card issuer | `/case-studies/fraud-01-false-declines` | [[Blueprints - Fraud]] |
| Closing a Regulation E Dispute Inside Ten Business Days | Banking - Fraud | Mid-size commercial bank | `/case-studies/fraud-02-disputes-ten-day-clock` | [[Blueprints - Fraud]] |
| The Bank Cannot Simply Disbelieve the Customer | Banking - Fraud | Mid-size commercial bank | `/case-studies/fraud-03-defensible-denials` | [[Blueprints - Fraud]] |
| What Stops a Fraud Agent From Moving Money | Banking - Fraud | Mid-size commercial bank | `/case-studies/fraud-04-kernel-money-movement` | [[Blueprints - Fraud]] |
| Routine Questions Make Up Most of the Contact Volume | Banking - Customer Service | Mid-size retail bank | `/case-studies/cs-01-containment-without-risk` | [[Blueprints - Customer Service]] |
| Deflection Leaves the Hard Calls for a Human | Banking - Customer Service | Mid-size retail bank | `/case-studies/cs-02-agent-assist-handle-time` | [[Blueprints - Customer Service]] |
| A Hallucinated Answer Is the Bank's Official Position | Banking - Customer Service | Mid-size retail bank | `/case-studies/cs-03-agent-cannot-move-money` | [[Blueprints - Customer Service]] |
| Earning Each Permission Before Taking the Next One | Banking - Customer Service | Mid-size retail bank | `/case-studies/cs-04-read-only-before-money` | [[Blueprints - Customer Service]] |
| $9,000 to Originate a Loan, Most of It Not Credit Work | Banking - Lending | Mid-size commercial bank | `/case-studies/lending-01-the-9000-dollar-loan` | [[Blueprints - Lending]] |
| Applicants Abandon the Form in Under Nineteen Minutes | Banking - Lending | Mid-size retail bank | `/case-studies/lending-02-nineteen-minutes` | [[Blueprints - Lending]] |
| Giving Credit Analysts an Assembled File to Judge | Banking - Lending | Mid-size commercial bank | `/case-studies/lending-03-twelve-days-to-six` | [[Blueprints - Lending]] |
| 8,000 Hours of Work Inside an 8,064-Hour Window | Banking - Reconciliation | Mid-size commercial bank | `/case-studies/recon-01-compressing-the-close` | [[Blueprints - Reconciliation]] |
| 3% of Transactions Take the Whole Reconciliation Team | Banking - Reconciliation | Mid-size commercial bank | `/case-studies/recon-02-exception-investigation` | [[Blueprints - Reconciliation]] |
| Finding the Money in Items Nobody Ever Opened | Banking - Reconciliation | Mid-size commercial bank | `/case-studies/recon-03-revenue-leakage` | [[Blueprints - Reconciliation]] |
| The Agent Proposes a Posting and Cannot Make One | Banking - Reconciliation | Mid-size commercial bank | `/case-studies/recon-04-inkernel-posting-control` | [[Blueprints - Reconciliation]] |
| Every CIM Read in Full Before Anyone Can Decline | Financial Services - Investment Research | Middle-market private equity firm | `/case-studies/ir-01-from-cim-to-memo` | [[Blueprints - Investment Research]] |
| Twenty Hours Pass Before the Thinking Starts | Financial Services - Investment Research | Middle-market private equity firm | `/case-studies/ir-02-twenty-hours-to-eight` | [[Blueprints - Investment Research]] |
| An Analyst Wanting a Thirteenth Name Had to Drop One | Financial Services - Investment Research | Middle-market private equity firm | `/case-studies/ir-03-covering-more-names` | [[Blueprints - Investment Research]] |
| Running Research Agents Inside the Firm's Own Walls | Financial Services - Investment Research | Middle-market private equity firm | `/case-studies/ir-04-alpha-stays-inside-the-walls` | [[Blueprints - Investment Research]] |
| Dozens of Systems That Do Not Agree With Each Other | Financial Services - Regulatory Reporting | Mid-size financial institution | `/case-studies/reg-01-the-reporting-cycle` | [[Blueprints - Regulatory Reporting]] |
| Reading What the Regulators Published This Week | Financial Services - Regulatory Reporting | Mid-size financial institution | `/case-studies/reg-02-the-change-treadmill` | [[Blueprints - Regulatory Reporting]] |
| The Evidence Existed and Nobody Could Find It | Financial Services - Regulatory Reporting | Mid-size financial institution | `/case-studies/reg-03-continuous-audit-readiness` | [[Blueprints - Regulatory Reporting]] |
| $200 Million a Year on Compliance, Returns Still by Hand | Financial Services - Regulatory Reporting | Mid-size financial institution | `/case-studies/reg-04-lineage-is-the-deliverable` | [[Blueprints - Regulatory Reporting]] |
| Claims Processing Automation, FNOL to Settlement | Insurance - Claims | Mid-size P&C carrier | `/case-studies/claims-01-fnol-to-settlement` | [[Blueprints - Claims]] |
| Recovering What Was Overpaid and Never Reviewed | Insurance - Claims | Mid-size P&C carrier | `/case-studies/claims-02-claims-leakage` | [[Blueprints - Claims]] |
| A Million Unvetted Files Reach a System That Pays | Insurance - Claims | Mid-size P&C carrier | `/case-studies/claims-03-containment` | [[Blueprints - Claims]] |
| The Bad-Faith Exposure Hiding in Inconsistent Denials | Insurance - Claims | Mid-size P&C carrier | `/case-studies/claims-04-fair-handling` | [[Blueprints - Claims]] |
| Reading a Broker Submission the Moment It Arrives | Insurance - Underwriting | Mid-size commercial carrier | `/case-studies/uw-01-quote-in-minutes` | [[Blueprints - Underwriting]] |
| Underwriting Automation and the 70% Problem | Insurance - Underwriting | Mid-size commercial carrier | `/case-studies/uw-02-the-70-percent-problem` | [[Blueprints - Underwriting]] |
| Nobody Had Capacity to Write the Complex Book | Insurance - Underwriting | Mid-size commercial carrier | `/case-studies/uw-03-complex-commercial-specialty` | [[Blueprints - Underwriting]] |
| Defending a Price Two Years After It Was Set | Insurance - Underwriting | Mid-size commercial carrier | `/case-studies/uw-04-pricing-you-can-defend` | [[Blueprints - Underwriting]] |
| One Bad Automatic Order Eats a Week of Margin | Manufacturing (Industrial AI) | Discrete manufacturer, multi-plant | `/case-studies/mfg-01-order-checkpoint` | [[Blueprints - Manufacturing]] |
| An AI Agent for Procurement, Bounded by Mandate | Manufacturing (Industrial AI) | Manufacturer, indirect and tail spend | `/case-studies/mfg-02-negotiation-limits` | [[Blueprints - Manufacturing]] |
| Bad Work Orders Pull Crews and Parts You Don't Need | Manufacturing (Industrial AI) | Process manufacturer, continuous operations | `/case-studies/mfg-03-work-order-validation` | [[Blueprints - Manufacturing]] |
| The AI Drafted the Deviation, the 483 Lands on You | Manufacturing (Industrial AI) | Regulated manufacturer, GxP environment | `/case-studies/mfg-04-regulated-quality-evidence` | [[Blueprints - Manufacturing]] |
| HQ's AI Has Never Seen Your Line or Your Yields | Manufacturing (Industrial AI) | Regional plant of a global manufacturer | `/case-studies/mfg-05-in-country-runtime` | [[Blueprints - Manufacturing]] |
| Every Reschedule Bleeds Expedite Freight | Manufacturing (Industrial AI) | Discrete manufacturer, multi-line | `/case-studies/mfg-06-reschedule-expedite` | [[Blueprints - Manufacturing]] |
| Engineering Change Management That Stops Scrap | Manufacturing (Industrial AI) | Discrete manufacturer, automotive and aerospace | `/case-studies/mfg-07-engineering-change-gate` | [[Blueprints - Manufacturing]] |
| A Wrong Call on a Running Line Costs a Shift | Manufacturing (Industrial AI) | Process and discrete manufacturer | `/case-studies/mfg-08-line-decision-signoff` | [[Blueprints - Manufacturing]] |
| Your AI Pilot Is Frozen in Security Review | Manufacturing (Industrial AI) | Mid-size manufacturer, stalled pilot | `/case-studies/mfg-09-stalled-pilot-rescue` | [[Blueprints - Manufacturing]] |
| Price Leakage Commits Before Anyone Sees It | Manufacturing (Industrial AI) | Manufacturer, direct and indirect spend | `/case-studies/mfg-10-spend-before-commit` | [[Blueprints - Manufacturing]] |
| Reorders That Freeze Cash or Empty the Shelf | Manufacturing (Industrial AI) | Make-to-stock manufacturer, consumer goods | `/case-studies/mfg-11-replenishment-control` | [[Blueprints - Manufacturing]] |
| Catching the Escape Before It Becomes a Recall | Manufacturing (Industrial AI) | Discrete manufacturer, high-volume line | `/case-studies/mfg-12-inspection-escape` | [[Blueprints - Manufacturing]] |
| One Off-Switch for Every Vendor's Agents on the Factory Floor | Manufacturing (Industrial AI) | Manufacturer running multi-vendor agents | `/case-studies/mfg-13-agent-control-tower` | [[Blueprints - Manufacturing]] |

## Related
- Up: [[Case Studies]]
- [[Customer Stories]]: delivered stories (not modelled)
- [[Industries]]
- [[Industry - Financial Services]]
- [[Industry - Manufacturing]]
- [[Services]]
- [[Service - AI Agents]]
- [[Products]]
