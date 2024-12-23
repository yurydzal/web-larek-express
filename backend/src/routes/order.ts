import express from 'express';
import createOrder from '../controllers/order';
import { orderValidator } from '../middlewares/validators';

const router = express.Router();

router.post('/', orderValidator, createOrder);

export default router;
