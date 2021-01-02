import { USMapNodeId } from '../db/models/constants';
import { USMap, MapNode } from '../db/models/us-map';
import { DieColor } from '../db/models/constants';
import { Player, PlayerMapNode } from '../db/models/player';

export function getMapNodeById(nodeId: USMapNodeId): MapNode {
  return USMap[nodeId];
}

function getMapNodeIdsByColor(color: DieColor): USMapNodeId[] {
  const allNodeIds = Object.values(USMapNodeId);
  if (color === DieColor.Wild) {
    return allNodeIds;
  }

  return Object.values(USMapNodeId).filter(id => getMapNodeById(id).color === color);
}

function areValuesOneAway(value1: number, value2: number): boolean {
  return Math.abs(value1 - value2) <= 1;
}

export function isValidMapValue(nodeId: USMapNodeId, value: number, player: Player): boolean {
  const playerMap = player.playerMapNodes.reduce((map, node) => {
    map[node.id] = node;
    return map;
  }, {} as Record<USMapNodeId, PlayerMapNode | undefined>);
  
  if (playerMap[nodeId]) {
    return false;
  }

  const { neighbors } = getMapNodeById(nodeId);
  return neighbors.every((neighborNodeId) => {
    const playerNode = playerMap[neighborNodeId];
    return !playerNode || playerNode.isXed || playerNode.isGuarded || areValuesOneAway(value, playerNode.value);
  });
}

export function hasValidMapMove(color: DieColor, value: number, player: Player): boolean {
  const nodeIdsForColor = getMapNodeIdsByColor(color);
  return nodeIdsForColor.some((id) => isValidMapValue(id, value, player));
}
