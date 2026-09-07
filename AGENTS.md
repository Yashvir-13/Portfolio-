<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Yashvir's Portfolio / Living Archive Context

## 1. Project Overview
This project is a dynamic, cinematic portfolio known as the "Living Archive". The design aesthetic is "dreamlike + melancholic + uncanny + cinematic + intimate + analogue". It features heavy use of monochrome styling, subtle CSS animations (fade-ins, drift-ups, reveal-image), and stark typography (Courier New / Mono fonts).

## 2. Technology Stack
- **Framework:** Next.js 16.3.4 (Canary) with Turbopack.
- **Database:** Neon Serverless Postgres (`@neondatabase/serverless`).
- **Auth:** `iron-session` with Next.js cookies for the `/control` admin dashboard.
- **Styling:** CSS Modules (`.module.css`) and global CSS variables (`globals.css`).

## 3. Architecture & Rules
- **Database Connection:** Always use `lib/db/index.js` to get the database client (`getDb()`). The client uses a singleton cache pattern to prevent connection timeouts (`UND_ERR_CONNECT_TIMEOUT`) in Next.js development. **Never** import `lib/db/index.js` in Client Components.
- **Content Management:** The site is driven by a custom CMS located at `/control`. Content is stored in the `content` table (schema: id, slug, type, title, body, status, created_at, hero_image, source, external_id).
- **Media:** We do not use Cloudflare R2 or native uploads. External images/videos (Google Drive, Imgur, etc.) are pasted directly as URLs into the `hero_image` field.
- **Network Glitches:** If the Next.js dev server starts throwing `TypeError: fetch failed` connecting to the database, it usually means the Neon HTTP client pool was exhausted because the singleton cache in `lib/db` was removed, or WSL is blocking the connection.
