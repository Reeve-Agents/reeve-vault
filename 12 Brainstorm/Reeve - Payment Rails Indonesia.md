---
aliases:
  - Payment Rails Indonesia
  - Stripe vs Xendit Midtrans
tags:
  - brainstorm
  - reeve
  - type/page
scraped: 2026-10-18
source: https://stripe.com/global
sources:
  - https://stripe.com/global
  - https://docs.xendit.co/llms.txt
  - https://docs.xendit.co/docs/payout-coverage-indonesia.md
  - https://docs.xendit.co/docs/batch-payouts
  - https://docs.xendit.co/docs/product-overview-3
  - https://docs.midtrans.com/llms.txt
  - https://docs.midtrans.com/reference/accept-payout
  - https://docs.midtrans.com/docs/multi-layer-approval
  - https://docs.midtrans.com/docs/disbursement-overview
  - https://shopee.co.id/inspirasi-shopee/begini-cara-bayar-shopee-paylater-dengan-mudah-dan-cepat/
  - https://www.tokopedia.com/help/article/cara-bayar-dengan-danamon-virtual-account
  - https://finance.detik.com/moneter/d-7300294/8-cara-bayar-virtual-account-mandiri-yang-mudah-dan-praktis
up: "[[Reeve - Agent Payments]]"
---

# Reeve - Payment Rails Indonesia

> [!summary] Summary
> - **Can Reeve pay automatically?** Yes, in two directions. **Collecting** from customers: automatic invoices, payment links, auto-charge of saved methods, reconciliation. **Paying** on the business's behalf: suppliers, bills, electricity tokens, but only within a Mera mandate and with a passkey for irreversible payments.
> - **Stripe in Indonesia:** stripe.com/global lists Indonesia as **"Preview"** (checked 18 Oct 2026), so access is limited. Stripe Projects paid tiers also exclude `ID`. Local payment habits (QRIS, virtual accounts, e-wallets) are better served by local gateways.
> - **Decision: no migration, use an abstraction.** Keep Stripe for the hackathon (sponsor, test mode). Add a **Payment Rail Adapter** layer so production in Indonesia can plug in a local gateway (e.g. Xendit or Midtrans) without touching the core.
> - **Reeve never holds money.** It instructs a licensed payment gateway on the owner's own account.
> - **Xendit/Midtrans can't replace Stripe 100%.** They cover local collection, subscriptions, payouts and approval (Midtrans has native Creator/Approver + OTP), but have **no MPP / HTTP 402**, no SPT and no Stripe Projects (§5).
> - **HITL in two layers:** Reeve mandate + passkey, then gateway approval (OTP/PIN) above a threshold. The broker holds only the Creator key (§6).
> - **Third-party bills** (VA, e-wallet, PPOB) can be auto-paid from a prefunded business balance. Shopee/Tokopedia need **one tap from the user** to generate the VA (§7, §9).
> - **Built 18 Oct 2026:** Stripe (Invoicing) and Xendit (Payment Sessions) adapters, test mode only, with the Operator billing what the approved rules decide (§11). Both verified live in test mode on 19 Oct 2026.
> - **Routing by who pays:** Stripe for the demo, international customers and MPP. Xendit/Midtrans for Indonesia. Agents spend from Reeve credits; watch the **e-money regulation** (§10).

## 1. Can Reeve pay automatically?

### Collecting from customers (incoming)

| Capability | Example |
|---|---|
| Automatic invoices per SOP | On the 1st, 30 tenants get invoices with payment links |
| Reminders and late fees | Day+3 reminder, day+7 fine |
| Auto-charge of a saved method | Tenant opts in to auto-debit (card / e-wallet linking / direct debit, depending on the rail) |
| **Virtual account per customer** (common in Indonesia) | Each tenant has a fixed VA; payments reconcile automatically to the right person |
| Reconciliation | Webhook "paid" → ledger updated → receivable closed |

