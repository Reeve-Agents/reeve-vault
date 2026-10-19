---
aliases:
  - Ideas to Start From
tags:
  - hackathon
  - hackathon/idea
  - type/hub
source: https://createos.sh/hackathon
sources:
  - https://createos.sh/hackathon
  - https://createos.sh/hackathon.md
scraped: 2026-10-17
up: "[[Hackathon Overview]]"
---

# Hackathon Ideas

> [!summary] Summary
> - 30 ideas in 6 categories: Builders 4, Money 4, Safe 3, Computer use 3, Always on 4, Stretch 12.
> - Starting points, not tracks. Pick one, remix one, or bring your own: any agent that writes code and runs it in a CreateOS sandbox fits the brief.
> - Each idea leans on one thing the sandbox does well (its "Sandbox" feature).
> - 11 ideas are marked **Needs Beginner plan**: they need more than the Free plan's single 1 vCPU sandbox (see [[Docs - Sandbox Limits]]).
> - Source: https://createos.sh/hackathon

## Categories

| Category | Tagline | Ideas | Note |
|---|---|---|---|
| Builders | Agents that write and fix code | 4 | [[Ideas - Builders]] |
| Money | Agents people would pay for | 4 | [[Ideas - Money]] |
| Safe | Agents with guardrails | 3 | [[Ideas - Safe]] |
| Computer use | Agents that browse and click | 3 | [[Ideas - Computer Use]] |
| Always on | Agents that stick around | 4 | [[Ideas - Always On]] |
| Stretch | Newer patterns, for teams who want a challenge | 12 | [[Ideas - Stretch]] |

## All 30 ideas

| # | Idea | Category | Needs Beginner plan | Sandbox feature | Partner services (With) |
|---|---|---|---|---|---|
| 1 | Stripe webhook fixer | [[Ideas - Builders]] | no | Live public URL | none |
| 2 | Sentry error to reproduction | [[Ideas - Builders]] | no | Egress allowlist and exec | Sentry |
| 3 | Docs snippet tester | [[Ideas - Builders]] | no | Fresh sandbox per run | none |
| 4 | Client landing page in 10 minutes | [[Ideas - Builders]] | no | Wake-on-request URL | none |
| 5 | Stripe revenue analyst | [[Ideas - Money]] | no | Egress allowlist | none |
| 6 | Payout reconciler | [[Ideas - Money]] | no | exec and file transfer | none |
| 7 | CS assignment grader | [[Ideas - Money]] | yes | Egress blocked, fork from a ready snapshot | none |
| 8 | Timesheet to invoice | [[Ideas - Money]] | no | exec and Stripe | none |
| 9 | "Should I install this?" package check | [[Ideas - Safe]] | no | Egress allowlist | none |
| 10 | Phishing link opener | [[Ideas - Safe]] | yes | Desktop and self-signal | none |
| 11 | Refund agent with guardrails | [[Ideas - Safe]] | no | Egress allowlist and pause for approval | none |
| 12 | Accessibility auditor | [[Ideas - Computer Use]] | yes | Desktop and computer use | none |
| 13 | New user onboarding tester | [[Ideas - Computer Use]] | yes | Desktop and live view link | none |
| 14 | Docs screenshot refresher | [[Ideas - Computer Use]] | yes | Desktop and computer use | none |
| 15 | Founder's morning KPI email | [[Ideas - Always On]] | no | Auto-pause and resume | PostHog |
| 16 | Receipts inbox | [[Ideas - Always On]] | no | Pause between emails | AgentMail |
| 17 | Fork my analysis | [[Ideas - Always On]] | yes | Pause with memory and fork | none |
| 18 | Alert responder | [[Ideas - Always On]] | no | Wake-on-request | none |
| 19 | Code Mode for Stripe | [[Ideas - Stretch]] | no | Egress allowlist | Stripe test mode |
| 20 | An agent that sets up its own stack | [[Ideas - Stretch]] | no | Preview URL | Neon, Clerk, CreateOS |
| 21 | Stack bake-off | [[Ideas - Stretch]] | no | Data stack preinstalled | Neon, Turso, PlanetScale |
| 22 | Pay-per-run code runner | [[Ideas - Stretch]] | no | Its own kernel | Stripe MPP |
| 23 | Autoresearch in an afternoon | [[Ideas - Stretch]] | no | Pause and resume | OpenRouter |
| 24 | An agent that writes its own tools | [[Ideas - Stretch]] | no | Coding agents preinstalled | Supermemory |
| 25 | Eval builder | [[Ideas - Stretch]] | no | Egress allowlist | OpenRouter |
| 26 | Fork-and-race fixer | [[Ideas - Stretch]] | yes | Fork | GitLab |
| 27 | Red team with proof | [[Ideas - Stretch]] | yes | Private network | none |
| 28 | Swarm scored by a test suite | [[Ideas - Stretch]] | yes | Peers by name | GitLab, OpenRouter |
| 29 | Computer use on an app with no API | [[Ideas - Stretch]] | yes | Desktop image | none |
| 30 | Bug fixer that reproduces first | [[Ideas - Stretch]] | yes | Docker inside | Sentry, GitLab |

