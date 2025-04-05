import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const countyVas = await prisma.county.upsert({
    where: { id: 2 }, 
    update: {},
    create: {
      id: 2, 
      name: "Vas Vármegye",
    },
  });


  
  const citySzombathely = await prisma.city.upsert({
    where: { id: 5 }, 
    update: {},
    create: {
      id: 5, 
      name: "Szombathely",
    },
  });

  const leafletMapSavaria = await prisma.leafletMap.create({
    data: {
      plazaMapName: "Savaria Plaza",
      latitude: 47.2307,
      longitude: 16.6218,
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


//SZOMBATHELY
  const savariaStores = [
    { name: "Cinema City Savaria Pláza", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "Spar Savaria Pláza", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
      { name: "Libri Savaria Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
      { name: "H&M Savaria Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
      { name: "OXO Bubble Tea Savaria Pláza", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
      { name: "Sportisimo Savaria Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
      { name: "Sinsay Savaria Pláza", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "House Savaria Pláza", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
      { name: "Phone Savaria Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
      { name: "CCC Savaria Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
      { name: "Virágok Világa Savaria Pláza", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
      { name: "Tally Weijl Savaria Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
      { name: "Scitec Nutrition Savaria Pláza", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "Roland Divatház Savaria Pláza", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
      { name: "Retro Savaria Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
      { name: "Press Cafe Savaria Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
      { name: "Pepco Savaria Pláza", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
      { name: "Nemzeti Dohánybolt Savaria Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" },
      { name: "Mister Minit Savaria Pláza", openingTime: "09:00", closingTime: "23:00", description: "+36 1 999 6161" },
      { name: "Devergo Savaria Pláza", openingTime: "07:00", closingTime: "21:00", description: "+36 1 444 4444" },
      { name: "Balance Savaria Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 777 7777" },
      { name: "Auchan Savaria Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 666 6666" },
      { name: "Rossmann Savaria Pláza", openingTime: "10:00", closingTime: "21:00", description: "+36 1 333 3333" },
      { name: "Budmil Savaria Pláza", openingTime: "09:00", closingTime: "20:00", description: "+36 1 222 2222" }, 
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
