import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cities = await prisma.city.findMany(); 
    return NextResponse.json(cities, { status: 200 });
  } catch (error) {
    console.error('Hiba a városok adatainak lekérésekor:', error); // Hiba logolása
    return NextResponse.json(
      { message: 'Hiba történt a városok adatok lekérésekor' },
      { status: 500 }
    );
  }
}
