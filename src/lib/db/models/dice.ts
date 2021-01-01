import { Schema } from 'mongoose';

export enum DieColor {
  Blue = 'blue',
  Red = 'red',
  Purple = 'purple',
  Yellow = 'yellow',
  Green = 'green',
  Orange = 'orange',
  Wild = 'wild'
}

export enum DieStatus {
  Used = 'used',
  Active = 'active',
  Unused = 'unused'
}

export interface Die {
  color: DieColor;
  status: DieStatus;
  value: number;
}

export const defaultDice = Object.values(DieColor).map((color) => ({
  color,
  status: DieStatus.Unused,
  value: 1   
}));

const dieSchema = new Schema({
  color: {
    type: String,
    required: true,
    enum: Object.values(DieColor),
    default: DieStatus.Unused,
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(DieStatus),
    default: DieStatus.Unused,
  },
  value: {
    type: Number,
    required: true,
    default: 1,
  },
});

export default dieSchema;