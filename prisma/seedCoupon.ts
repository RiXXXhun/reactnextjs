import { PrismaClient, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const generateCoupons = async (numCoupons: number): Promise<Prisma.CouponCreateInput[]> => {
  const coupons: Prisma.CouponCreateInput[] = [];
  const stores = await prisma.store.findMany();
  
  for (let i = 0; i < numCoupons; i++) {
    const discount: string = `${faker.number.int({ min: 1, max: 99 })}`; 
    const qrCode: string = `PLAZAASZ-${discount}-${faker.string.numeric(10)}`; 
    const validFrom: Date = faker.date.recent(); 
    const validUntil: Date = faker.date.future(); 
    const usageDetails: string = faker.lorem.word(); 
    const storeId: number = stores[Math.floor(Math.random() * stores.length)].id; 
  
    coupons.push({
      qrCode,
      discount,
      validFrom,
      validUntil,
      usageDetails,
      store: {
        connect: { id: storeId },
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
