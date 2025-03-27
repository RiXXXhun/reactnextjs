import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (!id || isNaN(id)) {
    return NextResponse.json({ message: 'Érvénytelen város ID' }, { status: 400 });
  }

  try {
    const existingCity = await prisma.city.findUnique({
      where: { id },
    });

    if (!existingCity) {
      return NextResponse.json({ error: 'A város nem található!' }, { status: 404 });
    }

    await prisma.city.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'A város sikeresen törölve!' }, { status: 200 });
  } catch (error) {
    console.error('Hiba a város törlésékor:', error);
    return NextResponse.json({ error: 'Hiba történt a város törlésében.' }, { status: 500 });
  }
}
