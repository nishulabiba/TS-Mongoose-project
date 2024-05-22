import { OrderModel } from '../orders/order.model';
import { Inventory, Order, Product } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (product: Product): Promise<Product> => {
  try {
    
    const result = await ProductModel.create(product);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error creating product: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred while creating product');
    }
  }
};

const getProductsFromDB = async (): Promise<Product[]> => {
  try {
    const result = await ProductModel.find();
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving products: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred while retrieving products');
    }
  }
};

const findSpecificProduct = async (id: string): Promise<Product | null> => {
  try {
    const result = await ProductModel.findOne({ _id: id });
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error finding product: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred while finding product');
    }
  }
};
const updateSpecificProduct = async (id: string, updateData: { inventory: Inventory }) => {
  try {
    const result = await ProductModel.findByIdAndUpdate(id, { $set: { inventory: updateData.inventory } });
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error updating product: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred while updating product');
    }
  }
};
const deleteSpecificProduct = async (id: string)=> {
  try {
    const result = await ProductModel.deleteOne({ _id: id })
      
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error deleting product: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred while deleting product');
    }
  }
};

const findProductBySearchTerm = async (searchTerm : string) => {
  try {
    const products = await ProductModel.find({
      $and: [
        { name: { $regex: searchTerm, $options: 'i' } },      
        { description: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },     
        { tags: { $in: [searchTerm] } },                         
      ],
    });
    return products;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error finding product: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred while finding product');
    }
  }
};

//creating services for orders

const makeAnOrderIntoDB = async (order: Order): Promise<Order> => {
  try {
    const result = await OrderModel.create(order);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error creating order: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred while creating order');
    }
  }

};
const getOrdersFromDB = async (email: string): Promise<Order[]> => {
  try {
    const result = await OrderModel.find({email});

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving Orders: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred while retrieving orders');
    }
  }
};
const getOrdersByUserEmail = async (email: string) => {
  try {
    const orders = await OrderModel.find({ email : email });
    return orders;
  } catch (error) {
    throw new Error('Error fetching orders by user email');
  }
};



export const ProductRelatedServices = {
  createProductIntoDB,
  getProductsFromDB,
  findSpecificProduct,
  updateSpecificProduct,
  deleteSpecificProduct,
  findProductBySearchTerm,
  makeAnOrderIntoDB,
  getOrdersFromDB,
  getOrdersByUserEmail
};
