---
tags:
  - hackathon
  - hackathon/idea
  - type/page
source: https://createos.sh/hackathon
scraped: 2026-10-17
up: "[[Hackathon Ideas]]"
---

# Ideas - Stretch

> [!summary] Summary
> - Category **Stretch: Newer patterns, for teams who want a challenge**. 12 ideas, each with a suggested demo.
> - 5 need the Beginner plan: Fork-and-race fixer, Red team with proof, Swarm scored by a test suite, Computer use on an app with no API, Bug fixer that reproduces first.
> - Partners named: Stripe test mode, Neon, Clerk, CreateOS, Turso, PlanetScale, Stripe MPP, OpenRouter, Supermemory, GitLab, Sentry.
> - Source: https://createos.sh/hackathon

## Code Mode for Stripe
- **Pitch:** Give the agent one tool, `execute`, instead of twenty. It writes a single script against the Stripe API in test mode and runs it in the sandbox.
- **Demo:** The same task done both ways, with the token count beside each.
- **Sandbox feature:** Egress allowlist. Lock the sandbox to `api.stripe.com`; the script the agent writes can reach Stripe and nothing else.
- **With:** Stripe test mode.
- **Plan:** Free plan (no Beginner tag).

## An agent that sets up its own stack
- **Pitch:** From a one-line spec, it adds a database and auth with Stripe Projects, writes the app, tests it against the real services, and deploys it.
- **Demo:** An empty directory becomes a live URL, and no dashboard gets opened.
- **Sandbox feature:** Preview URL. Enable ingress and the sandbox gets a public HTTPS URL, so you can click through the app before it ships.
- **With:** Neon, Clerk, CreateOS.
- **Plan:** Free plan (no Beginner tag).

## Stack bake-off
- **Pitch:** Provisions Neon, Turso and PlanetScale through Stripe Projects, benchmarks your workload on all three, keeps the winner and removes the rest.
- **Demo:** A live latency chart, then the losing databases deleted.
- **Sandbox feature:** Data stack preinstalled. `devbox:1` ships Python 3.12 with pandas and matplotlib, so the benchmark and its chart run with no installs.
- **With:** Neon, Turso, PlanetScale.
- **Plan:** Free plan (no Beginner tag).

## Pay-per-run code runner
- **Pitch:** Put a sandbox behind an HTTP 402. Other agents pay per execution with Stripe's Machine Payments Protocol, all in test mode.
- **Demo:** An agent hits the 402, pays, gets its output, and the earnings tick up.
- **Sandbox feature:** Its own kernel. Each run gets a Firecracker micro-VM, so code from paying strangers can't reach the host or each other.
- **With:** Stripe MPP.
- **Plan:** Free plan (no Beginner tag).

## Autoresearch in an afternoon
- **Pitch:** The agent edits the code, runs a 60-second experiment, scores it, and keeps or reverts the change. Then it repeats, forty times.
- **Demo:** A metric climbing on screen, and the git log of every hypothesis it tried.
- **Sandbox feature:** Pause and resume. Auto-pause between runs stops compute billing; resume picks up in place.
- **With:** OpenRouter.
- **Plan:** Free plan (no Beginner tag).

## An agent that writes its own tools
- **Pitch:** When it hits a gap, it writes a tool, tests it in the sandbox, and saves it as a skill. The next session starts with it.
- **Demo:** The same task run twice, the second time much faster.
- **Sandbox feature:** Coding agents preinstalled. `devbox:1` has Claude Code, Codex, OpenCode, Pi and Cursor CLI on the PATH, ready to drive.
- **With:** Supermemory.
- **Plan:** Free plan (no Beginner tag).

## Eval builder
- **Pitch:** Turns a domain into a scored benchmark, with tasks and a checker that runs in the sandbox, then puts three models through it.
- **Demo:** A leaderboard for a benchmark that didn't exist that morning.
- **Sandbox feature:** Egress allowlist. Allow only the model API while scoring, so no run can look the answers up.
- **With:** OpenRouter.
- **Plan:** Free plan (no Beginner tag).

## Fork-and-race fixer
- **Pitch:** Set up a repo with a failing test, pause, and fork it into four identical copies. Each tries a different fix; the tests pick the winner.
- **Demo:** Four tiles racing until one turns green.
- **Sandbox feature:** Fork. Fork a paused sandbox into byte-identical copies, memory and disk included, each with its own address.
- **With:** GitLab.
- **Plan:** **Needs Beginner plan.**

## Red team with proof
- **Pitch:** A vulnerable app in one sandbox, an attacker agent in another. It must land a working exploit, write the patch, then run the exploit again.
- **Demo:** The exploit works, the patch lands, the exploit fails.
- **Sandbox feature:** Private network. The app and the attacker share a network nothing outside can reach, so the exploit stays in the lab.
- **With:** none named.
- **Plan:** **Needs Beginner plan.**

## Swarm scored by a test suite
- **Pitch:** A planner hands tasks to coders, each in its own sandbox. They claim work, push fixes, and the test suite keeps score.
- **Demo:** A pass-rate bar filling up.
- **Sandbox feature:** Peers by name. Sandboxes on one private network reach each other by name, like `curl http://brave-otter:8080`.
- **With:** GitLab, OpenRouter.
- **Plan:** **Needs Beginner plan.**

## Computer use on an app with no API
- **Pitch:** In a desktop sandbox with Chrome, the agent clicks through an app that has no API, then writes a Playwright script so the next run needs no clicking.
- **Demo:** The audience watches it work, live, over VNC in the browser.
- **Sandbox feature:** Desktop image. `desktop:1` runs a full desktop with Chrome. The agent takes screenshots and drives the mouse and keyboard.
- **With:** none named.
- **Plan:** **Needs Beginner plan.**

## Bug fixer that reproduces first
- **Pitch:** From a Sentry error, it boots the real stack, writes a failing reproduction, fixes it, and opens a pull request with the evidence.
- **Demo:** A red test, a green test, a pull request.
- **Sandbox feature:** Docker inside. `devbox:1` ships Docker, so Postgres, Redis and the app run side by side in one micro-VM.
- **With:** Sentry, GitLab.
- **Plan:** **Needs Beginner plan.**

## Related
- Up: [[Hackathon Ideas]]
- [[Hackathon Partner Services]]: every "With" service above
- [[Stripe Projects]]: provisioning Neon, Clerk, Turso, PlanetScale
- [[Docs - MPP]]: CreateOS docs on machine payments (HTTP 402)
- [[Docs - Sandbox]]: fork, private network, images and ingress docs
- [[Docs - Sandbox Limits]]: what needs the Beginner plan
- [[Ideas - Computer Use]]: other desktop-image ideas
