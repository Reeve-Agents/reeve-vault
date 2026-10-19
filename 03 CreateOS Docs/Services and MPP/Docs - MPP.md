---
aliases:
  - Machine Payments Protocol
  - MPP (Machine Payments)
  - CreateOS MPP
tags:
  - createos/docs
  - createos/docs/mpp
  - type/hub
source: https://createos.sh/docs/MPP/
sources:
  - https://createos.sh/docs/MPP/
  - https://createos.sh/docs/MPP/Overview
  - https://createos.sh/docs/MPP/Authentication
  - https://createos.sh/docs/MPP/Deploy-Flow
  - https://createos.sh/docs/MPP/API-Reference
  - https://createos.sh/docs/MPP/Example
scraped: 2026-10-17
up: "[[CreateOS Docs]]"
---

# Docs - MPP

> [!summary] Summary
> - **MPP (Machine Payments Protocol)** lets an AI agent or script pay for and deploy on CreateOS with no human in the loop, paying in **stablecoins (USDC, USDT) on EVM chains** (Arbitrum `42161`, Base `8453`).
> - "No accounts, no API keys, no OAuth - the on-chain payment is the access control." Requests are signed with the wallet key (EIP-191).
> - Flow: `POST /agent/deploy` → **HTTP 402** quote → ERC20 transfer → retry with `X-Payment-Tx` → poll status.
> - Gateway: `https://mpp-createos.nodeops.network`. Credits: **$1 = 100 credits**, consumed hourly by active projects.
> - Agent skill: `npx skills add NodeOps-app/skills --skill createos-deploy`.
> - Source: https://createos.sh/docs/MPP/

## MPP (Machine Payments) (index)
- **URL:** https://createos.sh/docs/MPP/
- **Summary:** Section index. MPP lets an agent or a script pay for and deploy on CreateOS without a human in the loop.
- **Key points:**
  - Overview: the model. Authentication: the credentials. Deploy Flow: the end-to-end sequence. API Reference: every endpoint. Complete Example: a working run.

## MPP Overview
- **URL:** https://createos.sh/docs/MPP/Overview
- **Summary:** AI agents deploy to CreateOS autonomously by paying with stablecoins on EVM chains via an HTTP 402 payment flow; the gateway verifies the on-chain payment and deploys.
- **Key points:**
  - Flow diagram (verbatim):

    ```
    Agent                    MPP Gateway                Blockchain
      |                          |                          |
      |-- POST /agent/deploy --> |                          |
      |<-- 402 (pay_to, amt) --- |                          |
      |                          |                          |
      |-- ERC20 transfer --------|------------------------->|
      |                          |                          |
      |-- POST /agent/deploy --> |                          |
      |   (X-Payment-Tx: 0x...)  |-- verify on-chain ------>|
      |                          |<-- confirmed ------------|
      |                          |-- deploy to CreateOS     |
      |<-- 200 (projectId) ----- |                          |
      |                          |                          |
      |-- GET /status ---------> |                          |
      |<-- { status: "ready" } - |                          |
    ```

  - **Permissionless access:** no signup, API key, or OAuth. Any agent with an EVM wallet and stablecoins can deploy. The wallet signature authenticates; the payment authorizes.
  - **Credit system:** payments convert to CreateOS credits (**$1 = 100 credits**). Credits are consumed **hourly** by active projects. With existing credits, the gateway deploys without new payment.
  - **Credit sharing:** credits are pooled across all active projects of a wallet. Deploying on existing credits while other projects run triggers a warning (reduces their runtime). Opt in with header `X-Use-Existing-Credits: true`.
  - Supported chains and tokens:

    | Chain | Chain ID | Tokens |
    | --- | --- | --- |
    | Arbitrum | 42161 | USDC, USDT |
    | Base | 8453 | USDC, USDT |

  - Install the skill (Claude Code, Copilot, Gemini CLI, etc.); it handles wallet auth, payment, and deployment:

    ```bash
    npx skills add NodeOps-app/skills --skill createos-deploy
    ```

  - Quick start:
    1. Generate an EVM wallet with gas (ETH) and USDC on Arbitrum or Base.
    2. Call `POST /agent/deploy` without payment to get a quote (402 response).
    3. Check balance via `GET /agent/balance/:address?chain=arbitrum`.
    4. Send an ERC20 transfer to the `pay_to` address from the quote.
    5. Call `POST /agent/deploy` again with the `X-Payment-Tx` header.
    6. Poll status via `GET /agent/deploy/:projectId/:deploymentId/status`.
  - Only dependency: `viem` (wallet signatures and ERC20 transfers).
  - Gateway URL: `https://mpp-createos.nodeops.network`

