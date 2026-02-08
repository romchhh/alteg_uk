import { Product } from '@/lib/types/product';
import { getWholesaleDiscount, getLengthDiscount } from '@/lib/constants/prices';

/** Price per meter = price per kg × weight per meter (density). */
export function getPricePerMeter(product: Product): number | undefined {
  if (product.pricePerKg != null && product.weightPerMeter != null) {
    return product.pricePerKg * product.weightPerMeter;
  }
  return product.pricePerMeter;
}

export interface CalculationResult {
  totalLength: number;
  totalWeight: number;
  materialCost: number;
  lengthDiscount: number;
  lengthDiscountAmount: number;
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

  const pricePerMeter = getPricePerMeter(product);
  const materialCost = pricePerMeter != null
    ? totalLength * pricePerMeter
    : totalWeight * (product.pricePerKg ?? 0);

  const lengthDiscount = getLengthDiscount(totalLength);
  const lengthDiscountAmount = materialCost * lengthDiscount;
  const afterLengthDiscount = materialCost - lengthDiscountAmount;

  const wholesaleDiscount = isWholesale ? getWholesaleDiscount(totalWeight) : 0;
  const discountAmount = afterLengthDiscount * wholesaleDiscount;
  const finalPrice = afterLengthDiscount - discountAmount;

  return {
    totalLength,
    totalWeight,
    materialCost,
    lengthDiscount,
    lengthDiscountAmount,
    discount: wholesaleDiscount,
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
