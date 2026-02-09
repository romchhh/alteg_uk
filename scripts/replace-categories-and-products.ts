/**
 * Replace categories in DB with the new 12 categories and seed products (Angle, Box Section, Channel).
 * Deletes all existing custom categories, category overrides, and products; then inserts new data.
 *
 * Run: npx tsx scripts/replace-categories-and-products.ts
 */
import {
  deleteAllCustomCategories,
  deleteAllCategoryOverrides,
  insertCustomCategoryRaw,
} from '../lib/data/categories';
import { saveProducts } from '../lib/data/products';
import type { Product } from '../lib/types/product';

const NEW_CATEGORIES: { id: string; nameEn: string; description: string }[] = [
  {
    id: 'angle',
    nameEn: 'Angle',
    description: 'Aluminium angles and corner trims are strong and durable whilst remaining lightweight and corrosion resistant. Ideal for use outdoors or in humid environments, commonly used on edges or corners in architectural and structural applications. Available in mill finish, brushed, bright polished and anodised. Free custom cutting to your dimensions.',
  },
  {
    id: 'box_section',
    nameEn: 'Box Section',
    description: 'Aluminium box sections (square tube) are extruded hollow square or rectangular profiles with a variety of applications: building works, shelf supports, storage racks, posts and fences, window and door frames. Excellent strength-to-weight ratio and corrosion resistance. Available in mill finish, brushed and bright polished. Free custom cutting service.',
  },
  {
    id: 'channel',
    nameEn: 'Channel',
    description: 'Aluminium channel (C or U channel) is commonly used for construction and fabrication, cable runs and lighting, vehicle and boat bodies and decorative applications. Lightweight and versatile, popular for DIY projects such as sliding doors or greenhouses. Free custom cutting to your dimensions.',
  },
  { id: 'flat_bar', nameEn: 'Flat Bar', description: 'Aluminium flat bar for structural and decorative use. Lightweight, corrosion resistant. Mill finish and other finishes available. Cutting to size on request.' },
  { id: 'mesh', nameEn: 'Mesh', description: 'Aluminium mesh and grilles for screening, fencing and industrial applications. Durable and lightweight.' },
  { id: 'round_bar', nameEn: 'Round Bar', description: 'Solid round aluminium bar in various diameters. Suitable for machining and fabrication. Mill finish. Cutting to size available.' },
  { id: 'sheet', nameEn: 'Sheet', description: 'Aluminium sheet in various thicknesses and sizes for cladding, fabrication and industrial use. Cutting to size on request.' },
  { id: 'square_bar', nameEn: 'Square Bar', description: 'Solid square aluminium bar. Standard sizes, cutting to size. Mill finish and other options.' },
  { id: 'tube_pipe', nameEn: 'Tube / Pipe', description: 'Hollow aluminium round tube and pipe. Various diameters and wall thicknesses. For structures, handrails and engineering. Free cutting to size.' },
  { id: 'rsj_ibeam', nameEn: 'RSJs / I-beams', description: 'Aluminium I-beams and RSJ sections for structural applications. High strength-to-weight ratio. Cutting to size available.' },
  { id: 'checker_plate', nameEn: 'Checker plate', description: 'Aluminium checker (diamond) plate for anti-slip flooring, treads and industrial use. Durable and easy to clean.' },
  { id: 't_section', nameEn: 'T-Section', description: 'Aluminium T-section profiles for framing, mounting and structural use. Various sizes. Cutting to size on request.' },
];

const STD_LENGTHS = [1, 2, 3, 4, 5, 6];

