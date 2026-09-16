import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isAuthPage = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register');
    const isAdminPage = req.nextUrl.pathname.startsWith('/admin');
    const isUserPage = req.nextUrl.pathname.startsWith('/user');

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/', req.url));
      }
      return null;
    }

    if (!isAuth && (isAdminPage || isUserPage)) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    if (isAdminPage && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url)); // Bukan admin? Balikin ke home
    }

    return null;
  },
  {
    callbacks: {
      authorized: () => true // We handle auth logic inside the middleware function above
    }
  }
);

export const config = {
  matcher: ['/admin/:path*', '/user/:path*', '/login', '/register']
};
