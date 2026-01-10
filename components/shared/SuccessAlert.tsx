'use client';

import React, { useEffect } from 'react';
import { Button } from './Button';

interface SuccessAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onViewCart: () => void;
  productName: string;
  quantity: number;
  length: number;
}

export const SuccessAlert: React.FC<SuccessAlertProps> = ({
  isOpen,
  onClose,
  onViewCart,
  productName,
  quantity,
  length,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Icon */}
        <div className="bg-gradient-to-br from-green-400 to-green-600 p-6 text-center">
          <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Added to Cart!</h3>
          <p className="text-white text-opacity-90 text-sm">
            Your item has been successfully added
          </p>
        </div>

        {/* Product Details */}
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-bold text-gray-900 mb-2">{productName}</h4>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Quantity:</span>
              <span className="font-semibold text-gray-900">{quantity} pcs</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Length:</span>
              <span className="font-semibold text-gray-900">{length}m</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={onViewCart}
              variant="primary"
              className="w-full bg-[#445DFE] hover:bg-[#050544] text-white py-3 font-semibold transition-all duration-300"
            >
              View Cart
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 font-semibold transition-all duration-300"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
