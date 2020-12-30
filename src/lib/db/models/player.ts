import mongoose, { Schema, Document } from 'mongoose';

export const DefaultRemainingPowers = 3;

export interface PlayerMapNode {
  id: string;
  value: number;
  isGuarded: boolean;
  isXed: boolean;
}

const PlayerNodeSchema = new Schema({
  id: { type: String, required: true },
  value: { type: Number, required: true, default: 0 },
  isGuarded: { type: Boolean, required: true, default: false },
  isXed: { type: Boolean, required: true, default: false },
});

export interface Player extends Document {
  name: string;
  dupesRemaining: number;
  colorChangesRemaining: number;
  guardsRemaining: number;
  nodes: PlayerMapNode[];
}
 
const playerSchema = new Schema({
  name: { type: String, required: true },
  nodes: { type: [PlayerNodeSchema], required: true },
  dupesRemaining: { type: Number, required: true, default: DefaultRemainingPowers},
  colorChangesRemaining: { type: Number, required: true, default: DefaultRemainingPowers},
  guardsRemaining: { type: Number, required: true, default: DefaultRemainingPowers}
});

export default playerSchema;