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

  const citySopron = await prisma.city.upsert({
    where: { id: 4 }, 
    update: {},
    create: {
      id: 4, 
      name: "Sopron",
    },
  });

  const cityGyor = await prisma.city.upsert({
    where: { id: 6 }, 
    update: {},
    create: {
      id: 6, 
      name: "Győr",
    },
  });

  
  const leafletMapSopron = await prisma.leafletMap.create({
    data: {
      plazaMapName: "Sopron Plaza",
      latitude: 47.6851,
      longitude: 16.5905,
    },
  });

  const leafletMapGyor = await prisma.leafletMap.create({
    data: {
      plazaMapName: "Gyor Plaza",
      latitude: 47.66925,
      longitude: 17.65127,
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


  const plazaGyor = await prisma.plaza.create({
    data: {
      plazaName: "Győr Pláza",
      location: "Győr, Vasvári Pál utca 1, 9024",
      cityId: cityGyor.id,
      countyId: countyGyor.id,
      openingTime: "08:00",
      closingTime: "22:00",
      email: "info@gyorplaza.hu",
      phone: "+36 96 801 030",
      image: "https://imocent.hu/wp-content/uploads/2022/11/IMG_4061.jpg",
      description: "A Győr Pláza GYőr egyik legnagyobb bevásárlóközpontja.",
      leafletMapId: leafletMapGyor.id,
    },
  });

//SOPRON 
  const stores = [
    { name: "Cinema City Sopron Pláza", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "Spar Sopron Pláza", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
      { name: "Libri Sopron Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
      { name: "H&M Sopron Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
      { name: "OXO Bubble Tea Sopron Pláza", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
      { name: "Sportisimo Sopron Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
      { name: "Sinsay Sopron Pláza", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "House Sopron Pláza", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
      { name: "Phone Sopron Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
      { name: "CCC Sopron Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
      { name: "Virágok Világa Sopron Pláza", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
      { name: "Tally Weijl Sopron Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
      { name: "Scitec Nutrition Sopron Pláza", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "Roland Divatház Sopron Pláza", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
      { name: "Retro Sopron Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
      { name: "Press Cafe Sopron Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
      { name: "Pepco Sopron Pláza", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
      { name: "Nemzeti Dohánybolt Sopron Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
      { name: "Mister Minit Sopron Pláza", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "Devergo Sopron Pláza", openingTime: "07:00", closingTime: "21:00", description: "+36 30 216 6194" },
      { name: "Balance Sopron Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 20 406 4245" },
      { name: "Auchan Sopron Pláza", openingTime: "09:00", closingTime: "20:00", description: "nincs" },
      { name: "Rossmann Sopron Pláza", openingTime: "10:00", closingTime: "21:00", description: "+36 20 858 5270" },
      { name: "Budmil Sopron Pláza", openingTime: "09:00", closingTime: "20:00", description: "36 92 345 226" },  ];

  for (const store of stores) {
    await prisma.plazaStore.create({
      data: { ...store, plazas: { connect: { id: plazaSopron.id } } },
    });
  }

//GYŐR
  const GyorStores = [
    { name: "Cinema City Győr Pláza", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "Spar Győr Pláza", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
      { name: "Libri Győr Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
      { name: "H&M Győr Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
      { name: "OXO Bubble Tea Győr Pláza", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
      { name: "Sportisimo Győr Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
      { name: "Sinsay Győr Pláza", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "House Győr Pláza", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
      { name: "Phone Győr Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
      { name: "CCC Győr Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
      { name: "Virágok Világa Győr Pláza", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
      { name: "Tally Weijl Győr Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
      { name: "Scitec Nutrition Győr Pláza", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "Roland Divatház Győr Pláza", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
      { name: "Retro Győr Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
      { name: "Press Cafe Győr Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
      { name: "Pepco Győr Pláza", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
      { name: "Nemzeti Dohánybolt Győr Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
      { name: "Mister Minit Győr Pláza", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "Devergo Győr Pláza", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
      { name: "Balance Győr Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
      { name: "Auchan Győr Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
      { name: "Rossmann Győr Pláza", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
      { name: "Budmil Győr Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
  ];

  for (const store of GyorStores) {
    await prisma.plazaStore.create({
      data: { ...store, plazas: { connect: { id: plazaGyor.id } } },
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
