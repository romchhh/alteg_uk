import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, getProductsByCategory, searchProducts } from '@/lib/services/products';
import { ProductCategory } from '@/lib/types/product';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') as ProductCategory | null;
    const query = searchParams.get('q');

    let products;

    if (query) {
      products = await searchProducts(query);
    } else if (category) {
      products = await getProductsByCategory(category);
    } else {
      products = await getAllProducts();
    }

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
