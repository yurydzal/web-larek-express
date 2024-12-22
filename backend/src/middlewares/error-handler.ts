import { Request, Response, NextFunction } from 'express';

interface IError {
  statusCode: number;
  message: string;
}

const errorHandler = (
  err: IError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Internal Server Error' : message,
  });
};
export default errorHandler;
