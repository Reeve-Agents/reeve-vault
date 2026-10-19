---
aliases:
  - Studio APIs
  - Studio Sandbox SDK
  - Studio runtime API
tags:
  - createos/docs
  - createos/docs/studio
  - type/page
source: https://createos.sh/docs/studio/APIs-And-SDKs
sources:
  - https://createos.sh/docs/studio/APIs-And-SDKs
  - https://createos.sh/docs/studio/APIs-And-SDKs/Studio-APIs
  - https://createos.sh/docs/studio/APIs-And-SDKs/Sandbox-SDK
scraped: 2026-10-17
up: "[[Docs - Studio]]"
---

# Docs - Studio APIs and SDKs

> [!summary] Summary
> - Everything the Studio UI does goes through a public API. Two surfaces: the **Studio API** (manage, at `/api/rpc`) and the **Sandbox / runtime API** (run, at `/api/agents/{id}/eve`).
> - Auth: session cookie (browser) or a `studio_` API key scoped to one organization (server-to-server).
> - Conventions: UUID v7 IDs, cursor pagination (`limit` 1 to 100, default 50), soft deletes, 10 MB request cap, write-only secrets.
> - Source: https://createos.sh/docs/studio/APIs-And-SDKs

## APIs & SDKs
- **URL:** https://createos.sh/docs/studio/APIs-And-SDKs
- **Summary:** Section overview for developers building on top of Studio: the management API and the runtime API, with authentication and shared conventions.
- **Key points:**
  - **Two surfaces:** **Studio API** manages agents, knowledge bases, skills, tools, connections, roles, audit, traces (`{STUDIO_URL}/api/rpc`). **Sandbox / runtime API** runs things: start a turn, stream the answer, answer an input request, cancel (`{STUDIO_URL}/api/agents/{id}/eve`; sessions, turns, streaming events).
  - **Interactive OpenAPI reference** served by every Studio deployment, generated from the same schemas the server validates against:
    - `GET {STUDIO_URL}/api/rpc/api-reference`
    - `GET {STUDIO_URL}/api/rpc/api-reference/spec.json`
  - **Authentication:** browser / first-party app = session cookie from sign-in; server-to-server = Studio API key (`studio_...`), scoped to one organization. Every call is checked twice (role for create, per-object permission for reach).
  - **Rules everywhere:** IDs are UUID v7 (time-ordered); lists are cursor-paginated (pass last id as `cursor`; `limit` 1 to 100, default 50); nothing is hard-deleted (soft deletes); secrets are write-only (API keys, OAuth tokens, vault contents); sensitive calls are audited, including refused ones.

