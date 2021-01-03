import express from 'express';
import { createPlayer, makePlayerMove } from '../lib/services/players';

const router = express.Router();
 
// create new player in game
router.post('/', async (req, res, next) => {
  const { gameId, playerName } = req.body;
  try {
    const game = await createPlayer(gameId, playerName);
    return res.json(game);
  } catch (error) {
    return next(error);
  }
});

// update player map
router.patch('/:id/map', async (req, res, next) => {
  const { gameId, playerId, playerMoves } = req.body;
  try {
    const game = await makePlayerMove(gameId, playerId, playerMoves);
    return res.json(game);
  } catch (error) {
    return next(error);
  }
});

export default router;
