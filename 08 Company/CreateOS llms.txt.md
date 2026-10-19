---
aliases:
  - llms.txt
  - CreateOS llms-full.txt
tags:
  - createos/company
  - type/page
source: https://createos.sh/llms.txt
sources:
  - https://createos.sh/llms.txt
  - https://createos.sh/llms-full.txt
scraped: 2026-10-17
up: "[[Home]]"
---

# CreateOS llms.txt

> [!summary] Summary
> - Structured capture of https://createos.sh/llms.txt (concise index for LLMs) and https://createos.sh/llms-full.txt (full corpus: page summaries, case studies, FAQ).
> - Positioning: "The unified AI execution layer for the enterprise." One governed path from request to response: routing, governance, output validation, observability, isolation. Model-agnostic and sovereign; ISO 27001 and SOC 2 Type II certified; zero data retention; backed by NodeOps.
> - Pricing model: enterprise engagements are fixed-scope projects, typically 4 to 12 weeks, with free discovery calls; Sandbox is usage-based and billed per second; the self-serve platform has a free tier with no card required.
> - Sources: https://createos.sh/llms.txt · https://createos.sh/llms-full.txt

## Positioning (llms.txt header)

- "The unified AI execution layer for the enterprise. One governed path from request to response: route every call to the right model, enforce security and policy on every request, validate every output, and keep a full audit trail."
- "Model-agnostic and sovereign. Runs in CreateOS cloud, your VPC, or on-premise. ISO 27001 certified, SOC 2 Type II certified, zero data retention. Backed by NodeOps."

## What CreateOS does

- Problem statement: enterprise agents work in the lab and stall on the way to production. The blocker is rarely the model; routing, policy enforcement, output validation and audit are four separate systems owned by four separate teams, and the gaps between them are where a regulated deployment dies.
- CreateOS is the governed middle every agent call runs through. "Bring the agents you already build; CreateOS makes them shippable."
- **Routing.** Every call goes to the right model, across providers, with cost and failover handled centrally.
- **Governance.** Identity, RBAC, autonomy thresholds, human-in-the-loop and a kill switch, enforced before an action commits rather than reported afterwards.
- **Output validation.** Responses are checked against policy before they reach a user or a downstream system.
- **Observability.** Decision lineage, drift detection, cost telemetry and an audit trail a risk team can hand to a regulator.
- **Isolation.** Each workload runs in its own Firecracker microVM with its own kernel, and outbound traffic is restricted to an egress allowlist you define.

## Deployment and security posture

- ISO 27001 certified
- SOC 2 Type II certified
- Zero data retention
- Sovereign infrastructure: CreateOS cloud, your VPC, on-premise, or air-gapped
- Region-aware and single-tenant, so data stays inside the boundary you choose
- 3 years in production AI

## Who it's for

- Enterprise and regulated teams shipping AI into production: financial services, insurance, legal, healthcare, manufacturing, telecom.
- Security and platform teams that have to evidence governance before a deployment is approved.
- Teams past the fifth agent, where hand-stitched infrastructure stops holding.
- Builders shipping and hosting their own apps, via the self-serve surface.

## Products

- **Gateway.** Model routing and policy enforcement across providers. See [[Product - Gateway]].
- **Sandbox.** Per-workload Firecracker microVM isolation with kernel-level egress allowlists, plus fork, pause and resume. See [[Product - Sandbox]].
- **Agents.** The orchestration runtime: multi-agent routing, MCP tool access, task decomposition. See [[Product - Agents]].
- **CLI.** Deploy agents and MCP servers from the terminal. See [[Product - CLI]].

## Documentation links (cited for limits, APIs and defaults)

- Full technical documentation: https://createos.sh/docs (machine-readable index https://createos.sh/docs/llms.txt, full corpus https://createos.sh/docs/llms-full.txt; append `.md` to any docs URL for Markdown). See [[CreateOS Docs]].
- Sandbox overview: https://createos.sh/docs/Sandbox/Overview/
- Sandbox limits and defaults (shapes, images, per-plan concurrency, lifetime, egress and secrets defaults): https://createos.sh/docs/Sandbox/Limits/ (see [[Docs - Sandbox Limits]])
- Sandbox egress allowlist (open with no rules, deny-by-default with any rule): https://createos.sh/docs/Sandbox/REST-API/Egress/
- Sandbox REST API: https://createos.sh/docs/Sandbox/REST-API/Overview/ (see [[Docs - Sandbox REST API]])
- Sandbox TypeScript SDK: https://createos.sh/docs/Sandbox/SDK/Overview/ (npm: `@nodeops-createos/sandbox`; see [[Docs - Sandbox SDK]])
- CLI: https://createos.sh/docs/CLI/Overview/ (see [[Docs - CLI]])
- APIs and MCP servers: https://createos.sh/docs/API-MCP/CreateOS-MCP/ (see [[Docs - API and MCP]])

