---
aliases:
  - MPP Authentication
tags:
  - createos/docs
  - createos/docs/mpp
  - type/page
source: https://createos.sh/docs/MPP/Authentication
scraped: 2026-10-17
up: "[[Docs - MPP]]"
---

# Docs - MPP - Authentication

> [!summary] Summary
> - All protected MPP endpoints (`/agent/*`) use **wallet-based authentication**: no API keys or OAuth tokens.
> - Sign the message `{wallet}:{timestamp}:{nonce}` with your EVM private key (EIP-191 `personal_sign`).
> - Send `X-Wallet-Address`, `X-Signature`, `X-Timestamp`, `X-Nonce` on every protected request.
> - Timestamp must be within **60 seconds**; each nonce is single-use; failures return `401`.
> - Source: https://createos.sh/docs/MPP/Authentication

## Auth headers

| Header | Description |
| --- | --- |
| `X-Wallet-Address` | Your EVM wallet address (`0x...`) |
| `X-Signature` | EIP-191 signature of the message below |
| `X-Timestamp` | Unix timestamp in milliseconds |
| `X-Nonce` | A unique UUID per request |

## Message format

Colon-separated string:

```
{wallet}:{timestamp}:{nonce}
```

Example:

```
0x5B6C...a3F2:1711500000000:550e8400-e29b-41d4-a716-446655440000
```

## Generating auth headers (viem)

```ts
import { privateKeyToAccount } from "viem/accounts";
import { randomUUID } from "crypto";

const account = privateKeyToAccount("0xYOUR_PRIVATE_KEY");

const getAuthHeaders = async () => {
  const nonce = randomUUID();
  const timestamp = String(Date.now());
  const message = `${account.address}:${timestamp}:${nonce}`;
  const signature = await account.signMessage({ message });

  return {
    "X-Wallet-Address": account.address,
    "X-Signature": signature,
    "X-Timestamp": timestamp,
    "X-Nonce": nonce,
  };
};
```

## Validation rules

- **Timestamp** must be within 60 seconds of the server's clock.
- **Nonce** must be unique; each nonce can be used only once.
- **Signature** is verified using EIP-191 `personal_sign` via the wallet address.
- If any check fails, the endpoint returns `401`.

## Public endpoints

No authentication needed:

| Endpoint | Description |
| --- | --- |
| `GET /agent/balance/:address` | Check token balances on-chain |
| `GET /agent/chains` | List supported chains and tokens |
| `GET /health` | Gateway health check |

## Related
- Up: [[Docs - MPP]]
- [[Docs - MPP - Deploy Flow]]: where the headers are used
- [[Docs - MPP - API Reference]]: which endpoints require auth
- [[Docs - MPP - Example]]: the `auth()` helper in a full script
