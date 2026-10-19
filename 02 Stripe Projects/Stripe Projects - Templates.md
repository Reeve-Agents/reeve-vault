---
aliases:
  - Stripe Projects build templates
  - stripe projects build
tags:
  - stripe/projects
  - type/page
source: https://docs.stripe.com/projects/templates
sources:
  - https://docs.stripe.com/projects/templates
  - https://docs.stripe.com/projects
  - https://projects.dev/templates/
  - https://github.com/stripe/projects-template-registry
scraped: 2026-10-17
up: "[[Stripe Projects]]"
---

# Stripe Projects - Templates

> [!summary] Summary
> - `stripe projects build my-app` creates a complete starter app from the template registry: copies files, installs dependencies, provisions all required services.
> - Skip the guided flow with `--template <template>/<variant>` (for example `stripe/nextjs-saas/amber-fox`) or `--template <template>` for the default variant.
> - A template = a public GitHub repo + a YAML manifest in https://github.com/stripe/projects-template-registry pinned to a commit `ref`.
> - Test locally with `--template-manifest /absolute/path/to/manifest.yaml` or `STRIPE_PROJECTS_REGISTRY_PATH`.
> - The registry holds 20 templates / 30 variant manifests on 2026-10-17. None declares a CreateOS service.
> - Source: https://docs.stripe.com/projects/templates

## Build from a template

```bash
stripe projects build my-app                                          # guided: category, framework, traffic tier
stripe projects build my-app --template stripe/nextjs-saas/amber-fox  # specific variant
stripe projects build my-app --template stripe/nextjs-saas            # default variant of a template
```

