
import { Model } from 'mongoose';

export type Variant = {
  type: string;
  value: string;
};

export type Inventory = {
  quantity: number;
  inStock: boolean;
};

export type Product ={
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: Variant[];
  inventory: Inventory;
}


export type Order = {
  email: string;
  productId: string;
  price: number;
  quantity: number;
}

export interface ProductStaticModel extends Model<Product> {
  // eslint-disable-next-line no-unused-vars
  isProductExists(name: string): Promise<boolean>;
}

