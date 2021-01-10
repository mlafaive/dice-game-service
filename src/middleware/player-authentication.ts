import { RequestHandler } from 'express';
import { AuthenticationError } from '../lib/errors/http-errors';
 
const playerAuthentication: RequestHandler = function (req, res, next) {
  const { playerId } = req.cookies;
  if (!playerId) {
    throw new AuthenticationError('failed to authenticate player');
  }

  res.locals.playerId = playerId;
  next();
}

export default playerAuthentication;