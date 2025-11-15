// src/hooks/useGame.ts
import { useState, useRef } from 'react';
import { Animated } from 'react-native';
import { Gesture, GameResult, Score } from '../types';
import { GESTURES, GAME_CONFIG } from '../constants/config';

export const useGame = () => {
  const [userGesture, setUserGesture] = useState<Gesture | null>(null);
  const [computerMove, setComputerMove] = useState<Gesture | null>(null);
  const [result, setResult] = useState<GameResult | null>(null);
  const [score, setScore] = useState<Score>({ user: 0, computer: 0, draws: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdown, setCountdown] = useState<number | string | null>(null);

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const detectionTimeout = useRef<NodeJS.Timeout | null>(null);

  const calculateWinner = (user: Gesture, computer: Gesture): GameResult => {
    if (user === computer) return 'draw';
    if (
      (user === 'rock' && computer === 'scissors') ||
      (user === 'paper' && computer === 'rock') ||
      (user === 'scissors' && computer === 'paper')
    ) {
      return 'win';
    }
    return 'lose';
  };

  const handleGestureDetected = (gesture: Gesture) => {
    if (!isPlaying) return;

    if (detectionTimeout.current) {
      clearTimeout(detectionTimeout.current);
    }

    setUserGesture(gesture);

    const cpuMove = GESTURES[Math.floor(Math.random() * GESTURES.length)];
    setComputerMove(cpuMove);

    const gameResult = calculateWinner(gesture, cpuMove);
    setResult(gameResult);

    setScore(prev => ({
      user: prev.user + (gameResult === 'win' ? 1 : 0),
      computer: prev.computer + (gameResult === 'lose' ? 1 : 0),
      draws: prev.draws + (gameResult === 'draw' ? 1 : 0),
    }));

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    setIsPlaying(false);
  };

  const startGame = () => {
    setUserGesture(null);
    setComputerMove(null);
    setResult(null);

    let count = GAME_CONFIG.COUNTDOWN_START;
    setCountdown(count);

    const timer = setInterval(() => {
      count--;
      if (count === 0) {
        setCountdown('SHOOT!');
        setIsPlaying(true);

        detectionTimeout.current = setTimeout(() => {
          setIsPlaying(false);
          setCountdown(null);
        }, GAME_CONFIG.DETECTION_TIMEOUT);

        setTimeout(() => {
          setCountdown(null);
        }, 1000);
        clearInterval(timer);
      } else {
        setCountdown(count);
      }
    }, 1000);
  };

  const resetGame = () => {
    setScore({ user: 0, computer: 0, draws: 0 });
    setUserGesture(null);
    setComputerMove(null);
    setResult(null);
    setIsPlaying(false);
    if (detectionTimeout.current) {
      clearTimeout(detectionTimeout.current);
    }
  };

  return {
    userGesture,
    computerMove,
    result,
    score,
    isPlaying,
    countdown,
    scaleAnim,
    handleGestureDetected,
    startGame,
    resetGame,
  };
};