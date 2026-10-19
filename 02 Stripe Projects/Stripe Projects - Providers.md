---
aliases:
  - Stripe Projects provider catalog
  - Stripe Projects providers list
tags:
  - stripe/projects
  - type/index
source: https://docs.stripe.com/projects#available-providers
sources:
  - https://docs.stripe.com/projects
  - https://projects.dev/providers/
  - https://projects.dev/llms.txt
  - https://docs.stripe.com/projects/provider-intake
scraped: 2026-10-17
up: "[[Stripe Projects]]"
---

# Stripe Projects - Providers

> [!summary] Summary
> - docs.stripe.com lists **66 providers** ("60+") that "co-designed the integration protocol with Stripe"; projects.dev lists **68 providers** with their service slugs.
> - Add any of them with `stripe projects add <provider>/<service>`. Current list: `stripe projects catalog` or https://projects.dev/providers.
> - CreateOS is a provider: slug `createos/project`, categories Sandbox, Hosting (projects.dev) / Compute (docs). See [[CreateOS on Stripe Projects]].
> - Become or request a provider: provider-request@stripe.com.
> - Source: https://docs.stripe.com/projects#available-providers

## The integration protocol

- The listed providers co-designed the integration protocol with Stripe.
- The protocol standardizes provisioning, plan selection, upgrades, and credential handoff.
- Run `stripe projects catalog` at any time for the current providers and service tiers. Web directory: https://projects.dev/providers.
- Catalog commands: `stripe projects catalog`, `stripe projects catalog <provider>`, `stripe projects catalog <category>`, `stripe projects search <keyword>` (see [[Stripe Projects - Commands]]).

## Provider list on docs.stripe.com

| Provider | Primary categories |
| --- | --- |
| AgentMail | Email |
| AgentPhone | Communications |
| Algolia | Search |
| Amplitude | Analytics, feature flags |
| Athena | AI |
| Auth0 | Auth |
| Base 44 | Hosting, database, AI |
| Blaxel | Hosting, sandbox, AI |
| Browserbase | Browser, AI |
| Chatbase | AI |
| Chroma | Database, AI |
| Churnkey | Payments |
| Clerk | Authentication |
| ClickHouse | Database, analytics |
| Cloudflare | Hosting, database, storage, domains, cache, queues, browser |
| Cloudinary | Media |
| Composio | AI |
| CreateOS | Compute |
| Customer.io | Messaging, email |
| Datadog | Observability, analytics |
| Daytona | Sandboxes, hosting |
| Depot | CI, compute |
| E2B | Hosting, sandbox |
| Elevenlabs | AI |
| Exa | Search, AI |
| Firecrawl | Search |
| Fly.io | Hosting, database |
| GitLab | CI/CD, observability, storage |
| Here.now | Hosting |
| HeyGen | AI |
| Inngest | Queue |
| Kernel | Browser, AI |
| Klaviyo | Email, messaging |
| Laravel Cloud | Hosting, cache, database |
| Metronome | Payments |
| Mixpanel | Analytics |
| Neon | Database, authentication |
| Netlify | Hosting |
| OpenRouter | AI |
| Parallel | Search, AI |
| PlanetScale | Database |
| PostalForm | Communications |
| PostHog | Analytics, feature flags |
| Prisma | Database |
| Privy | Payments, authentication |
| Pydantic | Observability, analytics |
| Quo | Communications |
| Railway | Hosting, database, storage, cache |
| Render | Hosting, database |
| Resend | Email |
| RevenueCat | Payments, analytics |
| Runloop | Sandboxes, AI |
| Schematic | Feature flags, payments |
| Spaceship | Domains |
| Squarespace | Domains |
| Steelbrowser | Browser, AI |
| Supabase | Database, authentication, storage |
| Supermemory | AI, database, search |
| Tabstack | Search, browser |
| Turso | Database |
| Twilio | Communications |
| Upstash | Cache, search, database |
| Vercel | Hosting |
| Wix | Hosting |
| WordPress.com | Hosting, domains |
| WorkOS | Auth |

## Provider catalog on projects.dev

- "Stripe Projects currently supports 68 providers." Many span several categories; the first listed is the primary one.
- Install command pattern shown for every row: `stripe projects add <provider>/<service>`.
- Descriptions are condensed from the catalog page.

