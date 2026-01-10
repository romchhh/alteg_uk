export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  isWholesale: boolean;
  address?: {
    street: string;
    city: string;
    postcode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
