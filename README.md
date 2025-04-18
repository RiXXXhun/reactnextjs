
# PLÁZAÁSZ - Projekt Telepítési és Futtatási Útmutató

Ez az útmutató segít abban, hogyan telepítsd és futtasd a **PLÁZAÁSZ** projektet a helyi gépeden.

## 1. Klónozd le a GitHub repot

Először is klónozd a repót a következő paranccsal:

GITHUB CLI
```bash
gh repo clone RiXXXhun/Szakdolgozat---PLAZAASZ-2024-2025
```

HTTPS
```bash
https://github.com/RiXXXhun/Szakdolgozat---PLAZAASZ-2024-2025.git
```

SSH
```bash
git@github.com:RiXXXhun/Szakdolgozat---PLAZAASZ-2024-2025.git
```

### Mappa elérési út

A projektet a kívánt mappába klónozd le. Például:

```bash
cd C:\Users\Ricsi\Documents\GitHub\reactnextjs
```

## 2. Indítsd el a MySQL adatbázist a Laragonban

Mielőtt folytatnád a seedelést, győződj meg róla, hogy a **Laragon** beépített MySQL adatbázisa fut. Nyisd meg a Laragon alkalmazást, és indítsd el a MySQL szervert.

## 3. Állítsd be az adatbázist

A MySQL adatbázist a következő beállítással hozd létre:

1. Nyisd meg a Laragon menüjében a **Database** szekciót.
2. Hozz létre egy új adatbázist **PlazaaszDB** néven.

Ezután szükséges beállítani a `.env` fájlban az adatbázis kapcsolatot. Állítsd be a következő **DATABASE_URL** értéket:

```bash
DATABASE_URL="mysql://root:@localhost:3306/PlazaaszDB"
```

## 4. Prisma migráció

Miután létrehoztad az adatbázist, futtasd a következő migrációs parancsot, hogy létrehozd az adatbázis tábláit:

```bash
npx prisma migrate dev
```

## 5. Telepítsd a szükséges függőségeket

Navigálj a projekt mappájába, majd futtasd az `npm install` parancsot, hogy telepítsd a szükséges csomagokat:
PL: C:\Users\Ricsi\Documents\GitHub\reactnextjs

```bash
cd mappa_ahol_van_a_github_repo_conja 
npm install
```

## 6. Seedeld az adatbázist

A következő parancsok futtatásával töltsd fel az adatbázist a szükséges adatokkal. Fontos, hogy a seedelést a megadott sorrendben végezd el.

Futtasd az alábbi parancsokat:

```bash
npx ts-node prisma/seedAdmin.ts
npx ts-node prisma/seedStore.ts
npx ts-node prisma/seedCoupon.ts
npx ts-node prisma/seedUser.ts
npx ts-node prisma/seedSupport.ts
npx ts-node prisma/seedZala.ts
npx ts-node prisma/seedVas.ts
npx ts-node prisma/seedGYMS.ts
```

## 7. A projekt futtatása

Miután sikeresen seedelted az adatbázist, elindíthatod a fejlesztői környezetet az alábbi parancs használatával:

```bash
npm run dev
```

A weboldal mostantól elérhető lesz a következő linken: [http://localhost:3000/homepage](http://localhost:3000/homepage)

Készítette: Nagy-Eperjesi Richárd János, Hustikker Szabolcs, Tóth Zoltán 13.A | Vas Vármegyei Szakképzési Centrum Nádasdy Tamás Technikum és Kollégium | Szakdolgozat | 2024-2025
