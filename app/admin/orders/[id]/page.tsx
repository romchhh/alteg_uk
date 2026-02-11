"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import PageBreadcrumb from "@/components/admin/PageBreadCrumb";
import { formatDateTimeUK } from "@/lib/utils/formatters";
import { getUploadImageSrc } from "@/lib/utils/image";
import { PRODUCT_CATEGORIES } from "@/lib/constants/catalog";
import type { Order } from "@/lib/types/order";
import type { ProductCategory } from "@/lib/types/product";

type OrderStatus = "new" | "processing" | "shipped" | "completed";

interface OrderDetailResponse {
  id: string;
  created_at: string;
  status?: OrderStatus;
  order: Order;
}

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [data, setData] = useState<OrderDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusUpdating, setStatusUpdating] = useState(false);

  const updateStatus = async (status: OrderStatus) => {
    if (!id) return;
    setStatusUpdating(true);
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok && data) setData({ ...data, status });
    } finally {
      setStatusUpdating(false);
    }
  };

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    fetch(`/api/admin/orders/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Order not found");
        return res.json();
      })
      .then((d: OrderDetailResponse) => setData(d))
      .catch(() => setError("Failed to load order"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div>
        <PageBreadcrumb pageTitle="Order" />
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div>
        <PageBreadcrumb pageTitle="Order" />
        <p className="text-red-600">{error || "Order not found"}</p>
        <button
          type="button"
          onClick={() => router.back()}
          className="mt-4 rounded-lg border border-gray-300 px-6 py-2.5 text-sm"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div>
      <PageBreadcrumb pageTitle={`Order ${data.id}`} segments={[{ label: "Orders", href: "/admin/orders" }, { label: data.id }]} />
      <div className="space-y-6 max-w-4xl">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm hover:bg-gray-50"
          >
            ← Back to orders
          </button>
          <Link
            href="/admin/orders"
            className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm hover:bg-gray-50"
          >
            All orders
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-medium text-gray-900">
              Date & time (UK): {formatDateTimeUK(data.created_at)}
            </p>
            <label className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Status:</span>
              <select
                value={data.status || "new"}
                onChange={(e) => updateStatus(e.target.value as OrderStatus)}
                disabled={statusUpdating}
                className="rounded border border-gray-300 px-3 py-1.5 text-sm disabled:opacity-50"
              >
                <option value="new">New</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="completed">Completed</option>
              </select>
              {statusUpdating && <span className="text-gray-400 text-xs">Saving…</span>}
            </label>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="rounded-lg border border-gray-200 p-4 bg-white">
              <h4 className="text-sm font-semibold text-gray-900 mb-3 border-b border-gray-100 pb-2">Customer</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><span className="text-gray-500">Name:</span> {data.order.customer.name}</li>
                <li><span className="text-gray-500">Email:</span> {data.order.customer.email}</li>
                <li><span className="text-gray-500">Phone:</span> {data.order.customer.phone}</li>
                {data.order.customer.company && (
                  <li><span className="text-gray-500">Company:</span> {data.order.customer.company}</li>
                )}
              </ul>
            </section>
            <section className="rounded-lg border border-gray-200 p-4 bg-white">
              <h4 className="text-sm font-semibold text-gray-900 mb-3 border-b border-gray-100 pb-2">Delivery</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><span className="text-gray-500">Postcode:</span> {data.order.delivery.postcode}</li>
                {data.order.delivery.method && (
                  <li><span className="text-gray-500">Method:</span> {data.order.delivery.method}</li>
                )}
                {data.order.delivery.instructions && (
                  <li><span className="text-gray-500">Instructions:</span> {data.order.delivery.instructions}</li>
                )}
              </ul>
            </section>
          </div>

          <section className="px-6 pb-6">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Items</h4>
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700 w-14">Photo</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Product</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Dimensions</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Length (m)</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Qty</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Total m</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Price</th>
                    <th className="px-3 py-2 text-right font-semibold text-gray-700">Weight (kg)</th>
                    <th className="px-3 py-2 text-left font-semibold text-gray-700">Cut / Instructions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.order.cart.map((item) => {
                    const cat = item.product.category as ProductCategory | undefined;
                    const categoryImage = cat && PRODUCT_CATEGORIES[cat] ? (PRODUCT_CATEGORIES[cat] as { image?: string }).image : undefined;
                    const productImage = item.product.image || categoryImage;
                    return (
                      <tr key={item.id} className="hover:bg-gray-50/50">
                        <td className="px-3 py-2 align-middle">
                          {productImage ? (
                            <div className="relative w-10 h-10 rounded overflow-hidden bg-gray-100 shrink-0">
                              <Image src={getUploadImageSrc(productImage, true)} alt={item.product.nameEn} fill className="object-cover" sizes="40px" />
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center text-gray-400 shrink-0">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                          )}
                        </td>
                        <td className="px-3 py-2 font-medium text-gray-900">{item.product.nameEn}</td>
                        <td className="px-3 py-2 text-gray-600">{item.product.dimensions}</td>
                        <td className="px-3 py-2 text-right text-gray-600">{item.length}</td>
                        <td className="px-3 py-2 text-right text-gray-600">{item.quantity}</td>
                        <td className="px-3 py-2 text-right text-gray-600">{(item.length * item.quantity).toFixed(2)}</td>
                        <td className="px-3 py-2 text-right font-medium text-gray-900">£{item.calculatedPrice.toFixed(2)}</td>
                        <td className="px-3 py-2 text-right text-gray-600">{item.calculatedWeight.toFixed(2)}</td>
                        <td className="px-3 py-2 text-left text-gray-600 max-w-[200px]">
                          {item.freeCutting && (
                            <span className="block text-green-700 font-medium">Free cutting to size</span>
                          )}
                          {item.additionalProcessing && (
                            <span className="block text-sm mt-0.5">{item.additionalProcessing}</span>
                          )}
                          {!item.freeCutting && !item.additionalProcessing && (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <h4 className="text-sm font-semibold text-gray-900 mb-3">Summary</h4>
            <ul className="text-sm text-gray-700 space-y-2 max-w-xs">
              <li className="flex justify-between"><span>Subtotal</span><span>£{data.order.subtotal.toFixed(2)}</span></li>
              <li className="flex justify-between"><span>Delivery</span><span>£{data.order.deliveryCost.toFixed(2)}</span></li>
              <li className="flex justify-between font-semibold text-gray-900 pt-2 border-t border-gray-200"><span>Total</span><span>£{data.order.total.toFixed(2)}</span></li>
              <li className="flex justify-between"><span>Weight</span><span>{data.order.totalWeight.toFixed(2)} kg</span></li>
              {data.order.isWholesale && (
                <li className="text-[#445DFE] font-medium">Wholesale order</li>
              )}
            </ul>
          </div>

          {data.order.notes && (
            <div className="px-6 py-4 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Notes</h4>
              <p className="text-sm text-gray-700">{data.order.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
