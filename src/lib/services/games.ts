import GameModel, { Game, GameStatus } from '../db/models/game';
import { Die, DieStatus } from '../db/models/dice';
import { NotFoundError, BadRequestError, AuthorizationError } from '../errors/http-errors';
import { getRandomInt } from './utils';
import { MaxDieValue } from '../db/models/constants';

export async function createGame(gameName: string, playerName: string): Promise<Game> {
  const newGame = new GameModel({ name: gameName, players: [{ name: playerName }] });
  return newGame.save();
}

export async function getGame(id: string): Promise<Game> {
  const game = await GameModel.findById(id);
  if (!game) {
    throw new NotFoundError(`game with id "${id}" not found`);
  }

  return game;
}

export async function startGame(id: string): Promise<Game> {
  const game = await getGame(id);
  if (game.status !== GameStatus.New) {
    throw new BadRequestError(`game cannot be started when it has status "${game.status}"`);
  }

  game.currentRoller = getRandomInt(0, game.players.length - 1);
  game.status = GameStatus.Rolling;
  return game.save();
}

function getTwoRandomUnusedDiceIndices(dice: Die[]): [number, number] {
  const unusedDiceIndices = dice.map((_, index) => index).filter(
    (index) => dice[index].status === DieStatus.Unused
  );
  const firstDieIndicesIndex = getRandomInt(0, unusedDiceIndices.length - 1);
  const firstDieIndex = unusedDiceIndices[firstDieIndicesIndex];

  unusedDiceIndices.splice(firstDieIndicesIndex, 1);
  const secondDieIndicesIndex = getRandomInt(0, unusedDiceIndices.length - 1);
  const secondDieIndex = unusedDiceIndices[secondDieIndicesIndex];

  return [firstDieIndex, secondDieIndex];
}

export async function rollDice(id: string, playerId: string): Promise<Game> {
  const game = await getGame(id);
  if (game.status !== GameStatus.Rolling) {
    throw new BadRequestError(`dice cannot be rolled when game has status "${game.status}"`);
  }

  const currentRoller = game.players[game.currentRoller];
  if (playerId !== currentRoller.id) {
    throw new AuthorizationError(`player "${playerId}" is not the current roller`);
  }

  const [firstDieIndex, secondDieIndex] = getTwoRandomUnusedDiceIndices(game.dice);  

  game.dice[firstDieIndex].status = DieStatus.Active;
  game.dice[firstDieIndex].value = getRandomInt(1, MaxDieValue);

  game.dice[secondDieIndex].status = DieStatus.Active;
  game.dice[secondDieIndex].value = getRandomInt(1, MaxDieValue);

  game.status = GameStatus.Moving;

  return game.save();
}

export function getDie(dieId: string, game: Game) : Die {
  const die = game.dice.find((die) => die.id === dieId);
  if (!die){
    throw new NotFoundError(`unable to find die with id "${dieId}"`)
  }
  return die;
}