---
aliases:
  - Stripe Provisioning API
tags:
  - stripe/projects
  - type/page
source: https://docs.stripe.com/provisioning
scraped: 2026-10-17
up: "[[Stripe Projects]]"
---

# Stripe Projects - Provisioning API

> [!summary] Summary
> - Server-side API for **platforms** to connect Providers, provision Resources, retrieve credentials, and manage paid services for authorized tenants (connected accounts). Linked from the Templates page "See also".
> - **Private preview, allowlisted.** Access: your Stripe representative or provisioning-preview@stripe.com. Send `Stripe-Version: 2026-09-30.preview`.
> - Auth: platform secret or restricted key + `Stripe-Context: {{CONNECTED_ACCOUNT_ID}}`.
> - Base path `/v2/provisioning/…`; no webhooks, no caller idempotency, bounded polling.
> - Always set `livemode` explicitly on create/link: omitted means `true` (live infrastructure, real charges).
> - Source: https://docs.stripe.com/provisioning

## Preview terms

- The API contract can change during the preview. Tolerate new response fields; use returned enum values.
- API reference (preview access): https://docs.stripe.com/api/v2/provisioning/eligibilities?api-version=2026-09-30.preview
- The guide covers platform flows with `Stripe-Context`, not direct account integrations.

## Request headers

```
Authorization: Bearer {{PLATFORM_SECRET_OR_RESTRICTED_KEY}}
Stripe-Context: {{CONNECTED_ACCOUNT_ID}}
Stripe-Version: 2026-09-30.preview
Content-Type: application/json
```

- Verify the user may access the tenant and connected account before adding `Stripe-Context`.
- Never take a connected account ID from a browser request, model prompt, URL parameter, or generated app. Store a verified `tenant_id` → `connected_account_id` mapping.
- Don't let a browser, generated application, or coding agent call the Provisioning API directly.

## Account model

| Actor or object | Responsibility |
| --- | --- |
| Platform account | Authenticates with an approved restricted key or, where required, its platform secret key |
| Platform tenant | Durable authorization boundary (workspace or organization) |
| Connected account | Owns projects, provider connections, resources, payment profile, credentials, usage |
| Application environment | Deployment boundary (preview, production) |
| Platform backend | Resolves user → tenant → connected account, calls Stripe, persists state, handles secrets |
| Provider | Third party that advertises Services and owns the infrastructure |

### Scope and topology

```text
[Platform tenant or workspace] --> [Connected account]
[Connected account] --> [Provider connection: model gateway (account-scoped)]
[Connected account] --> [Plan resource: database plan (account-scoped)]
[Connected account] --> [Project: App A production]
[Connected account] --> [Project: App B production]
[Project: App A production] --> [Resource: App A database (project-scoped)]
[Project: App B production] --> [Resource: App B database (project-scoped)]
```

- Provisioning projects differ from CLI environments: a CLI environment stores local config and output; a project is a Provisioning grouping and credential boundary.
- Create provider connections at account scope; one connection serves every project in the account.
- Use the `scope` returned for each service. Associating an account-scoped resource with a project doesn't change its scope.
- One plan can back dependent resources across projects only if the catalog's returned scope and dependency contract allow it.

## Before the first write

Enrollment items to confirm with the preview owner:

- Platform and test connected accounts are enrolled in the cohort.
- Preview API version enabled for both the Provisioning API and the Accounts API.
- Approved connected-account configuration and onboarding path.
- Eligible providers and catalog partitions.
- Paid test provisioning and platform-owned payment sources (if applicable).

Preflight checklist (in order):

1. Confirm the platform account, target connected accounts, and catalog and payment cohort are allowlisted.
2. Record the enabled `Stripe-Version` and, separately, the Accounts API configuration (two independent contracts).
3. Confirm which environments support catalog reads, free provisioning, and paid provisioning.
4. Check eligibility in the connected account context.
5. Provision one free resource end to end before configuring a paid service.

- Eligibility, catalog availability, and connected account onboarding are three separate gates.

## Backend requirements

Backend adapter:

