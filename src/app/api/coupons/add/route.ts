import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Beérkezett adat:', body); 


    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ message: 'Üres vagy hibás adat!' }, { status: 400 });
    }


    const validFromDate = new Date(body.validFrom);
    const validUntilDate = new Date(body.validUntil); 

    if (isNaN(validFromDate.getTime()) || isNaN(validUntilDate.getTime())) {
      return NextResponse.json({ message: 'Érvénytelen dátum formátum!' }, { status: 400 });
    }

    const newCoupon = await prisma.coupon.create({
      data: {
        qrCode: body.qrCode,
        discount: body.discount.toString(), 
        validFrom: validFromDate,
        validUntil: validUntilDate,
        usageDetails: body.usageDetails,
        storeId: body.storeId,
      },
    });

    return NextResponse.json(newCoupon, { status: 201 });
  } catch (error: any) {
    console.error('Kupon hozzáadási hiba:', error);
    return NextResponse.json({ message: 'Szerver hiba!', error: error?.message || error }, { status: 500 });
  }
}
