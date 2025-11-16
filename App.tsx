import { StyleSheet, View } from 'react-native';
import { Header } from './src/components/Header';
import { CameraView } from './src/components/CameraView';
import { ScoreBoard } from './src/components/ScoreBoard';
import { ResultDisplay } from './src/components/ResultDislay';
import { ControlButtons } from './src/components/ControlButtons';
import { useGame } from './src/hooks/useGame';
import { useGestureDetection } from './src/hooks/useGestureDetection';

export default function App() {
  const {
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
  } = useGame();

  const { lastDetectedGesture, handleWebViewMessage } = useGestureDetection(
    isPlaying,
    handleGestureDetected
  );

  return (
    <View style={styles.container}>
      <Header />

      <CameraView
        countdown={countdown}
        isPlaying={isPlaying}
        lastDetectedGesture={lastDetectedGesture}
        onMessage={handleWebViewMessage}
      />

      <ScoreBoard score={score} />

      {result && (
        <ResultDisplay
          result={result}
          userGesture={userGesture}
          computerMove={computerMove}
          scaleAnim={scaleAnim}
          onPlayAgain={startGame}
        />
      )}

      <ControlButtons
        isPlaying={isPlaying}
        onPlay={startGame}
        onReset={resetGame}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
});