import { NextResponse } from 'next/server';
import { Files } from 'files-sdk';
import { neon } from 'files-sdk/neon';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Initialize files-sdk with neon adapter
    // This will automatically read AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, 
    // AWS_ENDPOINT_URL_S3, and AWS_REGION from the environment
    const files = new Files({ adapter: neon({ bucket: 'media' }) });

    // Generate a unique key for the file
    const ext = file.name.split('.').pop() || 'bin';
    const uuid = crypto.randomUUID();
    const key = `uploads/${uuid}.${ext}`;

    // Read the file buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Neon Object Storage
    await files.upload(key, buffer, {
      contentType: file.type || 'application/octet-stream',
    });

    // The media bucket is configured as public_read, so we can generate the public URL directly
    // Using the endpoint from the environment
    const endpoint = process.env.AWS_ENDPOINT_URL_S3;
    if (!endpoint) {
       throw new Error('AWS_ENDPOINT_URL_S3 is not defined in the environment.');
    }
    
    // Normalize endpoint (some endpoints might end with slash, some not)
    const baseUrl = endpoint.endsWith('/') ? endpoint.slice(0, -1) : endpoint;
    const url = `${baseUrl}/media/${key}`;

    return NextResponse.json({ success: true, url, key });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload file', details: error.message }, { status: 500 });
  }
}
