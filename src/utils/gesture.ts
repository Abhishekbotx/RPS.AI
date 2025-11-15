// utils/gesture.ts
export type Gesture = 'rock' | 'paper' | 'scissors' | 'unknown';

interface Landmark {
  x: number;
  y: number;
  z: number;
}

/**
 * Count extended fingers from landmarks
 */
export function getExtendedFingers(landmarks: Landmark[]): number {
  if (!landmarks || landmarks.length < 21) return -1;

  const fingerIndices = {
    thumb: [1, 2, 3, 4],
    index: [5, 6, 7, 8],
    middle: [9, 10, 11, 12],
    ring: [13, 14, 15, 16],
    pinky: [17, 18, 19, 20],
  };

  let extended = 0;

  const wristY = landmarks[0].y;

  // For non-thumb fingers
  (['index', 'middle', 'ring', 'pinky'] as const).forEach((name) => {
    const inds = fingerIndices[name];
    const tip = landmarks[inds[3]];
    const pip = landmarks[inds[1]];
    if (pip && tip && tip.y < pip.y - 0.02) {
      extended += 1;
    }
  });

  // Thumb detection (simplified)
  const thumbTip = landmarks[fingerIndices.thumb[3]];
  const thumbIp = landmarks[fingerIndices.thumb[2]];
  if (thumbTip && thumbIp && Math.abs(thumbTip.x - thumbIp.x) > 0.03) {
    extended += 1;
  }

  return extended;
}

/**
 * Map extended finger count to gesture
 */
export function landmarksToGesture(landmarks: Landmark[]): Gesture {
  const ext = getExtendedFingers(landmarks);
  if (ext <= 1) return 'rock';
  if (ext === 2) return 'scissors';
  if (ext >= 4) return 'paper';
  return 'unknown';
}
