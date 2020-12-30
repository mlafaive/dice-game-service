import { NextFunction, Request, Response } from 'express';
import HttpError, { InternalServerError } from '../lib/errors/http-errors';
 
export default function errorMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
  if (!(error instanceof HttpError)) {
    error = new InternalServerError(error.message ?? 'Unknown error');
  }
  return res.status(error.status).send({ message: error.message });
}