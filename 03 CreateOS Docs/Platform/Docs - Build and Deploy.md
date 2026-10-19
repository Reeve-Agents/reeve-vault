---
tags:
  - createos/docs
  - createos/docs/platform
  - type/page
source: https://createos.sh/docs/Build-Deploy
sources:
  - https://createos.sh/docs/Build-Deploy
  - https://createos.sh/docs/Build-Deploy/Create
  - https://createos.sh/docs/Build-Deploy/Deploy
  - https://createos.sh/docs/Build-Deploy/Templates-And-Apps
  - https://createos.sh/docs/Build-Deploy/Widgets
scraped: 2026-10-17
up: "[[CreateOS Docs]]"
---

# Docs - Build and Deploy

> [!summary] Summary
> - How a project goes from idea to live URL: Create (AI-built apps), Deploy (GitHub, Docker, upload, template), Templates and Apps (marketplace), Widgets (dashboard sidebar).
> - Deploy covers cron jobs, analytics, alerts, environments and promotion, scaling, security scanning, custom domains, AI Playground.
> - The same flows are available from the CLI ([[Docs - CLI]]) and over MCP ([[Docs - API and MCP]]).
> - Source: https://createos.sh/docs/Build-Deploy

## Build and Deploy
- **URL:** https://createos.sh/docs/Build-Deploy
- **Summary:** Section index with four pages.
- **Key points:**
  - Create a project with AI or from scratch; deploy from GitHub, Docker or an upload; start from a Template or App; embed Widgets.
  - Pages: Create, Deploy, Template and Apps, Widgets.

## Create
- **URL:** https://createos.sh/docs/Build-Deploy/Create
- **Summary:** Build and deploy full-stack apps end-to-end with the LLM of your choice, billed through one unified credit system.
- **Key points:**
  - Start: https://createos.sh/app/landing . Any frontend or backend app; generated code should be reviewed before deployment.
  - Example use cases: websites (marketing, landing, product), games (browser-based, interactive demos), productivity apps (task managers, URL shorteners, password strength detectors, Jira-style trackers).
  - Preview: desktop and mobile views, live refresh, full-screen mode.
  - GitHub: direct push from CreateOS, or manual download and upload.
  - Deploy: link the project via GitHub, deploy within minutes, manage CI/CD through the **Deploy Flow**; project appears under **My Apps**; **AI Playground** edits code without a local clone; any commit reflects in the deployed app.
  - Create MCP integration: connect the Deploy Flow to external IDEs via the CreateOS MCP Server (VS Code, Cursor, Claude Code, Gemini Code Assist, other MCP tools); generate an API key at https://createos.sh/app/profile .
  - Multiple chat sessions: each session is a separate project, searchable, resumable. Deleting a session (hover, three-dot menu, **Delete**) cannot be undone.
  - Credits: consumed by model type, input tokens and output tokens; each model's token cost is translated to CreateOS credits; context size is optimized automatically. Billing: https://createos.sh/app/profile

## Deploy
- **URL:** https://createos.sh/docs/Build-Deploy/Deploy
- **Summary:** Unified deployment and operations platform that avoids custom CI/CD; deploys from GitHub repos, Docker images, uploaded files or AI-generated projects.
- **Key points:**
  - **Quickstart:** sign in at https://createos.sh/app with Email, GitHub, Google or Wallet (Wallet marked not recommended); click **+ New Project**; choose **GitHub Repository**, **Docker Image**, **Template** or **Manual Upload**.
  - **GitHub, Build with AI (recommended):** pick repo via **Browse Repositories**; AI detects framework, configures build and run commands, assigns server port, sets up pipeline.
  - **GitHub, manual:** choose branch (`main`, `master`, `develop`), framework (Node.js, Python, React, Next.js, ...), server port (for example `3000`, `8000`, `8080`), project name (becomes subdomain `myproject.createos.nodeops.network`), optional build commands (`npm install`, `pip install -r requirements.txt`), optional run commands (`npm start`, `python app.py`), env vars, **Deploy**.
  - **Manual upload:** upload files, set build and run commands and env vars; suited to local projects, AI-generated code, prototypes, one-offs.
  - **Docker image:** enter image URL and exposed port, optional env vars; CreateOS pulls and deploys.
  - **Templates:** choose a template (for example web app, API service), customize, deploy.
  - **App Folder:** group multiple related projects under one logical application.
  - **Management dashboard:** build and application logs (live), analytics, alerts, environment management, compute scaling, security scanning, custom domains.
  - **Cron Jobs tab (per project):**
    - Schedule an HTTP call on a recurring basis; methods `GET`, `POST`, `PUT`, `PATCH`, `DELETE`; custom headers and optional body.
    - Create form: Name, Environment (staging or production, cannot be changed after creation), Schedule, Endpoint path (for example `/api/send-emails`), HTTP Method, optional Headers, optional Body.
    - Presets: Every Minute (60 runs per hour), Every Hour, Every Day (midnight), Every Week (Sunday midnight), Custom.
    - Custom builder: every X minutes (2, 5, 10, 15, 20 or 30), hourly at minute, daily at `HH:MM`, weekly on days, raw cron expression; shows plain-English text and next run time.
    - Toggle suspends or resumes; **Configure** edits (except Environment); delete removes the job and its history permanently.
    - History: run time, success or failure, HTTP status code, log snippet; log drawer can copy or download `.txt`.
    - Limitation: no **Run Now**; jobs run on schedule only.
  - **Analytics:** request volume and traffic, response times, error rates, CPU/memory/bandwidth usage, geographic distribution.
  - **Alerts:** deployment failures, application errors, resource thresholds, availability or health check issues.
  - **Environments and promotion:** staging and production (production is the default); promote a deployment between environments without rebuilding (same build artifact, only the environment mapping changes); optional auto-promotion.
  - **Compute and scaling:** vertical (CPU, memory) and horizontal (replicas); changes apply immediately.
  - **Security scanning:** automatic scan per deployment; security score, vulnerability details, re-scan, downloadable PDF report.
  - **Custom domains:** each project gets a CreateOS subdomain; add a domain in project settings, configure DNS records, wait for propagation, activate.
  - **GitHub integration:** GitHub is the source of truth; push to GitHub in a few clicks, download files, redeploy automatically on each commit.
  - **API keys:** generate in Profile for external integrations and automation.
  - **AI Playground:** browser-based AI coding environment tied to the GitHub repo; no local clone, inline edits, AI agent, auto-deploy on commit. Prerequisite: GitHub Actions enabled.
  - Deleting projects from the dashboard is permanent.

