import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const countyZala = await prisma.county.upsert({
    where: { id: 3 }, 
    update: {},
    create: {
      id: 3, 
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
  
  const leafletMapZala = await prisma.leafletMap.create({
    data: {
      plazaMapName: "Zala Plaza",
      latitude: 46.84739,
      longitude: 16.85151,
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

// ZALA
  const ZalaStores = [
    { name: "Cinema City Zala Pláza", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
    { name: "Spar Zala Pláza", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
    { name: "Libri Zala Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
    { name: "H&M Zala Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
    { name: "OXO Bubble Tea Zala Pláza", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
    { name: "Sportisimo Zala Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
    { name: "Sinsay Zala Pláza", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
    { name: "House Zala Pláza", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
    { name: "Phone Zala Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
    { name: "CCC Zala Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
    { name: "Virágok Világa Zala Pláza", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
    { name: "Tally Weijl Zala Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
    { name: "Scitec Nutrition Zala Pláza", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
    { name: "Roland Divatház Zala Pláza", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
    { name: "Retro Zala Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
    { name: "Press Cafe Zala Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
    { name: "Pepco Zala Pláza", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
    { name: "Nemzeti Dohánybolt Zala Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
    { name: "Mister Minit Zala Pláza", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
    { name: "Devergo Zala Pláza", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
    { name: "Balance Zala Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
    { name: "Auchan Zala Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
    { name: "Rossmann Zala Pláza", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
    { name: "Budmil Zala Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
  ];

  for (const store of ZalaStores) {
    await prisma.plazaStore.create({
      data: { ...store, plazas: { connect: { id: plazaZala.id } } },
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
