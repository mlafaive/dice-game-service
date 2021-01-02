import { Game, GameStatus } from '../db/models/game';
import { Player, PlayerMapNode } from '../db/models/player';
import { getGame, getDie } from './games';
import { NotFoundError, BadRequestError } from '../errors/http-errors'
import { MovesPerTurn } from '../db/models/constants';
import { Die, DieStatus, DieColor } from '../db/models/dice';
import { MapNode } from '../db/models/us-map';

export interface PlayerMove {
  mapNodeId: string;
  dieId: string;
  isXed: boolean;
  isGuarded: boolean;
  isColorChanged: boolean;
  isDuped: boolean;
  dupeMove?: PlayerMove;
}

export async function createPlayer(gameId: string, playerName: string): Promise<Game> {
  const game = await getGame(gameId);
  if (game.status !== GameStatus.New) {
    throw new BadRequestError(`players cannot be added when game status is "${game.status}"`);
  }

  game.players.push({ name: playerName } as Player);
  return game.save();
}

export function getPlayer(game: Game, playerId: string): Player {
  const player = game.players.find((player) => player.id === playerId);
  if (!player) {
    throw new NotFoundError(`player with id "${playerId}" not found`);
  }
  return player;
}

export async function updatePlayerMap(
  gameId: string, playerId: string, playerMoves: PlayerMove[]
): Promise<Game> {
  const game = await getGame(gameId);
  const player = getPlayer(game, playerId);

  if (playerMoves.length != MovesPerTurn){
    throw new BadRequestError(`player cannot make more than "${MovesPerTurn}" moves per turn`);
  }

  const [move1, move2] = playerMoves;
  const {playerMapNodes} = player;

  playerMoves.forEach((move) => {

    validateMove(move, player, game);
    playerMapNodes.push(...convertMoveToNode(move, game));

  });

  return game.save();
}

function validateMove(move: PlayerMove, player: Player, game: Game): void{
  
  validatePlayerPowers(move, player);  //Throws an error if the player tried to use a power they don't have

  const moveMapNode = getMapNodeById(move.mapNodeId);
  const die = getDie(move.dieId, game);
  //validate that this is one of the active dice
  if (die.status !== DieStatus.Active){ 
    throw new BadRequestError(`${die.color} is not an active die`);
  }
  validateMoveColor(die, moveMapNode, move);  //Throws an error if the colors don't match
  
  if (move.isXed && hasValidMove(die.color, die.value, player)){
    throw new BadRequestError(`${die.color} nodes have a valid move; player cannot X`);
  }

  if (move.isXed){
    return;  //Move is a valid X
  }


  /*
  FACTS: I know at this point that...
  - any powers used are valid
  - it's an active die
  - the move color is valid
  - it's not an X

  - it's either
  */




  //boolean isValidMove(nodeid, value for the die, player)
  //checks the neighbor rule
  if(!isValidValue(move.mapNodeId, die.value, player)){
    throw new BadRequestError('this move ');
  }

   /*
  FACTS: I know at this point that...
  - any powers used are valid
  - it's an active die
  - the move color is valid
  - it's not an X
  - it satisfies the neighboring state rule
  */

}

//validate that the die color matches the node and/or the user color changed it
function validateMoveColor(die: Die, moveMapNode: MapNode, move: PlayerMove): void{
  if (die.color !== moveMapNode.color && !move.isColorChanged && die.color !== DieColor.Wild){
    throw new BadRequestError(`die color ${die.color} does not match 
      selected node color ${moveMapNode.color}`);
  }
}

function validatePlayerPowers(move: PlayerMove, player: Player): void{
  if(move.isColorChanged && player.colorChangesRemaining === 0){
    throw new BadRequestError('player cannot use another color change');
  }
  if(move.isGuarded && player.guardsRemaining === 0){
    throw new BadRequestError('player cannot use another guard');
  }
  if(move.isDuped && player.dupesRemaining === 0){
    throw new BadRequestError('player cannot use another dupe');
  }
}

//returns array of nodes since the move could be a dupe move
function convertMoveToNode(move: PlayerMove, game: Game): PlayerMapNode[]{

  const die = getDie(move.dieId, game);
  const mapNode = {
    id: move.mapNodeId,
    value: die.value,
    isGuarded: move.isGuarded,
    isXed: move.isXed,
  };
  //TODO: finish this
  return [];
}
