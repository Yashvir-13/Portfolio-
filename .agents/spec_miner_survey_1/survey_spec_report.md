# Specification Analysis & Visual Survey Report

**Document ID:** `survey_spec_report.md`  
**Agent:** `spec_miner_survey_1`  
**Date:** 2026-09-08  
**Authoritative Sources:**
1. `d:\Projects\Portfolio\ORIGINAL_REQUEST.md`
2. `d:\Projects\Portfolio\portfolio_design_context.md`
3. `d:\Projects\Portfolio\portfolio_visual_review_1788861244469.webp` (1920x982 animated review master)
4. `d:\Projects\Portfolio\AGENTS.md`
5. Live stylesheet tokens in `app/globals.css`, `app/page.module.css`, `components/Navigation.module.css`, and related room modules.

---

## Executive Summary

The "Living Archive" is a dynamic, cinematic personal archive rather than a commercial developer portfolio or standard SaaS website. Its guiding philosophy is:
> *"I make things to understand things."*  
> *"An old archive from a future that never happened."*

The visual experience is constructed around **composition over effects**, utilizing stark contrast between oversized expressive serif display typography and minuscule monospace metadata, vast negative space, deliberate asymmetry, deep warm dark surfaces, restrained dark crimson red accents, and quiet cinematic pacing.

---

## Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Navigation | Fixed Archival Nav Bar | Minimal fixed top navbar with difference blend mode, muted monospace links, and mobile index toggle | Route path, viewport width, toggle click | Persistent 8-item nav (`HOME`, `WORK`, `FILMS`, `WRITING`, `PHOTOGRAPHY`, `NOTES`, `NOT YET`, `ABOUT`) or mobile drawer | Hidden on `/control` dashboard routes | `components/Navigation.js`, `portfolio_design_context.md` |
| 2 | Atmosphere | Subtle Noise & Vignette Overlay | High-frequency SVG fractal noise grain layer (opacity 0.04) and radial vignette | Global screen dimensions | Analogue film texture across entire viewport without blocking mouse events (`pointer-events: none`) | Degrades gracefully if SVG filters unsupported | `components/NoiseOverlay.js`, `portfolio_design_context.md` |
| 3 | Typography | Expressive Serif Display Headings | Heavy, sculpted display serif for titles, declarations, and hero name | Text content, viewport clamp parameters | High-contrast monumental serif text (`Iowan Old Style`, `Palatino Linotype`, `Georgia`) | Falls back to system serif | `app/globals.css`, `portfolio_design_context.md`, `portfolio_visual_review_1788861244469.webp` |
| 4 | Typography | Archival Monospace Metadata | Minuscule tracked monospace typography for dates, coordinates, and categories | Content metadata (dates, locations, types) | 0.55rem - 0.65rem uppercase Courier text with 0.15em - 0.20em letter spacing | Falls back to system monospace | `app/globals.css`, `portfolio_design_context.md` |
| 5 | Homepage Shot 01 | Opening Hero "YASHVIR" | Vast full-viewport opening room with off-center monumental typography | Viewport height/width | Centered/asymmetric 100vh display of "YASHVIR" with optical negative left margin | None (static title display) | `app/page.js`, `portfolio_visual_review_1788861244469.webp`, `portfolio_design_context.md` |
| 6 | Homepage Shot 02 | Hero Photographic Artifact | Massive off-screen bleeding photograph establishing the archive atmosphere | `photograph` record from database | 85vw width container offset to right (-5vw), accompanied by vertical rotated metadata with motif timestamp `02:17 AM` | Fallback gradient container if no image URL present | `app/page.js`, `portfolio_design_context.md` |
| 7 | Homepage Shot 03 | Philosophical Declaration | Standalone core statement with massive negative space | Declaration string | Right-aligned, generous whitespace display: *"I make things to understand things."* | Fallback text | `app/page.js`, `portfolio_design_context.md` |
| 8 | Homepage Shot 04 | Selected Work Artifact | Feature project (e.g. Asteria) presented as an artifact rather than a case study | `project` record from database | 70vw bleeding visual container, overlapping large title, and discrete category/year meta | Fallback placeholder container | `app/page.js`, `portfolio_design_context.md` |
| 9 | Homepage Shot 05 | Editorial Interruption | Solitary pause line placed in large negative space | Prose fragment | Italic serif centered quote: *"Some things are made because they cannot be explained."* | None | `app/page.js`, `portfolio_design_context.md` |
| 10 | Homepage Shot 06 | Cinematic Film Canvas | Full-bleed film still presented like cinema projection | `film` record from database | 100vw x 100vh dark frame with subtle radial lighting and centralized metadata | Fallback dark frame container | `app/page.js`, `portfolio_design_context.md` |
| 11 | Homepage Shot 07 | Manuscript Writing Excerpt | Poetry or prose presented as a manuscript discovery | `poem` / `fragment` record | Left-aligned large serif excerpt with archival type and date metadata | Fallback title display | `app/page.js`, `portfolio_design_context.md` |
| 12 | Homepage Shot 08 | Asymmetrical Contact Sheet | Non-grid photographic arrangement with staggered scale and placement | Multiple `photograph` records | Left photo (60vw) paired with right photo (40vw offset by 10vw), accompanied by timestamp `02:17` | Skipped if fewer than 2 photographs | `app/page.js`, `portfolio_design_context.md` |
| 13 | Homepage Shot 09 | Notebook Observations | Consecutive quiet observations and reflections | `note` records | Spaced list (gap: 30vh) with uppercase note title and drifting body text | Skipped if no notes published | `app/page.js`, `portfolio_design_context.md` |
| 14 | Homepage Shot 10 | "Not Yet" Unfinished Works | Asymmetrical 2-column desk containing incomplete projects | `unfinished` records | Left header label `NOT YET`, right column containing unresolved concepts/experiments | Skipped if empty | `app/page.js`, `portfolio_design_context.md` |
| 15 | Footer | Quiet Archival Close | Minimalist understated footer | Social & contact links | Minimal text *"archive currently open."* and small monospace links | Standard static links | `app/page.js`, `portfolio_design_context.md` |
| 16 | Section Rooms | Distinct Environmental Rooms | Dedicated pages for Work, Films, Writing, Photography, Notes, Not Yet, About | Dynamic database queries per room | Specialized spatial layouts (contact sheet, manuscript, cinema frame, artifact table) | Graceful empty states | `app/[room]/page.js`, `portfolio_design_context.md` |
| 17 | Motion System | Slow Film Editing Motion | Deliberate, contemplative CSS reveals and hover transitions | CSS animation triggers, scroll positions | 2.5s-4s smooth bezier transitions (`fadeIn`, `driftUp`, `revealImage`) | Automatically disabled via `prefers-reduced-motion` | `app/globals.css`, `portfolio_design_context.md` |
| 18 | Theme Motif | Recurring Timestamp "02:17" | Rare, unexplained archival timestamp motif appearing across rooms | Metadata strings | Subtly injected timestamps (`02:17 AM / UNKNOWN / 2026`) | Unobtrusive, non-gimmick text | `portfolio_design_context.md`, `app/page.js` |

