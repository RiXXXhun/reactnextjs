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


export async function POST(req: Request) {
  const { name }: { name: string } = await req.json();

  if (!name || name.trim() === '') {
    return NextResponse.json({ message: 'Store name is required' }, { status: 400 });
  }

  try {
    const newStore: Store = await prisma.store.create({
      data: { name },
    });
    return NextResponse.json(newStore, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error adding store' }, { status: 500 });
  }
}


export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); 

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ message: 'Invalid store ID' }, { status: 400 });
  }

  try {
    await prisma.store.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting store' }, { status: 500 });
  }
}
