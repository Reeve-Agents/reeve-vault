---
aliases:
  - Studio Govern
  - Studio RBAC
  - Studio Guardrails
tags:
  - createos/docs
  - createos/docs/studio
  - type/page
source: https://createos.sh/docs/studio/Agent-Builder/Govern
sources:
  - https://createos.sh/docs/studio/Agent-Builder/Govern
  - https://createos.sh/docs/studio/Agent-Builder/Govern/Guardrails
  - https://createos.sh/docs/studio/Agent-Builder/Govern/Audit-Logs
  - https://createos.sh/docs/studio/Agent-Builder/Govern/Audit-Traces
  - https://createos.sh/docs/studio/Agent-Builder/Govern/Usage
  - https://createos.sh/docs/studio/Agent-Builder/Govern/RBAC
scraped: 2026-10-17
up: "[[Docs - Studio Agent Builder]]"
---

# Docs - Studio Agent Builder - Govern

> [!summary] Summary
> - **Govern** answers "what is this agent allowed to do, and can we prove what it did?" through five surfaces: Guardrails, Audit logs, Audit traces, Usage, RBAC.
> - Access is checked in two layers: a **Role** (what you can create) and an **Object permission** (what you can reach). Denials are audited too.
> - Guardrail providers: AWS Bedrock Guardrails and Google Model Armor. Trace permissions: `trace: read` and `trace: read_payloads`.
> - Source: https://createos.sh/docs/studio/Agent-Builder/Govern

## Govern
- **URL:** https://createos.sh/docs/studio/Agent-Builder/Govern
- **Summary:** Stage overview. Governance is five separate surfaces, each answering a different question, plus a two-layer access model.
- **Key points:**
  - Pages and the question each answers: **Guardrails** (what must never go in or come out?); **Audit logs** (who changed what, who was refused?); **Audit traces** (what happened inside a run?); **Usage** (how much are we spending, on what?); **RBAC, teams and permissions** (who can do which of the above?).
  - **Two-layer model:** Layer 1 **Role** (RBAC), granted by an admin in Settings -> Roles, e.g. "Members may create agents." Layer 2 **Object permission** (sharing), granted by whoever admins that object, e.g. "Priya is an Editor on the Support Triage agent." A denial at either layer is recorded in the audit log and the action does not run.
  - Refusals are recorded: a denied request writes an audit row with the reason. Silence in the audit log means nothing was attempted.

## Guardrails
- **URL:** https://createos.sh/docs/studio/Agent-Builder/Govern/Guardrails
- **Summary:** A guardrail is a safety check that runs on what goes into an agent, what comes out, or both. Studio applies an existing guardrail or template you already created at AWS or Google.
- **Key points:**
  - **Can catch (depending on configuration):** personal data (names, emails, card numbers, health identifiers); prompt injection and jailbreak attempts; prohibited topics you define; hate, harassment, violence and sexual content; confidential or off-limits phrasing.
  - **Placement:** user message -> Guardrail INPUT check -> Agent -> Guardrail OUTPUT check -> reply.
  - **Supported providers:**

    | Provider | You configure | Credential |
    |---|---|---|
    | **AWS Bedrock Guardrails** | AWS region, guardrail ID, guardrail version | IAM role ARN, access key ID, secret access key |
    | **Google Model Armor** | GCP project ID, location, template ID | Service account JSON |

  - The rules live in the provider's console, where they are tuned. Google Model Armor requires a **regional** location; `global` is rejected.
  - **Set up:** (1) admin connects a provider: requires `connector_guardrail: create` (admin and built-in **AIOps Manager**); sidebar **Guardrails** -> **Connect provider**; credential validated, encrypted, never returned. (2) Agent Builder -> **Guardrails** -> choose connection and the side it checks; needs only **Editor** on the agent; every member can read guardrail connections by default.
  - **Modes:** **Input** (only what the user sends; stops prompt injection and blocks sensitive data before the model), **Output** (only the agent reply), **Both** (default; almost every production agent). Start with Both.
  - **When a guardrail fires:** the run stops at that point; the user sees a message that content was blocked; a guardrail step is written into the trace showing which stage fired and why; blocked content is not delivered.
  - **Snapshot rule:** the guardrail connection and mode are frozen onto each run when it starts; later changes do not rewrite history.
  - **Layers:** Guardrails (unsafe content in/out); Tools action selection (doing something it should not be able to do at all); RBAC (wrong people configuring or running an agent); Instructions (everyday behaviour and tone); Audit logs and traces (not knowing what happened). A guardrail is the last line, not the first.
  - **Troubleshooting:** everything blocked -> provider policy too broad, tune it in the provider console; nothing blocked -> confirm a connection is attached and the mode covers the expected side; Model Armor rejects location -> use a regional one such as `us-central1`, not `global`; Bedrock credential rejected -> check the role ARN format and that the role can call the guardrail.

