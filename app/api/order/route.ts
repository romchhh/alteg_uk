import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/config/env';
import { submitOrder } from '@/lib/services/orders';
import { sendTelegramMessage } from '@/lib/services/telegram';
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
      const o = orderData;
      const adminOrderUrl = `${env.SITE_URL}/admin/orders/${result.orderId}`;
      const lines: string[] = [
        '<b>🛒 Новий замовлення</b>',
        `ID: <a href="${adminOrderUrl}">${result.orderId}</a>`,
        `👉 <a href="${adminOrderUrl}">Відкрити в адмін-панелі</a>`,
        '',
        '<b>Клієнт</b>',
        `Ім'я: ${o.customer.name}`,
        `Телефон: ${o.customer.phone}`,
        `Email: ${o.customer.email}`,
        o.customer.company ? `Компанія: ${o.customer.company}` : '',
        '',
        '<b>Доставка</b>',
        `Поштовий індекс: ${o.delivery.postcode}`,
        o.delivery.method ? `Спосіб: ${o.delivery.method}` : '',
        o.delivery.instructions ? `Інструкції: ${o.delivery.instructions}` : '',
        '',
        '<b>Товари</b>',
        ...o.cart.map((item) => {
          const spec = `${item.length}m × ${item.quantity} = ${(item.length * item.quantity).toFixed(2)}m`;
          const price = `£${item.calculatedPrice.toFixed(2)}`;
          const weight = `${item.calculatedWeight.toFixed(2)} kg`;
          return `• ${item.product.nameEn} (${item.product.dimensions}) — ${spec} — ${price} (${weight})`;
        }),
        '',
        `<b>Підсумок</b>`,
        `Підсумок: £${o.subtotal.toFixed(2)}`,
        `Доставка: £${o.deliveryCost.toFixed(2)}`,
        `Всього: £${o.total.toFixed(2)}`,
        `Вага: ${o.totalWeight.toFixed(2)} kg`,
        o.isWholesale ? 'Опт' : '',
        o.notes ? `Примітка: ${o.notes}` : '',
      ].filter(Boolean);
      sendTelegramMessage(lines.join('\n')).catch(() => {});

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
