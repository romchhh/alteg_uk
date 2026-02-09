import React from 'react';

export const DescriptionSection: React.FC = () => {
  return (
    <section id="about" className="bg-white pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* Left Column - Main Heading */}
          <div className="lg:col-span-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight tracking-tight mb-3 sm:mb-4">
              PRECISION ALUMINIUM<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>PROFILES CUT TO SIZE<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>RETAIL & WHOLESALE
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 font-light italic leading-relaxed">
              From factory to your project
            </p>
          </div>

          {/* Middle Column - Description Text */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
            <p>
              ALTEG is a European manufacturer of aluminium profiles supplying angles, tubes, channels, and custom extrusions. We cut to size and deliver across the UK for construction, fabrication, and trade.
            </p>
            <p>
              Browse our catalog, use the interactive calculator for instant pricing, or request a quote for volume orders. Retail and wholesale supply with EN standards compliant production.
            </p>
          </div>

          {/* Right Column - Logo/Brand */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-end mt-8 lg:mt-0">
            <div className="text-center lg:text-right">
              {/* Horizontal line above ALTEG */}
              <div className="h-px w-20 bg-black mb-4 mx-auto lg:mx-0 lg:ml-auto"></div>
              
              {/* ALTEG Logo */}
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-black tracking-wider mb-4 sm:mb-6">
                ALTEG
              </div>
              
              {/* Horizontal line below ALTEG */}
              <div className="h-px w-20 bg-black mb-4 sm:mb-6 mx-auto lg:mx-0 lg:ml-auto"></div>
              
              {/* PROFILES Stylized */}
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-black tracking-tighter mb-3 sm:mb-4 leading-none" style={{ fontFamily: 'sans-serif', letterSpacing: '-0.05em' }}>
                PROFILES
              </div>
              
              {/* Descriptor */}
              <div className="text-xs sm:text-sm md:text-base text-gray-600 font-light italic">
                – European aluminium manufacturer –
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
