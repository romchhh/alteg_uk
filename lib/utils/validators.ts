import { z } from 'zod';

export const customerInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  company: z.string().optional(),
  address: z
    .object({
      street: z.string().min(3, 'Street address is required'),
      city: z.string().min(2, 'City is required'),
      postcode: z.string().min(5, 'Postcode is required'),
      country: z.string().optional(),
    })
    .optional(),
});

export const quoteRequestSchema = z.object({
  customer: customerInfoSchema,
  notes: z.string().optional(),
  isWholesale: z.boolean().default(false),
});

export const orderSchema = z.object({
  customer: customerInfoSchema.extend({
    address: z.object({
      street: z.string().min(3, 'Street address is required'),
      city: z.string().min(2, 'City is required'),
      postcode: z.string().min(5, 'Postcode is required'),
      country: z.string().default('United Kingdom'),
    }),
  }),
  delivery: z.object({
    postcode: z.string().min(5, 'Postcode is required'),
    method: z.enum(['standard', 'express', 'collection']).default('standard'),
    instructions: z.string().optional(),
  }),
  notes: z.string().optional(),
});

export const wholesaleFormSchema = z.object({
  company: z.string().min(2, 'Company name is required'),
  contactName: z.string().min(2, 'Contact name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  annualVolume: z.string().optional(),
  productInterests: z.array(z.string()).optional(),
  message: z.string().optional(),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  interest: z.string().min(3, 'Please describe what interests you'),
});

export type CustomerInfoFormData = z.infer<typeof customerInfoSchema>;
export type QuoteRequestFormData = z.infer<typeof quoteRequestSchema>;
export type OrderFormData = z.infer<typeof orderSchema>;
export type WholesaleFormData = z.infer<typeof wholesaleFormSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;