export const DELIVERY_METHODS = [
  { value: 'standard', label: 'Standard Delivery (3-5 days)', cost: 15 },
  { value: 'express', label: 'Express Delivery (1-2 days)', cost: 25 },
  { value: 'collection', label: 'Collection from Warehouse', cost: 0 },
] as const;

export const UK_POSTCODE_AREAS = {
  // Simplified postcode areas for delivery calculation
  // In production, this should be more comprehensive
  LONDON: ['E', 'EC', 'N', 'NW', 'SE', 'SW', 'W', 'WC'],
  NORTH_WEST: ['M', 'L', 'SK', 'WA', 'WN', 'OL', 'BL', 'PR'],
  MIDLANDS: ['B', 'CV', 'DE', 'LE', 'NG', 'ST', 'WV', 'WS'],
  SOUTH_EAST: ['BN', 'BR', 'CR', 'CT', 'DA', 'GU', 'HP', 'KT', 'ME', 'RH', 'SL', 'SM', 'TN', 'TW'],
  // Add more as needed
} as const;

export function calculateDeliveryCost(
  postcode: string,
  orderTotal: number,
  deliveryMethod: string = 'standard'
): number {
  const FREE_DELIVERY_THRESHOLD = 77; // £77 ex. VAT (Mainland UK)

  // Free delivery for orders over threshold (except collection)
  if (orderTotal >= FREE_DELIVERY_THRESHOLD && deliveryMethod !== 'collection') {
    return 0;
  }

  // Collection is always free
  if (deliveryMethod === 'collection') {
    return 0;
  }

  // Base rate by method
  const method = DELIVERY_METHODS.find((m) => m.value === deliveryMethod);
  if (method) {
    return method.cost;
  }

  // Default standard delivery
  return DELIVERY_METHODS[0].cost;
}
