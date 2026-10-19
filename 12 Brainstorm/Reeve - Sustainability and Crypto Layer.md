---
aliases:
  - Reeve Sustainability
  - Reeve Crypto Layer
  - Green Auditor
tags:
  - brainstorm
  - reeve
  - type/page
scraped: 2026-10-18
source: brainstorm session 2026-10-18
sources:
  - https://www.tempo.co/ekonomi/bi-tegas-melarang-kripto-digunakan-sebagai-alat-pembayaran--503762
  - https://www.bi.go.id/id/publikasi/ruang-media/news-release/Pages/sp_200418.aspx
  - https://pintu.co.id/academy/post/panduan-lengkap-regulasi-aset-crypto-di-indonesia-2026
  - https://www.inet99.id/2026/06/benarkah-stablecoin-resmi-jadi-alat.html
  - https://docs.0g.ai/developer-hub/building-on-0g/compute-network/overview.md
  - https://site-origin.0g.ai/blog/0g-private-computer
  - https://site-origin.0g.ai/blog/deepseek-v4-pro-live-on-0g-private-computer
up: "[[Reeve - Overview]]"
---

# Reeve - Sustainability and Crypto Layer

> [!summary] Summary
> - **Sustainable** (the "positive environmental impact" part, which Hackathon ITS asks for) is covered on three levels: **Energy SOP** (per-room electricity billing plus anomaly alerts), **Green Auditor** (carbon estimates from electricity and fuel bills, with receipts), and **efficient AI** (LLM at build time only, deterministic code at runtime, sandboxes auto-pause).
> - **Crypto as payment for Indonesian users is legally risky.** Bank Indonesia prohibits virtual currency as a means of payment. Since 20 Jan 2026, OJK supervises crypto as a digital asset (trading via licensed exchanges). Per secondary sources, UU 4/2026 lets stablecoins act as an "alat transaksi" with OJK approval, but **not as a legal means of payment**. *Verify with official BI/OJK texts.*
> - **Use crypto for proof, not payment:** on-chain receipt anchoring, agent identity (ERC-8004), and **0G TEE inference** (verifiable private LLM) for the Auditor. Crypto payment rails only for **international** agent-to-agent flows (x402/stablecoin), after legal review.

## Part A: Sustainability

### Level 1: Energy SOP (the demo bridge)

A real local energy problem in kos and boarding houses:

| SOP / rule type | Example |
|---|---|
| Rule | Split the electricity bill per room by meter or token reading; add it to the monthly invoice |
| Rule | When a room's prepaid token drops below a threshold → notify the tenant; within the mandate, buy a token (PPOB) |
| KPI monitor | Room usage > 2× the building average for 3 days → alert the owner ("AC left on? leakage?") |
| Constraint | Common-area lights off 00:00–05:00 (needs smart plugs or relays connected) |
| Auditor | Verifies savings claims: kWh before vs after a rule change, with receipts |

Fits the Hackathon ITS checklist: *Define the energy gap*, *Efficiency gains* (energy, time, cost), *Local impact*, *Co-design with the community* ([[Competitions for Reeve]]).

### Level 1b: Sustainable SOPs beyond electricity

The pattern is the same everywhere: **Rule** (prevent waste) + **KPI monitor** (measure waste) + **Auditor receipt** (prove the saving). The main data sources (bills, Sheets, POS/stock exports) need no IoT. IoT only makes it more precise.

