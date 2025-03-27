import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const plazaData = await req.json();

    if (!plazaData) {
      throw new Error('No data provided');
    }

    const newPlaza = await prisma.plaza.create({
      data: {
        plazaName: plazaData.plazaName,
        location: plazaData.location,
        cityId: plazaData.cityId,
        openingTime: plazaData.openingTime,
        closingTime: plazaData.closingTime,
        email: plazaData.email,
        phone: plazaData.phone,
        image: plazaData.image,
        description: plazaData.description,
        leafletMapId: plazaData.leafletMapId,
        countyId: plazaData.countyId,
        plazaStores: {
          connect: plazaData.plazaStores.map((storeId: string) => ({
            id: parseInt(storeId, 10),
          })),
        },
      },
    });

    return NextResponse.json(newPlaza, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error creating plaza:', error.message);
      return NextResponse.json({ message: error.message }, { status: 500 });
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json({ message: 'Failed to create plaza' }, { status: 500 });
    }
  }
}
