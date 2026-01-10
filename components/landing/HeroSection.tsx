'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[100vh] md:min-h-[90vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden mt-16 md:mt-20">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/OBS.webp"
          alt="ALTEG Aluminium Profiles Factory Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient overlay - darker at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10"></div>
      </div>

      {/* Content Overlay - Centered */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] md:min-h-[calc(90vh-5rem)] lg:min-h-[calc(85vh-5rem)] px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-white mb-8 sm:mb-6 leading-tight tracking-tight px-2">
            ALTEG — ALUMINIUM PROFILES DIRECTLY FROM FACTORY
          </h1>
          
          {/* Subtitle */}
          <p className="text-2xl sm:text-2xl md:text-xl lg:text-xl xl:text-2xl text-white/90 mb-16 sm:mb-10 md:mb-12 lg:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
            Calculate costs and order online with UK delivery. Direct manufacturer prices.
          </p>

          {/* Three CTA Buttons - Vertical Stack */}
          <div className="flex flex-col gap-3 sm:gap-4 justify-center items-center w-full max-w-md mx-auto mb-4 sm:mb-8 lg:mb-0 px-2 mt-12 sm:mt-0">
            {/* Button 1: Free Cutting Service */}
            <Link href="/checkout" className="w-full">
              <button className="w-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-[#050544] hover:bg-[#445DFE] text-white font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl text-center rounded-none">
                Order Now & Get Free Metal Cutting to Your Sizes
              </button>
            </Link>

            {/* Button 2: Individual Discount */}
            <Link href="#catalog" className="w-full">
              <button className="w-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-white hover:bg-gray-100 text-[#050544] font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl text-center rounded-none">
                Order Now & Get Individual Discount
              </button>
            </Link>

            {/* Button 3: Wholesale Calculation */}
            <Link href="#catalog" className="w-full">
              <button className="w-full px-4 sm:px-6 md:px-8 py-3 sm:py-4 border-2 border-white hover:bg-white/10 text-white font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl text-center rounded-none">
                Wholesale Order — Get Quote
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
