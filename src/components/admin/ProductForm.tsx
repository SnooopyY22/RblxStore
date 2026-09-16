'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Category {
  id: string;
  name: string;
}

interface Game {
  id: string;
  name: string;
}

export default function ProductForm({ categories, games }: { categories: Category[], games: Game[] }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isNewGame, setIsNewGame] = useState(false);
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleGameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === 'OTHER') {
      setIsNewGame(true);
    } else {
      setIsNewGame(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        alert('✅ Produk berhasil ditambahkan!');
        setPreview(null);
        setIsNewGame(false);
        (e.target as HTMLFormElement).reset();
        router.refresh(); 
      } else {
        const data = await res.json();
        alert('❌ Gagal: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error(error);
      alert('❌ Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 sm:p-8 rounded-2xl border border-gray-700 text-white">
      <h2 className="text-2xl font-bold mb-6">➕ Tambah Produk Baru</h2>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Judul Produk</label>
          <input
            name="title"
            required
            placeholder="Contoh: Akun Blox Fruits Max Level"
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Kategori</label>
            <select name="categoryId" className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none">
              {categories?.map((c: Category) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Game</label>
            <select name="gameId" onChange={handleGameChange} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none">
              {games?.map((g: Game) => <option key={g.id} value={g.id}>{g.name}</option>)}
              <option value="OTHER">+ Lainnya (Ketik Sendiri)</option>
            </select>
            {isNewGame && (
              <input
                type="text"
                name="newGameName"
                required
                placeholder="Masukkan nama game baru..."
                className="w-full mt-3 px-4 py-3 bg-gray-900 border border-blue-500/50 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Harga (Rp)</label>
            <input type="number" name="price" required placeholder="150000" className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Stok</label>
            <input type="number" name="stock" required placeholder="1" className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Deskripsi Produk</label>
          <textarea
            name="description"
            rows={4}
            required
            placeholder="Deskripsi rinci mengenai akun/item..."
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none resize-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Upload Gambar</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:font-semibold file:cursor-pointer hover:file:bg-blue-500"
          />
          {preview && (
            <div className="mt-3">
              <img src={preview} alt="Preview" className="w-32 h-24 object-cover rounded-lg border border-gray-600" />
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all disabled:opacity-50 shadow-lg hover:shadow-blue-500/25 text-lg"
      >
        {loading ? '⏳ Menyimpan...' : '💾 Simpan Produk'}
      </button>
    </form>
  );
}
