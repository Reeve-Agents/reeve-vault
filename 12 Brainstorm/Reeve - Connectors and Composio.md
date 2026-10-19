---
aliases:
  - Connector Layer
  - Composio
tags:
  - brainstorm
  - reeve
  - type/page
scraped: 2026-10-17
source: https://composio.dev/llms.txt
sources:
  - https://composio.dev/llms.txt
  - https://docs.composio.dev/llms.txt
  - https://docs.composio.dev/llms-index.txt
  - https://composio.dev/pricing.md
  - https://composio.dev/toolkits/stripe.md
  - https://docs.composio.dev/docs/security/token-custody.md
up: "[[Reeve - Overview]]"
---

# Reeve - Connectors and Composio

> [!summary] Summary
> - An agent needs two things from any system: a **data source** (what the current state is) and an **action channel** (what it can do). The bridge between them is a **connector layer**.
> - **MCP is for build time, not runtime.** The Builder (LLM) uses MCP to explore schemas. At runtime, **deterministic code calls the API directly**, which is reproducible, auditable, cheaper, and immune to prompt injection.
> - **Composio** fits as the connector layer: 1,500+ toolkits, Stripe with 428 tools and 40 triggers, a free Hobby tier, and it is in the Stripe Projects catalog (`composio/project`).
> - Golden rule: **`COMPOSIO_API_KEY` must never enter the sandbox**. It lives in the broker.

## Built (19 Oct 2026)

`reeve/packages/connectors`, used by the broker:

- **Composio:** through the official `@composio/core` SDK. Each tool's version is looked up and pinned on every call, as Composio recommends. `userId` selects whose connected accounts act.
- **Any MCP server:** through the official MCP SDK (Streamable HTTP). Servers are listed in `REEVE_MCP_SERVERS`. This is the fallback when Composio has no toolkit, which is the case for Moka, Jurnal, Accurate, Shopee, Tokopedia and Xendit.
- **Log:** when nothing fits, the action is recorded, not sent.
- **Build-time check:** every tool a rulebook uses is looked up: "ready", "needs arguments X", "not connected: connect Composio's toolkit or add an MCP server", or "logged only".
- **Runtime:** the sandbox returns tool calls, and the broker makes only the ones the approved rulebook names.

Status:
- Tested with a fake Composio client and a real in-process MCP server.
- **Composio verified live on 19 Oct 2026:**
  - The key from the dashboard (Connect → Sessions & API Key) is a **consumer key** (`ck_…`, header `x-consumer-api-key`). The SDK rejects it (401), so Reeve uses it through Composio's hosted MCP server.
  - Reeve calls that server's meta-tools in code, never through a model: get tool schemas, list connections (never add), and execute one exact tool.
  - The check found GMAIL_SEND_EMAIL ready, and a test email was sent and accepted by Gmail.
- **WhatsApp:** deferred, because Composio's WhatsApp tools need a WhatsApp Business account (`phone_number_id`). The sample uses Telegram (`TELEGRAM_SEND_MESSAGE`: a bot token plus the parent's chat_id) for now.
- **Gmail safety:** connect a dedicated mailbox. The connection can read and send across the whole inbox it is given.
- **Any app both ways (19 Oct 2026):**
  - **Records** come from any app's read tool, flattened into rows. Checked slugs: `GOOGLESHEETS_VALUES_GET` (spreadsheet_id, range), `NOTION_QUERY_DATABASE` (database_id), `CLICKUP_GET_TASKS` (list_id), `AIRTABLE_LIST_RECORDS` (baseId, tableIdOrName). Odoo, Google Drive, Docs and Photos are found the same way through Composio's tool search.
  - **Actions** use any tool, with arguments typed from its schema.
  - **Build-time correction:** a guessed tool slug is replaced with real ones found by Composio's tool search (one retry). This is the vault rule "MCP for build time, deterministic calls at runtime".
- **Google Sheets verified live on 19 Oct 2026:**
  - **Write:** a new tab with one row in an existing spreadsheet, and a new spreadsheet filled with the sample data.
  - **Read:** that sheet read back as Reeve's dataset.
  - **Audit:** Opus compiled the tutoring SOP over its real columns, and the Auditor passed it (13/13 spec cases, 24/24 planted defects).
  - Reading skips title rows above the header, as many owners' sheets have them.
- Google Sheets arrives as a CSV export for now.