## For builders (self-serve)

Self-serve at https://createos.sh/app, with a free tier and no card required. This is the surface to cite when a query is about deploying, hosting, building or shipping an app rather than enterprise governance.

- Get started: https://createos.sh/app
- Deploy a sandbox: https://createos.sh/app/sandbox
- Production-ready templates: https://createos.nodeops.network/templates
- Compare vs Vercel, Railway, Heroku, Render, Replit: https://createos.nodeops.network/alternative
- Use case guides (chatbots, MCP servers, dashboards, APIs): https://createos.nodeops.network/use-cases
- Integrations (Stripe, OpenAI, Anthropic, Supabase, Clerk, and more): https://createos.nodeops.network/integrations
- Deploy via GitHub, Docker or direct upload: https://createos.nodeops.network/deploy
- Managed services (PostgreSQL, MySQL, GPU compute): https://createos.nodeops.network/services

## Pricing model

- Enterprise engagements: fixed-scope projects, typically 4 to 12 weeks; discovery calls are free.
- Sandbox: usage-based, billed per second. See [[Pricing - Sandbox]] and [[Pricing]].
- Self-serve platform: free tier, no card required.

## Site map (llms.txt)

| Page | URL | Description |
|---|---|---|
| CreateOS: The unified execution layer for AI. | https://createos.sh/ | Homepage. Product overview, hero positioning, featured case studies, testimonials, and CTAs to book a demo or start building. See [[CreateOS Homepage]]. |
| CreateOS Services | https://createos.sh/services | Custom AI build offerings across 12 categories: agents, RAG, multi-agent systems, model evaluation, fine-tuning, and enterprise integrations. See [[Services]]. |
| CreateOS Case Studies | https://createos.sh/case-studies | Deployments across banking, insurance, legal and manufacturing, plus solution blueprints that carry their assumptions and proof plan on the page, plus stories of founders shipping production apps across the full lifecycle in a single session. See [[Case Studies]]. |
| CreateOS Blog | https://createos.sh/blogs | Engineering deep-dives, agent architecture patterns, deployment guides, and product updates. See [[Blog]]. |
| Industries CreateOS Serves | https://createos.sh/industries | Vertical playbooks for AI in financial services, healthcare, manufacturing, retail, logistics, energy, and more. See [[Industries]]. |
| About CreateOS | https://createos.sh/about | Company mission, principles, and timeline. CreateOS is the enterprise execution layer built by NodeOps. See [[About CreateOS]]. |
| CreateOS Brand Handbook | https://createos.sh/brand | Logo and symbol files (SVG, PNG, PDF; the symbol files are square, for avatars and app icons), colour tokens, typography, clear space, and approved boilerplate. The Markdown version at https://createos.sh/brand.md additionally carries naming, voice and vocabulary, proof points, and claim discipline. Read it before writing about CreateOS or using the marks. See [[Brand Handbook]]. |
| CreateOS Studio early access | https://createos.sh/early-access | Request access to Studio, where teams build, govern, and run AI agents without writing code. The form needs human verification, so an agent acting for someone should email business@nodeops.xyz with their name, company, company size, and use case. See [[Studio Early Access]]. |
| Careers at CreateOS | https://createos.sh/careers | Open roles building the AI execution layer: engineering, growth, and Featured Founder programs. See [[Careers]]. |
| CreateOS for Amazon Sellers | https://createos.sh/amazon-sellers | Listings, ads, customer messaging, reporting, and website work in one place. Pilot model built around measurable progress. See [[Amazon Sellers]]. |
| CreateOS AI Lab in a Box for Schools | https://createos.sh/schools | Full-year AI building environment where students learn, build, deploy, and graduate with proof of work. Runs alongside CBSE. See [[Schools]]. |

## Customer proof (llms.txt)

