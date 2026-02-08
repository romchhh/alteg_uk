"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Package, ShoppingCart, PoundSterling, Calendar } from "lucide-react";

export const EcommerceMetrics: React.FC = () => {
  const [ordersCount, setOrdersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [monthOrders, setMonthOrders] = useState(0);
  const [monthRevenue, setMonthRevenue] = useState(0);
  const [lastMonthOrders, setLastMonthOrders] = useState(0);
  const [lastMonthRevenue, setLastMonthRevenue] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, ordersRes] = await Promise.all([
          fetch("/api/admin/products"),
          fetch("/api/admin/orders"),
        ]);

        const products = productsRes.ok ? await productsRes.json() : [];
        const orders = ordersRes.ok ? await ordersRes.json() : [];
        const ordersList = Array.isArray(orders) ? orders : [];

        setProductsCount(Array.isArray(products) ? products.length : 0);
        setOrdersCount(ordersList.length);

        let totalRev = 0;
        const now = new Date();
        const thisYear = now.getFullYear();
        const thisMonth = now.getMonth();
        const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
        const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;
        let monthOrd = 0;
        let monthRev = 0;
        let lastOrd = 0;
        let lastRev = 0;

        for (const order of ordersList) {
          const tot = Number((order as { total?: number }).total) || 0;
          totalRev += tot;
          const d = (order as { created_at?: string }).created_at ? new Date((order as { created_at: string }).created_at) : null;
          if (!d) continue;
          if (d.getFullYear() === thisYear && d.getMonth() === thisMonth) {
            monthOrd++;
            monthRev += tot;
          } else if (d.getFullYear() === lastMonthYear && d.getMonth() === lastMonth) {
            lastOrd++;
            lastRev += tot;
          }
        }
        setTotalRevenue(totalRev);
        setMonthOrders(monthOrd);
        setMonthRevenue(monthRev);
        setLastMonthOrders(lastOrd);
        setLastMonthRevenue(lastRev);
      } catch {
        setProductsCount(0);
        setOrdersCount(0);
        setMonthOrders(0);
        setMonthRevenue(0);
        setLastMonthOrders(0);
        setLastMonthRevenue(0);
      }
    }

    fetchData();
  }, []);

  const monthOrdersDiff = lastMonthOrders > 0 ? monthOrders - lastMonthOrders : null;
  const monthRevenueDiffPct = lastMonthRevenue > 0
    ? ((monthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100
    : null;

  const cards = [
    {
      label: "Orders",
      value: String(ordersCount),
      icon: ShoppingCart,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-800",
      href: "/admin/orders",
    },
    {
      label: "Products",
      value: String(productsCount),
      icon: Package,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-800",
      href: "/admin/products",
    },
    {
      label: "Total revenue",
      value: `£${totalRevenue.toFixed(2)}`,
      icon: PoundSterling,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "Orders this month",
      value: String(monthOrders),
      sub: monthOrdersDiff != null ? `${monthOrdersDiff >= 0 ? "+" : ""}${monthOrdersDiff} vs last month` : undefined,
      icon: Calendar,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Revenue this month",
      value: `£${monthRevenue.toFixed(2)}`,
      sub: monthRevenueDiffPct != null ? `${monthRevenueDiffPct >= 0 ? "+" : ""}${monthRevenueDiffPct.toFixed(0)}% vs last month` : undefined,
      icon: PoundSterling,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 md:gap-6">
      {cards.map((item) => {
        const Icon = item.icon;
        const href = "href" in item ? (item as { href?: string }).href : undefined;
        const content = (
          <>
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-xl ${item.iconBg} ${item.iconColor}`}
            >
              <Icon className="size-6" />
            </div>
            <div className="mt-5 flex items-end justify-between">
              <div>
                <span className="text-sm text-gray-500">{item.label}</span>
                <h4 className="mt-2 text-lg font-bold text-gray-900">{item.value}</h4>
                {"sub" in item && (item as { sub?: string }).sub && (
                  <p className="mt-1 text-xs text-gray-500">{(item as { sub: string }).sub}</p>
                )}
              </div>
            </div>
          </>
        );
        const className = "rounded-2xl border border-gray-200 bg-white p-5 md:p-6";
        if (href) {
          return (
            <Link key={item.label} href={href} className={`block ${className} hover:border-gray-300 transition-colors`}>
              {content}
            </Link>
          );
        }
        return (
          <div key={item.label} className={className}>
            {content}
          </div>
        );
      })}
    </div>
  );
};