### Paying on the business's behalf (outgoing)

| Capability | Example | Guardrail |
|---|---|---|
| Pay suppliers | Monthly payment to the laundry or cleaning service per contract | Within the mandate (amount, recipient whitelist) |
| Pay bills / buy electricity tokens | Buy a PLN token for a room's meter when it runs low | Mandate per category + per-month limit |
| Refunds / payouts | Refund a double payment | Always a passkey (irreversible) |
| Agent tool subscriptions | Builder needs a DB or monitoring | Purchase request + passkey ([[Reeve - Agent Payments]]) |

Rules:
- Within a signed mandate, payments run automatically. Outside it, the Owner is prompted for the passkey ([[Reeve - Credential Broker and Mera]]).
- The Auditor checks every payment against the rules and the mandate, and leaves a receipt.
- **Reeve is not a payment provider.** Money moves only through a licensed gateway, on the owner's own account. Reeve sends instructions through the broker and never holds funds. This keeps Reeve out of payment-licensing scope; *verify the regulatory position with Bank Indonesia rules before production.*

## 2. Stripe in Indonesia: the facts

- **Stripe account availability:** Indonesia is marked **"Preview"** on https://stripe.com/global (18 Oct 2026). Opening a full account may need an invitation or have limits.
- **Stripe Projects paid tiers:** not available to `ID` ([[Plan Constraints - Free vs Beginner]]).
- **Stripe MPP live mode:** SPTs are for the US and a list of countries; stablecoins are US-only outside an access request. Test mode works ([[Reeve - Agent Payments]]).
- **Local payment habits:** Indonesian customers mostly pay with QRIS, bank virtual accounts, e-wallets (GoPay, OVO, DANA, ShopeePay) and retail outlets. Local gateways cover these natively. *Which of these Stripe supports for Indonesia in Preview is unverified.*

## 3. Migrate or not?

**No migration. Abstract the payment rail instead.**

Most of Reeve has nothing to do with Stripe:

| Layer | Stripe-dependent? |
|---|---|
| Builder (SOP → code + tests), Auditor (mutation tests, receipts) | No |
| CreateOS sandbox, egress allowlist | No |
| Broker, Mera vault, mandates, passkeys | No |
| Composio connectors | No (Stripe is just one toolkit) |
| **Billing actions** (invoice, reminder fee, refund, payout, webhooks) | **Yes**, behind an adapter |
| **Simulation** (Stripe test clocks) | Yes today; replace with Reeve's own simulated clock to make it rail-agnostic |
| Stripe Projects (provisioning the stack) | Provisioning only, not payments. Free tiers still work |
| Stripe MPP (agents paying/getting paid per call) | Yes; optional, and x402 can be a second rail |

### Payment Rail Adapter

```text
Reeve core (Builder / Auditor / Operator)
        │  calls a rail-neutral interface
        ▼
PaymentRail: create_invoice · add_line(fee) · send_reminder · charge_saved_method
             · create_virtual_account · refund · payout · on_event(paid|failed|expired)
        │
        ├── StripeAdapter   (hackathon: test mode, test clocks, webhooks, MPP)
        ├── XenditAdapter   (production ID: VA, QRIS, e-wallet, disbursement)  [planned]
        └── MidtransAdapter (production ID alternative)                         [planned]
```

- Generated SOP code calls `PaymentRail.*`, not Stripe directly. Switching rails = switching adapters plus config.
- The broker holds the gateway keys exactly as it holds Stripe keys today. The egress allowlist changes from `api.stripe.com` to the gateway's domain.
- **Composio has no Xendit, Midtrans, DOKU or Flip toolkit** (directory checked 18 Oct 2026), and `proxyExecute` only reaches endpoints of toolkits Composio already has. So use the gateway's own SDK **in the broker**. Composio still covers Gmail/Outlook (bill discovery), WhatsApp/Telegram (reminders, HITL nudges), Sheets and accounting sync. See [[Reeve - Connectors and Composio#Payment-related toolkits in Composio (checked 18 Oct 2026)]].

