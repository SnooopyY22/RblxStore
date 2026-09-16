import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Cek apakah user punya session cookie
  const sessionToken = req.cookies.get("next-auth.session-token")?.value 
    || req.cookies.get("__Secure-next-auth.session-token")?.value;
  const isAuth = !!sessionToken;

  const isAdminPage = pathname.startsWith('/admin');
  const isUserPage = pathname.startsWith('/user');
  const isLoginPage = pathname === '/login' || pathname === '/register';

  // Kalau sudah login tapi mau buka login/register, redirect ke home
  if (isLoginPage && isAuth) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Kalau belum login tapi mau akses admin/user, redirect ke login
  if (!isAuth && (isAdminPage || isUserPage)) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/user/:path*', '/login', '/register']
};
