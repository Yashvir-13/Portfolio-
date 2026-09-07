/**
 * Unified content access layer.
 * 
 * All database queries for content live here.
 * This module is SERVER-ONLY — never import in client components.
 * 
 * The public site calls getPublished* functions.
 * The Control Room calls getAll* and mutation functions.
 */

import { getDb } from './db/index.js';

// =============================================================================
// PUBLIC QUERIES (used by the public archive pages)
// =============================================================================

/**
 * Get all published content of a given type, ordered by date descending.
 * Optionally filter by source.
 */
export async function getPublishedContent(type, { source = null, limit = 100 } = {}) {
  const sql = getDb();

  if (source) {
    return sql`
      SELECT * FROM content_items
      WHERE type = ${type}
        AND status = 'published'
        AND hidden = false
        AND source = ${source}
      ORDER BY date DESC NULLS LAST, created_at DESC
      LIMIT ${limit}
    `;
  }

  return sql`
    SELECT * FROM content_items
    WHERE type = ${type}
      AND status = 'published'
      AND hidden = false
    ORDER BY date DESC NULLS LAST, created_at DESC
    LIMIT ${limit}
  `;
}

/**
 * Get published content across multiple types (e.g., Writing = poem + essay + fragment).
 */
export async function getPublishedContentMultiType(types, { limit = 100 } = {}) {
  const sql = getDb();
  return sql`
    SELECT * FROM content_items
    WHERE type = ANY(${types})
      AND status = 'published'
      AND hidden = false
    ORDER BY date DESC NULLS LAST, created_at DESC
    LIMIT ${limit}
  `;
}

/**
 * Get a single published item by slug (and optionally type).
 * Slug uniqueness is per-type, so type is needed for unambiguous lookup.
 */
export async function getContentBySlug(slug, type = null) {
  const sql = getDb();

  if (type) {
    const rows = await sql`
      SELECT * FROM content_items
      WHERE slug = ${slug} AND type = ${type}
      LIMIT 1
    `;
    return rows[0] || null;
  }

  const rows = await sql`
    SELECT * FROM content_items
    WHERE slug = ${slug}
    LIMIT 1
  `;
  return rows[0] || null;
}

/**
 * Get featured content for the homepage.
 */
export async function getFeaturedContent() {
  const sql = getDb();
  return sql`
    SELECT ci.*, hc.section, hc.display_order as homepage_order
    FROM homepage_curation hc
    JOIN content_items ci ON ci.id = hc.content_item_id
    WHERE hc.visible = true
      AND ci.status = 'published'
      AND ci.hidden = false
    ORDER BY hc.section, hc.display_order
  `;
}

// =============================================================================
// ADMIN QUERIES (used by the Control Room)
// =============================================================================

/**
 * Get all content of a given type, including drafts and archived items.
 */
export async function getAllContent(type, { includeDrafts = true, includeArchived = false } = {}) {
  const sql = getDb();

  const statuses = ['published'];
  if (includeDrafts) statuses.push('draft');
  if (includeArchived) statuses.push('archived');

  return sql`
    SELECT * FROM content_items
    WHERE type = ${type}
      AND status = ANY(${statuses})
    ORDER BY updated_at DESC
  `;
}

/**
 * Get a single content item by ID (admin — no status filter).
 */
export async function getContentById(id) {
  const sql = getDb();
  const rows = await sql`
    SELECT * FROM content_items WHERE id = ${id} LIMIT 1
  `;
  return rows[0] || null;
}

/**
 * Get content counts grouped by type and status (for dashboard).
 */
export async function getContentCounts() {
  const sql = getDb();
  return sql`
    SELECT type, status, COUNT(*)::int as count
    FROM content_items
    GROUP BY type, status
    ORDER BY type, status
  `;
}

/**
 * Get site settings.
 */
