
import { NextResponse } from "next/server";  
import prisma from '@/lib/prisma';

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();  

    if (!id) {
      return NextResponse.json({ message: "Bolt ID kötelező!" }, { status: 400 });
    }


    const store = await prisma.store.delete({
      where: { id },
    });

    return NextResponse.json(store, { status: 200 }); 
  } catch (error) {
    console.error("Error deleting store:", error);
    return NextResponse.json({ message: "Hiba történt a bolt törlésekor!" }, { status: 500 });
  }
}
