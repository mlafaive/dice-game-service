import express from 'express';
import healthcheck from './routes/healthcheck';
import errorHandler from './middleware/error-handler';
import games from './routes/games';

const router = express.Router();
 
router.use('/healthcheck', healthcheck);
router.use('/games', games);
router.use(errorHandler);

export default router;