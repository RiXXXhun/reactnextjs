
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  try {

    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'ID szükséges!' }, { status: 400 });
    }

    const coupon = await prisma.coupon.findUnique({
      where: { id: Number(id) },
    });

    if (!coupon) {
      return NextResponse.json({ message: 'Nem létező kupon!' }, { status: 404 });
    }

    await prisma.coupon.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: 'Kupon törölve!' }, { status: 200 });
  } catch (error) {
    console.error('Kupon törlési hiba:', error);
    return NextResponse.json({ message: 'Szerver hiba vagy nem létező kupon!' }, { status: 500 });
  }
}
