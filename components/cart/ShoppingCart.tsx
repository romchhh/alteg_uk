'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/store/cart';
import { Modal } from '@/components/shared/Modal';
import { Button } from '@/components/shared/Button';
import { formatCurrency, formatWeight } from '@/lib/utils/formatters';

export const ShoppingCart: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeItem, updateItem, clearCart, getTotal, getTotalWeight, getItemCount } =
    useCartStore();

  const itemCount = getItemCount();
  const total = getTotal();
  const totalWeight = getTotalWeight();

  const handleCheckout = () => {
    // Navigate to checkout page or open checkout form
    window.location.href = '/checkout';
  };

  return (
    <>
      {/* Cart Icon Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-[#445DFE] hover:bg-[#050544] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        aria-label="Shopping Cart"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>

      {/* Cart Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="p-6 max-w-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#050544]">Shopping Cart</h2>
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-sm text-red-600 hover:text-red-700 font-semibold"
              >
                Clear All
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 mx-auto text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <p className="text-gray-900 text-lg">Your cart is empty</p>
              <Button
                onClick={() => setIsOpen(false)}
                variant="primary"
                className="mt-4 bg-[#445DFE] hover:bg-[#050544] text-white"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 rounded-lg p-4 flex flex-col sm:flex-row gap-4"
                  >
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item.product.nameEn}
                      </h3>
                      <p className="text-sm text-gray-900 mb-2">
                        {item.product.dimensions} • {item.length}m
                      </p>
                      
                      {item.freeCutting && (
                        <span className="inline-block text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Free Cutting
                        </span>
                      )}

                      <div className="mt-2 flex items-center gap-2">
                        <label className="text-sm text-gray-900">Qty:</label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(item.id, {
                              quantity: Math.max(1, parseInt(e.target.value) || 1),
                            })
                          }
                          className="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:border-[#445DFE] text-gray-900"
                        />
                      </div>
                    </div>

                    <div className="flex flex-row sm:flex-col justify-between sm:justify-start items-end gap-2">
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#445DFE]">
                          {formatCurrency(item.calculatedPrice)}
                        </p>
                        <p className="text-xs text-gray-900">
                          {formatWeight(item.calculatedWeight)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700"
                        aria-label="Remove item"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-900">Total Items:</span>
                    <span className="font-semibold text-gray-900">{itemCount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-900">Total Weight:</span>
                    <span className="font-semibold text-gray-900">{formatWeight(totalWeight)}</span>
                  </div>
                  {totalWeight >= 30 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Free Delivery:</span>
                      <span className="font-semibold">✓ Eligible</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span className="text-[#050544]">Total:</span>
                    <span className="text-[#445DFE]">{formatCurrency(total)}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-900 hover:bg-gray-100"
                >
                  Continue Shopping
                </Button>
                <Button
                  onClick={handleCheckout}
                  variant="primary"
                  className="flex-1 bg-[#445DFE] hover:bg-[#050544] text-white"
                >
                  Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};
