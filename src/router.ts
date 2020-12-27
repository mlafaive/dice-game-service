import express from 'express';
import healthcheck from './routes/healthcheck';

const router = express.Router();
 
router.use('/healthcheck', healthcheck);

export default router;