| Provider | Service slug | Categories | Description (condensed) |
| --- | --- | --- | --- |
| AgentMail | `agentmail/api` | Email, AI, Messaging | Email inbox API for AI agents |
| AgentPhone | `agentphone/number` | Communications | Programmable phone numbers for AI agents: calls, voicemail, routing |
| Algolia | `algolia/application` | Search, AI | AI search and retrieval with unified keyword and vector engine |
| Amplitude | `amplitude/analytics` | Analytics, AI, Feature flags | Digital analytics: funnels, retention, A/B experiments |
| Athena AI | `athena/agents` | AI | No-code AI agent builder; share by link or embed |
| Auth0/Okta | `auth0/client` | Auth | Authentication and authorization for users and AI agents |
| Base 44 | `base44_projects/app` | Hosting, AI, Auth, Database | Full-stack app platform with hosting, database, and AI |
| Blaxel | `blaxel/sandbox` | Hosting, AI, Sandbox, Storage | Serverless platform for AI agents with sandboxed execution |
| Browserbase | `browserbase/project` | Browser | Headless browsers for browser agents, thousands in milliseconds |
| Chatbase | `chatbase/agent` | AI | Custom AI chatbots trained on your data |
| Chroma | `chroma/database` | Database, AI | AI-native vector database: vector, full-text, regex, metadata queries |
| Churnkey | `churnkey/retention` | Payments | Churn prevention: cancel flows, failed-payment recovery, analytics |
| Clerk | `clerk/auth` | Auth | Drop-in auth: social login, magic links, MFA, user management UI |
| ClickHouse | `clickhouse/clickhouse` | Database, Analytics | Open-source columnar database for real-time analytics |
| Cloudflare | `cloudflare/worker` | Hosting, Database, Domains, Browser, Cache, Queue, Storage, AI | Edge platform with global network, routing, protection |
| Cloudinary | `cloudinary/media` | Media, CDN, Storage | Image and video API with global CDN delivery |
| Composio | `composio/project` | AI | Connect agents to 250+ tools and apps with managed auth |
| CreateOS | `createos/project` | Sandbox, Hosting | Compute infrastructure for AI workloads; GPU and CPU resources on demand |
| Customer.io | `customer.io/workspace` | Messaging, Email, Notifications | Behaviour-based emails, push, SMS, in-app messages |
| Datadog | `datadog/observability` | Observability | Monitoring and security for infrastructure, apps, logs |
| Daytona | `daytona/sandbox` | Sandbox, AI, Hosting | Elastic, isolated sandbox environments for AI agents |
| Depot | `depot/api` | CI, Cache, Hosting | Remote container builders and CI caching |
| E2B | `e2b/sandboxes` | Hosting, Sandbox | Cloud sandboxes for code execution, spun up in milliseconds |
| ElevenLabs | `elevenlabs/tts` | AI | Speech generation, voice cloning, audio content |
| Exa | `exa/api` | Search, AI | AI-native, meaning-based search engine |
| Firecrawl | `firecrawl/api` | Search | Scraping and crawling API; JS rendering, markdown, LLM-ready output |
| Fly.io | `flyio/app` | Hosting, Database | Global full-stack apps with built-in Postgres and Redis |
| GitLab | `gitlab/project` | CI, AI, Analytics, CDN, Hosting, Observability, Storage | DevSecOps orchestration platform |
| Here.now | `herenow/hosting` | Hosting, CDN, Storage | Instant hosting for agents at `{slug}.here.now`, custom domains |
| HeyGen | `heygen/api` | AI | AI talking-head videos, avatars, translations |
| Inngest | `inngest/app` | Queue | Background jobs, scheduled tasks, long-running AI workflows with retries |
| KERNEL | `kernel/project` | Browser, AI | AI-native browser infrastructure for web agents |
| Laravel Cloud | `laravel_cloud/application` | Hosting, Cache, Database | Managed Laravel hosting, caching, databases, queue workers |
| Metronome | `metronome/sandbox` | Payments | Usage-based billing: meter, price, invoice |
| Mixpanel | `mixpanel/analytics` | Analytics | Event analytics: funnels, retention |
| Neon | `neon/postgres` | Database, Auth | Serverless Postgres with autoscaling and branching |
| Netlify | `netlify/project` | Hosting | Automatic builds, global deployment, serverless backends |
| OpenRouter | `openrouter/api` | AI | Single API for hundreds of models (OpenAI, Anthropic, Google, Meta, …) |
| Parallel | `parallel/api` | Search, AI | AI research and analysis over web and private data |
| Perplexity | `perplexity/api` | Search, AI | Web-grounded search API with citations; Sonar models |
| PlanetScale | `planetscale/postgresql` | Database | Managed Postgres and Vitess/MySQL, NVMe-backed, sharding |
| PostalForm | `postalform/mail` | Communications | Physical mail API: letters, postcards via USPS |
| PostHog | `posthog/analytics` | Analytics, AI, Feature flags, Observability | Product analytics, session replay, flags, A/B tests, warehouse, CDP |
| Prisma | `prisma/database` | Database | Type-safe ORM for Node.js and TypeScript, migrations |
| Privy | `privy/app` | Payments, Auth | Embedded wallets, auth, signing policies (EVM, Solana, Bitcoin) |
| Pydantic | `pydantic/logfire` | Observability, AI, Analytics, Feature flags | Logfire: OpenTelemetry-native observability for Python and AI agents |
| Quo | `quo/app` | Communications | Business phone system (formerly OpenPhone) |
| Railway | `railway/hosting` | Hosting, Database, Cache, Storage | Servers, databases, cron jobs with zero ops |
| Render | `render/static-site` | Hosting, Database | Apps, agents, databases, workers with autoscaling |
| Resend | `resend/email` | Email | Email API for developers and AI agents |
| RevenueCat | `revenuecat/app` | Payments, Analytics | In-app subscriptions across iOS, Android, web |
| Schematic | `schematic/schematic-environment` | Feature flags | Feature management and plan-based entitlements |
| Shopify | `shopify/store` | Ecommerce | Provision a hosted Shopify store; billing through Stripe |
| Spaceship | `spaceship/domain` | Domains | Domain registration |
| Squarespace | `squarespace/domain` | Domains, Ecommerce | Domain search |
| Steel | `steel/browser` | Browser | Managed headless browsers for agents: sessions, anti-detection, proxies |
| Stigg | `stigg/environment` | Feature flags, AI | Entitlements and usage metering |
| Stripe | `stripe/livemode` | Payments | Payments and billing APIs from a sandbox or live mode key |
| Supabase | `supabase/project` | Database, Auth, Storage | Managed Postgres, Auth, Storage, Edge Functions, Realtime, Vector |
| Supermemory | `supermemory/memory` | AI, Database, Search, Storage | AI memory layer with vector and semantic search |
| Tabstack | `tabstack/api` | Search, AI, Browser | Search API by Mozilla |
| Turso | `turso/database` | Database | Replicated SQLite with vector search and sync |
| Twilio | `twilio/email` | Communications, Email | Programmable communications and data APIs |
| Upstash | `upstash/redis` | Cache, Database, AI, Messaging, Search | Serverless platform for AI agents and apps |
| Vercel | `vercel/project` | Hosting | Frontend cloud: CI/CD, edge functions, global CDN |
| Wix | `wix/headless` | Ecommerce | Headless web platform with APIs and hosting |
| WordPress.com | `wordpress.com/site` | Hosting, Domains | Managed WordPress hosting with domains, CDN, AI |
| WorkOS | `workos/auth` | Auth | Enterprise features: SSO, SCIM, RBAC, Audit Logs, AI governance |

