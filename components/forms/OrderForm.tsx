'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { orderSchema, OrderFormData } from '@/lib/utils/validators';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/shared/Card';
import { useCart } from '@/hooks/useCart';
import { useDelivery } from '@/hooks/useDelivery';
import { DELIVERY_METHODS } from '@/lib/constants/delivery';
import { formatCurrency } from '@/lib/utils/calculations';

export interface OrderSummaryItem {
  productName: string;
  dimensions: string;
  length: number;
  quantity: number;
  calculatedPrice: number;
  calculatedWeight: number;
  image?: string;
  category?: string;
}

export interface OrderSuccessData {
  items: OrderSummaryItem[];
  subtotal: number;
  deliveryCost: number;
  total: number;
  totalWeight: number;
  isWholesale: boolean;
  customer: { name: string; email: string; phone: string; company?: string };
  delivery: { postcode: string; method?: string; instructions?: string };
  notes?: string;
}

interface OrderFormProps {
  onSuccess?: (data: OrderSuccessData) => void;
  onError?: (error: string) => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ onSuccess, onError }) => {
  const { items, total, totalWeight, clearCart } = useCart();
  const {
    postcode,
    setPostcode,
    deliveryMethod,
    setDeliveryMethod,
    instructions,
    setInstructions,
    deliveryCost,
    isFreeDelivery,
  } = useDelivery({ orderTotal: total });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      delivery: {
        method: 'standard',
        postcode: '',
      },
    },
  });

  const deliveryPostcode = watch('delivery.postcode');

  React.useEffect(() => {
    if (deliveryPostcode) {
      setPostcode(deliveryPostcode);
    }
  }, [deliveryPostcode, setPostcode]);

  const onSubmit = async (data: OrderFormData) => {
    try {
      const orderTotal = total + deliveryCost;
      const payload = {
        cart: items,
        customer: data.customer,
        delivery: {
          postcode: data.delivery.postcode,
          method: data.delivery.method,
          instructions: data.delivery.instructions,
        },
        subtotal: total,
        deliveryCost,
        total: orderTotal,
        totalWeight,
        isWholesale: totalWeight >= 100,
        notes: data.notes,
      };

      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (result.success) {
        const orderTotal = total + deliveryCost;
        const successData: OrderSuccessData = {
          items: items.map((i) => ({
            productName: i.product.nameEn,
            dimensions: i.product.dimensions,
            length: i.length,
            quantity: i.quantity,
            calculatedPrice: i.calculatedPrice,
            calculatedWeight: i.calculatedWeight,
            image: i.product.image,
            category: i.product.category,
          })),
          subtotal: total,
          deliveryCost,
          total: orderTotal,
          totalWeight,
          isWholesale: totalWeight >= 100,
          customer: data.customer,
          delivery: {
            postcode: data.delivery.postcode,
            method: data.delivery.method,
            instructions: data.delivery.instructions,
          },
          notes: data.notes,
        };
        reset();
        clearCart();
        onSuccess?.(successData);
      } else {
        onError?.(result.error || 'Failed to submit order');
      }
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  if (items.length === 0) {
    return (
      <Card>
        <CardContent>
          <p className="text-center text-gray-500">Your cart is empty. Add products to place an order.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Full Name"
              fullWidth
              required
              {...register('customer.name')}
              error={errors.customer?.name?.message}
              className="text-gray-900"
            />

            <Input
              label="Email"
              type="email"
              fullWidth
              required
              {...register('customer.email')}
              error={errors.customer?.email?.message}
              className="text-gray-900"
            />

            <Input
              label="Phone"
              type="tel"
              fullWidth
              required
              {...register('customer.phone')}
              error={errors.customer?.phone?.message}
              className="text-gray-900"
            />

            <Input
              label="Company (Optional)"
              fullWidth
              {...register('customer.company')}
              error={errors.customer?.company?.message}
              className="text-gray-900"
            />

            <Input
              label="Street Address"
              fullWidth
              required
              {...register('customer.address.street')}
              error={errors.customer?.address?.street?.message}
              className="text-gray-900"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="City"
                fullWidth
                required
                {...register('customer.address.city')}
                error={errors.customer?.address?.city?.message}
                className="text-gray-900"
              />
              <Input
                label="Postcode"
                fullWidth
                required
                {...register('customer.address.postcode')}
                error={errors.customer?.address?.postcode?.message}
                className="text-gray-900"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delivery Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Delivery Postcode
              </label>
              <Input
                fullWidth
                required
                {...register('delivery.postcode')}
                error={errors.delivery?.postcode?.message}
                onChange={(e) => {
                  register('delivery.postcode').onChange(e);
                  setPostcode(e.target.value);
                }}
                className="text-gray-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Delivery Method
              </label>
              <select
                {...register('delivery.method')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                onChange={(e) => {
                  register('delivery.method').onChange(e);
                  setDeliveryMethod(e.target.value as 'standard' | 'express' | 'collection');
                }}
              >
                {DELIVERY_METHODS.map((method) => (
                  <option key={method.value} value={method.value}>
                    {method.label} {method.cost > 0 && `- £${method.cost}`}
                  </option>
                ))}
              </select>
            </div>

            {isFreeDelivery && deliveryMethod !== 'collection' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-800">
                Free delivery! Your order qualifies for free standard delivery.
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Delivery Instructions (Optional)
              </label>
              <textarea
                {...register('delivery.instructions')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="Special delivery instructions..."
                onChange={(e) => {
                  setInstructions(e.target.value);
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">
                Order Notes (Optional)
              </label>
              <textarea
                {...register('notes')}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="Any additional information..."
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-900">
              <span>Subtotal</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between text-gray-900">
              <span>Delivery</span>
              <span>
                {isFreeDelivery && deliveryMethod !== 'collection' ? (
                  <span className="text-green-600 font-semibold">Free</span>
                ) : (
                  formatCurrency(deliveryCost)
                )}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-2 mt-2">
              <div className="flex justify-between font-bold text-lg text-gray-900">
                <span>Total</span>
                <span>{formatCurrency(total + deliveryCost)}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" fullWidth size="lg" isLoading={isSubmitting}>
            Place Order
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
