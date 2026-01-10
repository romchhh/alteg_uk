import React from 'react';
import { Button } from '@/components/shared/Button';
import Link from 'next/link';

const segments = [
  {
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Construction Companies',
    description: 'Aluminium profiles for construction and installation works. Reliable supply for your projects.',
  },
  {
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Manufacturing & Engineering',
    description: 'Profiles and blanks for manufacturing and engineering tasks. Precision materials for your production.',
  },
  {
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: 'Furniture & Interior Production',
    description: 'Aluminium for furniture, interiors, and design solutions. Premium materials for creative projects.',
  },
  {
    icon: (
      <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Private Customers / DIY',
    description: 'Retail orders for private customers and small projects. Perfect for home improvement and DIY enthusiasts.',
  },
];

export const CustomerSegments: React.FC = () => {
  return (
    <section id="customer-segments" className="py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-to-b from-[#E9EDF4] to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#050544] mb-4 sm:mb-5 leading-tight tracking-tight">
            Who ALTEG Products Are For
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
            ALTEG factory works with different customer types — from retail to wholesale. Find your solution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 mb-10 sm:mb-16 max-w-7xl mx-auto">
          {segments.map((segment, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 sm:p-8 border-2 border-gray-100 hover:border-[#445DFE] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group h-full flex flex-col"
            >
              <div className="flex flex-col items-start gap-5 mb-5 flex-1">
                {/* Icon with background circle */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#E9EDF4] to-gray-100 rounded-xl flex items-center justify-center text-[#050544] group-hover:from-[#445DFE] group-hover:to-[#050544] group-hover:text-white transition-all duration-300 flex-shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10">
                    {segment.icon}
                  </div>
                </div>
                
                <div className="flex-1 w-full">
                  <h3 className="text-lg sm:text-xl font-bold text-[#050544] uppercase tracking-wide leading-tight mb-3 sm:mb-4">
                    {segment.title}
                  </h3>
                  <div className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    <p>{segment.description}</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative line */}
              <div className="mt-auto pt-4 h-1 w-16 sm:w-20 bg-gradient-to-r from-[#445DFE] to-transparent rounded-full"></div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/#catalog">
            <Button 
              variant="primary" 
              size="lg"
              className="!bg-[#050544] hover:!bg-[#445DFE] text-white px-8 py-4 text-base md:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl rounded-none"
            >
              Find Your Solution
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
