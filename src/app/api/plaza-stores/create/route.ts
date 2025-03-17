import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function POST(req: Request) {
  try {
    const { name, openingTime, closingTime } = await req.json();


    if (!name || !openingTime || !closingTime) {
      return NextResponse.json({ message: 'Minden mező kitöltése kötelező!' }, { status: 400 });
    }


    const newStore = await prisma.plazaStore.create({
      data: {
        name,
        openingTime,
        closingTime,
      },
    });

    return NextResponse.json(newStore, { status: 201 });
  } catch (error) {
    console.error('Error creating store:', error);
    return NextResponse.json({ message: 'Hiba történt a bolt létrehozása során!' }, { status: 500 });
  }
}