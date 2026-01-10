import { NextRequest, NextResponse } from 'next/server';
import { submitOrder } from '@/lib/services/orders';
import { Order } from '@/lib/types/order';
import { orderSchema } from '@/lib/utils/validators';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validationResult = orderSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const orderData: Order = {
      ...body,
      createdAt: new Date(),
    };

    const result = await submitOrder(orderData);

    if (result.success) {
      return NextResponse.json(
        { 
          success: true, 
          orderId: result.orderId,
          message: 'Order submitted successfully' 
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: result.error || 'Failed to submit order' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error submitting order:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
