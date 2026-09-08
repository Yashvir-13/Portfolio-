# Adversarial Stress Test & Challenge Report

**Target:** Milestone 1 Visual & Architectural Implementation  
**Agent:** `challenger_1` (Empirical Challenger)  
**Date:** 2026-09-08T13:58:00Z  
**Target Files:** `app/page.js`, `app/page.module.css`, `app/globals.css`, `components/Navigation.js`, `components/Navigation.module.css`

---

## Challenge Summary

**Overall Risk Assessment:** **LOW** (Approved with minor constructive observations)

The visual and fallback implementation delivered by `worker_m1` successfully addresses the defects identified in the visual review reference (`portfolio_visual_review_1788861244469.webp`) and `portfolio_design_context.md`. The fallback architecture is resilient against unseeded databases, network latency, and null image attributes. Contrast ratios have been elevated above WCAG 2.1 AA standards while maintaining the quiet, analogue aesthetic.

---

## Challenges

### [Medium] Challenge 1: Navigation Row Squeeze in Narrow Tablet Viewports (769px–840px)
- **Assumption Challenged:** Navigation links fit cleanly on all viewports above the mobile breakpoint without line wrapping or truncation.
- **Attack Scenario:**
  - Viewport width set to `810px` (e.g. 10.2" iPad portrait) or `820px` (iPad Air portrait).
  - The `@media (max-width: 768px)` media query is inactive.
  - Navigation renders as an 8-item flex row (`.navList`) with `padding: 3rem 4rem` (total horizontal padding: 128px) and `gap: 3rem` (48px per gap).
  - 8 text labels in Courier New uppercase with `0.15em` letter-spacing consume ~375px.
  - 7 gaps of 48px consume 336px.
  - Total required width: `128px + 375px + 336px = 839px`.
  - Available width on an 810px viewport: `810px - 128px = 682px`.
  - Deficit: ~157px.
- **Blast Radius:**
  - In flexbox without `flex-wrap: wrap`, multi-word items like "NOT YET" wrap into two stacked lines or the rightmost link ("ABOUT") is pushed toward the optical margin.
- **Mitigation:**
  - Adjust `.navList` in tablet range:
    ```css
    @media (min-width: 769px) and (max-width: 900px) {
      .nav { padding: 2rem 2.5rem; }
      .navList { gap: 1.5rem; }
    }
    ```
    Alternatively, raise the mobile hamburger breakpoint from `768px` to `860px`.

---

### [Low] Challenge 2: Mobile Menu Vertical Clamping on Ultra-Short Viewports (<600px height in landscape)
- **Assumption Challenged:** The open mobile menu fits within any screen viewport.
- **Attack Scenario:**
  - Mobile phone rotated to landscape (e.g. 667x375 or 844x390).
  - User opens mobile navigation (`INDEX`).
  - 8 items at `font-size: 0.85rem` with `gap: 2rem` require ~500px–576px vertical space.
  - On a viewport with height < 500px, bottom items ("NOT YET", "ABOUT") are placed outside the viewport.
- **Blast Radius:**
  - In landscape orientation on small mobile devices, lower navigation links may be clipped if scrolling is unconfigured.
- **Mitigation:**
  - Add `max-height: 80vh; overflow-y: auto;` to `.navList.open` in `@media (max-width: 768px)`.

---

### [Low] Challenge 3: Global `.bleed-full` Utility Mobile Behavior
- **Assumption Challenged:** Bleed utility classes do not induce horizontal scroll on mobile devices.
- **Attack Scenario:**
  - `globals.css` declares `.bleed-full { width: 110vw; margin-left: -5vw; }` without a responsive media query override.
- **Blast Radius:**
  - If `.bleed-full` is used in a container that lacks `overflow: hidden`, it would generate a 5vw horizontal scrollbar on mobile browsers.
- **Empirical Finding:**
  - Neither `app/page.js` nor any existing page uses `.bleed-full`. The landing page shots define their own scoped bleed classes (`.shot02Image`, `.asteriaVisual`) which include explicit `@media (max-width: 768px)` resets (`width: 100vw; left: 0; right: 0;`).
  - Furthermore, `html, body` has `overflow-x: hidden;` and `.container` has `overflow: hidden;`.
  - Zero horizontal overflow occurs on the live site.
- **Mitigation:**
  - Add standard mobile safeguard in `app/globals.css`:
    ```css
    @media (max-width: 768px) {
      .bleed-full { width: 100%; margin-left: 0; }
    }
    ```

---

## Stress Test Results

| # | Stress Scenario | Expected Behavior | Observed / Computed Behavior | Status |
|---|-----------------|-------------------|------------------------------|--------|
| 1 | **Database Offline / Timeout** (`Promise.all` rejection in `app/page.js`) | Catches error, falls back to curated static assets without crashing | `try...catch` activates; all 10 shots render using curated fallbacks; 0 crashes | **PASS** |
| 2 | **Unseeded Database** (`getPublishedContent` returns empty array `[]`) | Renders complete 10-shot narrative structure with local imagery | Curated objects activate for project, film, writing, photos, notes, and not-yet | **PASS** |
| 3 | **Null `hero_image` in DB Records** | Graceful fallback to `public/images/` assets | `hero_image || '/images/...'` fallback resolves to valid files | **PASS** |
| 4 | **Fallback Asset Existence** (`sky.jpg`, `fathom.png`, `fire.jpg`, `tree.jpg`) | All referenced local assets exist on disk in `public/images/` | All 4 files confirmed present (sizes: 170KB, 2.2MB, 163KB, 418KB) | **PASS** |
| 5 | **Image Tag Resiliency** | No broken images; `alt` text provided; correct aspect ratios | Native `<img>` tags use `object-fit: cover` and non-empty `alt` attributes | **PASS** |
| 6 | **Mobile Viewport (<768px)** | No horizontal scrollbars; layout stacks cleanly; mobile toggle works | `.container` and `html,body` clip overflow; shots reset to 100vw; mobile toggle functions | **PASS** |
| 7 | **Ultra-Wide Viewport (>1920px, 4K)** | Hero title scales responsively without unbounded explosion | `clamp(5rem, 20vw, 18rem)` caps title at 288px; max-widths prevent excessive line lengths | **PASS** |
| 8 | **Resting Navigation Contrast Ratio** (`opacity: 0.65` vs `#0e0d0b`) | Exceeds WCAG 2.1 AA normal text standard (4.5:1) | Effective contrast computed at **6.43 : 1** (or **5.46 : 1** with difference blend) | **PASS** |
| 9 | **Analogue Mood Preservation** | Contrast increase does not introduce generic SaaS appearance | Monospace, bone-white `#e0ddd7`, uppercase tracking, difference blend preserve aesthetic | **PASS** |
| 10 | **Tablet Navigation Row Spacing (769px-840px)** | 8 links fit within viewport width | Requires 839px vs ~682px available width; potential text squeeze on portrait tablets | **WARN** (Non-blocking) |

---

## Contrast & Accessibility Verification Matrix

- **Background:** `#0e0d0b` (RGB: 14, 13, 11) → Relative Luminance: `0.00405`
- **Foreground:** `#e0ddd7` (RGB: 224, 221, 215)
- **Resting Opacity 0.65 Blended Color:** `#979490` (RGB: 151, 148, 144) → Relative Luminance: `0.29774`
- **Calculated Resting Contrast Ratio:**
  $$\text{CR} = \frac{0.29774 + 0.05}{0.00405 + 0.05} = \frac{0.34774}{0.05405} = 6.43 : 1$$
- **WCAG 2.1 AA Normal Text Requirement:** $\ge 4.5 : 1$ (**PASS**)
- **WCAG 2.1 AA Large Text Requirement:** $\ge 3.0 : 1$ (**PASS**)
- **Hover Opacity 0.90 Blended Contrast Ratio:** $\sim 11.5 : 1$ (**PASS**)
- **Prior Opacity 0.30 Contrast Ratio:** $\sim 2.22 : 1$ (**FAIL - REMEDIATED**)

---

## Unchallenged Areas

- **Control Room Admin Authentication (`/control`):** Intentionally excluded as this milestone focuses strictly on the public Living Archive portfolio landing page visual alignment.
- **Production CDN Network Ingestion:** CDN cache headers were not tested in the local development environment.
