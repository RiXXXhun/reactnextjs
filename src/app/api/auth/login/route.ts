import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findFirst({
    where: {
      email,
      password, 
    },
  });

  if (!user) {
    return new Response(
      JSON.stringify({ message: 'Hibás email vagy jelszó.' }),
      { status: 401 }
    );
  }

  return new Response(
    JSON.stringify({ message: 'Sikeres bejelentkezés.', user }),
    { status: 200 }
  );
}


type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

const prismaCustom = new PrismaClient({
  datasources: {
    db: {
      url: 'mysql://root:@localhost:3306/PlazaaszDB',
    },
  },
});
