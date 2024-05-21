import { Request, Response } from 'express';
import { ProductRelatedServices } from './product.service';
import productValidationSchema from './product.validation';
import { ZodError } from 'zod';

const createAproduct = async (req: Request, res: Response) => {
  try {
    const { product
     } = req.body;

    //data validation using zod

    const zodParsedData = productValidationSchema.parse(product);

    // will call service func to send data
    const result = await ProductRelatedServices.createProductIntoDB(zodParsedData);

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
      // If other errors occur, send a 500 response
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
    const result = await ProductRelatedServices.getProductfromDB();

    //send as response

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const ProductController = {
  createAproduct,
  getProduct,
};
