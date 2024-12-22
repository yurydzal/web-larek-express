import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import ConflictError from '../errors/conflict-error';

export const getProducts = (_req: Request, res: Response, next: NextFunction) => {
  Product.find()
    .then((products) => res.send({ items: products, total: products.length }))
    .catch((err) => next(err));
};

export const createProduct = (req: Request, res: Response, next: NextFunction) => {
  const {
    title, image, category, description, price,
  } = req.body;

  return Product.create({
    title, image, category, description, price,
  })
    .then((product) => res.status(201).send(product))
    .catch((err) => {
      if (err instanceof Error && err.message.includes('E11000')) {
        return next(
          new ConflictError('Товар с таким именем уже существует'),
        );
      }
      return next(err);
    });
};
