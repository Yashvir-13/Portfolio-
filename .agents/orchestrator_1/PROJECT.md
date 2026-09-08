# Project: Living Archive Portfolio Visual Alignment

## Architecture
- **Framework:** Next.js 16.3.4 (Canary) with React 19 and Turbopack.
- **Data Flow:** Dynamic Server Components (`export const dynamic = "force-dynamic"`) querying Neon PostgreSQL via cached singleton client in `lib/db/index.js`.
- **Styling Architecture:** CSS Modules (`*.module.css`) for component/page-scoped styles, `app/globals.css` for design system tokens, typography scales, and noise/bleed utilities.
- **Aesthetic Direction:** "Composition over effects", analogue/cinematic warmth, stark contrast between monumental display serif and tiny tracked monospace, deep warm dark surfaces (`#0e0d0b`), no generic SaaS glows or marketing elements.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| F1 | Navigation Legibility & Geometry | Monospace uppercase tracked links at resting contrast matching visual reference (`0.65` opacity, tracked, difference blend mode) | M1 | Survey (spec_miner_survey_1, explorer_survey_3) |
| F2 | Hero Monolithic Title Alignment | Centered and optically balanced "YASHVIR" in high-contrast display serif with negative letter-spacing and optical edge alignment | M1 | Survey (spec_miner_survey_1, explorer_survey_2) |
| F3 | Cross-Platform Serif Typography | High-contrast display serif rendering consistently across operating systems (Iowan / Palatino / Georgia stack with fallback tuning) | M1 | Survey (explorer_survey_3, spec_miner_survey_1) |
| F4 | Curated Media & Image Fallbacks | Ensure cinematic photographic shots (Shot 02, 04, 06, 08) render curated local archive imagery from `public/images/` when DB records lack image URLs | M1 | Survey (explorer_survey_3, explorer_survey_2) |
| F5 | Negative Space & Asymmetric Pacing | Preserve and enforce generous 30vh-40vh spacing and asymmetric editorial bleeds without viewport horizontal overflow | M1 | Survey (spec_miner_survey_1, explorer_survey_2) |
| F6 | Warm Monochrome Palette & Analogue Noise | Strict compliance with `#0e0d0b` background, `#e0ddd7` foreground, `#7a7873` muted text, and subtle 0.04 noise overlay | M1 | Survey (spec_miner_survey_1) |
| F7 | Independent Multi-Agent Review & Challenge | Objective review, responsive challenge tests, and empirical verification against acceptance criteria | M2 | Project Architecture |
| F8 | Forensic Integrity Audit | Systematic checks against dummy facades, mock cheats, or hardcoded bypasses | M2 | Project Architecture |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Visual & Typography Alignment Fixes | Refine `components/Navigation.module.css`, `app/page.module.css`, `app/globals.css`, and `app/page.js` to match visual review reference and design context | none | DONE |
| M2 | Multi-Agent Verification, Stress Testing & Forensic Audit | Dispatch 2 Reviewers, 2 Challengers, and 1 Forensic Auditor for rigorous verification and gating | M1 | DONE |

### Milestone 1 & 2 Verification Summary
- **Files Modified:** `components/Navigation.module.css`, `app/page.module.css`, `app/globals.css`, `app/page.js`.
- **Reviewer 1 (Code Quality):** APPROVE.
- **Reviewer 2 (Geometry & Typography):** APPROVE.
- **Challenger 1 (Responsive & Stress Testing):** APPROVE.
- **Challenger 2 (Aesthetic Anti-Patterns):** APPROVE.
- **Auditor 1 (Forensic Integrity):** CLEAN.
- **Gate Result:** PASS.

## Interface Contracts
### `components/Navigation.js` ↔ `components/Navigation.module.css`
- Exports default `Navigation` client component.
- Uses classes: `.nav`, `.navList`, `.navItem`, `.navLink`, `.navToggle`, `.mobileMenu`.
- Must preserve difference blend mode, route hiding for `/control`, and responsive mobile toggle.

### `app/page.js` ↔ `app/page.module.css`
- Asynchronous Server Component rendering 10-shot narrative structure.
- Uses classes: `.shot01`, `.heroTitle`, `.shot02`, `.shot02Image`, `.statementShot`, `.shot04`, etc.
- Must preserve dynamic data ingestion while providing elegant local fallbacks from `public/images/`.

## Code Layout & Write Ownership
- `components/Navigation.module.css`: Owned by Worker M1.
- `components/Navigation.js`: Owned by Worker M1.
- `app/page.module.css`: Owned by Worker M1.
- `app/globals.css`: Owned by Worker M1.
- `app/page.js`: Owned by Worker M1.
- `app/layout.js`: Owned by Worker M1.