### Effort estimate (*hypothesis*)

- Design the interface now, during the hackathon build: small extra effort, big later saving.
- Each new adapter: mapping about 8 operations plus webhook signature verification and event normalisation.
- Biggest piece: **our own simulation clock** to replace Stripe test clocks. Worth doing anyway: simulation becomes rail-agnostic and also works for non-payment SOPs (inventory, HR).

## 4. Recommended path

1. **Hackathon:** Stripe test mode (the sponsor requires it), but already behind the `PaymentRail` interface.
2. **Pitch:** say clearly that production in Indonesia uses a local gateway adapter (VA, QRIS, e-wallet), with Stripe for international and MPP use.
3. **Pilot in Indonesia:** implement the Xendit or Midtrans adapter plus Reeve's own simulation clock.
4. **Keep Stripe** for global customers, Stripe Projects provisioning, and MPP (agents paying and getting paid).

## 5. Xendit and Midtrans capability check (18 Oct 2026)

Sources: Xendit docs index `docs.xendit.co/llms.txt`, Xendit payout coverage (Indonesia), Midtrans docs index `docs.midtrans.com/llms.txt`, and Midtrans Payouts (Iris) approval docs. Search summaries are marked as such.

| Need | Stripe | Xendit | Midtrans |
|---|---|---|---|
| Invoices, VA, QRIS, e-wallets (local collection) | Indonesia is "Preview" | ✓ VA (BCA, BNI, BRI, BSI, Mandiri, Permata, …), ShopeePay and other e-wallets | ✓ Snap: GoPay, QRIS, ShopeePay, DANA, VA, Alfamart/Indomaret (per a community MCP description) |
| Subscriptions / recurring | ✓ | ✓ Subscriptions (fixed amount, usage-based), card tokenisation and merchant-initiated transactions | ✓ Subscription API, card two-clicks/recurring, **GoPay tokenisation / account linking** (BI-SNAP) |
| Payouts to banks and e-wallets | ✓ (where supported) | ✓ Payouts to Indonesian bank accounts (docs note account digits "may include the length for Virtual Accounts") and e-wallet accounts by mobile number; batch payouts | ✓ Payouts (Iris) |
| **Approval for outgoing money** | Not native in this research | ✓ Dashboard multi-level approval with amount thresholds; batch-payout approval workflow (Approver role, 6-digit PIN). *(search summary)* | ✓✓ **Native maker-checker**: Creator role creates, Approver role approves (`POST /api/v1/payouts/approve`, `reference_nos` + optional `otp` from Google Authenticator); approval rules; "multi layer approval"; auto-approve options. *(search summary + Midtrans docs titles)* |
| Bill payments (PLN, water, BPJS, tax, school fees) | — | Bill Payments (**pilot**): electricity, water, mobile credit, tokens, tax, insurance, school fees; inquiry → confirm → process → notify *(search summary)* | Not found |
| **Machine payments over HTTP 402 (MPP-like)** | ✓ MPP + x402 | ✗ Not found | ✗ Not found (Midtrans "402" is only an error code) |
| Shared Payment Tokens / Stripe Projects | ✓ | ✗ | ✗ |
| Official MCP server | (Stripe has its own) | ✗ Community only (`xendit-mcp` by mrslbt; disbursements off by default) | ✗ Community or third-party only (Truto, "Indonesia Payments MCP") |

**Verdict: Xendit and Midtrans can NOT replace Stripe 100%.**
- They replace **local collection, subscriptions and payouts** well. Midtrans even has native maker-checker for payouts.
- They do **not** provide MPP / HTTP 402 machine payments, Shared Payment Tokens or Stripe Projects.
- Agent-to-agent pay-per-call in Indonesia needs Reeve's **own 402 layer**: the server answers 402 with a payment request created on the local rail (QRIS/VA/e-wallet). Or use a prefunded credit ledger inside Reeve. Or use x402 (stablecoin) as the open alternative. Keep Stripe MPP for international agents.

