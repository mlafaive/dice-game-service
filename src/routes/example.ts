import express from 'express';
import { createExample } from '../lib/services/example';

const router = express.Router();
 
router.post('/', async (req, res) => {
  const {name} = req.body;
  const example = await createExample(name);
  return res.json(example);
});

export default router;