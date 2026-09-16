import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const categoryId = formData.get('categoryId') as string;
    let gameId = formData.get('gameId') as string;
    const newGameName = formData.get('newGameName') as string;
    const price = parseFloat(formData.get('price') as string);
    const stock = parseInt(formData.get('stock') as string, 10);
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File | null;

    if (!title || !categoryId || !gameId || isNaN(price) || isNaN(stock)) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Handle new game creation inline
    if (gameId === 'OTHER' && newGameName) {
      const newGame = await prisma.game.create({
        data: { name: newGameName }
      });
      gameId = newGame.id;
    }

    let imageUrl = '';

    if (imageFile && imageFile.name) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64Image = buffer.toString('base64');
      
      const imgbbKey = process.env.IMGBB_API_KEY;
      if (!imgbbKey) {
         return NextResponse.json({ error: "Missing ImgBB API Key" }, { status: 500 });
      }

      const imgFormData = new FormData();
      imgFormData.append("key", imgbbKey);
      imgFormData.append("image", base64Image);

      const imgRes = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: imgFormData,
      });

      const imgData = await imgRes.json();
      if (imgData.success) {
        imageUrl = imgData.data.url;
      } else {
        console.error("ImgBB upload failed", imgData);
        return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
      }
    }

    const product = await prisma.product.create({
      data: {
        title,
        categoryId,
        gameId,
        price,
        stock,
        description,
        images: imageUrl,
        status: "READY"
      }
    });

    return NextResponse.json({ message: "Product created", product }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        game: true
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
