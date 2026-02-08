"use client";

import React, { useEffect, useState } from "react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface OrderRow {
  created_at?: string;
  total?: number;
}

export default function MonthlySalesChart() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(() => new Date().getFullYear());

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/admin/orders");
        if (!res.ok) return;
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const years = React.useMemo(() => {
    const y = new Set<number>();
    orders.forEach((o) => {
      if (o.created_at) y.add(new Date(o.created_at).getFullYear());
    });
    const current = new Date().getFullYear();
    if (!y.has(current)) y.add(current);
    return Array.from(y).sort((a, b) => b - a);
  }, [orders]);

  const { counts, revenues } = React.useMemo(() => {
    const counts = new Array(12).fill(0);
    const revenues = new Array(12).fill(0);
    orders.forEach((order) => {
      const date = order.created_at ? new Date(order.created_at) : new Date();
      if (date.getFullYear() !== selectedYear) return;
      const month = date.getMonth();
      counts[month]++;
      revenues[month] += Number(order.total) || 0;
    });
    return { counts, revenues };
  }, [orders, selectedYear]);

  const maxCount = Math.max(1, ...counts);
  const maxRevenue = Math.max(1, ...revenues);
  const yearTotalOrders = counts.reduce((a, b) => a + b, 0);
  const yearTotalRevenue = revenues.reduce((a, b) => a + b, 0);

  if (loading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 py-8 sm:px-6">
        <h3 className="text-lg font-semibold text-gray-900">Orders & revenue by month</h3>
        <p className="mt-4 text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 sm:px-6 sm:pt-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-gray-900">Orders & revenue by month</h3>
        {years.length > 0 && (
          <label className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Year:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <p className="mb-4 text-sm text-gray-600">
        Total in {selectedYear}: <strong>{yearTotalOrders}</strong> orders, <strong>£{yearTotalRevenue.toFixed(2)}</strong> revenue
      </p>

      <div className="space-y-6">
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Order count</p>
          <div className="flex items-end justify-between gap-1 pb-2" style={{ minHeight: "160px" }}>
            {MONTHS.map((month, i) => (
              <div key={month} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full max-w-[32px] rounded-t bg-blue-200 hover:bg-blue-300 transition-colors"
                  style={{
                    height: `${(counts[i] / maxCount) * 120}px`,
                    minHeight: counts[i] > 0 ? "6px" : "0",
                  }}
                  title={`${month}: ${counts[i]} order${counts[i] !== 1 ? "s" : ""}`}
                />
                {counts[i] > 0 && (
                  <span className="text-xs font-medium text-gray-700">{counts[i]}</span>
                )}
                <span className="text-xs text-gray-500">{month}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Revenue (£)</p>
          <div className="flex items-end justify-between gap-1 pb-2" style={{ minHeight: "160px" }}>
            {MONTHS.map((month, i) => (
              <div key={month} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full max-w-[32px] rounded-t bg-green-200 hover:bg-green-300 transition-colors"
                  style={{
                    height: `${(revenues[i] / maxRevenue) * 120}px`,
                    minHeight: revenues[i] > 0 ? "6px" : "0",
                  }}
                  title={`${month}: £${revenues[i].toFixed(2)}`}
                />
                {revenues[i] > 0 && (
                  <span className="text-xs font-medium text-gray-700">£{revenues[i].toFixed(0)}</span>
                )}
                <span className="text-xs text-gray-500">{month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
