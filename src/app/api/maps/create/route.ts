import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { plazaMapName, latitude, longitude } = await request.json();

    if (!plazaMapName.trim()) {
      return NextResponse.json({ message: 'Térkép név megadása szükséges!' }, { status: 400 });
    }

    const existingMap = await prisma.leafletMap.findFirst({
      where: {
        plazaMapName: plazaMapName.trim(),
      },
    });

    if (existingMap) {
      return NextResponse.json({ message: 'Ez a térkép már létezik!' }, { status: 400 });
    }

    const newMap = await prisma.leafletMap.create({
      data: {
        plazaMapName,
        latitude,
        longitude,
      },
    });

    return NextResponse.json(newMap, { status: 201 });
  } catch (error) {
    console.error('Hiba a térkép hozzáadása során:', error);
    return NextResponse.json({ message: 'Hiba történt a térkép hozzáadásakor!' }, { status: 500 });
  }
}
