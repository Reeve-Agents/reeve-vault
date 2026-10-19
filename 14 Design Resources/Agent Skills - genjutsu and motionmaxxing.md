---
aliases:
  - genjutsu
  - motionmaxxing
tags:
  - design
  - type/page
scraped: 2026-10-18
source: https://github.com/AThevon/genjutsu
sources:
  - https://github.com/AThevon/genjutsu
  - https://genjutsu.athevon.dev
  - https://github.com/Tejashmakwana/motionmaxxing
up: "[[Design Resources]]"
---

# Agent Skills - genjutsu and motionmaxxing

> [!summary] Summary
> - **genjutsu** (installed): creative-coding skills for Claude Code: motion, design systems and whole sites, "anti-AI-slop". It proposes an interaction thesis you approve before writing code.
> - **motionmaxxing** (not installed): an agent skill that turns "AI slop" motion-graphics videos into designed films, backed by measured motion rules and scripted quality gates (G0–G5). Fits Reeve's **2-minute demo / launch film**.

## genjutsu

- Repo: `AThevon/genjutsu` (535★, pushed 5 Oct 2026). Site: https://genjutsu.athevon.dev
- Web (React, Vue, Svelte, Astro, CSS, GSAP, Motion, Three.js), Android (Jetpack Compose), Apple (SwiftUI).
- Three pipelines:

| Pipeline | Scale | Output |
|---|---|---|
| `cast` | One interface moves | An interaction thesis you approve, then the code |
| `paint` | A product's whole look | Brainstorm, visual + interaction thesis, a `MASTER.md` design system, the page |
| `bunshin` | A whole site, by a team of agents | States its cost first; millions of tokens |

- Install (already done on this machine, at `~/.claude/skills/genjutsu`):

```bash
npx skills add https://genjutsu.athevon.dev -g
```

- Use for Reeve: `paint` for the landing page (new visual universe from the deck brief), `cast` to polish the dashboard's motion.

## motionmaxxing

- Repo: `Tejashmakwana/motionmaxxing` (849★, Apache-2.0, pushed 6 Oct 2026). "Looksmaxxing for motion graphics." Early release; lives inside FinalMotion.
- Renders films with Chrome + ffmpeg (HyperFrames runtime); optional ElevenLabs key for voice, SFX and music.
- Requirements: Node 22+, Python 3, ffmpeg, Google Chrome.
- Install for Claude Code (not done yet):

```bash
git clone https://github.com/Tejashmakwana/motionmaxxing ~/.claude/skills/motionmaxxing
```

```bash
bash ~/.claude/skills/motionmaxxing/install.sh
```

### Measured motion rules (from its README; useful for the web landing too)

| Finding | Measured |
|---|---|
| Median move | 10 frames (0.33 s); entries 11–12 f, opacity 6 f, blur 7–8 f |
| Landing vs leaving | Landing decelerates (58% ease-out); leaving accelerates (37% ease-in) |
| Overshoot | Under 9% of moves, and late: a slow lean past the mark, not a fast spring |
| Arrival | Decelerates from oversize; logos crash in from about 3.5×; **nothing grows from zero** |
| Fades | Elements arrive by moving: 3,392 transform entries vs 584 opacity fades |
| Cuts | Cut on motion; 96% hard cuts |
| Dead frames | Something moves on about 99% of frames in pro moments |

### Quality gates (for the film)

| Gate | Rule |
|---|---|
| G0 | Render exists, moves, right length, audio when planned |
| G1 | Proof readable: UI text ≥ 0.04 H, fragment ≥ 0.55 W, lit, magnified by the camera |
| G2 | No run of more than 3 flat frames |
| G3 | End hold ≤ 1.4 s; final shot ≤ 25% of the film |
| G4 | One hero per frame |
| G5 | No page chrome: no corner labels, tracked-caps labels, counters, timecodes, kicker over a headline, left headline beside a card |

> [!warning] Tension with the deck brief
> G5 flags tracked-caps eyebrows and slide counters, which the [[Pitch Deck Brief]] uses (mono eyebrows, `01 / 14`). That is fine for slides and the web, but **drop them in the demo film**.

## Related
- Up: [[Design Resources]]
- [[Component and Motion Libraries - React Bits and Hairline]] · [[Reeve - Screens Demo and MVP]]
