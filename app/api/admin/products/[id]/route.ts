import { NextRequest, NextResponse } from 'next/server';
import { getProductById, updateProduct, deleteProduct } from '@/lib/data/products';
import { z } from 'zod';

const productUpdateSchema = z.object({
  category: z.string().optional(),
  name: z.string().optional(),
  nameEn: z.string().optional(),
  dimensions: z.string().optional(),
  pricePerMeter: z.number().optional(),
  pricePerKg: z.number().optional(),
  weightPerMeter: z.number().optional(),
  standardLengths: z.array(z.number()).optional(),
  inStock: z.boolean().optional(),
  hidden: z.boolean().optional(),
  material: z.string().optional(),
  finish: z.string().optional(),
  image: z.string().optional(),
  description: z.string().optional(),
  descriptionEn: z.string().optional(),
});

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await getProductById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = productUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid product data', details: parsed.error.errors },
        { status: 400 }
      );
    }
    const update: Record<string, unknown> = { ...parsed.data };
    if (body.applications !== undefined) update.applications = body.applications;
    await updateProduct(id, update);
    const product = await getProductById(id);
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteProduct(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete product' },
      { status: 500 }
    );
  }
}
