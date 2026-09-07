import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json(
    { error: 'Native uploads are disabled. Paste an externally hosted media URL into the content editor.' },
    { status: 410 },
  );
}
