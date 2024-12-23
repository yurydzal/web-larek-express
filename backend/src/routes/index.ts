import { Router } from 'express';

import orderRouter from './order';
import productRouter from './product';
import NotFoundError from '../errors/not-found-error';

const router = Router();

router.use('/order', orderRouter);
router.use('/product', productRouter);
router.use((_req, _res, next) => {
  next(new NotFoundError('Route not found'));
});

export default router;
