---
tags:
  - hackathon
  - hackathon/idea
  - type/page
source: https://createos.sh/hackathon
scraped: 2026-10-17
up: "[[Hackathon Ideas]]"
---

# Ideas - Always On

> [!summary] Summary
> - Category **Always on: Agents that stick around**. 4 ideas.
> - 1 idea needs the Beginner plan: Fork my analysis.
> - Sandbox features: auto-pause and resume, pause between emails, pause with memory and fork, wake-on-request.
> - Partners named: PostHog, AgentMail.
> - Source: https://createos.sh/hackathon

## Founder's morning KPI email
- **Pitch:** Wakes daily, pulls Stripe and PostHog data, writes the analysis, emails three charts, and goes back to sleep.
- **For:** Founders checking five dashboards every morning.
- **Sandbox feature:** Auto-pause and resume. It sleeps between runs and resumes in place. A daily cron calling its URL wakes it up.
- **With:** PostHog.
- **Plan:** Free plan (no Beginner tag).

## Receipts inbox
- **Pitch:** Forward receipts to an email address; the agent extracts the amounts and keeps a running expense sheet.
- **For:** Freelancers dreading expense reports at tax time.
- **Sandbox feature:** Pause between emails. The sandbox sleeps until the next receipt arrives, then picks up with the sheet where it left it.
- **With:** AgentMail.
- **Plan:** Free plan (no Beginner tag).

## Fork my analysis
- **Pitch:** Pause your Python session and share it. A teammate forks it with every variable still in memory.
- **For:** Data teams handing off half-finished notebooks.
- **Sandbox feature:** Pause with memory and fork. Pausing saves RAM and disk; a fork starts from that exact state, variables and all.
- **With:** none named.
- **Plan:** **Needs Beginner plan.**

## Alert responder
- **Pitch:** An alert wakes the sandbox; the agent runs health checks and log queries, then emails a diagnosis.
- **For:** Small teams with no on-call rotation.
- **Sandbox feature:** Wake-on-request. Point the alert's webhook at the sandbox's URL; the request wakes it up.
- **With:** none named.
- **Plan:** Free plan (no Beginner tag).

## Related
- Up: [[Hackathon Ideas]]
- [[Hackathon Partner Services]]: PostHog, AgentMail
- [[Docs - Sandbox]]: pause, resume, fork and ingress docs
- [[Docs - Sandbox Limits]]: plan limits
- [[Pricing - Sandbox]]: billing while paused vs running
