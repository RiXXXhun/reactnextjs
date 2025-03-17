import { seedCoupons } from "./seedCoupon";
import { seedStores } from "./seedStore";
import { seedAdmin } from "./seedAdmin";
import { seedUsers } from "./seedUser";
import { seedSupport } from "./seedSupport";

async function main() {

  await seedAdmin();
  await seedUsers();
  await seedStores();
  await seedCoupons();
  await seedSupport();

  console.log("Az adatbázis seedelése megtörtént");
}

main()
  .catch((e) => {
    console.error("Seedelési hiba kódak:", e);
    process.exit(1);
  })
  .finally(async () => {
    process.exit(0);
  });
