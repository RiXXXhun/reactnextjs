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

  const cityGyor = await prisma.city.upsert({
    where: { id: 5 }, 
    update: {},
    create: {
      id: 5, 
      name: "Győr",
    },
  });

  const countyZala = await prisma.county.upsert({
    where: { id: 6 }, 
    update: {},
    create: {
      id: 6, 
      name: "Zala Vármegye",
    },
  });

  const cityZala = await prisma.city.upsert({
    where: { id: 7 }, 
    update: {},
    create: {
      id: 7, 
      name: "Zala",
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

  const leafletMapGyor = await prisma.leafletMap.create({
    data: {
      plazaMapName: "Gyor Plaza Map",
      latitude: 47.66925,
      longitude: 17.65127,
    },
  });

  const leafletMapZala = await prisma.leafletMap.create({
    data: {
      plazaMapName: "Zala Plaza Map",
      latitude: 46.84739,
      longitude: 16.85151,
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

  const plazaGyor = await prisma.plaza.create({
    data: {
      plazaName: "Győr Pláza",
      location: "GYőr, Vasvári Pál utca 1, 9024",
      cityId: cityGyor.id,
      countyId: countyGyor.id,
      openingTime: "08:00",
      closingTime: "22:00",
      email: "info@gyorplaza.hu",
      phone: "++36 96 801 030",
      image: "https://imocent.hu/wp-content/uploads/2022/11/IMG_4061.jpg",
      description: "A Győr Pláza GYőr egyik legnagyobb bevásárlóközpontja.",
      leafletMapId: leafletMapGyor.id,
    },
  });

  const plazaZala = await prisma.plaza.create({
    data: {
      plazaName: "Zala Pláza",
      location: " Zalaegerszeg, Stadion utca 5, 8900",
      cityId: cityZala.id,
      countyId: countyZala.id,
      openingTime: "08:00",
      closingTime: "22:00",
      email: "info@zalaplaza.hu",
      phone: "+3620 407 6551",
      image: "https://www.globalplaza.hu/img/up/img_211886_zalaplaza.jpg",
      description: "A Zala Pláza Zalaegerszeg egyik legnagyobb bevásárlóközpontja.",
      leafletMapId: leafletMapZala.id,
    },
  });
//SOPRON
  const stores = [
    { name: "Cinema City", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "Spar", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
      { name: "Libri", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
      { name: "H&M", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
      { name: "OXO Bubble Tea", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
      { name: "Sportisimo", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
      { name: "Sinsay", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "House", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
      { name: "Phone", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
      { name: "CCC", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
      { name: "Virágok Világa", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
      { name: "Tally Weijl", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
      { name: "Scitec Nutrition", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "Roland Divatház", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
      { name: "Retro", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
      { name: "Press Cafe", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
      { name: "Pepco", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
      { name: "Nemzeti Dohánybolt", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
      { name: "Mister Minit", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "Devergo", openingTime: "07:00", closingTime: "21:00", description: ": +36 30 216 6194" },
      { name: "Balance", openingTime: "09:00", closingTime: "20:00", description: "+36 20 406 4245" },
      { name: "Auchan", openingTime: "09:00", closingTime: "20:00", description: "nincs" },
      { name: "Rossmann", openingTime: "10:00", closingTime: "21:00", description: "+36 20 858 5270" },
      { name: "Budmil", openingTime: "09:00", closingTime: "20:00", description: "36 92 345 226" },  ];

  for (const store of stores) {
    await prisma.plazaStore.create({
      data: { ...store, plazas: { connect: { id: plazaSopron.id } } },
    });
  }
//SZOMBATHELY
  const savariaStores = [
    { name: "Cinema City", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "Spar", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
      { name: "Libri", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
      { name: "H&M", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
      { name: "OXO Bubble Tea", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
      { name: "Sportisimo", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
      { name: "Sinsay", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "House", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
      { name: "Phone", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
      { name: "CCC", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
      { name: "Virágok Világa", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
      { name: "Tally Weijl", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
      { name: "Scitec Nutrition", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "Roland Divatház", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
      { name: "Retro", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
      { name: "Press Cafe", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
      { name: "Pepco", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
      { name: "Nemzeti Dohánybolt", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
      { name: "Mister Minit", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "Devergo", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
      { name: "Balance", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
      { name: "Auchan", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
      { name: "Rossmann", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
      { name: "Budmil", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" }, 
    ];

  for (const store of savariaStores) {
    await prisma.plazaStore.create({
      data: { ...store, plazas: { connect: { id: plazaSavaria.id } } },
    });
  }
//GYŐR
  const GyorStores = [
    { name: "Cinema City", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "Spar", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
      { name: "Libri", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
      { name: "H&M", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
      { name: "OXO Bubble Tea", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
      { name: "Sportisimo", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
      { name: "Sinsay", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "House", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
      { name: "Phone", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
      { name: "CCC", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
      { name: "Virágok Világa", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
      { name: "Tally Weijl", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
      { name: "Scitec Nutrition", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "Roland Divatház", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
      { name: "Retro", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
      { name: "Press Cafe", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
      { name: "Pepco", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
      { name: "Nemzeti Dohánybolt", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
      { name: "Mister Minit", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "Devergo", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
      { name: "Balance", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
      { name: "Auchan", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
      { name: "Rossmann", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
      { name: "Budmil", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
  ];

  for (const store of GyorStores) {
    await prisma.plazaStore.create({
      data: { ...store, plazas: { connect: { id: plazaGyor.id } } },
    });
// ZALA
    const ZalaStores = [
      { name: "Cinema City", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "Spar", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
      { name: "Libri", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
      { name: "H&M", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
      { name: "OXO Bubble Tea", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
      { name: "Sportisimo", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
      { name: "Sinsay", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "House", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
      { name: "Phone", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
      { name: "CCC", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
      { name: "Virágok Világa", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
      { name: "Tally Weijl", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
      { name: "Scitec Nutrition", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "Roland Divatház", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
      { name: "Retro", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
      { name: "Press Cafe", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
      { name: "Pepco", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
      { name: "Nemzeti Dohánybolt", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
      { name: "Mister Minit", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "Devergo", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
      { name: "Balance", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
      { name: "Auchan", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
      { name: "Rossmann", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
      { name: "Budmil", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
    ];
  
    for (const store of ZalaStores) {
      await prisma.plazaStore.create({
        data: { ...store, plazas: { connect: { id: plazaZala.id } } },
      });
    }
  
    console.log("Seeder sikeresen lefutott!");
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
