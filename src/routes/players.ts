import express from 'express';

const router = express.Router();
 
// create new player in game
router.post('/', async (req, res) => {
  return res.json({text: 'create player'});
});

// get player info
router.get('/:id', async (req, res) => {
  return res.json({text: `get player: ${req.params.id}`});
});

// update player map
router.patch('/:id/map', async (req, res) => {
  return res.json({text: `update player: ${req.params.id}`});
});

export default router;