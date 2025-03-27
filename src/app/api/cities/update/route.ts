import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: Request) {
  const { id, name } = await req.json();

  try {
    const existingCity = await prisma.city.findUnique({
      where: { id },
    });

    if (!existingCity) {
      return NextResponse.json({ error: 'A város nem található!' }, { status: 404 });
    }

    const cityWithNewName = await prisma.city.findFirst({
      where: { name },
    });

    if (cityWithNewName) {
      return NextResponse.json({ error: 'Ez a város már létezik!' }, { status: 400 });
    }

    const updatedCity = await prisma.city.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(updatedCity, { status: 200 });
  } catch (error) {
    console.error('Hiba a város módosításakor:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Hiba történt a város módosításakor' }, { status: 500 });
  }
}
