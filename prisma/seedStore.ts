import { PrismaClient, Prisma, Coupon } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const generateStores = async (numStores: number): Promise<Prisma.StoreCreateInput[]> => {
    const stores: Prisma.StoreCreateInput[] = [];
  
    for (let i = 0; i < numStores; i++) {
      const name: string = faker.company.name();
  
      stores.push({
        name,
        createdAt: new Date(),
      });
    }
  
    return stores;
  };
  
  export const seedStores = async () => {
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