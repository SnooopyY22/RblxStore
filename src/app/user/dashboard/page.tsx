import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function UserDashboard() {
  const session = await getServerSession();
  
  if (!session?.user) {
    redirect('/login');
  }

  // Data Dummy Riwayat Transaksi (Cuma tampilan UI estetik)
  const dummyHistory = [
    { id: 'TRX-9821A', date: '15 Sep 2026', item: 'Akun Blox Fruits Max', price: 150000, status: 'Berhasil' },
    { id: 'TRX-7742B', date: '10 Sep 2026', item: 'Genshin Impact AR 55', price: 300000, status: 'Berhasil' },
    { id: 'TRX-5519C', date: '01 Sep 2026', item: 'Pet Simulator Titanic', price: 500000, status: 'Dibatalkan' },
  ];

  return (
    <div className="min-h-screen bg-[#0b0c10] text-gray-300 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Profile */}
        <div className="bg-[#12141a] rounded-sm border border-[#2a2f3a] p-8 flex items-center gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.3)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center text-3xl font-bold text-gray-950 shadow-lg shadow-amber-900/40 relative z-10">
            {session.user.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl font-extrabold text-white mb-1">{session.user.name || 'Pengguna'}</h1>
            <p className="text-gray-500">{session.user.email}</p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold tracking-widest uppercase">
              Member Resmi
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-6 h-[2px] bg-amber-500"></span> Riwayat Transaksi Anda
        </h2>

        {/* Tabel History */}
        <div className="bg-[#12141a] rounded-sm border border-[#2a2f3a] overflow-hidden shadow-lg">
          <table className="w-full text-left">
            <thead className="bg-[#1a1d24] border-b border-[#2a2f3a]">
              <tr>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">ID Transaksi</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Tanggal</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Barang</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Harga</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {dummyHistory.map((trx, idx) => (
                <tr key={idx} className="border-b border-[#1f232b] hover:bg-[#15181f] transition-colors">
                  <td className="p-4 font-mono text-sm text-amber-500">{trx.id}</td>
                  <td className="p-4 text-sm text-gray-400">{trx.date}</td>
                  <td className="p-4 font-medium text-gray-200">{trx.item}</td>
                  <td className="p-4 text-sm font-bold">Rp {trx.price.toLocaleString('id-ID')}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm border ${trx.status === 'Berhasil' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                      {trx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 bg-[#0b0c10] text-center text-sm text-gray-500 border-t border-[#1f232b]">
            Menampilkan 3 transaksi terakhir. (Hanya simulasi UI Dummy)
          </div>
        </div>

        <div className="text-center pt-8">
          <Link href="/#katalog" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-bold transition-colors">
            Kembali Belanja <span className="text-xl">›</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
