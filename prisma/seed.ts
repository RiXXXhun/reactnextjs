import { seedCoupon } from "./seedCoupon";
import { seedStore } from "./seedStore";
import { seedAdmin } from "./seedAdmin";
import { seedUser } from "./seedUser";
import { seedSupport } from "./seedSupport";

async function main() {

  await seedAdmin();
  await seedUser();
  await seedStore();
  await seedCoupon();
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
