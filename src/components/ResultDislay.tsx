// src/components/ResultDisplay.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Gesture, GameResult } from '../types';
import { EMOJI_MAP, RESULT_COLORS, RESULT_MESSAGES } from '../constants/config';

interface ResultDisplayProps {
  result: GameResult;
  userGesture: Gesture | null;
  computerMove: Gesture | null;
  scaleAnim: Animated.Value;
  onPlayAgain: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  result,
  userGesture,
  computerMove,
  scaleAnim,
  onPlayAgain,
}) => {
  const getEmoji = (gesture: Gesture | null) => 
    gesture ? EMOJI_MAP[gesture] || '❓' : '❓';

  return (
    <Animated.View
      style={[
        styles.container,
        { 
          transform: [{ scale: scaleAnim }],
          backgroundColor: RESULT_COLORS[result],
        },
      ]}
    >
      <View style={styles.movesContainer}>
        <View style={styles.moveBox}>
          <Text style={styles.moveLabel}>You</Text>
          <Text style={styles.moveEmoji}>{getEmoji(userGesture)}</Text>
        </View>
        <Text style={styles.vsText}>VS</Text>
        <View style={styles.moveBox}>
          <Text style={styles.moveLabel}>CPU</Text>
          <Text style={styles.moveEmoji}>{getEmoji(computerMove)}</Text>
        </View>
      </View>
      <Text style={styles.resultText}>{RESULT_MESSAGES[result]}</Text>

      <TouchableOpacity style={styles.playAgainButton} onPress={onPlayAgain}>
        <Text style={styles.playAgainText}>▶️ Play Again</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  movesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  moveBox: {
    alignItems: 'center',
  },
  moveLabel: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 5,
  },
  moveEmoji: {
    fontSize: 40,
  },
  vsText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  resultText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  playAgainButton: {
    marginTop: 15,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
  playAgainText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});