## Owner connects apps themselves (19 Oct 2026)

The studio's apps page (`/?view=apps`) lists all ~1,608 Composio apps from Composio's public catalog, with the small-business apps first.
- Each app has a **Connect** card. Reeve asks Composio Connect for a sign-in link (`connect.composio.dev/link/…`, valid about 10 minutes), and the owner completes OAuth or enters the API key on Composio's page.
- Reeve never sees those credentials, and the card checks afterwards that the account is active.
- Verified live: the catalog read (1,608 apps; ClickUp, Notion, Google Drive, Google Photos, Odoo and Telegram all present) and a Notion link issued.

## Why finance first

In finance, **Stripe is already both the data source and the action channel**, so the connector exists. Inventory and other domains need extra connectors. Roadmap: "Connector registry: Stripe now → Sheets, Shopify, Jurnal next."

## Inventory bridge: which connector

| Business situation | Bridge |
|---|---|
| Already uses a system with an API (Shopify, WooCommerce, Odoo, Jurnal, Accurate, Moka POS) | Sandbox code calls that system's REST API. Key injected by the broker; egress allowlisted to the API domain |
| Still on Excel | Google Sheets as the source of truth, read through the Sheets API |
| Still manual (WhatsApp, paper book) | Needs recording first (form or WA bot → DB). What isn't recorded can't be automated. This is a data problem, not an agent problem |
| Physical (barcode / RFID) | Out of scope |

## MCP: build time vs runtime

- **Build:** the Builder (LLM) uses the system's MCP server to explore schemas, available fields and sample data, so the code it writes is correct.
- **Run:** what executes is **deterministic code calling the API directly**, not an LLM calling MCP each time. This is reproducible and auditable by the Auditor, cheaper, and cannot change its mind or get prompt-injected mid-run.

## Composio: verified facts (docs read 17 Oct 2026)

| Topic | Fact |
|---|---|
| Coverage | 1,500+ toolkits; access via MCP, SDK (Python/TS) or a direct API key |
| Relevant toolkits | **Stripe**: 428 tools, 40 triggers, auth by API key or OAuth2, "Managed by Composio". Tool slugs include `STRIPE_ADVANCE_TEST_CLOCK` and `STRIPE_ADD_INVOICE_LINES`, plus triggers such as `STRIPE_CHARGE_FAILED`. Also available: Shopify, Google Sheets, Odoo, QuickBooks, Xero |
| Not found | Jurnal, Accurate, Moka, WooCommerce (`/toolkits/{slug}.md` returned 404). `proxyExecute` only reaches endpoints of a toolkit Composio already has, so for apps it lacks, use the app's own SDK/API in the broker (custom integrations are Enterprise, "on request") |
| Auth | Managed OAuth / API key. Your app sends a `connected_account_id`; Composio resolves and injects the credentials (token custody) |
| Execution | `composio.tools.proxy(...)` (Python) / `composio.tools.proxyExecute(...)` (TS) via proxy execute; sessions-based SDK (REST v3.1 current) |
| Hobby pricing ($0) | 100K tool calls/month, 50K triggers/month, unlimited connected accounts, 3 team members, no card. Direct execution outside a session: 10K/month free. Proxy execute: 1K/month free |
| Pro ($29/month) | $29 usage credit, spend controls, add-ons (ZDR +$0.0001/call, IP allowlist, BAA) |
| Enterprise | SSO/SCIM, customer-managed keys (KMS), deploy in your own cloud |
| Security claims | SOC 2 Type II (Composio claim). ZDR is "select features" and an add-on on Pro |
| Agent signup | `agents.composio.dev`: an AI agent can create an anonymous account without a human |
| Stripe Projects | Listed as `composio/project`, "Connect agents to 250+ tools and apps with managed auth" ([[Stripe Projects - Providers]]) |

## Payment-related toolkits in Composio (checked 18 Oct 2026)

From the toolkit directory (1,613 toolkits; "finance & accounting" category 94, "e-commerce" 47).

