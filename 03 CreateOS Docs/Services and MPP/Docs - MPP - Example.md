---
aliases:
  - MPP Complete Example
tags:
  - createos/docs
  - createos/docs/mpp
  - type/page
source: https://createos.sh/docs/MPP/Example
scraped: 2026-10-17
up: "[[Docs - MPP]]"
---

# Docs - MPP - Example

> [!summary] Summary
> - Deploy to CreateOS with plain `fetch` + `viem`; "No SDK or special dependencies needed."
> - Prerequisite: `npm install viem`, an EVM wallet funded with ETH (gas) and USDC on Arbitrum or Base.
> - Script: auth helper → quote (`POST /agent/deploy`) → if `402`, ERC20 transfer → deploy with `X-Payment-Tx` → poll every 5 s until `ready`.
> - Extra snippets: zip upload, list projects, check balance.
> - Source: https://createos.sh/docs/MPP/Example

## Prerequisites

```bash
npm install viem
```

Generate a wallet if you don't have one:

```ts
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
const privateKey = generatePrivateKey();
const account = privateKeyToAccount(privateKey);
console.log("Address:", account.address);
// Save privateKey securely
```

- Fund the wallet with ETH (gas) and USDC on Arbitrum or Base.

## Full deploy script

Steps in the script:

1. Build the auth headers (`auth()` helper).
2. Get a quote. A `200` means existing credits covered the deploy.
3. On `402`: create viem wallet and public clients on `arbitrum`, transfer `quote.amount_token` USDC to `quote.pay_to`, wait for the receipt.
4. Re-send the deploy with `X-Payment-Tx`, `X-Payment-Chain`, `X-Payment-Token`.
5. Poll status every 5000 ms; stop on `ready` (print endpoint) or `failed` (throw `reason`).

```ts
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, createPublicClient, http } from "viem";
import { arbitrum } from "viem/chains";
import { randomUUID } from "crypto";

const GATEWAY = "https://mpp-createos.nodeops.network";
const account = privateKeyToAccount("0xYOUR_PRIVATE_KEY");

// --- Auth helper ---
const auth = async () => {
  const nonce = randomUUID();
  const timestamp = String(Date.now());
  const signature = await account.signMessage({
    message: `${account.address}:${timestamp}:${nonce}`,
  });
  return {
    "X-Wallet-Address": account.address,
    "X-Signature": signature,
    "X-Timestamp": timestamp,
    "X-Nonce": nonce,
  };
};

// --- ERC20 ABI ---
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

// --- Deploy body ---
const body = {
  uniqueName: `app-${Date.now()}`,
  displayName: "My App",
  upload: {
    type: "files",
    files: [
      {
        path: "index.js",
        content: btoa(
          'require("http").createServer((q,s) => s.end("Hello from CreateOS!")).listen(3000)',
        ),
      },
      { path: "package.json", content: btoa('{"name":"app"}') },
    ],
  },
};

// 1. Get quote
const quoteRes = await fetch(`${GATEWAY}/agent/deploy`, {
  method: "POST",
  headers: { "Content-Type": "application/json", ...(await auth()) },
  body: JSON.stringify(body),
});

if (quoteRes.ok) {
  // Already had credits - deployed for free
  const result = await quoteRes.json();
  console.log("Deployed (credits):", result);
} else if (quoteRes.status === 402) {
  const quote = await quoteRes.json();
  console.log(`Payment required: $${quote.amount_usd} ${quote.token}`);

  // 2. Pay
  const walletClient = createWalletClient({
    account,
    chain: arbitrum,
    transport: http(),
  });
  const publicClient = createPublicClient({
    chain: arbitrum,
    transport: http(),
  });

  const txHash = await walletClient.writeContract({
    address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", // USDC on Arbitrum
    abi: ERC20_ABI,
    functionName: "transfer",
    args: [quote.pay_to, BigInt(quote.amount_token)],
  });
  await publicClient.waitForTransactionReceipt({ hash: txHash });
  console.log("Payment confirmed:", txHash);

  // 3. Deploy with payment proof
  const deployRes = await fetch(`${GATEWAY}/agent/deploy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Payment-Tx": txHash,
      "X-Payment-Chain": quote.payment_chain,
      "X-Payment-Token": quote.token,
      ...(await auth()),
    },
    body: JSON.stringify(body),
  });
  const { projectId, deploymentId } = await deployRes.json();

  // 4. Poll until ready
  let endpoint;
  while (!endpoint) {
    await new Promise((r) => setTimeout(r, 5000));
    const statusRes = await fetch(
      `${GATEWAY}/agent/deploy/${projectId}/${deploymentId}/status`,
      { headers: await auth() },
    );
    const status = await statusRes.json();
    if (status.status === "ready") endpoint = status.endpoint;
    if (status.status === "failed") throw new Error(status.reason);
    console.log("Status:", status.status);
  }

  console.log(`Live: ${endpoint}`);
}
```

## Zip upload

Replace the `upload` field in the body:

```ts
import { readFileSync } from "fs";

const body = {
  uniqueName: `app-${Date.now()}`,
  displayName: "My App",
  upload: {
    type: "zip",
    data: readFileSync("code.zip").toString("base64"),
    filename: "code.zip",
  },
};
```

## List your projects

```ts
const res = await fetch(`${GATEWAY}/agent/projects`, {
  headers: await auth(),
});
const { projects } = await res.json();
projects.forEach((p) => console.log(`${p.name}: ${p.url ?? "deploying..."}`));
```

## Check balance

```ts
const res = await fetch(
  `${GATEWAY}/agent/balance/${account.address}?chain=arbitrum`,
);
const { balances } = await res.json();
balances.forEach((b) => console.log(`${b.symbol}: ${b.balance}`));
```

## Related
- Up: [[Docs - MPP]]
- [[Docs - MPP - Authentication]]: the signed-message format used by `auth()`
- [[Docs - MPP - Deploy Flow]]: the steps this script implements
- [[Docs - MPP - API Reference]]: endpoints and responses
