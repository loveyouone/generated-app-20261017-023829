import React, { useState } from 'react';
import { StyleSheet, View, Text, LayoutChangeEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useTheme } from '../theme/ThemeContext';

interface GlassSliderProps {
  label: string;
  value: number; // 0 to 100
  onValueChange: (val: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export const GlassSlider: React.FC<GlassSliderProps> = ({
  label,
  value,
  onValueChange,
  min = 0,
  max = 100,
  unit = '%',
}) => {
  const { activeColor, isDark } = useTheme();
  const [sliderWidth, setSliderWidth] = useState<number>(250);

  const isDragging = useSharedValue(false);
  const startX = useSharedValue(0);

  // Helper to map 0..100 to pixels
  const initialRatio = Math.min(Math.max((value - min) / (max - min), 0), 1);
  const translationX = useSharedValue(initialRatio * (sliderWidth - 28));

  const handleLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    setSliderWidth(w);
    translationX.value = ((value - min) / (max - min)) * (w - 28);
  };

  const updateVal = (pixelPos: number) => {
    const usableWidth = sliderWidth - 28;
    if (usableWidth <= 0) return;
    const clampedPx = Math.min(Math.max(pixelPos, 0), usableWidth);
    const ratio = clampedPx / usableWidth;
    const computedVal = Math.round(min + ratio * (max - min));
    onValueChange(computedVal);
  };

  const gesture = Gesture.Pan()
    .onStart(() => {
      isDragging.value = true;
      startX.value = translationX.value;
    })
    .onUpdate((event) => {
      const usableWidth = sliderWidth - 28;
      const nextX = Math.min(Math.max(startX.value + event.translationX, 0), usableWidth);
      translationX.value = nextX;
      runOnJS(updateVal)(nextX);
    })
    .onEnd(() => {
      isDragging.value = false;
    });

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translationX.value }],
  }));

  const animatedFillStyle = useAnimatedStyle(() => ({
    width: translationX.value + 14,
  }));

  const animatedBubbleStyle = useAnimatedStyle(() => ({
    opacity: isDragging.value ? 1 : 0.85,
    transform: [
      { translateX: translationX.value - 12 },
      { translateY: isDragging.value ? -38 : -32 },
      { scale: isDragging.value ? 1.15 : 1 },
    ],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.label, { color: isDark ? '#E2E8F0' : '#1E293B' }]}>
          {label}
        </Text>
        <Text style={[styles.valueText, { color: activeColor.hex }]}>
          {Math.round(value)}
          {unit}
        </Text>
      </View>

      <View style={styles.trackWrapper} onLayout={handleLayout}>
        <GestureDetector gesture={gesture}>
          <View style={styles.touchArea}>
            {/* Background Track */}
            <View
              style={[
                styles.trackBackground,
                {
                  backgroundColor: isDark
                    ? 'rgba(255, 255, 255, 0.12)'
                    : 'rgba(0, 0, 0, 0.08)',
                },
              ]}
            >
              <BlurView
                intensity={40}
                tint={isDark ? 'dark' : 'light'}
                style={StyleSheet.absoluteFill}
              />
            </View>

            {/* Filled Progress Track */}
            <Animated.View
              style={[
                styles.trackFill,
                { backgroundColor: activeColor.hex },
                animatedFillStyle,
              ]}
            />

            {/* Value Bubble Tooltip */}
            <Animated.View style={[styles.bubbleContainer, animatedBubbleStyle]}>
              <View style={[styles.bubble, { backgroundColor: activeColor.hex }]}>
                <Text style={styles.bubbleText}>{Math.round(value)}</Text>
              </View>
            </Animated.View>

            {/* Thumb Knob */}
            <Animated.View
              style={[
                styles.thumb,
                {
                  borderColor: activeColor.hex,
                  backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
                },
                animatedThumbStyle,
              ]}
            >
              <View
                style={[styles.thumbInner, { backgroundColor: activeColor.hex }]}
              />
            </Animated.View>
          </View>
        </GestureDetector>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
  },
  valueText: {
    fontSize: 15,
    fontWeight: '700',
  },
  trackWrapper: {
    height: 40,
    justifyContent: 'center',
  },
  touchArea: {
    height: 40,
    justifyContent: 'center',
  },
  trackBackground: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
    width: '100%',
  },
  trackFill: {
    position: 'absolute',
    height: 12,
    borderRadius: 6,
    top: 14,
    left: 0,
  },
  thumb: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    top: 6,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  thumbInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  bubbleContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 10,
  },
  bubble: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubbleText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
