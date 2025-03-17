import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';  

export async function POST(req: Request) {
  try {

    const { name } = await req.json();  

    if (!name) {
      return NextResponse.json({ message: "Bolt neve kötelező!" }, { status: 400 });
    }


    const existingStore = await prisma.store.findUnique({
      where: { name: name },  
    });

    if (existingStore) {

      return NextResponse.json({ message: `A "${name}" bolt már létezik!` }, { status: 400 });
    }


    const store = await prisma.store.create({
      data: { name }, 
    });


    return NextResponse.json(store, { status: 201 });
  } catch (error) {
    console.error("Error creating store:", error);
    return NextResponse.json({ message: "Hiba történt a bolt létrehozásakor!" }, { status: 500 });
  }
}
