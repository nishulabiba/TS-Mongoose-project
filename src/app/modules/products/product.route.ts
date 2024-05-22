import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();

//will calll controller

router.post('/', ProductController.createAproduct);
router.get('/', ProductController.getProduct);
router.get('/:productId', ProductController.getSpecificProduct);
router.put('/:productId', ProductController.updateProduct);
router.delete('/:productId', ProductController.deleteProduct);
router.get('/', ProductController.searchProducts);

export const ProductRoute = router;
