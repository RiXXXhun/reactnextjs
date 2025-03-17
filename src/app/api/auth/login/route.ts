import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();


  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return new Response(
      JSON.stringify({ message: 'Hibás email vagy jelszó.' }),
      { status: 401 }
    );
  }


  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
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
