import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function POST(req: Request) {
  const { username, email, password } = await req.json(); 

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { username },
        { email }
      ]
    }
  });

  if (existingUser) {

    return new Response(
      JSON.stringify({ message: 'Felhasználónév vagy email már létezik.' }),
      { status: 400 }
    );
  }


  const user = await prisma.user.create({
    data: {
      username,
      email,
      password, 
    }
  });


  return new Response(JSON.stringify(user), { status: 201 });
}
