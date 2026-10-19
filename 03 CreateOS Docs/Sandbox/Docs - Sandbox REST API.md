---
aliases:
  - Sandbox REST API
tags:
  - createos/docs
  - createos/docs/sandbox
  - type/hub
source: https://createos.sh/docs/Sandbox/REST-API/
sources:
  - https://createos.sh/docs/Sandbox/REST-API/
  - https://createos.sh/docs/Sandbox/REST-API/Overview
scraped: 2026-10-17
up: "[[Docs - Sandbox]]"
---

# Docs - Sandbox REST API

> [!summary] Summary
> - Every sandbox operation is a plain HTTPS call to `https://api.sb.createos.sh` (all paths under `/v1`), so any language can drive sandboxes without an SDK.
> - Auth: `X-Api-Key: <token>` header (get a token at https://createos.sh/app/profile). Responses use a JSend envelope `{"status": "...", "data": ...}`.
> - The index, Overview and 17 resource pages are covered here and in 5 group notes; each group note has one H2 per page with an endpoint table.
> - Source: https://createos.sh/docs/Sandbox/REST-API/

## REST API (section index)
- **URL:** https://createos.sh/docs/Sandbox/REST-API/
- **Summary:** Landing page for the REST reference, grouped by resource. Plan caps and defaults live on [[Docs - Sandbox Limits]].
- **Key points:**
  - Base URL `https://api.sb.createos.sh`, header `X-Api-Key`, JSend envelope.
  - Resource pages: Sandboxes (create/list/destroy), Execution and Files, Egress (outbound allowlist), Pause/Resume/Fork (snapshots), Networks (private sandbox-to-sandbox).

## REST API Overview
- **URL:** https://createos.sh/docs/Sandbox/REST-API/Overview
- **Summary:** The REST API at a glance: base URL, authentication headers, JSend envelope, pagination, ID formats, content types, NDJSON streaming and status codes.
- **Key points:**
  - **Base URL:** `https://api.sb.createos.sh`; all paths versioned under `/v1`.
  - **Auth:** `X-Api-Key: <token>` header. Example check: `curl https://api.sb.createos.sh/v1/whoami -H "X-Api-Key: $CREATEOS_API_KEY"`.
  - **Response envelope (JSend):** success `{"status": "success", "data": {...}}` (2xx); fail `{"status": "fail", "data": {...}}` (4xx validation or not-found); error `{"status": "error", "message": "...", "code": 500}` (5xx).

### Authentication headers
| Header | Description |
|---|---|
| `X-Api-Key` | Per-user API key, or a sandbox access token limited to one sandbox. `GET /v1/sandboxes` requires a user credential. |
| `X-Auth-Token` | Opaque session token validated against the users service. |
| `X-Access-Token` | OAuth-style access token. |

- Delegated per-sandbox token: created with the owner's API key, also sent as `X-Api-Key`; it cannot manage itself or other account resources (see [[Docs - Sandbox REST API - Lifecycle and Execution]]).

### Pagination
- All list endpoints accept `limit` and `offset` query parameters.
- Paginated responses nest items under `data.data[]` plus a `pagination` block with `total`, `limit`, `offset`, `count`.
- Default `limit` is 50; maximum is 500.

### ID formats
| Resource | Format | Example |
|---|---|---|
| Sandbox | `sb-<ulid>` | `sb-01K…` |
| Network | `net-<ulid>` | `net-01k2x…` |
| Disk | `disk_<ulid>` | `disk_01KSHT…` |
| Template | `tpl_<ulid>` | `tpl_01K…` |

- Networks and disks can also be referenced by their user-facing name where the spec notes it.

### Content types
| Direction | Content-Type |
|---|---|
| JSON request bodies | `application/json` |
| File upload / download body | `application/octet-stream` |
| Streaming exec response | `application/x-ndjson` |
| Managed process output stream | `application/x-ndjson` |

### Streaming (NDJSON)
- Exec streaming: `?stream=true`; HTTP/1.1 chunked, one JSON object per line. Managed process `/connect` and template logs also stream NDJSON.
- `ExecStreamEvent` frames: `{"stdout": "…"}`, `{"stderr": "…"}`, `{"hb": true}` (heartbeat every 5 s; ignore), `{"exit_code": N}` (terminal, last frame), `{"error": "…"}` (agent error).

### Standard HTTP status codes
| Code | Meaning |
|---|---|
| 200 | Success |
| 202 | Accepted, async operation in progress (poll via GET) |
| 400 | Bad request / validation error |
| 401 | Missing or invalid auth |
| 402 | Payment required / quota exceeded |
| 404 | Resource not found |
| 409 | Conflict (e.g. sandbox not in correct state) |
| 429 | Rate limited |
| 503 | Service unavailable / no host capacity |

- Async operations (pause, resume, fork) return 202 with an `X-Poll-After` header (suggested seconds before next poll). Poll `GET /v1/sandboxes/{id}` until `status` reaches the expected terminal value.

## Group notes (17 resource pages)
| Group note | Pages covered | Page URLs |
|---|---|---|
| [[Docs - Sandbox REST API - Lifecycle and Execution]] | Sandboxes, Execution and Files, Sandbox access tokens, Managed Processes, Pause/Resume/Fork, Self-Signal | `/Sandbox/REST-API/Sandboxes`, `/Execution-And-Files`, `/Access-Tokens`, `/Managed-Processes`, `/Pause-Resume-Fork`, `/Self-Signal` |
| [[Docs - Sandbox REST API - Networking and Egress]] | Networks, Egress | `/Sandbox/REST-API/Networks`, `/Egress` |
| [[Docs - Sandbox REST API - Storage and Templates]] | Disks, Templates, Bandwidth and Resize | `/Sandbox/REST-API/Disks`, `/Templates`, `/Bandwidth-And-Resize` |
| [[Docs - Sandbox REST API - Computer Use and Devices]] | Computer, Devices and VPN, Shell and Tunnels | `/Sandbox/REST-API/Computer`, `/Devices`, `/Connections` |
| [[Docs - Sandbox REST API - Observability and Webhooks]] | Catalog and Identity, Metrics, Webhooks | `/Sandbox/REST-API/Catalog-And-Identity`, `/Metrics`, `/Webhooks` |

## Quick endpoint map
| Area | Representative endpoints |
|---|---|
| Sandboxes | `POST /v1/sandboxes`, `GET /v1/sandboxes`, `GET /v1/sandboxes/{id}`, `PATCH /v1/sandboxes/{id}`, `DELETE /v1/sandboxes/{id}` |
| Exec and files | `POST /v1/sandboxes/{id}/exec`, `PUT /v1/sandboxes/{id}/files`, `GET /v1/sandboxes/{id}/files` |
| Processes | `POST /v1/sandboxes/{id}/processes` (+ list, get, connect, input, signal, wait, delete) |
| Snapshots | `POST /v1/sandboxes/{id}/pause`, `/resume`, `/fork` |
| Egress | `GET/PUT /v1/sandboxes/{id}/egress` |
| Networks | `/v1/networks`, `/v1/sandboxes/{id}/networks` |
| Disks, templates | `/v1/disks`, `/v1/templates` |
| Catalog | `GET /v1/shapes`, `GET /v1/rootfs`, `GET /v1/whoami` |
| Webhooks | `/v1/webhook-endpoints` |

## Related
- Up: [[Docs - Sandbox]]
- [[Docs - Sandbox SDK]]: typed clients (TypeScript, Go, Python, Rust, C#, Java) over the same API
- [[Docs - Sandbox CLI]]: terminal client for the same operations
- [[Docs - Sandbox Limits]]: shapes, images and per-plan caps referenced by the endpoints
- [[Docs - Sandbox Quickstart]]: REST equivalent of the first-sandbox walkthrough
- [[Egress Governance]] and [[Sandbox Networking]]: product explanations of egress and private networks
- [[Hackathon Setup Guide]] and [[Hackathon Ideas]]: event context
- [[CreateOS Docs]]: docs root hub
