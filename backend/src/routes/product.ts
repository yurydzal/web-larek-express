import express from 'express';
import { getProducts, createProduct } from '../controllers/products';
import { productValidator } from '../middlewares/validators';

const router = express.Router();

router.get('/', getProducts);
router.post('/', productValidator, createProduct);

export default router;
