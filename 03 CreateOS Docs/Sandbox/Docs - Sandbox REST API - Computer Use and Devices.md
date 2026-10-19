---
aliases:
  - Sandbox REST Computer Use and Devices
tags:
  - createos/docs
  - createos/docs/sandbox
  - type/page
source: https://createos.sh/docs/Sandbox/REST-API/Computer
sources:
  - https://createos.sh/docs/Sandbox/REST-API/Computer
  - https://createos.sh/docs/Sandbox/REST-API/Devices
  - https://createos.sh/docs/Sandbox/REST-API/Connections
scraped: 2026-10-17
up: "[[Docs - Sandbox REST API]]"
---

# Docs - Sandbox REST API - Computer Use and Devices

> [!summary] Summary
> - Computer API: screenshots (PNG), mouse, keyboard, clipboard, windows and extra screens (`screen-0` to `screen-7`) inside a sandbox with a desktop-capable rootfs such as `desktop:1`.
> - Devices and VPN: register a WireGuard public key as a device, attach it to private networks, and create VPN sessions.
> - Shell and tunnels: interactive PTY shell, TCP tunnel, WebSocket shell and SSH key append; no SSH key or public ingress needed for API connections.
> - Base URL `https://api.sb.createos.sh`, header `X-Api-Key`, JSend envelope (except PNG screenshots and upgraded connections).

## Computer
- **URL:** https://createos.sh/docs/Sandbox/REST-API/Computer
- **Summary:** Capture screens and control desktop applications inside a running sandbox you own. Use a desktop-capable rootfs from `GET /v1/rootfs`, such as `desktop:1`; minimal images have no desktop.
- **Key points:**
  - All paths start with `/v1/sandboxes/{id}/computer`. Omit `screen_id` for the primary screen; target extra screens with e.g. `screen_id=screen-1`.
  - Screen IDs range `screen-0` to `screen-7`; a screen record has `screen_id`, `display`, `width`, `height`, `vnc_port`, `novnc_port`. Creating a ninth screen or deleting the primary screen returns `409`.
  - `POST /screens` defaults to 1280 x 800 and returns HTTP 201.
  - `/screens/{screen}/connect` needs public ingress enabled (enable via Sandbox PATCH `ingress_enabled`). Returns `screen_id`, `port`, `path`, `token`, `expires_at`, and `url` when available. Treat tokens and token-bearing URLs as credentials; a new token invalidates the previous one for new connections (existing sessions stay connected).
  - Errors: `400` invalid input; `404`; `409` desktop unavailable / ingress disabled / screen conflict; `429` screenshot capacity busy; `501` desktop tools unavailable; `502` upstream unavailable.
  - Example: `curl --fail "https://api.sb.createos.sh/v1/sandboxes/$SANDBOX_ID/computer/screenshot" -H "X-Api-Key: $CREATEOS_API_KEY" -o screenshot.png`.
  - TypeScript equivalent: `sandbox.computer` (see [[Docs - Sandbox SDK - API Reference]]).

### Capture and desktop state (prefix `/v1/sandboxes/{id}/computer`)
| Method | Path | Request / result |
|---|---|---|
| GET | `/screenshot` | PNG; optional query `screen_id`, `window_id`, or rectangle (`x`, `y`, `width`, `height`) |
| GET | `/screen` | `{ width, height }` |
| GET | `/cursor` | `{ x, y }` |
| GET | `/clipboard` | `{ text }` |
| PUT | `/clipboard` | Body `{ "text": "hello" }` |
| POST | `/open` | Body `{ "target": "https://example.com" }` |
| POST | `/launch` | Body `{ "application": "...", "uri": "..." }` (`uri` optional; app must be installed) |

### Mouse and keyboard (all POST; optional `screen_id` query)
| Path | JSON body |
|---|---|
| `/mouse/move` | `{ "x": 100, "y": 200 }` |
| `/mouse/click` | Optional `button` (`left`, `middle`, `right`), `count`, coordinates (`x` and `y` together or neither) |
| `/mouse/scroll` | Optional `direction` (`up`, `down`) and `amount` |
| `/mouse/drag` | `{ "from": { "x": 100, "y": 200 }, "to": { "x": 300, "y": 400 } }` |
| `/mouse/down`, `/mouse/up` | Optional `{ "button": "left" }` |
| `/keyboard/type` | `{ "text": "hello", "delay_in_ms": 10 }` (delay optional) |
| `/keyboard/press` | `{ "keys": ["ctrl", "a"] }` |
| `/keyboard/down`, `/keyboard/up` | `{ "keys": ["shift"] }` |

### Windows (optional `screen_id` query; URL-encode the window ID)
| Method | Path | Request / result |
|---|---|---|
| GET | `/windows` | Array of `id` and optional `title`; optional `application` filter |
| GET | `/windows/current` | Current window |
| GET | `/windows/{window}` | One window |
| GET | `/windows/{window}/geometry` | `id`, `x`, `y`, `width`, `height`, `screen` |
| POST | `/windows/{window}/focus` | Focus |
| POST | `/windows/{window}/move` | `{ "x": 100, "y": 200 }` |
| POST | `/windows/{window}/resize` | `{ "width": 800, "height": 600 }` |
| POST | `/windows/{window}/maximize` | Maximize |
| POST | `/windows/{window}/minimize` | Minimize |
| POST | `/windows/{window}/restore` | Restore |
| DELETE | `/windows/{window}` | Close |

