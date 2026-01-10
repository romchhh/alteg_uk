import { Product } from '@/lib/types/product';
import { getWholesaleDiscount } from '@/lib/constants/prices';

export interface CalculationResult {
  totalLength: number;
  totalWeight: number;
  materialCost: number;
  discount: number;
  discountAmount: number;
  finalPrice: number;
}

export function calculateOrder(
  product: Product,
  length: number,
  quantity: number,
  isWholesale: boolean = false
): CalculationResult {
  const totalLength = length * quantity;
  const totalWeight = product.weightPerMeter * totalLength;

  // Calculate material cost based on pricing method
  const materialCost = product.pricePerMeter
    ? totalLength * product.pricePerMeter
    : totalWeight * (product.pricePerKg || 0);

  // Apply wholesale discount if applicable
  const discount = isWholesale ? getWholesaleDiscount(totalWeight) : 0;
  const discountAmount = materialCost * discount;
  const finalPrice = materialCost - discountAmount;

  return {
    totalLength,
    totalWeight,
    materialCost,
    discount,
    discountAmount,
    finalPrice,
  };
}

export function calculateCartTotal(
  items: Array<{
    product: Product;
    length: number;
    quantity: number;
    calculatedPrice: number;
    calculatedWeight: number;
  }>,
  isWholesale: boolean = false
): {
  subtotal: number;
  totalWeight: number;
  discount: number;
  discountAmount: number;
  total: number;
} {
  const subtotal = items.reduce((sum, item) => sum + item.calculatedPrice, 0);
  const totalWeight = items.reduce((sum, item) => sum + item.calculatedWeight, 0);

  const discount = isWholesale ? getWholesaleDiscount(totalWeight) : 0;
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  return {
    subtotal,
    totalWeight,
    discount,
    discountAmount,
    total,
  };
}

export function formatCurrency(amount: number, currency: string = 'GBP'): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatWeight(weight: number, unit: string = 'kg'): string {
  if (weight < 1) {
    return `${(weight * 1000).toFixed(0)}g`;
  }
  return `${weight.toFixed(2)}${unit}`;
}

export function formatLength(length: number, unit: string = 'm'): string {
  if (length >= 1) {
    return `${length.toFixed(2)}${unit}`;
  }
  return `${(length * 1000).toFixed(0)}mm`;
}
