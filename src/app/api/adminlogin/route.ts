import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { username, password } = await request.json();


  const admin = await prisma.admin.findUnique({
    where: { username },
  });

  if (admin && admin.password === password) {

    const supportData = await prisma.support.findMany();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Login successful",
        admin,
        supportData, 
      })
    );
  } else {
    return new Response(
      JSON.stringify({ success: false, message: "Incorrect username or password" }),
      { status: 400 }
    );
  }
}
