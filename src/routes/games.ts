import express from 'express';
import { createGame, getGame, startGame, rollDice } from '../lib/services/games';
import { createPlayer, makePlayerMove } from '../lib/services/players';
import promiseHandlerWrapper from '../middleware/promise-reject-handler';
import playerAuthentication from '../middleware/player-authentication';

const router = express.Router();

// creating game
router.post('/', promiseHandlerWrapper(async (req, res) => {
  const { gameName, playerName } = req.body;
  const game = await createGame(gameName, playerName);
  return res.json(game);
}));

// get game info
router.get('/:gameId', promiseHandlerWrapper(async (req, res) => {
  const { gameId } = req.params;
  const game = await getGame(gameId);
  return res.json(game);
}));

// starting game
router.post('/:gameId/start', playerAuthentication, promiseHandlerWrapper(async (req, res) => {
  const { gameId } = req.params;
  const { playerId } = res.locals;
  const game = await startGame(gameId, playerId);
  return res.json(game);
}));

// roll dice for game
router.post('/:gameId/roll', playerAuthentication, promiseHandlerWrapper(async (req, res) => {
  const { gameId } = req.params;
  const { playerId } = res.locals;
  const game = await rollDice(gameId, playerId);
  return res.json(game);
}));
 
// create new player in game
router.post('/:gameId/players', promiseHandlerWrapper(async (req, res) => {
  const { gameId } = req.params;
  const { playerName } = req.body;
  const game = await createPlayer(gameId, playerName);
  return res.json(game);
}));

// make player move
router.patch('/:gameId/move', playerAuthentication, promiseHandlerWrapper(async (req, res) => {
  const { gameId } = req.params;
  const { playerId } = res.locals;
  const { playerMoves } = req.body;
  const game = await makePlayerMove(gameId, playerId, playerMoves);
  return res.json(game);
}));

export default router;