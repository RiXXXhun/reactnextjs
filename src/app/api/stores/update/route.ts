import prisma from '@/lib/prisma';

export async function PUT(req: Request) {
  const { id, name } = await req.json();

  if (!id || !name) {
    return new Response(
      JSON.stringify({ message: 'Id és név megadása szükséges.' }),
      { status: 400 }
    );
  }

  try {
    const updatedStore = await prisma.store.update({
      where: { id: id }, 
      data: { name: name }, 
    });

    return new Response(JSON.stringify(updatedStore), { status: 200 });
  } catch (error) {
    console.error('Hiba a bolt frissítésekor:', error);
    return new Response(
      JSON.stringify({ message: 'Hiba történt a bolt frissítésekor.' }),
      { status: 500 }
    );
  }
}