/** Aluminium Angle products. pricePerMeter in GBP (ex VAT). */
const ANGLE_PRODUCTS: Omit<Product, 'id' | 'category'>[] = [
  { name: '9.5mm x 9.5mm x 1.6mm Aluminium Angle', nameEn: '9.5mm x 9.5mm x 1.6mm (3/8" x 3/8" x 1/16") Aluminium Angle', dimensions: '9.5x9.5x1.6', pricePerMeter: 7.96, weightPerMeter: 0.12, standardLengths: STD_LENGTHS, inStock: true, material: 'Aluminium', finish: 'Mill finish' },
  { name: '12.7mm x 12.7mm x 1.6mm Aluminium Angle', nameEn: '12.7mm x 12.7mm x 1.6mm (1/2" x 1/2" x 1/16") Aluminium Angle', dimensions: '12.7x12.7x1.6', pricePerMeter: 1.85, weightPerMeter: 0.18, standardLengths: STD_LENGTHS, inStock: true, material: 'Aluminium', finish: 'Mill finish' },
  { name: '12.7mm x 12.7mm x 3.2mm Aluminium Angle', nameEn: '12.7mm x 12.7mm x 3.2mm (1/2" x 1/2" x 1/8") Aluminium Angle', dimensions: '12.7x12.7x3.2', pricePerMeter: 2.9, weightPerMeter: 0.28, standardLengths: STD_LENGTHS, inStock: true, material: 'Aluminium', finish: 'Mill finish' },
  { name: '15.8mm x 15.8mm x 1.6mm Aluminium Angle', nameEn: '15.8mm x 15.8mm x 1.6mm (5/8" x 5/8" x 1/16") Aluminium Angle', dimensions: '15.8x15.8x1.6', pricePerMeter: 1.73, weightPerMeter: 0.22, standardLengths: STD_LENGTHS, inStock: true, material: 'Aluminium', finish: 'Mill finish' },
  { name: '15.8mm x 15.8mm x 3.2mm Aluminium Angle', nameEn: '15.8mm x 15.8mm x 3.2mm (5/8" x 5/8" x 1/8") Aluminium Angle', dimensions: '15.8x15.8x3.2', pricePerMeter: 4.4, weightPerMeter: 0.35, standardLengths: STD_LENGTHS, inStock: true, material: 'Aluminium', finish: 'Mill finish' },
  { name: '19mm x 12.7mm x 1.6mm Aluminium Angle', nameEn: '19mm x 12.7mm x 1.6mm (3/4" x 1/2" x 1/16") Aluminium Angle', dimensions: '19x12.7x1.6', pricePerMeter: 1.43, weightPerMeter: 0.2, standardLengths: STD_LENGTHS, inStock: true, material: 'Aluminium', finish: 'Mill finish' },
  { name: '19mm x 12.7mm x 1.6mm Brushed Aluminium Angle', nameEn: '19mm x 12.7mm x 1.6mm (3/4" x 1/2" x 1/16") Brushed Aluminium Angle', dimensions: '19x12.7x1.6 brushed', pricePerMeter: 50.45, weightPerMeter: 0.2, standardLengths: STD_LENGTHS, inStock: true, material: 'Aluminium', finish: 'Brushed' },
  { name: '19mm x 12.7mm x 1.6mm Bright Polished Aluminium Angle', nameEn: '19mm x 12.7mm x 1.6mm (3/4" x 1/2" x 1/16") Bright Polished Aluminium Angle', dimensions: '19x12.7x1.6 polished', pricePerMeter: 98.7, weightPerMeter: 0.2, standardLengths: STD_LENGTHS, inStock: true, material: 'Aluminium', finish: 'Bright Polished' },
  { name: '19mm x 19mm x 1.6mm Aluminium Angle', nameEn: '19mm x 19mm x 1.6mm (3/4" x 3/4" x 1/16") Aluminium Angle', dimensions: '19x19x1.6', pricePerMeter: 2.45, weightPerMeter: 0.22, standardLengths: STD_LENGTHS, inStock: true, material: 'Aluminium', finish: 'Mill finish' },
  { name: '19mm x 19mm x 1.6mm Anodised Aluminium Angle', nameEn: '19mm x 19mm x 1.6mm (3/4" x 3/4" x 1/16") Anodised Aluminium Angle', dimensions: '19x19x1.6 anodised', pricePerMeter: 50.3, weightPerMeter: 0.22, standardLengths: STD_LENGTHS, inStock: true, material: 'Aluminium', finish: 'Anodised' },
  { name: '19mm x 19mm x 1.6mm Brushed Aluminium Angle', nameEn: '19mm x 19mm x 1.6mm (3/4" x 3/4" x 1/16") Brushed Aluminium Angle', dimensions: '19x19x1.6 brushed', pricePerMeter: 63.61, weightPerMeter: 0.22, standardLengths: STD_LENGTHS, inStock: true, material: 'Aluminium', finish: 'Brushed' },
  { name: '19mm x 19mm x 1.6mm Bright Polished Aluminium Angle', nameEn: '19mm x 19mm x 1.6mm (3/4" x 3/4" x 1/16") Bright Polished Aluminium Angle', dimensions: '19x19x1.6 polished', pricePerMeter: 99, weightPerMeter: 0.22, standardLengths: STD_LENGTHS, inStock: true, material: 'Aluminium', finish: 'Bright Polished' },
];

