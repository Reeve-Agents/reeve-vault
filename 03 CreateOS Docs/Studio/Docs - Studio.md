---
aliases:
  - CreateOS Studio docs
  - Studio docs
tags:
  - createos/docs
  - createos/docs/studio
  - type/hub
source: https://createos.sh/docs/studio/Welcome
sources:
  - https://createos.sh/docs/studio/Welcome
  - https://createos.sh/docs/studio/Getting-Started
scraped: 2026-10-17
up: "[[CreateOS Docs]]"
---

# Docs - Studio

> [!summary] Summary
> - CreateOS Studio is where a team builds, governs and runs **AI agents** without writing code.
> - Every agent is built in five stages: **Define**, **Ground**, **Act**, **Govern**, **Operate**.
> - This hub holds the Welcome and Getting Started pages and links to every other Studio docs note (30 `/studio/*` pages in total).
> - Source: https://createos.sh/docs/studio/Welcome

## Studio notes map

| Note | Covers | `/studio/*` pages |
|---|---|---|
| [[Docs - Studio]] (this note) | Welcome, Getting Started | `Welcome`, `Getting-Started` |
| [[Docs - Studio Agent Builder]] | Builder layout, lifecycle, sharing levels | `Agent-Builder` |
| [[Docs - Studio Agent Builder - Define]] | Goals and instructions, Model Gateway, Skills | `Agent-Builder/Define` and 3 sub-pages |
| [[Docs - Studio Agent Builder - Ground]] | Knowledge base, Memory | `Agent-Builder/Ground` and 2 sub-pages |
| [[Docs - Studio Agent Builder - Act]] | Tools | `Agent-Builder/Act` and 1 sub-page |
| [[Docs - Studio Agent Builder - Govern]] | Guardrails, Audit logs, Audit traces, Usage, RBAC | `Agent-Builder/Govern` and 5 sub-pages |
| [[Docs - Studio Agent Builder - Operate]] | Sandbox (Playground) | `Agent-Builder/Operate` and 1 sub-page |
| [[Docs - Studio APIs and SDKs]] | Studio API (management), Sandbox SDK (runtime) | `APIs-And-SDKs` and 2 sub-pages |
| [[Docs - Studio Enterprise Use Cases]] | Manufacturing, Healthcare, Finance, Legal, Operations and Management, Marketing | `Enterprise-Use-Cases` and 6 sub-pages |

## Welcome to Studio
- **URL:** https://createos.sh/docs/studio/Welcome
- **Summary:** Explains what CreateOS Studio is, who it is for, the five stages of an agent, how the pieces fit together, the core concepts and what Studio guarantees. Recommended first read, then Getting Started; everything else is reference.
- **Key points:**
  - An agent is a helper described in plain English: a job, company documents, connected apps and rules. Studio picks up the instructions, calls the model, searches documents, uses tools and records every step.
  - Home sidebar entries: Dashboard, Agent Hub, Create agent, Knowledge Base, Skills, Models, Tools, Memory, Guardrails, Traces, Usage.
  - Who it is for:
    - Business or operations lead: no-code builder to turn a manual process into an agent.
    - Subject-matter expert: knowledge bases and skills so the agent answers from their material.
    - IT / platform admin: model providers, SSO, roles, guardrails and an immutable audit log.
    - Developer: a typed API, an OpenAPI reference and an HTTP runtime to embed.
  - The five stages (the Agent Builder and these docs are organised around them):

    | Stage | Question | What you set up |
    |---|---|---|
    | Define | Who is this agent? | Name, goal, instructions, skills, model |
    | Ground | What does it know? | Knowledge bases, memory |
    | Act | What can it do? | Tools (Gmail, Slack, Notion, Salesforce...) |
    | Govern | What is it allowed to do? | Guardrails, roles, sharing, audit logs, traces, usage |
    | Operate | Is it working? | Playground runs, sessions, publishing |

  - Architecture: you in the browser -> Studio control plane -> Agent runtime (executes the turn). The runtime uses the Model Gateway (OpenAI, Anthropic, Bedrock, OpenRouter), Knowledge Base, Tools (Gmail, Slack, Notion, Salesforce), Guardrails (check input and output) and Memory. Studio also writes an Audit log and Traces of every action.
  - Studio decides what is allowed and configured; the runtime does the work; everything the runtime does is recorded.
  - Core concepts:
    - **Organization**: the workspace; agents, documents and connections belong to one.
    - **Agent**: a configured helper with goal, instructions, model and attachments.
    - **Session**: one ongoing conversation; keeps history.
    - **Run**: one turn inside a session.
    - **Step**: one thing inside a run (model call, tool call, document search, guardrail check).
    - **Knowledge base**: a folder of documents the agent can search.
    - **Skill**: reusable block of instructions attachable to many agents.
    - **Toolkit**: a connected app (Gmail, Slack, Notion...) and the actions it exposes.
    - **Connection**: a credential an admin added (model provider, memory provider or guardrail provider).
    - **Guardrail**: a safety check on input and/or output.
    - **Trace**: step-by-step record of a run with timings, tokens and cost.
  - Guarantees: data stays in your organization (all reads and writes scoped, including document search); nothing happens without a record (append-only audit log, including refusals); credentials are never shown back (API keys and OAuth tokens encrypted, never returned by API or UI); access is checked twice (a role decides what you can create, a per-object permission decides what you can reach).
  - Next steps listed: Getting Started, Agent Builder, Sandbox, Enterprise Use-Cases, APIs and SDKs.
  - Page contains a "CreateOS Studio in 90 seconds" video placeholder (90 sec).

