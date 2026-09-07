import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session.js';
import { checkRateLimit, logAttempt, verifyPassword } from '@/lib/auth.js';

export async function POST(request) {
  // Get IP address from headers or connection
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             '127.0.0.1';
  
  // Clean up comma-separated IPs (e.g. from Vercel)
  const clientIp = ip.split(',')[0].trim();

  // Check rate limit
  const isRateLimited = await checkRateLimit(clientIp);
  if (isRateLimited) {
    return NextResponse.json(
      { error: 'Too many failed attempts. Try again later.' },
      { status: 429 }
    );
  }

  // Parse form data
  const formData = await request.formData();
  const password = formData.get('password');

  if (!password) {
    await logAttempt(clientIp, false);
    return NextResponse.redirect(new URL('/control/login?error=missing', request.url));
  }

  // Verify password
  const isValid = await verifyPassword(password);
  
  await logAttempt(clientIp, isValid);

  if (isValid) {
    const session = await getSession();
    session.isAdmin = true;
    await session.save();
    
    return NextResponse.redirect(new URL('/control', request.url), { status: 303 });
  } else {
    return NextResponse.redirect(new URL('/control/login?error=invalid', request.url), { status: 303 });
  }
}
