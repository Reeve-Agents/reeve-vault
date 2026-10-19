---
aliases:
  - CreateOS Services docs
  - Deploy Services
tags:
  - createos/docs
  - createos/docs/services
  - type/hub
source: https://createos.sh/docs/Services/
sources:
  - https://createos.sh/docs/Services/
  - https://createos.sh/docs/Services/Supabase
  - https://createos.sh/docs/Services/Database-CreateOS
  - https://createos.sh/docs/Services/Cache
  - https://createos.sh/docs/Services/Message-Queue
  - https://createos.sh/docs/Services/Stripe-Projects
scraped: 2026-10-17
up: "[[CreateOS Docs]]"
---

# Docs - Services

> [!summary] Summary
> - Managed services you attach to a CreateOS project in one click, with credentials injected into the environment.
> - Five pages: Supabase, Database (PostgreSQL, MySQL), Cache (Valkey), Message Queue (Kafka), Stripe Projects.
> - Managed Database / Cache / Message Queue default region: **NL - Amsterdam, the Netherlands, Zone ams3**; they consume resource credits.
> - Stripe Projects page: [[CreateOS on Stripe Projects]].
> - Source: https://createos.sh/docs/Services/

## Services (index)
- **URL:** https://createos.sh/docs/Services/
- **Summary:** Index of managed services attachable to a project in one click, with credentials injected into the environment.
- **Key points:**
  - [Supabase](https://createos.sh/docs/Services/Supabase): Postgres, Auth, Storage, Realtime.
  - [Database (Managed by CreateOS)](https://createos.sh/docs/Services/Database-CreateOS): CreateOS-managed PostgreSQL and MySQL.
  - [Cache](https://createos.sh/docs/Services/Cache): Valkey.
  - [Message Queue](https://createos.sh/docs/Services/Message-Queue): Apache Kafka.
  - [Stripe Projects](https://createos.sh/docs/Services/Stripe-Projects): Stripe-connected projects for paid apps.

## Supabase Integration
- **URL:** https://createos.sh/docs/Services/Supabase
- **Summary:** First-class database integration in **Deploy Services**: managed Postgres, auth, file storage, and realtime, provisioned or connected in one step with credentials injected automatically.
- **Key points:**
  - Location: **Deploy Services** → **Database** tab → **Supabase** under Integrations.
  - Prerequisites: an active CreateOS account; a project in CreateOS; optionally an existing Supabase project.
  - Setup: open the project → **Deploy Services** → **Database** tab → **Supabase** → choose:
    - **Create new project**: CreateOS provisions a Supabase project and injects credentials.
    - **Connect existing project**: paste your Supabase project URL and service role key; schema and data stay untouched.
  - Included services: **Postgres** (full SQL, joins, ACID), **Auth** (email/password, OAuth providers, magic links), **Storage** (files, images, videos, documents), **Realtime** (live database subscriptions without polling).
  - Credentials are injected at the environment level and scoped per environment. Connect a separate Supabase project for staging and production.
  - Environment variables injected:

    ```
    POSTGRES_DB
    POSTGRES_HOST
    POSTGRES_PORT
    POSTGRES_USER
    POSTGRES_PASSWORD
    ```

  - Use cases listed: SaaS MVP; realtime collaboration; user-generated content; AI apps with persistent memory (Postgres with `pgvector`); internal tools.
  - Troubleshooting:
    - Credentials not injecting: redeploy after connecting Supabase.
    - Existing project: CreateOS only reads credentials; on failure, check the service role key wasn't rotated or revoked.
    - ⚠️ Rotating the Supabase service role key after connecting breaks the deployment environment; update the connection in Deploy Services right after any rotation.
    - Realtime not updating: RLS policies on the target table must allow reads for the connected user.
  - Tutorial video: https://ik.imagekit.io/nodeops/No%20Sound/Supabase%20Integration.mov/ik-video.mp4
  - Next steps: https://createos.sh/app/supabase · Deploy Services overview (`/Build-Deploy/Deploy`, see [[Docs - Build and Deploy]]) · https://supabase.com/docs

## Database (Managed by CreateOS)
- **URL:** https://createos.sh/docs/Services/Database-CreateOS
- **Summary:** Production-ready PostgreSQL or MySQL databases with monitoring and scaling, billed in resource credits.
- **Key points:**
  - Default region: NL - Amsterdam, the Netherlands, Zone ams3. Additional regions may be available.
  - Options: **PostgreSQL**, **MySQL**.
  - Disk size: **10 GB - 30 GB** (adjustable range).
  - Compute example: `do-pg-16-1vcpu-1gb` = 1 vCPU, 1 GB RAM, 1 Node.
  - Configuration: unique name, disk size, region, compute configuration, firewall settings.

## Cache
- **URL:** https://createos.sh/docs/Services/Cache
- **Summary:** Valkey cache (open-source Redis alternative) for caching, session management, and real-time analytics.
- **Key points:**
  - Default region: NL - Amsterdam, the Netherlands, Zone ams3.
  - Technology: **Valkey**.
  - Disk size: **10 GB**.
  - Compute example: `do-valkey-8-1vcpu-1gb` = 1 vCPU, 1 GB RAM, 1 Node.
  - Additional setting: **App Folder** (optional application-specific configuration directory).

## Message Queue
- **URL:** https://createos.sh/docs/Services/Message-Queue
- **Summary:** Apache Kafka clusters for distributed, high-throughput, fault-tolerant messaging.
- **Key points:**
  - Default region: NL - Amsterdam, the Netherlands, Zone ams3.
  - Technology: **Kafka** ("capable of handling trillions of events per day").
  - Disk size: **40 GB - 80 GB** (adjustable range).
  - Compute example: `do-kafka-3-2vcpu-2gb` = 2 vCPU, 2 GB RAM, **3 Nodes** (cluster for high availability).

## Stripe Projects
- **URL:** https://createos.sh/docs/Services/Stripe-Projects
- **Summary:** Add CreateOS to a Stripe project with one command; Stripe handles billing and account creation, and credentials land in `.env` for the CreateOS CLI.
- **Key points:**
  - `stripe projects add createos/project`
  - Plans: Free $0 · Beginner $10/month · Pro $75/month · Enterprise $200/month (`stripe projects add createos/pro-monthly`).
  - Change plan: `stripe projects update createos-plan --service enterprise-monthly` (upgrade), `stripe projects update createos-plan --service beginner-monthly` (downgrade), `stripe projects update createos-plan --service free` (free). Upgrades are prorated.
  - Cancel: `stripe projects remove createos-plan --yes`.
  - Full detail: [[CreateOS on Stripe Projects]].

## Shared to Database, Cache and Message Queue

These three pages repeat the same blocks:

- **Resource credits:** all deployments consume credits from your account balance.
  - Current credits are shown top right (example `377 / 10,000`).
  - Credits are consumed based on compute resources, disk size, and running time.
- **Deployment process:**
  1. Select service type: Database, Cache, or Message Queue.
  2. Choose technology: PostgreSQL, MySQL, Valkey, Kafka.
  3. Configure the instance: unique name, disk size within the allowed range, region, compute configuration, firewall settings.
  4. Deploy: click the deployment button.
- Pick the region closest to your users or app servers to minimize latency.

| Service | Technology | Disk | Compute example | Nodes |
| --- | --- | --- | --- | --- |
| Database | PostgreSQL, MySQL | 10 GB - 30 GB | `do-pg-16-1vcpu-1gb` (1 vCPU, 1 GB RAM) | 1 |
| Cache | Valkey | 10 GB | `do-valkey-8-1vcpu-1gb` (1 vCPU, 1 GB RAM) | 1 |
| Message Queue | Kafka | 40 GB - 80 GB | `do-kafka-3-2vcpu-2gb` (2 vCPU, 2 GB RAM) | 3 |

## Related
- Up: [[CreateOS Docs]]
- [[CreateOS on Stripe Projects]]: CreateOS as a Stripe Projects provider
- [[Docs - MPP]]: Machine Payments Protocol docs
- [[Docs - Build and Deploy]]: Deploy Services and deployment docs
- [[Docs - Account and Billing]]: credits and billing
- [[Stripe Projects]]: Stripe Projects hub
