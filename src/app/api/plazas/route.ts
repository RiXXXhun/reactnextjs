import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const plazas = await prisma.plaza.findMany();
    return NextResponse.json(plazas, { status: 200 });
  } catch (error) {
    console.error('Hiba a plázák adatainak lekérésekor:', error);
    return NextResponse.json(
      { message: 'Hiba történt a plázák adatok leérdezésekor' },
      { status: 500 }
    );
  }
}
