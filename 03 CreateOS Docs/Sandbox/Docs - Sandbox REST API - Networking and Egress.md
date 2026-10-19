---
aliases:
  - Sandbox REST Networking and Egress
tags:
  - createos/docs
  - createos/docs/sandbox
  - type/page
source: https://createos.sh/docs/Sandbox/REST-API/Networks
sources:
  - https://createos.sh/docs/Sandbox/REST-API/Networks
  - https://createos.sh/docs/Sandbox/REST-API/Egress
scraped: 2026-10-17
up: "[[Docs - Sandbox REST API]]"
---

# Docs - Sandbox REST API - Networking and Egress

> [!summary] Summary
> - Egress: an empty rule list means open egress; any rule means deny-by-default, enforced in-kernel on the host outside the VM. Rules apply live, no restart.
> - Networks: private overlay networks; members reach each other by sandbox `name`; networks are isolated from each other and from the public internet.
> - Base URL `https://api.sb.createos.sh`, header `X-Api-Key`, JSend envelope.
> - Source: https://createos.sh/docs/Sandbox/REST-API/Egress and https://createos.sh/docs/Sandbox/REST-API/Networks

## Networks
- **URL:** https://createos.sh/docs/Sandbox/REST-API/Networks
- **Summary:** Create private overlay networks and join sandboxes to them for sandbox-to-sandbox traffic with DNS names.
- **Key points:**
  - Every sandbox in the same network is reachable at its `name` (for example `curl http://brave-otter:8080`).
  - Networks are fully isolated from each other and from the public internet; cross-network traffic is blocked at the host layer; sandboxes with no network cannot be reached.
  - Join at create time with `networks: [{"id": "backend"}]` in the `POST /v1/sandboxes` body, or later via `POST /v1/sandboxes/{id}/networks`.
  - Network `id` accepts the network name (e.g. `backend`) or `net-<ulid>`. Network `name` is scoped per user.
  - Delete requires no members (`409` if still attached; detach first). Duplicate name returns `400`.
  - Per-plan network caps are on [[Docs - Sandbox Limits]]. Product explanation: [[Sandbox Networking]].

| Method | Path | Purpose |
|---|---|---|
| GET | `/v1/networks` | List networks (`limit` default 50 max 500, `offset`) |
| POST | `/v1/networks` | Create a network; body `{"name": "backend"}` |
| GET | `/v1/networks/{id}` | Network details with `members` (`sandbox_id`, `name`, `status`, `ip`) |
| DELETE | `/v1/networks/{id}` | Delete (no members allowed); returns `{"ok": true}` |
| POST | `/v1/sandboxes/{id}/networks` | Attach a running sandbox; body `{"id": "<name or net-ulid>"}` |
| DELETE | `/v1/sandboxes/{id}/networks/{net}` | Detach a sandbox |

- Network object: `id`, `name`, `created_at`, `member_count`.
- Notable errors: `401` unauthorized, `404` network or sandbox/membership not found, `409` network has active members.

## Egress
- **URL:** https://createos.sh/docs/Sandbox/REST-API/Egress
- **Summary:** Egress rules control which external hosts a sandbox can reach. Sandboxes are open by default; for untrusted or AI-generated code, set an allowlist before running any input.
- **Key points:**
  - Empty list / `null` / `["*"]` = open egress (all outbound allowed). Any non-empty list = deny-by-default: only listed destinations pass; the rest is dropped in-kernel on the host, outside the VM, so code inside cannot rewrite or route around the policy.
  - Inbound is closed regardless (see `ingress_enabled`).
  - Pass `egress` at create time so the allowlist is in force before the first command; the same rules can be changed live.
  - Rules cover any port and protocol to the listed host, IP or CIDR; both IPv4 addresses and hostnames (with `*.` wildcards) are accepted.
  - Example: a deny-by-default Python job needs exactly two rules: `["pypi.org:443", "*.pythonhosted.org:443"]`.
  - There is no denylist token; to block one destination you must list all destinations you want.
  - Allow time for hostname policy updates to propagate before running a workload that depends on new rules.
  - Private network traffic is separate and not governed by egress rules. Product explanation: [[Egress Governance]].

### Rule formats
| Format | Example | Effect |
|---|---|---|
| `host` | `pypi.org` | Allow HTTP and HTTPS to that hostname on TCP ports 80 and 443 |
| `host:port` | `github.com:443` | Restrict a hostname rule to TCP 80 or 443; use an IP/CIDR rule for other ports |
| `*.host` | `*.pythonhosted.org` | Wildcard subdomain match |
| `ip` | `1.1.1.1` | Allow all ports to that IP |
| `ip:port` | `1.1.1.1:53` | Allow only that port |
| `cidr` | `10.0.0.0/8` | Allow all ports to that CIDR block |
| `cidr:port` | `10.0.0.0/8:8080` | Allow only that port in the block |
| `*` | `*` | Allow all destinations (same as empty list) |

| Method | Path | Purpose |
|---|---|---|
| GET | `/v1/sandboxes/{id}/egress` | Read the current allowlist; returns `{"id": "sb-...", "egress": [...]}` |
| PUT | `/v1/sandboxes/{id}/egress` | Replace the allowlist live; body `{"egress": [...]}` (null, missing, `[]` or `["*"]` = allow-all) |

- Create-time form: `POST /v1/sandboxes` with `{"shape": "s-1vcpu-256mb", "egress": ["pypi.org", "github.com:443"]}`.
- Restore allow-all: `PUT` with `{"egress": []}`.
- Notable errors: `404` sandbox not found or not owned by caller.

## Related
- Up: [[Docs - Sandbox REST API]]
- [[Docs - Sandbox REST API - Computer Use and Devices]]: device registration and VPN sessions that attach to these networks
- [[Docs - Sandbox REST API - Lifecycle and Execution]]: create body fields `egress` and `networks`
- [[Egress Governance]]: threat model and product explanation of egress
- [[Sandbox Networking]]: private cluster networking explained
- [[Docs - Sandbox Limits]]: ingress and egress defaults and per-plan network caps
- [[Docs - Sandbox SDK - How-To Guides]]: SDK network and egress recipes
