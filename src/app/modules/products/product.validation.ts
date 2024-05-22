import { z } from 'zod';

const variantValidationSchema = z.object({
  type: z.string().min(1, 'Variant type is required.'),
  value: z.string().min(1, 'Variant value is required.'),
});

const inventoryValidationSchema = z.object({
  quantity: z.number().int().min(0, 'Quantity must be 0 or greater.'),
  inStock: z.boolean(),
});

const productValidationSchema = z.object({
  name: z
    .string()
    .trim()
    .max(100, 'Product name must be within 100 characters.')
    .min(1, 'Product name is required.'),
  description: z
    .string()
    .trim()
    .max(500, 'Product description must be within 500 characters.')
    .min(1, 'Product description is required.'),
  price: z.number().positive('Price must be greater than 0.'),
  category: z.string().min(1, 'Category is required.'),
  tags: z
    .array(z.string().min(1, 'Each tag must be at least 1 character long.'))
    .min(1, 'At least one tag is required.'),
  variants: z
    .array(variantValidationSchema)
    .min(1, 'At least one variant is required.'),
  inventory: inventoryValidationSchema,
});
export const OrderValidationSchema = z.object({
  email: z.string().email().min(1, { message: 'Email is required' }).max(255, { message: 'Email must be at most 255 characters' }),
  productId: z.string().min(1, { message: 'Product ID is required' }).max(255, { message: 'Product ID must be at most 255 characters' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  quantity: z.number().int().positive({ message: 'Quantity must be a positive integer' }),
});

export default productValidationSchema;
