import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const plazastore = [
    {name:"One" ,openingTime: "08:00",closingTime:"20:00",description:"Mobiltelefon szolgáltató"},
    /*
    {name:"Konzolvilág" ,closingTime: "20:00",openingTime:"08:00",description:"Játék konzol bolt"},
    {name:"Bubu Tea/Ice'n'GO" ,closingTime: "20:00",openingTime:"08:00",description:"Teázó, jégkrém"},
    {name:"Tescoma" ,closingTime: "20:00",openingTime:"08:00",description:"Konyhai eszközök"},
    {name:"Lipóti" ,closingTime: "20:00",openingTime:"08:00",description:"Pékség"},
    {name:"Tezenis" ,closingTime: "20:00",openingTime:"08:00",description:"Fehérnemű bolt"},
    {name:"Calzedonia" ,closingTime: "20:00",openingTime:"08:00",description:"Harisnya, fürdőruha"},
    {name:"BÁV zálog és ékszer" ,closingTime: "20:00",openingTime:"08:00",description:"Zálogház, ékszerbolt"},
    {name:"Gold for you" ,closingTime: "20:00",openingTime:"08:00",description:"Arany ékszerbolt"},
    {name:"Cinema City" ,closingTime: "20:00",openingTime:"08:00",description:"Mozi"},
    {name:"Vision Express" ,closingTime: "20:00",openingTime:"08:00",description:"Optika"},
    {name:"Vidanet" ,closingTime: "20:00",openingTime:"08:00",description:"Kábel TV, internet"},
    {name:"Yettel" ,closingTime: "20:00",openingTime:"08:00",description:"Mobiltelefon szolgáltató"},
    {name:"Telekom" ,closingTime: "20:00",openingTime:"08:00",description:"Telekommunikációs cég"},
    {name:"SportFactory" ,closingTime: "20:00",openingTime:"08:00",description:"Sportfelszerelés bolt"},
    {name:"Rossmann" ,closingTime: "20:00",openingTime:"08:00",description:"Drogéria"},
    {name:"Retro" ,closingTime: "20:00",openingTime:"08:00",description:"Divat ruházat"},
    {name:"Regio Játék" ,closingTime: "20:00",openingTime:"08:00",description:"Játékbolt"},
    {name:"Raiffeisen Bank" ,closingTime: "20:00",openingTime:"08:00",description:"Bank"},
    {name:"Pizza Hut" ,closingTime: "20:00",openingTime:"08:00",description:"Pizzéria"},
    {name:"Pepco" ,closingTime: "20:00",openingTime:"08:00",description:"Háztartási cikkek"},
    {name:"Libri" ,closingTime: "20:00",openingTime:"08:00",description:"Könyvesbolt"},
    {name:"KFC" ,closingTime: "20:00",openingTime:"08:00",description:"Gyorsétterem"},
    {name:"K&H" ,closingTime: "20:00",openingTime:"08:00",description:"Bank"},
    {name:"HajSzalon" ,closingTime: "20:00",openingTime:"08:00",description:"Fodrászat"},
    {name:"Devergo&friends" ,closingTime: "20:00",openingTime:"08:00",description:"Divat ruházat"},
    {name:"Deichmann" ,closingTime: "20:00",openingTime:"08:00",description:"Cipőbolt"},
    {name:"CCC" ,closingTime: "20:00",openingTime:"08:00",description:"Cipőbolt"},
    {name:"Budmil" ,closingTime: "20:00",openingTime:"08:00",description:"Ruházati bolt"},
    {name:"BioTechUSA" ,closigTime: "20:00",openingTime:"08:00",description:"Táplálékkiegészítők"},
    {name:"BENU Gyógyszertár" ,closingTime: "20:00",openingTime:"08:00",description:"Gyógyszertár"},
    {name:"Auchan" ,closingTime: "20:00",openingTime:"08:00",description:"Szupermarket"}
*/
];
/*
export const seedPlazaStore = async () => {
    const stores = await prisma.plazaStore.create({
        data: plazastore 
    });
  
    for (const store of stores) {
        await prisma.plazaStore.create({
          data: store,
        });
      }
  
    console.log('Stores seeded successfully');
  };
*/


  