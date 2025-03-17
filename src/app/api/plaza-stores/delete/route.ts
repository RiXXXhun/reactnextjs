import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ message: 'A bolt ID-ja szükséges!' }, { status: 400 });
    }

    await prisma.plazaStore.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Bolt sikeresen törölve!' });
  } catch (error) {
    console.error('Error deleting store:', error);
    return NextResponse.json({ message: 'Hiba történt a bolt törlése során!' }, { status: 500 });
  }
}
