import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { fullName, email, phone, message } = await req.json();
  try {

    // A Suuport kérés ez lesz ami kell neked
    const supportRequest = await prisma.support.create({
      data: { fullName, email, phone, message },
    });
    return new Response(JSON.stringify(supportRequest), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Valami hiba történt" }), { status: 500 });
  }
}
