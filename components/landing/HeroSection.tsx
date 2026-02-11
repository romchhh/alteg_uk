'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormData } from '@/lib/utils/validators';
import { Input } from '@/components/shared/Input';
import { Button } from '@/components/shared/Button';

interface HeroSectionProps {
  heroTitle?: string;
  heroSubtitle?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  heroTitle = 'ALTEG — Aluminium Directly from the Factory',
  heroSubtitle = 'Calculate costs and order online with UK delivery. Direct manufacturer prices.',
}) => {
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
    <section className="relative min-h-[100vh] md:min-h-[90vh] lg:min-h-[85vh] flex items-center lg:items-end justify-center overflow-hidden mt-16 md:mt-20 pb-0 lg:pb-0">
      {/* Background Image - modern production facility */}
      <div className="absolute inset-0">
        {/* Mobile background */}
        <Image
          src="/hero.jpg"
          alt="ALTEG production facility"
          fill
          className="object-cover object-center lg:hidden"
          priority
          sizes="100vw"
        />
        {/* Desktop background */}
        <Image
          src="/hero-desktop.jpg"
          alt="ALTEG production facility"
          fill
          className="hidden lg:block object-cover object-center lg:object-[center_25%]"
          priority
          sizes="100vw"
        />
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Gradient overlay - darker at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        {/* Caption */}
        <p className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto text-white/80 text-sm sm:text-base">
          Our production
        </p>
      </div>

      {/* Content Overlay - Grid Layout. On desktop aligned to bottom so buttons sit lower and more photo shows above */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-24 lg:pt-24 lg:pb-8 xl:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start min-h-[calc(100vh-4rem)] md:min-h-[calc(90vh-5rem)] lg:min-h-0">
          {/* Left Side - Content */}
          <div className="w-full flex flex-col items-start text-left">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-white mb-8 sm:mb-6 leading-tight tracking-tight">
              {heroTitle}
            </h1>
            
            {/* Subtitle */}
            <p className="text-2xl sm:text-2xl md:text-xl lg:text-xl xl:text-2xl text-white/90 mb-8 sm:mb-6 md:mb-8 max-w-3xl leading-relaxed">
              {heroSubtitle}
            </p>
          </div>

          {/* Right Side - Contact Form */}
          <div id="contact" className="w-full scroll-mt-20 md:scroll-mt-24 flex justify-center -mt-4 sm:mt-0">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white/95 backdrop-blur-sm rounded-none p-4 sm:p-5 md:p-6 lg:p-6 xl:p-7 space-y-2 sm:space-y-3 lg:space-y-4 xl:space-y-4 w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl font-bold text-black mb-2 sm:mb-3 lg:mb-4 xl:mb-4">Order Development</h2>
              
              <div className="w-full space-y-1 sm:space-y-1.5 lg:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-[#050544] mb-0.5 sm:mb-1 lg:mb-1.5">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register('name')}
                  placeholder="Enter your name"
                  className="w-full px-0 py-1 sm:py-1.5 lg:py-2 bg-transparent border-0 border-b-2 border-black placeholder:text-gray-400 focus:outline-none focus:border-[#050544] text-black text-sm sm:text-base"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="w-full space-y-1 sm:space-y-1.5 lg:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-[#050544] mb-0.5 sm:mb-1 lg:mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  placeholder="+44"
                  className="w-full px-0 py-1 sm:py-1.5 lg:py-2 bg-transparent border-0 border-b-2 border-black placeholder:text-gray-400 focus:outline-none focus:border-[#050544] text-black text-sm sm:text-base"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600" role="alert">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="w-full space-y-1 sm:space-y-1.5 lg:space-y-2">
                <label className="block text-xs sm:text-sm font-medium text-[#050544] mb-0.5 sm:mb-1 lg:mb-1.5">
                  Request (optional)
                </label>
                <textarea
                  {...register('interest')}
                  rows={2}
                  placeholder="Describe your project..."
                  className="w-full px-0 py-1 sm:py-1.5 lg:py-2 bg-transparent border-0 border-b-2 border-black placeholder:text-gray-400 focus:outline-none focus:border-[#050544] text-black text-sm sm:text-base resize-none"
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
                className="w-full bg-black text-white font-medium py-2 sm:py-2.5 lg:py-3 px-6 transition-colors duration-200 mt-2 sm:mt-3 lg:mt-4 rounded-none text-sm sm:text-base"
              >
                {isSubmitting ? 'Sending...' : 'Submit Request'}
              </button>
            </form>
          </div>
        </div>

        {/* CTA Buttons Block - Centered; on desktop section uses items-end so this sits near bottom */}
        <div className="w-full flex justify-center mt-12 sm:mt-10 lg:mt-20 xl:mt-24">
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-5 w-full max-w-2xl">
            {/* Button 1: Free metal cutting — go to catalog to add products first (transparent) */}
            <a href="/#catalog" className="w-full">
              <button className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-3 sm:py-4 lg:py-4 xl:py-5 border-2 border-white hover:bg-white/10 text-white font-semibold text-base sm:text-lg lg:text-lg xl:text-xl transition-all duration-300 shadow-lg hover:shadow-xl text-center rounded-none">
                Order now and get free metal cutting to your sizes
              </button>
            </a>

            {/* Button 2: Individual discount — go to catalog to add products first */}
            <a href="/#catalog" className="w-full">
              <button className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-3 sm:py-4 lg:py-4 xl:py-5 bg-white hover:bg-gray-100 text-[#050544] font-semibold text-base sm:text-lg lg:text-lg xl:text-xl transition-all duration-300 shadow-lg hover:shadow-xl text-center rounded-none">
                Order now and get an individual discount
              </button>
            </a>

            {/* Button 3: Wholesale quote (blue) */}
            <Link href="/wholesale" className="w-full">
              <button className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-3 sm:py-4 lg:py-4 xl:py-5 bg-[#050544] hover:bg-[#445DFE] text-white font-semibold text-base sm:text-lg lg:text-lg xl:text-xl transition-all duration-300 shadow-lg hover:shadow-xl text-center rounded-none">
                Wholesale order — get a quote
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
