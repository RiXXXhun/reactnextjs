import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { name } = await req.json();

  try {
    const existingCity = await prisma.city.findFirst({
      where: { name },
    });

    if (existingCity) {
      return NextResponse.json({ error: 'Ez a város már létezik!' }, { status: 400 });
    }

    const newCity = await prisma.city.create({
      data: { name },
    });

    return NextResponse.json(newCity, { status: 201 });
  } catch (error) {
    console.error('Hiba a város létrehozásakor:', error);
    return NextResponse.json({ error: 'Hiba történt a város létrehozásakor.' }, { status: 500 });
  }
}
