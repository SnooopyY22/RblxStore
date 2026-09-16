'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-[#0f1115]/95 backdrop-blur-lg border-b border-[#2a2f3a] sticky top-0 z-50 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-900/30 group-hover:scale-105 transition-transform">
              <span className="text-gray-900 font-extrabold text-xl tracking-tighter">RS</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 tracking-wide">
                ROBLOX STORE
              </span>
              <span className="text-[10px] text-amber-500/70 tracking-widest uppercase font-semibold -mt-1">Premium Accounts</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-300 hover:text-amber-400 transition-colors font-medium text-sm tracking-wide">
              BERANDA
            </Link>
            <Link href="/#katalog" className="text-gray-300 hover:text-amber-400 transition-colors font-medium text-sm tracking-wide">
              KATALOG
            </Link>

            {session ? (
              <>
                {(session.user as any)?.role === 'ADMIN' && (
                  <Link href="/admin" className="text-amber-500 hover:text-amber-300 font-bold text-sm border border-amber-500/30 px-3 py-1.5 rounded-md hover:bg-amber-500/10 transition-colors">
                    ADMIN PANEL
                  </Link>
                )}
                {/* User Dashboard Link */}
                <Link href="/user/dashboard" className="text-gray-300 hover:text-amber-400 transition-colors font-medium text-sm tracking-wide">
                  DASHBOARD
                </Link>

                <div className="flex items-center gap-4 ml-2 pl-6 border-l border-[#2a2f3a]">
                  <div className="flex flex-col text-right">
                    <span className="text-gray-200 text-sm font-semibold">{session.user?.name || session.user?.email?.split('@')[0]}</span>
                    <span className="text-[10px] text-amber-500 uppercase tracking-wider">{(session.user as any)?.role}</span>
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="p-2 bg-[#1a1d24] hover:bg-red-900/30 hover:text-red-400 text-gray-400 rounded-lg text-sm font-medium transition-colors border border-[#2a2f3a] hover:border-red-900/50"
                    title="Logout"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3 ml-4">
                <Link
                  href="/login"
                  className="px-5 py-2.5 text-gray-300 hover:text-amber-400 text-sm font-bold transition-colors"
                >
                  MASUK
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-gray-950 rounded-md text-sm font-extrabold transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] tracking-wide"
                >
                  DAFTAR
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-amber-500 hover:text-amber-400"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-6 space-y-2 border-t border-[#2a2f3a] pt-4">
            <Link href="/" className="block text-gray-300 hover:text-amber-400 py-2 font-medium" onClick={() => setMobileOpen(false)}>
              Beranda
            </Link>
            <Link href="/#katalog" className="block text-gray-300 hover:text-amber-400 py-2 font-medium" onClick={() => setMobileOpen(false)}>
              Katalog
            </Link>
            {session ? (
              <>
                <Link href="/user/dashboard" className="block text-gray-300 hover:text-amber-400 py-2 font-medium" onClick={() => setMobileOpen(false)}>
                  Dashboard
                </Link>
                {(session.user as any)?.role === 'ADMIN' && (
                  <Link href="/admin" className="block text-amber-500 py-2 font-bold" onClick={() => setMobileOpen(false)}>
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="block w-full text-left text-red-400 py-2 font-medium mt-4 border-t border-[#2a2f3a] pt-4"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="pt-4 mt-2 border-t border-[#2a2f3a] flex flex-col gap-3">
                <Link href="/login" className="block w-full text-center text-gray-300 border border-gray-600 hover:text-white py-2.5 rounded-md font-medium" onClick={() => setMobileOpen(false)}>
                  Masuk
                </Link>
                <Link href="/register" className="block w-full text-center bg-amber-600 text-gray-950 py-2.5 rounded-md font-bold" onClick={() => setMobileOpen(false)}>
                  Daftar
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
