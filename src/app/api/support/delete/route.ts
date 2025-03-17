import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 

export async function DELETE(req: Request) {
  try {

    const { id } = await req.json();
    
    if (!id) {
      return NextResponse.json(
        { error: "Nincs megadva ID" }, 
        { status: 400 }
      );
    }


    await prisma.support.delete({
      where: { id: id }
    });


    return NextResponse.json(
      { success: true, message: "Sikeresen törölve!" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Hiba történt a törlés közben!" },
      { status: 500 }
    );
  }
}
