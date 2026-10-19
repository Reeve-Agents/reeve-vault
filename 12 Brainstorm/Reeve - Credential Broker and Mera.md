---
aliases:
  - Keyless Agent
  - Credential Broker
  - Credentials outside the guest
tags:
  - brainstorm
  - reeve
  - type/page
scraped: 2026-10-17
source: brainstorm session 2026-10-17
sources:
  - https://hn.algolia.com/api/v1/items/50059096
  - https://hn.algolia.com/api/v1/items/49239751
  - https://hn.algolia.com/api/v1/items/47532148
  - https://mera.category.xyz/concepts/passkeys-and-prf/
  - https://mera.category.xyz/concepts/secret-vaults/
  - https://mera.category.xyz/recipes/use-an-existing-secret/
up: "[[Reeve - Overview]]"
---

# Reeve - Credential Broker and Mera

> [!summary] Summary
> - **"Guest"** is the operating system inside the sandbox (microVM), where agent-written code runs. **"Credentials outside the guest"** means the **real API key never enters the sandbox**. The sandbox holds only a placeholder, and a **broker** outside the sandbox swaps in the real key on egress.
> - Origin: a 2026 HN discussion (Agent37 launch thread). The real risk is now "agents acting with broad credentials, not host escape."
> - **Mera fits on the broker/user side, not inside the sandbox**: as a vault for the real key, per-agent identities (salt namespaces), passkey re-prompts for irreversible actions, and spending mandates.
> - Mera docs have **not been read in full**; the exact API is unverified.

## Today's problem

The common way is to pass the key through an environment variable:

```json
{ "rootfs": "devbox:1", "envs": { "STRIPE_SECRET_KEY": "sk_live_..." } }
```

- Any code inside the sandbox can read `os.environ["STRIPE_SECRET_KEY"]`, including LLM-written code that has been prompt-injected.
- That code can print the key, send it to an attacker's server, or misuse it (e.g. mass refunds).
- The CreateOS API returns only key names, not values, but inside the sandbox the value is still readable. CreateOS docs themselves advise keeping production credentials on the caller's side ([[Docs - Sandbox Limits]]).

## The HN proposal (Agent37 launch thread, Oct 2026)

- Commenters argued the real risk is "the agent acting with broad credentials, not host escape" (talkarimli, ekorondy, sscaryterry).
- Solution: **brokers that keep credentials outside the guest, with short-lived, narrow grants**.
- radim_h described a similar proxy (Stashbase.dev). Docker Sandboxes has a placeholder-swap mechanism.
- Requests for **action-level tagging (read / write / irreversible)**, not only method+path rules.
- skybrian (Stripe Projects HN thread): API keys sit in an ordinary config file, with nothing to stop an AI being tricked into exfiltrating them.

```text
[sandbox / guest]                      [broker di luar guest]               [api.stripe.com]
STRIPE_KEY=placeholder_abc  ──request──▶  cek: host diizinkan? aksi diizinkan?
                                          ganti placeholder → sk_live asli   ──▶
                                          (key berumur pendek, scope sempit)
```

Broker properties:
1. **The sandbox holds only a placeholder**, which is useless if it leaks.
2. **The real key is injected on the egress path**, and only for allowed hosts (e.g. `api.stripe.com`).
3. **Short-lived, narrow scope**: e.g. read charges only, 10 minutes, for one agent.
4. **Action-level tagging**: read passes automatically; irreversible actions (refund, delete) wait for human approval.

Why it matters for Stripe × CreateOS: Stripe Projects already issues scoped delegated credentials (June 2026 update), and CreateOS already has an egress proxy and allowlist. Connecting the two is a gap in both products. This was **"Keyless Agent", idea #1** in the [[Partnership Analysis Report]].

Free-plan friendly: the broker runs on a laptop or a small server (Railway), and the sandbox's egress allows only the broker:

```json
"egress": ["broker.domainmu.com:443"]
```

## Mera: what it is (from the Monad bounty texts)

- Monad's passkey account layer. **PRF output = deterministic key material**. **Each salt is an isolated namespace**: one passkey can mint unlimited unrelated keys (encryption, identities, capabilities), all reconstructible from the passkey alone, with **zero secrets stored**.
- Has **secret vaults** (wrapping existing credentials such as API keys under a passkey) and **signing sessions** (prompt-free within scope, re-prompt outside scope).
- Resources: https://mera.category.xyz/concepts/passkeys-and-prf/ · https://mera.category.xyz/concepts/secret-vaults/ · https://mera.category.xyz/recipes/use-an-existing-secret/ · https://github.com/category-labs/mera

