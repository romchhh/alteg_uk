import { NextRequest, NextResponse } from 'next/server';
import { bulkUpdateProducts } from '@/lib/data/products';
import { z } from 'zod';

const bulkUpdateSchema = z.object({
  pricePerKg: z.number().min(0).optional(),
  weightPerMeter: z.number().min(0).optional(),
}).refine((d) => d.pricePerKg != null || d.weightPerMeter != null, {
  message: 'Provide at least one of pricePerKg or weightPerMeter',
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = bulkUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid body', details: parsed.error.errors },
        { status: 400 }
      );
    }
    const count = await bulkUpdateProducts(parsed.data);
    return NextResponse.json({ updated: count, message: `Updated ${count} products` });
  } catch (error) {
    console.error('Bulk update error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Bulk update failed' },
      { status: 500 }
    );
  }
}
