import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const admin = await prisma.admin.findUnique({
    where: { username },
  });

  if (!admin) {
    return new Response(
      JSON.stringify({ success: false, message: "Incorrect username or password" }),
      { status: 400 }
    );
  }

  // 🔹 Helyes bcrypt összehasonlítás
  const passwordMatch = await bcrypt.compare(password, admin.password);

  if (!passwordMatch) {
    return new Response(
      JSON.stringify({ success: false, message: "Incorrect username or password" }),
      { status: 400 }
    );
  }

  const supportData = await prisma.support.findMany();

  return new Response(
    JSON.stringify({
      success: true,
      message: "Login successful",
      admin,
      supportData, 
    })
  );
}
