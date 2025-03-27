import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (!id || isNaN(id)) {
    return NextResponse.json({ message: 'Érvénytelen megye id' }, { status: 400 });
  }

  try {
    const existingCounty = await prisma.county.findUnique({
      where: { id },
    });

    if (!existingCounty) {
      return NextResponse.json({ error: 'A vármegye nem található!' }, { status: 404 });
    }

    await prisma.county.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'A megye sikeresen törölve!' }, { status: 200 });
  } catch (error) {
    console.error('Hiba a megye törlésekor:', error);
    return NextResponse.json({ error: 'Hiba történt a megye törlésében.' }, { status: 500 });
  }
}
