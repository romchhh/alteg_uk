import React, { Suspense } from "react";
import PageBreadcrumb from "@/components/admin/PageBreadCrumb";
import ProductsTable from "@/components/admin/tables/ProductsTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products | Admin ALTEG",
  description: "Product management",
};

export default function ProductsPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Products" />
      <div className="space-y-6">
        <Suspense fallback={<div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">Loading products…</div>}>
          <ProductsTable />
        </Suspense>
      </div>
    </div>
  );
}
