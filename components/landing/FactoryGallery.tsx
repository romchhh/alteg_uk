'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const factoryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80',
    alt: 'Aluminium production factory',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1565008576449-4f7a58cf9f48?w=1200&q=80',
    alt: 'Aluminium profiles manufacturing',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=1200&q=80',
    alt: 'Aluminium extrusion process',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=80',
    alt: 'Aluminium factory equipment',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=1200&q=80',
    alt: 'Metal production facility',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=1200&q=80',
    alt: 'Aluminium processing',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80',
    alt: 'Metal manufacturing',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1586864387634-45a5b9f7fbc5?w=1200&q=80',
    alt: 'Aluminium profiles production',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1597583190535-852409d75ba2?w=1200&q=80',
    alt: 'Factory production line',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1200&q=80',
    alt: 'Aluminium manufacturing',
  },
];

const ChevronLeftIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRightIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export const FactoryGallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % factoryImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + factoryImages.length) % factoryImages.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % factoryImages.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#050544] mb-3 sm:mb-4 leading-tight tracking-tight">
              Our Factory
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              See our modern production facilities where we manufacture high-quality aluminium profiles
            </p>
          </div>

          {/* Slider */}
          <div className="relative">
            {/* Main Image */}
            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden shadow-2xl">
              <Image
                src={factoryImages[currentIndex].src}
                alt={factoryImages[currentIndex].alt}
                fill
                className="object-cover"
                priority={currentIndex === 0}
                sizes="100vw"
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#050544] p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                aria-label="Previous image"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#050544] p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                aria-label="Next image"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {currentIndex + 1} / {factoryImages.length}
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="mt-6 overflow-x-auto scrollbar-hide">
              <div className="flex gap-3 justify-center pb-2">
                {factoryImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => goToSlide(index)}
                    className={`relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 overflow-hidden transition-all duration-300 ${
                      index === currentIndex
                        ? 'ring-4 ring-[#445DFE] scale-110 shadow-lg'
                        : 'opacity-60 hover:opacity-100 hover:scale-105'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-6">
              {factoryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-[#445DFE]'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
