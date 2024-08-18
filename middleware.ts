import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (pathname === '/shop') {
    // Create a new URL object for the redirection
    const url = new URL('/shop/products', request.url);
    // Redirect to "/shop/products"
    return NextResponse.redirect(url);
  };

  // Return a default response if no redirection is needed
  return NextResponse.next();
};

export const config = {
  matcher: '/shop',  // Apply middleware only to the "/shop" route
};
