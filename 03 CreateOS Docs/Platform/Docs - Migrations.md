---
tags:
  - createos/docs
  - createos/docs/platform
  - type/page
source: https://createos.sh/docs/Migrations
sources:
  - https://createos.sh/docs/Migrations
  - https://createos.sh/docs/Migrations/Vercel
  - https://createos.sh/docs/Migrations/Replit
  - https://createos.sh/docs/Migrations/Netlify
  - https://createos.sh/docs/Migrations/Railway
  - https://createos.sh/docs/Migrations/Render
scraped: 2026-10-17
up: "[[CreateOS Docs]]"
---

# Docs - Migrations

> [!summary] Summary
> - Guides for moving an existing app from Vercel, Replit, Netlify, Railway or Render to CreateOS.
> - Common flow: collect commands, env vars, port and domains; sign in at https://createos.sh/app/ ; **Deploy**; import GitHub repo (or **Deploy using File Upload**); **Manual** or **Build with AI**; add env vars; deploy; cut over DNS last.
> - One-command Vercel migration via a skill: `npx skills add https://github.com/NodeOps-app/skills --skill vercel-to-createos`
> - Source: https://createos.sh/docs/Migrations

## Migrations
- **URL:** https://createos.sh/docs/Migrations
- **Summary:** Index for migration guides; lists what to collect from the current platform first.
- **Key points:**
  - Collect before migrating: source code location (GitHub repository or exported ZIP); install, build and start commands; required environment variables and secrets; runtime port; custom domains and DNS records; background workers, cron jobs, databases, storage and queues.
  - Guides: Vercel, Replit, Netlify, Railway, Render.

## Migration from Vercel to CreateOS
- **URL:** https://createos.sh/docs/Migrations/Vercel
- **Summary:** Connect the Vercel project's repository on CreateOS and deploy; includes a 2-minute video and a skill that automates the migration.
- **Key points:**
  - Skill (detects the Vercel project, translates config, deploys):
    ```bash
    npx skills add https://github.com/NodeOps-app/skills --skill vercel-to-createos
    ```
    Then ask the agent: "migrate my Vercel project to CreateOS".
  - Manual steps: sign in at https://createos.sh/app/ ; **Deploy**; **Import GitHub Repository** (or **Browse Repositories** if already connected); select repo and **Import**; choose **Manual** (own install and build commands) or **Build with AI** (detects framework, commands, build files; select the branch); **Deploy**; build logs stream; green **Deployed** message then dashboard (live deployment, env vars, domain, scaling of server resources and replicas).
  - GitLab or Bitbucket: export the repo as a ZIP (GitLab: **Code, Download, .zip**; Bitbucket: three dots, **Download Repository**), then use **Deploy using File Upload**; name the project, set the port, add install commands and env vars, **Deploy**. File-upload deployments always use **Build with AI**.

## Migration from Replit to CreateOS
- **URL:** https://createos.sh/docs/Migrations/Replit
- **Summary:** Move a Replit app to CreateOS with deployment controls, env vars, domains, logs and scaling.
- **Key points:**
  - Mapping: Repl files to GitHub repo or file-upload deployment; Replit Secrets to CreateOS environment variables; `.replit` run command to start command; Replit deployment to CreateOS deployment; Replit DB or storage to external database, storage service or CreateOS-managed service.
  - Steps: confirm the Replit project runs; export (preferred: push/sync to GitHub; alternative: ZIP and file upload); read `.replit`, `package.json` or framework config for install, build and start commands and port; move secrets; bind servers to `0.0.0.0` and read the port from an environment variable when possible; sign in, **Deploy**, import repo or upload; **Build with AI** or **Manual**; add env vars, confirm port, deploy; verify login, API routes, background work, external services.
  - Checks: migrate Replit DB data before switching traffic; move runtime-written local files to object storage or another persistent service; add Replit-installed packages to the manifest; update DNS only after verification.
  - Cutover: deploy on CreateOS, test the CreateOS URL, add production env vars, point custom domain, keep Replit deployment until DNS has propagated and CreateOS is stable.

