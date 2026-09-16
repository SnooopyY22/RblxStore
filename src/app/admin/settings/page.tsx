'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminSettingsPage() {
  const [waNumber, setWaNumber] = useState('');
  const [newGame, setNewGame] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [games, setGames] = useState<{ id: string; name: string }[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load existing settings
    fetch('/api/admin/settings').then(r => r.json()).then(data => {
      if (data.WHATSAPP_NUMBER) setWaNumber(data.WHATSAPP_NUMBER);
    });
    fetch('/api/admin/games').then(r => r.json()).then(setGames);
    fetch('/api/admin/categories').then(r => r.json()).then(setCategories);
  }, []);

  const saveWhatsApp = async () => {
    setSaving(true);
    setMessage('');
    const res = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'WHATSAPP_NUMBER', value: waNumber }),
    });
    if (res.ok) {
      setMessage('Nomor WhatsApp berhasil disimpan!');
    }
    setSaving(false);
  };

  const addGame = async () => {
    if (!newGame.trim()) return;
    const res = await fetch('/api/admin/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newGame }),
    });
    if (res.ok) {
      const data = await res.json();
      setGames([...games, data.game]);
      setNewGame('');
    }
  };

  const addCategory = async () => {
    if (!newCategory.trim()) return;
    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newCategory }),
    });
    if (res.ok) {
      const data = await res.json();
      setCategories([...categories, data.category]);
      setNewCategory('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 p-6 border-r border-gray-800">
        <h1 className="text-2xl font-bold text-blue-500 mb-8">Admin Panel</h1>
        <ul className="space-y-4">
          <li>
            <Link href="/admin" className="font-semibold text-gray-400 hover:text-white cursor-pointer p-2 block">
              Daftar Produk
            </Link>
          </li>
          <li className="font-semibold text-gray-300 p-2 bg-gray-800 rounded">
            Pengaturan
          </li>
          <li>
            <Link href="/" className="font-semibold text-blue-400 hover:text-white p-2 mt-10 block">
              &larr; Ke Halaman Utama
            </Link>
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-10">
          <h2 className="text-3xl font-bold">Pengaturan</h2>

          {/* WhatsApp Settings */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Pengaturan WhatsApp
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Masukkan nomor WhatsApp admin yang akan menerima pesan pembelian. Gunakan format internasional (contoh: 6285959011792).
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                value={waNumber}
                onChange={(e) => setWaNumber(e.target.value)}
                placeholder="6285959011792"
                className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
              <button
                onClick={saveWhatsApp}
                disabled={saving}
                className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors disabled:opacity-50"
              >
                {saving ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
            {message && (
              <p className="mt-3 text-green-400 text-sm font-medium">{message}</p>
            )}
          </div>

          {/* Manajemen Game */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-xl font-bold mb-4">Manajemen Game</h3>
            <p className="text-gray-400 text-sm mb-4">
              Daftar game yang bisa dipilih saat menambah produk.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {games.map(g => (
                <span key={g.id} className="px-3 py-1 bg-blue-600/20 text-blue-300 border border-blue-500/30 rounded-full text-sm font-medium">
                  {g.name}
                </span>
              ))}
              {games.length === 0 && <p className="text-gray-500 text-sm">Belum ada game.</p>}
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                value={newGame}
                onChange={(e) => setNewGame(e.target.value)}
                placeholder="Nama game baru..."
                className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={addGame}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors"
              >
                Tambah
              </button>
            </div>
          </div>

          {/* Manajemen Kategori */}
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
            <h3 className="text-xl font-bold mb-4">Manajemen Kategori</h3>
            <p className="text-gray-400 text-sm mb-4">
              Jenis kategori produk (contoh: Akun, Item, Top Up).
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map(c => (
                <span key={c.id} className="px-3 py-1 bg-purple-600/20 text-purple-300 border border-purple-500/30 rounded-full text-sm font-medium">
                  {c.name}
                </span>
              ))}
              {categories.length === 0 && <p className="text-gray-500 text-sm">Belum ada kategori.</p>}
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Nama kategori baru..."
                className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={addCategory}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-colors"
              >
                Tambah
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
