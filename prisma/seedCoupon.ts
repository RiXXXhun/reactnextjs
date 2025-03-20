import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';


const prisma = new PrismaClient();

const generateCoupons = async (numCoupons: number): Promise<Prisma.CouponCreateInput[]> => {
    const coupons: Prisma.CouponCreateInput[] = [];
    const stores = await prisma.store.findMany(); // Lekérjük az összes boltot az adatbázisból
  
    for (let i = 0; i < numCoupons; i++) {
      const qrCode: string = faker.string.alphanumeric(10); // Véletlenszerű QR kód
      const discount: string = `${faker.number.int({ min: 5, max: 99 })}`; // Véletlenszerű kedvezmény
      const validFrom: Date = faker.date.recent(); // Véletlenszerű kezdő dátum
      const validUntil: Date = faker.date.future(); // Véletlenszerű lejárati dátum
      const usageDetails: string = faker.lorem.sentence(); // Véletlenszerű használati részletek
      const storeId: number = stores[Math.floor(Math.random() * stores.length)].id; // Véletlenszerű bolt azonosító
  
      coupons.push({
        qrCode,
        discount,
        validFrom,
        validUntil,
        usageDetails,
        store: {
          connect: { id: storeId }, // Kapcsolódó bolt azonosító
        },
      });
    }
  
    return coupons;
  };
  
  export const seedCoupons = async () => {
    const coupons = await generateCoupons(15);
  
    for (const coupon of coupons) {
      await prisma.coupon.create({
        data: coupon,
      });
    }
  
    console.log('Coupons seeded successfully');
  };
  
  seedCoupons().catch((e) => {
    console.error(e);
    prisma.$disconnect();
  }).finally(() => {
    prisma.$disconnect();
  });
  