'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { useContactModalStore } from '@/store/contactModal';
import { ContactModal } from '@/components/shared/ContactModal';

export const ShoppingCart: React.FC = () => {
  const itemCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
  const openContactModal = useContactModalStore((s) => s.open);

  return (
    <>
      {/* Fixed bottom-right: Phone above Cart */}
      <div className="fixed bottom-6 right-6 flex flex-col items-center gap-3 z-50">
        {/* Phone / Contact - above cart, black border and icon */}
        <button
          type="button"
          onClick={() => openContactModal('contact')}
          className="bg-white border-2 border-black text-black hover:bg-black hover:text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          aria-label="Contact us"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </button>
        {/* Cart - goes directly to checkout */}
        <Link
          href="/checkout"
          className="bg-[#445DFE] hover:bg-[#050544] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center relative"
          aria-label="Shopping Cart"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </Link>
      </div>
      <ContactModal />
    </>
  );
};
