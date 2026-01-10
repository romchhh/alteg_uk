import { Product, ProductCategory } from '@/lib/types/product';
import { SAMPLE_PRODUCTS } from '@/lib/constants/products';

export async function getAllProducts(): Promise<Product[]> {
  // In production, this would fetch from an API or database
  // For now, return sample data
  return Promise.resolve(SAMPLE_PRODUCTS);
}

export async function getProductsByCategory(category: ProductCategory): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((product) => product.category === category);
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getAllProducts();
  return products.find((product) => product.id === id) || null;
}

export async function searchProducts(query: string): Promise<Product[]> {
  const products = await getAllProducts();
  const lowerQuery = query.toLowerCase();
  
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.nameEn.toLowerCase().includes(lowerQuery) ||
      product.dimensions.toLowerCase().includes(lowerQuery) ||
      (product.applications && product.applications.some((app) => app.toLowerCase().includes(lowerQuery)))
  );
}
