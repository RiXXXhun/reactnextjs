import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const generateSupport = async (numSupport: number): Promise<Prisma.SupportCreateInput[]> => {
    const supports: Prisma.SupportCreateInput[] = [];
  
    for (let i = 0; i < numSupport; i++) {
      const fullName: string = faker.person.fullName(); // Véletlenszerű teljes név
      const email: string = faker.internet.email(); // Véletlenszerű email
      const phone: string = faker.phone.number(); // Véletlenszerű telefonszám
      const message: string = faker.lorem.sentence(10); // Véletlenszerű üzenet
  
      supports.push({
        fullName,
        email,
        phone,
        message,
        createdAt: new Date(), // Az aktuális dátum és idő
      });
    }
  
    return supports;
  };
  
  export const seedSupport = async () => {
    const supports = await generateSupport(10);
  
    for (const support of supports) {
      await prisma.support.create({
        data: support,
      });
    }
  
    console.log('Support entries seeded successfully');
  };
  
  seedSupport().catch((e) => {
    console.error(e);
    prisma.$disconnect();
  }).finally(() => {
    prisma.$disconnect();
  });