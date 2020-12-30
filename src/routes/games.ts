import express from 'express';
import { createGame, getGame, startGame, rollDice } from '../lib/services/games';

const router = express.Router();

// creating game
router.post('/', async (req, res, next) => {
  const { gameName, playerName } = req.body;
  try {
    const game = await createGame(gameName, playerName);
    return res.json(game);
  } catch (error) {
    return next(error);
  }
});

// get game info
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const game = await getGame(id);
    return res.json(game);
  } catch (error) {
    return next(error);
  }
});

// starting game
router.post('/:id/start', async (req, res, next) => {
  const { id } = req.params;
  try {
    const game = await startGame(id);
    return res.json(game);
  } catch (error) {
    return next(error);
  }
});

// roll dice for game
router.post('/:id/roll', async (req, res, next) => {
  const { id } = req.params;
  const { playerId } = req.body;
  try {
    const game = await rollDice(id, playerId);
    return res.json(game);
  } catch (error) {
    return next(error);
  }
});

export default router;