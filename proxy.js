import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session.js';

export async function proxy(request) {
  if (request.nextUrl.pathname.startsWith('/control') && 
      !request.nextUrl.pathname.startsWith('/control/login')) {
    
    const session = await getSession();
    
    if (!session.isAdmin) {
      return NextResponse.redirect(new URL('/control/login', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/control/:path*'],
};
