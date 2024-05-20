import { Request, Response } from "express";
import { ProductRelatedServices } from "./product.service";

const createAproduct = async (req: Request, res: Response) => {
    try {
      const { product} = req.body;
      // will call service func to send data
      const result = await ProductRelatedServices.createProductIntoDB(product);
  
      //send as response
  
      res.status(200).json({
        success: true,
        message: "Product created successfully!",
        data: result,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  const getProduct = async (req: Request, res: Response) => {
    try {
      const result = await ProductRelatedServices.getProductfromDB();
  
      //send as response
  
      res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
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