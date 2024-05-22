import { Schema, model } from 'mongoose';
import { Order } from '../products/product.interface';

// Define the schema for orders
const orderSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export const OrderModel = model<Order>('Order', orderSchema);
