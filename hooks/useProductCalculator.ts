import { useState, useMemo } from 'react';
import { Product } from '@/lib/types/product';
import { calculateOrder, CalculationResult } from '@/lib/utils/calculations';
import { isWholesaleOrder } from '@/lib/constants/prices';

interface UseProductCalculatorProps {
  product: Product;
  isWholesale?: boolean;
}

export function useProductCalculator({ product, isWholesale = false }: UseProductCalculatorProps) {
  const [length, setLength] = useState<number>(product.standardLengths[0] || 1);
  const [quantity, setQuantity] = useState<number>(1);
  const [freeCutting, setFreeCutting] = useState<boolean>(false);
  const [additionalProcessing, setAdditionalProcessing] = useState<string>('');

  const calculation: CalculationResult = useMemo(() => {
    return calculateOrder(product, length, quantity, isWholesale);
  }, [product, length, quantity, isWholesale]);

  const reset = () => {
    setLength(product.standardLengths[0] || 1);
    setQuantity(1);
    setFreeCutting(false);
    setAdditionalProcessing('');
  };

  return {
    length,
    setLength,
    quantity,
    setQuantity,
    freeCutting,
    setFreeCutting,
    additionalProcessing,
    setAdditionalProcessing,
    calculation,
    reset,
  };
}