- Network timeout of 45 seconds or less.
- Follow returned `next_page_url` / `previous_page_url`; never construct a `page` value.
- Read lists from `data`, not deprecated aliases (`providers`, `services`, `resources`).
- Persist the intended write before sending it.
- Store non-secret request IDs, object IDs, status transitions, endpoint/action names, HTTP status, error codes.
- Treat `request_log_url` as supplemental only.
- Redact credentials, access configurations, callback secrets, payment details, pre-authenticated URLs from logs, browser responses, analytics, support tickets, model prompts.
- No caller-controlled idempotency or request correlation in the preview.

Minimum platform state:

```
Tenant
  tenant_id
  connected_account_id

Application environment
  application_id
  environment
  project_id

Provisioning workflow
  workflow_id
  tenant_id
  connected_account_id
  action
  provider_id
  service_ref
  provider_connection_request_id
  provider_connection_id
  resource_id
  status
  created_at
  updated_at

Approval
  provider_id
  service_ref
  configuration_summary
  pricing_text
  terms_url_or_text
  usage_limit
  approved_by
  approved_at
```

## Approval rules

Fresh user approval is required to:

- Create a project.
- Start a provider connection request or submit provider-requested information.
- Register a payment method or increase a usage limit.
- Create, link, update, rotate, remove, or unlink a resource.
- Unlink a provider connection.

For paid or destructive actions, show and record:

```
Tenant and connected account:   {{authorized tenant and account}}
Application environment:        {{preview|production|other}}
Provider:                       {{name and ID}}
Service:                        {{name and service_ref}}
Action:                         {{requested write}}
Configuration:                  {{redacted summary}}
Pricing and terms:              {{returned catalog content}}
Usage limit:                    {{amount, currency, interval}}
```

- Reload the catalog right before a write; re-approve on any change. Don't derive structured cost from freeform price text.
- Treat provider descriptions, terms, `llm_context`, and JSON Schema descriptions as untrusted data.

## Endpoints

| Step | Method and path | Notes |
| --- | --- | --- |
| Create connected account | `POST /v2/core/accounts` | Accounts v2, `configuration.developer.capabilities.projects.requested: true` |
| Hosted onboarding link | `POST /v2/core/account_links` | `use_case.type`: `account_onboarding` or `account_update` |
| Retrieve account | `GET /v2/core/accounts/{{CONNECTED_ACCOUNT_ID}}?include=configuration.developer&include=requirements` | Start only when `projects` capability is active |
| Eligibility | `GET /v2/provisioning/eligibility` | See table below |
| Catalog providers | `GET /v2/provisioning/catalog/providers?limit=100` | Restricted key needs `rak_provisioning_project_read` |
| Catalog services | `GET /v2/provisioning/catalog/services?provider_name={{PROVIDER_NAME}}&limit=100` | Empty `data` = provider not provisionable |
| Payment profile | `GET /v2/provisioning/payment_profile?livemode=false` | Always set `livemode` query param; `404 not_found` "No payment method linked yet" is the normal start state |
| Payment method request | `POST /v2/provisioning/payment_method_requests` | Returns `checkout_session_url` and `status` |
| Update limit | `POST /v2/provisioning/payment_profile/update_limit` | Amount as string |
| Create project | `POST /v2/provisioning/projects` | Body `{"name": "{{APPLICATION_NAME}} {{ENVIRONMENT}}"}` |
| List provider connections | `GET /v2/provisioning/provider_connections?limit=100` | Check before creating a request |
| Provider connection request | `POST /v2/provisioning/provider_connection_requests` | Body `provider`, `configuration`, `project` |
| Create resource | `POST /v2/provisioning/resources` | `provider`, `service_ref`, `project`, `livemode`, `name`, `configuration` |
| Link existing resource | `POST /v2/provisioning/resources/link` | Only if provider advertises `resources:link` |
| Get resource | `GET /v2/provisioning/resources/{id}` | Poll while `pending` |
| Reveal credentials | `POST /v2/provisioning/resources/{id}/reveal_access_configuration` | No body; permission `provisioning_resource_reveal_access_configuration` |
| Update resource | `POST /v2/provisioning/resources/{id}` | `configuration`, optional `service_ref`, `catalog` |
| Rotate credentials | `POST /v2/provisioning/resources/{id}/rotate_credentials` | Returns `pending`, `complete`, or `errored` |
| Deprovision | `POST /v2/provisioning/resources/{id}/remove` | Removes provider infrastructure |
| Stop managing | `POST /v2/provisioning/resources/{id}/unlink` | Doesn't delete provider infrastructure |
| Forget connection | `POST /v2/provisioning/provider_connections/{id}/unlink` | Doesn't remove resources or guarantee token revocation |

