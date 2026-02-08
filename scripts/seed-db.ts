/**
 * Seed SQLite database with catalog products.
 * Run: npx tsx scripts/seed-db.ts
 */
import { saveProducts } from '../lib/data/products';
import { CATALOG_PRODUCTS } from '../lib/constants/catalog';

async function main() {
  await saveProducts(CATALOG_PRODUCTS);
  console.log(`Seeded ${CATALOG_PRODUCTS.length} products into SQLite.`);
}

main().catch(console.error);
