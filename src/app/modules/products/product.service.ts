
import { Product } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDB = async (product: Product)=>{
    const result= await ProductModel.create(product)
    // if(await ProductModel.isProductExists({product._id})){
    //     throw new Error("product already exists")
    // }


    return result;
 
 }
 const getProductfromDB = async ()=>{
     const result= await ProductModel.find()
     return result;
  
  }
const findSpecificProduct = async (_id: string)=>{

    const result = await ProductModel.findOne({_id})
    return result
}
 export const ProductRelatedServices={ createProductIntoDB, getProductfromDB, findSpecificProduct }