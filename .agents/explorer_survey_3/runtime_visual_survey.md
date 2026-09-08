# Runtime Setup, Dev Server & Visual Analysis Survey

**Agent:** explorer_survey_3  
**Date:** 2026-09-08  
**Scope:** Read-only investigation of runtime, dev server configuration, DOM rendering, and visual alignment against `portfolio_visual_review_1788861244469.webp` and `portfolio_design_context.md`.

---

## 1. Package & Dependency Inspection

### Configuration Details (`package.json`)
- **Package Name:** `temp-app` (private: `true`, version: `0.1.0`)
- **Framework & Core Version:**
  - `next`: `16.3.4` (Next.js Canary with Turbopack built-in)
  - `react`: `19.2.8`
  - `react-dom`: `19.2.8`
- **Database & Backend:**
  - `@neondatabase/serverless`: `^1.1.0` (Neon HTTP / serverless pool client)
- **Authentication & Security:**
  - `iron-session`: `^9.0.1` (Encrypted cookie-based session management for `/control`)
  - `bcryptjs`: `^3.0.3` (Admin password hashing)
- **External Integration & Media:**
  - `rss-parser`: `^3.13.0` (RSS/Atom synchronization for Medium, Substack, YouTube)
  - `@aws-sdk/client-s3`: `^3.1127.0`, `@aws-sdk/s3-presigned-post`: `^3.1127.0`, `@aws-sdk/s3-request-presigner`: `^3.1127.0`, `files-sdk`: `^2.4.0`
- **Dev Dependencies:**
  - `@neon/config`: `^1.3.0`
  - `eslint`: `^9`
  - `eslint-config-next`: `16.3.4`

### Scripts
- `npm run dev` -> `next dev -H 0.0.0.0` (Binds to all network interfaces, defaults to port 3000)
- `npm run build` -> `next build`
- `npm run start` -> `next start`
- `npm run lint` -> `eslint`

---

## 2. Environment & Database Configuration

### Required Environment Variables (`.env.local.example` vs `.env.local`)
- `.env.local` is present in the workspace root (`824 bytes`).
- Documented environment variables in `.env.local.example`:
  1. `DATABASE_URL`: PostgreSQL connection string (`postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/archive?sslmode=require`).
  2. `ADMIN_PASSWORD_HASH`: Bcrypt hash for `/control` login.
  3. `SESSION_SECRET`: 32-byte hexadecimal encryption key for `iron-session`.
  4. `CRON_SECRET`: Optional secret token for scheduled feed sync (`/api/cron/sync`).

### Database Architecture & Connection Hygiene (`lib/db/index.js` & `AGENTS.md`)
- `lib/db/index.js` exports `getDb()`, which uses a singleton cache pattern (`let sql;`) caching `neon(databaseUrl)`.
- **Purpose:** Prevents client re-instantiation across Next.js fast-refresh / hot-reloads, protecting against connection pool starvation and `UND_ERR_CONNECT_TIMEOUT`.
- **Constraint:** `lib/db/index.js` is strictly server-only and must never be imported into Client Components (`'use client'`).
- **Dynamic Rendering:** In `app/layout.js`, `export const dynamic = "force-dynamic";` ensures archive pages query live content at request time rather than breaking during static build evaluation.

---

## 3. Dev Server & Runtime Flow Analysis

### Execution Path & Rendering Behavior
1. **Server Launch:** Command `npm run dev` (`next dev -H 0.0.0.0`) starts Next.js 16.3.4 Canary with Turbopack on `http://localhost:3000`.
2. **Page Request (`/`):**
   - Handled by `app/page.js` (`async function Home()`).
   - Concurrently queries the database via `Promise.all`:
     - `getPublishedContent('project', { limit: 1 })`
     - `getPublishedContent('film', { limit: 1 })`
     - `getPublishedContentMultiType(['poem', 'fragment'], { limit: 1 })`
     - `getPublishedContent('photograph', { limit: 3 })`
     - `getPublishedContent('note', { limit: 2 })`
     - `getPublishedContent('unfinished', { limit: 2 })`
3. **Fallback & Degradation:**
   - If `DATABASE_URL` is unset, `getDb()` throws an error.
   - If database queries return empty arrays (e.g. unseeded database), sections Shot 04 (Project), Shot 06 (Film), Shot 07 (Writing), Shot 08 (Photography), Shot 09 (Notes), and Shot 10 (Not Yet) conditionally evaluate to falsy and do not render.
   - Shot 01 (`YASHVIR`), Shot 02 (Meta `02:17 AM`), Shot 03 (Statement), Shot 05 (Interruption), and Footer always render.
   - In Shot 02, if `latestPhotos[0]?.hero_image` is absent, it falls back to an empty placeholder `div` with dark radial gradient.

