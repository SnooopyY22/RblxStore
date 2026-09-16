export interface ProductData {
  id: string;
  title: string;
  price: number;
  gameName: string;
}

export function generateWhatsAppLink(adminPhone: string, product: ProductData): string {
  // Pastikan nomor admin diawali dengan kode negara (contoh: 62 untuk Indonesia)
  const formattedPhone = adminPhone.replace(/[^0-9]/g, '');
  
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(product.price);

  const message = `Halo Admin, saya ingin membeli produk berikut:
- Nama Produk: ${product.title}
- ID/Kode Produk: ${product.id}
- Harga: ${formattedPrice}
- Kategori Game: ${product.gameName}

Apakah produk ini masih ready?`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
}
