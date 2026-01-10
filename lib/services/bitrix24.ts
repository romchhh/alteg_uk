import { env } from '@/config/env';
import { Order, QuoteRequest } from '@/lib/types/order';
import { formatOrderDetails } from '@/lib/utils/formatters';

export interface Bitrix24Lead {
  TITLE: string;
  NAME: string;
  LAST_NAME?: string;
  COMPANY_TITLE?: string;
  EMAIL: Array<{ VALUE: string; VALUE_TYPE: string }>;
  PHONE: Array<{ VALUE: string; VALUE_TYPE: string }>;
  ADDRESS?: string;
  ADDRESS_CITY?: string;
  ADDRESS_POSTAL_CODE?: string;
  COMMENTS?: string;
  SOURCE_ID: string;
  SOURCE_DESCRIPTION?: string;
  ASSIGNED_BY_ID?: string;
  UF_CRM_PRODUCT_LIST?: string;
  UF_CRM_ORDER_WEIGHT?: string;
  UF_CRM_ORDER_TOTAL?: string;
}

export interface Bitrix24Response {
  result?: string | number;
  error?: string;
  error_description?: string;
}

export async function createLead(data: Bitrix24Lead): Promise<Bitrix24Response> {
  if (!env.BITRIX24_WEBHOOK_URL) {
    console.error('BITRIX24_WEBHOOK_URL is not configured');
    throw new Error('Bitrix24 webhook URL is not configured');
  }

  try {
    const response = await fetch(`${env.BITRIX24_WEBHOOK_URL}/crm.lead.add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fields: data,
      }),
    });

    if (!response.ok) {
      throw new Error(`Bitrix24 API error: ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating Bitrix24 lead:', error);
    throw error;
  }
}

export async function createOrderLead(order: Order): Promise<Bitrix24Response> {
  const leadData: Bitrix24Lead = {
    TITLE: `ALTEG UK Order - ${order.customer.name}`,
    NAME: order.customer.name,
    COMPANY_TITLE: order.customer.company,
    EMAIL: [{ VALUE: order.customer.email, VALUE_TYPE: 'WORK' }],
    PHONE: [{ VALUE: order.customer.phone, VALUE_TYPE: 'WORK' }],
    ADDRESS: order.customer.address?.street,
    ADDRESS_CITY: order.customer.address?.city,
    ADDRESS_POSTAL_CODE: order.customer.address?.postcode,
    COMMENTS: formatOrderDetails({
      cart: order.cart,
      customer: order.customer,
      total: order.total,
      totalWeight: order.totalWeight,
      notes: order.notes,
    }),
    SOURCE_ID: 'WEB',
    SOURCE_DESCRIPTION: 'Website Order',
    ASSIGNED_BY_ID: env.BITRIX24_USER_ID || undefined,
    UF_CRM_ORDER_WEIGHT: order.totalWeight.toFixed(2),
    UF_CRM_ORDER_TOTAL: order.total.toFixed(2),
    UF_CRM_PRODUCT_LIST: order.cart
      .map((item) => `${item.product.name} (${item.product.dimensions}) - ${item.length}m x ${item.quantity}`)
      .join('; '),
  };

  return createLead(leadData);
}

export async function createQuoteLead(quote: QuoteRequest): Promise<Bitrix24Response> {
  const leadData: Bitrix24Lead = {
    TITLE: `ALTEG UK Quote Request - ${quote.customer.name}`,
    NAME: quote.customer.name,
    COMPANY_TITLE: quote.customer.company,
    EMAIL: [{ VALUE: quote.customer.email, VALUE_TYPE: 'WORK' }],
    PHONE: [{ VALUE: quote.customer.phone, VALUE_TYPE: 'WORK' }],
    COMMENTS: `Quote Request - Wholesale: ${quote.isWholesale ? 'Yes' : 'No'}\nTotal Weight: ${quote.totalWeight.toFixed(2)}kg\n\nProducts:\n${quote.products.map((item) => `${item.product.name} (${item.product.dimensions}) - ${item.length}m x ${item.quantity}`).join('\n')}\n\n${quote.notes || ''}`,
    SOURCE_ID: 'WEB',
    SOURCE_DESCRIPTION: 'Website Quote Request',
    ASSIGNED_BY_ID: env.BITRIX24_USER_ID || undefined,
    UF_CRM_ORDER_WEIGHT: quote.totalWeight.toFixed(2),
  };

  if (quote.estimatedTotal) {
    leadData.UF_CRM_ORDER_TOTAL = quote.estimatedTotal.toFixed(2);
  }

  return createLead(leadData);
}
