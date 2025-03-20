import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

interface Store {
  id: number;
  name: string;
}

export async function GET() {
  try {
    const stores: Store[] = await prisma.store.findMany();
    return NextResponse.json(stores);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching stores' }, { status: 500 });
  }
}
