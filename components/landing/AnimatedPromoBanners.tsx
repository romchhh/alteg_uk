'use client';

import React from 'react';

const marqueeText = '★ Free cutting to size ★ Volume discount from £100 ★ Up to 27% off ★ Mainland UK delivery ★ ';

export const AnimatedPromoBanners: React.FC = () => {
  return (
    <>
      {/* Strip 1: Free cutting — top, full width, pulsing badge */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#050544] via-[#445DFE] to-[#050544] py-3 sm:py-4 border-y-2 border-[#445DFE]/50">
        <a href="/#catalog" className="block w-full">
          <div className="container mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            <span className="text-white/90 text-sm sm:text-base font-medium uppercase tracking-wide">
              Free metal cutting to your sizes
            </span>
            <span className="animate-pulse-glow inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#050544] font-bold text-sm sm:text-base shadow-lg">
              INCLUDED
            </span>
            <span className="text-white/80 text-xs sm:text-sm">
              — No extra cost. Order now →
            </span>
          </div>
        </a>
      </section>

      {/* Strip 2: Volume discount — marquee + pulsing % */}
      <section className="relative overflow-hidden bg-[#0a3d0a] py-3 sm:py-4 border-y-2 border-emerald-500/50">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Scrolling text */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <div className="flex whitespace-nowrap animate-marquee w-max">
              <span className="text-emerald-200/95 text-sm sm:text-base font-medium pr-8">{marqueeText}</span>
              <span className="text-emerald-200/95 text-sm sm:text-base font-medium pr-8" aria-hidden>{marqueeText}</span>
            </div>
          </div>
          {/* Pulsing discount CTA */}
          <a
            href="/#catalog"
            className="flex-shrink-0 flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-2.5 bg-white rounded-lg hover:bg-emerald-50 transition-colors"
          >
            <span className="text-[#0a3d0a] font-semibold text-sm sm:text-base">From £100</span>
            <span className="animate-pulse-glow text-emerald-600 font-bold text-lg sm:text-xl">up to 27% off</span>
          </a>
        </div>
      </section>
    </>
  );
};