## Authentication
- **URL:** https://createos.sh/docs/MPP/Authentication
- **Summary:** Protected `/agent/*` endpoints use wallet-based auth: sign `{wallet}:{timestamp}:{nonce}` with the EVM private key (EIP-191) and send four `X-` headers.
- **Key points:**
  - Headers: `X-Wallet-Address`, `X-Signature`, `X-Timestamp` (Unix ms), `X-Nonce` (UUID per request).
  - Timestamp within 60 seconds of server clock; nonce single-use; failure returns `401`.
  - Public (no auth): `GET /agent/balance/:address`, `GET /agent/chains`, `GET /health`.
  - Full detail: [[Docs - MPP - Authentication]].

## Deploy Flow
- **URL:** https://createos.sh/docs/MPP/Deploy-Flow
- **Summary:** Five steps: request deploy (quote), check balance, pay on-chain, deploy with payment proof, poll status. Upload as base64 files or a base64 zip.
- **Key points:**
  - 200 when credits exist and no projects are active; 402 with `warning` when active projects share credits; 402 with payment details when no credits.
  - Quote example: `amount_usd` `0.5`, `amount_token` `"500000"`, `token` `usdc`, `decimals` `6`, `payment_chain` `arbitrum`.
  - USDC on Arbitrum contract in the sample: `0xaf88d065e77c8cC2239327C5EDb3A432268e5831`.
  - Poll every 5 seconds; statuses `deploying`, `ready`, `failed`.
  - Exclude from uploads: `node_modules/`, `dist/`, `build/`, `.next/`, `.env`, `.git/`, `__pycache__/`, `venv/`.
  - Full detail: [[Docs - MPP - Deploy Flow]].

## API Reference
- **URL:** https://createos.sh/docs/MPP/API-Reference
- **Summary:** Endpoint reference for the MPP gateway: deploy, status, projects list, project delete, balance, chains, and error codes.
- **Key points:**
  - Base URL `https://mpp-createos.nodeops.network`.
  - `POST /agent/deploy` · `GET /agent/deploy/:projectId/:deploymentId/status` · `GET /agent/projects` · `DELETE /agent/projects/:projectId` · `GET /agent/balance/:address` · `GET /agent/chains`.
  - Error codes `400`, `401`, `402`, `403`, `409` (transaction hash already used), `429` (rate limited, 30 requests/minute).
  - Full detail: [[Docs - MPP - API Reference]].

## Complete Example
- **URL:** https://createos.sh/docs/MPP/Example
- **Summary:** Full TypeScript deploy script with plain `fetch` + `viem` (no SDK): auth helper, quote, ERC20 payment, deploy with proof, poll until live; plus zip upload, list projects, check balance snippets.
- **Key points:**
  - Install: `npm install viem`.
  - Generate a wallet with `generatePrivateKey()` / `privateKeyToAccount()`; fund it with ETH (gas) and USDC on Arbitrum or Base.
  - Full code: [[Docs - MPP - Example]].

## Related
- Up: [[CreateOS Docs]]
- [[Docs - MPP - Authentication]]: wallet signature headers
- [[Docs - MPP - Deploy Flow]]: the 402 payment sequence
- [[Docs - MPP - API Reference]]: every endpoint and field
- [[Docs - MPP - Example]]: working TypeScript script
- [[Docs - Services]]: sibling docs section (Services)
- [[Docs - Account and Billing]]: CreateOS credits and billing
- [[Ideas - Stretch]]: stretch hackathon ideas
- [[Stripe Projects]]: Stripe Projects hub (CLI-based provisioning and billing)
- [[CreateOS on Stripe Projects]]: CreateOS plans via Stripe Projects
