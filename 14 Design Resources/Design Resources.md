---
aliases:
  - Design Resources hub
  - Visual references
tags:
  - design
  - reeve
  - type/hub
scraped: 2026-10-18
source: brainstorm session 2026-10-18
up: "[[Home]]"
---

# Design Resources

> [!summary] Summary
> - Every visual resource the user named for Reeve's **landing page**, **pitch deck**, **dashboard** and **demo film**: reference sites, UI pattern libraries (with MCP), component and motion libraries, agent skills, and the colour palettes.
> - Status as of 18 Oct 2026: genjutsu installed; Mobbin and ScreensDesign MCP **connected** (they load only in a new Claude session); React Bits, Hairline and motionmaxxing **not installed yet**.
> - Rule for every Reeve visual: **≥65% visual, ≤35% text** ([[Pitch Deck Brief]]).

## All resources

| Resource | Type | Used for | Status | Note |
|---|---|---|---|---|
| [newform.community](https://www.newform.community/) | Reference site | Landing hero, cover slides | Reference | [[Design Reference Sites]] |
| [codapress.co.uk](https://codapress.co.uk/) | Reference site | Glass box, terminal moments | Reference | [[Design Reference Sites]] |
| [xerx.io](https://www.xerx.io/en) | Reference site | Editorial headlines, numbered rows | Reference | [[Design Reference Sites]] |
| [agenticwebteam.com](https://www.agenticwebteam.com/) | Reference site | Agent framing, bento cards, glow | Reference | [[Design Reference Sites]] |
| [Mobbin](https://mobbin.com/) | UI pattern library + MCP | Dashboard, approval modal, timelines | MCP connected | [[UI Pattern Libraries - Mobbin and ScreensDesign]] |
| [ScreensDesign](https://screensdesign.com/mcp) | iOS screens library + MCP | Mobile passkey and approval flows | MCP connected | [[UI Pattern Libraries - Mobbin and ScreensDesign]] |
| [React Bits](https://reactbits.dev/) | Animated React components | Landing motion: text, backgrounds, micro-interactions | Not installed | [[Component and Motion Libraries - React Bits and Hairline]] |
| [Hairline](https://github.com/lucasmarkes/hairline) | Interactive isometric line figures | Landing section visuals that answer the pointer | Not installed | [[Component and Motion Libraries - React Bits and Hairline]] |
| [genjutsu](https://github.com/AThevon/genjutsu) | Agent skill (motion, design systems, whole sites) | Building the landing page | Installed (`~/.claude/skills/genjutsu`) | [[Agent Skills - genjutsu and motionmaxxing]] |
| [motionmaxxing](https://github.com/Tejashmakwana/motionmaxxing) | Agent skill (motion-graphics films) | The 2-minute demo / launch film; measured motion rules | Not installed | [[Agent Skills - genjutsu and motionmaxxing]] |
| Colour palettes (3 images) | Palette | Every surface | In vault | See below |
| Inter Tight · Instrument Serif · JetBrains Mono | Fonts (Google Fonts) | Every surface | In use (dashboard) | [[Pitch Deck Brief]] |

## Colour palettes

Three reference images in `13 visuals/ColorPalettes`. Token mapping lives in [[Pitch Deck Brief]].

![MP076 palette: Praxeti White, First Colors of Spring, Midnight Mirage, Mantis, Picture Book Green, Nuit Blanche](<../13 visuals/ColorPalettes/3ced0ed77af99743c9a5a80bb035da2b.jpg>)

![Kristian Designs palette: Black, Violet, Lime, White](<../13 visuals/ColorPalettes/68fd38288cdd386a5f85aab3dd23d347.jpg>)

![Palette 03: #ECFFB6, #D6FB00, #00545F on a grainy gradient](<../13 visuals/ColorPalettes/f7aae68bb415e1a090d69f533b712dda.jpg>)

| Token | Hex | From |
|---|---|---|
| `ink` | `#001F3F` | MP076 Midnight Mirage |
| `void` | `#000000` | Kristian Black |
| `paper` | `#F6F7ED` | MP076 Praxeti White |
| `signal` | `#C6FF33` | Kristian Lime |
| `volt` | `#D6FB00` | Palette 03 |
| `spring` | `#DBE64C` | MP076 First Colors of Spring |
| `mint` | `#ECFFB6` | Palette 03 |
| `auditor` | `#7D39EB` | Kristian Violet |
| `trust` | `#1E488F` | MP076 Nuit Blanche |
| `deep` | `#00545F` | Palette 03 |
| `green` / `mantis` | `#00804C` / `#74C365` | MP076 |

## Where each resource lands in Reeve

| Surface | Resources |
|---|---|
| Landing page | newform (hero letterform), agenticwebteam (bento + glow), xerx (editorial rows), React Bits (text and background motion), Hairline (interactive section figures), genjutsu (build), palettes |
| Pitch deck | Pitch Deck Brief + all reference sites + palettes; Mobbin/ScreensDesign for the product-slide mockups |
| Dashboard (`reeve/apps/web`) | codapress (glass box), Mobbin (dashboard and approval patterns), palettes, fonts |
| Demo film (2 min) | motionmaxxing (measured motion, gates G0–G5), Hairline figures as animated diagrams |

## Related
- Up: [[Home]]
- [[Reeve - Landing Page]]: what was built from these resources
- [[Pitch Deck Brief]] · [[Reeve - Screens Demo and MVP]] · [[Reeve - Overview]]