## Studio APIs
- **URL:** https://createos.sh/docs/studio/APIs-And-SDKs/Studio-APIs
- **Summary:** The management surface. Anything doable in the UI can be done here: create agents, upload documents, manage tools, read audit and traces. Built with oRPC, so a fully typed TypeScript client is available.
- **Key points:**
  - **Base URL:** `POST {STUDIO_URL}/api/rpc/<procedure.path>`. Reference at `{STUDIO_URL}/api/rpc/api-reference` and `{STUDIO_URL}/api/rpc/api-reference/spec.json`.
  - **TypeScript client:** `import { createORPCClient } from "@orpc/client";` then e.g. `client.agents.create({ name: "Support Triage" })`, `client.agents.update({ agentId, goal, instructions, modelId: "openrouter/anthropic/claude-sonnet-4", outputFormat: "TEXT" })`, `client.agents.deploy({ agentId })`.
  - **Authentication:** Browser = session cookie set at sign-in; server-to-server = API key prefixed `studio_`, scoped to one organization. Each organization-scoped call re-checks live membership so a stale active organization cannot grant access to a former member.
  - **Before your handler runs, every route:** (1) authenticates the caller, (2) confirms live membership of the active organization, (3) records an audit observation, (4) enforces the authorization gate (role, object permission, or both). Because the audit observer wraps the gate, a refusal is a **Deny** row with a reason; an unauthorized caller sending a malformed body gets a 403 with an audit row, not a 400.
  - **Modules (plural names):** `agents`, `audit`, `connectors`, `organizations`, `knowledgeBases`, `skills`, `toolkits` (plus `healthCheck` and `privateData` probes).
  - **`agents` procedure groups:**
    - Lifecycle: `create` `get` `list` `update` `delete` `deploy` `pause` `resume` `archive` `restore`
    - Discovery: `modelCatalog`
    - Sessions: `sessions.create` `sessions.get` `sessions.list` `sessions.rename` `sessions.delete`
    - Runs: `runs.create` `runs.stream` `runs.cancel` `runs.respond` `runs.list` `runs.get`
    - Attachments: `skills.attach` `skills.detach` `knowledgeBases.attach` `knowledgeBases.detach`
    - Wiring: `memory.set` `guardrail.set` `toolkits.list` `toolkits.accounts.set` `toolkits.mode.set`
    - Sharing: `sharing.share` `sharing.unshare` `sharing.list` `sharing.searchCandidates`
    - Traces: `traces.runs.list` `traces.runs.get` `traces.runs.export` `traces.steps.list` `traces.steps.get`
  - **`knowledgeBases`:** `create` `get` `list` `update` `delete`, plus `folders.*`, `documents.initiateUpload` / `initiateUploads` and `completeUpload` / `completeUploads`, `documents.get` `documents.list` `documents.delete` `documents.retry`, `search`, `sharing.*`.
  - **`skills`:** `create` `get` `list` `update` `delete` and `sharing.*`.
  - **`connectors`:** model, memory and guardrail providers: list the catalogue; create, update, disconnect, reconnect, delete connections; manage the model allowlist.
  - **`toolkits`:** `list` `get` `accounts.connect` `accounts.setTools` `accounts.disconnect`.
  - **`organizations`:** `get` `list` `delete`, member management, invitations, groups, roles and permission editing, `userPermissions`, `availablePermissions`, logo upload.
  - **`audit`:** `list` `export` `health`.
  - **Conventions:**

    | Convention | Detail |
    |---|---|
    | IDs | UUID v7, time ordered |
    | Pagination | Cursor based; pass last id as `cursor`; `limit` 1 to 100, default 50 |
    | Deletes | Soft; object disappears from reads, history preserved |
    | Request size | Bodies capped at 10 MB |
    | Idempotency | Starting a run takes `requestIdempotencyKey`; same key returns the same run |
    | Secrets | Write only; never returned |
    | Correlation | Send `X-Request-Id`; stamped on every audit row for that request |

  - **Errors:** `400` input failed validation; `401` not signed in; `403` signed in but not permitted (audit row written); `404` not found or not reachable (deliberately identical so ids cannot be probed); `409` conflict, usually concurrent writes, safe to retry; `429` rate limited; `500` server error.
  - **Complete example (create, ground, publish, run):** `agents.create({ name: "Invoice Parser" })` -> `agents.update` with `modelId: "openai/gpt-4o-mini"`, `outputFormat: "JSON"` and an `outputFormatConfig.schema` (object with `supplier`, `invoiceNumber`, `total`; all required) -> `agents.knowledgeBases.attach({ agentId, knowledgeBaseId })` -> `agents.deploy({ agentId })` -> `agents.sessions.create({ agentId })` -> `agents.runs.create({ agentId, sessionId, requestIdempotencyKey: crypto.randomUUID(), input: { version: 1, parts: [{ type: "text", text: "..." }] } })` -> `for await (const event of client.agents.runs.stream({ agentId, sessionId, runId: run.agentRunId }))`, appending `event.delta` when `event.type === "text-delta"`.

