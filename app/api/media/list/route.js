import { NextResponse } from 'next/server';
import { Files } from 'files-sdk';
import { neon } from 'files-sdk/neon';

export async function GET() {
  try {
    // Initialize files-sdk with neon adapter
    const files = new Files({ adapter: neon({ bucket: 'media' }) });
    
    // List all files in the bucket
    let fileList = await files.list();
    
    // Format into URLs
    const endpoint = process.env.AWS_ENDPOINT_URL_S3;
    if (!endpoint) {
       throw new Error('AWS_ENDPOINT_URL_S3 is not defined in the environment.');
    }
    
    // Normalize endpoint (some endpoints might end with slash, some not)
    const baseUrl = endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint;
    
    let formattedList = (fileList || []).map(file => ({
      key: file.key,
      size: file.size,
      lastModified: file.lastModified,
      url: `${baseUrl}/media/${file.key}`
    }));

    // Sort by lastModified, descending (newest first)
    formattedList.sort((a, b) => {
      const dateA = a.lastModified ? new Date(a.lastModified) : new Date(0);
      const dateB = b.lastModified ? new Date(b.lastModified) : new Date(0);
      return dateB - dateA;
    });

    return NextResponse.json({ success: true, files: formattedList });
  } catch (error) {
    console.error('List media error:', error);
    return NextResponse.json({ error: 'Failed to list media', details: error.message }, { status: 500 });
  }
}