| Domain / SME | Waste it targets | Rule (Builder) | KPI monitor | Auditor proof | Data source |
|---|---|---|---|---|---|
| **Water** (kos, laundry, car wash) | Leaks, overuse | Split the PDAM bill per unit; laundry: water per kg cap | Night-time usage or a sudden jump vs average → leak alert | m³ before/after a fix | PDAM bill (PPOB inquiry), meter photo/Sheets; flow meter optional |
| **Food waste** (F&B, catering, bakery) | Overproduction, spoilage | FIFO / first-expiry-first-out; order quantity from the last 4 weeks of sales; surplus before closing → discount or donate to a food bank | Waste % (kg wasted ÷ kg produced) | kg waste and Rp saved per month, receipts | POS export, stock sheet, end-of-day waste log (form) |
| **Expiry stock** (minimarket, pharmacy/apotek, cosmetics) | Expired, disposed goods | Auto-markdown at H-30 / H-14 before expiry; stop reordering slow movers | Value of stock expiring in 30 days | Rp of avoided write-offs | Stock + expiry data (Sheets/POS) |
| **Inventory overstock** (retail, distributors) | Dead stock, wasted storage | Reorder point from demand, not habit; supplier lead time in rules | Days of inventory, dead-stock value | Before/after stock value | Stock system / Shopify / Sheets |
| **Delivery and logistics** (catering, laundry pickup, distributors) | Fuel, empty trips | Batch orders by area and time window; minimum load per trip | km or fuel per order; empty-trip count | Litres of fuel → CO2e saved | Fuel receipts, order addresses, courier API |
| **Packaging** (online sellers) | Excess / single-use packaging | Packaging size by product; reuse inbound boxes; prefer recycled packaging suppliers (constraint) | Packaging cost and kg per order | Kg packaging per order trend | Purchase invoices, order count |
| **Green / local procurement** (any SME) | Long supply chains | Constraint: prefer suppliers within X km or certified; quote rule for big purchases | Share of local or green spend | Spend breakdown with receipts | Purchase invoices, supplier list |
| **Hazardous waste** (workshop/bengkel, salon, clinic, laundry chemicals) | Illegal dumping (used oil, chemicals) | Every disposal must go to a **licensed collector** with a manifest; storage limit before pickup | Litres stored vs limit; missing manifests | Compliance receipts per pickup | Disposal log, collector manifests *(check the B3 waste regulations before claiming compliance)* |
| **Paper** (any SME, schools, clinics) | Printing | Digital invoices, receipts and approvals by default | Pages avoided | Count of digital docs | Reeve's own logs |
| **Equipment maintenance** (kos AC, kitchens, vehicles) | Energy loss from dirty or worn equipment | Service schedule (e.g. AC cleaning every 3 months) as a rule | Overdue maintenance count; energy per unit after service | kWh/fuel before vs after service | Service log + bills |

