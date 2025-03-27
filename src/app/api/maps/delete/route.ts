import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    
    if (!id || isNaN(id)) {
      return NextResponse.json({ message: 'Érvénytelen térkép ID!' }, { status: 400 });
    }

    const existingMap = await prisma.leafletMap.findUnique({
      where: { id },
    });

    if (!existingMap) {
      return NextResponse.json({ message: 'Térkép nem található!' }, { status: 404 });
    }

    await prisma.leafletMap.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Térkép sikeresen törölve!' }, { status: 200 });
  } catch (error) {
    console.error('Hiba a térkép törlésékor:', error);
    return NextResponse.json({ message: 'Hiba történt a térkép törlésében!' }, { status: 500 });
  }
}
