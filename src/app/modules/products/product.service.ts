import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async (product: Product)=>{
    const result= await ProductModel.create(product)
    return result;
 
 }
 const getProductfromDB = async ()=>{
     const result= await ProductModel.find()
     return result;
  
  }
 
 export const ProductRelatedServices={ createProductIntoDB, getProductfromDB }