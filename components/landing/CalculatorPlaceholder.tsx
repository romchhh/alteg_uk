import React from 'react';
import { Button } from '@/components/shared/Button';

export const CalculatorPlaceholder: React.FC = () => {
  return (
    <section id="calculator" className="py-12 sm:py-16 md:py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#E9EDF4] to-gray-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 lg:p-16 border-2 border-dashed border-[#445DFE]">
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
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" 
                />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#050544] mb-3 sm:mb-4 leading-tight tracking-tight">
              Interactive Calculator
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
              Here will be calculator — interactive order calculator and builder. Calculate costs, select profiles, and configure your order step by step.
            </p>
            <Button href="#catalog" variant="primary" className="bg-[#050544] hover:bg-[#445DFE] text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl rounded-none">
              Request Quote Instead
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