/** Aluminium Box Section products. pricePerMeter in GBP (ex VAT). */
const BOX_SECTION_PRODUCTS: Omit<Product, 'id' | 'category'>[] = [
  { name: '12.7mm x 12.7mm x 1.6mm Aluminium Box Section', nameEn: '12.7mm x 12.7mm x 1.6mm (1/2" x 1/2" x 16swg) Aluminium Box Section', dimensions: '12.7x12.7x1.6', pricePerMeter: 3.93, weightPerMeter: 0.15, standardLengths: STD_LENGTHS, inStock: true, material: 'Aluminium', finish: 'Mill finish' },
  { name: '19mm x 19mm x 1.6mm Aluminium Box Section', nameEn: '19mm x 19mm x 1.6mm (3/4" x 3/4" x 16swg) Aluminium Box Section', dimensions: '19x19x1.6', pricePerMeter: 3.99, weightPerMeter: 0.2, standardLengths: STD_LENGTHS, inStock: true, material: 'Aluminium', finish: 'Mill finish' },
  { name: '19mm x 19mm x 1.6mm Brushed Aluminium Box Section', nameEn: '19mm x 19mm x 1.6mm (3/4" x 3/4" x 16swg) Brushed Aluminium Box Section', dimensions: '19x19x1.6 brushed', pricePerMeter: 87.88, weightPerMeter: 0.2, standardLengths: STD_LENGTHS, inStock: true, material: 'Aluminium', finish: 'Brushed' },
  { name: '19mm x 19mm x 1.6mm Bright Polished Aluminium Box Section', nameEn: '19mm x 19mm x 1.6mm (3/4" x 3/4" x 16swg) Bright Polished Aluminium Box Section', dimensions: '19x19x1.6 polished', pricePerMeter: 108.02, weightPerMeter: 0.2, standardLengths: STD_LENGTHS, inStock: true, material: 'Aluminium', finish: 'Bright Polished' },
  { name: '19mm x 19mm x 3.2mm Aluminium Box Section', nameEn: '19mm x 19mm x 3.2mm (3/4" x 3/4" x 10swg) Aluminium Box Section', dimensions: '19x19x3.2', pricePerMeter: 9.59, weightPerMeter: 0.38, standardLengths: STD_LENGTHS, inStock: true, material: 'Aluminium', finish: 'Mill finish' },
  { name: '19mm x 19mm x 3.2mm Brushed Aluminium Box Section', nameEn: '19mm x 19mm x 3.2mm (3/4" x 3/4" x 10swg) Brushed Aluminium Box Section', dimensions: '19x19x3.2 brushed', pricePerMeter: 95.74, weightPerMeter: 0.38, standardLengths: STD_LENGTHS, inStock: true, material: 'Aluminium', finish: 'Brushed' },
  { name: '19mm x 19mm x 3.2mm Bright Polished Aluminium Box Section', nameEn: '19mm x 19mm x 3.2mm (3/4" x 3/4" x 10swg) Bright Polished Aluminium Box Section', dimensions: '19x19x3.2 polished', pricePerMeter: 149.51, weightPerMeter: 0.38, standardLengths: STD_LENGTHS, inStock: true, material: 'Aluminium', finish: 'Bright Polished' },
  { name: '20mm x 20mm x 1.5mm Aluminium Box Section', nameEn: '20mm x 20mm x 1.5mm Aluminium Box Section', dimensions: '20x20x1.5', pricePerMeter: 5.95, weightPerMeter: 0.2, standardLengths: STD_LENGTHS, inStock: true, material: 'Aluminium', finish: 'Mill finish' },
  { name: '25mm x 25mm x 1.5mm Aluminium Box Section', nameEn: '25mm x 25mm x 1.5mm Aluminium Box Section', dimensions: '25x25x1.5', pricePerMeter: 5.99, weightPerMeter: 0.25, standardLengths: STD_LENGTHS, inStock: true, material: 'Aluminium', finish: 'Mill finish' },
  { name: '25.4mm x 12.7mm x 1.6mm Aluminium Box Section', nameEn: '25.4mm x 12.7mm x 1.6mm (1" x 1/2" x 16swg) Aluminium Box Section', dimensions: '25.4x12.7x1.6', pricePerMeter: 12.6, weightPerMeter: 0.22, standardLengths: STD_LENGTHS, inStock: true, material: 'Aluminium', finish: 'Mill finish' },
  { name: '25.4mm x 25.4mm x 1.6mm Aluminium Box Section', nameEn: '25.4mm x 25.4mm x 1.6mm (1" x 1" x 16swg) Aluminium Box Section', dimensions: '25.4x25.4x1.6', pricePerMeter: 3.98, weightPerMeter: 0.3, standardLengths: STD_LENGTHS, inStock: true, material: 'Aluminium', finish: 'Mill finish' },
  { name: '25.4mm x 25.4mm x 1.6mm Brushed Aluminium Box Section', nameEn: '25.4mm x 25.4mm x 1.6mm (1" x 1" x 16swg) Brushed Aluminium Box Section', dimensions: '25.4x25.4x1.6 brushed', pricePerMeter: 66.08, weightPerMeter: 0.3, standardLengths: STD_LENGTHS, inStock: true, material: 'Aluminium', finish: 'Brushed' },
];

