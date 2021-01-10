import { RequestHandler } from 'express';
 
export default function promiseHandlerWrapper(handler: RequestHandler): RequestHandler {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  }
}
