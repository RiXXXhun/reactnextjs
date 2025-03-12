import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { username, email, password, securityQuestionAnswer } = await req.json();

    if (!username || !email || !password || !securityQuestionAnswer) {
      return new Response(
        JSON.stringify({ message: 'Minden mező kitöltése kötelező.' }),
        { status: 400 }
      );
    }

    const usernameRegex = /^[a-zA-Z0-9_]{4,16}$/;
    if (!usernameRegex.test(username)) {
      return new Response(
        JSON.stringify({ message: 'A felhasználónév csak betűket, számokat és aláhúzást (_) tartalmazhat, maximum 16 karakter hosszú lehet.' }),
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ message: 'Felhasználónév vagy email már létezik.' }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        securityQuestionAnswer,
      },
    });

    return new Response(JSON.stringify({ message: 'Sikeres regisztráció!' }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: 'Hiba történt a regisztráció során.' }),
      { status: 500 }
    );
  }
}
