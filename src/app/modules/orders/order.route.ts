import express from 'express';
import { ProductController } from '../products/product.controller';

const router = express.Router();

//will calll controller

router.post('/', ProductController.makeAnOrder);
router.get('/', ProductController.getAllOrders);
router.get('/', ProductController.getOrdersByUserEmailController);
export const OrderRoute = router;
