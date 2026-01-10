'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Product, ProductCategoryInfo } from '@/lib/types/product';
import { Button } from '@/components/shared/Button';
import { useCartStore } from '@/store/cart';
import { Modal } from '@/components/shared/Modal';
import { SuccessAlert } from '@/components/shared/SuccessAlert';

interface ProductCardProps {
  product: Product;
  categoryInfo: ProductCategoryInfo;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, categoryInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);
  const [selectedLength, setSelectedLength] = useState(product.standardLengths[0]);
  const [quantity, setQuantity] = useState(1);
  const [freeCutting, setFreeCutting] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product, selectedLength, quantity, freeCutting);
    setIsModalOpen(false);
    setIsSuccessAlertOpen(true);
  };

  const handleViewCart = () => {
    setIsSuccessAlertOpen(false);
    // Trigger cart to open
    const cartButton = document.querySelector('[aria-label="Shopping Cart"]') as HTMLButtonElement;
    if (cartButton) {
      cartButton.click();
    }
  };

  const calculatePrice = () => {
    if (product.pricePerMeter) {
      return (product.pricePerMeter * selectedLength * quantity).toFixed(2);
    } else if (product.pricePerKg) {
      return (product.pricePerKg * product.weightPerMeter * quantity).toFixed(2);
    }
    return '0.00';
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
        {/* Product Image */}
        <div className="relative h-48 bg-gray-100">
          <Image
            src={product.image || categoryInfo.image}
            alt={product.nameEn}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {product.inStock && (
            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
              In Stock
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-[#050544] mb-2">{product.nameEn}</h3>
          <p className="text-sm text-gray-600 mb-2">{product.dimensions}</p>
          
          {/* Brief Description */}
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.descriptionEn || categoryInfo.descriptionEn}
          </p>

          {/* Specifications */}
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-1">
              <strong>Material:</strong> {product.material}
            </p>
            <p className="text-xs text-gray-500 mb-1">
              <strong>Weight:</strong> {product.weightPerMeter} kg/m
            </p>
            <p className="text-xs text-gray-500">
              <strong>Lengths:</strong> {product.standardLengths.join(', ')}m
            </p>
          </div>

          {/* Applications */}
          {categoryInfo.applicationsEn && categoryInfo.applicationsEn.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-700 mb-1">Applications:</p>
              <div className="flex flex-wrap gap-1">
                {categoryInfo.applicationsEn.slice(0, 3).map((app, index) => (
                  <span
                    key={index}
                    className="text-xs bg-[#E9EDF4] text-[#050544] px-2 py-1 rounded"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              From{' '}
              <span className="text-lg font-bold text-[#445DFE]">
                £{product.pricePerMeter?.toFixed(2) || product.pricePerKg?.toFixed(2)}
              </span>
              {product.pricePerMeter ? '/m' : '/kg'}
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-auto">
            <Button
              onClick={() => setIsModalOpen(true)}
              variant="primary"
              className="w-full bg-[#445DFE] hover:bg-[#050544] text-white py-2 px-4 transition-colors duration-300"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* Add to Cart Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-[#050544] mb-4">{product.nameEn}</h2>
          <p className="text-gray-900 mb-6">{product.dimensions}</p>

          <div className="space-y-4">
            {/* Length Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Select Length (meters):
              </label>
              <div className="flex gap-2">
                {product.standardLengths.map((length) => (
                  <button
                    key={length}
                    onClick={() => setSelectedLength(length)}
                    className={`px-4 py-2 border rounded transition-colors ${
                      selectedLength === length
                        ? 'bg-[#445DFE] text-white border-[#445DFE]'
                        : 'bg-white text-gray-900 border-gray-300 hover:border-[#445DFE]'
                    }`}
                  >
                    {length}m
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Quantity:
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#445DFE] text-gray-900"
              />
            </div>

            {/* Free Cutting Option */}
            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={freeCutting}
                  onChange={(e) => setFreeCutting(e.target.checked)}
                  className="w-4 h-4 text-[#445DFE] focus:ring-[#445DFE] rounded"
                />
                <span className="text-sm text-gray-900">Free cutting to size</span>
              </label>
            </div>

            {/* Price Summary */}
            <div className="bg-[#E9EDF4] p-4 rounded">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-900">Total:</span>
                <span className="text-2xl font-bold text-[#445DFE]">£{calculatePrice()}</span>
              </div>
              <p className="text-xs text-gray-900 mt-2">
                {quantity} x {selectedLength}m = {(quantity * selectedLength).toFixed(1)}m total
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={() => setIsModalOpen(false)}
                variant="outline"
                className="flex-1 border-gray-300 text-gray-900 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddToCart}
                variant="primary"
                className="flex-1 bg-[#445DFE] hover:bg-[#050544] text-white"
              >
                Add to Cart
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
        productName={product.nameEn}
        quantity={quantity}
        length={selectedLength}
      />
    </>
  );
};
