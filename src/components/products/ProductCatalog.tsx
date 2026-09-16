'use client';

import { useState } from 'react';

interface Product {
  id: string;
  title: string;
  price: number;
  categoryId: string;
  gameId: string;
  image: string;
}

interface Category {
  id: string;
  name: string;
}

interface Game {
  id: string;
  name: string;
}

export default function ProductCatalog({ products, categories, games }: { products: Product[], categories: Category[], games: Game[] }) {
  const [selectedGame, setSelectedGame] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter((p: Product) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchGame = selectedGame === 'ALL' || p.gameId === selectedGame;
    const matchCategory = selectedCategory === 'ALL' || p.categoryId === selectedCategory;
    return matchSearch && matchGame && matchCategory;
  });

  return (
    <div className="bg-[#0b0c10] text-gray-300 px-4 sm:px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-10 text-center tracking-wider text-white">
          <span className="text-amber-500">✦</span> KATALOG PRODUK <span className="text-amber-500">✦</span>
        </h2>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 max-w-4xl mx-auto">
          <div className="relative flex-1 group">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-amber-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cari akun atau item..."
              className="w-full pl-12 pr-4 py-3.5 rounded-sm bg-[#12141a] border border-[#2a2f3a] focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-colors text-white placeholder-gray-600 shadow-inner"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="py-3.5 px-4 rounded-sm bg-[#12141a] border border-[#2a2f3a] focus:outline-none focus:border-amber-500/50 w-full sm:w-56 text-gray-300 appearance-none font-medium"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="ALL">Semua Kategori</option>
            {categories.map((c: Category) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select
            className="py-3.5 px-4 rounded-sm bg-[#12141a] border border-[#2a2f3a] focus:outline-none focus:border-amber-500/50 w-full sm:w-56 text-gray-300 appearance-none font-medium"
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
          >
            <option value="ALL">Semua Game</option>
            {games.map((g: Game) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[#2a2f3a] rounded-sm bg-[#12141a]">
            <p className="text-gray-400 text-lg font-medium">Tidak ada produk yang ditemukan.</p>
            <p className="text-gray-600 text-sm mt-2">Coba ubah filter atau kata kunci pencarian Anda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product: Product) => (
              <a
                key={product.id}
                href={`/product/${product.id}`}
                className="group bg-[#15181f] rounded-sm overflow-hidden border border-[#232731] hover:border-amber-500/40 transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col"
              >
                <div className="relative w-full h-52 bg-[#0b0c10] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#15181f] via-transparent to-transparent z-10"></div>
                  <img
                    src={product.image || 'https://via.placeholder.com/400x300'}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute top-3 right-3 z-20 px-2 py-1 bg-black/60 backdrop-blur-sm border border-white/10 rounded-sm">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                      ID: {product.id.slice(-4)}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow relative z-20">
                  <h3 className="font-bold text-base text-gray-200 group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">{product.title}</h3>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Harga</span>
                    <p className="text-amber-400 font-extrabold text-lg">
                      Rp {product.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="flex-grow"></div>
                  <div className="mt-5 w-full bg-[#1a1d24] group-hover:bg-amber-600/10 border border-[#2a2f3a] group-hover:border-amber-500/30 text-gray-300 group-hover:text-amber-400 font-bold py-2.5 rounded-sm transition-colors text-center text-xs tracking-widest uppercase">
                    Lihat Rincian
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
