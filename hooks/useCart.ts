import { useCartStore } from '@/store/cart';

export function useCart() {
  const {
    items,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    getTotal,
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
    totalWeight: getTotalWeight(),
    itemCount: getItemCount(),
  };
}
