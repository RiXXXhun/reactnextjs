import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: Request) {
  const { id, plazaName, location, cityId, countyId, openingTime, closingTime, email, phone, image, description, leafletMapId, plazaStores } = await req.json();

  try {
    const existingPlaza = await prisma.plaza.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingPlaza) {
      return NextResponse.json({ error: 'A pláza nem található!' }, { status: 404 });
    }

    const plazaWithNewName = await prisma.plaza.findFirst({
      where: { plazaName },
    });

    if (plazaWithNewName && plazaWithNewName.id !== parseInt(id)) {
      return NextResponse.json({ error: 'Ez a pláza név már létezik!' }, { status: 400 });
    }

    await prisma.plaza.update({
      where: { id: parseInt(id) },
      data: {
        plazaStores: {
          set: [], 
        },
      },
    });


    const updatedPlaza = await prisma.plaza.update({
      where: { id: parseInt(id) },
      data: {
        plazaName,
        location,
        cityId: parseInt(cityId),
        countyId: parseInt(countyId),
        openingTime,
        closingTime,
        email,
        phone,
        image,
        description,
        leafletMapId: parseInt(leafletMapId),
        plazaStores: {
          connect: plazaStores.map((storeId: string) => ({ id: parseInt(storeId) })),
        },
      },
    });

    return NextResponse.json(updatedPlaza, { status: 200 });
  } catch (error) {
    console.error('Hiba a pláza módosításakor:', error instanceof Error ? error.message : error);
    return NextResponse.json({ error: 'Hiba történt a pláza módosításakor' }, { status: 500 });
  }
}