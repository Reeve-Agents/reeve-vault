---
aliases:
  - Build Agents That Run Code
  - CreateOS x Stripe Projects Hackathon
tags:
  - hackathon
  - type/hub
source: https://createos.sh/hackathon
sources:
  - https://createos.sh/hackathon
  - https://createos.sh/hackathon.md
  - https://luma.com/6stm74wk
  - https://createos.sh/hackathon/createos-stripe-hackathon.ics
scraped: 2026-10-17
up: "[[Home]]"
---

# Hackathon Overview

> [!summary] Summary
> - **Build Agents That Run Code: CreateOS × Stripe Projects**, a one-day online hackathon from CreateOS and Stripe.
> - Saturday, October 17, 2026, 12:00 to 7:00 PM PT (19:00 to 02:00 UTC). Online, on Discord.
> - Prize pool **$10,000**. Entry **free**. Teams: **solo or up to 3**. Registration on Luma, by approval.
> - Brief: start from an empty directory, set up the stack with [[Stripe Projects]], and ship an AI agent that writes its own code and runs it in a CreateOS sandbox.
> - Source: https://createos.sh/hackathon

## Event facts

| Fact | Value |
|---|---|
| Name (createos.sh) | Build Agents That Run Code: CreateOS × Stripe Projects |
| Name (Luma) | Build Agents That Run Code: CreateOS × Stripe Projects Online Hackathon |
| Organisers | CreateOS and Stripe ("Hosted by CreateOS (createos.sh) and Stripe", Luma) |
| Date | Sat, Oct 17 (Saturday, October 17, 2026) |
| Time | 12 to 7 PM PT; 12:00 to 7:00 PM Pacific = 19:00 to 02:00 UTC (FAQ) |
| Calendar file | `DTSTART:20261017T190000Z`, `DTEND:20261018T020000Z`, `LOCATION:Online (Discord)` |
| Where | Online, on Discord (Luma location type: `discord`) |
| Prize pool | $10,000 |
| Prize breakdown / judging criteria | Not stated on the hackathon page or the Luma page |
| Entry | Free (Luma ticket "Standard", type `free`, approval required) |
| Teams | Solo or up to 3 |
| Submission | Stripe Projects leaderboard; demos and awards start 6:00 PM PT on Discord |
| Length | 7 hours: two 15-minute walkthroughs, 5.5 hours of building, 1 hour of demos and awards |

### Hosts and speakers
- **Luma hosts:** Naman Kabra; Gunjan Agarwal; StripeDevelopers (https://stripe.dev/, "We host Stripe Developer Meetups in Stripe offices all over the world!"); CreateOS (https://nodeops.network/).
- **Speakers (schedule):** the Stripe team (Stripe Projects walkthrough); Pratik Balar, Co-Founder and CTO of CreateOS (CreateOS Sandbox walkthrough).
- **Site operator (createos.sh footer):** NodeOps, Inc., 8 The Green #13980, Dover, DE 19901. Contact: hello@createos.sh.

## What you build
Four steps, per the page:
1. **Start from an empty directory.** Bring a laptop and an agent idea; the build starts in the terminal. `mkdir my-agent && cd my-agent`. See [[Hackathon Setup Guide]].
2. **Set up the stack with Stripe Projects.** Stripe Projects provisions services from the terminal and syncs their credentials to `.env`. Adding CreateOS creates the account in one command: `stripe projects add createos/project`. See [[CreateOS on Stripe Projects]].
3. **Run the agent's code in a sandbox.** The agent writes code and runs it in a CreateOS sandbox, a micro-VM with its own kernel. Lock down its network; nothing it runs touches the laptop. `createos sandbox exec agent-1 -- python3 main.py`. See [[Product - Sandbox]].
4. **Submit and demo (6:00 PM PT).** Submit to the Stripe Projects leaderboard, then demo. Awards come from the $10,000 prize pool. See [[Hackathon Schedule]].

Taglines on the page: "One Afternoon, from Empty Directory to Demo"; "Bring an Idea. Ship an Agent by 7 PM."; audience "For Builders Who Want to Ship in a Day" (developers and AI builders).

## What you'll need
- **A laptop.** Everything runs from the terminal and in the sandbox.
- **A free Stripe account.** Can be created during setup.
- **An idea for an agent.** Something that writes code and runs it to get a job done. See [[Hackathon Ideas]].

## How to join
1. **Register on Luma** (https://luma.com/6stm74wk). Say who you are and what you want to build. One person registers per team and adds teammates in the form.
2. **Get approved.** Registration is by approval. Each request is reviewed and confirmed by email through Luma.
3. **Join the Discord.** Once approved, share the Discord link with teammates. The whole event runs there.

### Luma registration form
| Field | Required | Type |
|---|---|---|
| Full name | yes | name (`full-name`) |
| Role | yes | text |
| GitHub profile URL | yes | github |
| What is your LinkedIn profile? | no | linkedin |
| What will you build? | yes | text (multiline) |
| Team Size | yes | select: `1 (solo)`, `2`, `3` |
| Team Name | yes | text |
| Teammate 2: name and email (write NA if solo) | yes | text |
| Teammate 3: name and email (write NA if solo or a team of 2) | yes | text |

Luma status at scrape time: registration `open`, waitlist disabled, guest list hidden, 273 registered (Standard ticket), category AI.

## Hackathon notes
- [[Hackathon Schedule]]: every slot, PT with UTC.
- [[Hackathon Ideas]]: all 30 ideas in one table.
  - [[Ideas - Builders]] · [[Ideas - Money]] · [[Ideas - Safe]] · [[Ideas - Computer Use]] · [[Ideas - Always On]] · [[Ideas - Stretch]]
- [[Hackathon Setup Guide]]: install and setup commands, coding-agent prompt, skills and plugins.
- [[Hackathon Resources and Tools]]: every link on the page, grouped.
- [[Hackathon FAQ]]: all common questions and answers.
- [[Hackathon Partner Services]]: Sentry, PostHog, AgentMail, Neon, Clerk, Turso, PlanetScale, OpenRouter, Supermemory, GitLab, Stripe MPP.
- [[Repo - createos-cli]]: the `createos` CLI README.
- [[Repo - createos-claude-plugins]]: the CreateOS Sandbox plugin marketplace for Claude Code, Codex and others.

## Related
- Up: [[Home]]
- [[Stripe Projects]]: the stack-setup tool the hackathon is built on
- [[CreateOS on Stripe Projects]]: the `createos/project` provider
- [[Docs - Sandbox]]: CreateOS Sandbox docs hub
- [[Product - Sandbox]]: CreateOS Sandbox product page
- [[Pricing - Sandbox]]: Free vs Beginner plans referenced by the ideas
- [[Contact and Community]]: CreateOS contact and Discord
