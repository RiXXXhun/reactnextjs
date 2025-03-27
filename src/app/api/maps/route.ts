import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const maps = await prisma.leafletMap.findMany();
    return NextResponse.json(maps, { status: 200 });
  } catch (error) {
    console.error('Hiba a térképek adatainak a  llekérésekor:', error);
    return NextResponse.json({ message: 'Hiba történt a térképek adatok leérdezésekor' }, { status: 500 });
  }
}
