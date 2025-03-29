import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
   const countyGyor = await prisma.county.upsert({
    where: { id: 1 }, 
    update: {},
    create: {
      id: 1, 
      name: "Győr-Moson-Sopron Vármegye",
    },
  });

  const countyVas = await prisma.county.upsert({
    where: { id: 2 }, 
    update: {},
    create: {
      id: 2, 
      name: "Vas Vármegye",
    },
  });

  const citySopron = await prisma.city.upsert({
    where: { id: 3 }, 
    update: {},
    create: {
      id: 3, 
      name: "Sopron",
    },
  });
  
  const citySzombathely = await prisma.city.upsert({
    where: { id: 4 }, 
    update: {},
    create: {
      id: 4, 
      name: "Szombathely",
    },
  });
  
  const leafletMapSopron = await prisma.leafletMap.create({
    data: {
      plazaMapName: "Sopron Plaza Map",
      latitude: 47.6851,
      longitude: 16.5905,
    },
  });
  
  const leafletMapSavaria = await prisma.leafletMap.create({
    data: {
      plazaMapName: "Savaria Plaza Map",
      latitude: 47.2307,
      longitude: 16.6218,
    },
  });

  const plazaSopron = await prisma.plaza.create({
    data: {
      plazaName: "Sopron Pláza",
      location: "Sopron, Lackner Kristóf u. 35, 9400",
      cityId: citySopron.id,
      countyId: countyGyor.id,
      openingTime: "08:00",
      closingTime: "22:00",
      email: "info@sopronplaza.hu",
      phone: "+36 99 123 4567",
      image: "https://i0.wp.com/cyberpress.hu/wp-content/uploads/2019/04/sopron-pl%C3%A1za.jpg?fit=985%2C491&ssl=1",
      description: "A Sopron Pláza egy modern bevásárlóközpont Sopron szívében.",
      leafletMapId: leafletMapSopron.id,
    },
  });

  const plazaSavaria = await prisma.plaza.create({
    data: {
      plazaName: "Savaria Pláza",
      location: "Szombathely, Körmendi út 52, 9700",
      cityId: citySzombathely.id,
      countyId: countyVas.id,
      openingTime: "08:00",
      closingTime: "22:00",
      email: "info@savariaplaza.hu",
      phone: "+36 94 123 4567",
      image: "https://www.nyugat.hu/var/improxy/bnl1Z2F0XENsYXNzZXNcRkhEUGljdHVyZQ__/10/78/1078351_savaria_plaza.jpg?m=1727792123",
      description: "A Savaria Pláza Szombathely egyik legnagyobb bevásárlóközpontja.",
      leafletMapId: leafletMapSavaria.id,
    },
  });

  const stores = [
    { name: "Cinema City", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
    { name: "Pizza Forte", openingTime: "10:00", closingTime: "22:00", description: "+36 1 555 5555" },
    { name: "Pepco", openingTime: "09:00", closingTime: "20:00", description: "+36 1 888 8888" },
    { name: "Libri", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
    { name: "H&M", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
  ];

  for (const store of stores) {
    await prisma.plazaStore.create({
      data: { ...store, plazas: { connect: { id: plazaSopron.id } } },
    });
  }

  const savariaStores = [
    { name: "Cinema City", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
    { name: "Spar", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
    { name: "Libri", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
    { name: "H&M", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
    { name: "OXO Bubble Tea", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
    { name: "Sportisimo", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
  ];

  for (const store of savariaStores) {
    await prisma.plazaStore.create({
      data: { ...store, plazas: { connect: { id: plazaSavaria.id } } },
    });
  }

  console.log("Seeder sikeresen lefutott!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
