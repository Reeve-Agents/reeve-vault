---
aliases:
  - Reeve Stack
  - Reeve Architecture
tags:
  - brainstorm
  - reeve
  - type/page
scraped: 2026-10-17
source: brainstorm session 2026-10-17
up: "[[Reeve - Overview]]"
---

# Reeve - Architecture and Stack

> [!summary] Summary
> - Stack: **Vercel** (web/dashboard), **Supabase** (DB), **Railway** (broker plus scheduler), **CreateOS** (all agent-written code runs here), **Composio** (connectors). All are in the Stripe Projects catalog, so they can be provisioned through Stripe Projects, which also adds to Stripe's metric (providers per project).
> - **The CreateOS Free plan is enough** if sandboxes are used **in turn**: about 4–6 sandboxes per demo, under the 10/day limit. Beginner is needed only for Builder, Auditor and Operator running **at the same time**, or for parallel forks.
> - **Payments Web2, proof on-chain.** Updated 18 Oct 2026: the **crypto proof layer is part of the core**: daily Merkle-root receipt anchoring, 0G TEE (TeeML) inference with signed attestations, ERC-8004 identity for the Auditor. No crypto payments for Indonesian users (BI prohibition). See [[Reeve - Sustainability and Crypto Layer]].
> - *The "Web2 vs Web3" section below is the earlier reasoning (17 Oct), kept for history; the decision above supersedes it.*

## Provisioning through Stripe Projects

```bash
stripe projects add vercel/project
stripe projects add supabase/project
stripe projects add railway/hosting
stripe projects add createos/project
stripe projects add composio/project
```

Catalog entries ([[Stripe Projects - Providers]]): `vercel/project` (Hosting), `supabase/project` (Database, Auth, Storage), `railway/hosting` (Hosting, Database, Cache, Storage, cron jobs), `createos/project`, `composio/project` (AI, managed auth).

## Component roles

| Service | Role in Reeve |
|---|---|
| **Vercel** (`vercel/project`) | Owner/Admin/Accountant dashboard, Mera passkey approval page, Stripe webhook endpoint |
| **Supabase** (`supabase/project`) | DB: rulebook, rule versions, ledger, exception queue, receipts, spending mandates, purchase requests |
| **Railway** (`railway/hosting`) | **Broker** (real-key vault, egress proxy, action allowlist, mandate checks) and **scheduler/cron** that triggers sandbox jobs. Both need a long-running process, which suits Railway better than Vercel serverless |
| **CreateOS** (`createos/project`) | All agent-written code: compile, tests, simulation, audit, Operator runs |
| **Composio** (`composio/project`) | Connector layer (Stripe toolkit, Sheets, Shopify…), called only by the broker ([[Reeve - Connectors and Composio]]) |
| **Stripe** (test mode) | Customers, Invoices, test clocks, webhooks, MPP |
| **Mera** | Passkey: vault, agent identity, approvals, mandates ([[Reeve - Credential Broker and Mera]]) |

> [!warning] Railway is not a "backup runner"
> Use Railway for the broker and scheduler. **Do not** use Railway to run agent code when the CreateOS quota runs out. That breaks the hackathon brief (code must run in a CreateOS sandbox), and it loses the isolation and egress allowlist that are Reeve's selling point.

The free tiers of Vercel, Supabase and Railway are enough for the demo. Paid upgrades are not possible from Indonesia anyway ([[Plan Constraints - Free vs Beginner]]).

## CreateOS Free plan feasibility

Free gives **1 concurrent sandbox, 10 per day, up to 1 vCPU / 1 GB**, and **a paused sandbox still counts** toward the cap ([[Docs - Sandbox Limits]]).

| Reeve need | Problem on Free | Solution |
|---|---|---|
| Builder: compile + test | — | 1 sandbox, destroyed when done |
| Auditor: judge + mutation tests | Ideally separate from the Builder's sandbox | Run in turn: when the Builder finishes and is destroyed, create the Auditor |
| Always-on Operator (auto-pause) | **When paused, it locks the only slot**; Builder and Auditor can't run | For the demo: no always-on Operator. The scheduler creates a sandbox, runs the job, destroys it |
| 60-day simulation | — | One run with Stripe test clocks, not 60 sandboxes |

- About 4–6 sandboxes per demo, under the 10/day limit. Don't retry too much on the day; do trial runs earlier, because the daily limit is a rolling 24 hours.
- 1 GB RAM is enough for Python scripts (pandas, Stripe SDK). The `devbox:1` image ships Python 3.12 with pandas, numpy, and the openai/anthropic SDKs.
- Always set an egress allowlist: **egress is open by default**.

## Web2 vs Web3

**Why the core is Web2:**
- CreateOS × Stripe judges assess the sandbox, Stripe Projects, and agents that run code. Crypto is not judged.
- Users (kos owner, admin, accountant) don't need a wallet; Stripe already handles billing and payments.
- 5.5 hours: every chain layer adds demo-failure risk.
- Mera does not have to be Web3: the passkey PRF for vaults, identities and approvals runs purely in Web2.

**The only Web3 worth adding: audit receipt anchoring**

It answers the accountant's or investor's question: "how do I know this audit report wasn't changed afterwards?"

```text
Tiap hari: semua receipt run (hash kode + hash data + hasil + waktu)
        → disusun jadi Merkle tree → 1 root hash
        → root ditulis ke chain (Monad/Base) dalam 1 transaksi
Verifikasi: siapa pun cek receipt X ada di root tanggal Y → terbukti tidak diubah
```

- Data does not go on chain, only hashes, so privacy holds.
- One transaction per day, not per business transaction.
- It strengthens the Auditor's core (third-party verifiable), not decoration.

**Not needed:** ERC-8004 agent reputation (the agents are the business's own, not sold publicly), direct stablecoin payments (Stripe accepts stablecoins if needed later), Dynamic, Envio, Cleanverse ([[Monad Tools Evaluation]]).

**Order:**
1. **Hackathon:** full Web2 (CreateOS + Stripe + Mera).
2. **If time remains:** Merkle root anchoring as a bonus, "publicly verifiable audits".
3. **After the hackathon:** consider other Web3 layers only if there is real demand.

## Related
- Up: [[Reeve - Overview]]
- [[Reeve - Screens Demo and MVP]]: what is built on top of this stack
- [[Reeve - Model Providers]]: which model reads the SOP (Claude tiers, cheaper or free alternatives)
- [[Pricing - Sandbox]] · [[CreateOS on Stripe Projects]] · [[Stripe Projects - Commands]]