## Migration from Netlify to CreateOS
- **URL:** https://createos.sh/docs/Migrations/Netlify
- **Summary:** Move a Netlify site by importing the same GitHub repository and reproducing build settings.
- **Key points:**
  - Mapping: connected Git repo to GitHub repo deployment; build command to build command; publish directory to output directory or static build output; env vars to CreateOS env vars; Netlify Functions to API routes, backend service or separate CreateOS service; redirects to app-level redirects, router config or proxy rules; custom domain to CreateOS domain mapping.
  - Collect from Netlify: repository, production branch, build command, publish directory, env vars, redirect rules, functions directory.
  - Steps: confirm local build; **Deploy**; **Import GitHub Repository**; **Manual** (exact Netlify build settings) or **Build with AI**; add build command and output directory; env vars; deploy and open the preview URL.
  - Functions and redirects: move Functions to framework API routes or a separate backend; move scheduled functions to CreateOS cron jobs; recreate redirects in router, framework config or edge/proxy layer; check `_redirects`, `netlify.toml` and function env vars.
  - Cutover: verify directly, test static routes, API routes, forms and redirects; add production domain; update DNS when ready; keep Netlify active until stable.

## Migration from Railway to CreateOS
- **URL:** https://createos.sh/docs/Migrations/Railway
- **Summary:** Move Railway services one by one into CreateOS projects, app folders or keep them external.
- **Key points:**
  - Mapping: Railway project to CreateOS project or app folder; service to deployment service; service variables to env vars; start command to start command; public networking to domain and port config; database plugin to external DB connection or CreateOS-managed service.
  - Per service collect: repository, branch, install, build and start commands, port, env vars, attached databases, queues, volumes, storage.
  - Decide per service: one CreateOS project, one service inside a shared app folder, or external dependency.
  - Steps: **Deploy**; import repo from GitHub; configure commands and port; env vars; deploy and verify; repeat per service.
  - Databases and connections: export and restore data if moving DBs; update connection strings; replace Railway internal hostnames with new service URLs; check CORS, callback URLs, webhook URLs, allowed origins.
  - Cutover: deploy all services, verify health checks and logs, run a production-like request, add custom domain, switch DNS only when all services are healthy, keep Railway until stable.

## Migration from Render to CreateOS
- **URL:** https://createos.sh/docs/Migrations/Render
- **Summary:** Move Render web services, static sites, workers or cron jobs to CreateOS.
- **Key points:**
  - Mapping: web service to CreateOS deployment; static site to static build deployment; background worker to worker service or separate deployment; cron job to CreateOS cron job; environment group to env vars; persistent disk to external storage or supported persistent storage setup; custom domain to domain mapping.
  - Collect: service type, repository and branch, build command, start command, runtime, port, env vars or environment group, health check path, custom domains. If a `render.yaml` exists, use it as the checklist.
  - Steps: **Deploy**; import same GitHub repo; **Manual** or **Build with AI**; env vars; port; deploy; verify on the CreateOS URL.
  - Checks: convert workers to separate CreateOS services and cron jobs to CreateOS cron jobs; move persistent disk data before switching traffic; migrate Render-managed Postgres/Redis or keep the external connection string; update webhook and callback URLs after the domain is live.
  - Cutover: verify, smoke test with production-like data, add custom domain, update DNS, keep Render until traffic has moved.

## Related
- Up: [[CreateOS Docs]]
- [[Docs - Build and Deploy]]: deploy flows used by the migrations
- [[Docs - CLI]]: cron jobs, domains and env vars from the CLI
- [[Docs - API and MCP]]: CreateOS Skills (includes `vercel-to-createos`)
- [[Docs - Services]]: CreateOS-managed databases, cache, queues
