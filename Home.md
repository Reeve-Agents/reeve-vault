---
aliases:
  - Index
  - MOC
tags:
  - type/hub
  - hackathon
scraped: 2026-10-17
---

# Home

> [!summary] CreateOS × Stripe Projects Hackathon vault
> - **Event:** Build Agents That Run Code: CreateOS × Stripe Projects. Saturday 17 Oct 2026, 12:00–7:00 PM PT (Sunday 02:00–09:00 WIB), online on Discord. $10,000 prize pool, free, solo or teams up to 3. See [[Hackathon Overview]].
> - **Brief:** start from an empty directory, set up the stack with [[Stripe Projects]], and ship an AI agent that writes code and runs it in a CreateOS sandbox ([[Docs - Sandbox]]).
> - **Contents:** 173 notes scraped on 2026-10-17 from createos.sh, createos.sh/docs, docs.stripe.com/projects, projects.dev, Luma and GitHub, plus 15 brainstorm notes in `12 Brainstorm` (final idea: [[Reeve - Overview]]). Visual map: [[Mind Map.canvas|Mind Map]]. Conventions: [[Vault Guide]].

## Start here (hackathon reading path)

1. [[Hackathon Overview]]: event facts, registration, what you need
2. [[Hackathon Schedule]]: kickoff, walkthroughs, build, demos
3. [[Hackathon Setup Guide]]: CLI installs, `stripe projects init`, `stripe projects add createos/project`, first sandbox
4. [[Stripe Projects]], then [[Stripe Projects - Getting Started]] and [[Stripe Projects - Commands]]
5. [[CreateOS on Stripe Projects]]: CreateOS as a Stripe Projects provider
6. [[Docs - Sandbox Quickstart]], then [[Docs - Sandbox Limits]] (Free vs Beginner plan) and [[Docs - Sandbox CLI]]
7. [[Docs - Sandbox SDK]] and [[Docs - Sandbox REST API]]: building the agent loop
8. [[Hackathon Ideas]]: 30 ideas, each mapped to the docs for its sandbox feature
9. [[Hackathon FAQ]] · [[Hackathon Resources and Tools]] · [[Hackathon Partner Services]]

## Map of content

### 01 Hackathon
- [[Hackathon Overview]] · [[Hackathon Schedule]] · [[Hackathon Setup Guide]] · [[Hackathon Resources and Tools]] · [[Hackathon FAQ]] · [[Hackathon Partner Services]]
- Ideas: [[Hackathon Ideas]], covering [[Ideas - Builders]] · [[Ideas - Money]] · [[Ideas - Safe]] · [[Ideas - Computer Use]] · [[Ideas - Always On]] · [[Ideas - Stretch]]
- Repos: [[Repo - createos-cli]] · [[Repo - createos-claude-plugins]]

### 02 Stripe Projects
- Hub: [[Stripe Projects]]
- [[Stripe Projects - Getting Started]] · [[Stripe Projects - Commands]] · [[Stripe Projects - Environments and Credentials]] · [[Stripe Projects - Billing and Spend Limits]] · [[Stripe Projects - Agent Integration]]
- [[Stripe Projects - Providers]] · [[Stripe Projects - Templates]] · [[Stripe Projects - Provisioning API]]
- [[Stripe Projects - Paid Tier Countries]] · [[Stripe Projects - Facilitator Countries]]

### 03 CreateOS Docs
- Hub: [[CreateOS Docs]] (every docs note, by section)
- Sandbox: [[Docs - Sandbox]] · [[Docs - Sandbox REST API]] · [[Docs - Sandbox SDK]]
- Platform: [[Docs - About CreateOS]] · [[Docs - Get Started]] · [[Docs - CLI]] · [[Docs - API and MCP]] · [[Docs - Integrations]]
- Studio: [[Docs - Studio]]
- Services and MPP: [[Docs - Services]] · [[CreateOS on Stripe Projects]] · [[Docs - MPP]]

### 04 Products and Pricing
- [[Products]]: [[Product - Sandbox]] · [[Product - Gateway]] · [[Product - Agents]] · [[Product - CLI]] · [[Product - Sandbox Reliability]]
- [[Pricing]]: [[Pricing - Sandbox]] · [[Pricing - Gateway]]
- [[Security]] · [[Sandbox Networking]] · [[Egress Governance]] · [[Self-Host]] · [[For Agents]] · [[For SAP]] · [[AI Readiness]] · [[Studio Early Access]]

### 05 Services
- [[Services]]: [[Service - AI Agents]] · [[Service - Generative AI]] · [[Service - Computer Vision]] · [[Service - AI Strategy]] · [[Service - LLM Integration]] · [[Service - RAG]] · [[Service - Data and ML]]

