'use client';

import React from 'react';

const marqueeText1 = '★ Volume discount from £100 ★ Get 5% off ★ Order now ★ ';
const marqueeText2 = '★ Maximum discount from £10,000 ★ Get 25% off ★ Order now ★ ';

export const AnimatedPromoBanners: React.FC = () => {
  return (
    <>
      {/* Strip 1: Volume discount from £100 — 5% */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#050544] via-[#445DFE] to-[#050544] py-3 sm:py-4 border-y-2 border-[#445DFE]/50">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Scrolling text */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <div className="flex whitespace-nowrap animate-marquee w-max">
              <span className="text-white/95 text-sm sm:text-base font-medium pr-8">{marqueeText1}</span>
              <span className="text-white/95 text-sm sm:text-base font-medium pr-8" aria-hidden>{marqueeText1}</span>
            </div>
          </div>
          {/* Pulsing discount CTA */}
          <a
            href="/#catalog"
            className="flex-shrink-0 flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-2.5 bg-white rounded-lg hover:bg-blue-50 transition-colors"
          >
            <span className="text-[#050544] font-semibold text-sm sm:text-base">From £100</span>
            <span className="animate-pulse-glow text-[#445DFE] font-bold text-lg sm:text-xl">5% off</span>
          </a>
        </div>
      </section>

      {/* Strip 2: Volume discount from £10,000 — 27% */}
      <section className="relative overflow-hidden bg-[#0a3d0a] py-3 sm:py-4 border-y-2 border-emerald-500/50">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Scrolling text */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <div className="flex whitespace-nowrap animate-marquee w-max">
              <span className="text-emerald-200/95 text-sm sm:text-base font-medium pr-8">{marqueeText2}</span>
              <span className="text-emerald-200/95 text-sm sm:text-base font-medium pr-8" aria-hidden>{marqueeText2}</span>
            </div>
          </div>
          {/* Pulsing discount CTA */}
          <a
            href="/#catalog"
            className="flex-shrink-0 flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-2.5 bg-white rounded-lg hover:bg-emerald-50 transition-colors"
          >
            <span className="text-[#0a3d0a] font-semibold text-sm sm:text-base">From £10,000</span>
            <span className="animate-pulse-glow text-emerald-600 font-bold text-lg sm:text-xl">25% off</span>
          </a>
        </div>
      </section>
    </>
  );
};
