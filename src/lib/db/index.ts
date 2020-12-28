import mongoose from 'mongoose';
import { getEnvVar } from '../environment';

export function initializeDb(): void {
  mongoose.connect(getEnvVar('DICE_GAME_MONGO_URI'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}