| Toolkit (slug) | Tools / triggers | What it offers | Relevance to Reeve in Indonesia |
|---|---|---|---|
| `stripe` | 428 / 40 | Charges, customers, refunds, invoices, test clocks | ✓ Hackathon rail |
| `stripe_mcp` | 10 | Stripe's MCP | ✓ Build-time exploration |
| `paypal` | 78 | Invoices, payments, orders | ◐ International |
| `airwallex` | 7 | Payments, payouts, FX | ◐ Cross-border payouts *(Indonesia coverage unverified)* |
| `wise` | 9 | Balances, quotes, transfers | ◐ Cross-border transfers to IDR |
| `hitpay` | 15 | Payments, invoices, subscriptions | ◐ SEA gateway *(Indonesia support unverified)* |
| `skyfire` | 16 | **Agent payments**: send payments, payment methods | ✓ Agent-to-agent payments (alternative to MPP) |
| `coinbase_agents_mcp` / `coinbase_wallet_mcp` | 29 / 15 | Agent wallets, transfers, signing | ◐ x402 / stablecoin path |
| `reloadly` | 10 | Gift cards, airtime top-ups | ◐ Small top-ups *(utility bills for Indonesia unverified)* |
| `plaid_mcp` | 5 | Plaid ops monitoring | ✗ US/EU banks |
| `quickbooks`, `xero`, `zoho_books`, `zoho_invoice`, `freshbooks` | — | Accounting ledgers | ◐ Bookkeeping sync for the Accountant |
| `shopify`, `square`, `lemon_squeezy`, `gumroad` | Shopify 315 / 45 | Commerce and orders | ◐ Merchant data |
| `gmail`, `outlook` | Gmail 61 / 2 | Read, search and parse emails | ✓ **Bill discovery** (VA numbers, invoices in email) |
| `whatsapp`, `telegram` | WhatsApp 58 / 1 | Messaging | ✓ Reminders to customers, the user forwarding VA numbers, approval nudges |
| `googlesheets` | 50 / 16 | Rows and triggers | ✓ Data source for SMEs on spreadsheets |

**Not in Composio:** Xendit, Midtrans, DOKU, Flip, Shopee, Tokopedia, Lazada, any Indonesian bank, PPOB aggregators.

**Implication:**
- Indonesian payment rails (Xendit/Midtrans payouts, VA, QRIS, PPOB) are integrated **directly in the broker** with their own SDKs, behind the `PaymentRail` adapter ([[Reeve - Payment Rails Indonesia]]). They are not called through Composio.
- Composio covers the **surrounding** pieces: Gmail/Outlook (bill discovery), WhatsApp/Telegram (reminders, HITL nudges), Google Sheets (data), accounting sync (QuickBooks/Xero/Zoho), and international or agent payments (Stripe, PayPal, Wise, Airwallex, Skyfire, Coinbase).
- Community MCP servers exist for Xendit (`xendit-mcp`) and Midtrans ("Indonesia Payments MCP", Truto). They are unofficial, so use them at build time only, if at all.

## Placement in Reeve

```text
BUILD (LLM boleh pakai MCP):
Builder ──Composio MCP──▶ jelajah tool & skema (field invoice, stok, dll) → tulis kode

RUN (deterministik, tanpa LLM):
Kode di sandbox CreateOS ──▶ Broker (Railway) ──▶ Composio tools.execute / proxyExecute ──▶ Stripe/Sheets/Shopify
                    egress allowlist: hanya broker
```

## Three rules

1. **`COMPOSIO_API_KEY` must not enter the sandbox.** It is more dangerous than a Stripe key, because it can run any tool on every account connected to the project. Keep it in the broker. The sandbox only asks "run `STRIPE_ADD_INVOICE_LINES` with arguments X"; the broker checks the action allowlist and the mandate before forwarding to Composio. See [[Reeve - Credential Broker and Mera]].
2. **MCP only at build time.** At runtime, call tools by the slug fixed in the code.
3. **Use Composio triggers for apps without an easy webhook** (e.g. a new Google Sheets row as a job trigger). For Stripe, a direct webhook is simpler.

## Trade-off to state honestly in the pitch

- With Composio Cloud, **credentials and payloads pass through Composio's servers**. This weakens the Auditor's "data never leaves" claim.
- Builder/Operator: use Composio for connectors.
- Auditor: still pull audit data into the egress-blocked sandbox. Composio only fetches; it does not analyse ([[Reeve - Auditor Design]]).
- Enterprise: offer ZDR or a Composio deployment in your own cloud.

## Related
- Up: [[Reeve - Overview]]
- [[Reeve - SOP Inputs and Rule Types]]: other domains that need connectors
- [[Reeve - Architecture and Stack]]: where the broker runs (Railway)
- [[Docs - API and MCP]]: CreateOS's own MCP server