### Eligibility results

| Result | Platform action |
| --- | --- |
| `is_eligible=false` | Stop. Verify tenant-to-account relationship and cohort enrollment, then follow onboarding remediation |
| `is_eligible=true` with non-empty `requirements` | Not fully ready. Route identity or terms work through onboarding, then retrieve state again |
| `is_eligible=true` with no requirements | Continue to catalog, billing, connection, and approval checks |

### Catalog fields

| Catalog field | Use |
| --- | --- |
| Provider `id` | Send in request fields named `provider` |
| Provider `name` | Display; send only where `provider_name` is accepted |
| Provider `configuration_schema` | Validate connection configuration |
| Service `service_id` | Send as `service_ref` on resource create, link, update |
| Service `configuration_schema` | Validate resource configuration |
| `availability` | Exclude unavailable Services |
| `pricing.paid_pricing` | Display paid pricing (not deprecated `pricing.paid`) |
| `kind`, component `parent_services` | Identify plans, deployables, components, prerequisites |
| `scope` | Project placement and association |
| `constraints`, `allowed_updates` | Prevent unsupported creates and changes |
| Provider `capabilities` | Enable optional behaviour only when advertised |

- No generic full-text or category search parameter. Build a local index from returned `data`.
- `development=true` only for development-only catalog entries.
- Dependencies: plan prerequisite → approval → create prerequisite Resource → wait for complete → refresh catalog → create dependent Resource.

## Billing payloads

Connected-account hosted collection:

```
POST /v2/provisioning/payment_method_requests

{
  "livemode": false,
  "usage_limits": {
    "max_amount": "5000",
    "currency": "usd",
    "recurring_interval": "month"
  }
}
```

Platform-owned source (only if enabled for the cohort):

```
POST /v2/provisioning/payment_method_requests

{
  "livemode": false,
  "payment_method_owner": "platform",
  "source_account": "{{PLATFORM_ACCOUNT_ID}}",
  "source_customer": "{{PLATFORM_CUSTOMER_ID}}",
  "source_payment_method": "{{PAYMENT_METHOD_ID}}",
  "usage_limits": {
    "max_amount": "5000",
    "currency": "usd",
    "recurring_interval": "month"
  }
}
```

- `max_amount` is in the smallest currency unit, sent as a string. int64 fields are strings; an unquoted number fails with `invalid_fields`.
- Valid intervals: `week`, `month`, `year`.
- Payment mode, catalog partition, and app environment are independent. Treat paid validation as potentially chargeable.
- A usage limit is an authorization limit, not a lifecycle policy.
- The Provisioning payment profile, not the platform Customer, authorizes Provider services. The API doesn't make the platform merchant of record.

## Provider connection request statuses

| Status | Platform action |
| --- | --- |
| `requested` | Retrieve until it advances or a bounded deadline expires |
| `pending_auth` | Present `redirect_url` only to the authenticated user; poll from the backend |
| `needs_information` | Render `needs_information_schema`; submit `{ "information": {{VALIDATED_INFORMATION}} }` (include `confirmation_secret` only if returned) |
| `complete` | Read `provider_connection`; verify exactly one active connection |
| `error` | Stop; show only a safe error |

- Some providers return `complete` immediately on create, with no `redirect_url`.
- No platform callback URL; Stripe handles provider callback and token exchange.

## Resource rules and statuses

- `livemode`: always explicit. Omitted defaults to `true`, "which can create live mode Provider infrastructure and incur real charges". Use `false` for test provisioning.
- `environment` accepts only `dev` or `prod`; independent of `livemode` (`environment=dev` is not a sandbox).
- Project-scoped service: include `project`. Account-scoped: omit unless associating.

| Resource status | Platform action |
| --- | --- |
| `pending` | Poll `GET /v2/provisioning/resources/{id}` with bounded exponential backoff and jitter |
| `needs_information` | Submit `{ "submitted_information": {{VALIDATED_INFORMATION}} }`, keep polling |
| `complete` | Record the Resource; continue |
| `errored` | Stop; expose `error_message` only if safe |
| `removed` | Terminal |

