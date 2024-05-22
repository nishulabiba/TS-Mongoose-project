import { Request, Response } from 'express';
import { ProductRelatedServices } from './product.service';
import productValidationSchema from './product.validation';
import { ZodError } from 'zod';

const createAproduct = async (req: Request, res: Response) => {
  try {
    const { product } = req.body;

    //data validation using zod

    const zodParsedData = productValidationSchema.parse(product);

    // will call service func to send data
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

const getProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductRelatedServices.getProductsFromDB()

    //send as response

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      // If Zod validation fails, it will send a 400 response with Zod error messages
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
    const result = await ProductRelatedServices.updateSpecificProduct(productId, product)

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
      modifiedCount: result ? 1 : 0
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
export const ProductController = {
  createAproduct,
  getProduct,
  getSpecificProduct,
  updateProduct
};
