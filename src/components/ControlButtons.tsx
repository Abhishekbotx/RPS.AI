import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Gamepad, RefreshCw } from "lucide-react-native";

interface ControlButtonsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onReset: () => void;
}

export const ControlButtons: React.FC<ControlButtonsProps> = ({
  isPlaying,
  onPlay,
  onReset,
}) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={[styles.button, styles.playButton]}
      onPress={onPlay}
      disabled={isPlaying}
    >
      {isPlaying ? (
        <Text style={styles.buttonText}>Playing...</Text>
      ) : (
        <View style={styles.iconWrap}>
          <Gamepad size={22} color="#fff" strokeWidth={2.2} />
          <Text style={styles.buttonText}> Play</Text>
        </View>
      )}
    </TouchableOpacity>

    <TouchableOpacity
      style={[styles.button, styles.resetButton]}
      onPress={onReset}
    >
      <View style={styles.iconWrap}>
        <RefreshCw size={22} color="#fff" strokeWidth={2.2} />
        <Text style={styles.buttonText}> Reset</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    columnGap: 10,
    marginTop: 15,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  iconWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#4CAF50',
  },
  resetButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
