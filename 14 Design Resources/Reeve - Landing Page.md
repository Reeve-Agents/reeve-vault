---
aliases:
  - Landing page
  - Reeve landing
tags:
  - design
  - reeve
  - type/page
scraped: 2026-10-18
source: reeve/apps/landing
up: "[[Design Resources]]"
---

# Reeve - Landing Page

> [!summary] Summary
> - Built 18 Oct 2026 in `reeve/apps/landing` (React 19, Vite 8, GSAP, React Bits, Hairline) with the genjutsu `paint` pipeline. Run it with `npm run dev -w @reeve/landing` (port 5174).
> - **Hero = a connected business flow.** Six product panels (Describe → Compile → Simulate → Audit → Approve → Run) on a tilted stage, joined by a thread that lights step by step while a camera travels between them. The loop opens on a wide shot, dives into each step, then pulls back once the kos is live.
> - **Every number is real**: the Kos Melati SOP, the 18 Oct CreateOS run log and timings (7/7, 11/11, 29/29, 3.9 s), the real ledger (#0 FAIL then PASS), and the engine's own 185 simulation events (`fixtures/kos-melati/sim-events.json`) for every room and day. See [[Reeve - Owner App PWA]] for the correction this needed.
> - Design system and theses: `reeve/apps/landing/MASTER.md`.

## How the hero got here

| Version | What it was | Verdict |
|---|---|---|
| v1 | Blurred, glowing "R" letterform (newform style) | Rejected: the audience could not tell what Reeve is |
| v2 | "Living SOP": six panels on a 3D stage joined by a flow line, camera panning | Idea approved; looked rough |
| v3 | One product window with a tabbed step list and satellites | Professional, but the tabs lost the flow |
| **Final** | v2's flow line and camera + v3's product-quality panels and Hairline icons | Built |

## Scenes

| # | Scene | Hero object | Motion |
|---|---|---|---|
| 01 | Hero | The connected flow (six panels, thread, camera) | Auto loop ~20 s, rail, pause, pointer lean |
| 02 | Problem | Collage: tenant chat, spreadsheet, calendar, agent asking for the bank login | Fragments pile in on scroll (scrub) |
| 03 | Insight | Two lanes: agent → money (broken, Hairline `Plug`) vs the maker-checker lane | Lane lights hop by hop on scroll |
| 04 | Three roles | Builder (`Branches`), Auditor (`Loupe`), Owner (`Phone`) | Reveal |
| 05 | How it works | Six panels with giant faded numerals and Hairline figures | Pinned horizontal scroll |
| 06 | Live run | Node graph (n8n style): owner chat, tenant list, payments, daily clock → Reeve with four checks → tenant messages, invoices and fees, room status, owner alerts | Each beat replays one real day along the wires; becomes a column on phones |
| 07 | On your phone | Two PWA phones: the Nov 15 summary and the fingerprint approval | Approval loops ask → fingerprint → approved, with a toast |
| 08 | Trust | Sandbox (`Cabinet`) at the centre; `Drawer`, `Vault`, `Plug` around it | Reveal |
| 09 | Proof | Real receipt, Merkle root (`Settle`), the 11-entry ledger | Blocks fill in sequence |
| 10 | Green mode | `Plot` figure + example green rules, SDG 7 and 12 | Reveal |
| 11 | Close | The R comes into focus; "reeve (n.)" definition | Scrubbed blur-to-sharp; React Bits `SplitText` |

Whole page: ScrollSmoother smooth scrolling, headline lines rising out of a mask (GSAP SplitText), reduced-motion fallback that renders every final state.

## Resources used

- [[Component and Motion Libraries - React Bits and Hairline]]: Hairline is the icon system (22 figures). React Bits: `Noise`, `Magnet`, `SplitText`.
- [[Agent Skills - genjutsu and motionmaxxing]]: genjutsu `paint` (theses, MASTER.md, tells audit). motionmaxxing's measured rules shaped the motion (arrive from oversize, nothing grows from zero).
- [[Design Reference Sites]]: agenticwebteam (faded numerals; the "Bring your own AI" hub diagram behind the live-run graph; the "Manage websites on the move" phones behind the mobile scene), xerx (serif italic phrase), newform (the R in the close).
- Dropped: the terminal-style glass box and React Bits `FaultyTerminal` (owners would find a terminal confusing), React Bits `Grainient` (rendered grey in WebGL here; replaced with a CSS gradient in the same palette) and `Counter` (digits garbled when throttled).

## Mobile first

UMKM owners mostly use a phone, so every scene is checked at 375px with no horizontal scroll. The owner app is planned as a simple PWA (installed from the browser), and the landing ships a web manifest and icon so it can be installed too.

## Open items

- The thesis preview artifact (https://claude.ai/artifact/TLGS9SoMyLg4BM4gxJ1UFw) still shows v2; the build supersedes it.
- On-chain anchoring (0G) and ERC-8004 identity are labelled "next" on the page, because they are not built yet.
- The JS bundle is about 560 KB (196 KB gzip); code-split the GSAP plugins if load time matters.

## Related
- Up: [[Design Resources]]
- [[Pitch Deck Brief]] · [[Reeve - Screens Demo and MVP]] · [[Reeve - Overview]]
