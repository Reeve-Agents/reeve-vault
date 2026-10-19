---
aliases:
  - Agent Payments
  - MPP and x402
  - Spending Mandate
tags:
  - brainstorm
  - reeve
  - type/page
scraped: 2026-10-17
source: https://docs.stripe.com/payments/machine
sources:
  - https://docs.stripe.com/payments/machine
  - https://docs.stripe.com/payments/machine/mpp
  - https://docs.stripe.com/agentic-commerce/concepts/shared-payment-tokens
  - https://docs.stripe.com/projects
up: "[[Reeve - Overview]]"
---

# Reeve - Agent Payments

> [!summary] Summary
> - **Fully Web2, no Dynamic needed.** An agent subscribing to resources is already handled by **Stripe Projects** (CLI plus Shared Payment Tokens plus spend limits). We add an approval step (Owner passkey) and a broker that executes.
> - **Stripe already has an x402-like mechanism: MPP (Machine Payments Protocol)**, launched with Tempo on 18 Mar 2026. It is an HTTP 402 challenge → pay → retry with credential → receipt flow. Docs (checked 17 Oct): *"Stripe also supports stablecoin payments over the x402 protocol."*
> - **MPP has nothing to do with the CreateOS Free plan or the Stripe Projects paid tier.** It is a Stripe account feature. **Test mode (`sk_test_...`) is enough for the hackathon**. Country limits apply only in live mode.
> - **Mera spending mandate:** the Owner signs a budget (max per transaction, total, merchants, expiry) with a passkey-derived key. The broker enforces it before every payment.

## 1. Agents buying subscriptions: Stripe Projects

The agent can provision services itself through the CLI ([[Stripe Projects - Agent Integration]]):

```bash
stripe projects add neon/postgres --json --no-interactive --auto-confirm
stripe projects upgrade <provider> ...
stripe projects billing update --limit 20 --provider neon
```

- Payment uses a Shared Payment Token: the provider never sees the card. Spend limits are monthly, per provider ([[Stripe Projects - Billing and Spend Limits]]).
- Our addition: an approval step.

```text
Agent (di sandbox): "butuh Sentry Team $26/bln untuk monitoring error"
   → buat Purchase Request {apa, harga, alasan, durasi}
   → Owner dapat notifikasi → approve dengan passkey (Mera)
   → Broker (di luar sandbox, pegang login Stripe) jalankan `stripe projects add/upgrade`
   → kredensial baru masuk vault broker, agent hanya dapat placeholder
```

- The agent never holds the Stripe account; it can only ask.
- **Constraint:** Stripe Projects paid tiers are not available to Indonesian accounts ([[Plan Constraints - Free vs Beginner]]). For the demo, use providers' free tiers and show the approval flow. A real paid upgrade needs an account from a supported country.
- **Dynamic is not needed.** It is crypto wallet infrastructure, and everything above is already handled in Web2.

## 2. Stripe MPP (verified from docs.stripe.com, 17 Oct 2026)

```text
Agent ──GET /audit──▶ Server
      ◀── 402 + payment requirements
Agent bayar (kartu via SPT, min $0.50 | USDC di Tempo, min $0.01)
      ──retry + credential──▶
      ◀── 200 + hasil + receipt
```

- Docs: *"Machine payments let agents pay for APIs and services programmatically. Your server returns a payment challenge, the agent presents a valid payment credential, and Stripe settles the payment to your Stripe balance."*
- Docs: MPP *"is able to accept card and stablecoin payments. Stripe also supports stablecoin payments over the x402 protocol."*
- Minimums: SPT card **0.50 USD**; stablecoin **0.01 USDC**; **MPP sessions** can charge sub-cent increments with a minimum settlement of 0.01 USDC (sessions are documented at `docs.stripe.com/payments/machine/mpp/sessions`).
- Refunds go through the Refunds API. Available for Connect platforms across all charge types.
- Server SDK `mppx`. Validate locally with `npx mppx@latest validate http://localhost:4242`. Test as the paying agent with `npx @stripe/link-cli mpp pay <url>`.
- The docs example uses `sk_test_...` keys, with `livemode` set by whether the key contains `_test_`. API version `2026-07-29.preview`.
- **Live-mode availability:**
  - SPTs: businesses in all US states, plus the supported-countries list on the SPT page.
  - Stablecoins: all US states except New York. Outside the US, email `machine-payments@stripe.com` with your Stripe account ID to request access in 30+ countries.
- The official hackathon idea **#22 Pay-per-run code runner** uses "Stripe's Machine Payments Protocol, all in test mode", with no Beginner tag ([[Ideas - Stretch]]).

> [!warning] CreateOS "MPP" ≠ Stripe MPP
> CreateOS's MPP ([[Docs - MPP]]) uses a direct USDC/USDT ERC20 transfer on Arbitrum/Base, an `X-Payment-Tx` header and EIP-191 signatures, through gateway `https://mpp-createos.nodeops.network`. Stripe MPP uses `mppx` challenge/credential/receipt, Tempo deposit addresses and SPTs. Do not claim the two are compatible. Use **Stripe MPP test mode** as the main path in the demo.

## 3. x402

- An open standard from Coinbase (May 2025), with on-chain USDC. Under the Linux Foundation since Apr 2026; Stripe is a member.
- Stripe docs confirm Stripe accepts stablecoin payments over x402.
- Research suggests any "402-speaking" endpoint should support both MPP and x402 ([[Partnership Analysis Report]]). **For the hackathon, MPP alone** in test mode is enough.
- Fallback if no Stripe account can be created: an x402 endpoint on a testnet (e.g. Base Sepolia) without Stripe. The 402 concept is still shown, but the Stripe angle is weaker for the judges.

## 4. Payment directions in Reeve

| Direction | Example | Rail |
|---|---|---|
| Agent buys a subscription | Builder needs a DB or monitoring | Stripe Projects + SPT, with Owner approval |
| Agent pays per call | Auditor calls a paid sanctions-data API per query | Agent as an MPP client |
| Agent gets paid | Auditor sold as a service: other agents or companies pay per audit | 402 endpoint with `mppx` |
| Customer pays the business | Tenant pays rent | Ordinary Stripe Invoice |

## 5. Spending mandate (Mera)

```json
{
  "agent": "auditor-01",
  "max_per_tx": 2.00,
  "max_total": 20.00,
  "merchants": ["api.sanctions-data.example", "neon"],
  "expires": "2026-10-18T09:00:00Z"
}
```

- Signed with the Owner's passkey-derived key (salt `mandate:auditor-01`).
- The broker verifies the signature and the remaining quota **before every payment**.
- Within the mandate, payments run automatically with no prompt. This mirrors MPP "sessions": a spending cap set up front, then micropayments.
- Outside it (higher price, new merchant, expired), the Owner is prompted for the passkey again.
- Layered safety: the broker enforces the mandate; Stripe enforces its own spend limits.

## Related
- Up: [[Reeve - Overview]]
- [[Reeve - Payment Rails Indonesia]]: auto-pay in both directions, Stripe in Indonesia (Preview), Payment Rail Adapter instead of migrating
- [[Reeve - Credential Broker and Mera]]: the broker that executes payments and holds keys
- [[Plan Constraints - Free vs Beginner]]: Free plan vs MPP, Indonesian account limits
- [[Stripe Projects]] · [[CreateOS on Stripe Projects]]
