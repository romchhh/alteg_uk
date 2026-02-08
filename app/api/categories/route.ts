import { NextResponse } from 'next/server';
import { PRODUCT_CATEGORIES } from '@/lib/constants/catalog';
import { getCategoryOverrides, getCustomCategories } from '@/lib/data/categories';

/**
 * Public API: returns categories (built-in with overrides + custom) for catalog, checkout, etc.
 */
export async function GET() {
  try {
    const overrides = getCategoryOverrides();
    const overrideMap = new Map(overrides.map((o) => [o.id, o]));

    const builtIn = Object.entries(PRODUCT_CATEGORIES).map(([key, val]) => {
      const ov = overrideMap.get(key);
      return {
        id: key,
        name: ov?.name ?? val.name,
        nameEn: ov?.name_en ?? val.nameEn,
        description: ov?.description ?? val.description,
        image: ov?.image ?? val.image,
      };
    });
    const custom = getCustomCategories().map((c) => ({
      id: c.id,
      name: c.name,
      nameEn: c.name_en,
      description: c.description ?? '',
      image: c.image ?? '',
    }));
    return NextResponse.json([...builtIn, ...custom]);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
