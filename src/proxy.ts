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
      return NextResponse.redirect(new URL('/', req.url));
    }

    return null;
  },
  {
    secret: "f6c8d3b7e452a3b04c102a9b47cf83e9b1d35a7408f654e2d8329b31d4e0e5c8",
    callbacks: {
      authorized: () => true
    }
  }
);

export const config = {
  matcher: ['/admin/:path*', '/user/:path*', '/login', '/register']
};
