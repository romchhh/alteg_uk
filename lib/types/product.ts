export type ProductCategory =
  | 'angle'
  | 'plate'
  | 'channel'
  | 'i_beam'
  | 't_beam'
  | 'round_bar'
  | 't_profile'
  | 'z_profile'
  | 'tube_round'
  | 'square_bar'
  | 'sheet'
  | 'threshold'
  | 'tube_square'
  | 'tube_rectangular';

export interface ProductCategoryInfo {
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  specifications: string;
  specificationsEn: string;
  applications: string[];
  applicationsEn: string[];
  image: string;
}

export interface Product {
  id: string;
  category: ProductCategory;
  name: string;
  nameEn: string;
  dimensions: string; // e.g., "25x25x3"
  pricePerMeter?: number;
  pricePerKg?: number;
  weightPerMeter: number;
  standardLengths: number[]; // [1, 3, 6]
  image?: string;
  applications?: string[];
  inStock: boolean;
  description?: string;
  descriptionEn?: string;
  material?: string; // e.g., "6063-T5", "6082-T6"
  finish?: string; // e.g., "Mill finish", "Anodized"
}