/** Aluminium Channel products. pricePerMeter in GBP (ex VAT). */
const CHANNEL_PRODUCTS: Omit<Product, 'id' | 'category'>[] = [
  {
    name: '12.7mm x 12.7mm x 1.6mm Aluminium Channel',
    nameEn: '12.7mm x 12.7mm x 1.6mm (1/2" x 1/2" x 1/16") Aluminium Channel',
    dimensions: '12.7x12.7x1.6',
    pricePerMeter: 4.15,
    weightPerMeter: 0.18,
    standardLengths: STD_LENGTHS,
    inStock: true,
    material: 'Aluminium',
    finish: 'Mill finish',
  },
  {
    name: '12.7mm x 12.7mm x 1.6mm Anodised Aluminium Channel',
    nameEn: '12.7mm x 12.7mm x 1.6mm (1/2" x 1/2" x 1/16") Anodised Aluminium Channel',
    dimensions: '12.7x12.7x1.6 anodised',
    pricePerMeter: 46.22,
    weightPerMeter: 0.18,
    standardLengths: STD_LENGTHS,
    inStock: true,
    material: 'Aluminium',
    finish: 'Anodised',
  },
  {
    name: '15.5mm x 7.5mm x 1mm Aluminium T Track',
    nameEn: '15.5mm x 7.5mm x 1mm Aluminium T Track',
    dimensions: '15.5x7.5x1',
    pricePerMeter: 14.8,
    weightPerMeter: 0.12,
    standardLengths: STD_LENGTHS,
    inStock: true,
    material: 'Aluminium',
    finish: 'Mill finish',
  },
  {
    name: '15.8mm x 15.8mm x 3.2mm Aluminium Channel',
    nameEn: '15.8mm x 15.8mm x 3.2mm (5/8" x 5/8" x 1/8") Aluminium Channel',
    dimensions: '15.8x15.8x3.2',
    pricePerMeter: 5.24,
    weightPerMeter: 0.28,
    standardLengths: STD_LENGTHS,
    inStock: true,
    material: 'Aluminium',
    finish: 'Mill finish',
  },
  {
    name: '19mm x 19mm x 1.6mm Aluminium Channel',
    nameEn: '19mm x 19mm x 1.6mm (3/4" x 3/4" x 1/16") Aluminium Channel',
    dimensions: '19x19x1.6',
    pricePerMeter: 3.98,
    weightPerMeter: 0.22,
    standardLengths: STD_LENGTHS,
    inStock: true,
    material: 'Aluminium',
    finish: 'Mill finish',
  },
  {
    name: '19mm x 19mm x 1.6mm Anodised Aluminium Channel',
    nameEn: '19mm x 19mm x 1.6mm (3/4" x 3/4" x 1/16") Anodised Aluminium Channel',
    dimensions: '19x19x1.6 anodised',
    pricePerMeter: 56.96,
    weightPerMeter: 0.22,
    standardLengths: STD_LENGTHS,
    inStock: true,
    material: 'Aluminium',
    finish: 'Anodised',
  },
  {
    name: '19mm x 19mm x 3.2mm Aluminium Channel',
    nameEn: '19mm x 19mm x 3.2mm (3/4" x 3/4" x 1/8") Aluminium Channel',
    dimensions: '19x19x3.2',
    pricePerMeter: 4.95,
    weightPerMeter: 0.35,
    standardLengths: STD_LENGTHS,
    inStock: true,
    material: 'Aluminium',
    finish: 'Mill finish',
  },
  {
    name: '25mm x 16mm x 3mm Aluminium Double Channel',
    nameEn: '25mm x 16mm x 3mm Aluminium Double Channel',
    dimensions: '25x16x3 double',
    pricePerMeter: 21.2,
    weightPerMeter: 0.65,
    standardLengths: STD_LENGTHS,
    inStock: true,
    material: 'Aluminium',
    finish: 'Mill finish',
  },
  {
    name: '25.4mm x 19mm x 3.2mm Aluminium Channel',
    nameEn: '25.4mm x 19mm x 3.2mm (1" x 3/4" x 1/8") Aluminium Channel',
    dimensions: '25.4x19x3.2',
    pricePerMeter: 6.23,
    weightPerMeter: 0.38,
    standardLengths: STD_LENGTHS,
    inStock: true,
    material: 'Aluminium',
    finish: 'Mill finish',
  },
  {
    name: '25.4mm x 25.4mm x 1.6mm Aluminium Channel',
    nameEn: '25.4mm x 25.4mm x 1.6mm (1" x 1" x 1/16") Aluminium Channel',
    dimensions: '25.4x25.4x1.6',
    pricePerMeter: 11.44,
    weightPerMeter: 0.35,
    standardLengths: STD_LENGTHS,
    inStock: true,
    material: 'Aluminium',
    finish: 'Mill finish',
  },
  {
    name: '25.4mm x 25.4mm x 3.2mm Aluminium Channel',
    nameEn: '25.4mm x 25.4mm x 3.2mm (1" x 1" x 1/8") Aluminium Channel',
    dimensions: '25.4x25.4x3.2',
    pricePerMeter: 6.7,
    weightPerMeter: 0.52,
    standardLengths: STD_LENGTHS,
    inStock: true,
    material: 'Aluminium',
    finish: 'Mill finish',
  },
  {
    name: '25.4mm x 25.4mm x 3.2mm Anodised Aluminium Channel',
    nameEn: '25.4mm x 25.4mm x 3.2mm (1" x 1" x 1/8") Anodised Aluminium Channel',
    dimensions: '25.4x25.4x3.2 anodised',
    pricePerMeter: 97.0,
    weightPerMeter: 0.52,
    standardLengths: STD_LENGTHS,
    inStock: true,
    material: 'Aluminium',
    finish: 'Anodised',
  },
];


