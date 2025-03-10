import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


function getRandomString(length: number) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}


function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function getRandomPhoneNumber() {
  const prefix = '+36-30-';
  const number = getRandomNumber(1000000, 9999999).toString();
  return prefix + number;
}


function getRandomLoremMessage() {
  const loremSentences = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
    "Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.",
    "Sed elit dui, pellentesque a, faucibus vel, interdum nec, diam.",
    "Praesent ac massa at ligula laoreet iaculis. Aliquam erat volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    "Duis ac turpis. Integer rutrum ante eu lacus. Aliquam erat volutpat. Nulla facilisi. Sed fringilla mauris sit amet nibh.",
  ];

  const sentence1 = loremSentences[getRandomNumber(0, loremSentences.length - 1)];
  const sentence2 = loremSentences[getRandomNumber(0, loremSentences.length - 1)];

  return `${sentence1} ${sentence2}`;
}


function getRandomName() {
  const firstNames = ['John', 'Jane', 'Alex', 'Chris', 'Emily', 'David', 'Sarah', 'Michael', 'Sophia', 'James'];
  const lastNames = ['Doe', 'Smith', 'Johnson', 'Brown', 'Williams', 'Jones', 'Miller', 'Davis', 'Garcia', 'Martinez'];
  const firstName = firstNames[getRandomNumber(0, firstNames.length - 1)];
  const lastName = lastNames[getRandomNumber(0, lastNames.length - 1)];
  return `${firstName} ${lastName}`;
}

async function main() {









  const adminExists = await prisma.admin.findUnique({
    where: { username: 'adminadmin' },
  });

  if (!adminExists) {
    await prisma.admin.create({
      data: {
        username: 'adminadmin',
        password: '12345678', 
      },
    });
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }














  for (let i = 0; i < 30; i++) {
    const randomUsername = `user_${getRandomString(6)}`;
    const randomEmail = `${randomUsername}@example.com`;
    const randomPassword = `pass${Math.floor(1000 + Math.random() * 9000)}`;

    await prisma.user.create({
      data: {
        username: randomUsername,
        email: randomEmail,
        password: randomPassword,
        securityQuestionAnswer: ""
      },
    });
    console.log(`User created: ${randomUsername}`);
  }
















  console.log('30 random users created successfully');

  for (let i = 0; i < 30; i++) {
    const randomDiscount = `${getRandomNumber(5, 50)}%`; 
    const randomBarcode = getRandomNumber(0, 100); 
    const randomQrCode = getRandomNumber(0, 100); 

    await prisma.coupon.create({
      data: {
        qrCode: randomQrCode.toString(),
        barcode: randomBarcode.toString(),
        discount: randomDiscount,
      },
    });
    console.log(`Coupon created with ${randomDiscount} discount, barcode ${randomBarcode}, and qrCode ${randomQrCode}`);
  }

  console.log('30 random coupons created successfully');







  for (let i = 0; i < 30; i++) {
    const randomFullName = getRandomName();
    const randomEmail = `${getRandomString(5)}@example.com`;
    const randomPhone = getRandomPhoneNumber();
    const randomMessage = getRandomLoremMessage();

    await prisma.support.create({
      data: {
        fullName: randomFullName,
        email: randomEmail,
        phone: randomPhone,
        message: randomMessage,
      },
    });
    console.log(`Support entry created for ${randomFullName}`);
  }

  console.log('30 random support entries created successfully');
}













main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
