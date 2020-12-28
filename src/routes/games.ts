import express from 'express';

const router = express.Router();

// creating game
router.post('/', async (req, res) => {
  return res.json({text: 'create game'});
});

// get game info
router.get('/:id', async (req, res) => {
  return res.json({text: `get game info: ${req.params.id}`});
});

// starting game
router.post('/:id/start', async (req, res) => {
  return res.json({text: `start game: ${req.params.id}`});
});

// roll dice for game
router.post('/:id/roll', async (req, res) => {
  return res.json({text: `rolling dice for game: ${req.params.id}`});
});

export default router;