import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { name } = await req.json();

  try {
    const existingCounty = await prisma.county.findFirst({
      where: { name },
    });

    if (existingCounty) {
      return NextResponse.json({ error: 'Ez a vármegye már létezik!' }, { status: 400 });
    }
    const newCounty = await prisma.county.create({
      data: { name },
    });

    return NextResponse.json(newCounty, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Hiba történt a vármegye létrehozásakor.' }, { status: 500 });
  }
}