## 6. HITL approval mapped onto the rails

```text
Agent proposes payment ─▶ Reeve broker checks mandate (Mera-signed) ─▶ Auditor checks rules + destination whitelist
     ├─ within mandate  ─▶ broker creates payout (Creator key) ─▶ rail approval: auto-approve rule for small/whitelisted
     └─ outside mandate ─▶ Owner passkey in Reeve ─▶ broker creates payout ─▶ rail approval (Approver OTP/PIN) for large amounts
```

- Two layers: **Reeve approval** (passkey + mandate), then **rail approval** (Midtrans Approver + OTP, or Xendit approval workflow + PIN) above a threshold.
- The broker holds only the **Creator** key. The **Approver** credential stays with the Owner, so the agent alone can never release large payouts.
- Payouts are **final** (irreversible), so every payout is passkey-gated or mandate-gated.

## 7. Auto-paying third-party bills (ShopeePay, Tokopedia, BCA, campus VA)

| Bill type | How Reeve can pay it | Feasible without user touch (apart from HITL)? |
|---|---|---|
| **Virtual Account bills** (campus fees, Tokopedia/marketplace payments, many invoices) | **Payout to the VA number** (a VA is a bank account number) from the business's prefunded rail balance | ✓ Mostly, if the VA accepts transfers from other banks and the amount matches exactly. Closed-amount or expiring VAs need the exact amount before expiry. *Verify per VA issuer.* |
| **E-wallet** (ShopeePay, OVO, DANA, GoPay) top-up or transfer | Payout to the e-wallet account (mobile number) | ✓ For top-ups and transfers. ✗ For paying an in-app bill (e.g. a PayLater instalment inside Shopee) unless it exposes a VA |
| **Utilities and public bills** (PLN token/postpaid, PDAM, BPJS, tax, school fees) | Bill-payment / PPOB API: Xendit Bill Payments (pilot) or aggregators (Billfazz, Espay, PrismaLink). Inquiry returns the exact amount | ✓ Inquiry → mandate check → pay → receipt |
| **Bank bills** (BCA credit card, loans) | Through a biller/PPOB if available, or transfer to the bank's bill VA | ◐ Depends on the bank's biller support |
| **Informal bills** (supplier on WhatsApp, landlord) | Payout to bank account / e-wallet after Owner whitelists the recipient | ✓ After a one-time whitelist |

**Prerequisites for "hands-off":**
1. **Funding source:** a **prefunded balance** at the payout rail (the business tops up its Xendit/Midtrans balance). Pulling directly from the user's own bank requires direct-debit consent (BI-SNAP). GoPay tokenisation lets a *merchant* charge a user's GoPay, but it is not a way to pay third-party bills.
2. **Bill discovery:** Reeve needs the amount, VA/biller ID and due date from one of: a PPOB inquiry (for billers), invoice emails (Gmail via Composio, parsed by code), the user forwarding the bill, or a fixed SOP rule (e.g. campus fee every semester).
3. **No logging into consumer apps.** Shopee or Tokopedia have no public API for a consumer's bills. Never scrape or log in with the user's credentials (ToS and security risk). Use VA, email or PPOB paths.
4. **Mandate plus whitelist:** recipients (VA, biller, e-wallet) must be whitelisted once by the Owner (passkey). After that, payments within the mandate run automatically.

## 8. Recommended rail strategy

| Use | Rail |
|---|---|
| Hackathon demo | Stripe test mode + Stripe MPP (sponsor) |
| Indonesian customer billing | Xendit or Midtrans (VA, QRIS, e-wallet, subscriptions) |
| Outgoing payouts with maker-checker | **Midtrans Payouts** (native Creator/Approver + OTP) or Xendit payouts + approval workflow |
| Utility/public bills | Xendit Bill Payments (pilot) or a PPOB aggregator |
| Agent pay-per-call | Stripe MPP (international) + Reeve's own 402 layer on the local rail, or x402 |

