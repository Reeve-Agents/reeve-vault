---
tags:
  - createos/docs
  - createos/docs/platform
  - type/index
source: https://createos.sh/docs/API-MCP/MCP-Operations
scraped: 2026-10-17
up: "[[Docs - API and MCP]]"
---

# Docs - API and MCP - MCP Operations

> [!summary] Summary
> - Reference list of the CreateOS MCP server tools: 73 tools numbered on the page (other pages say "75+").
> - Areas: projects, deployments, environments, domains, analytics and monitoring, security scans, API keys, GitHub integration, Apps (grouping of projects and services).
> - MCP endpoint: `https://api-createos.nodeops.network/mcp`; GitHub: https://github.com/NodeOps-app/createos-mcp
> - Source: https://createos.sh/docs/API-MCP/MCP-Operations

## MCP Documentation (MCP Operations)
- **URL:** https://createos.sh/docs/API-MCP/MCP-Operations
- **Summary:** Reference of all MCP tools for managing cloud-based projects, deployments and applications. Project types: VCS repositories, Docker images (image), direct file uploads (upload).
- **Key points:**
  - Features: project management; deployment control; environment configuration (development, staging, production); domain management (custom domains, SSL certificates); analytics and monitoring; security (scans, API keys); GitHub integration; application organization via Apps.
  - Tool names below are verbatim; descriptions are condensed from the page.

### Projects
- `CheckProjectUniqueName`: check if a project unique name is available.
- `CreateProject`: create a project with source code configuration and build settings; can link to a VCS repo (for example GitHub) with framework/runtime settings.
- `GetProject`: get project by ID.
- `GetSupportedProjectTypes`: list supported frameworks and runtimes.
- `ListProjects`: list all projects of the authenticated user.
- `UpdateProject`: update display name and description.
- `UpdateProjectSettings`: update build and runtime settings. VCS projects accept the VCSSettings schema; image projects the ImageSettings schema (port and runtime env vars); upload projects the UploadSettings schema.
- `DeleteProject`: mark a project for deletion (asynchronously deleted with all associated resources).
- `GetProjectTransferUri`: generate a transfer URI and token for ownership transfer (token valid 6 hours).
- `TransferProject`: transfer ownership to the authenticated user using a valid transfer token.
- `ListProjectTransferHistory`: list ownership transfers of a project.
- `GetQuotas`: current usage quotas including projects and API keys limits.

### Deployments
- `CreateDeployment`: create a deployment for an image type project (valid Docker image reference in the registry); image projects only.
- `ListDeployments`: all deployments for a project.
- `GetDeployment`: details for a deployment.
- `DeleteDeployment`: mark a deployment for deletion.
- `CancelDeployment`: cancel a deployment that is in queue or building state.
- `RetriggerDeployment`: new deployment with the same source as an existing one; settings from project or original deployment; works only for VCS projects.
- `TriggerLatestDeployment`: deploy the latest commit on the specified (or default) branch; VCS projects only.
- `WakeupDeployment`: wake a sleeping deployment (moves to deploying state); if the project has reached the maximum number of deployed deployments, the oldest deployed one is terminated.
- `DownloadDeployment`: signed URL to download deployment files; upload projects only.
- `UploadDeploymentFiles`: create a deployment by uploading files directly (array of path/content pairs); upload projects only.
- `UploadDeploymentBase64Files`: create a deployment by uploading base64-encoded files; upload projects only.
- `UploadDeploymentZip`: create a deployment by uploading a ZIP; upload projects only.
- `GetBuildLogs`: build logs for a deployment.
- `GetDeploymentLogs`: runtime logs for a deployed application.

### Environments
- `CheckProjectEnvironmentUniqueName`: check if an environment unique name is available for a project.
- `CreateProjectEnvironment`: create an environment. VCS projects: branch required and must exist in the repo. Image projects: branch omitted or null.
- `ListProjectEnvironments`: environments of a project.
- `UpdateProjectEnvironment`: update description, branch (VCS) and auto-promote settings.
- `UpdateProjectEnvironmentEnvironmentVariables`: update runtime env vars and settings. Image projects: port and `runEnvs`. VCS projects: only `runEnvs`.
- `UpdateProjectEnvironmentResources`: update CPU, memory and replica settings.
- `AssignDeploymentToProjectEnvironment`: assign a deployment to an environment.
- `DeleteProjectEnvironment`: delete an environment.
- `GetProjectEnvironmentLogs`: runtime logs for an environment.

### Domains
- `CreateDomain`: add a custom domain to a project (must be unique, not used by another project).
- `ListDomains`: custom domains for a project.
- `RefreshDomain`: trigger domain verification refresh; only for domains in pending status.
- `UpdateDomainEnvironment`: update the environment assignment; domain must be in active status.
- `DeleteDomain`: delete a custom domain from a project.

### Analytics
- `GetProjectEnvironmentAnalytics`: comprehensive analytics (overall requests, distribution, RPM, success percentage, top hit and error paths); supports custom time ranges via start and end.
- `GetProjectEnvironmentAnalyticsOverallRequests`: total requests, success (2xx), client errors (4xx), server errors (5xx).
- `GetProjectEnvironmentAnalyticsRequestsOverTime`: time series by status code ranges (2xx, 3xx, 4xx, 5xx).
- `GetProjectEnvironmentAnalyticsRPM`: peak and average requests per minute.
- `GetProjectEnvironmentAnalyticsSuccessPercentage`: success percentage (2xx + 3xx).
- `GetProjectEnvironmentAnalyticsTopErrorPaths`: top 10 paths with most 4xx and 5xx.
- `GetProjectEnvironmentAnalyticsTopHitPaths`: top 10 most accessed paths.
- `GetEnvAnalyticsReqDistribution`: request distribution grouped by HTTP status code.

### Security scans
- `TriggerSecurityScan`: create and trigger a scan for a deployment (security scanning must be enabled for the project).
- `GetSecurityScan`: scan report for a deployment.
- `GetSecurityScanDownloadUri`: signed URL for the full report; only when scan status is successful.
- `RetriggerSecurityScan`: retrigger a failed scan; only when status is failed.

### API keys and user
- `CheckAPIKeyUniqueName`: check if an API key name is available.
- `CreateAPIKey`: create a new API key.
- `ListAPIKeys`: all API keys of the user.
- `UpdateAPIKey`: update name and description.
- `RevokeAPIKey`: revoke a key, making it unusable.
- `GetCurrentUser`: information about the authenticated user.

### GitHub integration
- `InstallGithubApp`: connect a GitHub App installation to the account.
- `ListConnectedGithubAccounts`: connected GitHub accounts.
- `ListGithubRepositories`: repositories accessible through an installation.
- `ListGithubRepositoryBranches`: branches of a repository.
- `GetGithubRepositoryContent`: file tree structure of a repository.

### Apps (grouping)
- `CreateApp`: create an app to organize projects and services.
- `ListApps`: all apps of the user.
- `UpdateApp`: update name, description and color.
- `DeleteApp`: delete an app; associated projects and services get `app_id` set to null.
- `AddProjectsToApp`: associate projects with an app.
- `AddServicesToApp`: associate services with an app.
- `ListProjectsByApp`: projects in an app.
- `ListServicesByApp`: services in an app.
- `RemoveProjectsFromApp`: remove projects from an app (sets `app_id` to null).
- `RemoveServicesFromApp`: remove services from an app (sets `app_id` to null).

## Related
- Up: [[Docs - API and MCP]]
- [[Docs - Integrations]]: how to connect an MCP client
- [[Docs - Services]]: services that Apps can group
- [[Docs - CLI]]: CLI commands for the same operations
