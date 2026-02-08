import { getDb } from '@/lib/db/sqlite';
import type { Order } from '@/lib/types/order';
import { randomUUID } from 'crypto';

export type OrderStatus = 'new' | 'processing' | 'shipped' | 'completed';

export interface OrderRow {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total: number;
  total_weight: number;
  payload: string;
  status?: OrderStatus;
}

export function saveOrder(order: Order): string {
  const id = randomUUID();
  const database = getDb();
  const created_at = (order.createdAt ?? new Date()).toISOString();
  const customer_name = order.customer.name;
  const customer_email = order.customer.email;
  const customer_phone = order.customer.phone;
  const total = order.total;
  const total_weight = order.totalWeight;
  const payload = JSON.stringify(order);

  database
    .prepare(
      `INSERT INTO orders (id, created_at, customer_name, customer_email, customer_phone, total, total_weight, payload, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new')`
    )
    .run(id, created_at, customer_name, customer_email, customer_phone, total, total_weight, payload);

  return id;
}

export function getOrders(): OrderRow[] {
  const database = getDb();
  const rows = database
    .prepare(
      `SELECT id, created_at, customer_name, customer_email, customer_phone, total, total_weight, payload, COALESCE(status, 'new') as status
       FROM orders ORDER BY created_at DESC`
    )
    .all() as OrderRow[];
  return rows;
}

export function getOrderById(id: string): (OrderRow & { order: Order }) | null {
  const database = getDb();
  const row = database
    .prepare(
      `SELECT id, created_at, customer_name, customer_email, customer_phone, total, total_weight, payload, COALESCE(status, 'new') as status
       FROM orders WHERE id = ?`
    )
    .get(id) as OrderRow | undefined;

  if (!row) return null;

  try {
    const order = JSON.parse(row.payload) as Order;
    return { ...row, order };
  } catch {
    return null;
  }
}

export function updateOrderStatus(id: string, status: OrderStatus): boolean {
  const database = getDb();
  const r = database.prepare('UPDATE orders SET status = ? WHERE id = ?').run(status, id);
  return r.changes > 0;
}
