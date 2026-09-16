'use client';

import ProductCatalog from '@/components/products/ProductCatalog';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/products').then(r => r.json()),
      fetch('/api/admin/categories').then(r => r.json()),
      fetch('/api/admin/games').then(r => r.json()),
    ]).then(([p, c, g]) => {
      setProducts(Array.isArray(p) ? p : []);
      setCategories(Array.isArray(c) ? c : []);
      setGames(Array.isArray(g) ? g : []);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const mappedProducts = products.map((p) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    categoryId: p.categoryId,
    gameId: p.gameId,
    image: p.images || 'https://via.placeholder.com/400x300',
  }));

  return (
    <main className="bg-[#0b0c10] min-h-screen">
      {/* Hero Banner Area */}
      <div className="relative w-full h-[60vh] flex items-center justify-center bg-[#07080a] overflow-hidden border-b border-[#1f232b]">
        {/* Background gradient & pattern */}
        <div className="absolute inset-0 z-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/70 to-[#07080a]/50"></div>
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 z-10 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <span className="px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            Verified Marketplace
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl mb-6">
            Eksplorasi Dunia <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
              Tanpa Batas
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Temukan akun sultan dan item langka dengan harga terbaik. Transaksi dijamin 100% aman, cepat, dan terpercaya.
          </p>
          <a href="#katalog" className="bg-gradient-to-b from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-gray-950 font-extrabold py-4 px-10 rounded-sm transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] flex items-center gap-3">
            LIHAT KATALOG
            <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
          </a>
        </div>
      </div>

      <div id="katalog" className="pt-4 pb-20">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-amber-400 text-lg animate-pulse">Memuat produk...</div>
          </div>
        ) : (
          <ProductCatalog 
            products={mappedProducts} 
            categories={categories} 
            games={games} 
          />
        )}
      </div>
    </main>
  );
}