## Getting Started
- **URL:** https://createos.sh/docs/studio/Getting-Started
- **Summary:** Hands-on setup from sign-in to a published agent, about 15 minutes with no code. Ends with a first-week checklist and local-run instructions for developers.
- **Key points:**
  - **Before you begin:** an invitation to a Studio workspace (or permission to create one) and at least one model provider key in the workspace (OpenAI, Anthropic, AWS Bedrock or OpenRouter); non-admins ask an admin to add one.
  - **Step 1, Sign in:** email code (one-time code to work email, no password), Google (if the admin enabled it), or company SSO (SAML/OIDC). Disposable/temporary email addresses are rejected; closed deployments need a live invitation before an account can be created.
  - **Step 2, Set up your workspace:** first person creates the organization (name and logo) and invites the team by email (join link). The creator becomes the **admin** (can do everything, including deleting the organization). Invited users land straight in the workspace.
  - **Step 3, Connect a model provider (admin):**
    - Sidebar **Models**; provider cards **OpenAI**, **Anthropic**, **AWS Bedrock**, **OpenRouter**; click **Connect**, paste the API key (for Bedrock pick the **AWS Region** first), click **Connect**.
    - Studio validates the key, encrypts it and registers the provider with the model gateway. The key is never shown again, in the UI or the API.
    - **Available models** is the allowlist: toggle individual models or use **Enable all**, then **Save**.
  - **Step 4, Create your first agent:**
    - Sidebar **Create agent**; start from **Blank agent** or an organization **Templates** entry (Support Desk, Research Brief, Sales Copywriter, and more); name it in the **Name your agent** dialog (example `Support Triage`) and click **Create agent**.
    - You land in the **Agent Builder**: configuration on the left, **Playground** on the right.
    - Essentials: **Goal** (one sentence), **Instructions** (tone, rules, what to never do), **Model** (example `anthropic/claude-sonnet-5`), **Output format** (Text, JSON, Image or File).
  - **Step 5, Ground it (optional, recommended):** in **Knowledge** attach a knowledge base. To make one: **Knowledge Base** -> **New knowledge base**, upload PDF, DOCX, DOC, TXT or MD, wait for each document to reach **Ready** (Studio parses, splits, embeds and indexes), then attach it in the builder.
  - **Step 6, Test in the Playground:** type a question and watch the answer stream. You can **Stop** a run, **Answer a question** the agent asks (agents can pause for a human), and **Clear playground**. Change a word in the instructions, rerun, compare.
  - **Step 7, Publish:** click **Publish**. Requires name, goal, instructions, model and output format. Moves the agent from **Draft** to **Active** and lists it in the **Agent Hub**.

    | Status | Meaning |
    |---|---|
    | Draft | Still being built; only people it was shared with can open it |
    | Active | Published and runnable |
    | Paused | Temporarily stopped; configuration kept |
    | Archived | Retired; can be restored later |

  - **Step 8, Watch it work:** **Traces** (every run step by step: model, tools, timings, tokens, cost), **Audit log** (who changed what, who was refused), **Usage** (spend and volume over time).
  - **First-week checklist:** sign in and create the org; invite the team; connect a model provider; create and publish one agent; upload and attach a knowledge base; connect one tool (Gmail, Slack, Notion...); turn on a guardrail; create a role for non-admins; open a trace and read it end to end.
  - **Running Studio locally (developers):**
    - Prerequisites: `bun`, PostgreSQL, `pre-commit`, runtimes installed via `asdf`.
    - Commands: `bun install`; configure `apps/web/.env` (see `.env.example`: `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `CORS_ORIGIN`, `EVE_INTERNAL_API_SECRET`, `SECRET_VAULT_KEY` / `SECRET_VAULT_KEY_ID`); `bun run db:migrate:deploy`; `bun run db:generate`; `bun run dev`.
    - Local URLs: Studio (web + API) `http://localhost:3001`; Agent runtime `http://127.0.0.1:4274`; Model gateway (OmniRoute) `http://localhost:20128`.
    - The model gateway runs separately: `npm install -g omniroute` then `omniroute`; point Studio at it with `OMNIROUTE_BASE_URL` and `OMNIROUTE_MANAGEMENT_API_KEY`.
  - Page contains a "Editing instructions and re-running in the Playground" video placeholder (60 sec).

## Related
- Up: [[CreateOS Docs]]
- [[Studio Early Access]]: request access to Studio
- [[Product - Agents]]: CreateOS agents product page
- [[Product - Gateway]]: CreateOS gateway product page (Studio's Model Gateway is covered in [[Docs - Studio Agent Builder - Define]])
- [[Docs - Sandbox SDK]]: Sandbox section SDK docs (shares the name "Sandbox SDK" with the Studio runtime API page in [[Docs - Studio APIs and SDKs]])
- [[Industries]]: industry hubs; Studio industry patterns are in [[Docs - Studio Enterprise Use Cases]]
