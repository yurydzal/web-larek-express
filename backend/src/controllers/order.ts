import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

const createOrder = (req: Request, res: Response, next: NextFunction) => {
  const { total, items } = req.body;
  const orderId = faker.string.uuid();

  if (!Array.isArray(items) || items.length === 0) {
    return next(new BadRequestError('В заказе должен быть хотя бы один товар'));
  }

  return Product.find({ _id: { $in: items } })
    .then((products) => {
      if (products.length !== items.length) {
        return next(new BadRequestError('Один или несколько товаров не найдены'));
      }

      const availableProducts = products.filter((product) => product.price !== null);

      if (availableProducts.length !== items.length) {
        return next(new BadRequestError('Один или несколько товаров не доступны для заказа'));
      }

      const checkPrice = availableProducts.reduce((sum, product) => sum + (product.price || 0), 0);

      if (checkPrice !== total) {
        return next(new BadRequestError('Сумма заказа не соответствует сумме стоимости товаров'));
      }

      return res.status(201).json({ id: orderId, total: checkPrice });
    })
    .catch((err) => next(err));
};

export default createOrder;
