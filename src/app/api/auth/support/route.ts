import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { fullName, email, phone, message } = await req.json();
  try {
    const supportRequest = await prisma.support.create({
      data: { fullName, email, phone, message },
    });
    return new Response(JSON.stringify(supportRequest), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Valami hiba történt" }), { status: 500 });
  }
}


export async function GET() {
  try {
    const supportMessages = await prisma.support.findMany();
    return new Response(JSON.stringify(supportMessages), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Hiba történt az adatok lekérésekor" }), { status: 500 });
  }
}


export async function DELETE(req: Request) {
  const url = new URL(req.url);  
  const id = url.pathname.split('/').pop(); 

  if (!id) {
    return new Response(JSON.stringify({ error: "Nincs megadva ID" }), { status: 400 });
  }

  try {
    await prisma.support.delete({ where: { id: Number(id) } });  
    return new Response(JSON.stringify({ message: "Sikeresen törölve" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Hiba történt a törlés közben" }), { status: 500 });
  }
}
