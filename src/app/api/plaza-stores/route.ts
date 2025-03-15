import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function GET() {
  try {
    const stores = await prisma.plazaStore.findMany();
    return NextResponse.json(stores);
  } catch (error) {
    console.error('Error fetching stores:', error);
    return NextResponse.json({ message: 'Hiba történt az adatok lekérése során!' }, { status: 500 });
  }
}
