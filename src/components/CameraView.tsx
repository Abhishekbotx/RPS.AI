// src/components/CameraView.tsx
import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { HTML_SOURCE } from '../constants/config';
import { Gesture } from '../types';

interface CameraViewProps {
  countdown: number | string | null;
  isPlaying: boolean;
  lastDetectedGesture: Gesture | null;
  onMessage: (event: any) => void;
}

export const CameraView: React.FC<CameraViewProps> = ({
  countdown,
  isPlaying,
  lastDetectedGesture,
  onMessage,
}) => {
  const webViewRef = useRef<WebView>(null);
  const tips = [
  '✋ Show rock, paper, or scissors!',
  '📶 Please ensure you have good internet',
  '📷 Please clean your camera for better detection'
];

 const randomTip = tips[Math.floor(Math.random() * tips.length)];



  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={HTML_SOURCE}
        style={styles.webview}
        onMessage={onMessage}
        mediaPlaybackRequiresUserAction={false}
        allowsInlineMediaPlayback={true}
        javaScriptEnabled={true}
      />

      {countdown && (
        <View style={styles.countdownOverlay}>
          <Text style={styles.countdownText}>{countdown}</Text>
        </View>
      )}

      <View style={styles.detectionStatus}>
        <Text style={styles.detectionText}>
          {isPlaying
            ? `🔍 Detecting... ${lastDetectedGesture ? `(${lastDetectedGesture})` : ''}`
            : lastDetectedGesture
            ? `Last seen: ${lastDetectedGesture}`
            : '👋 Show your hand'}
        </Text>
      </View>

      <View style={styles.instructionsOverlay}>
        <Text style={styles.instructionText}>
          Tip: {isPlaying ? randomTip : '👆 Tap "Play" to start'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    position: 'relative',
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  countdownOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#fff',
  },
  detectionStatus: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 8,
  },
  detectionText: {
    color: '#4CAF50',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  instructionsOverlay: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 12,
    borderRadius: 10,
  },
  instructionText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
  },
});
