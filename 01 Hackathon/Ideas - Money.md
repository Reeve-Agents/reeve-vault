---
tags:
  - hackathon
  - hackathon/idea
  - type/page
source: https://createos.sh/hackathon
scraped: 2026-10-17
up: "[[Hackathon Ideas]]"
---

# Ideas - Money

> [!summary] Summary
> - Category **Money: Agents people would pay for**. 4 ideas.
> - 1 idea needs the Beginner plan: CS assignment grader.
> - Sandbox features: egress allowlist, exec and file transfer, egress blocked plus fork from a snapshot, exec and Stripe.
> - Source: https://createos.sh/hackathon

## Stripe revenue analyst
- **Pitch:** Writes and runs Python against your Stripe test data, in a sandbox whose network can only reach `api.stripe.com`.
- **For:** Founders who want MRR, churn and cohort charts but have no data team.
- **Sandbox feature:** Egress allowlist. Lock the sandbox to `api.stripe.com`; the code the agent writes can reach Stripe and nothing else.
- **With:** none named.
- **Plan:** Free plan (no Beginner tag).

## Payout reconciler
- **Pitch:** Takes both CSVs (Stripe payouts and bank statements), writes the matching logic, flags mismatches, and exports a clean report.
- **For:** Small-business accountants matching Stripe payouts to bank statements by hand.
- **Sandbox feature:** exec and file transfer. Upload the CSVs, run the code the agent writes, and download the report it produces.
- **With:** none named.
- **Plan:** Free plan (no Beginner tag).

## CS assignment grader
- **Pitch:** Runs each submission against hidden tests with no internet, explains the failures; the course pays per batch.
- **For:** TAs grading 200 Python submissions every week.
- **Sandbox feature:** Egress blocked, fork from a ready snapshot. Set up the test harness once, pause, and fork a fresh copy for each submission, with no network to cheat through.
- **With:** none named.
- **Plan:** **Needs Beginner plan.**

## Timesheet to invoice
- **Pitch:** Parses a Toggl or Clockify export, calculates hours times rate, and creates the Stripe invoice.
- **For:** Freelancers turning Toggl or Clockify exports into invoices.
- **Sandbox feature:** exec and Stripe. The agent's parsing code runs in the sandbox, then calls the Stripe API to create the invoice.
- **With:** none named.
- **Plan:** Free plan (no Beginner tag).

## Related
- Up: [[Hackathon Ideas]]
- [[Docs - Sandbox]]: egress, file transfer, pause and fork docs
- [[Docs - Sandbox Limits]]: what the Free plan runs and what needs Beginner
- [[Pricing - Sandbox]]: Beginner plan pricing
- [[Stripe Projects]]: Stripe setup for test data
