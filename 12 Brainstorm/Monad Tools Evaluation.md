---
aliases:
  - Monad bounty tools
tags:
  - brainstorm
  - partner
  - type/page
scraped: 2026-10-17
source: /Users/Shenhan/HansProject/MonadMetropolis-Hackathon/Bounties
sources:
  - /Users/Shenhan/HansProject/MonadMetropolis-Hackathon/Bounties/bounty16.txt
  - /Users/Shenhan/HansProject/MonadMetropolis-Hackathon/Bounties/bounty17.txt
  - /Users/Shenhan/HansProject/MonadMetropolis-Hackathon/Bounties/bounty18.txt
  - /Users/Shenhan/HansProject/MonadMetropolis-Hackathon/Bounties/bounty9.txt
  - /Users/Shenhan/HansProject/MonadMetropolis-Hackathon/Bounties/bounty4.txt
  - /Users/Shenhan/HansProject/MonadMetropolis-Hackathon/Bounties/bounty6.txt
  - /Users/Shenhan/HansProject/MonadMetropolis-Hackathon/Bounties/bounty11.txt
up: "[[Brainstorm]]"
---

# Monad Tools Evaluation

> [!summary] Summary
> - The context comes from the tools in the Monad Metropolis bounty folder. Bounty info (prizes, deadlines) was **deliberately ignored**; only the content and concepts of each tool matter.
> - **Used in Reeve: Mera only** (non-wallet: vault, identity, approvals, mandates).
> - **Not used for the hackathon:** Dynamic, ERC-8004, Envio, Cleanverse, MetaMask Agent Wallet, Chainlink CRE. The core is Web2.
> - Answers on ERC-8004, Dynamic, Envio and Cleanverse come from general knowledge, **not scraped docs**. Check before use.

## The tools in the folder

| Tool | Gist (from the bounty text) |
|---|---|
| **Mera** (Monad Foundation) | Passkey account layer. PRF → deterministic key material; each salt is an isolated namespace; secret vaults; signing sessions; "stateless test" (identity reconstructs from the passkey) |
| **Dynamic** | SDK for auth, embedded wallets, **server and agent wallets**, signing; delegated access; Fireblocks Flow |
| **MetaMask Agent Wallet** | Plugins for the `mm` command; all transactions go through the Agent Wallet (signing, policy, MFA); idea "Agent-to-agent commerce: paid tool calls via x402 payments + ERC-8004 agent identity/reputation/validation registry" |
| **Envio** | HyperIndex / HyperSync / HyperRPC: indexing on-chain data |
| **Cleanverse** | Cleanverse Verified Identity (CVI) + Verified Assets (CVA): asset movement gated by on-chain identity verification (Travel Rule, permissioned DeFi, RWA) |
| **Chainlink CRE** | Chainlink Runtime Environment: workflow orchestration, blockchain + external API/LLM/agent |
| Others (not relevant) | Alchemy, Perpl (trading), Nansen (on-chain data), Agora (AUSD payments), Kuru (order book), Aurora Intents |

## Mera in Reeve (used)

| Mera primitive | Reeve use |
|---|---|
| Secret vault (wrap existing secrets) | Wraps the real Stripe / LLM / Composio keys in the broker |
| Salt namespaces | `agent:<id>` identities, `client:<id>:memory`, `mandate:<agent-id>` |
| Signing session concept | Scoped broker sessions: prompt-free within scope, re-prompt outside it |
| Passkey re-prompt | Irreversible money actions |
| Cross-device reconstruction | Dashboard and vault reconstruct in a fresh browser |

Details: [[Reeve - Credential Broker and Mera]].

## Q&A from the brainstorm

**Can Dynamic be combined with ERC-8004?** Yes.
- ERC-8004 ("Trustless Agents") is just a set of smart contracts with three registries:
  - **Identity Registry:** an ERC-721 NFT agent ID that points to an "agent card".
  - **Reputation Registry:** clients leave feedback on the agent's work.
  - **Validation Registry:** validators re-check work (re-execution, TEE, zk).
- A Dynamic agent wallet (server/agent wallet + delegated access) can simply be the owner or operator address of that identity NFT. There is no conflict.

**Is Envio weaker than ERC-8004 track records?** They are different categories, not competitors.
- ERC-8004 is the **data source** (the track record lives in the contract).
- Envio is an **indexer** (it reads contract events such as new feedback and serves them fast over GraphQL).
- Envio is needed only for aggregation (a reputation score from hundreds of feedback entries, history per agent). For a small-data MVP, read the contract directly over RPC.

**Is Cleanverse visible from the smart contract, and is that also visible in ERC-8004?** Both are visible on-chain, but they prove different things.
- **ERC-8004** proves the **agent's** identity and track record.
- **Cleanverse (CVI)** proves the **human or entity owner** is verified (KYC, Travel Rule). Per the bounty text, credentials are wallet-bound and checked on-chain before assets move.
- ERC-8004 does not tell you whether the agent's owner is KYC'd. Cleanverse is relevant only if payouts to owners must be regulation-compliant.

## Why not for the hackathon

- **ERC-8004 / agent reputation:** Reeve's agents belong to the business itself and are not sold publicly. A reputation registry was relevant to the earlier "Tukang" marketplace idea ([[Brainstorm - Idea Evolution]]).
- **Dynamic:** crypto wallet infrastructure. Agent purchases are handled by Stripe Projects + SPT + mandates ([[Reeve - Agent Payments]]).
- **Envio:** no on-chain data to index (except receipt anchoring, where one daily root needs no indexer).
- **Cleanverse:** no compliance payouts in the MVP.
- **MetaMask Agent Wallet / x402 + ERC-8004:** fit for an A2A marketplace (Tukang), not Reeve.
- **Chainlink CRE:** fit for escrow release in Tukang (off-chain test passes → on-chain release).

## Related
- Up: [[Brainstorm]]
- [[Reeve - Architecture and Stack]]: Web2 vs Web3 decision
- [[Brainstorm - Idea Evolution]]: the earlier ideas where these tools fitted better
