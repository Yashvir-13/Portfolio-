import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session.js';

export async function POST(request) {
  const session = await getSession();
  session.destroy();
  
  return NextResponse.redirect(new URL('/control/login', request.url), { status: 303 });
}

export async function GET(request) {
  const session = await getSession();
  session.destroy();
  
  return NextResponse.redirect(new URL('/control/login', request.url), { status: 303 });
}
