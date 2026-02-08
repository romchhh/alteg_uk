'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, ProductCategory } from '@/lib/types/product';
import { CATALOG_PRODUCTS, PRODUCT_CATEGORIES } from '@/lib/constants/catalog';
import { useCartStore } from '@/store/cart';
import { calculateOrder, getPricePerMeter } from '@/lib/utils/calculations';
import { getUploadImageSrc } from '@/lib/utils/image';
import { isWholesaleOrder } from '@/lib/constants/prices';
import { Button } from '@/components/shared/Button';
import { Modal } from '@/components/shared/Modal';
import { SuccessAlert } from '@/components/shared/SuccessAlert';

function getProductImage(product: Product): string {
  const categoryInfo = product.category ? PRODUCT_CATEGORIES[product.category as ProductCategory] : undefined;
  return product.image || categoryInfo?.image || '';
}

const MIN_CUSTOM_LENGTH = 0.1;
const MAX_CUSTOM_LENGTH = 25;

export const OrderCalculator: React.FC = () => {
  // Step 1: Category selection
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string | null>(null);
  
  // Step 2: Product selection
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Step 3: Parameters
  const [length, setLength] = useState<number>(1);
  const [lengthInput, setLengthInput] = useState<string>('1');
  const [quantity, setQuantity] = useState<number>(1);
  const [quantityInput, setQuantityInput] = useState<string>('1');
  const [freeCutting, setFreeCutting] = useState<boolean>(false);
  const [additionalProcessing, setAdditionalProcessing] = useState<boolean>(false);
  
  // UI State
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const [isWholesaleModalOpen, setIsWholesaleModalOpen] = useState(false);
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [wholesaleFormData, setWholesaleFormData] = useState({
    company: '',
    contactName: '',
    email: '',
    phone: '',
    message: '',
  });

  const addItem = useCartStore((state) => state.addItem);
  const [productsFromApi, setProductsFromApi] = useState<Product[] | null>(null);
  const [categoriesMap, setCategoriesMap] = useState<Record<string, { image?: string; nameEn?: string }>>({});
  const [categoriesList, setCategoriesList] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.ok ? res.json() : null)
      .then((list: { id: string; name: string; nameEn: string; image?: string }[] | null) => {
        if (!Array.isArray(list)) return;
        const next: Record<string, { image?: string; nameEn?: string }> = {};
        list.forEach((c) => {
          const base = PRODUCT_CATEGORIES[c.id as ProductCategory];
          next[c.id] = {
            image: c.image || base?.image || '',
            nameEn: c.nameEn || base?.nameEn || c.name,
          };
        });
        setCategoriesMap(next);
        setCategoriesList(list.map((c) => c.id));
      })
      .catch(() => {
        setCategoriesList(Object.keys(PRODUCT_CATEGORIES));
      });
  }, []);

  const calculatorCategories = categoriesList.length > 0 ? categoriesList : Object.keys(PRODUCT_CATEGORIES);

  const getCategoryImage = (categoryKey: string): string => {
    const fromApi = categoriesMap[categoryKey]?.image;
    if (fromApi) return fromApi;
    const fromCatalog = (PRODUCT_CATEGORIES as Record<string, { image?: string }>)[categoryKey]?.image;
    if (fromCatalog) return fromCatalog;
    return '/production_1.jpg';
  };

  const getCategoryName = (categoryKey: string): string => {
    return categoriesMap[categoryKey]?.nameEn ?? (PRODUCT_CATEGORIES as Record<string, { nameEn?: string }>)[categoryKey]?.nameEn ?? categoryKey;
  };

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.ok ? res.json() : null)
      .then((data: { products?: Product[] } | null) => {
        if (data && Array.isArray(data.products)) setProductsFromApi(data.products);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [profileDropdownOpen]);

  const productsList = productsFromApi !== null && productsFromApi.length > 0 ? productsFromApi : CATALOG_PRODUCTS;

  // Filter products by selected category (one category = one id, no grouping)
  const availableProducts = useMemo(() => {
    if (!selectedCategoryKey) return [];
    return productsList.filter((p) => p.category === selectedCategoryKey);
  }, [selectedCategoryKey, productsList]);

  // Calculate order details
  const calculation = useMemo(() => {
    if (!selectedProduct) return null;
    const totalWeight = selectedProduct.weightPerMeter * length * quantity;
    return calculateOrder(selectedProduct, length, quantity, isWholesaleOrder(totalWeight));
  }, [selectedProduct, length, quantity]);

  // Reset when category changes
  const handleCategorySelect = (categoryKey: string) => {
    setSelectedCategoryKey(categoryKey);
    setSelectedProduct(null);
    setLength(1);
    setLengthInput('1');
    setQuantity(1);
    setQuantityInput('1');
    setFreeCutting(false);
    setAdditionalProcessing(false);
  };

  // Reset when product changes
  const handleProductSelect = (productId: string) => {
    const product = availableProducts.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      const defaultLength = product.standardLengths[0] || 1;
      setLength(defaultLength);
      setLengthInput(defaultLength.toString());
      setQuantity(1);
      setQuantityInput('1');
    }
  };

  // Handle length input change - allow any input; update length only when in valid range (show red if > 25 or < 0.1)
  const handleLengthInputChange = (value: string) => {
    setLengthInput(value);
    if (value === '' || value === '-') return;
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= MIN_CUSTOM_LENGTH && numValue <= MAX_CUSTOM_LENGTH) {
      setLength(numValue);
    }
  };

  // Is custom length out of range (show red)
  const lengthNum = parseFloat(lengthInput);
  const isLengthInvalid =
    lengthInput !== '' &&
    lengthInput !== '-' &&
    (isNaN(lengthNum) || lengthNum < MIN_CUSTOM_LENGTH || lengthNum > MAX_CUSTOM_LENGTH);

  // Handle length input blur - validate and clamp to min/max
  const handleLengthInputBlur = () => {
    const numValue = parseFloat(lengthInput);
    if (isNaN(numValue) || numValue <= 0 || lengthInput === '' || lengthInput === '-') {
      const defaultLength = selectedProduct?.standardLengths[0] || 1;
      setLengthInput(defaultLength.toString());
      setLength(defaultLength);
    } else {
      const clamped = Math.min(MAX_CUSTOM_LENGTH, Math.max(MIN_CUSTOM_LENGTH, numValue));
      setLengthInput(clamped.toString());
      setLength(clamped);
    }
  };

  const handleQuantityInputChange = (value: string) => {
    setQuantityInput(value);
    const num = parseInt(value, 10);
    if (value !== '' && !isNaN(num) && num >= 1) setQuantity(num);
  };

  const handleQuantityInputBlur = () => {
    const num = parseInt(quantityInput, 10);
    if (quantityInput === '' || isNaN(num) || num < 1) {
      setQuantity(1);
      setQuantityInput('1');
    } else {
      setQuantity(num);
      setQuantityInput(num.toString());
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    if (!selectedProduct) return;
    
    addItem(
      selectedProduct,
      length,
      quantity,
      freeCutting,
      additionalProcessing ? 'Additional processing (drilling, milling) - on request' : undefined
    );
    
    setIsSuccessAlertOpen(true);
    
    // Reset form
    setSelectedCategoryKey(null);
    setSelectedProduct(null);
    setLength(1);
    setLengthInput('1');
    setQuantity(1);
    setQuantityInput('1');
    setFreeCutting(false);
    setAdditionalProcessing(false);
  };

  // Handle wholesale inquiry
  const handleWholesaleInquiry = async () => {
    if (!selectedProduct) return;
    
    try {
      const response = await fetch('/api/wholesale-inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...wholesaleFormData,
          productInterests: [selectedProduct.nameEn],
          message: `Wholesale inquiry for ${selectedProduct.nameEn} (${selectedProduct.dimensions}).\n\nOrder details:\n- Length: ${length}m\n- Quantity: ${quantity} pcs\n- Total weight: ${calculation?.totalWeight.toFixed(2)}kg\n- Estimated cost: £${calculation?.finalPrice.toFixed(2)}\n\n${wholesaleFormData.message || ''}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsWholesaleModalOpen(false);
        setIsSuccessAlertOpen(true);
        setWholesaleFormData({
          company: '',
          contactName: '',
          email: '',
          phone: '',
          message: '',
        });
      } else {
        alert(result.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting wholesale inquiry:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const handleViewCart = () => {
    setIsSuccessAlertOpen(false);
    const cartButton = document.querySelector('[aria-label="Shopping Cart"]') as HTMLButtonElement;
    if (cartButton) {
      cartButton.click();
    }
  };

  return (
    <>
      <section id="calculator" className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-12 sm:pb-16 md:pb-20 lg:pb-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#050544] mb-2 sm:mb-3 leading-tight tracking-tight">
                Interactive Order Calculator
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">
                Calculate costs and configure your order step by step. Select profile, set parameters, and get instant pricing.
              </p>
            </div>

            {/* Calculator Card */}
            <div className="bg-white border-2 border-[#E9EDF4] rounded-lg shadow-lg p-6 sm:p-8 md:p-10">
              {/* Step 1: Category Selection */}
              <div className="mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-[#050544] mb-4">
                  Step 1: Select Category
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {calculatorCategories.map((key) => (
                    <button
                      key={key}
                      onClick={() => handleCategorySelect(key)}
                      className={`relative overflow-hidden w-full aspect-square border-2 rounded-lg transition-all duration-300 text-sm sm:text-base font-semibold group flex items-center justify-center ${
                        selectedCategoryKey === key
                          ? 'border-[#445DFE] shadow-lg scale-105'
                          : 'border-gray-300 hover:border-[#445DFE] hover:shadow-md'
                      }`}
                    >
                      {/* Background: from API/categories or PRODUCT_CATEGORIES, fallback /production_1.jpg */}
                      <div className="absolute inset-0 z-0">
                        <Image
                          src={getUploadImageSrc(getCategoryImage(key))}
                          alt={`${getCategoryName(key)} background`}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          quality={92}
                          className="object-cover"
                          unoptimized={getCategoryImage(key).startsWith("/uploads") || getCategoryImage(key).startsWith("/api/uploads")}
                        />
                        <div className="absolute inset-0 bg-black/40" />
                      </div>
                      <span className="relative z-10 text-white font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] px-2 text-center">
                        {getCategoryName(key)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Product Selection */}
              {selectedCategoryKey && (
                <div className="mb-8" ref={profileDropdownRef}>
                  <h3 className="text-lg sm:text-xl font-bold text-[#050544] mb-4">
                    Step 2: Select Profile
                  </h3>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setProfileDropdownOpen((v) => !v)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#445DFE] text-[#050544] text-base font-medium flex items-center gap-3 text-left bg-white"
                    >
                      {selectedProduct ? (
                        <>
                          {getProductImage(selectedProduct) ? (
                            <span className="relative w-10 h-10 shrink-0 rounded overflow-hidden bg-gray-100">
                              <Image
                                src={getUploadImageSrc(getProductImage(selectedProduct))}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="40px"
                                unoptimized={getProductImage(selectedProduct).startsWith("/uploads") || getProductImage(selectedProduct).startsWith("/api/uploads")}
                              />
                            </span>
                          ) : null}
                          <span className="flex-1 min-w-0 truncate">
                            {selectedProduct.nameEn} ({selectedProduct.dimensions}) — £
                            {(getPricePerMeter(selectedProduct) ?? selectedProduct.pricePerKg ?? 0).toFixed(2)}
                            {getPricePerMeter(selectedProduct) != null ? '/m' : '/kg'}
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-500">-- Select a profile --</span>
                      )}
                      <span className="shrink-0 text-gray-400" aria-hidden>
                        {profileDropdownOpen ? '▲' : '▼'}
                      </span>
                    </button>
                    {profileDropdownOpen && (
                      <ul className="absolute z-10 mt-1 w-full max-h-80 overflow-auto border-2 border-gray-200 rounded-lg bg-white shadow-lg py-1">
                        {availableProducts.map((product) => {
                          const ppm = getPricePerMeter(product);
                          const img = getProductImage(product);
                          return (
                            <li key={product.id}>
                              <button
                                type="button"
                                onClick={() => {
                                  handleProductSelect(product.id);
                                  setProfileDropdownOpen(false);
                                }}
                                className={`w-full px-4 py-3 flex items-center gap-3 text-left hover:bg-[#E9EDF4] transition-colors ${
                                  selectedProduct?.id === product.id ? 'bg-[#E9EDF4]' : ''
                                }`}
                              >
                                {img ? (
                                  <span className="relative w-12 h-12 shrink-0 rounded overflow-hidden bg-gray-100">
                                    <Image
                                      src={getUploadImageSrc(img)}
                                      alt=""
                                      fill
                                      className="object-cover"
                                      sizes="48px"
                                      unoptimized={img.startsWith("/uploads") || img.startsWith("/api/uploads")}
                                    />
                                  </span>
                                ) : (
                                  <span className="w-12 h-12 shrink-0 rounded bg-gray-200" />
                                )}
                                <span className="flex-1 min-w-0">
                                  <span className="font-medium text-[#050544] block truncate">
                                    {product.nameEn} ({product.dimensions})
                                  </span>
                                  <span className="text-sm text-gray-600">
                                    £{(ppm ?? product.pricePerKg ?? 0).toFixed(2)}
                                    {ppm != null ? '/m' : '/kg'}
                                  </span>
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Parameters and Calculation */}
              {selectedProduct && (
                <div className="mb-8">
                  <h3 className="text-lg sm:text-xl font-bold text-[#050544] mb-4">
                    Step 3: Configure Parameters
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Length Selection */}
                    <div>
                      <label className="block text-sm font-semibold text-[#050544] mb-2">
                        Length (m)
                      </label>
                      <p className="text-xs text-gray-500 mb-2">
                        Choose a standard length or enter your own below.
                      </p>
                      <div className="flex gap-2 mb-3">
                        <span className="text-xs text-gray-500 self-center shrink-0">Quick select:</span>
                        {selectedProduct.standardLengths.map((stdLength) => (
                          <button
                            key={stdLength}
                            onClick={() => {
                              setLength(stdLength);
                              setLengthInput(stdLength.toString());
                            }}
                            className={`px-4 py-2 border-2 rounded transition-colors ${
                              length === stdLength
                                ? 'bg-[#445DFE] text-white border-[#445DFE]'
                                : 'bg-white text-[#050544] border-gray-300 hover:border-[#445DFE]'
                            }`}
                          >
                            {stdLength}m
                          </button>
                        ))}
                      </div>
                      <label className="block text-sm font-medium text-[#050544] mb-1">
                        Custom length (m)
                      </label>
                      <input
                        type="number"
                        min={MIN_CUSTOM_LENGTH}
                        max={MAX_CUSTOM_LENGTH}
                        step="0.1"
                        value={lengthInput}
                        onChange={(e) => handleLengthInputChange(e.target.value)}
                        onBlur={handleLengthInputBlur}
                        className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none text-[#050544] ${
                          isLengthInvalid
                            ? 'border-red-500 focus:border-red-500 bg-red-50/50'
                            : 'border-gray-300 focus:border-[#445DFE]'
                        }`}
                        placeholder="e.g. 2.5, 4.2"
                        aria-describedby="custom-length-hint"
                        aria-invalid={isLengthInvalid}
                      />
                      <p id="custom-length-hint" className={`text-xs mt-1 ${isLengthInvalid ? 'text-red-600' : 'text-gray-500'}`}>
                        {isLengthInvalid ? `Length must be between ${MIN_CUSTOM_LENGTH}m and ${MAX_CUSTOM_LENGTH}m.` : 'Enter length in metres, max 25m (e.g. 2.5, 4.2). Used when you don’t use a quick-select option above.'}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div>
                      <label className="block text-sm font-semibold text-[#050544] mb-2">
                        Quantity (pcs)
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={quantityInput}
                        onChange={(e) => handleQuantityInputChange(e.target.value)}
                        onBlur={handleQuantityInputBlur}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#445DFE] text-[#050544]"
                      />
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-3 mb-6">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={freeCutting}
                        onChange={(e) => setFreeCutting(e.target.checked)}
                        className="w-5 h-5 text-[#445DFE] focus:ring-[#445DFE] rounded"
                      />
                      <span className="text-sm sm:text-base text-[#050544] font-medium">
                        ☑️ Free cutting to size (promotional)
                      </span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={additionalProcessing}
                        onChange={(e) => setAdditionalProcessing(e.target.checked)}
                        className="w-5 h-5 text-[#445DFE] focus:ring-[#445DFE] rounded"
                      />
                      <span className="text-sm sm:text-base text-[#050544] font-medium">
                        Additional processing (drilling, milling) — on request
                      </span>
                    </label>
                  </div>

                  {/* Calculation Results */}
                  {calculation && (
                    <div className="bg-[#E9EDF4] rounded-lg p-4 sm:p-6 mb-6">
                      <h4 className="text-lg font-bold text-[#050544] mb-4">Calculation Results</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Total Weight</p>
                          <p className="text-xl font-bold text-[#050544]">
                            {calculation.totalWeight.toFixed(2)} kg
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Total Length</p>
                          <p className="text-xl font-bold text-[#050544]">
                            {calculation.totalLength.toFixed(2)} m
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-gray-600 mb-1">Material Cost</p>
                          <p className="text-2xl font-bold text-[#445DFE]">
                            £{calculation.finalPrice.toFixed(2)}
                          </p>
                          {calculation.discount > 0 && (
                            <p className="text-xs text-green-600 mt-1">
                              Wholesale discount {((calculation.discount || 0) * 100).toFixed(0)}% applied
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Actions */}
              {selectedProduct && calculation && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleAddToCart}
                    variant="primary"
                    className="flex-1 bg-[#445DFE] hover:bg-[#050544] text-white py-3 px-6 text-base font-semibold transition-all duration-300 rounded-none"
                  >
                    Add to Order
                  </Button>
                  <Link
                    href="/wholesale"
                    className="flex-1 border-2 border-[#050544] text-black hover:bg-[#050544] hover:text-white py-3 px-6 text-base font-semibold transition-all duration-300 rounded-none flex flex-col items-center justify-center cursor-pointer text-center"
                  >
                    <span>Request wholesale price</span>
                    {calculation.totalWeight >= 500 ? (
                      <span className="block text-xs mt-1 opacity-90">You qualify for wholesale pricing</span>
                    ) : (
                      <span className="block text-xs mt-1 opacity-75">(Available for orders 500kg+)</span>
                    )}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Wholesale Inquiry Modal */}
      <Modal isOpen={isWholesaleModalOpen} onClose={() => setIsWholesaleModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-[#050544] mb-4">Request Wholesale Price</h2>
          <p className="text-gray-600 mb-6">
            Fill in your details and we'll contact you with a wholesale quote.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#050544] mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={wholesaleFormData.company}
                onChange={(e) => setWholesaleFormData({ ...wholesaleFormData, company: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#445DFE] text-[#050544]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#050544] mb-2">
                Contact Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={wholesaleFormData.contactName}
                onChange={(e) => setWholesaleFormData({ ...wholesaleFormData, contactName: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#445DFE] text-[#050544]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#050544] mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={wholesaleFormData.email}
                onChange={(e) => setWholesaleFormData({ ...wholesaleFormData, email: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#445DFE] text-[#050544]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#050544] mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={wholesaleFormData.phone}
                onChange={(e) => setWholesaleFormData({ ...wholesaleFormData, phone: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#445DFE] text-[#050544]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#050544] mb-2">
                Additional Message (optional)
              </label>
              <textarea
                value={wholesaleFormData.message}
                onChange={(e) => setWholesaleFormData({ ...wholesaleFormData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#445DFE] text-[#050544]"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => setIsWholesaleModalOpen(false)}
                variant="outline"
                className="flex-1 border-gray-300 text-[#050544] hover:bg-gray-100 rounded-none"
              >
                Cancel
              </Button>
              <Button
                onClick={handleWholesaleInquiry}
                variant="primary"
                className="flex-1 bg-[#445DFE] hover:bg-[#050544] text-white rounded-none"
                disabled={
                  !wholesaleFormData.company ||
                  !wholesaleFormData.contactName ||
                  !wholesaleFormData.email ||
                  !wholesaleFormData.phone
                }
              >
                Submit Inquiry
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Success Alert */}
      <SuccessAlert
        isOpen={isSuccessAlertOpen}
        onClose={() => setIsSuccessAlertOpen(false)}
        onViewCart={handleViewCart}
        productName={selectedProduct?.nameEn || 'Product'}
        quantity={quantity}
        length={length}
      />
    </>
  );
};
