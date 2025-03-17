import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function seedAdmin() {
  const adminUsername = "adminadmin";
  const plainPassword = "admin1234";
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await prisma.admin.upsert({
    where: { username: adminUsername },
    update: {}, 
    create: {
      username: adminUsername,
      password: hashedPassword,
    },
  });

  console.log("Sikeres admin seedelés");
}

if (require.main === module) {
  seedAdmin()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
