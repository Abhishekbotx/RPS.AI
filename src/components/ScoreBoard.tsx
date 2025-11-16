// src/components/ScoreBoard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Score } from '../types';

interface ScoreBoardProps {
  score: Score;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => (
  <View style={styles.scoreBoard}>
    <View style={styles.scoreItem}>
      <Text style={styles.scoreLabel}>You</Text>
      <Text style={styles.scoreValue}>{score.user}</Text>
    </View>
    <View style={styles.scoreItem}>
      <Text style={styles.scoreLabel}>Draws</Text>
      <Text style={styles.scoreValue}>{score.draws}</Text>
    </View>
    <View style={styles.scoreItem}>
      <Text style={styles.scoreLabel}>CPU</Text>
      <Text style={styles.scoreValue}>{score.computer}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  scoreBoard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#16213e',
    marginHorizontal: 20,
    borderRadius: 15,
  },
  scoreItem: {
    alignItems: 'center',
  },
  scoreLabel: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 2,
  },
  scoreValue: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});