import { NextRequest, NextResponse } from "next/server";
import { getOrderById, updateOrderStatus, type OrderStatus } from "@/lib/data/orders";

const VALID_STATUSES: OrderStatus[] = ["new", "processing", "shipped", "completed"];

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const row = getOrderById(id);
  if (!row) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  return NextResponse.json({
    id: row.id,
    created_at: row.created_at,
    status: row.status || "new",
    order: row.order,
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const row = getOrderById(id);
  if (!row) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  try {
    const body = await request.json();
    const status = body.status;
    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }
    updateOrderStatus(id, status);
    return NextResponse.json({ ok: true, status });
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
