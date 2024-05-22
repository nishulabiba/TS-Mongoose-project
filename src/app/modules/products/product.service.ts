import { OrderModel } from '../orders/order.model';
import { Inventory, Order, Product } from './product.interface';
import { ProductModel } from './product.model';

const createProductIntoDB = async (product: Product): Promise<Product> => {
  try {
    // if (await ProductModel.isProductExists(product.name)) {
    //   throw new Error('Product already exists!');
    // }
    // console.log(await ProductModel.isProductExists);
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

const getProductsFromDB = async (searchTerm?: string): Promise<Product[]> => {
  try {
    if (searchTerm) {
      const regex = new RegExp(searchTerm, 'i');
      return await ProductModel.find({
        $or: [{ name: regex }, { description: regex }],
      });
    } else {
      return await ProductModel.find();
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving Orders: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred while retrieving orders');
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
const updateSpecificProduct = async (
  id: string | null,
  updateData: { inventory: Inventory },
) => {
  try {
    const result = await ProductModel.findByIdAndUpdate(id, {
      $set: { inventory: updateData.inventory },
    });
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error updating product: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred while updating product');
    }
  }
};
const deleteSpecificProduct = async (id: string) => {
  try {
    const result = await ProductModel.deleteOne({ _id: id });

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error deleting product: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred while deleting product');
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
const getOrdersFromDB = async (email?: string): Promise<Order[]> => {
  try {
    const query = email ? { email } : {};
    const result = await OrderModel.find(query);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error retrieving Orders: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred while retrieving orders');
    }
  }
};

export const ProductRelatedServices = {
  createProductIntoDB,
  getProductsFromDB,
  findSpecificProduct,
  updateSpecificProduct,
  deleteSpecificProduct,

  makeAnOrderIntoDB,
  getOrdersFromDB,
};
