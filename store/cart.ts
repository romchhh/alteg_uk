import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/lib/types/order';
import { Product } from '@/lib/types/product';
import { calculateOrder, calculateCartTotal } from '@/lib/utils/calculations';
import { isWholesaleOrder } from '@/lib/constants/prices';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, length: number, quantity: number, freeCutting?: boolean, additionalProcessing?: string) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<Pick<CartItem, 'length' | 'quantity' | 'freeCutting' | 'additionalProcessing'>>) => void;
  clearCart: () => void;
  getTotal: () => number;
  getTotalWeight: () => number;
  getItemCount: () => number;
}

function generateCartItemId(product: Product, length: number, freeCutting: boolean, additionalProcessing?: string): string {
  const parts = [product.id, length.toString(), freeCutting ? 'cut' : 'nocut'];
  if (additionalProcessing) {
    parts.push(additionalProcessing.replace(/\s+/g, '-').toLowerCase());
  }
  return parts.join('-');
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, length, quantity, freeCutting = false, additionalProcessing) => {
    const id = generateCartItemId(product, length, freeCutting, additionalProcessing);
    const existingItemIndex = get().items.findIndex((item) => item.id === id);
    
    if (existingItemIndex >= 0) {
      // Update existing item
      const existingItem = get().items[existingItemIndex];
      const newQuantity = existingItem.quantity + quantity;
      const calculation = calculateOrder(product, length, newQuantity, isWholesaleOrder(get().getTotalWeight()));
      
      const updatedItems = [...get().items];
      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity: newQuantity,
        calculatedPrice: calculation.finalPrice,
        calculatedWeight: calculation.totalWeight,
      };
      
      set({ items: updatedItems });
    } else {
      // Add new item
      const totalWeight = get().getTotalWeight();
      const calculation = calculateOrder(product, length, quantity, isWholesaleOrder(totalWeight));
      
      const newItem: CartItem = {
        id,
        product,
        length,
        quantity,
        freeCutting,
        additionalProcessing,
        calculatedPrice: calculation.finalPrice,
        calculatedWeight: calculation.totalWeight,
      };
      
      set({ items: [...get().items, newItem] });
    }
  },
  
  removeItem: (id) => {
    set({ items: get().items.filter((item) => item.id !== id) });
  },
  
  updateItem: (id, updates) => {
    const item = get().items.find((item) => item.id === id);
    if (!item) return;
    
    const updatedItem = { ...item, ...updates };
    const totalWeight = get().getTotalWeight();
    const calculation = calculateOrder(
      item.product,
      updatedItem.length,
      updatedItem.quantity,
      isWholesaleOrder(totalWeight)
    );
    
    updatedItem.calculatedPrice = calculation.finalPrice;
    updatedItem.calculatedWeight = calculation.totalWeight;
    
    set({
      items: get().items.map((item) => (item.id === id ? updatedItem : item)),
    });
  },
  
  clearCart: () => {
    set({ items: [] });
  },
  
  getTotal: () => {
    const items = get().items;
    if (items.length === 0) return 0;
    const totalWeight = items.reduce((sum, item) => sum + item.calculatedWeight, 0);
    const result = calculateCartTotal(items, isWholesaleOrder(totalWeight));
    return result.total;
  },
  
  getTotalWeight: () => {
    return get().items.reduce((sum, item) => sum + item.calculatedWeight, 0);
  },
  
      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'alteg-cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