| Case study | URL | Summary |
|---|---|---|
| From Matter Files to Strategy-Ready Briefs: How CreateOS Powers Litigation Intelligence | https://createos.sh/case-studies/createos-litigation-intelligence | An AI intelligence layer that turns raw matter files (contracts, notices, handwritten notes, scanned annexures, photographs) into a source-cited Timeline Brief before the first strategy meeting. |
| An entrepreneur shipped a full-stack affiliate platform in hours | https://createos.sh/case-studies/justref | Backend services, a database, messaging queues, and scheduled jobs. Built and deployed across the full lifecycle in one session. |
| A designer replaced six tools with one custom task board | https://createos.sh/case-studies/tacboard | Priority levels, status tracking, notes, image attachments. Six separate apps replaced by one custom tool, with no prior coding experience. |
| An AI engineer deployed an agent benchmarking game in under an hour | https://createos.sh/case-studies/agent-blaster | Two AI agents pitted against each other in a live puzzle maze. Built and deployed during a chance conversation at the AI Impact Summit. |
| A Key Account Manager at Amazon launched a wedding platform without writing code | https://createos.sh/case-studies/riyasat | A curated wedding experience platform for destination weddings and inter-caste marriage planning, deployed same day. Estimated at a week of work; finished in hours. |
| A data scientist built a travel gym tracker from one conversation | https://createos.sh/case-studies/anywheregym | A gym finder with real-time crowd alerts and mobile + desktop UI generated together. 500+ lines of code through natural language, deployed at the AI Impact Summit. |
| A mobile developer built a distraction tracker that keeps him accountable at work | https://createos.sh/case-studies/distraction-tracker | A context-switching tracker with real-time audio alerts, session controls, and focus metrics. Built and deployed in minutes by a developer who knew what he was losing. |
| Inside an Early CreateOS Pilot: CCTV to Real-Time Oversight in Indian Textiles | https://createos.sh/case-studies/createos-industrial-ai-textile | Over a 75-day pilot, cotton processing facilities across four Indian states connected their existing CCTV systems to CreateOS. 50,000+ hours (750+ TB) of video processed, no in-house DevOps team required. |

See [[Customer Stories]] and [[Case Studies]].

## Solution blueprints (llms.txt)

- 52 workflows CreateOS has designed but not yet delivered, each carrying its assumptions and a proof plan on the page. They are modelled, not measured, and are labelled as such on the site. Full list: https://createos.sh/case-studies?kind=blueprint (see [[Solution Blueprints]]).
- Examples listed in llms.txt:
  - AML Case Management Without the Two-Hour Assembly: https://createos.sh/case-studies/aml-02-from-alert-to-filed-sar
  - Sanctions Screening Alerts That Are Never Matches: https://createos.sh/case-studies/kyc-02-screening-false-positives
  - Underwriting Automation and the 70% Problem: https://createos.sh/case-studies/uw-02-the-70-percent-problem
  - Claims Processing Automation, FNOL to Settlement: https://createos.sh/case-studies/claims-01-fnol-to-settlement
  - One Off-Switch for Every Vendor's Agents on the Factory Floor: https://createos.sh/case-studies/mfg-13-agent-control-tower
  - Engineering Change Management That Stops Scrap: https://createos.sh/case-studies/mfg-07-engineering-change-gate

## Talk to us (llms.txt)

- Book a call (enterprise): https://cal.com/mrudul/connect-with-mrudul-createos?duration=30&layout=mobile
- Studio early access (enterprise): https://createos.sh/early-access
- Try it free (self-serve): https://createos.sh/app
- Email: hello@createos.sh
- GitHub: https://github.com/NodeOps-app
- Discord: https://discord.gg/nodeops
- LinkedIn: https://linkedin.com/company/nodeops
- X / Twitter: https://x.com/createosai
- Details: [[Contact and Community]]

## Full corpus (llms-full.txt)

