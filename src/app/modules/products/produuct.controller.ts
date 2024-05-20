import { ProductRelatedServices } from "./produuct.service";

const createAproduct = async (req: Request, res: Response) => {
    try {
      const { product: data } = req.body;
      // will call service func to send data
      const result = await ProductRelatedServices.createProductIntoDB(data);
  
      //send as response
  
      res.status(200).json({
        success: true,
        data: result,
        message: 'student created successfully',
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  const getProduct = async (req: Request, res: Response) => {
    try {
      const result = await ProductRelatedServices.getProductfromDB();
  
      //send as response
  
      res.status(200).json(result);
    } catch (err) {
      console.log(err);
    }
  };
  
  export const ProductController = {
    createAproduct,
    getProduct,
  };