## Template and Apps (Template Marketplace and Application Store)
- **URL:** https://createos.sh/docs/Build-Deploy/Templates-And-Apps
- **Summary:** Marketplace for deploying and monetizing production-ready templates (credits, full source shared) and the Application Store (in-app payment, source stays private).
- **Key points:**
  - **Template Marketplace:** organized by user type (Developers, Enterprises), compute (CPU, GPU), categories (AI/ML, Analytics, Authentication, Automation, Marketing, Blogs, CMS, Security, Observability, Database, Blockchain, Computing, and more).
  - Deploying a template: **Deploy Now**, connect GitHub (project is forked to your repo), pay with credits (price set by contributor), manage under **My Deployments** (CI/CD management, build customization, config controls).
  - AI Playground: in **My Deployments** click **Create AI Playground** (top right); every commit triggers the pipeline.
  - Contributing a template: GitHub-based projects only; complete codebase is shared with buyers; otherwise list as an Application.
  - Approval flow: Template Creation, Submit Template, Template Review, Approval, Marketplace Listing. Rejection returns feedback, then resubmit.
  - Submission fields: Name, Thumbnail, Video Tutorial, Description, Use Case, Category, GitHub Repository, Pricing (credits).
  - Review by the NodeOps team. Submission requires credits; rejected submissions are not refunded, but resubmitting improvements for the same template costs no extra credits.
  - Updates: first 3 updates free, then credits per update; users who deployed the template get notifications.
  - Security scanning: per-project, credit-based, unlimited scans, score shown on the listing.
  - Visibility boosts: credit-based marketing plans (positioning, discoverability, featured placement, targeted promotion).
  - **Application Store:** fully functional apps deployed instantly; payment through the application itself (no credits); managed under **My Apps**.
  - Categories: Productivity, Games, Entertainment, Crypto, and more.
  - Listing an app: contributor retains source code and IP; set own pricing; app must be deployed and functional on CreateOS; credits are consumed at submission; same review quality bar.
  - App submission fields: Name, Image, Video Tutorial, Description, Use Case, Category. Flow: Application Development, Submit Application, Review Process, Approval, App Store Listing.

## Widgets (Widget Dashboard)
- **URL:** https://createos.sh/docs/Build-Deploy/Widgets
- **Summary:** Customizable right-hand sidebar of widgets in the CreateOS interface.
- **Key points:**
  - Widgets: Notes (markdown, persistent), Share Price and Crypto Feeder (live prices), Credits Usage (balance, history, low-credit alerts), Top Apps (trending App Store apps), Games, Music Player.
  - Add via **Add Widget** or **+**; remove via the widget menu (data is kept and restored on re-add).
  - Arrange: drag and drop, resize, collapse, pin; configuration persists across sessions and devices.
  - Suggested setups: Developers (Notes + Music Player + Credits Usage); Founders (Credits Usage + Top Apps + Notes); Market Research (Top Apps + Share Price and Crypto + Notes); Balanced (Notes + Credits Usage + Games + Music Player).

## Related
- Up: [[CreateOS Docs]]
- [[Docs - Get Started]]: step-by-step tutorials
- [[Docs - CLI]]: same flows from a terminal
- [[Docs - API and MCP]]: API operations and MCP tools for deployments
- [[Docs - Integrations]]: connect IDEs and agents
- [[Docs - Account and Billing]]: credits and pricing
- [[Docs - Services]]: databases, cache, queues
- [[Docs - Migrations]]: moving existing apps in
