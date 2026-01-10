import React from 'react';

const features = [
  {
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'UNCOMPROMISING QUALITY',
    description: 'EN standards certified production',
  },
  {
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
    title: 'THE SLIMMEST FRAME',
    description: 'Precision engineering profiles',
  },
  {
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H3a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H3a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 011-1v-1z" />
      </svg>
    ),
    title: 'BESPOKE MADE',
    description: 'Custom cutting and processing',
  },
  {
    icon: (
      <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: 'UNIQUE FEATURES',
    description: 'Direct factory advantages',
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="bg-black py-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-3 sm:gap-4 p-6 sm:p-8 md:p-12 border-b md:border-r border-white/10 hover:bg-white/5 transition-colors group last:border-b-0 md:last:border-b md:[&:nth-child(2)]:md:border-r-0 lg:last:border-r-0 lg:[&:nth-child(2)]:lg:border-r"
          >
            <div className="flex justify-center mb-1 sm:mb-2">
              <div className="text-white group-hover:text-[#B7D2FF] transition-colors flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12">
                {feature.icon}
              </div>
            </div>
            <div className="text-center px-2">
              <h3 className="text-white font-bold text-xs sm:text-sm md:text-base mb-1 sm:mb-2 uppercase tracking-wide">
                {feature.title}
              </h3>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
