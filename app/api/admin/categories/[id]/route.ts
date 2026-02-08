import { NextRequest, NextResponse } from 'next/server';
import {
  getCategoryOverride,
  upsertCategoryOverride,
  getCustomCategory,
  updateCustomCategory,
  deleteCustomCategory,
  isValidCategoryId,
  isCustomCategoryId,
} from '@/lib/data/categories';
import { PRODUCT_CATEGORIES } from '@/lib/constants/catalog';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const custom = getCustomCategory(id);
  if (custom) {
    return NextResponse.json({
      id: custom.id,
      name: custom.name,
      nameEn: custom.name_en,
      description: custom.description ?? '',
      image: custom.image ?? '',
      isCustom: true,
    });
  }
  if (isValidCategoryId(id)) {
    const override = getCategoryOverride(id);
    const base = PRODUCT_CATEGORIES[id];
    return NextResponse.json({
      id,
      name: override?.name ?? base.name,
      nameEn: override?.name_en ?? base.nameEn,
      description: override?.description ?? base.description ?? '',
      image: override?.image ?? base.image ?? '',
      isCustom: false,
    });
  }
  return NextResponse.json({ error: 'Category not found' }, { status: 404 });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  try {
    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name : undefined;
    const nameEn = typeof body.nameEn === 'string' ? body.nameEn : undefined;
    const description = typeof body.description === 'string' ? body.description : undefined;
    const image = typeof body.image === 'string' ? body.image : undefined;

    if (isCustomCategoryId(id)) {
      const custom = getCustomCategory(id);
      if (!custom) return NextResponse.json({ error: 'Category not found' }, { status: 404 });
      updateCustomCategory(id, { name, nameEn, description, image });
      const updated = getCustomCategory(id);
      return NextResponse.json({
        id: updated!.id,
        name: updated!.name,
        nameEn: updated!.name_en,
        description: updated!.description ?? '',
        image: updated!.image ?? '',
        isCustom: true,
      });
    }
    if (!isValidCategoryId(id)) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    upsertCategoryOverride(id, { name, nameEn, description, image });
    const override = getCategoryOverride(id);
    const base = PRODUCT_CATEGORIES[id];
    return NextResponse.json({
      id,
      name: override?.name ?? base.name,
      nameEn: override?.name_en ?? base.nameEn,
      description: override?.description ?? base.description ?? '',
      image: override?.image ?? base.image ?? '',
      isCustom: false,
    });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update category' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  if (!isCustomCategoryId(id)) {
    return NextResponse.json(
      { error: 'Cannot delete built-in category' },
      { status: 400 }
    );
  }
  try {
    deleteCustomCategory(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete category' },
      { status: 500 }
    );
  }
}