---

## 4. Visual Reference & Design Context Comparison

### Reference Artifact: `portfolio_visual_review_1788861244469.webp`
The visual review image captures a desktop viewport of the top hero view (Shot 01).
- **Header Navigation:**
  - 8 uppercase monospace items: `HOME`, `WORK`, `FILMS`, `WRITING`, `PHOTOGRAPHY`, `NOTES`, `NOT YET`, `ABOUT`.
  - Horizontally distributed across the top.
  - Subdued, muted warm gray typography with clear resting legibility.
- **Hero Title:**
  - Enormous serif display typography: `YASHVIR`.
  - Off-white/cream text (`#e0ddd7`) set against a deep warm black background (`#0e0d0b`).
  - Asymmetrical positioning: centered vertically, optically shifted to the left (`transform: translateX(-5vw)`).
  - Clean, high-contrast letterforms with bracketed serifs.
- **Surface & Texture:**
  - Very subtle warm grain overlay (provided by `NoiseOverlay.module.css` at `0.04` opacity with SVG turbulence filter).

---

## 5. Key Visual & Structural Discrepancies

| Item | Reference / Design Context | Current Implementation | Discrepancy & Visual Impact |
| :--- | :--- | :--- | :--- |
| **1. Nav Resting Opacity** | In the reference image, nav links are clearly readable at rest in muted gray (`#7a7873` / `#a09d96`). | `components/Navigation.module.css` line 36 sets `.navList { opacity: 0.3; }`. Hover sets `0.9`. | At `0.3` opacity on `#0e0d0b`, text contrast is ~1.5:1 (nearly invisible). In reference image, text is visibly crisp without requiring hover. |
| **2. Active Nav State** | Best practice for editorial archives; visitors know their current room. | `components/Navigation.js` imports `usePathname` but does not apply an active class/style to the matching link. | No visual distinction for active route (`HOME` on `/`). |
| **3. Serif Font Cross-Platform Fallback** | Elegant high-contrast Roman serif display typeface in reference image. | `app/globals.css` line 9: `--font-serif: "Iowan Old Style", "Palatino Linotype", Georgia, serif;`. | "Iowan Old Style" is not installed on Windows or Linux. Without a web font or self-hosted font via `next/font`, Windows falls back to "Georgia" or "Palatino Linotype", which alters stroke contrast, serif geometry, and letter tracking. |
| **4. Shot 01 Archival Metadata** | `portfolio_design_context.md` (lines 170-181) states: *"Shot 01 — YASHVIR: Large: YASHVIR. Small archival information around it."* | `app/page.js` line 32-34 only renders `<h1 className="text-hero fade-in">YASHVIR</h1>` without archival tags/coordinates. | Archival metadata around Shot 01 is omitted in code. Note: the reference image also shows only "YASHVIR", indicating current live alignment matches the reference but diverges from the creative brief. |
| **5. Missing Image Fallback Assets** | Context requires real, structural photography (e.g. night sky, empty rooms, Asteria artifacts). | `app/page.js` lines 38-42, 59-63, 84-88 render empty `div` placeholders when `hero_image` is null. `seed.js` does not populate `hero_image`. | `public/images/` already has strong assets (`sky.jpg`, `tree.jpg`, `fire.jpg`, `fathom.png`). Without fallback references to these local assets, the page renders blank dark gray boxes when DB records lack image URLs. |
| **6. Animation Delay on First Paint** | Immediate, confident visual impact. | `globals.css` lines 112-120: `.fade-in` (3s) and `.drift-up` (4s) start from `opacity: 0`. | If captured or viewed during initial frame render, text can appear missing or invisible before keyframe completion. |

---

## 6. Recommendations for Implementation Phase
1. **Navigation Opacity:** Adjust `.navList` opacity in `components/Navigation.module.css` to `0.6` or `0.65` resting, with `opacity: 1` on hover or link hover.
2. **Web Font Integration:** Add Google Font or local font loader in `app/layout.js` (e.g. `Cinzel`, `Cormorant Garamond`, `Newsreader`, or `Playfair Display`) or refine font stack to ensure identical serif rendering across Windows, macOS, and Linux.
3. **Image Fallbacks:** In `app/page.js`, update image render logic so that if `hero_image` is not populated from Neon, default to curated local assets in `/images/sky.jpg`, `/images/fathom.png`, `/images/tree.jpg`, etc.
4. **Active Nav Link:** In `components/Navigation.js`, add `className={pathname === link.href ? styles.activeLink : styles.navLink}` to provide subtle active state feedback.