## Audit logs
- **URL:** https://createos.sh/docs/studio/Agent-Builder/Govern/Audit-Logs
- **Summary:** Answers "who did what, and when?" for configuration changes and access decisions. It does not store the contents of agent conversations (see Audit traces).
- **Key points:**
  - **Where:** Settings -> Audit log. Visible only to members with `audit: read` (admins by default; an admin can mint an "Auditor" role holding only that).
  - **Row columns:** **Who** (person and the role held at that moment); **Action** (e.g. `agents.deploy`, `connectors.connections.create`); **Targets** (an attach records both the agent and what was attached); **Outcome** (**Allow** or **Deny**); **Reason** (on a denial); **Context** (IP address, browser, session and request identifiers); **Metadata** (redacted, size capped); **When**.
  - Values are not stored, only field names: an agent update records that instructions changed, never the text.
  - **Denials are recorded:** a Deny row with the reason is written, so repeated denials from one account are visible.
  - **What gets logged (groups):** Organization; Members (removed, role changed, left); Invitations (sent, accepted, rejected, cancelled); Roles; Groups (created/deleted, member added/removed); Sharing (shared, access removed); Connectors (connected, updated, disconnected, reconnected, deleted, model allowlist changed); Tools (connection started, exposed tools changed, account disconnected); Agent wiring (skill/knowledge base attached or detached, memory set, guardrail set, tool account set, tool sharing mode changed); Lifecycle (create/delete agent, skill, knowledge base; deploy, pause, resume, archive, restore agent; document upload, delete, retry); Configuration (updates; folder create, rename, delete); Audit (reading and exporting the audit log are themselves audited).
  - **Filtering and export:** filter by person, action group, outcome and date range; **Export** downloads the filtered set.
  - **Properties:** append only (rows never edited or deleted, by anyone including admins); role recorded as at the time; outlives the user (deleting a user keeps an identifier that names nobody); organization scoped.
  - **Audit log vs traces:** audit log = who changed the system, records configuration and access decisions, permission `audit: read`; traces = what happened inside a run, records model calls, tool calls, retrievals and guardrail checks, permissions `trace: read` and `trace: read_payloads`.

## Audit traces
- **URL:** https://createos.sh/docs/studio/Agent-Builder/Govern/Audit-Traces
- **Summary:** A trace is the complete record of one agent run: every model call, tool call, document search and guardrail check, with timings, tokens and cost. It answers "why did the agent say that?".
- **Key points:**
  - **Where:** sidebar **Traces**; list of runs, click one for detail. Each row shows agent, who ran it, status, start time, duration, tokens and cost. By default you see your own runs.
  - **Step types in the waterfall (wall-clock order, nested):** **llm** (input tokens, output tokens, cached tokens, cost in USD); **tool** (which tool, arguments, result); **retrieval** (knowledge base query and what came back); **guardrail** (stage and verdict). Every step carries start and end time, an attempt number for retries, and an error type and message on failure. Retries appear as sibling steps with the same name and increasing attempt number.
  - **Permissions:** none = your own runs in full; **`trace: read`** = every run in the organization but only the shape (who ran what, durations, token counts, cost, error types); **`trace: read_payloads`** = additionally content (prompts, tool arguments, tool results, guardrail text, run input/output). Requesting an unreachable run returns "not found" rather than "forbidden".
  - Suggested pairing: give a finance or platform ops role `trace: read`; keep `trace: read_payloads` with a much smaller group.
  - **Configuration snapshot:** each run stores a frozen copy of the model, knowledge bases, tools and whose accounts they used, the guardrail and its mode, so old traces stay truthful.
  - **Export:** any trace exports as a single structured document (ticket, incident review, regulator); without `trace: read_payloads` the content fields are omitted.
  - **Worked example (wrong refund claim):** open Traces and find the run; check the retrieval step (did it search; is the wrong claim in a returned passage -> stale document, delete or replace; not in a passage -> model invented it, tighten instructions); check the llm step for context received; check the guardrail step.
  - **Limits:** very large step payloads are truncated with the original size recorded; there is a cap on steps per run (trace marked truncated when hit); steps are written once and never changed.
  - Page contains a video placeholder (3 min) on debugging a wrong answer with the waterfall.

