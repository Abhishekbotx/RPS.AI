import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Header: React.FC = () => (
  <View style={styles.header}>
    <Text style={styles.title}>Rock Paper Scissors</Text>
    <Text style={styles.subtitle}> AI Hand Detection</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    paddingTop: 5,
    paddingBottom: 15,
    alignItems: 'center',
    backgroundColor: '#16213e',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#4CAF50',
  },
});