---

## Edge Cases

| # | Feature | Input | Observed Behavior |
|---|---------|-------|-------------------|
| 1 | Navigation | Narrow viewport (<768px mobile) | Navbar hides horizontal list, displays `INDEX` button. When clicked, reveals vertical stack with 2rem gap. Prevents line wrapping. |
| 2 | Navigation | Admin route (`/control/*`) | Navigation component renders `null` to avoid overlapping CMS administrative UI. |
| 3 | Hero Headline | Ultra-wide screens (1920px+) | `clamp(5rem, 20vw, 18rem)` caps the font at 18rem (~288px) while desktop media query applies `transform: translateX(-5vw)` for asymmetry. |
| 4 | Noise Overlay | Accessibility `prefers-reduced-motion` | Noise overlay remains static SVG background; all active keyframe animations drop to 1ms duration without breaking transparency. |
| 5 | Asymmetric Bleeds | Mobile viewports (<768px) | Bleed classes (`bleed-full`, `bleed-right`, negative margins) collapse to `100vw` with `margin-left: 0` to prevent horizontal document scrolling. |
| 6 | Database Images | Missing `hero_image` URL | Component falls back to dark gradient surface (`var(--surface)` / `#1a1a18`) with reveal clip-path, preserving layout stability without broken `<img>` tags. |
| 7 | Long Content | Multi-line titles / excerpts | Containers employ strict max-widths (`max-width: 900px` - `1200px`) and `overflow-wrap: break-word` to protect breathing space. |

---

## Detailed Specification Requirements

### 1. Visual Theme: "Dreamlike + Melancholic + Uncanny + Cinematic + Intimate + Analogue"

