import React from 'react';
import { Button } from '@/components/shared/Button';

export const CatalogPlaceholder: React.FC = () => {
  return (
    <section id="catalog" className="py-12 sm:py-16 md:py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#050544] mb-3 sm:mb-4 leading-tight tracking-tight px-2">
            Aluminium Products Directly from the ALTEG Factory
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
            Standard aluminium profiles in stock. Cutting to size. Retail and wholesale supply across the UK.
          </p>

          {/* Advantages */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
            <div className="bg-transparent border border-black rounded-lg p-3 sm:p-4">
              <div className="text-xl sm:text-2xl font-bold text-[#445DFE] mb-1 sm:mb-2">£77+</div>
              <div className="text-xs sm:text-sm text-gray-700 leading-tight">Free UK Delivery (ex. VAT)</div>
            </div>
            <div className="bg-transparent border border-black rounded-lg p-3 sm:p-4">
              <div className="text-xl sm:text-2xl font-bold text-[#445DFE] mb-1 sm:mb-2">Direct</div>
              <div className="text-xs sm:text-sm text-gray-700 leading-tight">Factory Prices</div>
            </div>
            <div className="bg-transparent border border-black rounded-lg p-3 sm:p-4">
              <div className="text-xl sm:text-2xl font-bold text-[#445DFE] mb-1 sm:mb-2">Free</div>
              <div className="text-xs sm:text-sm text-gray-700 leading-tight">Cutting to Size</div>
            </div>
            <div className="bg-transparent border border-black rounded-lg p-3 sm:p-4">
              <div className="text-xl sm:text-2xl font-bold text-[#445DFE] mb-1 sm:mb-2">Custom</div>
              <div className="text-xs sm:text-sm text-gray-700 leading-tight">Processing Available</div>
            </div>
          </div>

          {/* Placeholder */}
          <div className="bg-transparent rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16 border-2 border-black">
            <div className="mb-4 sm:mb-6">
              <svg 
                className="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-[#445DFE]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" 
                />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#050544] mb-3 sm:mb-4 leading-tight tracking-tight">
              Product Catalog
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Here will be catalog — complete product catalog with aluminium angles, tubes, channels, sheets, and custom profiles. Browse by category, view specifications, and request quotes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Button href="#contact" variant="primary" className="w-full sm:w-auto bg-[#050544] hover:bg-[#445DFE] text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl rounded-none">
                Request Wholesale Quote
              </Button>
              <Button href="#contact" variant="outline" className="w-full sm:w-auto border-2 border-[#050544] text-[#050544] hover:bg-[#050544] hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl rounded-none">
                Contact Factory
              </Button>
            </div>
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-300">
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                Can't find the profile you need?
              </p>
              <p className="text-sm sm:text-base text-gray-700 font-medium mb-3 sm:mb-4">
                Send us a drawing or description — we'll manufacture to order.
              </p>
              <Button href="#contact" variant="outline" className="w-full sm:w-auto mx-auto border-2 border-[#445DFE] text-[#445DFE] hover:bg-[#445DFE] hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl rounded-none">
                Request Custom Calculation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
