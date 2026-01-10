import { useState, useMemo } from 'react';
import { calculateDeliveryCost } from '@/lib/constants/delivery';

interface UseDeliveryProps {
  orderTotal: number;
}

export function useDelivery({ orderTotal }: UseDeliveryProps) {
  const [postcode, setPostcode] = useState<string>('');
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express' | 'collection'>('standard');
  const [instructions, setInstructions] = useState<string>('');

  const deliveryCost = useMemo(() => {
    if (!postcode || deliveryMethod === 'collection') {
      return 0;
    }
    return calculateDeliveryCost(postcode, orderTotal, deliveryMethod);
  }, [postcode, orderTotal, deliveryMethod]);

  const isFreeDelivery = useMemo(() => {
    return orderTotal >= 30 && deliveryMethod !== 'collection';
  }, [orderTotal, deliveryMethod]);

  return {
    postcode,
    setPostcode,
    deliveryMethod,
    setDeliveryMethod,
    instructions,
    setInstructions,
    deliveryCost,
    isFreeDelivery,
  };
}
