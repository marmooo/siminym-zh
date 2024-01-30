import { $ } from "zx";

const sizes = [2000, 5000, 20000, 1000000];
for (const size of sizes) {
  await $`bash build-dict.sh ${size}`;
  await $`bash build-db.sh ${size}`;
}
Deno.renameSync("docs/db/1000000", "docs/db/50000");
