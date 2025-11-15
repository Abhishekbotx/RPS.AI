// src/hooks/useGestureDetection.ts
import { useState } from 'react';
import { Gesture } from '../types';

export const useGestureDetection = (
  isPlaying: boolean,
  onGestureDetected: (gesture: Gesture) => void
) => {
  const [lastDetectedGesture, setLastDetectedGesture] = useState<Gesture | null>(null);

  const handleWebViewMessage = (event: any) => {
    const gesture = event.nativeEvent.data as Gesture;
    setLastDetectedGesture(gesture);

    if (isPlaying && gesture !== 'unknown') {
      onGestureDetected(gesture);
    }
  };

  return {
    lastDetectedGesture,
    handleWebViewMessage,
  };
};