import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Memulai proses injeksi data dummy...');

  // 1. Buat Kategori
  const catAkun = await prisma.category.upsert({
    where: { id: 'cat-akun' },
    update: {},
    create: { id: 'cat-akun', name: 'Akun Premium' },
  });
  
  const catItem = await prisma.category.upsert({
    where: { id: 'cat-item' },
    update: {},
    create: { id: 'cat-item', name: 'Item Langka' },
  });

  // 2. Buat Game
  const gameGenshin = await prisma.game.upsert({
    where: { id: 'game-genshin' },
    update: {},
    create: { id: 'game-genshin', name: 'Genshin Impact' },
  });

  const gameBlox = await prisma.game.upsert({
    where: { id: 'game-blox' },
    update: {},
    create: { id: 'game-blox', name: 'Blox Fruits' },
  });

  const gameValo = await prisma.game.upsert({
    where: { id: 'game-valo' },
    update: {},
    create: { id: 'game-valo', name: 'Valorant' },
  });

  // 3. Buat Produk Dummy
  const dummyProducts = [
    {
      title: 'Akun Genshin Impact AR 60 - Full C6',
      price: 5500000,
      stock: 1,
      description: 'Akun sultan Genshin Impact Server Asia. AR 60, Raiden Shogun C6, Hu Tao C6, Yelan C6, plus signature weapons R5. Eksplorasi 100%. Pity weapon banner 60.',
      status: 'READY',
      images: 'https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?auto=format&fit=crop&q=80',
      categoryId: catAkun.id,
      gameId: gameGenshin.id,
    },
    {
      title: 'Blox Fruits Max Level (Kitsune + CDK)',
      price: 250000,
      stock: 5,
      description: 'Akun Blox Fruits max level 2550. Sudah memakan buah Kitsune (full awaken). Melee V4 lengkap, Cursed Dual Katana, Soul Guitar. Bounty 5M+.',
      status: 'READY',
      images: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30d25?auto=format&fit=crop&q=80',
      categoryId: catAkun.id,
      gameId: gameBlox.id,
    },
    {
      title: 'Valorant Radiant Account - Reaver Bundle',
      price: 850000,
      stock: 1,
      description: 'Rank Radiant Act lalu. Memiliki Reaver Vandal, Reaver Karambit, Ion Phantom, dan Kuronami Vandal. Region AP. VP sisa 1200.',
      status: 'READY',
      images: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
      categoryId: catAkun.id,
      gameId: gameValo.id,
    },
    {
      title: 'Genshin Impact - Primogems x8080 (Via UID)',
      price: 1100000,
      stock: 99,
      description: 'Top up legal via UID. Proses cepat 1-5 menit. Invoice resmi Mihoyo.',
      status: 'READY',
      images: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80',
      categoryId: catItem.id,
      gameId: gameGenshin.id,
    },
    {
      title: 'Blox Fruits - Permanent Dragon',
      price: 450000,
      stock: 3,
      description: 'Item Permanent Dragon Fruit. Dikirim via gift in-game. Wajib Add Friend dan Trade setelah 2 hari (sesuai rules Roblox).',
      status: 'SOLD_OUT',
      images: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&q=80',
      categoryId: catItem.id,
      gameId: gameBlox.id,
    }
  ];

  for (const p of dummyProducts) {
    await prisma.product.create({
      data: p
    });
  }

  console.log('✅ Injeksi data dummy berhasil! 5 produk telah ditambahkan.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
