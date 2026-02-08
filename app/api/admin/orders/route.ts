import { NextResponse } from "next/server";
import { getOrders } from "@/lib/data/orders";

export async function GET() {
  try {
    const rows = getOrders();
    const list = rows.map((r) => ({
      id: r.id,
      created_at: r.created_at,
      customer_name: r.customer_name,
      customer_email: r.customer_email,
      customer_phone: r.customer_phone,
      total: r.total,
      total_weight: r.total_weight,
      status: r.status || "new",
    }));
    return NextResponse.json(list);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
