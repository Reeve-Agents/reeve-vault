---
tags:
  - createos/docs
  - createos/docs/platform
  - type/page
source: https://createos.sh/docs/Get-Started
sources:
  - https://createos.sh/docs/Get-Started
  - https://createos.sh/docs/Get-Started/Create-Application
  - https://createos.sh/docs/Get-Started/Deploy-Github-Project
  - https://createos.sh/docs/Get-Started/Deploy-Service
  - https://createos.sh/docs/Get-Started/Deploy-App
  - https://createos.sh/docs/Get-Started/Rent-Server
scraped: 2026-10-17
up: "[[CreateOS Docs]]"
---

# Docs - Get Started

> [!summary] Summary
> - Five short dashboard tutorials (roughly 5 to 10 minutes each): create an app by prompt, deploy a GitHub repo, deploy a database, deploy a marketplace application, rent a server.
> - All start at https://createos.sh/app/ and use the left menu (Create, Deploy, Templates, My Servers).
> - For isolated code execution for agents, the docs point to Sandbox instead ([[Docs - Sandbox]]).
> - Source: https://createos.sh/docs/Get-Started

## Get Started
- **URL:** https://createos.sh/docs/Get-Started
- **Summary:** Index of five paths: pick the one matching what you have.
- **Key points:**
  - Idea and no code: Create a project from scratch.
  - GitHub repository: Deploy a project.
  - Postgres, Redis or Kafka need: Deploy a database (the tutorial itself covers PostgreSQL or MongoDB).
  - Packaged application: Deploy an application.
  - Raw compute: Rent a server.
  - Agent code execution: start with Sandbox instead.

## Create a project from scratch
- **URL:** https://createos.sh/docs/Get-Started/Create-Application
- **Summary:** Prompt-based flow: describe an app, approve the plan, get a preview and an automatically deployed unique, persistent, shareable URL.
- **Key points:**
  - Steps: log in at https://createos.sh/app/landing, click **Create**, describe the app (or use a suggested prompt such as "Cloud Storage Solution"), click **Approve**, preview the generated app.
  - The app deploys automatically with a shareable link; keep refining with further prompts.
  - Models: CreateOS natively comes with Gemini Pro 3, Claude Opus 4.5 and GPT 5.1; cycle between them or bring your own by adding an API key.

## Deploy a project
- **URL:** https://createos.sh/docs/Get-Started/Deploy-Github-Project
- **Summary:** 8-step GitHub deployment walkthrough via the **Deploy** menu, with live build logs and a post-deploy dashboard.
- **Key points:**
  - Deployment methods offered: Import from GitHub (used in tutorial), Deploy from Docker image, Upload a file, Deploy from template.
  - Project settings: Folder, Project Name, Environment (Production, Staging or custom), Branch, Framework.
  - Build settings: environment variables; build and deployment commands are auto-detected and editable.
  - After deploy: preview, add custom domain, add a database with one click.
  - Dashboard: monitor deployments, manage environments, analytics, settings (domains, build commands, env vars), logs, rollback builds.
  - Other methods: Docker https://createos.sh/app/deployProject/docker , file upload https://createos.sh/app/deployProject/file-upload , templates https://createos.sh/app/templates .

## Deploy a database
- **URL:** https://createos.sh/docs/Get-Started/Deploy-Service
- **Summary:** Deploy a managed PostgreSQL or MongoDB database from the dashboard and copy its connection credentials.
- **Key points:**
  - Path: **Deploy** then **Deploy a Database**.
  - Settings: Database Type (PostgreSQL or MongoDB), Disk Size, Application Folder (optional), Region; click **Deploy Database**.
  - Credentials: **Connect** (top right) or **View Credentials** on the dashboard.

## Deploy an application
- **URL:** https://createos.sh/docs/Get-Started/Deploy-App
- **Summary:** Deploy a ready-made marketplace template with no repository to configure; the app gets a unique, persistent URL.
- **Key points:**
  - Path: **Templates** then browse; filters: Category (AI/ML, Analytics, Authentication, ...), Compute Type (CPU/GPU), User Type (Developer/Enterprise).
  - Tutorial uses the free starter template **Task Manager**.
  - Provider options: **Auto Assign** (recommended), **Go with my preference** (specific server or cluster), **Custom**.
  - Final dialogue: duration in months, optional promo code, **Deploy**.
  - Result appears under the **Deployments** tab (live URL, status, application dashboard).

## Rent a server
- **URL:** https://createos.sh/docs/Get-Started/Rent-Server
- **Summary:** Rent CPU/GPU machines from **My Servers** (https://createos.sh/app/myServers) in under five minutes.
- **Key points:**
  - Path: **My Servers**, **Add Server**, then **Rent Machine** (or **Add Your Own Machine**).
  - Settings: Number of Machines, Compute Units (CPU/GPU per machine), duration, optional promo code, **Deploy**.
  - Server shows status **Active**; Machine Details show workloads, CPU usage and uptime in real time.
  - Next: deploy applications to the server, attach databases and services, scale.

## Related
- Up: [[CreateOS Docs]]
- [[Docs - About CreateOS]]: platform overview
- [[Docs - CLI]]: CLI quickstart for the same flows
- [[Docs - Build and Deploy]]: reference for Create and Deploy
- [[Docs - Services]]: managed databases and other services
- [[Docs - Sandbox]]: isolated code execution for agents
- [[Hackathon Setup Guide]]: hackathon-specific setup
