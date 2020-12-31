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

// export async function updatePlayerMap(id: string, ): Promise<Player> {}
