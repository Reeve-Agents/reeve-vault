---
tags:
  - hackathon
  - hackathon/idea
  - type/page
source: https://createos.sh/hackathon
scraped: 2026-10-17
up: "[[Hackathon Ideas]]"
---

# Ideas - Builders

> [!summary] Summary
> - Category **Builders: Agents that write and fix code**. 4 ideas.
> - None needs the Beginner plan; all fit the Free plan.
> - Sandbox features: live public URL, egress allowlist and exec, fresh sandbox per run, wake-on-request URL.
> - Source: https://createos.sh/hackathon

## Stripe webhook fixer
- **Pitch:** Runs your webhook handler in a sandbox with a public URL, fires Stripe test events at it, reads the errors, and patches the code until every event returns 200.
- **For:** SaaS developers whose webhook handler silently fails in production.
- **Sandbox feature:** Live public URL. Any port in the sandbox gets an HTTPS link, so Stripe can deliver test events straight to the handler.
- **With:** none named.
- **Plan:** Free plan (no Beginner tag).

## Sentry error to reproduction
- **Pitch:** Takes a Sentry error, writes a minimal script that reproduces it, confirms it crashes the same way, then proposes a fix.
- **For:** On-call engineers staring at a stack trace they can't reproduce.
- **Sandbox feature:** Egress allowlist and exec. The repro runs with the network locked down; exec hands back its output and exit code.
- **With:** Sentry.
- **Plan:** Free plan (no Beginner tag).

## Docs snippet tester
- **Pitch:** Pulls every code block from a docs page, runs each one, and reports which are broken with a suggested fix.
- **For:** DevRel teams whose docs code examples are broken and nobody knows.
- **Sandbox feature:** Fresh sandbox per run. Each snippet starts clean in its own micro-VM, so one broken example can't affect the next.
- **With:** none named.
- **Plan:** Free plan (no Beginner tag).

## Client landing page in 10 minutes
- **Pitch:** Turns a brief and a logo into a page, shares a live link that sleeps until the client opens it, and hands over the code once the client pays a deposit through Stripe.
- **For:** Freelancers who lose clients waiting days for a first draft.
- **Sandbox feature:** Wake-on-request URL. A paused sandbox wakes when someone opens its link, so the draft isn't burning compute while it waits.
- **With:** none named.
- **Plan:** Free plan (no Beginner tag).

## Related
- Up: [[Hackathon Ideas]]
- [[Hackathon Partner Services]]: Sentry
- [[Docs - Sandbox]]: ingress, egress, exec and pause docs
- [[Docs - Sandbox SDK]]: SDKs for exec and lifecycle calls
- [[Product - Sandbox]]: sandbox feature overview
