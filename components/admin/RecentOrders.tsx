"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/admin/ui/table";
import { formatDateTimeUK } from "@/lib/utils/formatters";

interface Order {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total: number;
  total_weight: number;
}

export default function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/admin/orders");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setOrders(Array.isArray(data) ? data.slice(0, 5) : []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 sm:px-6">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Recent orders</h3>
        <Link
          href="/admin/orders"
          className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          All orders
        </Link>
      </div>

      <div className="max-w-full overflow-x-auto">
        {loading ? (
          <p className="py-6 text-center text-gray-500">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="py-6 text-center text-gray-500">
            No orders yet. They will appear here and in the{" "}
            <Link href="/admin/orders" className="text-gray-900 underline">
              Orders section
            </Link>
            .
          </p>
        ) : (
          <Table>
            <TableHeader className="border-y border-gray-100">
              <TableRow>
                <TableCell isHeader className="py-3 text-start text-xs font-medium text-gray-500">
                  Customer
                </TableCell>
                <TableCell isHeader className="py-3 text-start text-xs font-medium text-gray-500">
                  Contact
                </TableCell>
                <TableCell isHeader className="py-3 text-start text-xs font-medium text-gray-500">
                  Amount
                </TableCell>
                <TableCell isHeader className="py-3 text-start text-xs font-medium text-gray-500">
                  Date
                </TableCell>
                <TableCell isHeader className="py-3 text-end text-xs font-medium text-gray-500">
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="py-3">
                    <p className="font-medium text-gray-900">{order.customer_name}</p>
                  </TableCell>
                  <TableCell className="py-3 text-sm text-gray-600">
                    {order.customer_email} · {order.customer_phone}
                  </TableCell>
                  <TableCell className="py-3 text-sm font-medium text-gray-900">
                    £{Number(order.total).toFixed(2)}
                  </TableCell>
                  <TableCell className="py-3 text-sm text-gray-600">
                    {formatDateTimeUK(order.created_at)}
                  </TableCell>
                  <TableCell className="py-3 text-end">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
