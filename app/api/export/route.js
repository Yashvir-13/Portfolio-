import { NextResponse } from 'next/server';
import { getAllContent } from '@/lib/content.js';
import { getSession } from '@/lib/session.js';

export async function GET(request) {
  const session = await getSession();
  
  if (!session.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const types = ['project', 'film', 'poem', 'fragment', 'photograph', 'note', 'unfinished'];
    const exportData = {};

    for (const type of types) {
      exportData[type] = await getAllContent(type, { includeDrafts: true, includeArchived: true });
    }

    return NextResponse.json(exportData, {
      headers: {
        'Content-Disposition': `attachment; filename="archive-export-${new Date().toISOString().split('T')[0]}.json"`
      }
    });
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Failed to export content' }, { status: 500 });
  }
}
