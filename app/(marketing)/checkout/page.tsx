'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { OrderForm, type OrderSuccessData } from '@/components/forms/OrderForm';
import { Button } from '@/components/shared/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/Card';
import { formatCurrency, formatWeight } from '@/lib/utils/calculations';
import { getUploadImageSrc } from '@/lib/utils/image';
import { Icon } from '@/components/shared/Icon';
import { PRODUCT_CATEGORIES } from '@/lib/constants/catalog';

const HOMEPAGE_SECTION_IDS = ['catalog', 'advantages', 'how-to-order', 'faq', 'trust', 'features', 'about', 'calculator', 'customer-segments'];

export default function CheckoutPage() {
  const { items, total, subtotal, discountAmount, discountPercent, totalWeight, itemCount } = useCart();
  const hasDiscount = discountAmount > 0;
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<OrderSuccessData | null>(null);
  const [categoriesMap, setCategoriesMap] = useState<Record<string, { image?: string }> | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
    if (hash && HOMEPAGE_SECTION_IDS.includes(hash)) {
      window.location.replace(`/#${hash}`);
    }
  }, []);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.ok ? res.json() : null)
      .then((list: { id: string; image?: string }[] | null) => {
        if (!Array.isArray(list)) return;
        const next: Record<string, { image?: string }> = {};
        list.forEach((c) => { next[c.id] = { image: c.image }; });
        setCategoriesMap(next);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (showSuccess) window.scrollTo(0, 0);
  }, [showSuccess]);

  const handleSuccess = (data: OrderSuccessData) => {
    setSuccessData(data);
    setShowSuccess(true);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  if (showSuccess && successData) {
    const d = successData;
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#E9EDF4] to-white pt-20 md:pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#050544] mb-2">Order accepted</h1>
            <p className="text-gray-600 max-w-md mx-auto">
              Your order has been accepted for processing. We will contact you shortly to confirm the details.
            </p>
          </div>

          {/* Customer & Delivery in a row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Customer</h2>
              <p className="text-gray-900 font-medium">{d.customer.name}</p>
              <p className="text-sm text-gray-600 mt-0.5">{d.customer.email}</p>
              <p className="text-sm text-gray-600">{d.customer.phone}</p>
              {d.customer.company && <p className="text-sm text-gray-500 mt-1">{d.customer.company}</p>}
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Delivery</h2>
              <p className="text-gray-900 font-medium">Postcode: {d.delivery.postcode}</p>
              {d.delivery.method && <p className="text-sm text-gray-600">{d.delivery.method}</p>}
              {d.delivery.instructions && <p className="text-sm text-gray-600 mt-1">{d.delivery.instructions}</p>}
            </div>
          </div>

          {/* Order summary */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">Order summary</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-600 text-left text-xs font-semibold uppercase tracking-wider">
                    <th className="px-4 py-3">Product</th>
                    <th className="px-4 py-3 hidden sm:table-cell">Dimensions</th>
                    <th className="px-4 py-3 text-right">Length</th>
                    <th className="px-4 py-3 text-right">Qty</th>
                    <th className="px-4 py-3 text-right">Total m</th>
                    <th className="px-4 py-3 text-right">Price</th>
                    <th className="px-4 py-3 text-right">Weight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {d.items.map((item, idx) => {
                    const categoryImage = item.category ? (PRODUCT_CATEGORIES as Record<string, { image?: string }>)[item.category]?.image || categoriesMap?.[item.category]?.image : undefined;
                    const productImage = item.image || categoryImage;
                    return (
                      <tr key={idx} className="hover:bg-gray-50/50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {productImage ? (
                              <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                                <Image src={getUploadImageSrc(productImage)} alt={item.productName} fill className="object-cover" sizes="44px" unoptimized={productImage.startsWith("/uploads") || productImage.startsWith("/api/uploads")} />
                              </div>
                            ) : (
                              <div className="w-11 h-11 rounded-lg bg-gray-200 shrink-0 flex items-center justify-center text-gray-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                              </div>
                            )}
                            <span className="font-medium text-gray-900">{item.productName}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{item.dimensions}</td>
                        <td className="px-4 py-3 text-right text-gray-600">{item.length}</td>
                        <td className="px-4 py-3 text-right text-gray-600">{item.quantity}</td>
                        <td className="px-4 py-3 text-right text-gray-600">{(item.length * item.quantity).toFixed(2)}</td>
                        <td className="px-4 py-3 text-right font-medium text-gray-900">{formatCurrency(item.calculatedPrice)}</td>
                        <td className="px-4 py-3 text-right text-gray-500">{formatWeight(item.calculatedWeight)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-4 bg-gray-50 border-t border-gray-200 space-y-2 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>{formatCurrency(d.subtotal)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Delivery</span><span>{formatCurrency(d.deliveryCost)}</span></div>
              <div className="flex justify-between font-semibold text-gray-900 pt-2 border-t border-gray-200 text-base"><span>Total</span><span className="text-[#050544]">{formatCurrency(d.total)}</span></div>
              <div className="flex justify-between text-gray-500 text-xs"><span>Weight</span><span>{formatWeight(d.totalWeight)}</span></div>
              {d.isWholesale && <p className="text-[#445DFE] font-medium text-xs">Wholesale order</p>}
            </div>
          </div>

          {d.notes && (
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm mb-6">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Notes</h2>
              <p className="text-sm text-gray-700">{d.notes}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/#catalog" className="order-2 sm:order-1">
              <Button variant="outline" className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 hover:bg-gray-50">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/" className="order-1 sm:order-2">
              <Button variant="primary" className="w-full sm:w-auto bg-[#050544] hover:bg-[#445DFE] text-white">
                Go to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0 && !showSuccess) {
    return (
      <main className="min-h-screen bg-gray-50 pt-24 md:pt-32 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Card>
            <CardContent className="text-center py-12">
              <Icon name="cart" size={64} className="mx-auto mb-4 text-gray-400" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add products to your cart to proceed with checkout.</p>
              <Link href="/#products">
                <Button>Browse Products</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
            <p className="text-gray-900">
              Review your order and complete your purchase
            </p>
          </div>
          <Link
            href="/#catalog"
            className="inline-flex items-center gap-2 text-[#445DFE] hover:text-[#050544] font-semibold transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Continue shopping
          </Link>
        </div>

        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary ({itemCount} {itemCount === 1 ? 'item' : 'items'})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => {
                  const categoryImage = categoriesMap?.[item.product.category]?.image ?? (PRODUCT_CATEGORIES as Record<string, { image?: string }>)[item.product.category]?.image;
                  const productImage = item.product.image || categoryImage || '/favicon.png';

                  return (
                    <div key={item.id} className="flex items-start gap-4 border-b border-gray-200 pb-4">
                      {/* Product Image */}
                      <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={getUploadImageSrc(productImage)}
                          alt={item.product.nameEn}
                          fill
                          className="object-cover"
                          sizes="80px"
                          unoptimized={productImage.startsWith("/uploads") || productImage.startsWith("/api/uploads")}
                        />
                      </div>
                    
                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.product.nameEn}</h3>
                      <p className="text-sm text-gray-900">{item.product.dimensions}</p>
                      <p className="text-sm text-gray-900">
                        {item.length}m × {item.quantity} = {(item.length * item.quantity).toFixed(2)}m
                      </p>
                      {item.freeCutting && (
                        <span className="inline-block mt-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Free Cutting
                        </span>
                      )}
                    </div>
                    
                    {/* Price */}
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{formatCurrency(item.calculatedPrice)}</div>
                      <div className="text-sm text-gray-900">{formatWeight(item.calculatedWeight)}</div>
                    </div>
                  </div>
                  );
                })}
                <div className="pt-4 border-t border-gray-200">
                  {hasDiscount && (
                    <>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="text-gray-500 line-through">{formatCurrency(subtotal)}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2 text-green-600">
                        <span className="text-sm font-medium">
                          Wholesale discount ({discountPercent.toFixed(0)}%):
                        </span>
                        <span className="text-sm font-semibold">-{formatCurrency(discountAmount)}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-900 font-medium">
                      {hasDiscount ? 'Total:' : 'Subtotal:'}
                    </span>
                    <span className="font-bold text-gray-900">{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-900">Total Weight:</span>
                    <span className="text-gray-900">{formatWeight(totalWeight)}</span>
                  </div>
                  {hasDiscount && (
                    <div className="mt-2 text-sm text-blue-600 font-semibold">
                      Wholesale pricing applied
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6 rounded-lg border border-[#445DFE]/30 bg-[#E9EDF4]/50 p-4 text-center">
          <p className="text-gray-900">
            Need an invoice for your company?{' '}
            <Link href="/wholesale" className="font-semibold text-[#445DFE] hover:text-[#050544] underline">
              Request here
            </Link>
          </p>
        </div>

        {error && (
          <Card className="mb-6 bg-red-50 border-red-200">
            <div className="p-4 text-red-800">
              <p className="font-medium">Error:</p>
              <p>{error}</p>
            </div>
          </Card>
        )}

        <OrderForm onSuccess={handleSuccess} onError={handleError} />
      </div>
    </main>
  );
}
