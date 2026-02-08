import { NextRequest, NextResponse } from 'next/server';
import { submitQuoteRequest } from '@/lib/services/orders';
import { sendTelegramMessage } from '@/lib/services/telegram';
import { QuoteRequest } from '@/lib/types/order';
import { quoteRequestSchema } from '@/lib/utils/validators';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validationResult = quoteRequestSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid request data', details: validationResult.error.errors },
        { status: 400 }
      );
    }

    const quoteData: QuoteRequest = {
      ...body,
      createdAt: new Date(),
    };

    const result = await submitQuoteRequest(quoteData);

    if (result.success) {
      const q = quoteData;
      const lines = [
        '<b>📋 Запит на розрахунок (quote)</b>',
        `Клієнт: ${q.customer.name}`,
        `Телефон: ${q.customer.phone}`,
        `Email: ${q.customer.email}`,
        `Вага: ${q.totalWeight} kg`,
        q.estimatedTotal != null ? `Орієнтовна сума: £${q.estimatedTotal.toFixed(2)}` : '',
        q.notes ? `Примітка: ${q.notes}` : '',
      ].filter(Boolean);
      sendTelegramMessage(lines.join('\n')).catch(() => {});

      return NextResponse.json(
        { 
          success: true, 
          quoteId: result.quoteId,
          message: 'Quote request submitted successfully' 
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: result.error || 'Failed to submit quote request' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error submitting quote request:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