## Sandbox SDK
- **URL:** https://createos.sh/docs/studio/APIs-And-SDKs/Sandbox-SDK
- **Summary:** The Studio runtime API for running agents from your own product: start a turn, stream the answer, answer an input request, cancel. The HTTP runtime is live and is what the Studio sandbox uses; a packaged client library is in progress, so call the endpoints directly.
- **Key points:**
  - **Two ways to run an agent:** typed procedures on the Studio API (`agent.runs.*`) for TypeScript backends already using the Studio client; the **session gateway** (plain HTTP + SSE) for any language or frontend.
  - **Session gateway endpoint:** `{STUDIO_URL}/api/agents/{agentId}/eve/v1/session`. Preview variant for unpublished agents (used by the builder): `{STUDIO_URL}/api/agents/{agentId}/preview/eve/v1/session`. Authentication: session cookie or a `studio_` API key.
  - **Lifecycle:** POST send (message) -> stream `started` -> `text-delta` ... -> optional `input-requested` -> POST send (`inputResponses`) -> `text-delta` ... -> `completed`.
  - **1. Send a message:** `POST /api/agents/{agentId}/eve/v1/session` with `Content-Type: application/json` and body `{ "message": "Summarise the Q3 revenue report." }`, or structured parts `{ "message": [{ "type": "text", "text": "..." }] }`. Send either `message` or an `inputResponses` array, never both.
  - **2. Stream events (server-sent events):**

    | Event | Carries | Do |
    |---|---|---|
    | `started` | `sessionId`, `runId` | Store both |
    | `text-delta` | `delta` | Append to visible answer |
    | `input-requested` | `requestId`, `input` | Show a prompt, wait for the human |
    | `completed` | `output` | Render final result |
    | `failed` | `code`, `message` | Show error, link to the trace |
    | `cancelled` | | Mark run stopped |

    Every event carries an `index`; reconnect with a start index to resume without replaying.
  - **3. Answer an input request:** `{ "inputResponses": [ { "requestId": "req_123", "optionId": "approve" } ] }` or with free text `{ "requestId": "req_123", "text": "Use the January figures." }`. A paused turn is durable: it survives a disconnect and stays paused until answered.
  - **4. Cancel:** `{ "turnId": "turn_456" }`.
  - **Sessions:** omit the session id on first send and one is created; reuse it to continue. Sessions are private to their creator; re-open one at any time and read its history from the stream.
  - **Idempotency:** every run start carries an idempotency key; the same key twice returns the same run, so network retries are safe.
  - **Runtime enforces on every run:** (1) agent access re-checked live; (2) effective configuration resolved and frozen onto the run; (3) input guardrail applied and memory retrieved; (4) turn executes (models, tools, knowledge bases); (5) output guardrail applied; (6) memory written and every step projected into the trace.
  - **Errors:** `401` missing or invalid credential; `403` no access to this agent; `404` agent or session not found or not reachable; `409` a turn is already active on this session; `429` rate limited. A guardrail-blocked run is not an HTTP error; it arrives as a `failed` event with the guardrail code.
  - **Embedding checklist:** authenticate server side and never expose an API key to the browser; keep the session id; handle `input-requested` (or human-in-the-loop agents appear to hang); handle `failed` distinctly from a network failure; offer a cancel control; track event `index` for clean reconnects; link support staff to the run's trace.

## Related
- Up: [[Docs - Studio]]
- [[Docs - Studio Agent Builder - Govern]]: audit, traces and RBAC behind the audit and trace procedures
- [[Docs - Studio Agent Builder - Operate]]: Sandbox (Playground), which uses this runtime
- [[Docs - Studio Agent Builder - Act]]: toolkit modes (`toolkits.mode.set`)
- [[Docs - Sandbox SDK]]: Sandbox section SDK docs (same "Sandbox SDK" name, separate section of the docs)
- [[Product - Agents]]: CreateOS agents product page
- [[Studio Early Access]]: request access to Studio
