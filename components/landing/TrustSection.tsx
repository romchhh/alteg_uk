import React from 'react';
import { Button } from '@/components/shared/Button';
import Link from 'next/link';

const trustPoints = [
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'ABOUT ALTEG',
    content: (
      <div>
        <p className="text-white/90 mb-4 leading-relaxed">
          ALTEG is a European manufacturer of aluminium profiles supplying customers across the UK.
        </p>
        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">15+</div>
            <div className="text-xs text-white/70 leading-tight">Years in Production</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">500+</div>
            <div className="text-xs text-white/70 leading-tight">Tons Monthly</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">EN</div>
            <div className="text-xs text-white/70 leading-tight">Standards</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'FACTORY PRICE',
    content: (
      <div>
        <p className="text-white/90 mb-3 leading-relaxed">
          Direct supplies, no middleman markups. Straight from manufacturer to you.
        </p>
        <ul className="space-y-2 text-white/80 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-white mt-1">✓</span>
            <span>No intermediaries</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-white mt-1">✓</span>
            <span>Competitive pricing</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'QUALITY GUARANTEE',
    content: (
      <div>
        <p className="text-white/90 mb-3 leading-relaxed">
          Full control from raw materials to finished profiles. EN standards compliant.
        </p>
        <ul className="space-y-2 text-white/80 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-white mt-1">✓</span>
            <span>Full production cycle control</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-white mt-1">✓</span>
            <span>Factory quality control</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-white mt-1">✓</span>
            <span>Compliance with European standards (EN)</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    title: 'PRODUCTION FLEXIBILITY',
    content: (
      <div>
        <p className="text-white/90 mb-3 leading-relaxed">
          Cutting, drilling, milling, and custom solutions tailored to your project.
        </p>
        <ul className="space-y-2 text-white/80 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-white mt-1">✓</span>
            <span>Free cutting to size</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-white mt-1">✓</span>
            <span>Custom processing available</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-white mt-1">✓</span>
            <span>Tailored solutions</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'DELIVERY SERVICE',
    content: (
      <div>
        <p className="text-white/90 mb-3 leading-relaxed">
          Fast and reliable delivery to any location across the UK, on time and on schedule.
        </p>
        <ul className="space-y-2 text-white/80 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-white mt-1">✓</span>
            <span>Delivery across the UK</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-white mt-1">✓</span>
            <span>Typical delivery time: 2-5 business days</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-white mt-1">✓</span>
            <span>Free delivery from £30</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-white mt-1">✓</span>
            <span>Pallet and courier delivery options</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'SOCIAL PROOF',
    content: (
      <div>
        <p className="text-white/90 mb-4 italic">
          "Trusted by customers across the UK"
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 opacity-60">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white/20 rounded p-2 sm:p-3 text-center text-xs">
              Client {i}
            </div>
          ))}
        </div>
        <p className="text-sm text-white/70 mt-4">
          <Link href="#" className="underline hover:text-white">
            View on Trustpilot
          </Link>
        </p>
      </div>
    ),
  },
];

export const TrustSection: React.FC = () => {
  return (
    <section id="advantages" className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-12 sm:pb-16 md:pb-20 lg:pb-24 bg-[#141414] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight tracking-tight">
            Trust, Production & Logistics
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed px-2 mb-6">
            Why choose ALTEG? We are not just a supplier — we are a manufacturer with complete control over production and quality.
          </p>
          <p className="text-sm sm:text-base text-white/60 max-w-2xl mx-auto leading-relaxed px-2">
            Confirm ALTEG's status as a real manufacturer. Answer key questions about logistics and standards.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {trustPoints.map((point, index) => (
            <div 
              key={index}
              className="bg-black/40 rounded-lg p-4 sm:p-6 border border-white/10 hover:border-[#445DFE] transition-colors"
            >
              <div className="flex items-start sm:items-center gap-3 mb-3 sm:mb-4 flex-col sm:flex-row">
                <div className="text-white w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                  {point.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wide mb-3 sm:mb-4 leading-tight">
                  {point.title}
                </h3>
              </div>
              <div className="text-white/90 text-sm sm:text-base">
                {point.content}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="#contact" className="w-full sm:w-auto">
            <Button 
              variant="primary" 
              size="lg"
              className="w-full sm:w-auto !bg-[#050544] hover:!bg-[#445DFE] text-white px-8 py-4 text-base md:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl rounded-none"
            >
              Discuss Individual Order
            </Button>
          </Link>
          <Link href="#catalog" className="w-full sm:w-auto">
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-[#050544] px-8 py-4 text-base md:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl rounded-none"
            >
              Request a Quote
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
