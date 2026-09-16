import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

// GET - Ambil semua game
export async function GET() {
  try {
    const games = await prisma.game.findMany({ orderBy: { name: 'asc' } });
    return NextResponse.json(games);
  } catch (error) {
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

// POST - Tambah game baru
export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    const game = await prisma.game.create({ data: { name } });
    return NextResponse.json({ message: "Game added", game }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
