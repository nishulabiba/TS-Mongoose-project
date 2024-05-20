import express from 'express'
import { ProductController } from './produuct.controller';

const router = express.Router()


//will calll controller

router.post("/create_student", ProductController.createAproduct)
router.get("/get_student", ProductController.getProduct)


export const ProductRoute= router;