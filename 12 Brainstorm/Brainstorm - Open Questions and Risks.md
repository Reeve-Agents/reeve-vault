---
aliases:
  - Open Questions
  - Reeve Risks
tags:
  - brainstorm
  - reeve
  - type/page
scraped: 2026-10-17
source: brainstorm session 2026-10-17
up: "[[Brainstorm]]"
---

# Brainstorm - Open Questions and Risks

> [!summary] Summary
> - Things that are **still unverified** and need checking before or during the build.
> - Risks that could break the demo, and their mitigations.
> - A security warning: a `.env` from the Stripe CLI test sits inside the Obsidian vault.

## Still unverified

| Question | Why it matters | How to check |
|---|---|---|
| Can a Stripe account be created with **Indonesia** as the country (for test mode / MPP)? | The hackathon and MPP need a Stripe account | Try signing up at dashboard.stripe.com with your real country; ask the organisers if it fails |
| Can the createos.sh/app dashboard upgrade to Beginner or top up from Indonesia? | An alternative to Stripe Projects | Log in to createos.sh/app → profile/billing |
| Exact Mera API (PRF, secret vault, sessions), and PRF support per browser | The broker and passkey approvals depend on it | Read mera.category.xyz/reference/ |
| Prize split, judging criteria, leaderboard rules | Pitch strategy | Discord after Luma approval |
| Whether Composio is used for Stripe calls or a direct Stripe SDK in the broker | Simplicity vs the connector story | Decide at build time; Stripe direct is simpler for the MVP |
| Value of 1 CreateOS credit in dollars | Cost estimate on Free | Not stated in the docs ([[Docs - Account and Billing]]) |
| Details of MPP sessions and the Link agent wallet | Mandate design | docs.stripe.com/payments/machine/mpp/sessions |
| ERC-8004, Dynamic, Envio, Cleanverse | Answered from general knowledge, not scraped | Only if Web3 layers are added later |

## Demo risks

| Risk | Mitigation |
|---|---|
| The Free daily limit (10 sandboxes per 24 hours) runs out during trials | Do trial runs before the day; use sandboxes one at a time; destroy after every job |
| A paused sandbox locks the only slot | No always-on Operator in the demo; the scheduler creates and destroys |
| Egress is open by default | Always set an allowlist (broker only / `api.stripe.com`) |
| The Auditor writes a wrong check (false assurance) | Mutation tests with planted fake violations |
| Confusing CreateOS MPP with Stripe MPP | Use Stripe MPP test mode; never claim compatibility |
| The real key leaks into the sandbox | Placeholder + broker; never pass a real key via `envs` |
| `COMPOSIO_API_KEY` in the sandbox | Keep it only in the broker |
| Too many layers in 5.5 hours | Cut Web3, multi-connector and anchoring first ([[Reeve - Screens Demo and MVP]]) |
| Source inconsistencies (e.g. `devbox:1` Debian vs Ubuntu; default image `alpine:3.20`) | Always pass `rootfs: "devbox:1"` explicitly ([[Docs - Sandbox Limits]]) |

## Security warning

> [!warning] A `.env` inside the Obsidian vault
> The folder `vault/11 Spike Testing/Stripe CLI test/` contains `.env` (613 bytes) and `.projects/state.local.json` from the user's Stripe CLI test. The content was not opened, but the file likely holds CreateOS credentials in plaintext. If this vault is synced (Obsidian Sync, iCloud, git) or shared, the credentials spread with it. **Move that folder outside `vault/`, or rotate its keys if the vault has already been synced.**

## Related
- Up: [[Brainstorm]]
- [[Plan Constraints - Free vs Beginner]] · [[Reeve - Overview]]
