'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams?.get('error');

  const errorMessages: Record<string, string> = {
    'CredentialsSignin': 'Email atau password salah.',
    'SessionRequired': 'Anda harus login terlebih dahulu.',
    'default': 'Terjadi kesalahan. Silakan coba lagi.',
  };

  const message = errorMessages[error || 'default'] || errorMessages['default'];

  return (
    <main className="bg-[#0b0c10] min-h-screen flex items-center justify-center px-4">
      <div className="bg-[#13151c] border border-red-500/30 rounded-lg p-10 max-w-md w-full text-center shadow-2xl">
        <div className="text-5xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-red-400 mb-3">Autentikasi Gagal</h1>
        <p className="text-gray-400 mb-8">{message}</p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="bg-amber-500 hover:bg-amber-400 text-gray-950 font-bold py-3 px-6 rounded-md transition-all"
          >
            Coba Login Lagi
          </Link>
          <Link
            href="/"
            className="border border-gray-600 hover:border-amber-500 text-gray-300 hover:text-amber-400 font-semibold py-3 px-6 rounded-md transition-all"
          >
            Ke Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}
