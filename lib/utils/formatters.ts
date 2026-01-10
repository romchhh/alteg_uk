export function formatDate(date: Date | string, format: 'short' | 'long' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'long') {
    return new Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  }
  
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d);
}

export function formatPhoneNumber(phone: string): string {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Format UK phone numbers
  if (digits.startsWith('44')) {
    return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
  }
  
  if (digits.length === 11 && digits.startsWith('0')) {
    return `${digits.slice(0, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
  }
  
  return phone;
}

export function formatCurrency(amount: number, currency: string = 'GBP'): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

export function formatWeight(weight: number, unit: 'kg' | 'g' = 'kg'): string {
  if (unit === 'g') {
    return `${weight.toFixed(0)}g`;
  }
  return `${weight.toFixed(2)}kg`;
}

export function formatOrderDetails(order: {
  cart: Array<{
    product: { name: string; dimensions: string };
    length: number;
    quantity: number;
  }>;
  customer: { name: string; email: string; phone: string; company?: string };
  total: number;
  totalWeight: number;
  notes?: string;
}): string {
  const lines: string[] = [];
  
  lines.push(`Order Details:`);
  lines.push(`Customer: ${order.customer.name}`);
  if (order.customer.company) {
    lines.push(`Company: ${order.customer.company}`);
  }
  lines.push(`Email: ${order.customer.email}`);
  lines.push(`Phone: ${order.customer.phone}`);
  lines.push(``);
  lines.push(`Products:`);
  
  order.cart.forEach((item, index) => {
    lines.push(`${index + 1}. ${item.product.name} (${item.product.dimensions})`);
    lines.push(`   Length: ${item.length}m x Quantity: ${item.quantity}`);
  });
  
  lines.push(``);
  lines.push(`Total Weight: ${order.totalWeight.toFixed(2)}kg`);
  lines.push(`Total Amount: £${order.total.toFixed(2)}`);
  
  if (order.notes) {
    lines.push(``);
    lines.push(`Notes: ${order.notes}`);
  }
  
  return lines.join('\n');
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
