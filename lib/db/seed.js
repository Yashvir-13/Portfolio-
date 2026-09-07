/**
 * Seed script: migrates existing /content/*.json into Neon PostgreSQL.
 * 
 * Usage:
 *   node lib/db/seed.js
 * 
 * Requires DATABASE_URL in environment (use .env.local or export directly).
 * 
 * This script is idempotent — it uses ON CONFLICT to skip duplicates.
 * All secrets remain server-side (this runs in Node, not the browser).
 */

import { neon, Pool } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentDir = join(__dirname, '../../content');

async function seed() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('ERROR: DATABASE_URL not set.');
    console.error('Export it or add to .env.local before running this script.');
    process.exit(1);
  }

  const pool = new Pool({ connectionString: databaseUrl });

  console.log('🌱 Seeding archive database...\n');

  // --- Run schema ---
  const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
  try {
    await pool.query(schema);
    console.log('✓ Schema applied\n');
  } catch (err) {
    console.error('Schema application failed:', err);
    throw err;
  }

  // --- Seed projects ---
  const projects = JSON.parse(readFileSync(join(contentDir, 'projects.json'), 'utf-8'));
  for (const p of projects) {
    await pool.query(`
      INSERT INTO content_items (title, slug, source, type, date, excerpt, body, status, metadata)
      VALUES ($1, $2, 'native', 'project', $3::timestamptz, $4, $5, 'published', $6::jsonb)
      ON CONFLICT (slug, type) DO NOTHING
    `, [
      p.title,
      p.slug,
      p.year ? `${p.year}-01-01` : null,
      p.statement || null,
      p.overview || null,
      JSON.stringify({
        category: p.category,
        process: p.process,
        technical: p.technical,
        lessons: p.lessons,
        project_status: p.status,
        links: p.links || [],
      })
    ]);
    console.log(`  + Project: ${p.title}`);
  }

  // --- Seed films ---
  const films = JSON.parse(readFileSync(join(contentDir, 'films.json'), 'utf-8'));
  for (const f of films) {
    await pool.query(`
      INSERT INTO content_items (title, slug, source, type, date, excerpt, body, status, metadata)
      VALUES ($1, $2, 'native', 'film', $3::timestamptz, $4, $5, 'published', $6::jsonb)
      ON CONFLICT (slug, type) DO NOTHING
    `, [
      f.title,
      f.slug,
      f.year ? `${f.year}-01-01` : null,
      f.description || null,
      f.director_note || null,
      JSON.stringify({ duration: f.duration })
    ]);
    console.log(`  + Film: ${f.title}`);
  }

  // --- Seed writing ---
  const writing = JSON.parse(readFileSync(join(contentDir, 'writing.json'), 'utf-8'));
  for (const w of writing) {
    const writingType = (w.type || 'essay').toLowerCase();
    const contentType = writingType === 'poetry' ? 'poem'
                      : writingType === 'fragments' ? 'fragment'
                      : 'essay';
    await pool.query(`
      INSERT INTO content_items (title, slug, source, type, date, body, status, metadata)
      VALUES ($1, $2, 'native', $3, $4::timestamptz, $5, 'published', $6::jsonb)
      ON CONFLICT (slug, type) DO NOTHING
    `, [
      w.title,
      w.slug,
      contentType,
      w.year ? `${w.year}-01-01` : null,
      w.content || null,
      JSON.stringify({ original_type: w.type })
    ]);
    console.log(`  + Writing (${contentType}): ${w.title}`);
  }

  // --- Seed notes ---
  const notes = JSON.parse(readFileSync(join(contentDir, 'notes.json'), 'utf-8'));
  for (const n of notes) {
    await pool.query(`
      INSERT INTO content_items (title, slug, source, type, date, body, status)
      VALUES ($1, $2, 'native', 'note', $3::timestamptz, $4, 'published')
      ON CONFLICT (slug, type) DO NOTHING
    `, [
      n.title,
      n.slug,
      n.date ? `${n.date}-01-01` : null,
      n.content || null
    ]);
    console.log(`  + Note: ${n.title}`);
  }

  // --- Seed photography ---
  const photos = JSON.parse(readFileSync(join(contentDir, 'photography.json'), 'utf-8'));
  for (const p of photos) {
    await pool.query(`
      INSERT INTO content_items (title, slug, source, type, date, excerpt, status, metadata)
      VALUES ($1, $2, 'native', 'photograph', $3::timestamptz, $4, 'published', $5::jsonb)
      ON CONFLICT (slug, type) DO NOTHING
    `, [
      p.caption || 'Untitled',
      p.id,
      p.date ? `${p.date}-01-01` : null,
      p.caption || null,
      JSON.stringify({ location: p.location })
    ]);
    console.log(`  + Photograph: ${p.id}`);
  }

  // --- Seed not-yet ---
  const notYet = JSON.parse(readFileSync(join(contentDir, 'not-yet.json'), 'utf-8'));
  for (let i = 0; i < notYet.length; i++) {
    const item = notYet[i];
    const slug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    await pool.query(`
      INSERT INTO content_items (title, slug, source, type, date, excerpt, status, metadata)
      VALUES ($1, $2, 'native', 'unfinished', $3::timestamptz, $4, 'published', $5::jsonb)
      ON CONFLICT (slug, type) DO NOTHING
    `, [
      item.title,
      slug,
      item.year ? `${item.year}-01-01` : null,
      item.description || null,
      JSON.stringify({
        unfinished_type: item.type,
        unfinished_status: item.status,
      })
    ]);
    console.log(`  + Not Yet: ${item.title}`);
  }

  // --- Seed external sources ---
  const sources = [
    {
      name: 'medium',
      type: 'rss',
      feed_url: 'https://medium.com/feed/@yashvir.126',
      display_name: 'Medium',
      content_type: 'essay',
    },
    {
      name: 'substack',
      type: 'rss',
      feed_url: 'https://notesfromsomewhere3.substack.com/feed',
      display_name: 'Substack',
      content_type: 'essay',
    },
    {
      name: 'youtube',
      type: 'atom',
      feed_url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCKZ6HJPdIf7icHZYvmCKrow',
      display_name: 'YouTube',
      content_type: 'video',
    },
  ];

  for (const s of sources) {
    await pool.query(`
      INSERT INTO external_sources (name, type, feed_url, display_name, content_type)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (name) DO NOTHING
    `, [s.name, s.type, s.feed_url, s.display_name, s.content_type]);
    console.log(`  + Source: ${s.display_name}`);
  }

  console.log('\n✅ Seed complete.');
  await pool.end();
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
