---
tags:
  - hackathon
  - hackathon/idea
  - type/page
source: https://createos.sh/hackathon
scraped: 2026-10-17
up: "[[Hackathon Ideas]]"
---

# Ideas - Safe

> [!summary] Summary
> - Category **Safe: Agents with guardrails**. 3 ideas.
> - 1 idea needs the Beginner plan: Phishing link opener.
> - Sandbox features: egress allowlist, desktop and self-signal, egress allowlist and pause for approval.
> - Source: https://createos.sh/hackathon

## "Should I install this?" package check
- **Pitch:** Installs the package with the network locked down, logs what it tries to reach, and gives a safe or risky verdict.
- **For:** Developers adding unfamiliar npm or pip packages to a project.
- **Sandbox feature:** Egress allowlist. Allow only the package registry; anything else the install tries to reach gets blocked.
- **With:** none named.
- **Plan:** Free plan (no Beginner tag).

## Phishing link opener
- **Pitch:** Opens the link in a throwaway Chrome, screenshots each redirect, explains the scam, then deletes its own sandbox.
- **For:** Small companies with no security team, getting suspicious emails.
- **Sandbox feature:** Desktop and self-signal. `desktop:1` runs Chrome for the agent to drive; code inside can delete its own sandbox when the job is done.
- **With:** none named.
- **Plan:** **Needs Beginner plan.**

## Refund agent with guardrails
- **Pitch:** Writes and runs refund code that can only reach Stripe, with a capped amount and a human approval step.
- **For:** Support teams who want AI to handle refunds without the risk.
- **Sandbox feature:** Egress allowlist and pause for approval. The sandbox reaches only `api.stripe.com`, and pauses with its state intact while a person approves the refund.
- **With:** none named.
- **Plan:** Free plan (no Beginner tag).

## Related
- Up: [[Hackathon Ideas]]
- [[Docs - Sandbox]]: egress, desktop image and pause docs
- [[Docs - Sandbox Limits]]: plan limits
- [[Product - Sandbox]]: sandbox isolation overview
