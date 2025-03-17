import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {

    const coupons = await prisma.coupon.findMany();

    return NextResponse.json(coupons, { status: 200 });
  } catch (error) {

    return NextResponse.json({ error: 'Hiba történt az adatok lekérésekor.' }, { status: 500 });
  }
}
