import { Game, GameStatus } from '../db/models/game';
import { Player } from '../db/models/player';
import { getGame } from './games';
import { BadRequestError } from '../errors/http-errors';

export async function createPlayer(gameId: string, playerName: string): Promise<Game> {
  const game = await getGame(gameId);
  if (game.status !== GameStatus.New) {
    throw new BadRequestError(`players cannot be added when game status is "${game.status}"`);
  }

  game.players.push({ name: playerName } as Player);
  return game.save();
}

// export async function updatePlayerMap(
//   gameId: string, playerId: string, mapUpdates: MapUpdate[]
// ): Promise<Game> {
//   const game = await getGame(gameId);
//   const player = game.players.find((player) => player.id === playerId);

//   // logic for figuring out if the move is valid
//   // if move is valid, update player map 
//   // if not throw `BadRequestError`

//   return game.save();
// }
