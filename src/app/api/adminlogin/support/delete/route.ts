import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; 


export async function DELETE(req: Request) {
  try {
    const { id } = await req.json(); 

    await prisma.support.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ success: true, message: "Data deleted successfully!" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to delete data!" });
  }
}
