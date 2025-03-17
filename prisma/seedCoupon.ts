const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const coupons = [
    { code: 'DISCOUNT10', discount: 10, expiration: new Date('2025-12-31') },
    { code: 'DISCOUNT20', discount: 20, expiration: new Date('2025-12-31') },
    // További kuponok...
  ];

  for (const coupon of coupons) {
    await prisma.coupon.create({ data: coupon });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });