import { NextResponse } from 'next/server';
import { Files } from 'files-sdk';
import { neon } from 'files-sdk/neon';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const { filename, contentType } = await request.json();

    if (!filename) {
      return NextResponse.json({ error: 'No filename provided' }, { status: 400 });
    }

    // Initialize files-sdk with neon adapter
    const files = new Files({ adapter: neon({ bucket: 'media' }) });

    // Generate a unique key for the file
    const ext = filename.split('.').pop() || 'bin';
    const uuid = crypto.randomUUID();
    const key = `uploads/${uuid}.${ext}`;

    // Get presigned URL for upload
    const { url: uploadUrl, method, headers } = await files.signedUploadUrl(key, {
      contentType: contentType || 'application/octet-stream',
    });

    // The media bucket is configured as public_read, so we can generate the public URL directly
    const endpoint = process.env.AWS_ENDPOINT_URL_S3;
    if (!endpoint) {
       throw new Error('AWS_ENDPOINT_URL_S3 is not defined in the environment.');
    }
    
    // Normalize endpoint (some endpoints might end with slash, some not)
    const baseUrl = endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint;
    const publicUrl = `${baseUrl}/media/${key}`;

    return NextResponse.json({ success: true, uploadUrl, method, headers, publicUrl, key });
  } catch (error) {
    console.error('Presign error:', error);
    return NextResponse.json({ error: 'Failed to generate upload URL', details: error.message }, { status: 500 });
  }
}
