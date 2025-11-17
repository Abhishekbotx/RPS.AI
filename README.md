## Rock·Paper·Scissor·AI

Camera-powered Rock–Paper–Scissors Game built with React Native. The app streams the device camera into a lightweight WebView that runs MediaPipe Hands in real time, classifies the player’s move, and instantly plays a round against the built-in opponent.

---

### Features
- Live gesture detection (rock/paper/scissors) with MediaPipe Hands running inside an in-app WebView.
- Tap-to-play flow with countdown overlay, score history, and contextual tips.
- Instant opponent move generation, win/lose/draw .
- Works on-device; no backend dependency. Tested on Android (React Native CLI).

---

### Tech Stack
- **Framework:** React Native 0.76 (TypeScript, CLI template)
- **Camera + ML:** MediaPipe Hands loaded via `android/app/src/main/assets/hand.html` and rendered inside `react-native-webview`
- **State & Logic:** Custom hooks (`useGame`, `useGestureDetection`) with pure helpers in `src/utils`
- **Tooling:** Metro bundler, Jest, ESLint/Prettier

---

### Project Structure
```
.
├── App.tsx                # Entry – stitches hooks + UI components
├── src/
│   ├── components/        # Camera view, scoreboard, result banner, controls
│   ├── hooks/             # Game loop + gesture detection wiring
│   ├── utils/             # Gesture-to-result helpers
│   ├── web/               # (Optional) inline HTML reference for WebView builds
│   └── constants/         # UI copy, game config, MediaPipe source path
└── android/app/src/main/assets/hand.html  # MediaPipe Hands runtime
```

---

### Getting Started
1. **Install prerequisites**
   - Node.js ≥ 18, npm ≥ 9
   - Java 17, Android Studio (with SDK + emulator) or a physical Android device with USB debugging
   - (macOS/iOS) Xcode 15 + CocoaPods 1.14+
2. **Clone & install**
   ```bash
   git clone <repo-url>
   cd Testing_Project
   npm install
   ```
3. **Metro bundler** (optional manual start)
   ```bash
   npm start
   ```

---

### Run on Android
```bash
npm run android
```
- Ensure an emulator is running or a device is connected (`adb devices`).
- The first run handles native build + asset packaging (includes `hand.html`).

### Run on iOS (macOS only)
```bash
cd ios && pod install && cd ..
npm run ios
```
- For devices, enable camera permissions in Xcode capabilities.
- iOS also loads the bundled MediaPipe HTML via WebView (see `HTML_SOURCE` in `src/constants/config.ts`).

---

### Build an APK (deliverable)
```bash
cd android
./gradlew assembleRelease   # uses Java 17
# Result: android/app/build/outputs/apk/release/app-release.apk
```
Sign with your keystore (update `android/app/build.gradle`) before sharing. Upload the generated APK or host it (e.g., Google Drive) for reviewers.

---

### Download & Demo
- **APK:** [Rock·Paper·Scissor·AI Android build](https://drive.google.com/file/d/1vSe7LMzjUYOU2of-2ixMst0AKKzsNVhG/view?usp=drive_link)
- **Demo video:** [Gameplay walkthrough video](https://drive.google.com/file/d/18_71BydiHZl7bNMBNFqC7hAYiGyarRSF/view?usp=drive_link)

---

### How Gesture Detection Works
1. `CameraView` renders a `WebView` pointing to `file:///android_asset/hand.html`.
2. Inside the HTML, MediaPipe Hands processes frames from the `<video>` element via `CameraUtils`.
3. A simple heuristic counts extended fingertips to classify `rock`, `paper`, `scissors`, or `unknown`.
4. The result is posted back to React Native via `window.ReactNativeWebView.postMessage`.
5. `useGestureDetection` debounces the messages and triggers `useGame` to evaluate the round against the bot’s random move.

This approach keeps detection on-device, avoids TensorFlow.js bundle weight, and works offline once assets are packaged.

---


### Troubleshooting
- **Blank camera feed:** Ensure camera permission is granted. On Android 12+, check Settings ▸ Apps ▸ Rock Paper Vision ▸ Permissions.
- **WebView can’t load assets:** Re-run `npm run android` so Metro copies `hand.html` into `android/app/src/main/assets`.
- **Slow detection:** Good lighting and keeping the hand 0.5–1m from the camera improves MediaPipe accuracy.

---

### Notes & Next Steps
- Swap the heuristic with MediaPipe’s built-in gesture classifier or TensorFlow Lite for higher accuracy.
- Persist scores and streaks via `AsyncStorage`.
- Add multiplayer over WebRTC or backend validation if required.

Enjoy playing Rock–Paper–Scissors with your camera! 🎮📷✊✋✌️