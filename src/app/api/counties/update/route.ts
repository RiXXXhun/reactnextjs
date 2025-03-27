import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: Request) {
  const { id, name } = await req.json();

  try {
    const existingCounty = await prisma.county.findUnique({
      where: { id },
    });

    if (!existingCounty) {
      return NextResponse.json({ error: 'A vármegye nem található!' }, { status: 404 });
    }

    const countyWithNewName = await prisma.county.findFirst({
      where: { name },
    });

    if (countyWithNewName) {
      return NextResponse.json({ error: 'Ez a vármegye már létezik!' }, { status: 400 });
    }

    const updatedCounty = await prisma.county.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(updatedCounty, { status: 200 });
  } catch (error) {
    console.error('Hiba a megyee módosításakor:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Hiba történt a vármegye módosításakor' }, { status: 500 });
  }
}
