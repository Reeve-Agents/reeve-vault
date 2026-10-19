---
aliases:
  - React Bits
  - Hairline
tags:
  - design
  - type/page
scraped: 2026-10-18
source: https://reactbits.dev/llms.txt
sources:
  - https://reactbits.dev/llms.txt
  - https://reactbits.dev/get-started/mcp
  - https://github.com/lucasmarkes/hairline
  - https://hairline.lucasmarkes.com
up: "[[Design Resources]]"
---

# Component and Motion Libraries - React Bits and Hairline

> [!summary] Summary
> - **React Bits:** open-source animated React components (text animations, backgrounds, micro-interactions), installable per component through the shadcn or jsrepo CLI, with an MCP through the shadcn MCP server.
> - **Hairline:** 33 isometric line figures that answer the pointer (React + vanilla DOM, zero dependencies, MIT). Several map almost one-to-one onto Reeve's story (vault, padlock, terminal, branches, hub).
> - Neither is installed yet.

## React Bits

- "An open source collection of memorable UI elements: Components, Animations, Backgrounds, Text Animations, and Micro interactions" (reactbits.dev).
- Four variants per component: JS + CSS, JS + Tailwind, **TS + CSS**, TS + Tailwind. Dependencies vary by component (e.g. `gsap`, `motion`, `three`, `ogl`); check them before use.
- Install one component:

```bash
npx shadcn@latest add https://reactbits.dev/r/SplitText-TS-CSS
```

- **MCP:** React Bits plugs into the **shadcn MCP server**. Add this registry to `components.json`, then set up the shadcn MCP for the client:

```json
{ "registries": { "@react-bits": "https://reactbits.dev/r/{name}.json" } }
```

- Use for Reeve's landing: animated headline reveals, grain/gradient or aurora backgrounds, magnetic buttons, counters for the live numbers.

## Hairline

- "Thirty-three isometric line figures that answer the pointer. For React and for anything with a DOM." (README; the repository description still says six).
- Install:

```bash
npm i @lucasmarkes/hairline
```

- Or with shadcn (adds a wrapper reading theme tokens): `npx shadcn@latest add https://hairline.lucasmarkes.com/r/hairline.json`.
- React: `import { Terrain } from "@lucasmarkes/hairline/react"`. Vanilla: `terrain(el, { play: true })` with `update()` / `destroy()`.
- Every figure fills its parent at **5:4**. Options: `intensity` (0–1), `theme` (`auto`/`light`/`dark`), `label`, `onRead`, `play`.
- Theme via CSS variables: `--hairline-plate`, `--hairline-hi`, `--hairline-edge`, `--hairline-mid`, `--hairline-lo`, `--hairline-stroke`. **Set `--hairline-plate` to the section background** (e.g. `#001F3F` ink).
- Respects `prefers-reduced-motion`; all figures share one `requestAnimationFrame` loop that sleeps off-screen.
- Agent skill to create new figures in the same style: `npx skills add lucasmarkes/hairline` (`hairline-create`).

### Hairline figures mapped to Reeve

| Reeve idea | Figure | Why it fits |
|---|---|---|
| Keyless agents (broker holds keys) | `vault` | A vault door with a dial and bolts |
| Owner passkey approval | `padlock` | The shackle lifts as the pointer approaches |
| Agent glass box | `terminal` | A terminal whose history scrolls with the pointer |
| SOP → code (Builder compiles) | `format` | Crooked lines snap square as the formatter runs |
| Builder → Auditor → Owner flow | `relay` / `branches` | A path lighting hop by hop / a branch merging back |
| Connectors (Composio, rails) | `hub` | Tiles on links around a hub |
| Sandboxes (one job per microVM) | `cabinet` | A rack of blades sliding out |
| Regression tests on rule changes | `rebuild` | Dependents rise after the changed package |
| Receipts stacking into the ledger | `stack` | Frames lifting to reveal one |
| KPI monitor | `plot` | Bars lifting and dropping back |
| Payment rails / plug-in providers | `plug` | A plug drawn toward a socket |

## Related
- Up: [[Design Resources]]
- [[Agent Skills - genjutsu and motionmaxxing]]: the skills that would assemble these into the landing page and film
