import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'; 
const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json(); 

    if (!id || isNaN(id)) {
      return NextResponse.json({ message: 'Érvénytelen kupon ID!' }, { status: 400 });
    }

    const deletedCoupon = await prisma.coupon.delete({
      where: {
        id: Number(id), 
      },
    });

    return NextResponse.json(deletedCoupon, { status: 200 });
  } catch (error) {
    console.error('Hiba a kupon törlésékor:', error);
    return NextResponse.json({ message: 'Hiba történt a kupon törlésében!' }, { status: 500 });
  }
}
