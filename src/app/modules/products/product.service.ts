import { Product } from './product.interface';
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
const updateSpecificProduct = async (id: string, updateData: Partial<Product>)=> {
  try {
    const result = await ProductModel.findByIdAndUpdate({ _id: id }, updateData)
      
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error updating product: ${error.message}`);
    } else {
      throw new Error('Unknown error occurred while updating product');
    }
  }
};

export const ProductRelatedServices = {
  createProductIntoDB,
  getProductsFromDB,
  findSpecificProduct,
  updateSpecificProduct
};
