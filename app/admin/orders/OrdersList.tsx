"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import PageBreadcrumb from "@/components/admin/PageBreadCrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/admin/ui/table";
import { formatDateTimeUK } from "@/lib/utils/formatters";

type OrderStatus = "new" | "processing" | "shipped" | "completed";

interface OrderListItem {
  id: string;
  created_at: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  total: number;
  total_weight: number;
  status?: OrderStatus;
}

const ORDERS_PER_PAGE = 20;
type SortKey = "created_at" | "customer_name" | "total";

export default function OrdersList() {
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "">("");

  const fetchOrders = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await fetch("/api/admin/orders");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch {
      setOrders([]);
      setFetchError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredByDate = useMemo(() => {
    let list = orders;
    if (dateFrom || dateTo) {
      list = list.filter((o) => {
        const d = new Date(o.created_at).getTime();
        if (dateFrom && d < new Date(dateFrom + "T00:00:00").getTime()) return false;
        if (dateTo && d > new Date(dateTo + "T23:59:59").getTime()) return false;
        return true;
      });
    }
    if (statusFilter) {
      list = list.filter((o) => (o.status || "new") === statusFilter);
    }
    return list;
  }, [orders, dateFrom, dateTo, statusFilter]);

  const sortedOrders = useMemo(() => {
    const copy = [...filteredByDate];
    copy.sort((a, b) => {
      if (sortKey === "created_at") {
        const t = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        return sortDir === "asc" ? t : -t;
      }
      if (sortKey === "customer_name") {
        const c = (a.customer_name || "").localeCompare(b.customer_name || "");
        return sortDir === "asc" ? c : -c;
      }
      const t = (a.total || 0) - (b.total || 0);
      return sortDir === "asc" ? t : -t;
    });
    return copy;
  }, [filteredByDate, sortKey, sortDir]);

  const totalPages = Math.ceil(sortedOrders.length / ORDERS_PER_PAGE);
  const paginatedOrders = useMemo(
    () =>
      sortedOrders.slice(
        (currentPage - 1) * ORDERS_PER_PAGE,
        currentPage * ORDERS_PER_PAGE
      ),
    [sortedOrders, currentPage]
  );

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir(key === "created_at" ? "desc" : "asc");
    }
    setCurrentPage(1);
  };

  const setDatePreset = (preset: "7" | "30" | "thisMonth") => {
    const now = new Date();
    const to = now.toISOString().slice(0, 10);
    let from: string;
    if (preset === "7") {
      const d = new Date(now);
      d.setDate(d.getDate() - 7);
      from = d.toISOString().slice(0, 10);
    } else if (preset === "30") {
      const d = new Date(now);
      d.setDate(d.getDate() - 30);
      from = d.toISOString().slice(0, 10);
    } else {
      from = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
    }
    setDateFrom(from);
    setDateTo(to);
    setCurrentPage(1);
  };

  const exportCsv = () => {
    const headers = ["Date", "Customer", "Email", "Phone", "Total (£)", "Weight (kg)"];
    const rows = sortedOrders.map((o) => [
      new Date(o.created_at).toISOString(),
      o.customer_name,
      o.customer_email,
      o.customer_phone,
      Number(o.total).toFixed(2),
      Number(o.total_weight).toFixed(2),
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${dateFrom || "all"}-${dateTo || "all"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Orders" />
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Website orders</h2>
          <p className="mt-1 text-sm text-gray-500">
            Orders are stored in the database and sent to Bitrix24 CRM. Email: info@alteg.co.uk
          </p>
        </div>

        <div className="px-5 py-3 border-b border-gray-100 flex flex-wrap items-center gap-3">
          <span className="text-sm text-gray-600">Date range:</span>
          <button
            type="button"
            onClick={() => setDatePreset("7")}
            className="rounded border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
          >
            Last 7 days
          </button>
          <button
            type="button"
            onClick={() => setDatePreset("30")}
            className="rounded border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
          >
            Last 30 days
          </button>
          <button
            type="button"
            onClick={() => setDatePreset("thisMonth")}
            className="rounded border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50"
          >
            This month
          </button>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => { setDateFrom(e.target.value); setCurrentPage(1); }}
            className="rounded border border-gray-300 px-2 py-1.5 text-sm"
          />
          <span className="text-gray-400">–</span>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => { setDateTo(e.target.value); setCurrentPage(1); }}
            className="rounded border border-gray-300 px-2 py-1.5 text-sm"
          />
          <button
            type="button"
            onClick={() => { setDateFrom(""); setDateTo(""); setCurrentPage(1); }}
            className="text-sm text-gray-500 hover:underline"
          >
            Clear
          </button>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value as OrderStatus | ""); setCurrentPage(1); }}
              className="rounded border border-gray-300 px-2 py-1.5 text-sm"
            >
              <option value="">All</option>
              <option value="new">New</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
            </select>
          </label>
          {sortedOrders.length > 0 && (
            <button
              type="button"
              onClick={exportCsv}
              className="ml-auto rounded bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-800"
            >
              Export CSV
            </button>
          )}
        </div>

        <div className="max-w-full overflow-x-auto">
          {fetchError ? (
            <div className="px-5 py-8 text-center">
              <p className="text-red-600 mb-2">{fetchError}</p>
              <button
                type="button"
                onClick={fetchOrders}
                className="rounded bg-gray-800 px-4 py-2 text-sm text-white hover:bg-gray-700"
              >
                Retry
              </button>
            </div>
          ) : loading ? (
            <p className="px-5 py-8 text-center text-gray-500">Loading...</p>
          ) : orders.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <p className="text-gray-500 mb-2">No orders yet.</p>
              <p className="text-sm text-gray-400">Orders will appear here when customers place them on the website.</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader className="border-y border-gray-100">
                  <TableRow>
                    <TableCell isHeader className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                      <button type="button" onClick={() => handleSort("created_at")} className="flex items-center gap-1 hover:text-gray-900">
                        Date {sortKey === "created_at" && (sortDir === "asc" ? "↑" : "↓")}
                      </button>
                    </TableCell>
                    <TableCell isHeader className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                      <button type="button" onClick={() => handleSort("customer_name")} className="flex items-center gap-1 hover:text-gray-900">
                        Customer {sortKey === "customer_name" && (sortDir === "asc" ? "↑" : "↓")}
                      </button>
                    </TableCell>
                    <TableCell isHeader className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                      Contact
                    </TableCell>
                    <TableCell isHeader className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                      <button type="button" onClick={() => handleSort("total")} className="flex items-center gap-1 hover:text-gray-900">
                        Amount {sortKey === "total" && (sortDir === "asc" ? "↑" : "↓")}
                      </button>
                    </TableCell>
                    <TableCell isHeader className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                      Weight (kg)
                    </TableCell>
                    <TableCell isHeader className="px-5 py-3 text-left text-sm font-semibold text-gray-700">
                      Status
                    </TableCell>
                    <TableCell isHeader className="px-5 py-3 text-right text-sm font-semibold text-gray-700">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-100">
                  {paginatedOrders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-gray-50">
                      <TableCell className="px-5 py-4 text-sm text-gray-600">
                        {formatDateTimeUK(order.created_at)}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-sm font-medium text-gray-900">
                        {order.customer_name}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-sm text-gray-600">
                        {order.customer_email}
                        <br />
                        <span className="text-gray-500">{order.customer_phone}</span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-sm font-medium text-gray-900">
                        £{Number(order.total).toFixed(2)}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-sm text-gray-600">
                        {Number(order.total_weight).toFixed(2)}
                      </TableCell>
                      <TableCell className="px-5 py-4 text-sm">
                        <span className="capitalize">{order.status || "new"}</span>
                      </TableCell>
                      <TableCell className="px-5 py-4 text-sm text-right">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          View
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {totalPages > 1 && (
                <div className="flex justify-end gap-2 px-5 py-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="rounded px-3 py-1 text-sm disabled:opacity-50"
                  >
                    ←
                  </button>
                  <span className="py-1 text-sm">
                    {currentPage} / {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded px-3 py-1 text-sm disabled:opacity-50"
                  >
                    →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
