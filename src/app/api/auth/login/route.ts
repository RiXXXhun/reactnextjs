import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error("baj van!");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();

    if (!body) {
      return new NextResponse(
        JSON.stringify({ message: "Üres kérés! Küldj emailt és jelszót." }),
        { status: 400 }
      );
    }

    const { email, password } = JSON.parse(body);

    if (!email || !password) {
      return new NextResponse(
        JSON.stringify({ message: "Hiányzó email vagy jelszó!" }),
        { status: 400 }
      );
    }

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "Hibás email vagy jelszó." }),
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new NextResponse(
        JSON.stringify({ message: "Hibás email vagy jelszó." }),
        { status: 401 }
      );
    }

    if (!JWT_SECRET) {
      throw new Error("JWT titkos kulcs nincs beállítva!");
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "1h",
      algorithm: "HS256",
    });

    return new NextResponse(
      JSON.stringify({ message: "Sikeres bejelentkezés.", token }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return new NextResponse(
      JSON.stringify({ message: "Hiba történt a bejelentkezés során." }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
