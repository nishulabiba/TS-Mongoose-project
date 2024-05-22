import { Schema, model } from 'mongoose';
import {
  Inventory,
  Product,
  ProductStaticModel,
  Variant,
} from './product.interface';

const variantSchema = new Schema<Variant>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const inventorySchema = new Schema<Inventory>({
  quantity: {
    type: Number,
    required: true,
    min: [0, 'Quantity cannot be negative'],
  },
  inStock: {
    type: Boolean,
    required: true,
  },
});

const productSchema = new Schema<Product, ProductStaticModel>({

  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name must be within 100 characters'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    trim: true,
    maxlength: [500, 'Product description must be within 500 characters'],
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be greater than 0'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
  },
  tags: {
    type: [String],
    required: true,
  },
  variants: {
    type: [variantSchema],
    required: true,
  },
  inventory: {
    type: inventorySchema,
    required: true,
  },
});




export const ProductModel = model<Product, ProductStaticModel>('Product', productSchema);

//productSchema.statics.isProductExists = async function(name: string) {
//   const existingProduct = await ProductModel.findOne({ name });
//   return existingProduct ;
// };