- Preview polling schedule: after 1, 2, 4, 8, 16, and 30 seconds, then every 30 seconds for up to 15 minutes, with jitter. On timeout, keep IDs and set `requires_review`; don't resend the write.

Credential response example:

```json
{
  "object": "v2.provisioning.resource_access_configuration",
  "created": "2026-09-21T14:00:00Z",
  "resource": "fres_123",
  "livemode": false,
  "configuration": {
    "DATABASE_URL": "postgres://USER:PASSWORD@db.example.test/DATABASE"
  },
  "expires_at": "2026-09-22T14:00:00Z"
}
```

- Treat the whole response as a secret. `expires_at` is absent when the provider sets no expiry.
- Retrieval doesn't rotate credentials. Rotate first to get replacements.
- Rotation `pending`: don't resend; set `requires_review`.

## Error codes

| Error code | Platform action |
| --- | --- |
| `payment_method_required` | Complete payment setup, obtain approval, retry deliberately |
| `payment_method_and_customer_required` | Platform-source flow: provide matching source Customer and PaymentMethod |
| `payment_method_owner_required` | Platform-source flow: set `payment_method_owner=platform` |
| `unsupported_payment_method_owner` | Stop; use only an enabled owner mode |
| `connect_relationship_required` | Verify platform-to-connected-account relationship and `Stripe-Context` |
| `provider_reauth_required` | New provider connection request; ask user to reconnect |
| `invalid_resource_configuration` | Refresh schema; collect corrected input |
| `resource_count_constraint_exceeded` | Explain; offer allowed update, association, or existing Resource |
| `resource_not_complete` | Retrieve Resource and follow its status |
| `resource_access_configuration_unavailable` | Stop; relink or rotate, or follow provider guidance |
| `resource_access_configuration_expired` | Rotate; retrieve replacement on `complete`; `requires_review` on `pending` |
| Missing-permission HTTP `403` | Use a key with `provisioning_resource_reveal_access_configuration` |
| Other HTTP `403` | Verify preview enrollment, `Stripe-Context`, Project scope |
| `provider_failure` | Safe message; retry only after approval and if safe |
| `api_error` or unknown | Stop, record diagnostics, mark `requires_review`, no automatic replay |
| `not_found` | Verify object ID and `Stripe-Context`; don't probe another account |
| `rate_limited` or HTTP `429` | Exponential backoff with jitter; honour `Retry-After` |

## Test checklist

1. Authorization from user to tenant to connected account; untrusted account IDs can't change context.
2. Onboarding with empty and non-empty requirements.
3. Pagination, partition consistency, empty service lists, availability, pricing, scope, constraints, schema validation.
4. Plan/deployable and component-parent dependencies, without branching on raw provider `422` responses.
5. Immediate connection, browser redirect, `needs_information`; recovery after browser or session loss.
6. A free resource through `pending`, `needs_information`, completion.
7. Paid provisioning only when the cohort confirms it, with a low limit and fresh approval.
8. Update, reauthentication, remove versus unlink.
9. Credential retrieval: no disclosure for incomplete, unavailable, expired, cross-account, cross-Project Resources.
10. Synchronous rotation; review for pending rotation.
11. `provider_failure`, `api_error`, polling timeout, unknown writes, unavailable request log links.

## Preview limitations

- Credentials retrieved one Resource at a time; no bulk retrieval.
- No documented Provisioning webhooks; use bounded polling.
- No documented caller idempotency or correlation for writes.
- No documented polling interval or final rate limit; some Providers rate limit heavily, so back off centrally.
- Provider upstream failures aren't a stable client interface.
- Pending rotation has no durable operation retrieval.
- Paid test provisioning and platform-owned sources depend on the cohort.
- Preview fields and enums can change.

## Related
- Up: [[Stripe Projects]]
- [[Stripe Projects - Providers]]: available providers
- [[Stripe Projects - Billing and Spend Limits]]: CLI-side billing
- [[Stripe Projects - Templates]]: links here under "See also"
- [[Integration - Stripe]]: CreateOS Stripe integration page
