# Codebase Inventory & Front-End Architecture Survey

**Explorer**: `explorer_survey_2`  
**Date**: 2026-09-08  
**Target Repository**: `d:\Projects\Portfolio`  
**Project Character**: Living Archive (Yashvir's Portfolio) — Cinematic, Analogue, Minimalist

---

## 1. Executive Summary

This codebase implements the "Living Archive" personal portfolio for Yashvir. Built on **Next.js 16.3.4 (Canary)** with React 19 and Turbopack, it embraces a design philosophy of "composition over effects", utilizing extreme negative space, stark typography pairings (expressive serif for creative/literary content, monospace for archival metadata), cinematic imagery, and asymmetrical editorial layouts.

The site is server-driven via Next.js App Router, querying a serverless PostgreSQL database hosted on **Neon** (`@neondatabase/serverless`) for dynamic archive records, while providing a `/control` CMS dashboard for content management and RSS feed ingestion.

---

## 2. Route Hierarchy & Page Architecture

### 2.1 Route Map

| Route Path | File Location | Component Type | Primary Purpose & Layout |
|------------|---------------|----------------|--------------------------|
| `/` | `app/page.js` | Server Component (async) | 10-shot cinematic narrative sequence (Hero, Photo, Statement, Work, Interruption, Film, Writing, Photography, Notes, Not Yet, Footer) |
| `/work` | `app/work/page.js` | Server Component (async) | Index of technical & creative projects with dates and categories |
| `/work/[slug]` | `app/work/[slug]/page.js` | Server Component (async) | Detailed artifact view: statement, widescreen hero visual, chapter-based breakdown (Overview, Process, Technical, Lessons) |
| `/films` | `app/films/page.js` | Server Component (async) | Cinematic list of films with 16:9 visual posters and duration metadata |
| `/films/[slug]` | `app/films/[slug]/page.js` | Server Component (async) | Cinema theater view: 2.35:1 widescreen video player/still, director notes, and description |
| `/writing` | `app/writing/page.js` | Server Component (async) | Manuscript list: poems, essays, and fragments with subtle hover hover transitions |
| `/writing/[slug]` | `app/writing/[slug]/page.js` | Server Component (async) | Reader view: generous margins, high-contrast typography, Substack/Medium sanitation fallback |
| `/photography` | `app/photography/page.js` | Server Component (async) | Contact-sheet / darkroom gallery with alternating massive (120vw), standard (70vw), and right-aligned (margin-left: 25vw) crops |
| `/notes` | `app/notes/page.js` | Server Component (async) | Personal notebook: quiet questions and observations with timestamps |
| `/notes/[slug]` | `app/notes/[slug]/page.js` | Server Component (async) | Single note reading room |
| `/not-yet` | `app/not-yet/page.js` | Server Component (async) | Unfinished projects, fragments, and experiments displayed as an archival desk |
| `/about` | `app/about/page.js` | Server Component (async) | Asymmetrical editorial bio with documentary portrait (1.5deg tilt) and dynamic settings |
| `/control/*` | `app/control/*` | Server Components & Actions | CMS dashboard for managing content, media, external RSS sources, and settings |
| `/api/*` | `app/api/*` | Route Handlers | Auth (`login`, `logout`), Feed Sync (`cron/sync`), Export (`export`), Upload (`upload`) |

### 2.2 Root Layout (`app/layout.js`)

- **Dynamic Execution**: `export const dynamic = "force-dynamic"` is explicitly declared to ensure database queries are executed at request time, decoupled from build-time network access.
- **Composition**:
  ```jsx
  <html lang="en">
    <body>
      <NoiseOverlay />
      <Navigation />
      <main>{children}</main>
    </body>
  </html>
  ```
- **Metadata**: Title: `"Yashvir — I make things to understand things"`, Description: `"Personal archive and portfolio of Yashvir."`

---

## 3. Component Architecture (`components/`)

The site is intentionally restrained in component abstractions; most page layouts and shot sections are composed directly within page route files. Only global layout overlays and interactive navigation are isolated in `components/`:

### 3.1 `components/Navigation.js` & `Navigation.module.css`
- **Type**: Client Component (`'use client'`).
- **Functionality**:
  - Automatically hidden on administrative routes via `if (pathname.startsWith('/control')) return null;`.
  - Fixed full-width header: `position: fixed; top: 0; left: 0; width: 100%; z-index: 50;`.
  - Visual treatment: `mix-blend-mode: difference;` allowing links to invert cleanly over images and light backgrounds.
  - Links: `Home`, `Work`, `Films`, `Writing`, `Photography`, `Notes`, `Not Yet`, `About`.
  - Desktop: Horizontal list with `gap: 3rem; font-family: var(--font-mono); font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.15em; opacity: 0.3;`, fading to `opacity: 0.9` on hover.
  - Mobile (≤768px): Collapses into a toggleable hamburger button labeled `"INDEX"` / `"CLOSE"`. Expanded menu stacks vertically.

### 3.2 `components/NoiseOverlay.js` & `NoiseOverlay.module.css`
- **Type**: Pure presentational Server/Client component.
- **Functionality**:
  - Full viewport fixed element: `position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; pointer-events: none; z-index: 9999;`.
  - Implements an inline SVG turbulence filter:
    `radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.25) 100%), url("data:image/svg+xml,...<feTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/>...")`
  - Subtle analogue warmth: `opacity: 0.04; mix-blend-mode: overlay;`.

---

## 4. Styling System & Visual Language

### 4.1 CSS Variables (`app/globals.css`)

```css
:root {
  /* Color Palette */
  --background: #0e0d0b;      /* Deep warm black */
  --foreground: #e0ddd7;      /* Warm off-white / bone */
  --accent-red: #732626;      /* Subdued dark wine red */
  --muted: #7a7873;           /* Archival warm grey */
  --surface: #141311;         /* Elevated surface */
  --border: #22211e;          /* Hairline border */

  /* Typography Stacks */
  --font-serif: "Iowan Old Style", "Palatino Linotype", Georgia, serif;
  --font-mono: "Courier New", Courier, monospace;
  --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
```

### 4.2 Typography Utility Classes

| Class Name | Font Family | Size / Clamp | Properties | Intended Voice |
|------------|-------------|--------------|------------|----------------|
| `.text-hero` | `var(--font-serif)` | `clamp(5rem, 20vw, 18rem)` | `line-height: 0.85; letter-spacing: -0.05em; text-transform: uppercase; margin-left: -0.05em;` | Monolithic visual anchor (e.g. "YASHVIR") |
| `.text-title` | `var(--font-serif)` | `clamp(3rem, 10vw, 8rem)` | `line-height: 0.95; letter-spacing: -0.03em;` | Section headers and project titles |
| `.text-mono` | `var(--font-mono)` | `0.6rem` | `text-transform: uppercase; letter-spacing: 0.15em;` | Technical metadata, navigational links, timestamps |
| `.text-meta` | `var(--font-mono)` | `0.55rem` | `color: var(--muted); text-transform: uppercase; letter-spacing: 0.2em;` | Archival classification, location tags, date stamps |
| `.interruption`| `var(--font-serif)` | `clamp(2rem, 5vw, 4rem)` | `font-style: italic; color: var(--muted); max-width: 900px;` | Solitary poetic or philosophical pause |

### 4.3 Layout & Bleed Utilities

- `.container`: `width: 100%; padding: 0 4rem;` (desktop), `padding: 0 2rem;` (mobile ≤768px).
- `.bleed-full`: `width: 110vw; margin-left: -5vw;` (breaks container to extend beyond screen margins).
- `.bleed-right`: `width: 80vw; margin-left: 20vw;` (asymmetrical off-center projection).
- `main`: `min-height: 100vh; position: relative; z-index: 1;`.

### 4.4 Motion & Reveal Keyframes

Animations emphasize quiet cinematic pacing rather than dynamic interface interactions:
- `.fade-in`: 3s ease-in fade (`opacity: 0 -> 1`).
- `.drift-up`: 4s ease-out subtle translate (`translateY(30px) -> translateY(0)` with opacity).
- `.reveal-image`: 2.5s curtain reveal (`clip-path: inset(100% 0 0 0) -> inset(0 0 0 0)`).
- `.cinematic-image`: `filter: grayscale(40%) contrast(1.1) brightness(0.85); transition: filter 2s ease, transform 3s ease;` hovering to full contrast (`grayscale(0%) scale(1.01)`).
- `@media (prefers-reduced-motion: reduce)`: Overrides all animation durations to 1ms and transition times to 0s.

---

## 5. Homepage Narrative Structure (`app/page.js` & `app/page.module.css`)

The homepage is organized as a 10-shot cinematic reel:

| Shot | Identifier | Layout / Visual Treatment | Asymmetry & Alignment |
|------|------------|---------------------------|-----------------------|
| **01** | Opening Room | Full viewport height (`100vh`). Centered `h1.text-hero` ("YASHVIR"). | Shifted on desktop: `transform: translateX(-5vw)` at `min-width: 1024px`. |
| **02** | Huge Photograph | `min-height: 120vh`. Massive image (`width: 85vw; height: 100vh; right: -5vw`). | Off-center right bleed; vertical rotated metadata ("02:17 AM / UNKNOWN / 2026") bottom-left. |
| **03** | Statement | `padding: 30vh 10vw`. Declaration: *"I make things to understand things."* | Right-aligned flex container (`justify-content: flex-end; text-align: right;`). |
| **04** | Selected Work | `height: 120vh`. Features latest project (e.g. Asteria). | Image on left (`left: -5vw; width: 70vw; height: 90vh;`), title floating on right (`top: 40vh; right: 5vw; z-index: 10;`). |
| **05** | Interruption | `height: 80vh`. Poetic pause: *"Some things are made because they cannot be explained."* | Centered contemplative space. |
| **06** | Cinema Still | `width: 100vw; height: 100vh;` background `#030303`. | Full-bleed film still with centered title overlay and duration/year metadata. |
| **07** | Writing | `padding: 40vh 5vw`. Large title or body excerpt from poetry/essay. | Left-aligned block (`max-width: 1200px`) with 4rem top margin for metadata. |
| **08** | Photography | Contact-sheet layout (`gap: 15vh`). | Two-column offset: Left image 60vw, right image 40vw (margin-right: 10vw). |
| **09** | Notes | Sequential observation items separated by `gap: 30vh`. | Subtle hover opacity transition (`0.7 -> 1.0`). |
| **10** | Not Yet | Two-column grid (`grid-template-columns: 1fr 3fr; gap: 5vw;`). | Left column: "NOT YET" label. Right column: list of unfinished concepts with italic excerpts. |
| **Footer** | End Marker | `padding: 20vh 5vw 5vh`. | Centered statement: *"archive currently open."* Monospace links: GitHub, LinkedIn, Contact. |

---

## 6. Content & Data Ingestion Architecture

### 6.1 Database Connection (`lib/db/index.js`)
- Uses `@neondatabase/serverless` HTTP connection pool (`neon(process.env.DATABASE_URL)`).
- Implements a strict **singleton cache** (`let sql; if (sql) return sql;`) to avoid exhausting HTTP sockets or incurring `UND_ERR_CONNECT_TIMEOUT` during rapid server-component re-renders in Next.js development.
- SERVER-ONLY: Never imported in Client Components.

### 6.2 Data Model (`lib/db/schema.sql`)
- Primary table: `content_items`
  - Columns: `id`, `title`, `slug`, `source` (`native`, `medium`, `substack`, `youtube`), `type` (`project`, `film`, `video`, `poem`, `essay`, `note`, `photograph`, `fragment`, `unfinished`), `external_id`, `date`, `excerpt`, `body`, `thumbnail`, `hero_image`, `canonical_url`, `tags`, `featured`, `hidden`, `status`, `display_order`, `metadata` (`jsonb`), timestamps.
  - Unique constraint: `UNIQUE (slug, type)`.
- Secondary tables:
  - `media`: Metadata for images/assets.
  - `external_sources`: RSS feed definitions for automated synchronization.
  - `homepage_curation`: Manual curation order and section assignments.
  - `settings`: Site-wide key-value storage (`about_text`, `profile_pic_url`, `cv_url`, `email`).

### 6.3 Content Query Layer (`lib/content.js`)
- `getPublishedContent(type, { source, limit })`: Fetches published items ordered by `featured DESC, display_order DESC NULLS LAST, date DESC NULLS LAST, created_at DESC`.
- `getPublishedContentMultiType(types, { limit })`: Queries multiple content types (e.g. `poem`, `fragment`, `essay`).
- `getContentBySlug(slug, type)`: Single record lookup.
- Homepage query concurrency: In `app/page.js`, 6 queries execute simultaneously via `Promise.all`:
  1. `getPublishedContent('project', { limit: 1 })`
  2. `getPublishedContent('film', { limit: 1 })`
  3. `getPublishedContentMultiType(['poem', 'fragment'], { limit: 1 })`
  4. `getPublishedContent('photograph', { limit: 3 })`
  5. `getPublishedContent('note', { limit: 2 })`
  6. `getPublishedContent('unfinished', { limit: 2 })`

---

## 7. Responsive Breakpoints & Cross-Device Behavior

| Breakpoint | Target Components & Adjustments |
|------------|---------------------------------|
| `> 1024px` (Desktop) | • Shot 01: `transform: translateX(-5vw);`<br>• Shot 10: 2-column grid (`1fr 3fr`)<br>• About: 2-column grid (`1fr 1.5fr`), portrait tilted `-1.5deg`<br>• Project details: 2-column grid (`1fr 2fr`) |
| `≤ 1024px` (Tablet) | • Shot 10: Stacks into 1 column (`grid-template-columns: 1fr; gap: 4rem;`)<br>• About: Stacks into 1 column, portrait tilt removed (`transform: none; width: 80%; margin: 0 auto;`)<br>• Project details: Chapter layout stacks into single column |
| `≤ 768px` (Mobile) | • Container padding reduced from `4rem` to `2rem`<br>• Navigation: Full desktop link list hidden; mobile toggle button (`INDEX`) displayed; opens vertical menu<br>• Shot 02 image: Width changed to `100vw`, `right: 0`<br>• Shot 04 Asteria visual: Width changed to `100vw`, `left: 0`, title `right: 2vw`<br>• Shot 08 Photography: `.photoLeft` and `.photoRight` become `width: 100%; margin: 0;`<br>• Photography gallery: `.massive`, `.standard`, `.right` collapse negative margins to `width: 100vw; margin-left: 0;` |

---

## 8. Discrepancies Against Visual Review Reference (`portfolio_visual_review_1788861244469.webp`)

1. **Hero Offset (`translateX(-5vw)`)**:
   - In `app/page.module.css` (lines 21–25), `.shot01 h1` has `transform: translateX(-5vw)` applied on viewports `min-width: 1024px`.
   - In the visual reference image, the title `"YASHVIR"` is horizontally centered in the composition with balanced negative space on left and right.
2. **Archival Information in Shot 01**:
   - `portfolio_design_context.md` specifies: *"Opening should be extremely sparse. Large: YASHVIR. Small archival information around it."*
   - Currently, Shot 01 contains solely the `h1` element without any small archival metadata (e.g. timestamp, coordinates, or catalog ID).
3. **Typography Fallback Risk**:
   - `--font-serif` relies on `"Iowan Old Style", "Palatino Linotype", Georgia, serif`.
   - On systems lacking Iowan Old Style and Palatino, it falls back to system Georgia, which displays wider character tracking and less condensed proportions than the reference image.
4. **Data Dependency on Homepage Shots**:
   - All shots beyond Shot 03 conditionally render only if database rows exist (`{latestProject && ...}`, `{latestFilm && ...}`, etc.). If database connection fails or tables are empty, the entire homepage collapses into just Shots 01–03 and Footer. Fallback mock skeletons or fallback content are not present.
