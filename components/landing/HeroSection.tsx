'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormData } from '@/lib/utils/validators';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';

export const HeroSection: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage({ type: 'success', text: result.message || 'Thank you! We will contact you soon.' });
        reset();
      } else {
        setSubmitMessage({ type: 'error', text: result.error || 'Failed to submit form. Please try again.' });
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-[100vh] md:min-h-[90vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden mt-16 md:mt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="ALTEG Aluminium Profiles Factory Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Gradient overlay - darker at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>

      {/* Content Overlay - Grid Layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start min-h-[calc(100vh-4rem)] md:min-h-[calc(90vh-5rem)] lg:min-h-[calc(85vh-5rem)]">
          {/* Left Side - Content */}
          <div className="w-full flex flex-col items-start text-left">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-white mb-8 sm:mb-6 leading-tight tracking-tight">
              ALTEG — ALUMINIUM PROFILES DIRECTLY FROM FACTORY
            </h1>
            
            {/* Subtitle */}
            <p className="text-2xl sm:text-2xl md:text-xl lg:text-xl xl:text-2xl text-white/90 mb-8 sm:mb-6 md:mb-8 max-w-3xl leading-relaxed">
              Calculate costs and order online with UK delivery. Direct manufacturer prices.
            </p>
          </div>

          {/* Right Side - Contact Form */}
          <div id="contact" className="w-full scroll-mt-20 md:scroll-mt-24 flex justify-center">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white/95 backdrop-blur-md rounded-none p-5 md:p-6 lg:p-6 xl:p-7 space-y-3 lg:space-y-4 xl:space-y-4 w-full max-w-md lg:max-w-lg xl:max-w-xl">
              <h2 className="text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold text-black mb-3 lg:mb-4 xl:mb-4">Order Development</h2>
              
              <div className="w-full space-y-1.5 lg:space-y-2">
                <label className="block text-sm font-medium text-[#050544] mb-1 lg:mb-1.5">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('name')}
                  placeholder="Enter your name"
                  className="w-full px-0 py-1.5 lg:py-2 bg-transparent border-0 border-b-2 border-black placeholder:text-gray-400 focus:outline-none focus:border-[#050544] text-black text-base"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="w-full space-y-1.5 lg:space-y-2">
                <label className="block text-sm font-medium text-[#050544] mb-1 lg:mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  placeholder="+44"
                  className="w-full px-0 py-1.5 lg:py-2 bg-transparent border-0 border-b-2 border-black placeholder:text-gray-400 focus:outline-none focus:border-[#050544] text-black text-base"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="w-full space-y-1.5 lg:space-y-2">
                <label className="block text-sm font-medium text-[#050544] mb-1 lg:mb-1.5">
                  Request (optional)
                </label>
                <textarea
                  {...register('interest')}
                  rows={2}
                  placeholder="Describe your project..."
                  className="w-full px-0 py-1.5 lg:py-2 bg-transparent border-0 border-b-2 border-black placeholder:text-gray-400 focus:outline-none focus:border-[#050544] text-black text-base resize-none"
                />
                {errors.interest && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.interest.message}
                  </p>
                )}
              </div>

              {submitMessage && (
                <div
                  className={`p-2 lg:p-2.5 text-sm ${
                    submitMessage.type === 'success'
                      ? 'bg-green-50 text-green-800'
                      : 'bg-red-50 text-red-800'
                  }`}
                >
                  {submitMessage.text}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white font-medium py-2.5 lg:py-3 px-6 transition-colors duration-200 mt-3 lg:mt-4 rounded-none text-base"
              >
                {isSubmitting ? 'Sending...' : 'Submit Request'}
              </button>
            </form>
          </div>
        </div>

        {/* CTA Buttons Block - Centered */}
        <div className="w-full flex justify-center mt-8 lg:mt-12">
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-5 w-full max-w-2xl">
            {/* Button 1: Free Cutting Service */}
            <Link href="/checkout" className="w-full">
              <button className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-3 sm:py-4 lg:py-4 xl:py-5 bg-[#050544] hover:bg-[#445DFE] text-white font-semibold text-base sm:text-lg lg:text-lg xl:text-xl transition-all duration-300 shadow-lg hover:shadow-xl text-center rounded-none">
                Order Now & Get Free Metal Cutting to Your Sizes
              </button>
            </Link>

            {/* Button 2: Individual Discount */}
            <Link href="#catalog" className="w-full">
              <button className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-3 sm:py-4 lg:py-4 xl:py-5 bg-white hover:bg-gray-100 text-[#050544] font-semibold text-base sm:text-lg lg:text-lg xl:text-xl transition-all duration-300 shadow-lg hover:shadow-xl text-center rounded-none">
                Order Now & Get Individual Discount
              </button>
            </Link>

            {/* Button 3: Wholesale Calculation */}
            <Link href="#catalog" className="w-full">
              <button className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-3 sm:py-4 lg:py-4 xl:py-5 border-2 border-white hover:bg-white/10 text-white font-semibold text-base sm:text-lg lg:text-lg xl:text-xl transition-all duration-300 shadow-lg hover:shadow-xl text-center rounded-none">
                Wholesale Order — Get Quote
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