## Usage
- **URL:** https://createos.sh/docs/studio/Agent-Builder/Govern/Usage
- **Summary:** The finance view: how much is spent on agents and where. Status is preview: the page currently shows a sample dataset; traces are the authoritative source for real token and cost numbers.
- **Key points:**
  - **Where:** sidebar **Usage**; billing period selector at top right.
  - **Panels:** **Period totals** (tokens and spend for the month), **Top agents** (ranked), **Trend** (period over period).
  - **Per-step measures:** input tokens, output tokens, cache read tokens (reused from a cached prompt), cache write tokens, **Cost (USD)** recorded per step to six decimal places. Spend is attributable to the person who ran the agent (per-member gateway keys).
  - **Ways to reduce cost:** smaller model where quality allows (largest saving); shorten instructions and skills (re-sent every turn); attach fewer knowledge bases; cap output length in instructions; set a model allowlist; look for retry loops in traces.
  - **Until Usage is live:** open Traces, filter to the period, read per-run token and cost columns. Anyone with `trace: read` can do this organization-wide without reading conversation content.

## RBAC, teams and permissions
- **URL:** https://createos.sh/docs/studio/Agent-Builder/Govern/RBAC
- **Summary:** Access is controlled in two independent layers (role and object permission); both must pass. Covers members, groups, roles, the permission catalogue, object sharing and SSO.
- **Key points:**
  - **Two layers:** Layer 1 **Role** (what kinds of thing a person may create or administer; set by an admin in Settings -> Roles). Layer 2 **Object permission** (which specific objects a person may reach; set by whoever admins the object via **Share**). Holding `agent: create` does not open someone else's agent; being Editor on one agent does not let you create new ones.
  - **Members (Settings -> Members):** invite by email (join link), change role, remove, view a member's footprint before removal.
  - **Groups (Settings -> Groups):** named sets of people (e.g. "Support", "Legal"); share an agent, knowledge base or skill with the group; joining grants and leaving removes access; people can be invited straight into a group. Share with groups, not people.
  - **Built-in roles:**

    | Role | Holds | Editable |
    |---|---|---|
    | **admin** | Everything, including deleting the organization; creator gets it | No |
    | **member** | Baseline: read roles, read memory and guardrail connections | Permissions yes; cannot be renamed or deleted |
    | **AIOps Manager** | Every connector permission (models, memory, guardrails), nothing from the management plane | Permissions yes; cannot be renamed or deleted |

  - The member role starts deliberately small: members cannot create agents, knowledge bases or skills out of the box. **Custom roles:** name plus ticked permissions; names are unique and case insensitive; built-in names cannot be reused. You can only grant a permission you already hold.
  - **Permission catalogue:**
    - Building: `agent: create`, `knowledgebase: create`, `skill: create`.
    - Connectors: `connector_model`, `connector_memory`, `connector_guardrail`, each with `read / create / update / delete`.
    - Observability: `audit: read`, `trace: read`, `trace: read_payloads`.
    - Organization management: `organization: update / delete`, `member: update / delete`, `invitation: create / cancel`, `team: create / update / delete`, `ac: create / read / update / delete` (manage roles themselves).
  - **Four roles worth creating:** **Builder** (`agent: create`, `knowledgebase: create`, `skill: create`); **Auditor** (`audit: read`); **Platform Ops** (`trace: read`); **Support Lead** (`trace: read`, `trace: read_payloads`).
  - **Sharing individual objects (agents, knowledge bases, skills):** **Viewer** (open, use, attach to things they can already edit), **Editor** (plus change configuration), **Admin** (plus delete and share). Subjects: a person, a group (membership changes apply immediately), or the organization. Multiple grants: the highest level wins, resolved live on every check.
  - **SSO (Settings -> SSO):** connect an identity provider so people sign in with company accounts; domain verification supported.
  - **Recommended start:** keep admin to two or three people; create a Builder role; create an Auditor role; give AIOps Manager to whoever owns provider keys; create groups mirroring real teams; share with groups, not long lists of individuals; review Settings -> Audit log monthly, filtered to denials.

## Related
- Up: [[Docs - Studio Agent Builder]]
- [[Docs - Studio Agent Builder - Define]]: Model Gateway (allowlist, per-member keys, `connector_model`)
- [[Docs - Studio Agent Builder - Ground]]: Memory (`connector_memory`) and retrieval steps in traces
- [[Docs - Studio Agent Builder - Act]]: Tools (toolkit modes, audited tool events)
- [[Docs - Studio Agent Builder - Operate]]: Sandbox and run investigation
- [[Docs - Studio APIs and SDKs]]: audit and trace procedures in the Studio API
- [[Docs - Studio Enterprise Use Cases]]: governance tables per industry
- [[Product - Gateway]]: CreateOS gateway product page
