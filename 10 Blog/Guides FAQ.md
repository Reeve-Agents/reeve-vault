---
aliases:
  - Guides FAQ page
tags:
  - createos/blog
  - type/page
source: https://createos.sh/guides/faq/is-there-a-jenkins-plugin-that-can-pause-a-jenkins-build-agent-and-resume-it
sources:
  - https://createos.sh/guides/faq
  - https://createos.sh/guides/faq/is-there-a-jenkins-plugin-that-can-pause-a-jenkins-build-agent-and-resume-it
scraped: 2026-10-17
up: "[[Blog]]"
---

# Guides FAQ

> [!summary] Summary
> - The guides sitemap lists exactly one FAQ page: `/guides/faq/is-there-a-jenkins-plugin-that-can-pause-a-jenkins-build-agent-and-resume-it` (1 question, 1 answer). Last updated 10/14/2026 (sitemap lastmod 2026-10-14).
> - `https://createos.sh/guides/faq` itself returned HTTP 404 on 2026-10-17 (no FAQ index page exists); `https://createos.sh/guides` lists blog posts only.
> - Answer in one line: yes, the CreateOS Sandbox plugin for Jenkins gives each build a fresh Firecracker microVM agent; pause, resume and fork are Sandbox platform capabilities, not plugin features.
> - Source: https://createos.sh/guides/faq/is-there-a-jenkins-plugin-that-can-pause-a-jenkins-build-agent-and-resume-it

## Q1. Is There a Jenkins Plugin That Can Pause a Jenkins Build Agent and Resume It Later?
- **URL:** https://createos.sh/guides/faq/is-there-a-jenkins-plugin-that-can-pause-a-jenkins-build-agent-and-resume-it
- **Context:**
  - Jenkins agents are usually ephemeral: the build starts, the agent runs, the build ends, the agent is gone.
  - To pause work mid-build and resume with state intact, the agent itself has to support that.
- **Short answer:** Yes, an official plugin exists: the CreateOS Sandbox plugin.
- **The plugin:**
  - Maintained under the Jenkins organisation at `github.com/jenkinsci/createos-sandbox-plugin`.
  - Listed on the Jenkins plugin index at `plugins.jenkins.io/createos-sandbox`.
  - Each build gets a fresh microVM agent (Firecracker), destroyed when the build finishes.
  - Launch is Inbound WebSocket or SSH over the CreateOS tunnel.
  - The agent rootfs must include a JVM.
  - Declarative Pipeline is supported.
- **Where pause and resume live:**
  - The plugin's model is one fresh microVM per build, torn down at the end.
  - Pause, resume and fork are Sandbox platform capabilities: a running sandbox can be paused to a snapshot (memory and disk) and resumed later, with auto-resume on ingress HTTP.
  - Plugin = clean, isolated agents per build. Sandbox API = pause and resume when a workload must hold state between runs.
  - A mid-build checkpoint that survives teardown is a Sandbox API pattern, not a plugin checkbox.
- **Install:**
  - Manage Jenkins > Plugins > Available plugins, or run `jenkins-plugin-cli --plugins createos-sandbox`.
  - A CreateOS API key is required; create one free at createos.sh.
- **Takeaway:** The plugin answers the Jenkins question with isolation: a fresh microVM per build, gone when the build ends. Pause and resume live in the Sandbox layer underneath; use the plugin for per-build agents and the Sandbox API when state has to outlive a single run.

## Related articles listed on the FAQ page
- How to Pause and Resume a Long-Running Jenkins Agent Job Without Losing State (listed in [[Guides Blog Index]])
- Isolated AI Agent Code Execution in Jenkins: The CreateOS Sandbox Plugin (listed in [[Guides Blog Index]])
- Sandbox Platforms That Ship Ready-Made Plugins for Coding Agents (listed in [[Guides Blog Index]])

## Related
- Up: [[Blog]]
- [[Guides Blog Index]]: all 74 /guides/blog/* posts, including the three related articles above
- [[Product - Sandbox]]: Sandbox product page
- [[Docs - Sandbox]]: Sandbox documentation
- [[Docs - Sandbox Integrations]]: integrations including the Jenkins plugin
