import React from 'react';
import Link from 'next/link';

const banners = [
  {
    id: 1,
    title: 'Today Only!',
    subtitle: 'Free Cutting Service',
    description: 'Free metal cutting to your sizes with every order.',
    cta: 'Order Now',
    href: '/checkout',
    bgImage: '/gallery/factory-01.jpg',
  },
  {
    id: 2,
    title: 'Free UK Delivery',
    subtitle: 'From £30',
    description: 'Free standard delivery on all orders over £30. Fast and reliable UK-wide delivery.',
    cta: 'Shop Now',
    href: '/#catalog',
    bgImage: '/gallery/factory-03.jpg',
  },
  {
    id: 3,
    title: 'Custom Profiles',
    subtitle: 'Made to Order',
    description: "Can't find the profile you need? Send us a drawing or description — we'll manufacture to order.",
    cta: 'Request Quote',
    href: '/#catalog',
    bgImage: '/gallery/factory-06.jpg',
  },
  {
    id: 4,
    title: 'Today Only!',
    subtitle: 'Individual Discount',
    description: 'Order now and receive an individual discount tailored to your needs.',
    cta: 'Get Discount',
    href: '/#catalog',
    bgImage: '/gallery/DSC04928.jpg',
  },
];

export const PromoBanners: React.FC = () => {
  return (
    <section className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-12 sm:pb-16 md:pb-20 lg:pb-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#050544] mb-3 sm:mb-4 leading-tight tracking-tight">
            Special Offers & Services
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
            Take advantage of our exclusive promotions and premium services designed to meet your needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {banners.map((banner) => (
            <Link 
              key={banner.id}
              href={banner.href}
              className="group block h-full"
            >
              <div
                className="relative rounded-xl p-6 sm:p-8 md:p-10 text-white h-full min-h-[220px] sm:min-h-[260px] overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                style={{
                  backgroundImage: `url(${banner.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#050544]/85 via-[#050544]/70 to-transparent rounded-xl" />
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex-1 pr-2">
                    <div className="text-xs sm:text-sm md:text-base font-semibold text-white/80 mb-1 uppercase tracking-wide">
                      {banner.title}
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 leading-tight tracking-tight">
                      {banner.subtitle}
                    </h3>
                    </div>
                    <div className="opacity-50 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed flex-1">
                    {banner.description}
                  </p>
                  <button className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#050544] hover:bg-gray-100 font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl text-center rounded-none">
                    {banner.cta}
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
