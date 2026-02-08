// Wholesale discount tiers based on total weight (kg)
export const WHOLESALE_DISCOUNT_TIERS = [
  { minWeight: 0, maxWeight: 99, discount: 0 },
  { minWeight: 100, maxWeight: 499, discount: 0.05 }, // 5%
  { minWeight: 500, maxWeight: 999, discount: 0.10 }, // 10%
  { minWeight: 1000, maxWeight: 4999, discount: 0.15 }, // 15%
  { minWeight: 5000, maxWeight: Infinity, discount: 0.20 }, // 20%
] as const;

// Length discount: from 6m 3%, from 18m 5% (by total length per line: length * quantity)
export const LENGTH_DISCOUNT_TIERS = [
  { minLength: 0, maxLength: 5.99, discount: 0 },
  { minLength: 6, maxLength: 17.99, discount: 0.03 }, // 3%
  { minLength: 18, maxLength: Infinity, discount: 0.05 }, // 5%
] as const;

export const FREE_DELIVERY_THRESHOLD = 30; // £30

export const BASE_DELIVERY_RATE = 15; // £15

export function getWholesaleDiscount(totalWeight: number): number {
  const tier = WHOLESALE_DISCOUNT_TIERS.find(
    (t) => totalWeight >= t.minWeight && totalWeight <= t.maxWeight
  );
  return tier?.discount ?? 0;
}

export function getLengthDiscount(totalLengthMeters: number): number {
  const tier = LENGTH_DISCOUNT_TIERS.find(
    (t) => totalLengthMeters >= t.minLength && totalLengthMeters <= t.maxLength
  );
  return tier?.discount ?? 0;
}

export function isWholesaleOrder(totalWeight: number): boolean {
  return totalWeight >= WHOLESALE_DISCOUNT_TIERS[1].minWeight; // 100kg+
}
