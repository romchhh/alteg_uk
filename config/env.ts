export const env = {
  BITRIX24_WEBHOOK_URL: process.env.NEXT_PUBLIC_BITRIX24_WEBHOOK_URL || '',
  BITRIX24_USER_ID: process.env.NEXT_PUBLIC_BITRIX24_USER_ID || '',
  NODE_ENV: process.env.NODE_ENV || 'development',
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
} as const;