- **Core Aesthetic Conception:**
  - The portfolio must feel like a personal archive discovered late at night (specifically 2:00 AM - 3:00 AM).
  - It evokes David Lynch's dream logic (uncanny normality), Radiohead's introspective atmosphere, darkrooms, film negatives, and empty architectural spaces.
  - The visitor is exploring collected artifacts and fragments of thought, NOT a professional sales résumé.
  - It must communicate profound curiosity, memory, and observation rather than commercial achievement.

- **Strict Negative Constraints (Anti-Patterns):**
  - **NO generic SaaS styling:** Strictly avoid vibrant neon button glows, rounded pill badges, pastel gradients, purple/blue primary accents, and glassmorphism with bright borders.
  - **NO trendy digital clichés:** Strictly avoid cyberpunk tropes, matrix effects, glitch art, scanlines, CRT curvature, VHS distortion overlays, particle dust physics, and decorative AI illustrations.
  - **NO commercial portfolio patterns:** Strictly avoid card grids with standardized "icon + title + description + CTA button", testimonial carousels, skill bars, and client logo marquees.
  - **NO intrusive motion:** Strictly avoid bouncy spring easings, scroll-jacking, high-speed parallax, and aggressive hover popups.
  - **Surrealism Rule:** Surrealism MUST emerge purely from **composition, pacing, imagery scale, unusual crops, and negative space**, never from decorative digital effects.

---

### 2. Typography & Font Hierarchy

The typography architecture uses a stark dialectic between **expressive human serif** and **archival machine monospace**.

#### Font Stacks
1. **Expressive Serif (`--font-serif`):**
   ```css
   --font-serif: "Iowan Old Style", "Palatino Linotype", Georgia, serif;
   ```
   - Role: Literary, cinematic, emotional, and human voice.
   - Used for: Hero name, project titles, philosophical statements, manuscript excerpts, question titles.
2. **Archival Monospace (`--font-mono`):**
   ```css
   --font-mono: "Courier New", Courier, monospace;
   ```
   - Role: Archival classification, technical metadata, chronological coordinates.
   - Used for: Navigation links, date stamps, location tags, category markers, section indicators.
3. **Neutral Body Sans (`--font-sans`):**
   ```css
   --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
   ```
   - Role: Secondary descriptive text, reading prose.

#### Scale & Spacing Rules

| Selector / Token | Font Family | Size Specification | Line Height | Letter Spacing | Styling & Alignment |
|---|---|---|---|---|---|
| `.text-hero` / `H1` | `--font-serif` | `clamp(5rem, 20vw, 18rem)` | `0.85` | `-0.05em` | Uppercase, `margin-left: -0.05em` (optical edge alignment) |
| `.text-title` / `H2` | `--font-serif` | `clamp(3rem, 10vw, 8rem)` | `0.95` | `-0.03em` | Uppercase display |
| `.statement` | `--font-serif` | `clamp(3rem, 8vw, 6rem)` | `1.1` | `-0.02em` | Right-aligned, max-width 1000px |
| `.interruption` | `--font-serif` | `clamp(2rem, 5vw, 4rem)` | `1.2` | Normal | Italic, `color: var(--muted)`, max-width 900px |
| `.text-mono` | `--font-mono` | `0.6rem` (or `0.65rem`) | `1.4` | `0.15em` | Uppercase, tracked |
| `.text-meta` | `--font-mono` | `0.55rem` | `1.4` | `0.20em` | Uppercase, wide tracking, `color: var(--muted)` |
| Body Prose | `--font-sans` | `1.0rem` - `1.15rem` | `1.7` - `2.0` | Normal | Generous line spacing for readability |

---

### 3. Spatial Architecture: Negative Space, Asymmetry, and Section Pacing

- **Composition Over Effects:**
  - Avoid centered container templates. Every major section has unique asymmetric weighting.
  - Generous negative space gives every artifact room to breathe; sections intentionally feel almost empty.
