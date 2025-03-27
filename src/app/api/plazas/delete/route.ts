import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json(); 

    const plaza = await prisma.plaza.findUnique({ where: { id } });
    if (!plaza) {
      return NextResponse.json({ message: 'Plaza not found' }, { status: 404 });
    }

    await prisma.plaza.delete({ where: { id } });

    return NextResponse.json({ message: 'Plaza successfully deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting plaza:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
