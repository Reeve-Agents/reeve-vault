---
aliases:
  - Sandbox REST Observability and Webhooks
tags:
  - createos/docs
  - createos/docs/sandbox
  - type/page
source: https://createos.sh/docs/Sandbox/REST-API/Metrics
sources:
  - https://createos.sh/docs/Sandbox/REST-API/Catalog-And-Identity
  - https://createos.sh/docs/Sandbox/REST-API/Metrics
  - https://createos.sh/docs/Sandbox/REST-API/Webhooks
scraped: 2026-10-17
up: "[[Docs - Sandbox REST API]]"
---

# Docs - Sandbox REST API - Observability and Webhooks

> [!summary] Summary
> - Catalog and identity: `GET /v1/shapes`, `GET /v1/rootfs` (no auth), `GET /v1/whoami`, health probes `/healthz` and `/readyz`.
> - Metrics: live per-sandbox CPU/memory, a rolling one-hour 10-second timeseries, and account-wide aggregates (30-day max window).
> - Webhooks: HTTPS endpoints receive HMAC-SHA256 signed `POST`s for sandbox, disk, network and template events; up to 5 retries; auto-suspended after 50 failures.
> - Base URL `https://api.sb.createos.sh`, header `X-Api-Key`, JSend envelope.

## Catalog and Identity
- **URL:** https://createos.sh/docs/Sandbox/REST-API/Catalog-And-Identity
- **Summary:** Static catalog (shapes, rootfs images, hosts) plus identity and health utilities for validating credentials and listing options.
- **Key points:**
  - `GET /v1/shapes` and `GET /v1/rootfs` need no auth. Use the shape `id` (e.g. `s-1vcpu-256mb`) as `shape`; shape fields: `id`, `vcpu`, `mem_mib`, `default_disk_mib`.
  - `GET /v1/rootfs` returns `{"rootfs": ["devbox:1", "ubuntu:26.04", "debian:13", "alpine:3.20"], "default": "devbox:1"}` (example response); optional rich `entries`. First-party base images are kept warm and start immediately with no image pull; custom templates are slower the first run on a host.
  - `GET /v1/hosts` is operator-only; a customer API key does not grant access. Host fields: `id`, `status` (`active`, `draining`, `dead`), `free_mib`, `vm_count`, `rootfses`.
  - `GET /v1/whoami` returns `user_id` and `stats` (`running`, `paused`, `other`, `total`). `running`, `paused` and `other` count toward the per-user concurrent cap; `total` includes destroyed and failed.
  - `GET /readyz` returns `{"ready": true}` when the control plane can reach its database; `503` otherwise.

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/v1/shapes` | No | List VM shapes |
| GET | `/v1/rootfs` | No | List rootfs images and the recommended default |
| GET | `/v1/hosts` | Operator | Host enumeration (`limit`, `offset`) |
| GET | `/v1/whoami` | Yes | Identity plus sandbox counts |
| GET | `/healthz` | No | Liveness probe; `{"up": true}` |
| GET | `/readyz` | No | Readiness probe; `{"ready": true}` |

## Metrics
- **URL:** https://createos.sh/docs/Sandbox/REST-API/Metrics
- **Summary:** Live resource usage for a single sandbox plus account-wide usage aggregates for dashboards and billing visibility. Figures are observational with no atomicity guarantee.
- **Key points:**
  - `GET /v1/sandboxes/{id}/metrics` is owner-gated, reads the host's cgroup files on demand. Fields: `sandbox_id`, `memory_bytes`, `memory_limit_bytes` (`0` = unlimited), `memory_pct`, `cpu_cores_used` (averaged over the last scraper window, about 15-30 s), `cpu_cores_allocated`, `cpu_pct`, `as_of` (RFC 3339).
  - `GET /v1/sandboxes/{id}/metrics/timeseries` returns a rolling one-hour window at 10-second sampling: `sandbox_id`, `step_seconds` (10), `window_seconds` (3600), `points[]` with `ts`, `cpu_cores_used`, `cpu_per_core`, `memory_bytes`, `memory_used_guest_bytes`, `memory_limit_bytes`, `net_bytes_in_per_sec`, `net_bytes_out_per_sec`, `storage_bytes`, `storage_limit_bytes`. New sandbox may have no samples; not a durable billing record; history availability depends on the host.
  - `GET /v1/metrics` query: `from` (default now minus 24h), `to` (default now), RFC 3339; span capped at 30 days; inverted window returns `400`. Response: `current` (status to count map) and `window` (`from`, `to`, `spawned`, `destroyed`, `lifetime_seconds` {`min`, `p50`, `p95`, `average`}, `compute` {`vcpu_seconds`, `mem_mib_seconds`, `disk_mib_seconds`}, `bandwidth_bytes` {`egress`, `ingress`}, `by_shape[]` {`shape`, `count`, `vcpu_seconds`}).
  - `GET /v1/metrics/timeseries` query: `bucket` (`hour` default or `day`; other value `400`), `from` (default now minus 7d), `to`; 30-day cap. Response `buckets[]` with `ts`, `spawned`, `destroyed`, `running`.
  - Notable errors: `404` for sandboxes you do not own; `400` invalid window or bucket; `401` invalid API key.

| Method | Path | Purpose |
|---|---|---|
| GET | `/v1/sandboxes/{id}/metrics` | Live CPU and memory snapshot for one sandbox |
| GET | `/v1/sandboxes/{id}/metrics/timeseries` | Recent samples (1 h window, 10 s step) |
| GET | `/v1/metrics` | Account-wide snapshot plus window aggregates |
| GET | `/v1/metrics/timeseries` | Account-wide bucketed counts for charts |

## Webhooks
- **URL:** https://createos.sh/docs/Sandbox/REST-API/Webhooks
- **Summary:** Register HTTPS endpoints that receive a signed `POST` whenever something happens to your sandboxes, disks, networks or templates, instead of polling `GET /v1/sandboxes/{id}`.
- **Key points:**
  - Endpoints are scoped to the authenticated user and subscribe to a set of event actions (omit or pass `[]` for every action). Fetch the action list at runtime from `GET /v1/webhook-endpoints/actions` since new actions are added over time.
  - Event actions: Sandbox `sandbox.create`, `sandbox.destroy`, `sandbox.pause`, `sandbox.resume`, `sandbox.fork`, `sandbox.patch`, `sandbox.resize`, `sandbox.egress.set`, `sandbox.ssh_pubkey.update`, `sandbox.bandwidth.update`; Disk `disk.create`, `disk.delete`, `disk.attach`, `disk.detach`; Network `network.create`, `network.delete`, `network.attach`, `network.detach`; Template `template.submit`, `template.delete`, `template.build.start`, `template.build.complete`.
  - Create body: `url` (required, `http(s)://...`), `events` (string[], optional). Response includes `id`, `url`, `secret` (`whsec_...`, shown only once; if lost, delete and recreate), `events`, `active`.
  - List/get never return `secret`. List item fields: `id`, `url`, `events`, `active`, `failureCount`, `createdAt`. Get returns `endpoint` plus recent `deliveries` (`id`, `eventAction`, `status` of `pending`/`delivered`/`failed`, `attempts`, `deliveredAt`).
  - Delivery: `POST` to your URL with `Content-Type: application/json`, `User-Agent: CreateOS-Webhook/1.0`, `X-Webhook-Timestamp`, `X-Webhook-Signature: sha256=...`. Body: `{"event": "sandbox.create", "occurredAt": "...", "data": {...}}`; `data` shape varies by action (treat unknown fields as additive). Respond with any `2xx`; non-2xx or timeout is retried.
  - Signature: HMAC-SHA256 over `<X-Webhook-Timestamp>.<raw-body>` with the endpoint `secret`, prefixed `sha256=`, compared in constant time against the **raw** request body. Reject stale timestamps to defend against replay. Docs give Python, JavaScript and Go verifiers.
  - Retry policy: up to 5 retries with delays 5 s, 30 s, 2 min, 10 min, 1 hour. After 5 failed attempts the delivery is marked permanently failed and `failureCount` increments; at **50 cumulative failures** the endpoint is auto-suspended (`active: false`); resume after fixing the receiver. Make handlers idempotent.
  - Retention: delivered and failed deliveries removed after 30 minutes; all deliveries after 72 hours; deleting an endpoint removes its deliveries immediately.
  - Plan limits (max endpoints): Free 2, Beginner 4, Pro 6, Enterprise unlimited.

| Method | Path | Purpose |
|---|---|---|
| GET | `/v1/webhook-endpoints/actions` | List event action strings available for filtering |
| POST | `/v1/webhook-endpoints` | Create an endpoint (returns `secret` once) |
| GET | `/v1/webhook-endpoints` | List endpoints |
| GET | `/v1/webhook-endpoints/{id}` | Get an endpoint with recent deliveries |
| POST | `/v1/webhook-endpoints/{id}/suspend` | Stop deliveries without deleting |
| POST | `/v1/webhook-endpoints/{id}/resume` | Reactivate and reset failure count |
| DELETE | `/v1/webhook-endpoints/{id}` | Delete endpoint and pending deliveries |

## Related
- Up: [[Docs - Sandbox REST API]]
- [[Docs - Sandbox REST API - Lifecycle and Execution]]: lifecycle statuses and polling pattern that webhooks replace
- [[Docs - Sandbox REST API - Storage and Templates]]: bandwidth quota and template build status
- [[Docs - Sandbox SDK - How-To Guides]]: SDK request hooks and logging (Observability how-to)
- [[Docs - Sandbox Limits]]: plan-based caps
- [[Docs - Sandbox Quickstart]]: where `whoami` is used to check credentials
