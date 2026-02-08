import { useCartStore } from '@/store/cart';

export function useCart() {
  const {
    items,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    getTotal,
    getSubtotal,
    getDiscountAmount,
    getDiscountPercent,
    getTotalWeight,
    getItemCount,
  } = useCartStore();

  return {
    items,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    total: getTotal(),
    subtotal: getSubtotal(),
    discountAmount: getDiscountAmount(),
    discountPercent: getDiscountPercent(),
    totalWeight: getTotalWeight(),
    itemCount: getItemCount(),
  };
}
