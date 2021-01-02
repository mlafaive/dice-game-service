import { Schema, Document } from 'mongoose';
import { RollsPerRound, PowersPerGame, USMapNodeId } from './constants';

export interface PlayerMapNode {
  id: USMapNodeId;
  value: number;
  isGuarded: boolean;
  isXed: boolean;
}

const PlayerNodeSchema = new Schema({
  id: { type: String, required: true, enum: Object.values(USMapNodeId) },
  value: { type: Number, required: true, default: 0 },
  isGuarded: { type: Boolean, required: true, default: false },
  isXed: { type: Boolean, required: true, default: false },
});

export interface Player extends Document {
  name: string;
  dupesRemaining: number;
  colorChangesRemaining: number;
  guardsRemaining: number;
  playerMapNodes: PlayerMapNode[];
  movesRemaining: number;
}
 
const playerSchema = new Schema({
  name: { type: String, required: true },
  playerMapNodes: { type: [PlayerNodeSchema], required: true },
  dupesRemaining: { type: Number, required: true, default: PowersPerGame},
  colorChangesRemaining: { type: Number, required: true, default: PowersPerGame},
  guardsRemaining: { type: Number, required: true, default: PowersPerGame},
  movesRemaining: { type: Number, required: true, default: RollsPerRound}
});

export default playerSchema;