- **Vertical Spacing & Section Sequence (Homepage "Film Cuts"):**
  1. **Shot 01 (Opening Room):** Height `100vh`. "YASHVIR" takes up the screen; desktop offset by `translateX(-5vw)`.
  2. **Shot 02 (Photographic Artifact):** Height `min-height: 120vh`, `margin-top: 10vh`. Right bleed (`right: -5vw`, `width: 85vw`). Vertical rotated metadata at bottom left.
  3. **Shot 03 (Core Statement):** Padding `30vh 10vw`. Extreme right alignment.
  4. **Shot 04 (Selected Work / Asteria):** Padding `20vh 0`. Visual element left bleed (`left: -5vw`, `width: 70vw`). Floating title placed at `top: 40vh`, `right: 5vw`.
  5. **Shot 05 (Editorial Interruption):** Height `80vh`. Solitary quiet pause.
  6. **Shot 06 (Cinema Canvas):** Padding `10vh 0`. Immense full-width frame `100vw x 100vh`.
  7. **Shot 07 (Manuscript Writing):** Padding `40vh 5vw`. Left-aligned with 4rem margin before metadata.
  8. **Shot 08 (Contact Sheet Photography):** Padding `30vh 5vw`. Asymmetric staggered dual column (`photoLeft: 60vw`, `photoRight: 40vw` shifted right `10vw`, vertical gap `15vh`).
  9. **Shot 09 (Notebook Notes):** Padding `40vh 5vw`. Sequential thought entries spaced by `30vh`.
  10. **Shot 10 (Not Yet Unfinished):** Padding `40vh 5vw 20vh`. Asymmetric 2-column grid (`1fr 3fr`, `gap: 5vw`), items separated by `15vh`.
  11. **Footer:** Padding `20vh 5vw 5vh`. Gap `5rem`, quiet departure.

---

### 4. Color Palette & Surface Variations

The site avoids both sterile cold pure black (`#000000`) and clinical bright white (`#ffffff`). It uses warm, organic darkroom tones.

| Token | Hex Value | Semantic Purpose |
|---|---|---|
| `--background` | `#0e0d0b` | Primary warm charcoal background canvas |
| `--foreground` | `#e0ddd7` | Warm antique paper off-white for primary text and titles |
| `--muted` | `#7a7873` | Subdued stone warm grey for secondary text, metadata, notes |
| `--surface` | `#141311` | Slightly lifted dark surface for placeholder cards and panels |
| `--border` | `#22211e` | Barely visible divider lines |
| `--accent-red` | `#732626` | Deep restrained crimson red for rare emphasis |
| Surface Alt 1 | `#1a1a18` | Deep warm surface for hero photography containers |
| Surface Alt 2 | `#030303` | Near-black backing for cinema projections |

- **Lighting & Glow Principles:**
  - Absolutely NO high-opacity colored glow dropshadows.
  - Very subtle radial gradient glows are restricted to center-point illumination simulating projection beams:
    `radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 80%)`.

---

### 5. Elements & Component Specifications

#### A. Navigation (`components/Navigation.js`)
- Fixed at top (`position: fixed; top: 0; left: 0; width: 100%; z-index: 50`).
- Desktop padding: `3rem 4rem`.
- Blend mode: `mix-blend-mode: difference` so links remain legible over dark images or light backgrounds.
- Base link opacity: `0.3`, transitioning to `0.9` on navigation hover.
- Font: `--font-mono`, `0.65rem`, uppercase, `letter-spacing: 0.15em`.
- Mobile treatment: Collapses into a single uppercase `INDEX` / `CLOSE` button; opens clean vertical drawer list with `2rem` spacing.

#### B. Noise Overlay (`components/NoiseOverlay.js`)
- Viewport pinned (`position: fixed; width: 100vw; height: 100vh; pointer-events: none; z-index: 9999`).
- Dual composite: Subtle radial vignette (`transparent 40%` to `rgba(0,0,0,0.25) 100%`) plus inline SVG fractal noise (`<feTurbulence baseFrequency="1.5" numOctaves="3"/>`).
- CSS settings: `opacity: 0.04`, `mix-blend-mode: overlay`.

#### C. Visual Review Reference Analysis (`portfolio_visual_review_1788861244469.webp`)
- Canvas dimensions: **1920 x 982** (desktop widescreen aspect ratio).
- Top navigation bar:
  - 8 uppercase links evenly tracked across the top: `HOME`, `WORK`, `FILMS`, `WRITING`, `PHOTOGRAPHY`, `NOTES`, `NOT YET`, `ABOUT`.
  - Monospace font with high letter tracking.
  - Off-white color with low baseline opacity.
- Hero typography:
  - Monumental "YASHVIR" centered across the viewport.
  - Classical display serif with prominent contrast between thick vertical stems and razor-thin horizontal crossbars and serifs.
  - Warm antique white tone (`#e0ddd7`) sitting on deep warm black (`#0e0d0b`).
  - Total absence of extraneous buttons ("Get in touch", "Hire me", "Download CV") or marketing banners.

