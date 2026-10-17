# 💧 Liquid Glass — Pure Frontend Mobile Architecture & Design System

"Liquid Glass" is an ultra-premium, pure frontend cross-platform mobile application showcase built with **React Native (Expo SDK 51)** and **Android Native Kotlin Modules**. Inspired by iOS 26 Liquid Glass optics, it demonstrates 120fps fluid spring physics, high-transparency `BlurView` glassmorphic materials, custom edge-swipe drawer gestures, floating capsule tab navigation with water-drop alignment, and a native Android `WindowManager` system overlay dynamic island.

---

## 🚀 Key Features & Highlights

1. **Global Dynamic Theme Engine**:
   - 7 Preset Themes: Aurora Cyan (`#00E5FF`), Electric Purple (`#7C4DFF`), Emerald Green (`#10B981`), Amber Gold (`#F59E0B`), Rose Red (`#F43F5E`), Glacier Blue (`#3B82F6`), Crisp White (`#F1F5F9`).
   - Supports Dark, Light, and System (`useColorScheme`) adaptive modes.
   - Dynamic real-time color syncing across background animated blobs, buttons, highlights, and tab indicators.

2. **Liquid Glass Visual Optics**:
   - `expo-blur` (`BlurView`) high-intensity real-time glass backdrop rendering.
   - 1px ultra-thin refractive border with 15%-25% dynamic transparency.
   - Multi-layer deep physical shadows.
   - Animated floating multi-dimensional gradient blob background reacting smoothly to theme state.

3. **Floating Capsule Bottom Navigation**:
   - 4 Tabs: Home (Explore), Components (Library), Settings (Appearance), About.
   - Water-drop lens active sliding indicator powered by Reanimated `withSpring`.
   - Zero-pixel center alignment calculations.

4. **Interactive Component Showcase**:
   - Edge Swipe Drawer with gesture tracking.
   - Highlight Shimmer Button with diagonal linear-gradient sweep light effect.
   - Water-Drop Capsule Toggle Switch with spring fluid dot physics.
   - High-precision Glass Track Slider with floating value bubble tooltip.

5. **System-Level Overlay Dynamic Island (Android WindowManager)**:
   - Native Android module (`OverlayModule.kt` & `OverlayService.kt`) utilizing `TYPE_APPLICATION_OVERLAY`.
   - Floats above desktop and all other Android applications.
   - Supports spring expansion, drag positioning, tap outside to dismiss, and dynamic color syncing.

---

## 📁 Project Structure

```
.
├── App.tsx                              # Application Root & Providers
├── app.json                             # Expo Configuration & Android Permissions
├── babel.config.js                      # Babel & Reanimated Plugin Setup
├── package.json                         # Dependencies & Scripts
├── wrangler.json                        # Cloudflare Preview Worker Configuration
├── README.md                            # Complete Build & Setup Documentation
├── public/                              # Web Showcase Preview Engine
│   ├── index.html
│   ├── app.js
│   └── style.css
├── src/
│   ├── components/
│   │   ├── CategoryChips.tsx            # Filter Chips
│   │   ├── DynamicBlobBackground.tsx    # Animated Gradient Blobs
│   │   ├── DynamicIslandOverlay.tsx     # System Overlay Dynamic Island React Native Component
│   │   ├── FloatingTabBar.tsx           # Floating Water-Drop Capsule TabBar
│   │   ├── GlassCard.tsx                # Glassmorphic Card Container with Spring Micro-scale
│   │   ├── GlassDrawer.tsx              # Edge-Swipe Gesture Navigation Drawer
│   │   ├── GlassSearchBar.tsx           # Glass Search Input
│   │   ├── GlassSlider.tsx              # Precision Track Slider with Tooltip
│   │   ├── HighlightButton.tsx          # Shimmer Sweep Light Button
│   │   └── WaterDropSwitch.tsx          # Water-Drop Toggle Switch
│   ├── navigation/
│   │   └── AppNavigator.tsx             # Tab Navigation & Background Coordinator
│   ├── screens/
│   │   ├── AboutScreen.tsx              # Architectural Specs & Version Info
│   │   ├── ComponentsScreen.tsx         # Interactive UI Library Showcase
│   │   ├── HomeScreen.tsx               # Explore Feature Cards & Edge Drawer
│   │   └── SettingsScreen.tsx           # Appearance Palette & Refraction Sliders
│   ├── services/
│   │   └── NativeOverlayService.ts      # Native Module Kotlin Bridge Interface
│   └── theme/
│       ├── colors.ts                    # 7 Preset Theme Palette Definitions
│       └── ThemeContext.tsx             # Global Dynamic Theme Provider
└── android/                             # Android Native Project Source
    ├── build.gradle
    ├── settings.gradle
    └── app/
        ├── build.gradle
        └── src/main/
            ├── AndroidManifest.xml      # SYSTEM_ALERT_WINDOW & Foreground Service Permissions
            └── java/com/liquidglass/
                ├── MainActivity.kt
                ├── MainApplication.kt
                ├── OverlayModule.kt     # Native Method Bridge
                ├── OverlayPackage.kt    # React Native Package Register
                └── OverlayService.kt    # WindowManager Foreground Floating Overlay Service
```

---

## 🛠️ Installation & Local Development Guide

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x or yarn >= 1.22
- Android Studio & JDK 17 (for Android Native & Local Gradle build)
- Expo CLI (`npm install -g expo-cli` or `npx expo`)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run React Native Metro Bundler (Local Dev)
```bash
npm start
```
- Press `a` to open on an Android Emulator or connected physical device.
- Or scan the QR code using the **Expo Go** application on your physical phone.

### 3. Run Android Native (With Custom Overlay Module)
Because the System Overlay Dynamic Island utilizes a custom Android Native Module (`OverlayModule.kt`), run standard prebuild or native execution:

```bash
# Generate native android workspace if building from scratch
npx expo prebuild --platform android

# Run on Android Emulator or Device with Native Modules attached
npm run android
```

---

## 📦 How to Build into an APK

### Option A: Local Gradle APK Build (Fastest Local Output)

1. Connect your Android device or start an emulator.
2. Navigate to the `android/` directory and compile the Release APK:

```bash
cd android
./gradlew assembleRelease
```
*(On Windows Powershell: `.\gradlew.bat assembleRelease`)*

3. The generated release APK will be located at:
   `android/app/build/outputs/apk/release/app-release.apk`

4. Install directly onto your connected device via ADB:
```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

---

### Option B: Cloud Build using Expo Application Services (EAS Build)

1. Install EAS CLI globally:
```bash
npm install -g eas-cli
```

2. Log in to your Expo account:
```bash
eas login
```

3. Configure EAS build profile:
```bash
eas build:configure
```

4. Trigger a cloud APK preview build:
```bash
npm run eas-build:android
# Or run explicitly:
eas build --platform android --profile preview
```
Once complete, EAS will output a downloadable direct `.apk` link to install on any Android mobile phone!

---

## 📱 How to Use System Overlay Dynamic Island Permission

1. Open the application and go to the **Settings** tab (or tap "Toggle System Overlay" on the Home/Settings screen).
2. Tap **"Grant Overlay Permission"**.
3. Android will automatically open **Settings > Display over other apps (SYSTEM_ALERT_WINDOW)**.
4. Enable permission for **Liquid Glass**.
5. Return to the app and tap **"Start System Floating Island"**.
6. The small liquid capsule will float seamlessly over your Android home screen and inside any other app! Tap it to trigger the physical spring expansion card!

---

## 📜 License
MIT License. Crafted for high-refresh-rate UI/UX mobile architecture.
