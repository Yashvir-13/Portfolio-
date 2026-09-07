-- V2 Living Archive — Neon PostgreSQL Schema
-- Run this against your Neon database to initialize the archive.

-- =============================================================================
-- CONTENT
-- =============================================================================

CREATE TABLE IF NOT EXISTS content_items (
  id              SERIAL PRIMARY KEY,
  title           TEXT NOT NULL,
  slug            TEXT NOT NULL,
  source          TEXT NOT NULL DEFAULT 'native',   -- native | medium | substack | youtube
  type            TEXT NOT NULL,                     -- project | film | video | poem | essay | note | photograph | fragment | unfinished
  external_id     TEXT,                              -- RSS GUID, YouTube video ID, etc.
  date            TIMESTAMPTZ,
  excerpt         TEXT,
  body            TEXT,
  thumbnail       TEXT,                              -- URL to thumbnail image
  hero_image      TEXT,                              -- URL to hero/full image
  canonical_url   TEXT,
  tags            TEXT[] DEFAULT '{}',
  featured        BOOLEAN DEFAULT false,
  hidden          BOOLEAN DEFAULT false,
  status          TEXT DEFAULT 'draft',               -- draft | published | archived
  display_order   INTEGER DEFAULT 0,
  metadata        JSONB DEFAULT '{}',                -- source-specific structured data
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Slug uniqueness: public slugs cannot collide across ANY source for the same type.
-- Two items of different types CAN share a slug (e.g., /work/asteria and /notes/asteria).
CREATE UNIQUE INDEX IF NOT EXISTS idx_content_slug_type ON content_items (slug, type);

-- External ID uniqueness: only enforced when external_id is NOT NULL.
-- Native content has NULL external_id and is not subject to this constraint.
CREATE UNIQUE INDEX IF NOT EXISTS idx_content_external_id ON content_items (source, external_id)
  WHERE external_id IS NOT NULL;

-- Query indexes
CREATE INDEX IF NOT EXISTS idx_content_status ON content_items (status);
CREATE INDEX IF NOT EXISTS idx_content_type ON content_items (type);
CREATE INDEX IF NOT EXISTS idx_content_source ON content_items (source);
CREATE INDEX IF NOT EXISTS idx_content_featured ON content_items (featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_content_date ON content_items (date DESC NULLS LAST);


-- =============================================================================
-- MEDIA (stored in Cloudflare R2)
-- =============================================================================

CREATE TABLE IF NOT EXISTS media (
  id          SERIAL PRIMARY KEY,
  filename    TEXT NOT NULL,
  url         TEXT NOT NULL,                         -- public URL (R2 or media.yashvir.me)
  r2_key      TEXT NOT NULL,                         -- R2 object key for deletion
  alt_text    TEXT,
  mime_type   TEXT,
  size_bytes  INTEGER,
  width       INTEGER,                               -- image dimensions for layout/placeholders
  height      INTEGER,
  blur_hash   TEXT,                                  -- low-res blur placeholder data
  created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- =============================================================================
-- EXTERNAL SOURCES
-- =============================================================================

CREATE TABLE IF NOT EXISTS external_sources (
  id           SERIAL PRIMARY KEY,
  name         TEXT NOT NULL UNIQUE,                  -- medium | substack | youtube
  type         TEXT NOT NULL,                         -- rss | atom
  feed_url     TEXT NOT NULL,
  display_name TEXT,
  content_type TEXT,                                  -- essay | video
  enabled      BOOLEAN DEFAULT true,
  last_fetched TIMESTAMPTZ,
  last_error   TEXT,
  item_count   INTEGER DEFAULT 0,
  config       JSONB DEFAULT '{}'
);


-- =============================================================================
-- HOMEPAGE CURATION
-- =============================================================================

CREATE TABLE IF NOT EXISTS homepage_curation (
  id              SERIAL PRIMARY KEY,
  content_item_id INTEGER REFERENCES content_items(id) ON DELETE CASCADE,
  section         TEXT NOT NULL,
  display_order   INTEGER DEFAULT 0,
  visible         BOOLEAN DEFAULT true
);


-- =============================================================================
-- SETTINGS
-- =============================================================================

CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value JSONB
);


-- =============================================================================
-- AUTH: Persistent rate limiting (serverless-safe)
-- =============================================================================

CREATE TABLE IF NOT EXISTS login_attempts (
  id           SERIAL PRIMARY KEY,
  ip_address   TEXT NOT NULL,
  attempted_at TIMESTAMPTZ DEFAULT NOW(),
  success      BOOLEAN DEFAULT false
);

CREATE INDEX IF NOT EXISTS idx_login_attempts_ip_time ON login_attempts (ip_address, attempted_at);

-- Purge old login attempts (run periodically or on each check)
-- DELETE FROM login_attempts WHERE attempted_at < NOW() - INTERVAL '1 hour';