#### D. Image Treatment & Frames
- Default state: Filtered with `grayscale(40%) contrast(1.1) brightness(0.85)`.
- Hover state: Transitions smoothly over `2s` - `3s` to `grayscale(0%) contrast(1.05) brightness(1)` with microscopic zoom `scale(1.01)`.
- Reveal clip-path: `animation: revealImage 2.5s cubic-bezier(0.77, 0, 0.175, 1) forwards` with `clip-path: inset(100% 0 0 0)` revealing upwards to `inset(0 0 0 0)`.

#### E. Section "Rooms" Architecture
1. **Home (`/`):** The dark room / entry archive; shot sequence 01 to 10.
2. **Work (`/work`):** Studio / laboratory table. Asymmetric list with thin borders (`1px solid var(--border)`), large project titles, and concept statements.
3. **Films (`/films`):** Cinema theater. Immense 16:9 frames with titles and durations.
4. **Photography (`/photography`):** Darkroom / contact sheets. Massive bleeding crops (`120vw`, `70vw`) and poetic, quiet captions.
5. **Writing (`/writing`):** Manuscripts. Centered editorial column (max-width 800px), serif dominance, gentle hover shift.
6. **Notes (`/notes`):** Personal notebook. Observations spaced by 20vh with large serif thought fragments.
7. **Not Yet (`/not-yet`):** Unfinished desk. Asymmetrical layout highlighting ongoing experiments, unfinished ideas, and fragments.
8. **About (`/about`):** Almost empty room. Asymmetric 2-column grid (`1fr 1.5fr`) featuring a tilted documentary portrait (`transform: rotate(-1.5deg)`), human statement, and minimal links.

---

## Acceptance Criteria for Pixel-Perfect Alignment

To verify full compliance against `portfolio_visual_review_1788861244469.webp` and the design context, any implementation must satisfy:

- [ ] **A1. Hero Typography Exactitude:**
  - The hero text reads "YASHVIR" in `--font-serif` (`"Iowan Old Style", "Palatino Linotype", Georgia, serif`).
  - Sizing scales responsively with `clamp(5rem, 20vw, 18rem)`.
  - Negative optical margin `margin-left: -0.05em` and letter-spacing `-0.05em` align with the visual review reference.
- [ ] **A2. Navigation Geometry & Styling:**
  - Desktop nav links are rendered in `--font-mono` (`"Courier New", Courier, monospace`), uppercase, tracked with `letter-spacing: 0.15em`, font size `0.65rem`.
  - Position is fixed with padding `3rem 4rem` and `mix-blend-mode: difference`.
  - Items match the canonical sequence: `HOME`, `WORK`, `FILMS`, `WRITING`, `PHOTOGRAPHY`, `NOTES`, `NOT YET`, `ABOUT`.
- [ ] **A3. Warm Monochrome Palette Compliance:**
  - Canvas background is precisely `#0e0d0b`.
  - Primary text and headings are precisely `#e0ddd7`.
  - Muted secondary copy and metadata are `#7a7873`.
  - Surface backgrounds use `#141311` / `#1a1a18` / `#030303`.
  - Restrained crimson accent `#732626` is used only where designated.
  - Zero presence of SaaS neon glows, cyan/purple drop-shadows, or white glassmorphism borders.
- [ ] **A4. Analogue Noise & Texture Layer:**
  - Viewport-fixed noise layer operates at `opacity: 0.04` with `mix-blend-mode: overlay` and `pointer-events: none`.
- [ ] **A5. Asymmetric Section Flow & Pacing:**
  - Negative vertical spaces match or exceed specifications (`30vh` - `40vh` between shots).
  - Photographic and visual blocks extend into asymmetric bleeds (`85vw`, `70vw`, `110vw`) rather than symmetrical centered cards.
- [ ] **A6. Archival Motifs & Metadata:**
  - Archival metadata tags use `.text-meta` styling (`0.55rem`, `letter-spacing: 0.2em`, uppercase).
  - Timestamp motif `02:17` / `02:17 AM` is subtly placed in archival coordinates without becoming a decorative gimmick.
- [ ] **A7. Responsive & Reduced Motion Safety:**
  - Mobile viewports (<768px) collapse navigation into `INDEX` drawer and prevent horizontal overflow from bleeding sections.
  - `prefers-reduced-motion` cleanly suppresses transitions and animation delays.