### Category counts on projects.dev

| Category | Providers |
| --- | --- |
| All | 68 |
| AI | 25 |
| Hosting | 16 |
| Database | 15 |
| Search | 8 |
| Storage | 8 |
| Analytics | 7 |
| Auth | 7 |
| Browser | 5 |
| Cache | 5 |
| Feature flags | 5 |
| Payments | 5 |
| Communications | 4 |
| Domains | 4 |
| Email | 4 |
| Observability | 4 |
| Sandbox | 4 |
| CDN | 3 |
| Ecommerce | 3 |
| Messaging | 3 |
| CI | 2 |
| Queue | 2 |
| Media | 1 |
| Notifications | 1 |

## Other service slugs seen in docs examples

- `supabase/project`, `vercel/project`, `neon/postgres`, `amplitude/analytics`, `openrouter/api` (docs and CLI reference examples).
- `clerk/auth`, `cloudflare/workers`, `render/postgres`, `e2b/sandbox`, `twilio/email`, `mixpanel/analytics`, `posthog/analytics` (template manifests; see [[Stripe Projects - Templates]]).
- `createos/project`, `createos/pro-monthly` (CreateOS docs; see [[CreateOS on Stripe Projects]]).

## Request or become a provider

- Request a provider or join the network: provider-request@stripe.com.
- Provider intake page (https://docs.stripe.com/projects/provider-intake):
  - Stripe prioritizes SaaS and infrastructure providers that are widely used, developer-loved, and part of the core application stack.
  - Priority categories: Hosting (compute), Database, Auth, Storage, Analytics, Messaging (email, notifications), Cache, Observability, AI, Vector DB and AI infrastructure, Payments, Search, CI/CD, Feature flags, Sandboxes.
  - Stripe wants providers who can work closely on the product and integration spec, move quickly, test early, and give actionable feedback.
  - Email provider-request@stripe.com with: provider name; primary contact (business and engineering); provider category; short description of services; whether you can begin building immediately; your team's GitHub handles.
  - Allow at least 2 business days for a response.
- Platform-side provisioning (for platforms, not providers): [[Stripe Projects - Provisioning API]].

## Related
- Up: [[Stripe Projects]]
- [[CreateOS on Stripe Projects]]: the CreateOS provider in detail
- [[Stripe Projects - Commands]]: `catalog`, `search`, `add`, `link`
- [[Stripe Projects - Templates]]: starter apps that bundle providers
- [[Integration - Stripe]]: CreateOS Stripe integration page
- [[vs - E2B]], [[vs - Daytona]], [[vs - Runloop]], [[vs - Vercel]], [[vs - Cloudflare]]: CreateOS comparisons with providers also in this catalog
