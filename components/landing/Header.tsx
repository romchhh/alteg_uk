'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/shared/Button';

const MenuIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CartIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

export const Header: React.FC = () => {
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Responsive size */}
          <Link href="/" className="flex items-center -ml-1 sm:-ml-2 md:-ml-3">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 flex-shrink-0 -my-3 sm:-my-4 md:-my-5">
              <Image
                src="/alteg-logo.png"
                alt="ALTEG Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <a href="#catalog" className="text-[#050544] hover:text-[#445DFE] font-bold transition-colors text-base uppercase tracking-wide">
              Products
            </a>
            <a href="#advantages" className="text-[#050544] hover:text-[#445DFE] font-bold transition-colors text-base uppercase tracking-wide">
              Advantages
            </a>
            <a href="#how-to-order" className="text-[#050544] hover:text-[#445DFE] font-bold transition-colors text-base uppercase tracking-wide">
              How to Order
            </a>
            <a href="#faq" className="text-[#050544] hover:text-[#445DFE] font-bold transition-colors text-base uppercase tracking-wide">
              FAQ
            </a>
            <Link href="/contact" className="text-[#050544] hover:text-[#445DFE] font-bold transition-colors text-base uppercase tracking-wide">
              Contact
            </Link>
          </nav>

          {/* Right side - CTA & Burger Menu */}
          <div className="flex items-center gap-4">
            {/* Desktop Cart */}
            <Link href="/checkout" className="hidden lg:block relative text-[#050544] hover:text-[#445DFE] transition-colors p-2">
              <CartIcon className="w-7 h-7" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#445DFE] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            {/* Desktop CTA Button */}
            <Link href="#catalog" className="hidden lg:block">
              <button className="px-6 py-2.5 bg-black hover:bg-[#050544] text-white font-bold transition-all duration-300 text-sm rounded-none uppercase tracking-wide">
                MAKE AN ENQUIRY
              </button>
            </Link>

            {/* Mobile Cart & Burger Menu */}
            <div className="flex items-center gap-3 lg:hidden">
              <Link href="/checkout" className="relative text-[#050544] hover:text-[#445DFE] transition-colors p-2">
                <CartIcon className="w-7 h-7" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#445DFE] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </Link>

              {/* Burger Menu Button - Changes to X when menu is open */}
              <button 
                className={`p-2 transition-colors relative z-50 ${mobileMenuOpen ? 'text-[#050544] bg-white rounded hover:bg-gray-100' : 'text-[#050544] hover:text-[#445DFE]'}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <XIcon className="w-7 h-7" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Burger Menu - Full Screen Dark */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 md:top-20 bg-[#050544] z-50 overflow-y-auto">
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] px-4 py-12 relative">
              {/* Menu Items */}
              <nav className="flex flex-col items-center gap-8 w-full max-w-md">
                <Link 
                  href="#catalog" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center text-white hover:text-[#B7D2FF] font-bold transition-colors text-2xl md:text-3xl uppercase tracking-wide py-4"
                >
                  Products
                </Link>
                <Link 
                  href="#trust" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center text-white hover:text-[#B7D2FF] font-bold transition-colors text-2xl md:text-3xl uppercase tracking-wide py-4"
                >
                  Advantages
                </Link>
                <Link 
                  href="#how-to-order" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center text-white hover:text-[#B7D2FF] font-bold transition-colors text-2xl md:text-3xl uppercase tracking-wide py-4"
                >
                  How to Order
                </Link>
                <Link 
                  href="#faq" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center text-white hover:text-[#B7D2FF] font-bold transition-colors text-2xl md:text-3xl uppercase tracking-wide py-4"
                >
                  FAQ
                </Link>
                <Link 
                  href="/contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center text-white hover:text-[#B7D2FF] font-bold transition-colors text-2xl md:text-3xl uppercase tracking-wide py-4"
                >
                  Contact
                </Link>
              </nav>

              {/* CTA Buttons */}
              <div className="w-full max-w-xs mt-12 space-y-4 pt-8 border-t border-white/20">
                <Button 
                  href="#catalog" 
                  variant="primary" 
                  fullWidth 
                  className="bg-white !text-black hover:bg-gray-100 border-none rounded-none py-4 text-base font-bold uppercase"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  MAKE AN ENQUIRY
                </Button>
                <Button 
                  href="/checkout" 
                  variant="outline" 
                  fullWidth 
                  className="border-2 border-white text-white hover:bg-white hover:text-[#050544] rounded-none py-4 text-base font-bold uppercase"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Cart ({itemCount})
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
