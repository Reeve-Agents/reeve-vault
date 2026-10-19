---
aliases:
  - Mobbin
  - ScreensDesign
  - Mobbin MCP
tags:
  - design
  - type/page
scraped: 2026-10-18
source: https://mobbin.com/mcp
sources:
  - https://mobbin.com/mcp
  - https://docs.mobbin.com/mcp/clients/claude-code-cli
  - https://screensdesign.com/mcp
up: "[[Design Resources]]"
---

# UI Pattern Libraries - Mobbin and ScreensDesign

> [!summary] Summary
> - Both are libraries of **real product screens**, used to ground Reeve's UI (dashboard, approval modal, timelines, mobile passkey flow) in patterns that already work.
> - Both MCP servers were added to Claude Code at **user scope** on 18 Oct 2026, and the owner completed OAuth. `claude mcp list` shows **✔ Connected** for both.
> - **Their tools load only in a new Claude session** (servers added mid-session are not available to that session).

## Mobbin

- 600,000+ real product screens; "the design reference your AI agents are missing" (site).
- MCP: available on **Pro & Team** plans; no API key, OAuth sign-in; unlimited usage during beta (limits later).
- Endpoint: `https://api.mobbin.com/mcp` (HTTP).
- Added with:

```bash
claude mcp add mobbin --scope user --transport http https://api.mobbin.com/mcp
```

- Use for Reeve: dashboard layouts, approval/confirmation modals, activity logs, timeline grids, onboarding chat.

## ScreensDesign

- Library of 2,805+ top-grossing iOS apps: recorded screens, full UX flows, revenue signals, App Store creatives (site FAQ).
- MCP: part of **ScreensDesign Pro**; hosted at `api.screensdesign.com/v1/mcp`; OAuth or scoped API keys; fair-use budgets.
- Added with:

```bash
claude mcp add screensdesign --scope user --transport http https://api.screensdesign.com/v1/mcp
```

- Use for Reeve: the mobile **passkey approval** flow (Face ID prompt, impact summary, approve/decline), owner notifications.

## Status and next step

| Server | Scope | Status (18 Oct 2026) | Available to agents |
|---|---|---|---|
| `mobbin` | user | ✔ Connected (OAuth done) | In new sessions |
| `screensdesign` | user | ✔ Connected (OAuth done) | In new sessions |

Remove either with `claude mcp remove <name> -s user`.

> [!warning] 19 Oct 2026: both MCPs refuse tool calls on the current plans
> - Mobbin: "Mobbin MCP requires a paid plan" (https://mobbin.com/pricing).
> - ScreensDesign: "An active Pro subscription is required" (https://screensdesign.com/pricing).
> - The studio's phone layout was therefore designed from the vault's own references instead:
>   - xerx: numbered hairline rows become folded steps.
>   - codapress: the glass box.
>   - agenticwebteam: one step at a time, with a strong lime CTA.
>   - Colours and fonts: the palette tokens and fonts in [[Design Resources]].

## Related
- Up: [[Design Resources]]
- [[Reeve - Screens Demo and MVP]]: the 9 screens these libraries inform
