import express from 'express'
import { ProductController } from './product.controller';

const router = express.Router()


//will calll controller

router.post("/", ProductController.createAproduct)
router.get("/", ProductController.getProduct)


export const ProductRoute= router;