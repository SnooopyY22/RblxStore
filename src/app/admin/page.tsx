import ProductForm from '@/components/admin/ProductForm';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const products = await prisma.product.findMany({
    include: { game: true },
    orderBy: { createdAt: 'desc' }
  });
  
  const categories = await prisma.category.findMany();
  const games = await prisma.game.findMany();

  // Jika tabel kosong, kita buat kategori/game otomatis agar user bisa langsung coba (seeder otomatis)
  if (categories.length === 0) {
    await prisma.category.createMany({
      data: [{ name: 'Akun' }, { name: 'Item' }]
    });
  }
  if (games.length === 0) {
    await prisma.game.createMany({
      data: [{ name: 'Blox Fruits' }, { name: 'Pet Simulator 99' }]
    });
  }

  // Ambil ulang jika tadinya kosong
  const finalCategories = categories.length === 0 ? await prisma.category.findMany() : categories;
  const finalGames = games.length === 0 ? await prisma.game.findMany() : games;

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Sidebar Sederhana */}
      <div className="w-64 bg-gray-900 p-6 border-r border-gray-800">
        <h1 className="text-2xl font-bold text-blue-500 mb-8">Admin Panel</h1>
        <ul className="space-y-4">
          <li className="font-semibold text-gray-300 p-2 bg-gray-800 rounded">
            Daftar Produk
          </li>
          <li>
            <Link href="/admin/settings" className="font-semibold text-gray-400 hover:text-white p-2 block">
              Pengaturan & Kategori
            </Link>
          </li>
          <li>
            <Link href="/" className="font-semibold text-blue-400 hover:text-white p-2 mt-10 block">
              &larr; Ke Halaman Utama
            </Link>
          </li>
        </ul>
      </div>

      {/* Konten Utama */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Manajemen Produk</h2>
          
          <div className="mb-12">
            <ProductForm categories={finalCategories} games={finalGames} />
          </div>
          
          {/* List Produk */}
          <h3 className="text-xl font-bold mb-4">Produk Tersedia ({products.length})</h3>
          <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-900">
                <tr>
                  <th className="p-4 border-b border-gray-700">Gambar</th>
                  <th className="p-4 border-b border-gray-700">Produk</th>
                  <th className="p-4 border-b border-gray-700">Game</th>
                  <th className="p-4 border-b border-gray-700">Harga</th>
                  <th className="p-4 border-b border-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-gray-400">Belum ada produk</td>
                  </tr>
                ) : (
                  products.map(p => (
                    <tr key={p.id} className="hover:bg-gray-700 transition-colors">
                      <td className="p-4 border-b border-gray-700">
                        {p.images ? (
                          <img src={p.images} alt={p.title} className="w-16 h-12 object-cover rounded" />
                        ) : '-'}
                      </td>
                      <td className="p-4 border-b border-gray-700">{p.title}</td>
                      <td className="p-4 border-b border-gray-700">{p.game?.name}</td>
                      <td className="p-4 border-b border-gray-700">Rp {p.price.toLocaleString('id-ID')}</td>
                      <td className="p-4 border-b border-gray-700">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${p.status === 'READY' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