### Screens and browser connections
| Method | Path | Request / result |
|---|---|---|
| GET | `/screens` | Array of screen records |
| POST | `/screens` | Optional `width`, `height`; defaults 1280 x 800; HTTP 201 |
| GET | `/screens/{screen}` | One screen record |
| POST | `/screens/{screen}/resize` | `{ "width": 1280, "height": 800 }` |
| DELETE | `/screens/{screen}` | Delete an additional screen (primary cannot be deleted) |
| GET | `/screens/{screen}/connect` | Fresh browser connection details (needs ingress) |

## Devices and VPN
- **URL:** https://createos.sh/docs/Sandbox/REST-API/Devices
- **Summary:** Register a device to connect your computer to a sandbox's private network over WireGuard. Keep the WireGuard private key on your device; register only its public key.
- **Key points:**
  - All endpoints require `X-Api-Key` and are scoped to your account.
  - Registration fields: `name` (required, unique in account), `pubkey` (required, base64-encoded 32-byte WireGuard public key), `hostname`, `os` (optional). Invalid keys return `400`; duplicate names or public keys return `409`; account device limits apply.
  - Create the network through the Networks API (see [[Docs - Sandbox REST API - Networking and Egress]]) and attach sandboxes; attach the device to at least one network before starting a VPN session (creating a session with no attached network returns `400`).
  - Session creation returns `session_id`, `device_id`, `relay_host_id`, `client_config`, `expires_at`; use the WireGuard config with your local private key. List/renew return metadata without repeating `client_config`.
  - Renew before `expires_at`; a missing or expired session returns `404` on renewal, create a new one. Connectivity also depends on regional VPN capacity and your device's WireGuard setup.

| Method | Path | Purpose |
|---|---|---|
| POST | `/v1/devices` | Register a device |
| GET | `/v1/devices` | List your devices |
| GET | `/v1/devices/{id}` | Read a device |
| DELETE | `/v1/devices/{id}` | Delete a device |
| POST | `/v1/devices/{id}/networks` | Attach a network; body `{ "network_id": "<network-id>" }` |
| GET | `/v1/devices/{id}/networks` | List attached networks |
| DELETE | `/v1/devices/{id}/networks/{network_id}` | Detach a network |
| POST | `/v1/devices/{id}/sessions` | Create a session, or renew/reuse an active one (no body) |
| GET | `/v1/devices/{id}/sessions` | List active sessions |
| PUT | `/v1/devices/{id}/sessions/{session_id}` | Renew an active session (no body) |
| DELETE | `/v1/devices/{id}/sessions/{session_id}` | End a session |

## Shell and Tunnels
- **URL:** https://createos.sh/docs/Sandbox/REST-API/Connections
- **Summary:** Open an interactive shell or forward a local TCP port into a sandbox you own. Authenticate with your API key and resume a paused sandbox first; these API connections need no SSH key or public ingress.
- **Key points:**
  - Tunnel: HTTP/1.1 with `Connection: Upgrade` and `Upgrade: tcp-tunnel`; success is **101 Switching Protocols**, then raw TCP bytes (not JSON/NDJSON). `port` must be 1 to 65535. Open a separate tunnel for each forwarded TCP connection.
  - CLI forms: `createos sandbox tunnel --remote 3000 --local 3000 "$SANDBOX_ID"` and `createos sandbox shell "$SANDBOX_ID"`.
  - Shell protocol frames (client to server): one-byte type + four-byte unsigned big-endian payload length + payload; type `0x00` = terminal input; type `0x01` = resize as two unsigned 16-bit big-endian values (rows then columns). Server to client = raw terminal bytes.
  - For a shell you can detach from and reconnect to, use a managed PTY (see [[Docs - Sandbox REST API - Lifecycle and Execution]]).
  - WebSocket shell: `wss://api.sb.createos.sh/v1/sandboxes/{id}/shell-ws`; binary messages; clients that cannot set headers can use the supported `token` query parameter (avoid logging credential-bearing URLs).
  - Errors: `409` until sandbox is running; `404` unknown or unowned; `502` connection cannot be opened; `426` WebSocket request without the upgrade. Proxies must support the upgrade protocol.
  - `POST /v1/sandboxes/{id}/ssh-pubkeys` body `{ "keys": ["ssh-ed25519 <public-key> <comment>"] }` deduplicates and returns `{ "status": "success", "data": { "count": 1 } }` (total authorized keys).

| Method | Path | Purpose |
|---|---|---|
| POST | `/v1/sandboxes/{id}/tunnel/{port}` | Bidirectional TCP tunnel to a sandbox port (upgrade, 101) |
| POST | `/v1/sandboxes/{id}/shell` | Interactive PTY over the same upgrade (101) |
| GET | `/v1/sandboxes/{id}/shell-ws` | WebSocket transport for the interactive PTY |
| POST | `/v1/sandboxes/{id}/ssh-pubkeys` | Append SSH public keys |

## Related
- Up: [[Docs - Sandbox REST API]]
- [[Docs - Sandbox REST API - Networking and Egress]]: networks a device attaches to
- [[Docs - Sandbox REST API - Lifecycle and Execution]]: managed PTYs, ingress PATCH
- [[Docs - Sandbox SDK - API Reference]]: `sandbox.computer` and `sandbox.processes` SDK methods
- [[Docs - Sandbox CLI]]: `createos sandbox shell` and `createos sandbox tunnel`
- [[Hackathon Ideas]]: computer-use and always-on agent ideas
