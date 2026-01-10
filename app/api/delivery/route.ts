import { NextRequest, NextResponse } from 'next/server';
import { calculateDeliveryCost } from '@/lib/constants/delivery';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postcode, orderTotal, deliveryMethod = 'standard' } = body;

    if (!postcode || typeof orderTotal !== 'number') {
      return NextResponse.json(
        { error: 'Postcode and orderTotal are required' },
        { status: 400 }
      );
    }

    const cost = calculateDeliveryCost(postcode, orderTotal, deliveryMethod);
    const isFreeDelivery = orderTotal >= 30 && deliveryMethod !== 'collection';

    return NextResponse.json({
      cost,
      isFreeDelivery,
      message: isFreeDelivery && deliveryMethod !== 'collection' 
        ? 'Free delivery' 
        : `Delivery: £${cost.toFixed(2)}`,
    }, { status: 200 });
  } catch (error) {
    console.error('Error calculating delivery:', error);
    return NextResponse.json(
      { error: 'Failed to calculate delivery cost' },
      { status: 500 }
    );
  }
}
