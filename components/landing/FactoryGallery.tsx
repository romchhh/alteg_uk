'use client';

import React, { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { lockBodyScroll, unlockBodyScroll } from '@/lib/utils/bodyScrollLock';

type GalleryItem = { src: string; alt: string; type: 'image' | 'video' };

const GALLERY_ITEMS: GalleryItem[] = [
  { src: '/gallery/factory-01.jpg', alt: 'ALTEG factory production', type: 'image' },
  { src: '/gallery/factory-02.jpg', alt: 'Aluminium profiles manufacturing', type: 'image' },
  { src: '/gallery/factory-03.jpg', alt: 'Factory facility', type: 'image' },
  { src: '/gallery/factory-04.jpg', alt: 'Production line', type: 'image' },
  { src: '/gallery/C0206_08_48_01_11.jpg', alt: 'ALTEG production', type: 'image' },
  { src: '/gallery/C0210_08_48_42_14.jpg', alt: 'Factory facility', type: 'image' },
  { src: '/gallery/C0221_08_50_09_11.jpg', alt: 'Aluminium manufacturing', type: 'image' },
  { src: '/gallery/C0255_07_30_40_20.jpg', alt: 'Production area', type: 'image' },
  { src: '/gallery/C0265_07_32_56_18.jpg', alt: 'ALTEG factory', type: 'image' },
  { src: '/gallery/C0273_07_34_34_15.jpg', alt: 'Manufacturing process', type: 'image' },
  { src: '/gallery/factory-05.jpg', alt: 'Aluminium extrusion', type: 'image' },
  { src: '/gallery/factory-07.jpg', alt: 'Quality control', type: 'image' },
  { src: '/gallery/factory-09.jpg', alt: 'Aluminium stock', type: 'image' },
  { src: '/gallery/factory-10.jpg', alt: 'Production area', type: 'image' },
  { src: '/gallery/factory-11.jpg', alt: 'Manufacturing process', type: 'image' },
  { src: '/gallery/factory-12.jpg', alt: 'ALTEG UK facility', type: 'image' },
  { src: '/gallery/DSC04928.jpg', alt: 'ALTEG factory', type: 'image' },
  { src: '/gallery/DSC04960.jpg', alt: 'ALTEG production', type: 'image' },
  { src: '/gallery/FILE%202026-02-11%2011_38_28.webm', alt: 'ALTEG factory video', type: 'video' },
];

// Bento-style layout for first 10 images only
const BENTO_LAYOUT = [
  'col-span-2 row-span-2', // 1 - hero large
  '', '',
  '', 'col-span-2', // 4 wide
  '', '',
  'row-span-2', '', // 7 tall
  'col-span-2', '', // 9 wide
  '', 'col-span-2', // 10 wide
];

const BENTO_COUNT = 10;

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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  }, [lightboxIndex]);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % GALLERY_ITEMS.length);
  }, [lightboxIndex]);

  // Keyboard: Arrow Left/Right to scroll, Escape to close; lock body scroll
  useEffect(() => {
    if (lightboxIndex === null) return;
    lockBodyScroll();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      unlockBodyScroll();
    };
  }, [lightboxIndex, goPrev, goNext, closeLightbox]);

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#050544] mb-3 sm:mb-4 leading-tight tracking-tight">
              Our Factory
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              See our modern production facilities where we manufacture high-quality aluminium profiles
            </p>
          </div>

          {/* Bento-style grid — first 10 items */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 auto-rows-[120px] sm:auto-rows-[140px] md:auto-rows-[160px] lg:auto-rows-[180px] grid-flow-dense">
            {GALLERY_ITEMS.slice(0, BENTO_COUNT).map((item, index) => {
              const layout = BENTO_LAYOUT[index] || '';
              return (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => openLightbox(index)}
                  className={`relative overflow-hidden group ${layout} min-h-[120px] sm:min-h-[140px] md:min-h-[160px] lg:min-h-[180px] bg-black`}
                  aria-label={`View ${item.alt}`}
                >
                  {item.type === 'video' ? (
                    <>
                      <video
                        src={item.src}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 flex items-center justify-center">
                          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#050544] ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </button>
              );
            })}
          </div>

          {/* Remaining items: one row on desktop (4 cols), two rows of 2 on mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3 md:mt-4 auto-rows-[120px] sm:auto-rows-[140px] md:auto-rows-[160px] lg:auto-rows-[180px]">
            {GALLERY_ITEMS.slice(BENTO_COUNT).map((item, i) => {
              const index = BENTO_COUNT + i;
              return (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => openLightbox(index)}
                  className="relative overflow-hidden group min-h-[120px] sm:min-h-[140px] md:min-h-[160px] lg:min-h-[180px] bg-black"
                  aria-label={`View ${item.alt}`}
                >
                  {item.type === 'video' ? (
                    <>
                      <video
                        src={item.src}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 flex items-center justify-center">
                          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#050544] ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </button>
              );
            })}
          </div>

          {/* Lightbox: darkened overlay, no white box, arrows on sides */}
          {lightboxIndex !== null && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
              role="dialog"
              aria-modal="true"
              aria-label="Gallery lightbox"
              onClick={closeLightbox}
            >
              <div className="relative w-full max-w-5xl max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                {/* Left arrow */}
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeftIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
                {/* Media: image or video */}
                <div className="relative w-full max-w-5xl aspect-video flex-shrink-0 max-h-[90vh]">
                  {GALLERY_ITEMS[lightboxIndex].type === 'video' ? (
                    <video
                      src={GALLERY_ITEMS[lightboxIndex].src}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <Image
                      src={GALLERY_ITEMS[lightboxIndex].src}
                      alt={GALLERY_ITEMS[lightboxIndex].alt}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 1024px"
                    />
                  )}
                </div>
                {/* Right arrow */}
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRightIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
              </div>
              {/* Close button */}
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors z-10"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              {/* Counter */}
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/90 text-sm font-medium pointer-events-none">
                {lightboxIndex + 1} / {GALLERY_ITEMS.length}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