### 06 Industries
- [[Industries]]: [[Industry - Legal]] ([[Use Cases - Legal]]) · [[Industry - Manufacturing]] · [[Industry - Healthcare]] · [[Industry - Financial Services]] · [[Industry - Telecom]] · [[Industry - Marketing]] · [[Industry - Technology]]

### 07 Integrations and Comparisons
- [[Integrations]]: 12 integration notes, including [[Integration - Stripe]]
- [[Comparisons]]: 8 `vs` notes plus [[Alternatives]]

### 08 Company
- [[CreateOS Homepage]] · [[About CreateOS]] · [[Partners]] · [[Newsroom]] · [[Brand Handbook]] · [[Careers]]
- [[Contact and Community]] · [[Examples]] · [[Schools]] · [[Amazon Sellers]] · [[SF Tech Week]] · [[Privacy and Terms]] · [[CreateOS llms.txt]]

### 09 Case Studies
- [[Case Studies]]: [[Customer Stories]] (10) · [[Solution Blueprints]] (52, in 11 `Blueprints - …` notes)

### 10 Blog
- [[Blog]]: 135 posts in 8 `Blog Index - …` notes · [[Guides Blog Index]] (74) · [[Guides FAQ]]

### 11 Spike Testing
- `Stripe CLI test/`: the user's own Stripe CLI trial run (not a note). See the `.env` warning in [[Brainstorm - Open Questions and Risks]].

### 12 Brainstorm
- Hub: [[Brainstorm]]. Final idea: **[[Reeve - Overview]]** (Builder/Operator + Auditor/Judge, maker-checker)
- Flow and design: [[Reeve - Builder Business Flow]] · [[Reeve - Auditor Design]] · [[Reeve - SOP Inputs and Rule Types]]
- Mechanics: [[Reeve - Credential Broker and Mera]] · [[Reeve - Agent Payments]] · [[Reeve - Connectors and Composio]] · [[Reeve - Architecture and Stack]] · [[Reeve - Screens Demo and MVP]] · [[Reeve - Owner App PWA]] · [[Reeve - Domain Packs]] · [[Reeve - Model Providers]]
- Business and impact: [[Reeve - Executive Summary]] · [[Competitions for Reeve]] · [[Reeve - Payment Rails Indonesia]] · [[Reeve - Sustainability and Crypto Layer]] · [[Reeve - Sustainability Summary and SDGs]]
- Context: [[Partnership Analysis Report]] · [[Brainstorm - Idea Evolution]] · [[Plan Constraints - Free vs Beginner]] · [[Monad Tools Evaluation]] · [[Brainstorm - Open Questions and Risks]]

### 13 Pitch Deck
- [[Pitch Deck Brief]]: 14 slides (cover + 12 + back cover), one markdown file per slide, 65% visual / 35% text, design system from `13 visuals/ColorPalettes`
- `13 visuals/ColorPalettes`: the three reference palettes

### 14 Design Resources
- Hub: [[Design Resources]]: every visual resource for the landing page, deck, dashboard and demo film, with install status
- [[Design Reference Sites]] (newform, codapress, xerx, agenticwebteam) · [[UI Pattern Libraries - Mobbin and ScreensDesign]] (MCP) · [[Component and Motion Libraries - React Bits and Hairline]] · [[Agent Skills - genjutsu and motionmaxxing]]
- Built: [[Reeve - Landing Page]] (`reeve/apps/landing`, the connected-flow hero)

## Source caveats found while scraping

> [!warning] Inconsistencies in the sources (recorded as stated, not resolved)
> - `devbox:1`: the Concepts page says Debian and default image; the Limits page says Ubuntu 24.04 LTS, with `alpine:3.20` as the default when `rootfs` is omitted. See [[Docs - Sandbox Limits]].
> - `createos env list`: one CLI page says values are masked by default, another says shown in full with `--hide` to mask. See [[Docs - CLI - Command Reference]].
> - Claude plugin repo: the hackathon page says `NodeOps-app/createos-claude-plugins`, but GitHub redirects to `NodeOps-app/createos-plugins`. See [[Repo - createos-claude-plugins]].
> - The CreateOS Stripe-Projects docs page lists no `.env` variable names. Docs also disagree on whether `state.local.json` is committed. See [[CreateOS on Stripe Projects]] and [[Stripe Projects - Environments and Credentials]].
> - No prize breakdown or judging criteria appear on the hackathon page or on Luma. See [[Hackathon Overview]].
> - `https://createos.sh/guides/faq` returns 404 ([[Guides FAQ]]). The Perplexity comparison gives two cost figures for the same sandbox ([[vs - Perplexity]]).

## Raw data

The raw downloads (Markdown and HTML) and the scraping scripts sit outside the vault, in `../_raw/<topic>/` and `../_raw/_scripts/<topic>/`, so they stay out of the graph.
