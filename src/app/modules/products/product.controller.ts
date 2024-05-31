import { Request, Response } from 'express';
import { ProductRelatedServices } from './product.service';
import productValidationSchema, {
  OrderValidationSchema,
} from './product.validation';
import { ZodError } from 'zod';

const createAproduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    const zodParsedData = productValidationSchema.parse(product);

    const result =
      await ProductRelatedServices.createProductIntoDB(zodParsedData);

    //send as response

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      // If Zod validation fails, send a 400 response with Zod error messages
      const formattedErrors = error.errors.map((err) => err.message);
      res.status(400).json({
        success: false,
        message: 'Validation failed:',
        errors: formattedErrors,
      });
    } else {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
      });
    }
  }
};

const getProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const searchTerm = req.query.searchTerm?.toString();
    const result = await ProductRelatedServices.getProductsFromDB(searchTerm);

    res.status(200).json({
      success: true,
      message: searchTerm
        ? `Products matching search term '${searchTerm}' fetched successfully!`
        : 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.errors.map((err) => err.message);
      res.status(400).json({
        success: false,
        message: 'Validation failed:',
        errors: formattedErrors,
      });
    } else {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
      });
    }
  }
};
const getSpecificProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductRelatedServices.findSpecificProduct(productId);

    //send as response

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.errors.map((err) => err.message);
      res.status(400).json({
        success: false,
        message: 'Validation failed:',
        errors: formattedErrors,
      });
    } else {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
      });
    }
  }
};
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;
    const { productId } = req.params;
    const result = await ProductRelatedServices.updateSpecificProduct(
      productId,
      product,
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }
    //send as response

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
      modifiedCount: result ? 1 : 0,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.errors.map((err) => err.message);
      res.status(400).json({
        success: false,
        message: 'Validation failed:',
        errors: formattedErrors,
      });
    } else {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
      });
    }
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result =
      await ProductRelatedServices.deleteSpecificProduct(productId);

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found or already deleted.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
};

//Order controllers

const makeAnOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const zodParsedData = OrderValidationSchema.parse(order);

    const product = await ProductRelatedServices.findSpecificProduct(
      order.productId,
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }

    if (product.inventory.quantity < order.quantity) {
      return res
        .status(400)
        .json({ success: false, message: 'Insufficient quantity available' });
    }

    product.inventory.quantity -= order.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;

    await ProductRelatedServices.updateSpecificProduct(product._id ?? '', {
      inventory: product.inventory,
    });

    const result =
      await ProductRelatedServices.makeAnOrderIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.errors.map((err) => err.message);
      res.status(400).json({
        success: false,
        message: 'Validation failed:',
        errors: formattedErrors,
      });
    } else {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal server error.',
      });
    }
  }
};

const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const email = req.query.email?.toString();
    const result = email
      ? await ProductRelatedServices.getOrdersFromDB(email)
      : await ProductRelatedServices.getOrdersFromDB();

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const ProductController = {
  createAproduct,
  getProduct,
  getSpecificProduct,
  updateProduct,
  deleteProduct,
  makeAnOrder,
  getAllOrders,
};
