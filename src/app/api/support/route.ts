import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 


export async function GET() {
  try {

    const supportMessages = await prisma.support.findMany({
      orderBy: {
        createdAt: 'desc', 
      },
    });


    return NextResponse.json(supportMessages, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Hiba történt az adatok lekérésekor" }, { status: 500 });
  }
}
