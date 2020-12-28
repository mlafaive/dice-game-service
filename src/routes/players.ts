import express from 'express';

const router = express.Router();
 
// create new player in game
router.post('/', async (req, res) => {
  return res.json({text: 'create player'});
});

// update player map
router.patch('/:id/map', async (req, res) => {
  return res.json({text: `update player: ${req.params.id}`});
});

export default router;