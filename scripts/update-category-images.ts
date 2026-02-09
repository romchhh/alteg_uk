/**
 * Update image field for specific categories.
 * Run: npx tsx scripts/update-category-images.ts
 */
import { getCustomCategory, updateCustomCategory } from '../lib/data/categories';

const UPDATES: { id: string; image: string }[] = [
  { id: 'channel', image: '/uploads/category-channel.png' },
  { id: 'flat_bar', image: '/uploads/category-flat_bar.png' },
  { id: 'square_bar', image: '/uploads/category-square_bar.png' },
  { id: 'round_bar', image: '/uploads/category-round_bar.png' },
  { id: 'sheet', image: '/uploads/category-sheet.png' },
];

function main() {
  for (const { id, image } of UPDATES) {
    const cat = getCustomCategory(id);
    if (!cat) {
      console.warn(`Category ${id} not found, skip.`);
      continue;
    }
    updateCustomCategory(id, { image });
    console.log(`Updated ${id} -> ${image}`);
  }
  console.log('Done.');
}

main();
