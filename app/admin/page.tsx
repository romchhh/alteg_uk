import type { Metadata } from "next";
import React from "react";
import { EcommerceMetrics } from "@/components/admin/EcommerceMetrics";
import MonthlySalesChart from "@/components/admin/MonthlySalesChart";
import RecentOrders from "@/components/admin/RecentOrders";

export const metadata: Metadata = {
  title: "Dashboard | Admin ALTEG",
  description: "ALTEG UK admin dashboard",
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <EcommerceMetrics />
        <MonthlySalesChart />
        <RecentOrders />
      </div>
    </div>
  );
}
