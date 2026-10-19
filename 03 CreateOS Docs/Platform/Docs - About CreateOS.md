---
tags:
  - createos/docs
  - createos/docs/platform
  - type/page
source: https://createos.sh/docs/About-CreateOS
sources:
  - https://createos.sh/docs/
  - https://createos.sh/docs/About-CreateOS
scraped: 2026-10-17
up: "[[CreateOS Docs]]"
---

# Docs - About CreateOS

> [!summary] Summary
> - Docs landing page: CreateOS ships and runs apps and services (deployments, managed databases and queues, custom domains, isolated microVM sandboxes for untrusted or AI-generated code).
> - "What is CreateOS?" page: a developer ecosystem covering Create, Deploy and Monetize, with a Template Marketplace and an Application Store.
> - Source: https://createos.sh/docs/ and https://createos.sh/docs/About-CreateOS

## CreateOS Docs (docs home)
- **URL:** https://createos.sh/docs/
- **Summary:** Landing page for the CreateOS documentation. It groups the docs into quickstarts, app platform, connect and extend, and account sections.
- **Key points:**
  - Quickstarts: "Install the CLI and deploy" (`/CLI/Getting-Started`, about two minutes), "Deploy a GitHub project" (`/Get-Started/Deploy-Github-Project`), "Run code in a sandbox" (`/Sandbox/Quickstart`).
  - App platform cards: What is CreateOS? (`/About-CreateOS`), Get started (`/Get-Started`), CLI (`/CLI`), Build and deploy (`/Build-Deploy`), Services (`/Services`: managed databases, Supabase, cache, message queues, Stripe projects), Migrations (`/Migrations`: Vercel, Replit, Netlify, Railway, Render).
  - Connect and extend cards: APIs and MCPs (`/API-MCP`), Integrations (`/Integrations`), Machine payments (`/MPP`, MPP protocol so agents and services pay each other), Resources for AI agents (`/Resources/LLM-Resources`).
  - Account cards: Account and billing (`/Account-Billing`), Pricing (`/Account-Billing/Pricing`).
  - Markdown route: append `.md` to any docs URL (see [[Docs - Resources]]).

## What is CreateOS?
- **URL:** https://createos.sh/docs/About-CreateOS
- **Summary:** One-page overview of the platform: who it is for, what it does (Create, Deploy, Monetize) and how it is priced. CreateOS replaces fragmented DevOps tooling with a single interface.
- **Key points:**
  - Positioning: "complete developer ecosystem" from idea to production to revenue; AI-assisted coding interfaces, frontend and backend deployments, key infrastructure services.
  - Audiences: solo developers and indie hackers, solopreneurs and founders, startups and SMEs, marketers and non-technical builders, curious minds and learners.
  - Why CreateOS: unified stack (one dashboard), AI-native, flexible pricing (pay-as-you-go or subscription with top-up credits), MCP integrations (Cursor, VS Code, ChatGPT, Claude, any MCP-enabled platform).
  - **1. Build applications (AI-powered development):**
    - Pick from many LLMs, instant browser previews, one-click push to GitHub.
    - Languages: JavaScript, TypeScript, Python, Go, Rust, Java, or custom containers.
    - AI-assisted refactoring, Playground for continuing code from GitHub or earlier deployments, automatic CI/CD on GitHub push.
  - **2. Deploy services (AI-assisted CI/CD and infrastructure):**
    - Full CI/CD: build, test, deploy, rollback, environment promotion.
    - Dynamic scaling of CPU, memory and replicas; custom domains; live logs, metrics, alerts; one-click rollback.
    - Infrastructure services: Compute (CPU/GPU rental), Database (managed, automatic backups and scaling), Messaging Queue, Cache.
    - AI Playground: edit deployed apps without cloning locally; changes deploy on every commit.
  - **3. Monetize:**
    - Template Marketplace: users buy templates with credits (price set by contributors); contributors list GitHub-based projects with complete source code; 3 free revisions then credits per update; optional security scan score; credit-based marketing plans for visibility. Template purchases share the full codebase; for IP protection list as an Application instead.
    - Application Store: users deploy apps via in-app purchases set by contributors (no credits); contributors keep source ownership and IP; app must be deployed and functional on CreateOS; listing consumes credits; review process before listing.
  - Template submission needs: GitHub project, name, images, video tutorial, description, use case, category, contributor-set price in credits. App submission needs: name, images, video demo, feature description, use case, category.
  - Links on the page: https://createos.sh/app/landing, https://createos.sh/app/deployProject, https://createos.sh/app/templates, https://createos.sh/

## Related
- Up: [[CreateOS Docs]]
- [[Docs - Get Started]]: tutorials that follow this overview
- [[Docs - Build and Deploy]]: Create, Deploy, Templates and Apps, Widgets
- [[Docs - Account and Billing]]: tiers, credits, pricing
- [[Docs - Sandbox]]: sandbox docs (microVMs for untrusted or AI-generated code)
- [[Docs - Services]]: managed databases, cache, queues, Stripe projects
- [[Docs - Studio]]: Studio docs