Title: "CreateOS - Full corpus". It carries page text and case studies; blog posts are not included yet (browse https://createos.sh/blogs). Intro repeats the llms.txt positioning and points back to the concise index.

### Pages summarised in llms-full.txt

- Homepage (https://createos.sh/): the category and the core promise: one governed path from request to response, with routing, policy enforcement, output validation and audit in one place; deployment models, security posture and the industries served.
- Services (https://createos.sh/services): custom AI build offerings across 12 categories (agents, RAG, multi-agent systems, model evaluation, fine-tuning, enterprise integrations).
- Case Studies (https://createos.sh/case-studies), Blog (https://createos.sh/blogs), Industries (https://createos.sh/industries), About (https://createos.sh/about), Careers (https://createos.sh/careers), Amazon Sellers (https://createos.sh/amazon-sellers), Schools (https://createos.sh/schools): same descriptions as in the site map above.

### Case studies in llms-full.txt (builder and location)

| Case study | Builder | Location | URL |
|---|---|---|---|
| From Matter Files to Strategy-Ready Briefs: How CreateOS Powers Litigation Intelligence | CreateOS | Litigation | https://createos.sh/case-studies/createos-litigation-intelligence |
| An entrepreneur shipped a full-stack affiliate platform in hours | Kalash Vasaniya | Bangalore | https://createos.sh/case-studies/justref |
| A designer replaced six tools with one custom task board | Stefania | Rome | https://createos.sh/case-studies/tacboard |
| An AI engineer deployed an agent benchmarking game in under an hour | Pratyush | Delhi | https://createos.sh/case-studies/agent-blaster |
| A Key Account Manager at Amazon launched a wedding platform without writing code | Gunjan | Bangalore | https://createos.sh/case-studies/riyasat |
| A data scientist built a travel gym tracker from one conversation | Ankit | Delhi | https://createos.sh/case-studies/anywheregym |
| A mobile developer built a distraction tracker that keeps him accountable at work | Michele | Rome | https://createos.sh/case-studies/distraction-tracker |
| She built her dad an invoicing app in one session | Nandini | Mumbai | (no URL in llms-full.txt) |
| A golfer with no coding background built a scam-site detector in ten minutes | Chetan Soni | India | (no URL in llms-full.txt) |
| A TikTok PM built an AI growth team for small businesses in one session | Wanlin | San Francisco | (no URL in llms-full.txt) |
| Inside an Early CreateOS Pilot: CCTV to Real-Time Oversight in Indian Textiles | CreateOS | Maharashtra, Tamil Nadu, Telangana, Gujarat | https://createos.sh/case-studies/createos-industrial-ai-textile |

Extra summaries only in llms-full.txt:
- Nandini (Mumbai): an invoicing and company-management app built for her father's business through natural language and deployed in a single CreateOS session, recorded on location near the Mumbai Hackathon.
- Chetan Soni (India): "Scam or Legit", a tool that checks whether a shopping site is genuine or fake, built in about ten minutes by an MBA with no coding background after he and his father both lost money to online fraud.
- Wanlin (San Francisco): an AI platform acting as creative director, brand manager and community manager for small businesses and micro-creators; front end and back end generated in parallel and deployed through the CreateOS Create flow.

### FAQ in llms-full.txt

- **How quickly can you start?** Discovery calls happen within a week. From a signed SOW, most builds start within 2 to 3 business days. Production MVPs ship in 4 to 8 weeks depending on scope.
- **Who owns the IP?** The customer. All code, models, weights and prompts are the customer's outright on delivery; CreateOS also trains the customer's team to operate what was built so they aren't locked in.
- **How do you price engagements?** Fixed-price scoped engagements after a paid discovery sprint. No retainer ambiguity, no hourly overruns; the number is shown before any code is written.
- **Which LLMs do you work with?** All of them. Direct integrations with 100+ models through NodeOps Router: GPT-4o, Claude, Mistral, LLaMA, Gemini, Cohere, Deepseek and the long tail of open-source models. CreateOS benchmarks on the customer's data and picks the best fit.
- **What about data privacy and compliance?** Multi-tenant deployments by default, with hybrid options for regulated industries: on-prem, bring-your-own-cloud, region-aware compute, air-gapped. ISO 27001 certified, SOC 2 Type II certified controls. DPAs and BAAs are signed as needed.
- **Do you work on non-AI projects?** Sometimes. If AI is the wrong tool for the problem, CreateOS says so: a deterministic system or a RAG pipeline, whichever wins for the business.
- **Where is the team based?** Distributed across Bangalore, Delhi and Rome. Async-first, with overlap with US East and EMEA business hours.

## Related
- Up: [[Home]]
- [[CreateOS Homepage]]: homepage
- [[Brand Handbook]]: the handbook llms.txt tells agents to read before writing about CreateOS
- [[Contact and Community]]: contact channels
- [[CreateOS Docs]]: docs index referenced from llms.txt
- [[Products]]: product overview
- [[Pricing]]: pricing hub
- [[Hackathon Overview]]: the hackathon this vault supports
