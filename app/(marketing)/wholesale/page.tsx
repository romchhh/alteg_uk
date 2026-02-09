'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { wholesaleFormSchema, WholesaleFormData } from '@/lib/utils/validators';
import { Button } from '@/components/shared/Button';

const HOMEPAGE_SECTION_IDS = ['catalog', 'advantages', 'how-to-order', 'faq', 'trust', 'features', 'about', 'calculator', 'customer-segments'];

const DISCOUNT_ROWS = [
  { range: '100 — 1,000 kg', discount: '5%', highlight: false },
  { range: '500 — 2,000 kg', discount: '10%', highlight: false },
  { range: '1,000 — 2,000 kg', discount: '12%', highlight: false },
  { range: '2,000 kg and above', discount: 'Individual quote', highlight: true },
  { range: '5,000 kg and above', discount: 'Individual quote', highlight: true },
];

export default function WholesalePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [visibleRows, setVisibleRows] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WholesaleFormData>({
    resolver: zodResolver(wholesaleFormSchema),
  });

  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
    if (hash && HOMEPAGE_SECTION_IDS.includes(hash)) {
      window.location.replace(`/#${hash}`);
      return;
    }
    const n = DISCOUNT_ROWS.length;
    let count = 0;
    const t = setInterval(() => {
      count += 1;
      setVisibleRows((c) => Math.min(c + 1, n));
      if (count >= n) clearInterval(t);
    }, 80);
    return () => clearInterval(t);
  }, []);

  const onSubmit = async (data: WholesaleFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);
    try {
      const response = await fetch('/api/wholesale-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.success) {
        setSubmitMessage({
          type: 'success',
          text: result.message || 'Request sent. We will get back to you shortly.',
        });
        reset();
      } else {
        setSubmitMessage({
          type: 'error',
          text: result.error || 'Failed to submit. Please try again.',
        });
      }
    } catch {
      setSubmitMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative text-white py-14 sm:py-16 md:py-24 overflow-hidden min-h-[320px] sm:min-h-[380px] md:min-h-[420px] flex items-center">
        {/* Background photo + dark blur */}
        <div className="absolute inset-0">
          <Image
            src="/gallery/factory-01.jpg"
            alt="ALTEG Factory — Wholesale aluminium profiles"
            fill
            className="object-cover scale-105 blur-[2px]"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/40" aria-hidden="true" />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm sm:text-base font-semibold uppercase tracking-[0.2em] text-white/80 mb-4">
              Volume pricing from 100 kg
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight tracking-tight">
              Wholesale from ALTEG Factory
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Competitive discounts for bulk orders. Request a commercial proposal below.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-[#E9EDF4]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-14">
            {/* Discount table — same width as form block */}
            <div className="overflow-hidden rounded-2xl border-2 border-gray-100 bg-white shadow-lg transition-all duration-300 hover:border-[#445DFE]/30 hover:shadow-xl">
              <div className="px-8 sm:px-10 md:px-12 py-6 sm:py-8 border-b border-gray-100 bg-gradient-to-r from-[#050544] to-[#445DFE]">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white uppercase tracking-wide">
                  Volume discount tiers
                </h2>
                <p className="mt-2 text-base sm:text-lg text-white/80">
                  Order quantity (kg) — discount or individual quote
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[320px]">
                  <thead>
                    <tr className="bg-gray-50/80 border-b-2 border-gray-200">
                      <th className="px-6 sm:px-8 md:px-10 py-4 sm:py-5 text-left text-sm sm:text-base font-semibold text-gray-600 uppercase tracking-wider">
                        Order volume
                      </th>
                      <th className="px-6 sm:px-8 md:px-10 py-4 sm:py-5 text-left text-sm sm:text-base font-semibold text-gray-600 uppercase tracking-wider">
                        Discount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-gray-100">
                    {DISCOUNT_ROWS.map((row, i) => (
                      <tr
                        key={i}
                        className={`transition-all duration-300 ${
                          i < visibleRows
                            ? 'opacity-100 translate-y-0'
                            : 'opacity-0 translate-y-2'
                        } ${row.highlight ? 'bg-[#050544]/5' : ''} hover:bg-gray-50/80`}
                        style={{ transitionDelay: `${i * 40}ms` }}
                      >
                        <td className="px-6 sm:px-8 md:px-10 py-5 sm:py-6 text-base sm:text-lg font-medium text-[#050544]">
                          {row.range}
                        </td>
                        <td className="px-6 sm:px-8 md:px-10 py-5 sm:py-6 text-base sm:text-lg font-semibold text-[#050544]">
                          {row.discount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Form card */}
            <div className="bg-white border-2 border-gray-100 rounded-xl p-6 sm:p-8 md:p-10 shadow-lg transition-all duration-300 hover:border-[#445DFE]/40 hover:shadow-xl animate-slideUp">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <div className="flex items-center justify-center text-[#050544]">
                  <svg className="w-8 h-8 sm:w-9 sm:h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#050544] uppercase tracking-wide">
                    Request a quote
                  </h2>
                  <p className="text-gray-600 text-sm sm:text-base mt-0.5">
                    Fill in the form and we’ll prepare a commercial proposal.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#050544] mb-2 uppercase tracking-wide">
                      Company <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('company')}
                      placeholder="Company name"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#445DFE] focus:ring-2 focus:ring-[#445DFE]/20 text-[#050544] transition-colors"
                    />
                    {errors.company && (
                      <p className="mt-1.5 text-sm text-red-600" role="alert">{errors.company.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#050544] mb-2 uppercase tracking-wide">
                      Contact name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('contactName')}
                      placeholder="Full name"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#445DFE] focus:ring-2 focus:ring-[#445DFE]/20 text-[#050544] transition-colors"
                    />
                    {errors.contactName && (
                      <p className="mt-1.5 text-sm text-red-600" role="alert">{errors.contactName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#050544] mb-2 uppercase tracking-wide">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      {...register('phone')}
                      placeholder="+44"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#445DFE] focus:ring-2 focus:ring-[#445DFE]/20 text-[#050544] transition-colors"
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-sm text-red-600" role="alert">{errors.phone.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#050544] mb-2 uppercase tracking-wide">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="email@company.com"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#445DFE] focus:ring-2 focus:ring-[#445DFE]/20 text-[#050544] transition-colors"
                    />
                    {errors.email && (
                      <p className="mt-1.5 text-sm text-red-600" role="alert">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#050544] mb-2 uppercase tracking-wide">
                    Products and volumes of interest
                  </label>
                  <textarea
                    {...register('message')}
                    rows={5}
                    placeholder="List profiles, dimensions, quantities (kg/m)..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-[#445DFE] focus:ring-2 focus:ring-[#445DFE]/20 text-[#050544] resize-none transition-colors"
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-sm text-red-600" role="alert">{errors.message.message}</p>
                  )}
                </div>

                {submitMessage && (
                  <div
                    className={`p-4 rounded-lg text-sm animate-slideUp ${
                      submitMessage.type === 'success'
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    {submitMessage.text}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="primary"
                  className="w-full sm:w-auto bg-[#050544] hover:bg-[#445DFE] text-white py-3.5 px-8 text-base font-semibold uppercase tracking-wide rounded-none transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? 'Sending...' : 'Get commercial proposal'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
