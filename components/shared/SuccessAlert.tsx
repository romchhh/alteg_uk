'use client';

import React, { useEffect } from 'react';
import { lockBodyScroll, unlockBodyScroll } from '@/lib/utils/bodyScrollLock';
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
      lockBodyScroll();
    } else {
      unlockBodyScroll();
    }
    return () => unlockBodyScroll();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/30 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-sm w-full overflow-hidden animate-slideUp border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Minimal header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Added to cart</h3>
              <p className="text-sm text-gray-500">{productName} · {quantity} × {length}m</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Continue
            </button>
            <Button
              onClick={onViewCart}
              variant="primary"
              className="flex-1 py-2.5 text-sm font-semibold bg-[#050544] hover:bg-[#445DFE] text-white rounded-lg transition-colors"
            >
              View Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
