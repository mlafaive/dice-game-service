import express from 'express';
import healthcheck from './routes/healthcheck';
import example from './routes/example';

const router = express.Router();
 
router.use('/healthcheck', healthcheck);
router.use('/examples', example);

export default router;