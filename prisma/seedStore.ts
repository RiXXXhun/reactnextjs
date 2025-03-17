import { PrismaClient, Prisma, Coupon } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const generateStores = async (numStores: number): Promise<Prisma.StoreCreateInput[]> => {
    const stores: Prisma.StoreCreateInput[] = [];
  
    for (let i = 0; i < numStores; i++) {
      const name: string = faker.company.name(); // Véletlenszerű bolt név
  
      stores.push({
        name,
        createdAt: new Date(), // Az aktuális dátum és idő
      });
    }
  
    return stores;
  };
  
  const seedStores = async () => {
    const stores = await generateStores(10);
  
    for (const store of stores) {
      await prisma.store.create({
        data: store,
      });
    }
  
    console.log('Stores seeded successfully');
  };
  
  seedStores().catch((e) => {
    console.error(e);
    prisma.$disconnect();
  }).finally(() => {
    prisma.$disconnect();
  });