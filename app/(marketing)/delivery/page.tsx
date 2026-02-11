import React from 'react';
import Link from 'next/link';
import { DELIVERY_METHODS } from '@/lib/constants/delivery';

export const metadata = {
  title: 'Delivery',
  description: 'Delivery options and information for ALTEG UK — free delivery over £77 (ex. VAT), same day and next day available.',
};

export default function DeliveryPage() {
  return (
    <main className="min-h-screen bg-white pt-16 md:pt-20">
      <section className="bg-gradient-to-br from-[#050544] to-[#445DFE] text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Delivery
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Fast and convenient delivery across England, Wales and Scotland.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="rounded-xl border-2 border-[#445DFE]/20 bg-[#E9EDF4]/50 p-6 sm:p-8">
              <p className="text-gray-900 text-lg leading-relaxed mb-4">
                Fast & convenient delivery —{' '}
                <strong className="text-[#050544]">FREE DELIVERY</strong> on orders over{' '}
                <strong className="text-[#050544]">£77</strong> (ex. VAT) to Mainland UK.
              </p>
              <p className="text-gray-900 text-lg leading-relaxed">
                <strong className="text-[#050544]">GUARANTEED SAME & NEXT DAY</strong> delivery available. See delivery options below for details.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-[#050544] mt-10 mb-4">Delivery options</h2>
            <ul className="space-y-3 text-gray-700">
              {DELIVERY_METHODS.map((method) => (
                <li key={method.value} className="flex items-center justify-between py-2 border-b border-gray-200 last:border-0">
                  <span className="font-medium">{method.label}</span>
                  <span className="text-[#050544] font-semibold">
                    {method.cost === 0 ? 'Free' : `£${method.cost}`}
                  </span>
                </li>
              ))}
            </ul>

            <p className="text-gray-600 text-sm">
              Free delivery applies to orders over £77 (ex. VAT) for standard delivery to Mainland UK. Collection from our warehouse (Littlehampton) is always free. For same day and next day options, contact us or select express delivery at checkout.
            </p>

            <div className="pt-6 flex flex-wrap gap-4">
              <Link
                href="/checkout"
                className="inline-flex items-center justify-center rounded-lg bg-[#445DFE] hover:bg-[#050544] text-white font-semibold px-6 py-3 transition-colors"
              >
                Proceed to Checkout
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border-2 border-[#050544] text-[#050544] hover:bg-[#050544] hover:text-white font-semibold px-6 py-3 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
