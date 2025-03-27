import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, context: { params: { id: string } }) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "Érvénytelen ID" }, { status: 400 });
  }

  const plazaId = Number(id);

  if (isNaN(plazaId)) {
    return NextResponse.json({ error: "Érvénytelen ID" }, { status: 400 });
  }

  const plaza = await prisma.plaza.findUnique({
    where: { id: plazaId },
    include: { city: true, county: true, leafletMap: true, plazaStores: true },
  });

  if (!plaza) {
    return NextResponse.json({ error: "Plaza nem található" }, { status: 404 });
  }

  return NextResponse.json(plaza);
}