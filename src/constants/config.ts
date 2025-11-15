// src/constants/config.ts
import { Platform } from 'react-native';
import { Gesture } from '../types';


export const GESTURES: Gesture[] = ['rock', 'paper', 'scissors'];

export const EMOJI_MAP: Record<Gesture, string> = {
  rock: '✊',
  paper: '✋',
  scissors: '✌️',
  unknown:'😵‍💫'
};

export const RESULT_COLORS = {
  win: '#4CAF50',
  lose: '#f44336',
  draw: '#FF9800',
};

export const RESULT_MESSAGES = {
  win: '🎉 You Win!',
  lose: '😢 You Lose!',
  draw: '🤝 Draw!',
};

export const GAME_CONFIG = {
  COUNTDOWN_START: 3,
  AUTO_CLEAR_DELAY: 3000,
  DETECTION_TIMEOUT: 5000,
};

export const HTML_SOURCE = Platform.select({
  android: { uri: 'file:///android_asset/hand.html' }
});