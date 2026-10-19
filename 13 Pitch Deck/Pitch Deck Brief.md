---
aliases:
  - Reeve Pitch Deck
  - Deck Brief
tags:
  - pitch-deck
  - reeve
  - type/hub
scraped: 2026-10-18
source: brainstorm session 2026-10-18
sources:
  - https://www.newform.community/
  - https://codapress.co.uk/
  - https://www.xerx.io/en
  - https://www.agenticwebteam.com/
  - https://mobbin.com/
  - https://screensdesign.com/mcp
up: "[[Home]]"
---

# Pitch Deck Brief

> [!summary] Summary
> - **14 slides**: front cover + 12 content slides + back cover. **One markdown file = one slide.** Another agent turns these files into the visual slides.
> - **Hard rule: at least 65% of each slide's area is visual, at most 35% is text.**
> - Language on slides: **English**. Format: **16:9, 1920×1080**.
> - Content source: the Reeve notes in `12 Brainstorm` (start at [[Reeve - Overview]] and [[Reeve - Executive Summary]]).

## Slide order

| # | File | Job of the slide |
|---|---|---|
| 01 | [[Slide 01 - Cover]] | Name + promise |
| 02 | [[Slide 02 - Problem]] | SMEs run on WhatsApp + Excel; AI can't be trusted with money |
| 03 | [[Slide 03 - Insight]] | Agents should write code and prove it, not touch money directly |
| 04 | [[Slide 04 - Solution]] | Reeve = Builder + Auditor + Owner (maker-checker) |
| 05 | [[Slide 05 - How It Works]] | Describe → Compile → Simulate → Audit → Approve → Run |
| 06 | [[Slide 06 - Product]] | What the user actually sees (glass box, rulebook, passkey) |
| 07 | [[Slide 07 - Trust Architecture]] | Code goes to data, keyless agents, sandbox, passkey |
| 08 | [[Slide 08 - Proof Layer]] | Receipts → on-chain track record, 0G TEE, ERC-8004 |
| 09 | [[Slide 09 - Sustainability]] | Measured green SOPs, Green Auditor, Green Rewards, SDGs |
| 10 | [[Slide 10 - Market]] | Indonesian SMEs first, then any rule-based process |
| 11 | [[Slide 11 - Business Model]] | Subscription, usage, Auditor-as-a-service, partner-funded rewards |
| 12 | [[Slide 12 - Competition]] | Executes on its own × provable: Reeve top-right |
| 13 | [[Slide 13 - Status and Ask]] | What exists, the pilot, metrics, team, ask |
| 14 | [[Slide 14 - Back Cover]] | Wordmark, tagline, name origin, contact |

## The 65 / 35 rule (how to measure it)

- Measure by **area of the 1920×1080 canvas** (safe margins included).
- **Counts as text (≤35%)**: eyebrow, headline, sub-line, bullets, labels longer than 3 words, footnotes.
- **Counts as visual (≥65%)**: diagrams, product mockups, 3D/gradient objects, illustrations, icons, photos, charts, **giant display numerals or letterforms used as graphics** (e.g. a faded "01"), colour fields and gradients.
- Copy budget per slide: **headline ≤ 8 words**, **sub-line ≤ 20 words**, **max 3 bullets of ≤ 6 words**, labels ≤ 3 words. Anything longer goes in speaker notes.
- If a slide feels empty, add visual, never more text.

## Design system

### Palette (from `vault/13 visuals/ColorPalettes`)

The three reference palettes share **lime/chartreuse + a deep dark (navy/teal/black) + off-white**, with greens and a violet accent. Reeve tokens:

| Token | Hex | Source palette | Role |
|---|---|---|---|
| `ink` | `#001F3F` | MP076 "Midnight Mirage" | **Primary dark background** |
| `void` | `#000000` | Kristian "Black" | Alternative pure-black slides (cover, back cover) |
| `paper` | `#F6F7ED` | MP076 "Praxeti White" | Light slides background |
| `white` | `#FFFFFF` | Kristian "White" | Text on dark, UI cards |
| `signal` | `#C6FF33` | Kristian "Lime" | **Primary accent**: Builder, CTAs, highlights |
| `volt` | `#D6FB00` | Palette 03 | Gradient core / glow |
| `spring` | `#DBE64C` | MP076 "First Colors of Spring" | Soft lime fills on light slides |
| `mint` | `#ECFFB6` | Palette 03 | Light tint, gradient fade |
| `auditor` | `#7D39EB` | Kristian "Violet" | **Auditor / checker accent** |
| `trust` | `#1E488F` | MP076 "Nuit Blanche" | **Proof / on-chain** |
| `deep` | `#00545F` | Palette 03 | Gradient depth, secondary dark |
| `green` | `#00804C` | MP076 "Picture Book Green" | Sustainability |
| `mantis` | `#74C365` | MP076 "Mantis" | Sustainability light |

