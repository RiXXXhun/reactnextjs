import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest) {
  try {
    const { id, name, openingTime, closingTime, description } = await req.json();

    if (!id || !name || !openingTime || !closingTime || !description) {
      return NextResponse.json({ message: 'Minden mező kitöltése kötelező!' }, { status: 400 });
    }

    if (closingTime <= openingTime) {
      return NextResponse.json({ message: 'A zárási idő nem lehet korábban, mint a nyitási idő!' }, { status: 400 });
    }

    if (description.length > 1000) {
      return NextResponse.json({ message: 'A leírás maximális hossza 1000 karakter lehet!' }, { status: 400 });
    }

    const existingStore = await prisma.plazaStore.findUnique({ where: { id } });

    if (!existingStore) {
      return NextResponse.json({ message: 'A bolt nem található!' }, { status: 404 });
    }

    const nameExists = await prisma.plazaStore.findFirst({
      where: { name, id: { not: id } },
    });

    if (nameExists) {
      return NextResponse.json({ message: 'Ez a bolt név már létezik!' }, { status: 400 });
    }

    const updatedStore = await prisma.plazaStore.update({
      where: { id },
      data: {
        name,
        openingTime,
        closingTime,
        description,
      },
    });

    return NextResponse.json(updatedStore, { status: 200 });
  } catch (error) {
    console.error('Hiba a bolt módosításakor:', error);
    return NextResponse.json({ message: 'Szerverhiba történt!' }, { status: 500 });
  }
}
