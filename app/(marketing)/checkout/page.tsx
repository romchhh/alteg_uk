'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { OrderForm } from '@/components/forms/OrderForm';
import { Modal } from '@/components/shared/Modal';
import { Button } from '@/components/shared/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/Card';
import { formatCurrency, formatWeight } from '@/lib/utils/calculations';
import { Icon } from '@/components/shared/Icon';

export default function CheckoutPage() {
  const { items, total, totalWeight, itemCount } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);

  const handleSuccess = () => {
    setShowSuccess(true);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50 py-16">
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
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-900">
            Review your order and complete your purchase
          </p>
        </div>

        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary ({itemCount} {itemCount === 1 ? 'item' : 'items'})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start gap-4 border-b border-gray-200 pb-4">
                    {/* Product Image */}
                    <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.product.image || 'https://images.unsplash.com/photo-1565008576449-4f7a58cf9f48?w=200&q=80'}
                        alt={item.product.nameEn}
                        className="w-full h-full object-cover"
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
                ))}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-900">Subtotal:</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-900">Total Weight:</span>
                    <span className="text-gray-900">{formatWeight(totalWeight)}</span>
                  </div>
                  {totalWeight >= 100 && (
                    <div className="mt-2 text-sm text-blue-600 font-semibold">
                      Wholesale pricing applied
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
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

      <Modal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Order Placed Successfully"
      >
        <div className="space-y-4">
          {orderId && (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-900 mb-1">Order ID:</p>
              <p className="font-mono font-semibold text-gray-900">{orderId}</p>
            </div>
          )}
          <p className="text-gray-900">
            Thank you for your order! We've received your order and will process it shortly.
          </p>
          <p className="text-sm text-gray-900">
            You will receive an order confirmation email shortly. Our team will contact you if we need any additional information.
          </p>
          <div className="flex gap-2">
            <Button fullWidth variant="outline" onClick={() => setShowSuccess(false)}>
              Continue Shopping
            </Button>
            <Link href="/" className="flex-1">
              <Button fullWidth>Go to Home</Button>
            </Link>
          </div>
        </div>
      </Modal>
    </main>
  );
}