export async function getSettings() {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS settings (
      key VARCHAR(255) PRIMARY KEY,
      value TEXT
    );
  `;
  const rows = await sql`SELECT key, value FROM settings`;
  const settings = {};
  for (const row of rows) {
    settings[row.key] = row.value;
  }
  return settings;
}

/**
 * Update site settings.
 */
export async function updateSettings(settings) {
  const sql = getDb();
  for (const [key, value] of Object.entries(settings)) {
    await sql`
      INSERT INTO settings (key, value)
      VALUES (${key}, ${value})
      ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
    `;
  }
}



/**
 * Create a new content item. Returns the created row.
 */
export async function createContent(data) {
  const sql = getDb();
  const rows = await sql`
    INSERT INTO content_items (
      title, slug, source, type, external_id,
      date, excerpt, body, thumbnail, hero_image,
      canonical_url, tags, featured, hidden, status,
      display_order, metadata
    ) VALUES (
      ${data.title},
      ${data.slug},
      ${data.source || 'native'},
      ${data.type},
      ${data.external_id || null},
      ${data.date || null},
      ${data.excerpt || null},
      ${data.body || null},
      ${data.thumbnail || null},
      ${data.hero_image || null},
      ${data.canonical_url || null},
      ${data.tags || []},
      ${data.featured || false},
      ${data.hidden || false},
      ${data.status || 'draft'},
      ${data.display_order || 0},
      ${JSON.stringify(data.metadata || {})}::jsonb
    )
    RETURNING *
  `;
  return rows[0];
}

/**
 * Update an existing content item. Returns the updated row.
 */
export async function updateContent(id, data) {
  const sql = getDb();
  const rows = await sql`
    UPDATE content_items SET
      title = COALESCE(${data.title ?? null}, title),
      slug = COALESCE(${data.slug ?? null}, slug),
      type = COALESCE(${data.type ?? null}, type),
      date = COALESCE(${data.date ?? null}, date),
      excerpt = COALESCE(${data.excerpt ?? null}, excerpt),
      body = COALESCE(${data.body ?? null}, body),
      thumbnail = COALESCE(${data.thumbnail ?? null}, thumbnail),
      hero_image = COALESCE(${data.hero_image ?? null}, hero_image),
      canonical_url = COALESCE(${data.canonical_url ?? null}, canonical_url),
      tags = COALESCE(${data.tags ?? null}, tags),
      featured = COALESCE(${data.featured ?? null}, featured),
      hidden = COALESCE(${data.hidden ?? null}, hidden),
      status = COALESCE(${data.status ?? null}, status),
      display_order = COALESCE(${data.display_order ?? null}, display_order),
      metadata = COALESCE(${data.metadata ? JSON.stringify(data.metadata) : null}::jsonb, metadata),
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING *
  `;
  return rows[0] || null;
}

/**
 * Archive a content item (soft-delete).
 */
export async function archiveContent(id) {
  return updateContent(id, { status: 'archived' });
}

/**
 * Permanently delete a content item. Use with caution — prefer archiveContent.
 */
export async function permanentlyDeleteContent(id) {
  const sql = getDb();
  const rows = await sql`
    DELETE FROM content_items WHERE id = ${id} RETURNING *
  `;
  return rows[0] || null;
}

// =============================================================================
// EXPORT (for backup / portability)
// =============================================================================

/**
 * Export all content as a JSON-serializable array.
 */
export async function exportAllContent() {
  const sql = getDb();
  return sql`
    SELECT * FROM content_items ORDER BY type, date DESC NULLS LAST
  `;
}

// =============================================================================
// EXTERNAL SOURCES (used by Control Room and feed sync)
// =============================================================================

/**
 * Get all external sources with their status.
 */
export async function getExternalSources() {
  const sql = getDb();
  return sql`SELECT * FROM external_sources ORDER BY name`;
}

/**
 * Update external source after a sync attempt.
 */
export async function updateSourceStatus(name, { lastFetched, lastError, itemCount }) {
  const sql = getDb();
  await sql`
    UPDATE external_sources SET
      last_fetched = COALESCE(${lastFetched || null}, last_fetched),
      last_error = ${lastError || null},
      item_count = COALESCE(${itemCount ?? null}, item_count)
    WHERE name = ${name}
  `;
}

/**
 * Upsert a content item from an external feed.
 * Matches by (source, external_id). Never overwrites manual curation flags.
 */
export async function upsertExternalContent(data) {
  const sql = getDb();
  const rows = await sql`
    INSERT INTO content_items (
      title, slug, source, type, external_id,
      date, excerpt, body, thumbnail, hero_image,
      canonical_url, tags, status, metadata
    ) VALUES (
      ${data.title},
      ${data.slug},
      ${data.source},
      ${data.type},
      ${data.external_id},
      ${data.date || null},
      ${data.excerpt || null},
      ${data.body || null},
      ${data.thumbnail || null},
      ${data.hero_image || null},
      ${data.canonical_url || null},
      ${data.tags || []},
      'published',
      ${JSON.stringify(data.metadata || {})}::jsonb
    )
    ON CONFLICT (source, external_id) WHERE external_id IS NOT NULL
    DO UPDATE SET
      title = EXCLUDED.title,
      date = EXCLUDED.date,
      excerpt = EXCLUDED.excerpt,
      body = EXCLUDED.body,
      thumbnail = EXCLUDED.thumbnail,
      hero_image = EXCLUDED.hero_image,
      canonical_url = EXCLUDED.canonical_url,
      tags = EXCLUDED.tags,
      metadata = EXCLUDED.metadata,
      updated_at = NOW()
    RETURNING *
  `;
  return rows[0];
}
