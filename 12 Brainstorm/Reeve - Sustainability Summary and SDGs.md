---
aliases:
  - Reeve SDGs
  - Green Rewards
tags:
  - brainstorm
  - reeve
  - type/page
scraped: 2026-10-18
source: brainstorm session 2026-10-18
sources:
  - https://infobanknews.com/kredit-hijau-bca-tumbuh-19-persen-jadi-rp123-triliun-pada-semester-i-2026
  - https://moneter.id/kredit-bca-tembus-rp994-triliun-di-kuartal-i-2026-ditopang-umkm-dan-sektor-hijau/
  - https://youngster.id/headline/industry-headline/kinerja-kredit-bca-maret-2026-sektor-hijau-tumbuh/
  - https://www.industry.co.id/read/154031/bca-tawarkan-kredit-umkm-bunga-mulai-581-genjot-pembiayaan-jelang-umkm-fest-2026
  - https://kilasjatim.com/2026/10/08/bca-dorong-umkm-naik-kelas-kredit-umkm-tembus-rp1346-triliun/
up: "[[Reeve - Sustainability and Crypto Layer]]"
---

# Reeve - Sustainability Summary and SDGs

> [!summary] Summary
> - The final set of sustainability innovations aligned for Reeve, the **data-trust rule** that keeps manipulation in scope, the **Green Rewards** mechanism (discounts and cashback for meeting KPIs), the **green-loan bridge** (BCA findings), and the **SDG mapping**.
> - **Scope rule:** rewards and green reports count **only `measured` data** (bills, PPOB, POS, invoices, couriers, inverter APIs). `reported` data (manual entries) is shown but never rewarded. This avoids building an anti-fraud system.
> - SDGs covered: **6, 7, 8, 9, 11, 12, 13, 15** (12 and 7 are the core).

## 1. Aligned sustainability innovations