## 9. Shopee and Tokopedia via VA (checked 18 Oct 2026)

What the sources say:
- **Shopee / SPayLater:** in the app, open SPayLater → choose **Transfer Bank (virtual account)** → pick a bank → **Bayar Sekarang** → copy the VA number → pay via mBanking/ATM. Paying by VA settles the bill automatically within minutes (official Shopee Inspirasi article plus media guides). Users are advised to check the name and amount before confirming.
- **Tokopedia:** the help centre has per-bank VA guides (e.g. Danamon, OCBC NISP): "enter the payment amount according to the bill"; confirm VA number, name, product and total. A Mandiri VA must be paid **within 1×24 hours**, otherwise it is cancelled automatically (detik.com, about Mandiri VA in general).
- Not found: an official Shopee or Tokopedia API to list a consumer's bills or generate VA numbers.

**What Reeve can and can't automate:**

| Step | Automatable? | How |
|---|---|---|
| 1. Generate the VA (checkout / "Bayar Sekarang") | ✗ Must be done in the app by the user (one tap) | No public API; never log in or scrape with the user's credentials |
| 2. Get the VA number, amount and expiry into Reeve | ◐ Semi | The user forwards or copies it to Reeve (chat/WA bot), or Reeve parses the "waiting for payment" email via Gmail/Composio *(whether those emails contain the VA number is unverified)* |
| 3. Check rules and mandate | ✓ | Mandate (category "marketplace", per-month limit, merchant whitelist) + Auditor |
| 4. Pay the VA | ✓ | Payout to the VA number from the business's prefunded Xendit/Midtrans balance; exact amount; before expiry (Xendit payout ETA 15 min to 2 h, within the 24 h window) |
| 5. Confirm and record | ✓ | Payout webhook → ledger → receipt; the marketplace marks the order paid |

Caveats:
- **Inter-bank payment into a bank-specific VA** (e.g. a BCA VA paid from another bank) does not always work and may need a bank prefix. Verify per bank before relying on it.
- Xendit/Midtrans payout accounts are **business** accounts (KYB). Reeve's scope is business operations (e.g. buying supplies on Shopee/Tokopedia), not personal finance.
- The VA amount must match exactly, and the VA expires (often 24 hours), so Reeve must pay promptly after receiving it.
- Bottom line: **"one tap from the user + HITL approval"**, not 100% hands-off, because generating the VA happens inside the marketplace app.

## 10. How to use Stripe given Indonesia's limits (routing by who pays)

Two separate questions:
1. **Who holds the merchant account?** Stripe availability depends on the **merchant's** country. Indonesia is "Preview" on stripe.com/global.
2. **Who pays?** An Indonesian **payer** can usually pay a Stripe merchant abroad with an international Visa/Mastercard card (with FX and fees). Local methods (QRIS, VA, e-wallets) are the gap. *Coverage of local debit (GPN) cards is unverified.*

**Routing table:**

| Flow | Who pays → who receives | Rail |
|---|---|---|
| Hackathon demo | Test mode, no real money | **Stripe test mode + MPP** (no country issue) |
| Indonesian SME bills its customers (rent, fees) | Indonesian customer → Indonesian business | **Xendit / Midtrans** (VA, QRIS, e-wallet) |
| Indonesian SME pays suppliers or bills (payouts, PPOB) | Business balance → third party | **Xendit / Midtrans payouts**, PPOB |
| Indonesian user tops up Reeve credits | Indonesian user → Reeve | **Xendit/Midtrans** (QRIS/VA/e-wallet) as primary; **Stripe** card checkout as an alternative if Reeve's entity has Stripe |
| International customers subscribe to Reeve | Foreign customer → Reeve | **Stripe** (requires a Reeve entity in a Stripe-supported country) |
| Agent-to-agent pay-per-call | External agent → Reeve Auditor endpoint | **Stripe MPP** / x402 (international), or a local 402 layer on QRIS/VA |