async function main() {
  console.log('Replacing categories and products...');

  // 1. Remove old category overrides and custom categories
  deleteAllCategoryOverrides();
  console.log('Cleared category_overrides.');
  deleteAllCustomCategories();
  console.log('Cleared custom_categories.');

  // 2. Insert new 12 categories (raw insert so we can use ids like "angle", "channel")
  for (const cat of NEW_CATEGORIES) {
    insertCustomCategoryRaw({
      id: cat.id,
      name: cat.nameEn,
      nameEn: cat.nameEn,
      description: cat.description,
      image: null,
    });
  }
  console.log(`Inserted ${NEW_CATEGORIES.length} categories.`);

  // 3. Build full products with id and category (Angle, Box Section, Channel)
  const angleProducts: Product[] = ANGLE_PRODUCTS.map((p, i) => ({ ...p, id: `angle-${i + 1}`, category: 'angle' }));
  const boxProducts: Product[] = BOX_SECTION_PRODUCTS.map((p, i) => ({ ...p, id: `box_section-${i + 1}`, category: 'box_section' }));
  const channelProducts: Product[] = CHANNEL_PRODUCTS.map((p, i) => ({ ...p, id: `channel-${i + 1}`, category: 'channel' }));
  const products: Product[] = [...angleProducts, ...boxProducts, ...channelProducts];

  // 4. Replace all products (delete existing + insert new)
  await saveProducts(products);
  console.log(`Replaced products: ${angleProducts.length} angle + ${boxProducts.length} box section + ${channelProducts.length} channel = ${products.length} total.`);

  console.log('Done. Restart the app or refresh to see new categories and products.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