| # | Innovation | What Reeve does | Data trust |
|---|---|---|---|
| 1 | **Energy SOP** (kos, shops) | Per-room electricity billing, token top-up via PPOB, anomaly alerts, AC maintenance schedule | `measured` (PLN bill / token purchases / PPOB) |
| 2 | **Water SOP** | PDAM bill split, leak/overuse alerts | `measured` (PDAM bill) |
| 3 | **Rooftop solar (PLTS) monitoring** | kWh produced vs expected, fault alerts, cleaning schedule | `measured` (inverter API, PLN export/import) |
| 4 | **Food-waste prevention** (F&B, catering): ***add-on, not core*** | Order quantities from sales history, FIFO, surplus discount or donation | Purchases and sales `measured` (POS, invoices); leftovers `reported`. **Not part of the core pitch or rewards by default**, because verified data is hard to get |
| 5 | **Expiry and overstock control** (minimarket, apotek, retail) | Markdowns before expiry, reorder from demand | `measured` (POS/stock system) |
| 6 | **Delivery batching** | Group orders by area and time window, minimum load per trip | `measured` (fuel receipts, courier API, order addresses) |
| 7 | **Packaging reduction and returnables** | Right-sized packaging, deposits for returnable containers | `measured` (purchase invoices, return log tied to billing) |
| 8 | **Minyak jelantah → collectors** | Store UCO, scheduled pickup, record income | `measured` when the collector issues a receipt |
| 9 | **Bank sampah / recyclables** | Sort and sell at thresholds | `measured` when bank sampah slips are used |
| 10 | **Green / local procurement** | Prefer local or certified suppliers (constraint) | `measured` (invoices + supplier list) |
| 11 | **Hazardous waste (B3) and wastewater logs** | Licensed collector + manifest; treatment log | `measured` (manifests) *(regulation check needed)* |
| 12 | **Green Auditor (CO2e and waste receipts)** | Converts measured kWh, fuel and waste into CO2e/kg with official factors; monthly verifiable report, anchored on-chain | Inherits the input labels; result `estimated` |
| 13 | **EUDR traceability** (commodity exporters) | Lot-level farm ID + GPS + date; shipment dossier | `measured` (purchase records) *(timeline to verify)* |
| 14 | **Efficient AI by design** | LLM only at build time; deterministic runtime; sandboxes auto-pause | `measured` (Reeve's own logs) |
| 15 | **Green Rewards** | Discounts or cashback for meeting KPIs (see §3) | Only `measured` KPIs |
| 16 | **Green-loan readiness** | Lender-ready packs of verified KPIs (see §4) | Only `measured` KPIs |

## 2. Data manipulation: keep it in scope

User concern: manual data is easy to fake, and proving authenticity becomes complex and out of scope.

Decision: **don't build fraud detection.** Use a simple trust rule instead:

| Rule | Effect |
|---|---|
| Only **`measured`** data (third-party documents/systems: bills, PPOB, POS, invoices, courier and inverter APIs, collector receipts) counts for **rewards, green reports and lender packs** | Manipulation requires faking third-party records, which is outside Reeve's responsibility |
| **`reported`** data (WA bot, forms) is shown for operations and coaching, **never rewarded** | No incentive to fake |
| The Auditor runs only **cheap consistency checks** already in the design: missing days, 10× jumps, mass-balance sanity (waste ≤ purchases) | Flags, not accusations |
| Every number keeps its **source file hash** in the receipt; the daily root is anchored on-chain | Data can't be silently changed afterwards (it proves integrity after capture, not truth at capture) |
| **On-chain anchoring stays mandatory** (user decision 18 Oct 2026) as the **track record**: an append-only, timestamped history of every KPI period, reward and report | Anyone (lender, buyer, judge) can verify the full history and that nothing was back-dated or rewritten |

## 2b. Measuring food waste (add-on, not core)

> [!note] Decision (18 Oct 2026)
> Food waste is an **optional add-on feature**, not part of Reeve's core. Getting truly verified leftover data is hard, so it is excluded from the core pitch, the Green Rewards and lender packs unless a business has `measured` sources (C: third-party receipts, or D: a connected scale).

Ranked by trust. If used, rewards use only the `measured` methods.

| Method | How | Label | Notes |
|---|---|---|---|
| **A. Mass balance** (primary, no new hardware) | `waste ≈ ingredients bought − ingredients in sold portions − Δ stock`. Bought = supplier invoices (kg). Sold = POS sales × recipe/BOM grams per portion. Δ stock = opening − closing stock | `measured` (invoices + POS); the recipe/BOM is declared once and audited | Gives "unaccounted loss" (waste plus spoilage, theft, over-portioning). Good enough as the KPI; compare against the business's own baseline |
| **B. Unsold portions** | `unsold = portions produced − portions sold` × portion weight. Production count from the POS/production log, sold from the POS | `measured` if production is recorded in the POS; else `reported` | Best for catering, bakery, buffets, ready meals |
| **C. Third-party receipts** | Surplus sold or donated through a partner (food bank, surplus-food apps), or food waste weighed by a collector (compost, BSF maggot farms) | `measured` (partner receipt) | Also proves *diversion*, not just measurement |
| **D. Direct weighing** | A digital scale at the bin; a connected scale (API), or a timestamped photo of the scale display | Connected scale = `measured`; photo = `reported` | Most accurate per item; needs staff discipline |
| **E. Photo + vision estimate** | Photo of leftovers; a model estimates kg | `estimated` | Coaching only, never rewarded |

**Recommended KPI (catering example):**

```text
waste_rate = (kg_bought − kg_in_sold_portions − Δstock_kg) / kg_bought
target: waste_rate ≤ baseline_3_months × 0.8   (−20%)
reward only if inputs are measured (invoices + POS) and data completeness ≥ 90% of days
```

- The Auditor checks: completeness (days with POS data), recipe/BOM changes (versioned and receipted), and that results are not negative (mass-balance sanity).
- Each monthly result is a receipt anchored on-chain, forming the track record.

## 3. Green Rewards (instead of trading carbon credits)

The user's idea: turn the "carbon credit aggregation" angle into **discounts or cashback for good performance**.

- **What it is:** a Reeve loyalty/reward programme. When a business meets its **measured** sustainability KPIs (e.g. kWh per room down 10% vs its 3-month baseline, food waste % below target, solar output ≥ 90% of expected), it earns:
  - a **discount** on the next Reeve subscription, or
  - **cashback as Reeve credits** (non-refundable, non-transferable, usable only for Reeve services).
- **Funding options:** (a) Reeve's own marketing budget; (b) **partner-funded** by a lender, utility, supplier or brand that wants verified green SMEs (e.g. a bank offering a better rate; see §4).
- **Why not real carbon credits:** issuing or trading carbon credits needs registries, approved MRV methodologies and exchange rules. Rewards avoid that. Aggregated, anchored savings can still serve as **supporting evidence** if a business later joins a formal carbon programme.

> [!warning] Keep rewards compliant
> - Cashback as **service credits** (non-cash, non-transferable) avoids e-money issues ([[Reeve - Payment Rails Indonesia]] §10).
> - Rewards depend only on `measured` KPIs (§2).
> - Never market the rewards as "carbon credits" or "offsets".

## 4. Green-loan bridge (BCA findings, 18 Oct 2026)

- **BCA green financing** reached **Rp123 trillion in H1 2026 (+19% YoY)**, reported at the semester I press conference on 28 Jul 2026 (Infobank).
- Q1 2026: green lending Rp113 trillion (+7.7% YoY); renewable-energy lending +53.5% YoY; sustainable-sector lending Rp258.4 trillion = **26.0%** of the loan book (moneter.id / youngster.id).
- **BCA SME lending:** Rp134.6 trillion in H1 2026 (+6% YoY). The highlighted SME programme (KMU Hari UMKM 2026, from 5.81% p.a., 1 Jul 2026 – Jan 2027) is **conventional, not green**.
- **Not found:** a dedicated BCA green or sustainability-linked loan product for MSMEs. *Check BCA's sustainability report or contact BCA directly.*

**The opportunity:** BCA is clearly growing green lending, but the search shows no MSME-specific green product, and SMEs lack verified data. Reeve's **lender pack** fills the data gap:
- monthly `measured` KPIs (energy, water, waste, solar, CO2e) with receipts and on-chain anchors;
- a natural fit for a **sustainability-linked** structure: rate step-down when KPIs are met. That is exactly the Green Rewards logic, funded by the lender.
- Pitch angle: *"Reeve makes MSMEs green-loan-ready with verifiable data."* Partnership is a business-development step, not a technical one.

## 5. SDG mapping

| SDG | Target(s) | Reeve innovations |
|---|---|---|
| **SDG 6** Clean water and sanitation | 6.3 water quality / wastewater; 6.4 water-use efficiency | Water SOP (#2), wastewater logs (#11) |
| **SDG 7** Affordable and clean energy | 7.2 renewables share; 7.3 energy efficiency | Energy SOP (#1), PLTS monitoring (#3), efficient AI (#14) |
| **SDG 8** Decent work and economic growth | 8.2 productivity through technology; 8.3 MSME growth and formalisation; 8.10 access to financial services | SOP automation for MSMEs (core Reeve), green-loan readiness (#16) |
| **SDG 9** Industry, innovation and infrastructure | 9.3 small enterprises' access to financial services and credit; 9.4 cleaner, resource-efficient processes | Lender packs (#16), process efficiency (#4–#7) |
| **SDG 11** Sustainable cities and communities | 11.6 municipal waste management | Bank sampah (#9), UCO collection (#8) |
| **SDG 12** Responsible consumption and production | 12.3 halve food waste; 12.5 reduce waste through prevention, reduction, recycling and reuse; 12.6 sustainability reporting by companies Expiry/overstock (#5), food waste (#4, add-on), packaging and returnables (#7), UCO (#8), recyclables (#9), hazardous waste (#11), Green Auditor reports (#12) |
| **SDG 13** Climate action | 13.2 integrate climate measures into planning | Green Auditor CO2e (#12), delivery batching (#6), Green Rewards (#15) |
| **SDG 15** Life on land | 15.2 halt deforestation | EUDR traceability (#13) |

**Primary SDGs for the pitch:** **12** (waste and reporting) and **7** (energy), backed by **8/9** (MSME growth and access to finance) and **13** (climate).

## Related
- Up: [[Reeve - Sustainability and Crypto Layer]]
- [[Reeve - Auditor Design]] · [[Reeve - Payment Rails Indonesia]] · [[Competitions for Reeve]] · [[Reeve - Executive Summary]]
