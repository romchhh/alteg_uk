import { Order, QuoteRequest } from '@/lib/types/order';
import { createOrderLead, createQuoteLead } from './bitrix24';
import { saveOrder } from '@/lib/data/orders';

export async function submitOrder(order: Order): Promise<{ success: boolean; orderId?: string; error?: string }> {
  try {
    const orderId = saveOrder(order);

    try {
      const response = await createOrderLead(order);
      if (response.error) {
        console.error('Bitrix24 order lead failed:', response.error_description || response.error);
      }
    } catch (bitrixError) {
      console.error('Bitrix24 order lead error:', bitrixError);
    }

    return {
      success: true,
      orderId,
    };
  } catch (error) {
    console.error('Error submitting order:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}

export async function submitQuoteRequest(quote: QuoteRequest): Promise<{ success: boolean; quoteId?: string; error?: string }> {
  try {
    // Create lead in Bitrix24
    const response = await createQuoteLead(quote);
    
    if (response.error) {
      return {
        success: false,
        error: response.error_description || response.error || 'Failed to submit quote request',
      };
    }
    
    return {
      success: true,
      quoteId: response.result?.toString(),
    };
  } catch (error) {
    console.error('Error submitting quote request:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
    };
  }
}