## Why Mera must not run inside the sandbox

- Mera works through passkeys (WebAuthn PRF): it needs a ceremony in a browser or authenticator with the user present. The CreateOS sandbox is a headless microVM.
- If the key were derived or decrypted inside the sandbox, the real key would enter the guest, which is the very problem we are avoiding.

## Mapping Mera to the HN problems

| HN problem | Mera primitive | Role |
|---|---|---|
| Real key stored in plaintext `.env` / config (Stripe Projects complaint) | Secret vault: wraps an existing credential under a passkey, no secret on disk or server | The `sk_...` from Stripe Projects is encrypted to the passkey; the broker stores no plaintext at rest |
| Agents with broad credentials | One salt = one isolated namespace | Each agent/run gets its own identity from salt `agent:<id>`; the broker authenticates the agent by signature, not a static token |
| Short-lived, narrow grants | Signing session: prompt-free within scope | Broker session with an allowlist of actions (e.g. read charges) plus a TTL |
| Read / write / irreversible tagging | Passkey re-prompt | Irreversible actions (refund, delete) trigger Face ID / Touch ID: verified human approval |
| Credentials lost when changing device | Reconstructible from the passkey | The credential vault moves to another laptop or phone with no custody backend |

## Flow

```text
1. User: passkey → Mera PRF(salt "vault:stripe") → decrypt sk_live (di broker, di memori saja)
2. Broker: buka sesi {agent: a1, scope: [GET /v1/charges], ttl: 30m}; kasih sandbox placeholder
3. Sandbox CreateOS (egress allowlist = broker saja) kirim request bawa placeholder
4. Broker: cek scope → ganti placeholder dengan key asli → teruskan ke api.stripe.com
5. Aksi irreversible (POST /v1/refunds) → di luar scope → minta passkey user → baru diteruskan
6. Sesi habis → plaintext dibuang dari memori
```

## Mera namespaces in Reeve

| Salt namespace | Function |
|---|---|
| `owner:vault` / `vault:stripe` | Wraps the agent owner's API keys (Stripe restricted key, LLM key). The broker opens them only for the length of a session |
| `agent:<id>` | Agent identity. A derived keypair signs work receipts |
| `client:<id>:memory` | Agent memory about a specific client/deal is encrypted; context moves across devices and nobody else can read it (Diligence mode) |
| `mandate:<agent-id>` | Key used to sign spending mandates ([[Reeve - Agent Payments]]) |
| Passkey re-prompt | Irreversible actions (escrow release, refund, payout, fine waiver) need the owner's Face ID / Touch ID |

**Cross-device test:** the owner opens the dashboard in a fresh browser, and the agents, vault and memory reconstruct from the same passkey.

## Caveats

- **At use time the real key is still plaintext in the broker's memory.** Mera secures storage and authorisation, not the moment of use. That is acceptable because the broker is outside the sandbox.
- **Long-running autonomous agents need good session design.** A TTL that is too long equals a static key; too short and the user is constantly prompted.
- **PRF-derived keys are deterministic per salt.** To rotate, change the salt (e.g. `vault:stripe:v2`). Stripe API keys themselves are wrapped, not derived.
- **PRF support varies across browsers and authenticators.** Check the Mera docs. API specifics are unverified (docs not read in full).
- Mera **signing sessions** are designed for Monad transactions. In a Web2 design we reuse the idea (scoped session plus re-prompt) and sign mandates with a PRF-derived key.

## Demo (under 1 minute)

1. The agent in the sandbox runs `printenv`: only placeholders appear.
2. The agent makes a read request to Stripe: it succeeds without a prompt.
3. The agent tries a refund: a passkey prompt appears.
4. You decline: the request is blocked.

## Related
- Up: [[Reeve - Overview]]
- [[Reeve - Agent Payments]]: spending mandates signed with Mera
- [[Monad Tools Evaluation]]: Mera's place among the other Monad bounty tools
- [[Docs - Sandbox REST API - Networking and Egress]] · [[Egress Governance]]
- [[Stripe Projects - Environments and Credentials]]: how Stripe Projects stores credentials today
