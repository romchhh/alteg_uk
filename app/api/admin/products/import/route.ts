import { NextResponse } from "next/server";
import { saveProducts } from "@/lib/data/products";
import { CATALOG_PRODUCTS } from "@/lib/constants/catalog";

export async function POST() {
  try {
    await saveProducts(CATALOG_PRODUCTS);
    return NextResponse.json({
      success: true,
      count: CATALOG_PRODUCTS.length,
      message: `Імпортовано ${CATALOG_PRODUCTS.length} товарів з каталогу`,
    });
  } catch (error) {
    console.error("Error importing products:", error);
    return NextResponse.json(
      { error: "Failed to import products" },
      { status: 500 }
    );
  }
}
