import { NextResponse } from 'next/server';
import { getUploadUrl } from '@/lib/storage.js';
import { getSession } from '@/lib/session.js';

export async function POST(request) {
  const session = await getSession();
  if (!session.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { filename, contentType } = await request.json();

  if (!filename || !contentType) {
    return NextResponse.json({ error: 'Missing filename or contentType' }, { status: 400 });
  }

  try {
    const data = await getUploadUrl(filename, contentType);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error generating upload URL:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