**Role colours (keep consistent on every slide):** Builder = `signal`, Auditor = `auditor`, Owner/passkey = `white` (on dark) or `ink` (on light), Proof/on-chain = `trust`, Sustainability = `green`/`mantis`.

**Contrast rules:**
- Lime (`signal`/`volt`) as **text** only on `ink`, `void`, `deep` or `trust`. On `paper`, use lime only as shapes or fills.
- On `paper`, text is `ink`. `auditor` violet is fine for large text on `paper`.
- Body text never sits on top of a grain gradient without a solid or blurred backing.

**Signature texture:** a **grainy mesh gradient** (`volt` → `deep` → `ink`, film grain 4–8%), as in palette 03 and the MP076 posters. Use it on the cover, back cover and section moments. Don't use it on every slide.

### Typography

| Use | Font (free) | Style cue |
|---|---|---|
| Display / headlines | **Inter Tight** Bold/Black (or Satoshi / General Sans) | Tight tracking, big, Newform/AgenticWebTeam-style |
| Editorial accent | **Instrument Serif** Italic | One muted italic phrase per headline, like Xerx's "*built to last.*" |
| Eyebrows, labels, data | **JetBrains Mono** (or IBM Plex Mono) | Uppercase, letter-spaced, like Codapress and the AgenticWebTeam eyebrows |

Sizes at 1920×1080: headline 88–120 px; sub-line 32–36 px; eyebrow 18–20 px mono, uppercase, +12% tracking; labels 20–24 px.

### Grid and layout

- 12-column grid, 96 px outer margin, 24 px gutter.
- Eyebrow top-left (mono), slide number top-right (mono, `01 / 14`).
- Visual takes the larger side (≥ 7 of 12 columns) or the full bleed with text overlaid in a ≤ 35% zone.

### Imagery and icons

- **Yes:** product UI mockups (dark UI, lime and violet accents), clean 3D or glass objects, isometric diagrams, giant blurred letterforms, Indonesian SME context (kos building, warung, clinic), receipt and chain motifs.
- **No:** stock photos of humanoid robots, handshake photos, clip-art, more than one accent colour fighting per slide.
- Icons: outline, 2 px stroke, rounded caps (e.g. Lucide), in `white`/`ink` with role-colour fills.

### Motion (if exported as video or web)

Subtle: gradients drift slowly, diagrams draw on in sequence, receipts "stack" into the chain. Nothing bounces.

## Reference takeaways

| Reference | What to take |
|---|---|
| [newform.community](https://www.newform.community/) | Black canvas; **giant blurred gradient letterforms** as hero visuals (violet → lime glow); bold grotesk; tiny supporting copy; green pill CTA |
| [codapress.co.uk](https://codapress.co.uk/) | Pure black; **monospace / terminal typography**; one hero object centred; restraint |
| [xerx.io](https://www.xerx.io/en) | Light editorial pages; **large serif headline with a muted italic phrase**; numbered rows separated by hairlines |
| [agenticwebteam.com](https://www.agenticwebteam.com/) | Near-black with **green glow blobs**; mono eyebrow labels; **bento cards with giant faded numbers (01, 02)**; agent-product framing ("your website, run by an AI team") |
| [mobbin.com](https://mobbin.com/) | Real product screens for UI mockup patterns (dashboards, approval modals, timelines). MCP: `mobbin` |
| [screensdesign.com](https://screensdesign.com/mcp) | Real iOS app screens and flows for the mobile passkey/approval mockup. MCP: `screensdesign` |

> [!note] MCP servers
> `mobbin` (`https://api.mobbin.com/mcp`) and `screensdesign` (`https://api.screensdesign.com/v1/mcp`) were added to Claude Code (user scope) on 18 Oct 2026. The owner completed OAuth sign-in, and both show **Connected**. Their tools load in a new Claude session. Details: [[UI Pattern Libraries - Mobbin and ScreensDesign]].

More resources (React Bits, Hairline, genjutsu, motionmaxxing) and their install status: [[Design Resources]].

## Slide file template

Every slide file uses these sections:
1. **Purpose**: what the audience should believe after this slide.
2. **On-slide copy (≤35%)**: exact text: eyebrow, headline, sub-line, bullets and labels.
3. **Visual (≥65%)**: concept, composition, elements, colour tokens, reference.
4. **Layout**: grid placement and the text-area estimate.
5. **Assets needed**: mockups, icons and data.
6. **Speaker notes**: what to say (≈ 20–40 seconds).
7. **Sources**: vault notes behind the claims.

## Content guardrails

- Mark any unverified number as a placeholder: `[NUMBER — cite source]`. Never invent market figures.
- Crypto appears only as the **proof layer** (anchoring, TEE, identity). Never "pay with crypto" for Indonesian users (Bank Indonesia prohibition).
- Food waste is an add-on, not featured.
- Stripe is the hackathon/international rail; Xendit/Midtrans are the Indonesian rails.

## Related
- Up: [[Home]]
- [[Reeve - Overview]] · [[Reeve - Executive Summary]] · [[Brainstorm]] · [[Design Resources]]
