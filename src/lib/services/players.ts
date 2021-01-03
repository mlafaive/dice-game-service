import { Game, GameStatus } from '../db/models/game';
import { Player, PlayerMapNode } from '../db/models/player';
import { getGame, getDie } from './games';
import { NotFoundError, BadRequestError } from '../errors/http-errors'
import { MovesPerTurn, DieColor, USMapNodeId, RoundsPerGame, RollsPerRound } from '../db/models/constants';
import { Die, DieStatus } from '../db/models/dice';
import { MapNode } from '../db/models/us-map';
import { getMapNodeById, isValidMapValue, hasValidMapMove } from './us-map';

export interface PlayerMove {
  mapNodeId: USMapNodeId;
  dieId: string;
  isXed: boolean;
  isGuarded: boolean;
  isColorChanged: boolean;
  isDuped: boolean;
  dupeMoveNodeId?: USMapNodeId;
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

// TODO: handle when move cannot be made for color
// TODO: check that player hasn't already gone this turn
// TODO: validate that if isDuped is true that a dupedMoveNodeId is passed
export async function makePlayerMove(
  gameId: string, playerId: string, playerMoves: PlayerMove[]
): Promise<Game> {
  const game = await getGame(gameId);
  const player = getPlayer(game, playerId);

  if (playerMoves.length !== MovesPerTurn){
    throw new BadRequestError(`player must make than "${MovesPerTurn}" moves per turn`);
  }

  const usedDice = new Set<string>();

  //validate the player's moves and update the player
  playerMoves.forEach((move) => {
    validateMove(move, player, game, usedDice);
    usedDice.add(move.dieId);
    player.playerMapNodes.push(...convertMoveToNode(move, game));

    //update player's remaining powers if they used one on this move
    if (move.isGuarded) player.guardsRemaining--;
    if (move.isColorChanged) player.colorChangesRemaining--;
    if (move.isDuped) player.dupesRemaining--;
  });
  player.hasCompletedMove = true;

  //if all players have not made their move yet, don't change the game state
  if (!game.players.every((player) => player.hasCompletedMove)) {
    return game.save();
  }

  game.players.forEach((player) => {  //reset each player's move boolean
    player.hasCompletedMove = false;
  });
  game.status = GameStatus.Rolling;  //update game status to rolling

  //if there are rolls left in the round, move to the next roll
  if (game.rollsRemainingInRound > 0){
    game.dice.forEach((die) => {  //mark active dice as used
      if (die.status === DieStatus.Active) die.status = DieStatus.Used;
    });
    return game.save();
  }

  //at this point we know there are 0 rolls left in the current round
  //if this is the last round, end the game
  if (game.round === RoundsPerGame){
    game.status = GameStatus.Complete;
    return game.save();
  }

  //if we get here, it means we need to move to the next round
  game.dice.forEach((die) => {  //reset dice as unused for the new round
    die.status = DieStatus.Unused;
  });
  game.rollsRemainingInRound = RollsPerRound;
  game.round++;
  return game.save();
}


function validateMove(move: PlayerMove, player: Player, game: Game, usedDice: Set<string>): void{
  
  validatePlayerPowers(move, player);  //Throws an error if the player tried to use a power they don't have

  const moveMapNode = getMapNodeById(move.mapNodeId);
  const die = getDie(move.dieId, game);
  //validate that this is one of the active dice
  if (die.status !== DieStatus.Active){ 
    throw new BadRequestError(`${die.color} is not an active die`);
  }
  if (usedDice.has(move.dieId)){
    throw new BadRequestError('cannot use the same die twice');
  }

  validateMoveColor(die, moveMapNode, move);  //Throws an error if the colors don't match
  
  if (move.isXed && hasValidMapMove(die.color, die.value, player)){
    throw new BadRequestError(`${die.color} nodes have a valid move; player cannot X`);
  }

  if (move.isXed){
    return;  //Move is a valid X
  }

  if (!move.isGuarded && !isValidMapValue(move.mapNodeId, die.value, player)){
    throw new BadRequestError('this move breaks the neighboring state rule')
  }

  if (!move.isDuped){
    return; 
  }

  //at this point we know it's a duped move; need to check that the dupe node is valid
  if (move.mapNodeId === move.dupeMoveNodeId){
    throw new BadRequestError('cannot make a dupe move to the same node');
  }

  const dupeMove = {
    mapNodeId: move.dupeMoveNodeId as USMapNodeId,
    dieId: move.dieId,
    isXed: move.isXed,
    isGuarded: false,
    isColorChanged: move.isColorChanged,
    isDuped: false,
  };

  validateMove(dupeMove, player, game, usedDice);
}

//validate that the die color matches the node and/or the user color changed it
function validateMoveColor(die: Die, moveMapNode: MapNode, move: PlayerMove): void {
  if (die.color !== moveMapNode.color && !move.isColorChanged && die.color !== DieColor.Wild){
    throw new BadRequestError(`die color ${die.color} does not match selected node color ${moveMapNode.color}`);
  }
}

function validatePlayerPowers(move: PlayerMove, player: Player): void {
  if(move.isColorChanged && player.colorChangesRemaining <= 0){
    throw new BadRequestError('player cannot use another color change');
  }
  if(move.isGuarded && player.guardsRemaining <= 0){
    throw new BadRequestError('player cannot use another guard');
  }
  if(move.isDuped && player.dupesRemaining <= 0){
    throw new BadRequestError('player cannot use another dupe');
  }
}

//returns array of nodes since the move could be a dupe move
//prereq: the move is valid
function convertMoveToNode(move: PlayerMove, game: Game): PlayerMapNode[] {
  const die = getDie(move.dieId, game);
  const nodeArray = [{
    id: move.mapNodeId,
    value: die.value,
    isGuarded: move.isGuarded,
    isXed: move.isXed,
  }];

  if(move.isDuped){
    //push the node for the dupe move
    nodeArray.push({
      id: move.dupeMoveNodeId as USMapNodeId,
      value: die.value,
      isGuarded: false,
      isXed: false,
    });
  }
  return nodeArray;
}
