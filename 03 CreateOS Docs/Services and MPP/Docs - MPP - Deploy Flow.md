---
aliases:
  - MPP Deploy Flow
tags:
  - createos/docs
  - createos/docs/mpp
  - type/page
source: https://createos.sh/docs/MPP/Deploy-Flow
scraped: 2026-10-17
up: "[[Docs - MPP]]"
---

# Docs - MPP - Deploy Flow

> [!summary] Summary
> - The MPP deploy flow uses **HTTP 402** responses to communicate payment requirements.
> - Steps: 1 request deploy (quote) → 2 check balance → 3 pay on-chain (ERC20 transfer to `pay_to`) → 4 deploy with `X-Payment-Tx` → 5 poll status every 5 seconds.
> - Example quote: `amount_usd` `0.5` = `amount_token` `"500000"` USDC (6 decimals) on `arbitrum`.
> - Upload types: base64 `files` array or base64 `zip`.
> - Source: https://createos.sh/docs/MPP/Deploy-Flow

## Step 1: Request deploy (get quote)

Call `POST /agent/deploy` without a payment header. The gateway checks your credit balance and active projects.

```
POST /agent/deploy
Content-Type: application/json
X-Wallet-Address: 0x...
X-Signature: 0x...
X-Timestamp: 1711500000000
X-Nonce: unique-uuid

{
  "uniqueName": "my-app",
  "displayName": "My App",
  "upload": {
    "type": "files",
    "files": [
      { "path": "index.js", "content": "base64..." },
      { "path": "package.json", "content": "base64..." }
    ]
  }
}
```

### Response cases

| Case | Response |
| --- | --- |
| Has credits, no active projects | Deploys immediately (`200`) |
| Has credits, active projects exist | `402` with a `warning` |
| No credits | `402` with payment details |

**Has credits, no active projects** (200):

```json
{ "projectId": "uuid", "deploymentId": "uuid", "status": "deploying" }
```

**Has credits, active projects exist** (402):

```json
{
  "error": "Payment required",
  "warning": "You have 2 active project(s) sharing credits...",
  "amount_usd": 0.5,
  "current_credit_balance_usd": 1.20,
  "active_projects": 2,
  "pay_to": "0x7EA5...",
  "payment_chain": "arbitrum",
  "token": "usdc",
  "decimals": 6,
  "supported_chains": [...]
}
```

- To deploy on existing credits (reduces runtime of other projects), retry with header `X-Use-Existing-Credits: true`.

**No credits** (402):

```json
{
  "error": "Payment required",
  "amount_usd": 0.5,
  "amount_token": "500000",
  "current_credit_balance_usd": 0,
  "active_projects": 0,
  "pay_to": "0x7EA5...",
  "payment_chain": "arbitrum",
  "token": "usdc",
  "decimals": 6,
  "supported_chains": [
    { "chain": "arbitrum", "chain_id": 42161, "tokens": ["usdc", "usdt"] },
    { "chain": "base", "chain_id": 8453, "tokens": ["usdc", "usdt"] }
  ]
}
```

## Step 2: Check balance

```
GET /agent/balance/0xYourWallet?chain=arbitrum
```

```json
{
  "address": "0x...",
  "chain": "arbitrum",
  "balances": [
    { "token": "usdc", "symbol": "USDC", "balance": "18.000000", "decimals": 6 }
  ]
}
```

- If the balance is insufficient, prompt the user to fund the wallet on a supported chain.

## Step 3: Pay on-chain

ERC20 transfer to the `pay_to` address from the 402 response:

```ts
import { createWalletClient, createPublicClient, http } from "viem";
import { arbitrum } from "viem/chains";

const ERC20_ABI = [
  {
    name: "transfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "value", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

const txHash = await walletClient.writeContract({
  address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", // USDC on Arbitrum
  abi: ERC20_ABI,
  functionName: "transfer",
  args: [quote.pay_to, BigInt(quote.amount_token)],
});

await publicClient.waitForTransactionReceipt({ hash: txHash });
```

## Step 4: Deploy with payment proof

Retry with the transaction hash (same body as Step 1, new nonce):

```
POST /agent/deploy
Content-Type: application/json
X-Payment-Tx: 0xTransactionHash
X-Payment-Chain: arbitrum
X-Payment-Token: usdc
X-Wallet-Address: 0x...
X-Signature: 0x...
X-Timestamp: 1711500000000
X-Nonce: new-unique-uuid
```

```json
{ "projectId": "uuid", "deploymentId": "uuid", "status": "deploying" }
```

## Step 5: Poll status

Poll every 5 seconds until ready:

```
GET /agent/deploy/{projectId}/{deploymentId}/status
```

| Status | Meaning |
| --- | --- |
| `deploying` | Build/deploy in progress |
| `ready` | Live at `endpoint` URL |
| `failed` | Deployment failed with `reason` |

```json
{ "status": "ready", "endpoint": "https://my-app.nodeops.network" }
```

## Upload types

**Files**: array of base64-encoded files.

```json
{
  "type": "files",
  "files": [
    { "path": "index.js", "content": "base64..." },
    { "path": "package.json", "content": "base64..." }
  ]
}
```

**Zip**: base64-encoded zip archive.

```json
{
  "type": "zip",
  "data": "base64-zip-content",
  "filename": "code.zip"
}
```

Exclude from uploads: `node_modules/`, `dist/`, `build/`, `.next/`, `.env`, `.git/`, `__pycache__/`, `venv/`.

## Related
- Up: [[Docs - MPP]]
- [[Docs - MPP - Authentication]]: the `X-Wallet-Address` / `X-Signature` / `X-Timestamp` / `X-Nonce` headers
- [[Docs - MPP - API Reference]]: request fields, settings, error codes
- [[Docs - MPP - Example]]: the flow as one script