"none" means the idea card names no "With" service. Ideas without a partner may still use Stripe in the pitch (for example webhook fixer, revenue analyst, refund agent).

## Sandbox features named on the cards
- **Network:** Egress allowlist · Egress blocked · Private network · Peers by name
- **URLs and waking:** Live public URL · Preview URL · Wake-on-request URL · Wake-on-request
- **Lifecycle:** Fresh sandbox per run · Auto-pause and resume · Pause and resume · Pause between emails · Pause with memory and fork · Pause for approval · Fork · Fork from a ready snapshot · Self-signal
- **Execution:** exec · exec and file transfer · exec and Stripe · Its own kernel (Firecracker micro-VM) · Docker inside
- **Images:** Desktop (`desktop:1`, Chrome) · Desktop image · Desktop and computer use · Desktop and live view link · Data stack preinstalled (`devbox:1`) · Coding agents preinstalled (`devbox:1`)

### Where each feature is documented

| Feature group (cards) | Docs notes |
|---|---|
| Egress allowlist, egress blocked | [[Docs - Sandbox REST API - Networking and Egress#Egress]] · [[Docs - Sandbox Limits#Network]] · [[Egress Governance]] |
| Private network, peers by name | [[Docs - Sandbox REST API - Networking and Egress#Networks]] · [[Sandbox Networking]] |
| Live public URL, preview URL | [[Docs - Sandbox Overview and Concepts#Ingress]] · [[Docs - Sandbox SDK - How-To Guides#Expose a Service]] |
| Wake-on-request | [[Docs - Sandbox Overview and Concepts]] (capabilities table, "Wake on request") |
| exec, file transfer | [[Docs - Sandbox REST API - Lifecycle and Execution#Execution and Files]] · [[Docs - Sandbox SDK - How-To Guides#Upload and Download Files]] |
| Pause, resume, auto-pause, fork, snapshot | [[Docs - Sandbox REST API - Lifecycle and Execution#Pause, Resume and Fork]] · [[Docs - Sandbox SDK - How-To Guides#Pause, Fork and Auto-Pause]] · [[Docs - Sandbox Overview and Concepts#Snapshot, pause, resume]] |
| Self-signal | [[Docs - Sandbox REST API - Lifecycle and Execution#Self-Signal (In-Sandbox)]] |
| Desktop, computer use, live view | [[Docs - Sandbox REST API - Computer Use and Devices#Computer]] · [[Docs - Sandbox SDK - API Reference]] |
| Images (`devbox:1`, `desktop:1`), Docker inside, coding agents preinstalled | [[Docs - Sandbox Limits#Images (rootfs)]] · [[Docs - Sandbox Integrations]] |
| Own kernel (Firecracker micro-VM), fresh sandbox per run | [[Docs - Sandbox Security and Self-Hosting#Security model]] · [[Docs - Sandbox Overview and Concepts#Concepts]] |
| Free vs Beginner plan ("Needs Beginner plan") | [[Docs - Sandbox Limits#Concurrency and plan limits]] · [[Pricing - Sandbox]] |
| Pay-per-run (Stripe MPP) | [[Docs - MPP]] |

## Adding services
- The page notes: need a database, search or email for your agent? `stripe projects catalog` lists every provider you can add. See [[Stripe Projects - Providers]].
- Link on the page: "Everything CreateOS Sandbox can do" points to https://createos.sh/products/sandbox ([[Product - Sandbox]]).

## Related
- Up: [[Hackathon Overview]]
- [[Hackathon Partner Services]]: what each "With" service is
- [[Docs - Sandbox]]: docs for the sandbox features above
- [[Docs - Sandbox Limits]]: Free plan vs Beginner plan limits
- [[Pricing - Sandbox]]: plan pricing
- [[Hackathon FAQ]]: "Do I have to build one of the ideas on this page?"
