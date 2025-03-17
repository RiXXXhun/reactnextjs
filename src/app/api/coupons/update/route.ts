import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(req: NextRequest) {
  try {
    const { id, qrCode, discount, validFrom, validUntil, usageDetails, storeId } = await req.json();

    if (!id || !qrCode || discount === undefined || !validFrom || !validUntil || !usageDetails || storeId === undefined) {
      return NextResponse.json({ message: 'Minden mező kitöltése kötelező!' }, { status: 400 });
    }

    if (discount <= 0 || discount > 99) {
      return NextResponse.json({ message: 'A kedvezménynek 1 és 99 közötti számnak kell lennie!' }, { status: 400 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const validFromDate = new Date(validFrom);
    const validUntilDate = new Date(validUntil);
    
    if (validFromDate < today) {
      return NextResponse.json({ message: 'Az érvényesség kezdete nem lehet a mai napnál régebbi!' }, { status: 400 });
    }

    if (validUntilDate < validFromDate) {
      return NextResponse.json({ message: 'Az érvényesség vége nem lehet korábbi, mint az érvényesség kezdete!' }, { status: 400 });
    }
    const existingCoupon = await prisma.coupon.findUnique({ where: { id } });

    if (!existingCoupon) {
      return NextResponse.json({ message: 'A kupon nem található!' }, { status: 404 });
    }

    const discountString = discount.toString();
    const validFromISO = new Date(validFrom).toISOString();
    const validUntilISO = new Date(validUntil).toISOString();

    const updatedCoupon = await prisma.coupon.update({
      where: { id },
      data: {
        qrCode,
        discount: discountString, 
        validFrom: validFromISO,   
        validUntil: validUntilISO, 
        usageDetails,
        storeId,
      },
    });

    return NextResponse.json(updatedCoupon, { status: 200 });
  } catch (error) {
    console.error('Hiba a kupon módosításakor:', error instanceof Error ? error.message : error);
    return NextResponse.json({ message: 'Szerverhiba történt!' }, { status: 500 });
  }
}
