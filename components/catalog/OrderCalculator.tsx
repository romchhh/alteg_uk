'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Product, ProductCategory } from '@/lib/types/product';
import { CATALOG_PRODUCTS, PRODUCT_CATEGORIES } from '@/lib/constants/catalog';
import { useCartStore } from '@/store/cart';
import { calculateOrder } from '@/lib/utils/calculations';
import { isWholesaleOrder } from '@/lib/constants/prices';
import { Button } from '@/components/shared/Button';
import { Modal } from '@/components/shared/Modal';
import { SuccessAlert } from '@/components/shared/SuccessAlert';

// Маппінг категорій для калькулятора
const CALCULATOR_CATEGORIES: Record<string, ProductCategory[]> = {
  angle: ['angle'],
  tube_square: ['tube_square'],
  tube_round: ['tube_round'],
  round_bar: ['round_bar'],
  channel: ['channel'],
  sheet: ['sheet'],
  other: ['plate', 'i_beam', 't_beam', 't_profile', 'z_profile', 'square_bar', 'threshold', 'tube_rectangular'],
};

const CATEGORY_LABELS: Record<string, { en: string; ua: string }> = {
  angle: { en: 'Aluminium Angle', ua: 'Уголок' },
  tube_square: { en: 'Square Tube', ua: 'Труба квадратная' },
  tube_round: { en: 'Round Tube', ua: 'Труба круглая' },
  round_bar: { en: 'Round Bar', ua: 'Круг' },
  channel: { en: 'Channel', ua: 'Швеллер' },
  sheet: { en: 'Sheet', ua: 'Лист' },
  other: { en: 'Other Profiles', ua: 'Прочие профили' },
};

export const OrderCalculator: React.FC = () => {
  // Step 1: Category selection
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string | null>(null);
  
  // Step 2: Product selection
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Step 3: Parameters
  const [length, setLength] = useState<number>(1);
  const [lengthInput, setLengthInput] = useState<string>('1');
  const [quantity, setQuantity] = useState<number>(1);
  const [freeCutting, setFreeCutting] = useState<boolean>(false);
  const [additionalProcessing, setAdditionalProcessing] = useState<boolean>(false);
  
  // UI State
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

  // Filter products by selected category
  const availableProducts = useMemo(() => {
    if (!selectedCategoryKey) return [];
    const categoryTypes = CALCULATOR_CATEGORIES[selectedCategoryKey] || [];
    return CATALOG_PRODUCTS.filter((p) => categoryTypes.includes(p.category));
  }, [selectedCategoryKey]);

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
    }
  };

  // Handle length input change - allow any input, update length only if valid
  const handleLengthInputChange = (value: string) => {
    // Allow empty string for easier editing
    setLengthInput(value);
    
    // Only update length if value is a valid positive number
    if (value === '' || value === '-') {
      // Allow empty or minus sign for editing
      return;
    }
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      setLength(numValue);
    }
  };

  // Handle length input blur - validate and set minimum
  const handleLengthInputBlur = () => {
    const numValue = parseFloat(lengthInput);
    if (isNaN(numValue) || numValue <= 0 || lengthInput === '' || lengthInput === '-') {
      // Reset to default if invalid
      const defaultLength = selectedProduct?.standardLengths[0] || 1;
      setLengthInput(defaultLength.toString());
      setLength(defaultLength);
    } else {
      // Normalize the display value
      setLengthInput(numValue.toString());
      setLength(numValue);
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

  // Handle scroll to contact form
  const handleScrollToContact = () => {
    const contactForm = document.getElementById('contact');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                  {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                    <button
                      key={key}
                      onClick={() => handleCategorySelect(key)}
                      className={`relative overflow-hidden px-4 py-3 sm:py-4 border-2 rounded-lg transition-all duration-300 text-sm sm:text-base font-semibold min-h-[80px] sm:min-h-[100px] group ${
                        selectedCategoryKey === key
                          ? 'border-[#445DFE] shadow-lg scale-105'
                          : 'border-gray-300 hover:border-[#445DFE] hover:shadow-md'
                      }`}
                    >
                      {/* Background Image */}
                      <div className="absolute inset-0 z-0">
                        <Image
                          src="/production_1.jpg"
                          alt={`${label.en} background`}
                          fill
                          className="object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                        />
                        <div className={`absolute inset-0 ${
                          selectedCategoryKey === key 
                            ? 'bg-[#445DFE]/80' 
                            : 'bg-white/70 group-hover:bg-white/80'
                        } transition-colors`} />
                      </div>
                      
                      {/* Content */}
                      <span className={`relative z-10 ${
                        selectedCategoryKey === key ? 'text-white' : 'text-[#050544]'
                      }`}>
                        {label.en}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Product Selection */}
              {selectedCategoryKey && (
                <div className="mb-8">
                  <h3 className="text-lg sm:text-xl font-bold text-[#050544] mb-4">
                    Step 2: Select Profile
                  </h3>
                  <select
                    value={selectedProduct?.id || ''}
                    onChange={(e) => handleProductSelect(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#445DFE] text-[#050544] text-base font-medium"
                  >
                    <option value="">-- Select a profile --</option>
                    {availableProducts.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.nameEn} ({product.dimensions}) - £
                        {product.pricePerMeter?.toFixed(2) || product.pricePerKg?.toFixed(2)}
                        {product.pricePerMeter ? '/m' : '/kg'}
                      </option>
                    ))}
                  </select>
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
                      <div className="flex gap-2 mb-2">
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
                      <input
                        type="number"
                        min="0.1"
                        step="0.1"
                        value={lengthInput}
                        onChange={(e) => handleLengthInputChange(e.target.value)}
                        onBlur={handleLengthInputBlur}
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#445DFE] text-[#050544]"
                        placeholder="Or enter custom length"
                      />
                    </div>

                    {/* Quantity */}
                    <div>
                      <label className="block text-sm font-semibold text-[#050544] mb-2">
                        Quantity (pcs)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
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
                  <button
                    onClick={handleScrollToContact}
                    className="flex-1 border-2 border-[#050544] text-black hover:bg-[#050544] hover:text-white py-3 px-6 text-base font-semibold transition-all duration-300 rounded-none flex flex-col items-center justify-center cursor-pointer"
                  >
                    <span>Request Wholesale Price</span>
                    {calculation.totalWeight < 500 && (
                      <span className="block text-xs mt-1 opacity-75">
                        (Available for orders 500kg+)
                      </span>
                    )}
                  </button>
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
