// Volume discount tiers: applied to cart total (ex. VAT) in £
export const VOLUME_DISCOUNT_TIERS = [
  { minCartTotal: 0, maxCartTotal: 99.99, discount: 0 },
  { minCartTotal: 100, maxCartTotal: 999.99, discount: 0.05 },    // 5%
  { minCartTotal: 1000, maxCartTotal: 3999.99, discount: 0.10 },  // 10%
  { minCartTotal: 4000, maxCartTotal: 6999.99, discount: 0.15 },  // 15%
  { minCartTotal: 7000, maxCartTotal: 9999.99, discount: 0.20 }, // 20%
  { minCartTotal: 10000, maxCartTotal: Infinity, discount: 0.25 }, // 25%
] as const;

// Length discount: from 6m 3%, from 18m 5% (by total length per line: length * quantity)
export const LENGTH_DISCOUNT_TIERS = [
  { minLength: 0, maxLength: 5.99, discount: 0 },
  { minLength: 6, maxLength: 17.99, discount: 0.03 }, // 3%
  { minLength: 18, maxLength: Infinity, discount: 0.05 }, // 5%
] as const;

export const FREE_DELIVERY_THRESHOLD = 77; // £77 ex. VAT (Mainland UK)

export const BASE_DELIVERY_RATE = 15; // £15

/** Volume discount rate (0–1) by cart total ex. VAT in £. Applied to cart total. */
export function getVolumeDiscountByCartTotal(cartTotalExVat: number): number {
  const tier = VOLUME_DISCOUNT_TIERS.find(
    (t) => cartTotalExVat >= t.minCartTotal && cartTotalExVat <= t.maxCartTotal
  );
  return tier?.discount ?? 0;
}

export function getLengthDiscount(totalLengthMeters: number): number {
  const tier = LENGTH_DISCOUNT_TIERS.find(
    (t) => totalLengthMeters >= t.minLength && totalLengthMeters <= t.maxLength
  );
  return tier?.discount ?? 0;
}

/** True when cart total (ex. VAT) qualifies for volume discount (≥ £100). */
export function isWholesaleOrder(cartTotalExVat: number): boolean {
  return cartTotalExVat >= 100;
}
