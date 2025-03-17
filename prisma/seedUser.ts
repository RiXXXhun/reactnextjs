import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';


const prisma = new PrismaClient();

const generateUsers = async (numUsers: number): Promise<Prisma.UserCreateInput[]> => {
  const users: Prisma.UserCreateInput[] = [];

  for (let i = 0; i < numUsers; i++) {
    const username: string = faker.person.fullName();
    const email: string = faker.internet.email();
    const password: string = await bcrypt.hash('passworddscdvxd123', 10); // Hashelt jelszó
    const securityQuestionAnswer: string = await bcrypt.hash('Mi a/volt beceneved', 10); // Hashelt biztonsági kérdés

    users.push({
      username,
      email,
      password,
      securityQuestionAnswer,
    });
  }

  return users;
};

export const seedUsers = async () => {
  const users = await generateUsers(100);

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log('Users seed kész');
};

seedUsers().catch((e) => {
  console.error(e);
  prisma.$disconnect();
}).finally(() => {
  prisma.$disconnect();
});
