'use client';

import React, { useState, useEffect } from 'react';
import { ProductCard } from '@/components/catalog/ProductCard';
import { PRODUCT_CATEGORIES, CATALOG_PRODUCTS } from '@/lib/constants/catalog';
import { ProductCategory } from '@/lib/types/product';
import { Button } from '@/components/shared/Button';

const PRODUCTS_PER_PAGE = 16;

export const CatalogSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [displayCount, setDisplayCount] = useState(PRODUCTS_PER_PAGE);

  const filteredProducts =
    selectedCategory === 'all'
      ? CATALOG_PRODUCTS
      : CATALOG_PRODUCTS.filter((p) => p.category === selectedCategory);

  const displayedProducts = filteredProducts.slice(0, displayCount);
  const hasMore = displayCount < filteredProducts.length;
  const categories = Object.entries(PRODUCT_CATEGORIES);

  // Reset display count when category changes
  useEffect(() => {
    setDisplayCount(PRODUCTS_PER_PAGE);
  }, [selectedCategory]);

  const handleShowMore = () => {
    setDisplayCount((prev) => prev + PRODUCTS_PER_PAGE);
  };

  return (
    <section id="catalog" className="py-12 sm:py-16 md:py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#050544] mb-3 sm:mb-4 leading-tight tracking-tight px-2">
            Aluminium Products Directly from the ALTEG Factory
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
            Standard aluminium profiles in stock. Cutting to size. Retail and wholesale supply across the UK.
          </p>

          {/* Advantages */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
            <div className="bg-[#E9EDF4] rounded-lg p-3 sm:p-4">
              <div className="text-xl sm:text-2xl font-bold text-[#445DFE] mb-1 sm:mb-2">£30+</div>
              <div className="text-xs sm:text-sm text-black leading-tight">Free UK Delivery</div>
            </div>
            <div className="bg-[#E9EDF4] rounded-lg p-3 sm:p-4">
              <div className="text-xl sm:text-2xl font-bold text-[#445DFE] mb-1 sm:mb-2">Direct</div>
              <div className="text-xs sm:text-sm text-black leading-tight">Factory Prices</div>
            </div>
            <div className="bg-[#E9EDF4] rounded-lg p-3 sm:p-4">
              <div className="text-xl sm:text-2xl font-bold text-[#445DFE] mb-1 sm:mb-2">Free</div>
              <div className="text-xs sm:text-sm text-black leading-tight">Cutting to Size</div>
            </div>
            <div className="bg-[#E9EDF4] rounded-lg p-3 sm:p-4">
              <div className="text-xl sm:text-2xl font-bold text-[#445DFE] mb-1 sm:mb-2">Custom</div>
              <div className="text-xs sm:text-sm text-black leading-tight">Processing Available</div>
            </div>
          </div>
        </div>

        {/* Category Filter - Horizontal Scroll with Background Images */}
        <div className="mb-8 sm:mb-12 relative">
          {/* Scroll Indicators */}
          <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          {/* Mobile Scroll Hint */}
          <div className="sm:hidden text-center mb-2">
            <span className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Swipe to see all categories
            </span>
          </div>

          <div className="overflow-x-auto scrollbar-hide px-4 sm:px-0 py-3">
            <div className="flex gap-3 sm:gap-4">
              {/* All Products Category */}
              <button
                onClick={() => setSelectedCategory('all')}
                className={`flex-shrink-0 relative h-36 w-52 rounded-lg overflow-hidden group transition-all duration-300 ${
                  selectedCategory === 'all' ? 'ring-4 ring-[#445DFE] shadow-2xl scale-105' : 'shadow-md hover:shadow-lg'
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80)',
                  }}
                />
                <div className={`absolute inset-0 transition-all duration-300 ${
                  selectedCategory === 'all' 
                    ? 'bg-gradient-to-br from-[#445DFE]/90 to-[#050544]/90' 
                    : 'bg-black/50 group-hover:bg-black/40'
                }`} />
                {selectedCategory === 'all' && (
                  <div className="absolute top-2 right-2">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center p-3">
                  <h3 className={`text-white font-bold text-center text-sm sm:text-base leading-tight transition-all duration-300 ${
                    selectedCategory === 'all' ? 'scale-110' : ''
                  }`}>
                    All Products
                  </h3>
                </div>
              </button>

              {/* Category Cards */}
              {categories.map(([key, info]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key as ProductCategory)}
                  className={`flex-shrink-0 relative h-36 w-52 rounded-lg overflow-hidden group transition-all duration-300 ${
                    selectedCategory === key ? 'ring-4 ring-[#445DFE] shadow-2xl scale-105' : 'shadow-md hover:shadow-lg'
                  }`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundImage: `url(${info.image})`,
                    }}
                  />
                  <div className={`absolute inset-0 transition-all duration-300 ${
                    selectedCategory === key 
                      ? 'bg-gradient-to-br from-[#445DFE]/90 to-[#050544]/90' 
                      : 'bg-black/50 group-hover:bg-black/40'
                  }`} />
                  {selectedCategory === key && (
                    <div className="absolute top-2 right-2">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center p-3">
                    <h3 className={`text-white font-bold text-center text-sm sm:text-base leading-tight transition-all duration-300 ${
                      selectedCategory === key ? 'scale-110' : ''
                    }`}>
                      {info.nameEn}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Scroll Hint */}
          <div className="hidden sm:flex justify-center mt-3">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Scroll horizontally to see all categories
            </span>
          </div>
        </div>

        {/* Products Grid - 2 columns on mobile, 2 on small tablets, 3 on tablets, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              categoryInfo={PRODUCT_CATEGORIES[product.category]}
            />
          ))}
        </div>

        {/* Show More Button */}
        {hasMore && (
          <div className="text-center mb-12">
            <Button
              onClick={handleShowMore}
              variant="outline"
              className="border-2 border-[#445DFE] text-[#445DFE] hover:bg-[#445DFE] hover:text-white px-8 py-3 text-base font-semibold transition-all duration-300"
            >
              Show More ({filteredProducts.length - displayCount} remaining)
            </Button>
          </div>
        )}

        {/* No products found */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">No products found in this category.</p>
            <Button
              onClick={() => setSelectedCategory('all')}
              variant="primary"
              className="bg-[#445DFE] hover:bg-[#050544] text-white"
            >
              View All Products
            </Button>
          </div>
        )}

        {/* Custom Order CTA */}
        <div className="max-w-3xl mx-auto mt-12 sm:mt-16 bg-gradient-to-br from-[#E9EDF4] to-gray-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 border-2 border-[#445DFE]">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#050544] mb-4">
              Can't find the profile you need?
            </h3>
            <p className="text-base sm:text-lg text-gray-700 mb-6">
              Send us a drawing or description — we'll manufacture to order.
            </p>
            <Button
              href="#contact"
              variant="primary"
              className="bg-[#050544] hover:bg-[#445DFE] text-white px-8 py-4 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Request Custom Calculation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
