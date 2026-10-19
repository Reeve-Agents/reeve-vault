---
aliases:
  - MPP API Reference
tags:
  - createos/docs
  - createos/docs/mpp
  - type/page
source: https://createos.sh/docs/MPP/API-Reference
scraped: 2026-10-17
up: "[[Docs - MPP]]"
---

# Docs - MPP - API Reference

> [!summary] Summary
> - Base URL: `https://mpp-createos.nodeops.network`
> - Six endpoints: `POST /agent/deploy`, `GET /agent/deploy/:projectId/:deploymentId/status`, `GET /agent/projects`, `DELETE /agent/projects/:projectId`, `GET /agent/balance/:address`, `GET /agent/chains`.
> - `/agent/deploy`, status, and projects endpoints need wallet auth; balance and chains are public.
> - Rate limit: **30 requests/minute** (`429`). Reused transaction hash: `409`.
> - Source: https://createos.sh/docs/MPP/API-Reference

## Endpoint summary

| Method | Path | Auth | Purpose |
| --- | --- | --- | --- |
| `POST` | `/agent/deploy` | Yes | Deploy a project; `402` if payment required, `200` if deploying |
| `GET` | `/agent/deploy/:projectId/:deploymentId/status` | Yes | Deployment status; only the deployer wallet can access |
| `GET` | `/agent/projects` | Yes | Projects deployed by the authenticated wallet, with latest live URL |
| `DELETE` | `/agent/projects/:projectId` | Yes | Permanently delete a project; only the deployer wallet |
| `GET` | `/agent/balance/:address` | No | Token balances for an address on a chain |
| `GET` | `/agent/chains` | No | Supported chains and accepted tokens |
| `GET` | `/health` | No | Gateway health check (listed on the Authentication page) |

## POST /agent/deploy

### Request headers

| Header | Required | Default | Description |
| --- | --- | --- | --- |
| `X-Payment-Tx` | No | - | ERC20 transfer transaction hash |
| `X-Payment-Chain` | No | `arbitrum` | Chain the payment was made on |
| `X-Payment-Token` | No | `usdc` | Token used for payment |
| `X-Use-Existing-Credits` | No | `false` | Opt in to share credits with active projects |

Plus the auth headers from [[Docs - MPP - Authentication]].

### Request body

```json
{
  "uniqueName": "my-app",
  "displayName": "My App",
  "description": "Optional description",
  "months": 1,
  "settings": {
    "port": 3000,
    "runtime": "build-ai",
    "useBuildAI": true,
    "buildCommand": null,
    "runCommand": null,
    "installCommand": null,
    "framework": null,
    "hasDockerfile": false
  },
  "upload": {
    "type": "files",
    "files": [{ "path": "index.js", "content": "base64" }]
  }
}
```

| Field | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `uniqueName` | string | Yes | - | URL-safe project identifier |
| `displayName` | string | Yes | - | Human-readable project name |
| `description` | string | No | - | Project description |
| `months` | number | No | `1` | Number of months to deploy for |
| `settings` | object | No | "See below" (as written in the source) | Build and runtime settings |
| `upload` | object | Yes | - | Files or zip to deploy |

- `settings` values in the sample request body: `port` `3000`, `runtime` `"build-ai"`, `useBuildAI` `true`, `buildCommand` / `runCommand` / `installCommand` / `framework` `null`, `hasDockerfile` `false`.
- Upload formats: [[Docs - MPP - Deploy Flow]] (`files` or `zip`).

### Responses

**200** — deploying (credits available or payment verified):

```json
{
  "projectId": "uuid",
  "deploymentId": "uuid",
  "status": "deploying",
  "message": "Deployment started. Poll status for updates."
}
```

**402** — payment required:

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

## GET /agent/deploy/:projectId/:deploymentId/status

Only the deployer wallet can access.

```json
{
  "status": "deploying",
  "deployment_id": "uuid",
  "deployment_status": "building"
}
```

```json
{
  "status": "ready",
  "deployment_id": "uuid",
  "endpoint": "https://my-app.nodeops.network"
}
```

```json
{ "status": "failed", "deployment_id": "uuid", "reason": "build error" }
```

## GET /agent/projects

Lists all projects deployed by the authenticated wallet, with the live URL of the latest deployment.

```json
{
  "wallet": "0x5B6C...",
  "count": 2,
  "projects": [
    {
      "id": "uuid",
      "name": "my-app",
      "displayName": "My App",
      "status": "active",
      "url": "https://my-app.nodeops.network",
      "createdAt": "2026-04-07T10:00:00.000Z"
    }
  ]
}
```

- `url` is `null` if the project has no successful deployment.
- Status values: `active`, `building`, `deploying`, `pending`, `queued`, `promoting`, `deleting`, `failed`.

## DELETE /agent/projects/:projectId

Permanently deletes a project. Only the deployer wallet can delete.

```json
{ "projectId": "uuid", "status": "deleted" }
```

- `403`: wrong wallet (not the deployer).

## GET /agent/balance/:address

No auth required.

| Query param | Default | Description |
| --- | --- | --- |
| `chain` | `arbitrum` | Chain name |

```json
{
  "address": "0x5B6C...",
  "chain": "arbitrum",
  "chain_id": 42161,
  "balances": [
    {
      "token": "usdc",
      "symbol": "USDC",
      "address": "0xaf88d065...",
      "balance": "18.000000",
      "balance_raw": "18000000",
      "decimals": 6
    }
  ]
}
```

## GET /agent/chains

No auth required.

```json
{
  "chains": [
    { "chain": "arbitrum", "chain_id": 42161, "tokens": ["usdc", "usdt"] },
    { "chain": "base", "chain_id": 8453, "tokens": ["usdc", "usdt"] }
  ]
}
```

## Error codes

| Code | Meaning |
| --- | --- |
| 400 | Invalid request body |
| 401 | Bad signature, expired, or nonce reuse |
| 402 | Payment required or verification failed |
| 403 | Wrong wallet (not authorized) |
| 409 | Transaction hash already used |
| 429 | Rate limited (30 requests/minute) |

## Related
- Up: [[Docs - MPP]]
- [[Docs - MPP - Authentication]]: auth headers and validation
- [[Docs - MPP - Deploy Flow]]: the sequence of calls
- [[Docs - MPP - Example]]: calling these endpoints from TypeScript
- [[Docs - API and MCP]]: CreateOS platform API docs
