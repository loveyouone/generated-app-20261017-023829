import React, { useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolateColor,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeContext';
import { DARK_BACKGROUND, LIGHT_BACKGROUND } from '../theme/colors';

const { width, height } = Dimensions.get('window');

export const DynamicBlobBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { activeColor, isDark } = useTheme();

  const translateX1 = useSharedValue(-50);
  const translateY1 = useSharedValue(-50);
  const translateX2 = useSharedValue(50);
  const translateY2 = useSharedValue(50);
  const scale = useSharedValue(1);

  useEffect(() => {
    translateX1.value = withRepeat(
      withTiming(60, { duration: 10000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    translateY1.value = withRepeat(
      withTiming(80, { duration: 12000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    translateX2.value = withRepeat(
      withTiming(-70, { duration: 9000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    translateY2.value = withRepeat(
      withTiming(-60, { duration: 11000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    scale.value = withRepeat(
      withTiming(1.25, { duration: 8000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedBlob1Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX1.value },
      { translateY: translateY1.value },
      { scale: scale.value },
    ],
  }));

  const animatedBlob2Style = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX2.value },
      { translateY: translateY2.value },
      { scale: scale.value * 0.9 },
    ],
  }));

  const bgBaseColor = isDark ? DARK_BACKGROUND : LIGHT_BACKGROUND;

  return (
    <View style={[styles.container, { backgroundColor: bgBaseColor }]}>
      {/* Primary Dynamic Theme Color Blob */}
      <Animated.View style={[styles.blobContainer, styles.blob1, animatedBlob1Style]}>
        <LinearGradient
          colors={[activeColor.hex, activeColor.secondaryHex, 'transparent']}
          style={styles.gradientBlob}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      {/* Secondary Dynamic Color Blob */}
      <Animated.View style={[styles.blobContainer, styles.blob2, animatedBlob2Style]}>
        <LinearGradient
          colors={[activeColor.secondaryHex, '#10B981', 'transparent']}
          style={styles.gradientBlob}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
      </Animated.View>

      {/* Cold Refractive Overlay Blob for Crisp White theme */}
      {activeColor.id === 'white' && (
        <View style={styles.coldRefractionOverlay}>
          <LinearGradient
            colors={['rgba(255,255,255,0.25)', 'rgba(224,242,254,0.15)', 'transparent']}
            style={StyleSheet.absoluteFill}
          />
        </View>
      )}

      {/* Dynamic Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  blobContainer: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.55,
  },
  blob1: {
    width: width * 1.2,
    height: width * 1.2,
    top: -height * 0.1,
    left: -width * 0.2,
  },
  blob2: {
    width: width * 1.1,
    height: width * 1.1,
    bottom: -height * 0.1,
    right: -width * 0.2,
  },
  gradientBlob: {
    width: '100%',
    height: '100%',
    borderRadius: 999,
  },
  coldRefractionOverlay: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'none',
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});
