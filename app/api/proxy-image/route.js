import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return new NextResponse('Missing URL', { status: 400 });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch image');
    
    const arrayBuffer = await response.arrayBuffer();
    
    const headers = new Headers();
    headers.set('Content-Type', response.headers.get('Content-Type') || 'image/jpeg');
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    // Important: allow cross-origin requests just in case
    headers.set('Access-Control-Allow-Origin', '*');

    return new NextResponse(arrayBuffer, { headers });
  } catch (error) {
    console.error('Image proxy error:', error);
    return new NextResponse('Failed to proxy image', { status: 500 });
  }
}