**Best picks for the demo (no IoT needed, strong story):**
1. **Water + electricity for kos**: same tenant data as the billing demo, so it extends the existing scenario; bills are `measured`.
2. **Expiry stock for minimarket/apotek**: direct money savings plus less waste; POS/stock data is `measured`.
3. *Food waste is an **add-on feature, not core** (user decision 18 Oct 2026): leftovers are hard to verify. See [[Reeve - Sustainability Summary and SDGs#2b. Measuring food waste (add-on, not core)]].*

### Level 1c: More environmental angles (beyond waste prevention)

| Angle | Environmental impact | Reeve SOP (rule / KPI / proof) | Data source | Caution |
|---|---|---|---|---|
| **Used cooking oil (minyak jelantah) → collectors** (F&B, catering, fried-food stalls) | Keeps UCO out of drains and soil; feedstock for biodiesel | Rule: store UCO, schedule pickup at X litres with a registered collector, record price received. KPI: litres diverted per month. Proof: pickup receipts | Pickup log via WA bot, collector receipts | Use legitimate collectors; avoid UCO being resold as cooking oil |
| **Bank sampah / recyclables sale** (any SME, kos, offices) | Waste diverted from landfill | Rule: sort cardboard/plastic/metal; sell to a bank sampah when stock hits a threshold. KPI: kg diverted, Rp earned | Bank sampah slips, weight log | Price and weight receipts needed for proof |
| **Returnable packaging / deposit** (galon, catering boxes, crates, rental cutlery) | Less single-use packaging | Rule: deposit per container; reminder when not returned in N days; refund on return. KPI: return rate, containers lost | Delivery and return log, customer list | The deposit is money: handle it through the normal billing rail |
| **Rooftop solar (PLTS atap) monitoring** (kos, small factories, shops with solar) | Keeps clean generation high; detects faults | KPI: kWh produced vs expected (irradiance/season); alert on drops (dirty panels, inverter fault); rule: cleaning/maintenance schedule. Proof: kWh produced, CO2e avoided | Inverter app/API, PLN export/import bill | Inverter API access varies by brand |
| **EUDR / traceability for exporters** (coffee, cocoa, palm oil, rubber, wood SMEs and cooperatives) | Proves deforestation-free supply | Rule: every purchased lot needs farm ID + geolocation + date; block shipments with missing data. Proof: due-diligence dossier per shipment, anchored | Farmer/cooperative purchase records, GPS of plots | *EU Deforestation Regulation dates and SME obligations have changed repeatedly; verify the current timeline* |
| **Green-loan readiness** | Lets SMEs access sustainability-linked financing | Monthly verified reports (energy, waste, CO2e) packaged for a lender | Receipts from the other SOPs | *Which Indonesian banks offer green MSME loans is unverified* |
| **Carbon credit aggregation** (many SMEs' verified savings pooled) | Monetises reductions | Auditor-verified savings + anchored receipts as an MRV base | Pooled receipts | **Heavily regulated** (registry, MRV methodology, carbon-exchange rules). Treat Reeve's data as supporting evidence, not as credits |
| **Small-industry wastewater** (batik dyeing, tofu/tempe makers, laundry) | Less polluted water discharge | Rule: treatment step and log before discharge; disposal schedule. KPI: volume treated vs produced | Production log, treatment log, permit data | *Environmental permit rules must be checked* |
| **Cold-chain spoilage** (fish, meat, dairy, pharmacy) | Less spoiled food and medicine | Rule: temperature thresholds → alert and corrective action; FIFO. KPI: spoilage kg | Fridge temperature sensors or manual checks | Sensors make it reliable |
| **Fleet electrification readiness** (delivery motorbikes) | Lower emissions | KPI: fuel cost per km vs an EV equivalent; a report on when switching pays off | Fuel receipts, trip km | Estimates only (`estimated` label) |

**Strongest additions for Indonesia (local + measurable + revenue for the SME):**
1. **Minyak jelantah → collectors.** Very common in F&B, has an income angle, easy to log.
2. **Bank sampah / recyclables.** Community-based (fits "co-design with the community"), with clear kg receipts.
3. **Rooftop solar monitoring.** A direct energy story for the ITS "energy gap" checklist.

### How Reeve gets the data (data acquisition ladder)

Use the highest rung the SME already has. During Phase 1 (Compile), the Builder asks "where does this number live?" and either picks a connector or **generates a lightweight capture form/bot** for missing data.

| Rung | Source | Examples | Data obtained | Connector |
|---|---|---|---|---|
| 1. Already digital | POS, accounting, marketplace **seller** APIs, couriers, spreadsheets | POS (Moka, Majoo, Pawoon, Olsera; Loyverse/Square/Shopify in Composio), Jurnal/Accurate, Shopee Open Platform / TikTok Shop–Tokopedia seller APIs, Biteship/courier APIs, Google Sheets | Sales per item, stock and expiry, purchases, orders and addresses, delivery km | Composio where available (Sheets, Shopify, Square, Loyverse); otherwise the vendor's API in the broker. *Indonesian POS/marketplace API access is unverified; partner approval is often required* |
| 2. Bills and documents | Utility bills, supplier invoices, fuel receipts, disposal manifests | PPOB inquiry (PLN/PDAM amounts), invoice emails (Gmail/Outlook via Composio), photos of receipts and meters | kWh, m³, litres, Rp, kg, dates | PPOB API; email parsing; OCR/extraction in the sandbox |
| 3. Lightweight human capture | Staff log a few numbers | WhatsApp/Telegram bot ("buang 3 kg nasi", "meter 1234"), a 10-second web form, a QR code on the waste bin linking to the form, a weekly meter photo | Waste kg, meter readings, disposal events | WhatsApp/Telegram via Composio; the form is generated by the Builder |
| 4. Sensors (optional) | IoT | Smart plugs/meters (e.g. Tuya), water-flow sensors, fridge temperature sensors | Continuous kWh, flow, temperature | Vendor API in the broker *(not in Composio)* |
| 5. Reference data | Public factors | Official grid emission factor (KESDM), fuel emission factors | Conversion to CO2e | Static table with cited sources |

**Data trust (the Auditor labels every number):**

| Label | Meaning | Example |
|---|---|---|
| `measured` | From a system, bill or sensor | PLN kWh from the bill, POS sales |
| `reported` | Entered by a person | Waste kg via the WA bot |
| `estimated` | Derived with a factor or model | CO2e from kWh × emission factor |

- The Auditor flags gaps (missing days), outliers (10× jumps) and inconsistencies (waste > production). Reports show the share of `measured` vs `reported`.
- Receipts record the source type and file hash. Data stays in the sandbox ("code goes to data"). Only aggregates and hashes are anchored on-chain.

**Example (add-on feature): food waste at a catering SME**
1. POS/Sheets → portions sold per menu item (rung 1).
2. Supplier invoices via email → kg of ingredients bought (rung 2).
3. Kitchen staff send the end-of-day leftovers to the WA bot: "nasi 3kg, ayam 1kg" (rung 3).
4. The Builder's rule sets tomorrow's order from 4-week sales; the KPI tracks waste % (wasted ÷ produced).
5. The Auditor issues a monthly receipt: kg and Rp saved, labelled measured/reported, anchored on-chain.

### Level 2: Green Auditor (carbon receipts)

- The Auditor reads electricity (kWh), fuel and delivery bills and computes **estimated CO2e** with the **official Indonesian grid emission factor** (use the KESDM/ministry figure and cite it; do not hard-code an unsourced number).
- Output: a monthly **emissions report plus receipts** (code hash + data hash + result), so a buyer or bank can re-verify it.
- Why SMEs care: large companies and lenders increasingly ask suppliers for sustainability data. *Hypothesis to validate with real SMEs; cite regulations such as OJK sustainable-finance rules only after checking them.*
- Same engine, new mode: **Green mode** next to Audit and Diligence ([[Reeve - Auditor Design]]).

### Level 3: Efficient AI by design

- **LLM only at build time.** Runtime is deterministic code, with no LLM call per transaction, so inference energy is far lower than an "agent loop on every event" design ([[Reeve - Connectors and Composio#MCP: build time vs runtime]]).
- **Sandboxes auto-pause or are destroyed** after each job, so there is no idle compute.
- Paperless invoices and receipts.
- Measurable claim for the pitch: "LLM calls per month per SOP" vs a naive agent. *Measure it in the MVP; don't claim numbers before measuring.*

### Sustainable: the final map

| Principle text | Reeve |
|---|---|
| "Solusi yang bertahan lama" | Maintained SOPs, recurring business model, generic engine |
| "Dampak positif bagi lingkungan" | Waste-prevention SOPs (energy, water, food, expiry stock, logistics, packaging, hazardous waste), Green Auditor (verifiable CO2e and waste receipts), efficient AI by design |

## Part B: Crypto layer

### Indonesian regulatory reality (as found 18 Oct 2026)

- **Bank Indonesia:** virtual currency, including bitcoin, is not recognised as a legal means of payment and is **prohibited as a means of payment** in Indonesia. Rupiah is the only legal tender. (Tempo; BI press release; some sources are from 2019–2021.)
- **OJK:** since **20 Jan 2026**, OJK fully regulates, licenses and supervises crypto platforms; BI keeps the payment-system role (Pintu Academy, a private guide).
- **UU 4/2026 on stablecoins (secondary sources):** stablecoins get a legal category and may be used as an "alat transaksi" after exchange recommendation and OJK approval, but **not as a legal means of payment**; the elucidation of Art. 213 is cited (inet99, Pintu).
- ⚠️ Official texts (JDIH, OJK, BI) were not retrieved. **Get legal review before any crypto money flow.**

**Implication:** "young users pay Indonesian businesses in crypto" is **not a safe feature**. Young crypto holders can sell on an OJK-licensed exchange to rupiah, then pay via QRIS/VA. That keeps Reeve outside the payment prohibition.

### Where crypto adds real value: proof, not payment

| Crypto component | Use in Reeve | Money moved? |
|---|---|---|
| **Receipt anchoring** (daily Merkle root on Monad/Base) | Third parties verify audit, carbon and payment receipts weren't altered ([[Reeve - Architecture and Stack#Web2 vs Web3]]) | No |
| **ERC-8004 agent identity / reputation** | Public identity and track record for Reeve's Auditor when it is sold as a service to other companies or agents ([[Monad Tools Evaluation]]) | No |
| **0G TEE inference** (verifiable private LLM) | The Auditor and Builder can call an LLM whose inference runs inside a hardware enclave and is signed, which strengthens "nobody sees your data" | No (pays 0G for compute) |
| **Mera passkeys** | Already in the design (vault, mandates, approvals); Web2-usable | No |
| **x402 / stablecoin** (international only) | External agents paying Reeve's Auditor endpoint per call; cross-border | Yes, so legal review needed; not for Indonesian customers |

### 0G TEE inference: what was found

- **0G Private Computer** (0G blog, Apr 2026): an OpenAI-compatible endpoint with requests run inside TEEs, live at `pc.0g.ai`. Migration is mainly a base-URL swap.
- **Two attestation types** (0G blog, May 2026):
  - **TeeML** covers the inference itself (the operator cannot read the prompt).
  - **TeeTLS** covers only the routing path to an upstream provider. E.g. DeepSeek V4 Pro on 0G runs inference at Alibaba Bailian, so the prompt *is* processed by the upstream.
  - **For Reeve's privacy claim, use TeeML-attested models only.**
- 0G Compute docs: a decentralised GPU marketplace; "cryptographic proofs ensure computation integrity"; providers offer TEE verification and OpenAI-compatible endpoints.
- Gaps: the current Private Computer API docs and attestation-verification steps were not retrieved. Supported models and pricing are unverified.

**Fit with "code goes to the data":** the LLM still only sees rules, schemas and synthetic samples. 0G TEE adds a second guarantee: even that prompt is processed in an enclave with a signed attestation. Combined with sandbox egress lock and receipts, this gives a **fully proofable chain**: prompt (TEE attestation) → code (hash) → run (sandbox receipt) → result (anchored root).

### Built: receipt anchoring (19 Oct 2026)

`reeve/packages/anchor`:
- **What goes on chain:** the ledger's Merkle root, as a zero-value transaction from Reeve's anchor wallet to itself. The data is `REEVE1` + the 32-byte root + the receipt count. No contract to deploy, and anyone can check it on the explorer.
- **Chains:** Monad testnet (10143) or Base Sepolia (84532). Mainnets are refused for now.
- **Wallet:** `npm run anchor:wallet` creates a testnet wallet in `reeve/.env` and prints only the address; the key is never shown.
- **Publishing:** `npm run anchor:now` or `POST /api/ledger/anchor` publishes the root and records the transaction in the ledger. `GET /api/ledger/anchors/:seq/verify` checks the root against both the receipts and the chain.
- **Status: verified live on Monad testnet (19 Oct 2026).**
  - The root over 23 receipts went into tx `0x6f1938309dd62f2583ab5aafaaa0feea344e2b24e949655495cc3ce9a6ea3c39` (block 72355956), recorded at ledger #44, and was read back from the chain (check OK).
  - The wallet is the owner's Monad deployer wallet, used here on testnet only. A dedicated Reeve wallet would be safer long term.

### Recommended positioning

1. **Decision (18 Oct 2026, user): the crypto proof layer is built now, not on a roadmap.** Receipt anchoring, 0G TeeML inference and ERC-8004 Auditor identity are part of the core product and demo. Payments stay in rupiah rails.
2. **Indonesian production:** payments in rupiah via Stripe/Xendit/Midtrans ([[Reeve - Payment Rails Indonesia]]); crypto only for proof (anchoring, identity, TEE attestations).
3. **Web3 competitions / grants** (e.g. 0G or Monad ecosystems): lead with the **proofable chain** (TEE inference + receipts on-chain + agent identity) and the Green Auditor's verifiable carbon receipts.

## Related
- Up: [[Reeve - Overview]]
- [[Reeve - Sustainability Summary and SDGs]]: final summary, Green Rewards, green-loan bridge, SDGs
- [[Reeve - Auditor Design]] · [[Reeve - Architecture and Stack]] · [[Reeve - Payment Rails Indonesia]] · [[Monad Tools Evaluation]]
- [[Competitions for Reeve]]: Hackathon ITS principles (Sustainable, AI Driven, Innovative, Local)

### Anchor verified live (19 Oct 2026)

The ledger's Merkle root went on **Monad testnet**:
- Root `d32f420c…` over 23 receipts.
- Transaction `0x8e90074fbbd1bc0369fc6c2dff9a1e5e11f9ccfaa0c8fd3a4a3c0c3513d7a432`, block 72416609: https://testnet.monadexplorer.com/tx/0x8e90074fbbd1bc0369fc6c2dff9a1e5e11f9ccfaa0c8fd3a4a3c0c3513d7a432
- Ledger entry #45. Reeve read the transaction back from the chain and the root matched.
- Proof only: a zero-value transaction to itself, no payment, no contract.
