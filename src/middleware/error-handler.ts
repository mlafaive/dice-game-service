import { ErrorRequestHandler } from 'express';
import { InternalServerError } from '../lib/errors/http-errors';
 
const errorMiddleware: ErrorRequestHandler = function (error, req, res, _next) {
  if (!error?.status) {
    error = new InternalServerError(error?.message ?? 'Unknown error');
  }
  res.status(error.status).send({ message: error.message });
}

export default errorMiddleware;