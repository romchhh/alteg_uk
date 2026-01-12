import React from 'react';

export const DescriptionSection: React.FC = () => {
  return (
    <section id="about" className="bg-white pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-start">
          {/* Left Column - Main Heading */}
          <div className="lg:col-span-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight tracking-tight mb-3 sm:mb-4">
              EXQUISITE BESPOKE<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>WINDOWS DOORS AND<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>SCREENS
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 font-light italic leading-relaxed">
              Steel Re-Imagined
            </p>
          </div>

          {/* Middle Column - Description Text */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6 text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">
            <p>
              The ALTEG Collection offers exceptional steel look architectural glazing solutions, meticulously designed to transform your living space into something truly extraordinary.
            </p>
            <p>
              From our iconic steel replica range of exterior windows and doors, through to our stunning interior doors and screens, and our versatile Bi-Folding door range, ALTEG offer a unique solution to you and your home.
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
              
              {/* ELITE™ Stylized */}
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-black tracking-tighter mb-3 sm:mb-4 leading-none" style={{ fontFamily: 'sans-serif', letterSpacing: '-0.05em' }}>
                ELITE<span className="text-xs sm:text-sm align-superscript">™</span>
              </div>
              
              {/* Descriptor */}
              <div className="text-xs sm:text-sm md:text-base text-gray-600 font-light italic">
                – Exterior Steel Look Collection –
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
