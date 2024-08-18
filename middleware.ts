import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  if (pathname === '/shop') {
    // Redirect from "/shop" to "/shop/products"
    const url = new URL('/shop/products', request.url);
    return NextResponse.redirect(url);
  };

  if (pathname === '/products') {
    // Redirect from "/product" to "/shop/products"
    const url = new URL('/shop/products', request.url);
    return NextResponse.redirect(url);
  };

  if (pathname === '/cart') {
    // Redirect from "/cart" to "/shop/cart"
    const url = new URL('/shop/cart', request.url);
    return NextResponse.redirect(url);
  };

  return NextResponse.next();
};

export const config = {
  matcher: ['/shop', '/products', '/cart'],  // Applying middleware to these routes
};
