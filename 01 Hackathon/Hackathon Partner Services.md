---
tags:
  - hackathon
  - partner
  - type/index
source: https://createos.sh/hackathon
sources:
  - https://createos.sh/hackathon
  - https://docs.stripe.com/projects
  - https://sentry.io/welcome/
  - https://posthog.com/
  - https://www.agentmail.to/
  - https://neon.com/
  - https://clerk.com/
  - https://turso.tech/
  - https://planetscale.com/
  - https://openrouter.ai/
  - https://supermemory.ai/
  - https://about.gitlab.com/
  - https://mpp.dev/
  - https://docs.stripe.com/payments/machine/mpp
scraped: 2026-10-17
up: "[[Hackathon Overview]]"
---

# Hackathon Partner Services

> [!summary] Summary
> - 11 third-party services appear in the "With" line of the idea cards: Sentry, PostHog, AgentMail, Neon, Clerk, Turso, PlanetScale, OpenRouter, Supermemory, GitLab, Stripe MPP.
> - Two more "With" tags are first-party: Stripe test mode (Code Mode for Stripe) and CreateOS (An agent that sets up its own stack).
> - One-line descriptions come from each service's own homepage meta description. "Stripe Projects category" comes from the provider table at docs.stripe.com/projects.
> - `stripe projects catalog` lists every provider you can add (hackathon page).
> - Source: https://createos.sh/hackathon

## Overview table

| Service | URL | Stripe Projects category | Ideas mentioning it |
|---|---|---|---|
| Sentry | https://sentry.io | not in the provider table | 2 |
| PostHog | https://posthog.com | Analytics, feature flags | 1 |
| AgentMail | https://www.agentmail.to | Email | 1 |
| Neon | https://neon.com | Database, authentication | 2 |
| Clerk | https://clerk.com | Authentication | 1 |
| Turso | https://turso.tech | Database | 1 |
| PlanetScale | https://planetscale.com | Database | 1 |
| OpenRouter | https://openrouter.ai | AI | 3 |
| Supermemory | https://supermemory.ai | AI, database, search | 1 |
| GitLab | https://about.gitlab.com | CI/CD, observability, storage | 3 |
| Stripe MPP | https://mpp.dev | not in the provider table | 1 |

## Sentry
- **What:** Application performance monitoring and error tracking for developers and software teams (sentry.io).
- **URL:** https://sentry.io
- **Ideas:** [[Ideas - Builders#Sentry error to reproduction|Sentry error to reproduction]] · [[Ideas - Stretch#Bug fixer that reproduces first|Bug fixer that reproduces first]]

## PostHog
- **What:** "Your product's context layer"; automatically diagnoses problems, fixes bugs, and generates pull requests (posthog.com).
- **URL:** https://posthog.com
- **Ideas:** [[Ideas - Always On#Founder's morning KPI email|Founder's morning KPI email]]

## AgentMail
- **What:** Email inbox API for AI agents: real inboxes via API to create, send, receive and search email; free tier (agentmail.to).
- **URL:** https://www.agentmail.to
- **Ideas:** [[Ideas - Always On#Receipts inbox|Receipts inbox]]

## Neon
- **What:** Postgres backends for apps and agents: Lakebase Postgres, Auth, Functions, Storage and an AI Gateway; instant, branchable, serverless (neon.com).
- **URL:** https://neon.com
- **Ideas:** [[Ideas - Stretch#An agent that sets up its own stack|An agent that sets up its own stack]] · [[Ideas - Stretch#Stack bake-off|Stack bake-off]]

## Clerk
- **What:** Authentication and user management for applications; built for React, Next.js, Remix (clerk.com).
- **URL:** https://clerk.com
- **Ideas:** [[Ideas - Stretch#An agent that sets up its own stack|An agent that sets up its own stack]]

## Turso
- **What:** SQLite-based database architecture for millions of databases: one database per user, agent or tenant, with embedded replication and per-database encryption (turso.tech).
- **URL:** https://turso.tech
- **Ideas:** [[Ideas - Stretch#Stack bake-off|Stack bake-off]]

## PlanetScale
- **What:** Cloud hosting for Vitess, Neki and Postgres databases (planetscale.com).
- **URL:** https://planetscale.com
- **Ideas:** [[Ideas - Stretch#Stack bake-off|Stack bake-off]]

## OpenRouter
- **What:** A unified interface for every model; compare models and prices for your prompts (openrouter.ai).
- **URL:** https://openrouter.ai
- **Ideas:** [[Ideas - Stretch#Autoresearch in an afternoon|Autoresearch in an afternoon]] · [[Ideas - Stretch#Eval builder|Eval builder]] · [[Ideas - Stretch#Swarm scored by a test suite|Swarm scored by a test suite]]

## Supermemory
- **What:** Memory and continual-learning engine for agents (supermemory.ai).
- **URL:** https://supermemory.ai
- **Ideas:** [[Ideas - Stretch#An agent that writes its own tools|An agent that writes its own tools]]

## GitLab
- **What:** Orchestration platform for teams and agents across the software lifecycle, with context and governance (about.gitlab.com).
- **URL:** https://about.gitlab.com
- **Ideas:** [[Ideas - Stretch#Fork-and-race fixer|Fork-and-race fixer]] · [[Ideas - Stretch#Swarm scored by a test suite|Swarm scored by a test suite]] · [[Ideas - Stretch#Bug fixer that reproduces first|Bug fixer that reproduces first]]

## Stripe MPP
- **What:** Machine Payments Protocol: HTTP 402 payments for API requests, tool calls and content, co-developed by Tempo and Stripe (mpp.dev). Stripe docs: a payment protocol that lets automated systems and AI agents make payments.
- **URL:** https://mpp.dev · Stripe docs: https://docs.stripe.com/payments/machine/mpp
- **Ideas:** [[Ideas - Stretch#Pay-per-run code runner|Pay-per-run code runner]]
- CreateOS has its own MPP docs: [[Docs - MPP]].

## First-party "With" tags
- **Stripe test mode:** [[Ideas - Stretch#Code Mode for Stripe|Code Mode for Stripe]]
- **CreateOS:** [[Ideas - Stretch#An agent that sets up its own stack|An agent that sets up its own stack]] (CreateOS as a Stripe Projects provider, category Compute; see [[CreateOS on Stripe Projects]])

## Related
- Up: [[Hackathon Overview]]
- [[Hackathon Ideas]]: full idea table with partner column
- [[Stripe Projects - Providers]]: the full Stripe Projects provider list
- [[Stripe Projects]]: how providers are added (`stripe projects add`)
- [[Docs - MPP]]: CreateOS machine payments docs
