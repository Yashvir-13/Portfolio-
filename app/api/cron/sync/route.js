import { NextResponse } from 'next/server';
import Parser from 'rss-parser';
import { getExternalSources, upsertExternalContent, updateSourceStatus } from '@/lib/content.js';

// Revalidate every request or rely on Vercel cron
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const parser = new Parser({
  customFields: {
    item: ['media:group', 'content:encoded'],
  }
});

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export async function GET(request) {
  // In production, we should secure this with a secret token from Vercel Cron.
  const authHeader = request.headers.get('authorization');
  if (
    process.env.NODE_ENV === 'production' &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const results = [];
  const sources = await getExternalSources();

  for (const source of sources) {
    try {
      const feed = await parser.parseURL(source.feed_url);
      let newCount = 0;

      for (const item of feed.items) {
        // Construct the item data
        const externalId = item.guid || item.id || item.link;
        if (!externalId) continue;

        let thumbnail = null;
        if (source.name === 'youtube' && item['media:group']) {
          thumbnail = item['media:group']['media:thumbnail']?.[0]?.$?.url || null;
        }

        const contentData = {
          title: item.title || 'Untitled',
          slug: generateSlug(item.title || 'untitled'),
          source: source.name,
          type: source.content_type,
          external_id: externalId,
          date: item.isoDate ? new Date(item.isoDate) : new Date(),
          excerpt: item.contentSnippet || item.summary || '',
          body: item['content:encoded'] || item.content || '',
          thumbnail,
          canonical_url: item.link,
          metadata: {
            author: item.creator || item.author,
            categories: item.categories || [],
          }
        };

        await upsertExternalContent(contentData);
        newCount++;
      }

      await updateSourceStatus(source.name, {
        lastFetched: new Date(),
        lastError: null,
        itemCount: newCount
      });

      results.push({ name: source.name, status: 'success', count: newCount });
    } catch (err) {
      console.error(`Failed to sync ${source.name}:`, err);
      
      await updateSourceStatus(source.name, {
        lastFetched: new Date(),
        lastError: err.message,
        // Leave itemCount as is
      });

      results.push({ name: source.name, status: 'error', error: err.message });
    }
  }

  return NextResponse.json({ success: true, results });
}
