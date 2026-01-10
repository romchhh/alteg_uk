// Wholesale discount tiers based on total weight (kg)
export const WHOLESALE_DISCOUNT_TIERS = [
  { minWeight: 0, maxWeight: 99, discount: 0 },
  { minWeight: 100, maxWeight: 499, discount: 0.05 }, // 5%
  { minWeight: 500, maxWeight: 999, discount: 0.10 }, // 10%
  { minWeight: 1000, maxWeight: 4999, discount: 0.15 }, // 15%
  { minWeight: 5000, maxWeight: Infinity, discount: 0.20 }, // 20%
] as const;

export const FREE_DELIVERY_THRESHOLD = 30; // £30

export const BASE_DELIVERY_RATE = 15; // £15

export function getWholesaleDiscount(totalWeight: number): number {
  const tier = WHOLESALE_DISCOUNT_TIERS.find(
    (t) => totalWeight >= t.minWeight && totalWeight <= t.maxWeight
  );
  return tier?.discount ?? 0;
}

export function isWholesaleOrder(totalWeight: number): boolean {
  return totalWeight >= WHOLESALE_DISCOUNT_TIERS[1].minWeight; // 100kg+
}