**Reeve credits (agent wallet):**
- Agents spend from a **Reeve credit ledger**, not directly from a card. Top-ups come from any rail (Xendit/Midtrans locally, Stripe internationally), so Stripe's Indonesian limits never block an agent.
- Mandates (Mera) limit what an agent can spend from the ledger.

> [!warning] Regulatory caution: stored value
> A prefunded balance that users can spend or move may count as **electronic money**, which is licensed by Bank Indonesia. Safer designs: (a) credits are **non-refundable, non-transferable service credits** for Reeve usage only (like SaaS credits), or (b) the **business's own balance stays at the licensed gateway** (e.g. its Xendit balance) and Reeve only instructs payouts. **Verify with BI regulations / legal counsel before going live.**

**Entity option (later, unverified):** many Indonesian startups set up a holding entity in a Stripe-supported country (e.g. Singapore) for international billing, and keep local rails for Indonesia. This is a business/legal decision, not needed for the hackathon.

## 11. Built: Run on Stripe and Xendit (18 Oct 2026)

Both rails are implemented behind the Payment Rail Adapter, in **test mode only** (live keys are refused in code).

| | Stripe | Xendit |
|---|---|---|
| API used | Invoicing: customer → invoice item → `send_invoice` invoice → finalise; hosted invoice page | **Payment Sessions** (`POST /sessions`, PAY, PAYMENT_LINK). Xendit's docs call the Invoice / Payment Link API "legacy" and point to Sessions |
| Rupiah | Two-decimal on Stripe: Rp1,500,000 is sent as `150000000` | Whole rupiah |
| Paid signal | Webhook `invoice.paid`, signature checked with `STRIPE_WEBHOOK_SECRET`; or polling | Webhook `payment_session.completed`, `x-callback-token` checked; or polling |
| Test payment | Pays with the test card from the studio | Pay on the hosted link with a test channel; Reeve can then settle that payment request (`/v3/payment_requests/{id}/simulate`) |
| Refund | Refund on the invoice's payment intent | `POST /refunds` with the payment request id, reason `DUPLICATE` |

How a run works: Reeve keeps a business clock from the cycle the Auditor simulated. Each step runs the **approved `rules.py`** (hash-checked against the receipt) in the sandbox over the payments the rail confirmed. The broker bills only the new decisions:
- Rent and late fees become bills.
- Reminders and notices are logged, because there is no WhatsApp or email connector yet.
- A double payment becomes credit per the rulebook, plus an exception for the owner. A refund above the rulebook's Rp500k limit needs the passkey.

Status:
- Tested against fake Stripe and Xendit servers, and end to end on the offline rail in the browser.
- **Stripe verified live in test mode on 19 Oct 2026:**
  - 30 real invoices.
  - Card payment, then an extra Rp200k transfer.
  - The rules made the extra a credit, and Reeve refunded it on Stripe.
  - The live API caught two things the fake server could not: `send_invoice` customers need an email (tenants get a placeholder on example.com, and Reeve never asks Stripe to send the email), and the test card must be attached to the customer before paying.
- **Xendit verified live in test mode on 19 Oct 2026:**
  - A Payment Session was paid on the hosted test checkout.
  - A refund was accepted (`pending`; Xendit settles refunds asynchronously).
  - The Operator billed 30 rooms as sessions in 11 s.
  - Creating the secret key required 2FA on the Xendit account. The business verification form is needed only for live mode.
- `npm run rails:smoke -- --rail=stripe|xendit` checks a key with one Rp10.000 bill.

## Related
- Up: [[Reeve - Agent Payments]]
- [[Reeve - Architecture and Stack]] · [[Reeve - Connectors and Composio]] · [[Plan Constraints - Free vs Beginner]]
