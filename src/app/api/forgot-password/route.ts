import bcrypt from 'bcryptjs';
import prisma from '../../../lib/prisma'; 
import { NextResponse } from 'next/server';

const validatePassword = (password: string) => {
  const hasUpperCase = /[A-Z]/.test(password);  
  const hasNumbers = /\d/.test(password);  
  const minLength = password.length >= 6;  

  return hasUpperCase && hasNumbers && minLength;
};

export const POST = async (req: Request) => {
  const { username, email, securityQuestionAnswer, newPassword } = await req.json();

  if (!username || !email || !securityQuestionAnswer || !newPassword) {
    return NextResponse.json({ message: "Minden mezőt ki kell tölteni!" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || user.username !== username) {
      return NextResponse.json({ message: "Rossz E-Mail címet vagy Felhasználónevet adott meg" }, { status: 400 });
    }

    const isSecurityAnswerValid = await bcrypt.compare(securityQuestionAnswer, user.securityQuestionAnswer);
    if (!isSecurityAnswerValid) {
      return NextResponse.json({ message: "Hibás válasz a biztonsági kérdésre!" }, { status: 400 });
    }

    if (!validatePassword(newPassword)) {
      return NextResponse.json({
        message: "A jelszónak legalább 6 karakter hosszúnak kell lennie, és tartalmaznia kell legalább egy nagybetűt és egy számot.",
      }, { status: 400 });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: "Jelszó sikeresen módosítva", userId: updatedUser.id }, { status: 200 });
  } catch (error) {
    console.error("Hiba történt:", error);
    return NextResponse.json({ message: "Belső hiba történt!" }, { status: 500 });
  }
};