- Full list: [template registry](https://github.com/stripe/projects-template-registry); web catalog: https://projects.dev/templates/.

## How it works

Three parts:

| Part | Role |
| --- | --- |
| **The Stripe CLI** | Runs `stripe projects build`: reads the registry, copies template files, installs dependencies, provisions services. You don't change the CLI to publish a template. |
| **The template registry** | Shared public repo. Each template gets a short YAML manifest (repo location, framework, needed services). Add yours by pull request. |
| **Your template repo** | Public GitHub repo with a working starter app. You own and maintain it. The registry only holds a pointer and a pinned commit. |

When a developer selects a template, the CLI:

1. Reads the manifest from the registry.
2. Copies the template files from your repo at the pinned commit into a new project directory.
3. Runs the install command.
4. Sets up the Stripe project workspace.
5. Provisions the declared services.
6. Prints the next steps you defined.

## Developer discovery and the guided flow

- Every template is searchable by name, description, tags, and owner.
- The guided flow asks: app type (category) → framework → expected traffic. It filters to matching templates and presents a recommendation.
- Guided categories (from `guided.yaml`, in display order):

| Key | Label | Description |
| --- | --- | --- |
| `saas` | SaaS App | Subscription-based application with recurring billing. |
| `one_time_payment` | One-time payment app | Sell products or services with a single checkout. |
| `static_site` | Static site | Marketing page, docs, or content site with Stripe checkout. |

- A `guided.category` that matches none of these keys appears under "Something else".
- Example recommendation card from the docs ("Recommended Stack"):
  - **Next.js SaaS Starter** — "Subscription SaaS with auth, database, and billing"; Owner `stripe`.
  - Tier: Free / lowest cost.
  - Vercel (hosting) $0/mo; Clerk (auth) $0/mo; Neon Postgres (database) $0/mo.
  - Variants: Vercel • Neon • Clerk; Netlify • Render Postgres • Clerk; Vercel • Render Postgres • Clerk; Netlify • Neon • Clerk.
- Templates with several variants are grouped by `template`; the flow shows a variant picker.

## Create your template repo

- Public GitHub repo with app code, package files, deployment config, and a README: everything to clone, install, and run.
- One repo can hold a single template at its root, or several templates in subdirectories.
- The registry points at a specific commit. Updates don't reach users until you bump the pinned `ref`.
- Template code must use the services in your manifest and read the env vars each service produces (for example `neon/postgres` produces `DATABASE_URL`), so it works with no manual configuration.

## Registry layout

```
projects-template-registry/
├── guided.yaml                   # Guided-flow categories, in display order
├── example/example.yaml          # Commented reference manifest to copy
├── nextjs_saas/                  # One directory per template family
│   ├── amber-fox.yaml            # One file per variant, named after the variant
│   ├── harbor-mist.yaml
│   └── ...
├── nextjs_one_time_payment/
│   └── ...
└── simple_landing_page/
    └── clear-sky.yaml
```

- One manifest per variant. Group variants in a directory named after the template family.
- `.yaml` or `.yml`. The CLI reads the `template` and `variant` fields, not the path.

## Example manifest

```yaml
# Choose which guided category this template appears under.
guided:
  category: saas
  # Pick the framework filter key this template should match in guided mode.
  framework: nextjs

# Use one shared template id for all variants of the same starter.
template: stripe/nextjs-saas
# Give this concrete variant its own stable id.
variant: amber-fox
# Set this to true for the variant the CLI needs to recommend first.
default: true
# Write the short summary shown in the variant picker.
variant_description: Vercel • Neon • Clerk
# Optionally run one shell command after files are copied into the new project.
install_command: npm install

metadata:
  # Show this human-friendly name in browse results and confirmation cards.
  name: Next.js SaaS Starter
  # Explain in one line what the starter gives the user.
  description: Subscription SaaS with auth, database, and billing
  # Name the team or person maintaining this template.
  owner: stripe
  # Add optional search keywords to improve browse and search results.
  tags:
    - Billing
    - SaaS
    - Next.js

# Point to the repo directory the CLI should copy from.
repo: https://github.com/stripe/projects-templates/tree/main/nextjs_saas_amber-fox
# Pin the exact commit so users get a reproducible template.
ref: 84315765f28e9ad2d0b3c7167447edf6f65bcebe

# List the provider services the CLI should provision.
services:
  - vercel/project
  - clerk/auth
  - neon/postgres

# Optionally list the commands the CLI should print after setup finishes.
next_steps:
  # Use a short heading so users know what this command is for.
  - label: Run locally
    # Print the exact command the user should run next.
    command: npm run dev
  # Add as many labeled next-step commands as you want.
  - label: Build product with Codex
    command: codex "Help me turn this into a real product. Follow prompts/starter-to-product.md."
  - label: Build product with Claude
    command: claude "Help me turn this into a real product. Follow prompts/starter-to-product.md."
  - label: Deploy
    command: npm run deploy
```

- Copyable reference: [example/example.yaml](https://github.com/stripe/projects-template-registry/blob/main/example/example.yaml).

## Test locally

```bash
# Point the CLI at a local manifest (works before the repo is public; ref may be empty)
stripe projects build my-app --template-manifest /absolute/path/to/manifest.yaml

# Preview the full guided flow against a local registry checkout
git clone https://github.com/stripe/projects-template-registry.git
STRIPE_PROJECTS_REGISTRY_PATH=/absolute/path/to/projects-template-registry stripe projects build

# Skip the picker: full variant ID (template/variant) or just the template
stripe projects build my-app --template stripe/nextjs-saas/amber-fox
```

## Submit to the registry

1. Push your template repo to a public GitHub repo and choose the exact commit users should receive.
2. Fork the template registry and add your manifest as `<template-family>/<variant>.yaml`.
3. Set `repo` to your public repo (use a `/tree/<branch>/<subdirectory>` URL for a subdirectory) and set `ref` to the pinned commit.
4. Open a pull request against the registry.

- The registry entry is only an index record. Your code stays in your repo; bump `ref` to ship updates.

## Manifest field reference

### Required fields

The registry parser rejects entries missing any of these.

| Field | Description |
| --- | --- |
| `guided.category` | App type category. Must match `^[a-z0-9][a-z0-9_-]*$`. Sets the guided-flow group; also used for browse and search tag derivation |
| `guided.framework` | Framework identifier, same format as `category` (for example `nextjs`, `tanstack-start`). Sets the framework filter |
| `template` | Grouping key shared by all variants, for example `stripe/nextjs-saas` |
| `variant` | Variant ID within the template. Runtime ID is `${template}/${variant}`, for example `stripe/nextjs-saas/amber-fox` |
| `default` | Variant ordering: `true` sorts before `false`, then ties sort alphabetically by variant name |
| `variant_description` | Text in the guided variant picker, typically key providers (for example `Vercel • Neon • Clerk`) |
| `metadata.name` | Display name in browse cards and confirmations |
| `metadata.description` | One-line explanation of what the starter gives the user |
| `metadata.owner` | Maintainer, shown in browse cards |
| `repo` | Source repo or tree URL, typically a GitHub tree URL to a subdirectory |
| `ref` | Pinned commit SHA for reproducible materialization |
| `services` | Projects service identifiers in `provider/service` format (for example `vercel/project`, `clerk/auth`, `neon/postgres`); provisioned automatically |

### Optional fields

| Field | Description |
| --- | --- |
| `metadata.tags` | Free-form browse and search tags; search also uses tags derived from `guided.category` and `guided.framework` |
| `install_command` | Shell command run after files are copied. Defaults to `npm install`. Can be compound, for example `pnpm install && pnpm generate` |
| `service_overrides` | Override presentation metadata per service without changing provisioning. Keyed by service identifier. Subfields: `label`, `category` |
| `next_steps` | Commands printed after setup; each item has `label` and `command` |
| `tier_plans` | Maps guided traffic tiers to a specific provider plan per service, so the CLI provisions without prompting |

### Tier plans

```yaml
# String form
tier_plans:
  vercel/project:
    free_lowest_cost: Vercel/hobby
    starter_paid: Vercel/pro
    higher_scale: Vercel/pro

# Config form
tier_plans:
  cloudflare/workers:
    free_lowest_cost:
      plan: workers:free
    starter_paid:
      plan: workers:paid
    higher_scale:
      plan: workers:paid
```

- Supported tier keys: `free_lowest_cost`, `starter_paid`, `higher_scale`.

## Requirements

1. **Run locally with one command.** The project runs without errors after setup. Ideally all env vars come from Projects services; document any others in `.env.example`.
2. **Include at least one Stripe Projects service** from a provider available through Stripe Projects.
3. **Match the manifest.** If the manifest lists `clerk/auth` and `neon/postgres`, the repo must use Clerk and Neon.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| Template doesn't appear in the guided flow | `guided.category` must match a key in `guided.yaml` (else "Something else"). With a local registry, check the manifest is in the right directory |
| `STRIPE_PROJECTS_REGISTRY_PATH` has no effect | Point it at the registry directory, not a single YAML file |
| CLI can't find your files | For a subdirectory, set `repo` to a `/tree/<branch>/<subdirectory>` URL |
| Published builds aren't reproducible | Set `ref` to a pinned commit SHA. Empty `ref` is only for local development with `--template-manifest` |
| A service still asks for input | Add `tier_plans` so the CLI can pick a plan per traffic tier |
| A provider fails after files are copied | The CLI still creates the project; add or fix services afterwards |

## Registry catalog

Templates published on https://projects.dev/templates/ (20) and their manifests in the registry (30 variants). Values are copied from the manifests; `default` marks the variant chosen when only the template ID is passed.

| Template ID | Name | Category / framework | Variant (default ✓) | Variant description | Services |
| --- | --- | --- | --- | --- | --- |
| `stripe/nextjs-saas` | Next.js SaaS Starter | saas / nextjs | amber-fox ✓ | Vercel • Neon • Clerk • Twilio • Posthog | vercel/project, clerk/auth, neon/postgres, posthog/analytics, twilio/email |
| `stripe/nextjs-saas` | Next.js SaaS Starter | saas / nextjs | crystal-peak | Vercel • Neon • Clerk • Mixpanel | vercel/project, clerk/auth, neon/postgres, mixpanel/analytics |
| `stripe/nextjs-saas` | Next.js SaaS Render Netlify Starter | saas / nextjs | frost-bay | Netlify • Render Postgres • Clerk • Mixpanel | netlify/project, clerk/auth, render/postgres, mixpanel/analytics |
| `stripe/nextjs-saas` | Next.js SaaS Render Netlify Starter | saas / nextjs | harbor-mist | Netlify • Render Postgres • Clerk | netlify/project, clerk/auth, render/postgres, posthog/analytics |
| `stripe/nextjs-saas` | Next.js SaaS Render Starter | saas / nextjs | north-grove | Vercel • Render Postgres • Clerk | vercel/project, clerk/auth, render/postgres |
| `stripe/nextjs-saas` | Next.js SaaS Netlify Starter | saas / nextjs | silver-orbit | Netlify • Neon • Clerk | netlify/project, clerk/auth, neon/postgres |
| `stripe/nextjs-one-time-payment` | Next.js One-time Payment Starter | one_time_payment / nextjs | golden-path ✓ | Vercel • Neon • Clerk • Twilio • Posthog | vercel/project, clerk/auth, neon/postgres, posthog/analytics, twilio/email |
| `stripe/nextjs-one-time-payment` | Next.js One-time Payment Starter | one_time_payment / nextjs | amber-wave | Vercel • Neon • Clerk • Mixpanel | vercel/project, clerk/auth, neon/postgres, mixpanel/analytics |
| `stripe/nextjs-one-time-payment` | Next.js One-time Payment Render Netlify Starter | one_time_payment / nextjs | brass-cove | Netlify • Render Postgres • Clerk | netlify/project, clerk/auth, render/postgres, posthog/analytics |
| `stripe/nextjs-one-time-payment` | Next.js One-time Payment Render Netlify Starter | one_time_payment / nextjs | coral-reef | Netlify • Render Postgres • Clerk • Mixpanel | netlify/project, clerk/auth, render/postgres, mixpanel/analytics |
| `stripe/nextjs-one-time-payment` | Next.js One-time Payment Netlify Starter | one_time_payment / nextjs | opal-fjord | Netlify • Neon • Clerk | netlify/project, clerk/auth, neon/postgres |
| `stripe/nextjs-one-time-payment` | Next.js One-time Payment Render Starter | one_time_payment / nextjs | summit-forge | Vercel • Render Postgres • Clerk | vercel/project, clerk/auth, render/postgres |
| `stripe/simple-landing-page` | Simple Landing Page | static_site / nextjs | clear-sky ✓ | Vercel | vercel/project, posthog/analytics |
| `mixpanel/storefront` | Simple Storefront | one_time_payment / nextjs | purple-wave ✓ | Vercel • Supabase • Mixpanel | vercel/project, mixpanel/analytics, supabase/project |
| `posthog/astro-portfolio-blog` | Astro Portfolio + Blog | static_site / astro | cobalt-hedgehog ✓ | PostHog, Algolia, Supabase, Netlify | posthog/analytics, algolia/application, supabase/project, netlify/project |
| `customerio/nextjs-ai-chat` | AI Chat + Customer.io Starter | saas / nextjs | ember-glow ✓ | OpenRouter • Supabase • Customer.io • Vercel | customerio/workspace, Supabase/project, OpenRouter/api, vercel/project |
| `customerio/nextjs-auth` | Next.js Passwordless Auth + Customer.io | auth / nextjs | magic-lantern ✓ | Better Auth • Neon • Customer.io • Vercel | customerio/workspace, neon/postgres, vercel/project |
| `customerio/nextjs-digest` | Next.js Weekly Digest + Customer.io | saas / nextjs | morning-lark ✓ | Inngest • Customer.io • Neon • Vercel | customerio/workspace, Inngest/app, neon/postgres, vercel/project |
| `customerio/nextjs-saas` | Next.js SaaS + Customer.io Lifecycle Email | saas / nextjs | copper-beacon ✓ | Clerk • Neon • Stripe Billing • Customer.io • Vercel | customerio/workspace, Clerk/auth, neon/postgres, vercel/project |
| `clerk/nextjs-auth` | Clerk Next.js Auth Starter | auth / nextjs | quickstart ✓ | Clerk • Next.js • auth only | clerk/auth, vercel/project |
| `clerk/nextjs-mcp` | Clerk MCP Server Starter | ai_agent / nextjs | oauth-server ✓ | Clerk OAuth • MCP server • agent tools | clerk/auth, vercel/project |
| `daytona/coding-agent` | Daytona Coding Agent | ai_agent / nextjs | daytona-coding-agent ✓ | Next.js • Daytona Sandbox • OpenRouter • Vercel | daytona/sandbox, openrouter/api, vercel/project |
| `e2b/terminal-starter` | E2B Terminal Starter | developer_tool / nextjs | e2b-terminal-starter ✓ | Next.js • E2B Sandbox • SQLite | e2b/sandbox |
| `kernel/browser-automation` | Kernel Browser Automation (Playwright) | developer_tool / other | playwright ✓ | Kernel cloud browser • Playwright | kernel/project |
| `kernel/computer-use-agent` | Kernel Computer-Use Agent | developer_tool / other | openai ✓ | Kernel cloud browser • OpenAI computer use | kernel/project |
| `heygen/avatar-video` | HeyGen Studio | developer_tool / nextjs | heygen-avatar-video ✓ | Next.js • HeyGen API • HyperFrames | heygen/api |
| `postalform/gym-cancellation-saas` | Gym Cancellation SaaS | one_time_payment / cloudflare-workers | cloudflare-postalform ✓ | Cloudflare Workers + PostalForm | cloudflare/workers, postalform/mail |
| `shopify/trending-products` | Shopify Trending Products | ai_agent / other | shopify-trending-products ✓ | Shopify • Firecrawl • OpenRouter • Spaceship | shopify/store, firecrawl/api, openrouter/api |
| `netlify/tanstack-start-ecommerce` | Netlify eCommerce Starter on TanStack Start | one_time_payment / tanstack-start | slate-heron ✓ | Netlify • TanStack Start | netlify/project |
| `netlify/tanstack-start-saas` | Netlify SaaS Starter on TanStack Start | saas / tanstack-start | teal-otter ✓ | Netlify • TanStack Start | netlify/project |

- Build command shown on projects.dev for each: `stripe projects build my-app --template <template ID>`.
- projects.dev one-line descriptions of agent-related templates:
  - Clerk MCP Server Starter: OAuth-secured Model Context Protocol server; agents authenticate with Clerk and call your tools.
  - Daytona Coding Agent: generative-UI coding agent that writes and runs code in a Daytona sandbox, live-previewed in chat.
  - E2B Terminal Starter: persistent terminal conversations backed by E2B sandboxes.
  - Kernel Computer-Use Agent: natural-language computer-use agent driving a Kernel cloud browser (needs an `OPENAI_API_KEY`).
  - Kernel Browser Automation (Playwright): open and read web pages in a Kernel cloud browser with Playwright.

## See also (from the source)

- [Stripe Projects CLI](https://docs.stripe.com/projects) → [[Stripe Projects]]
- [Provider intake for Stripe Projects](https://docs.stripe.com/projects/provider-intake) → [[Stripe Projects - Providers]]
- [Integrate Provisioning API into your platform](https://docs.stripe.com/provisioning) → [[Stripe Projects - Provisioning API]]

## Related
- Up: [[Stripe Projects]]
- [[Stripe Projects - Commands]]: CLI command reference
- [[Stripe Projects - Providers]]: service slugs used in manifests
- [[Ideas - Stretch]]: stretch hackathon ideas
- [[Hackathon Overview]]: the hackathon
