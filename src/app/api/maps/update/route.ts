import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request: Request) {
  try {
    const { id, plazaMapName, latitude, longitude } = await request.json();

    if (!id || !plazaMapName.trim()) {
      return NextResponse.json({ message: 'ID és térkép név megadása szükséges!' }, { status: 400 });
    }
    const map = await prisma.leafletMap.findUnique({
      where: { id },
    });

    if (!map) {
      return NextResponse.json({ message: 'Térkép nem található!' }, { status: 404 });
    }

    const updatedMap = await prisma.leafletMap.update({
      where: { id },
      data: { plazaMapName, latitude, longitude },
    });

    return NextResponse.json(updatedMap, { status: 200 });
  } catch (error) {
    console.error('Hiba a térkép frissítésekor:', error);
    return NextResponse.json({ message: 'Hiba történt a térkép fristésekor' }, { status: 500 });
  }
}
