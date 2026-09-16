import Link from 'next/link';
import { notFound } from 'next/navigation';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: { game: true, category: true }
  });

  if (!product) {
    notFound();
  }

  // Ambil nomor WhatsApp dari database, fallback ke default
  const waSetting = await prisma.settings.findUnique({ where: { key: 'WHATSAPP_NUMBER' } });
  const adminPhone = waSetting?.value || '6285959011792';

  const waLink = generateWhatsAppLink(adminPhone, {
    id: product.id,
    title: product.title,
    price: product.price,
    gameName: product.game?.name || 'Unknown Game'
  });

  const uploadDate = product.createdAt.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white py-6 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">Marketplace</Link>
          <span className="text-gray-600">/</span>
          <span className="text-blue-400">{product.game?.name}</span>
          <span className="text-gray-600">/</span>
          <span className="text-gray-400 truncate max-w-[200px]">{product.title}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* ====== KOLOM KIRI ====== */}
          <div className="lg:w-[60%] space-y-6">

            {/* Kartu Gambar Produk */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
              <div className="relative">
                {/* Badge Game di atas gambar */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1.5 bg-blue-600 text-white text-sm font-bold rounded-lg shadow-lg">
                    {product.game?.name}
                  </span>
                </div>
                {/* Gambar Produk */}
                <div className="w-full aspect-video bg-gradient-to-br from-purple-900/40 to-blue-900/40 flex items-center justify-center">
                  <img
                    src={product.images || 'https://via.placeholder.com/800x450'}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Info singkat di bawah gambar */}
              <div className="p-4 flex items-center justify-between border-t border-gray-800">
                <div>
                  <p className="font-semibold text-gray-200">{product.title}</p>
                  <p className="text-sm text-gray-500">{product.category?.name}</p>
                </div>
                {/* Badge Status */}
                <span className={`px-3 py-1 rounded-lg text-sm font-bold ${product.status === 'READY' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : product.status === 'SOLD_OUT' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                  {product.status === 'READY' ? '✅ Ready' : product.status === 'SOLD_OUT' ? 'Sold Out' : 'Draft'}
                </span>
              </div>
            </div>

            {/* Kartu Spesifikasi & Rincian */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                📋 Spesifikasi & Rincian {product.category?.name || 'Produk'}
              </h2>
              <div className="text-gray-400 leading-relaxed whitespace-pre-wrap">
                {product.description}
              </div>
            </div>

            {/* Info Keamanan */}
            <div className="bg-green-950/40 rounded-2xl border border-green-800/40 p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-green-300 text-sm">Transaksi 100% Aman via WhatsApp</p>
                <p className="text-green-400/70 text-sm mt-1">
                  Semua transaksi dilakukan langsung dengan Admin. Konfirmasi ketersediaan dan detail produk sebelum melakukan pembayaran.
                </p>
              </div>
            </div>
          </div>

          {/* ====== KOLOM KANAN (Sidebar) ====== */}
          <div className="lg:w-[40%] space-y-5">

            {/* Judul & Status */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
              <h1 className="text-2xl font-extrabold mb-3">{product.title}</h1>

              {/* Badge Tersedia */}
              <div className="mb-4">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${product.status === 'READY' ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
                  {product.status === 'READY' ? (
                    <><svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg> Tersedia &amp; Terverifikasi</>
                  ) : '❌ Tidak Tersedia'}
                </span>
              </div>

              {/* Harga */}
              <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700 mb-5">
                <p className="text-sm text-gray-400 mb-1">Harga {product.category?.name}:</p>
                <p className="text-3xl font-bold text-amber-400">
                  Rp {product.price.toLocaleString('id-ID')}
                </p>
              </div>

              {/* Tombol Aksi */}
              {product.status === 'READY' ? (
                <div className="space-y-3">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-amber-500/30 text-base"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    Chat Penjual Langsung
                  </a>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 border border-amber-500/40 font-bold py-3.5 rounded-xl transition-all text-base"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    Beli via Roblox Store
                  </a>
                </div>
              ) : (
                <div className="w-full text-center bg-gray-800 text-gray-500 font-bold py-3.5 rounded-xl cursor-not-allowed border border-gray-700">
                  Produk Tidak Tersedia
                </div>
              )}
            </div>

            {/* Info Penjual */}
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-3">Informasi Penjual</p>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-lg font-bold">
                  RS
                </div>
                <div>
                  <p className="font-bold text-white">Roblox Store ID</p>
                  <p className="text-gray-500 text-sm">@robloxstoreid</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-full text-xs font-semibold">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                Penjual Terdaftar
              </span>
            </div>

            {/* Tanggal Upload */}
            <div className="text-center text-sm text-gray-600 flex items-center justify-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              Diunggah pada {uploadDate}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
