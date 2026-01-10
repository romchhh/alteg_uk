import { Product } from './product';

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  company?: string;
  address?: {
    street: string;
    city: string;
    postcode: string;
    country?: string;
  };
}

export interface DeliveryInfo {
  postcode: string;
  method?: 'standard' | 'express' | 'collection';
  instructions?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  length: number;
  quantity: number;
  freeCutting: boolean;
  additionalProcessing?: string;
  calculatedPrice: number;
  calculatedWeight: number;
}

export interface Order {
  id?: string;
  cart: CartItem[];
  customer: CustomerInfo;
  delivery: DeliveryInfo;
  subtotal: number;
  deliveryCost: number;
  total: number;
  totalWeight: number;
  isWholesale: boolean;
  discount?: number;
  notes?: string;
  createdAt?: Date;
}

export interface QuoteRequest {
  id?: string;
  products: CartItem[];
  customer: CustomerInfo;
  totalWeight: number;
  isWholesale: boolean;
  estimatedTotal?: number;
  notes?: string;
  createdAt?: Date;
}
