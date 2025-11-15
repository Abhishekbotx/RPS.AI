// src/types/index.ts
export type Gesture = 'rock' | 'paper' | 'scissors' | 'unknown';

export type GameResult = 'win' | 'lose' | 'draw';

export interface Score {
  user: number;
  computer: number;
  draws: number;
}

export interface GameState {
  userGesture: Gesture | null;
  computerMove: Gesture | null;
  result: GameResult | null;
  score: Score;
  isPlaying: boolean;
  countdown: number | string | null;
  lastDetectedGesture: Gesture | null;
}