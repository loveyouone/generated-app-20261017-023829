import React from 'react';
import { StyleSheet, View, Pressable, ViewStyle, StyleProp } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../theme/ThemeContext';

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  intensity?: number;
  borderRadius?: number;
  glow?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  onPress,
  intensity,
  borderRadius = 28,
  glow = false,
}) => {
  const { isDark, blurIntensity, refractionHighlight, activeColor } = useTheme();
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    if (!onPress) return;
    scale.value = withSpring(0.96, { damping: 12, stiffness: 200 });
  };

  const handlePressOut = () => {
    if (!onPress) return;
    scale.value = withSpring(1, { damping: 12, stiffness: 200 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const borderAlpha = (refractionHighlight / 100) * 0.25 + 0.12;
  const effectiveBlur = intensity ?? blurIntensity;

  const cardStyle: ViewStyle = {
    borderRadius,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: isDark
      ? `rgba(255, 255, 255, ${borderAlpha})`
      : `rgba(255, 255, 255, ${borderAlpha + 0.3})`,
    backgroundColor: isDark
      ? 'rgba(15, 20, 30, 0.45)'
      : 'rgba(255, 255, 255, 0.55)',
    shadowColor: glow ? activeColor.hex : isDark ? '#000000' : '#64748B',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: glow ? 0.45 : isDark ? 0.35 : 0.15,
    shadowRadius: 20,
    elevation: 8,
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={!onPress}
      style={[styles.container, cardStyle, animatedStyle, style]}
    >
      <BlurView
        intensity={effectiveBlur}
        tint={isDark ? 'dark' : 'light'}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.inner}>{children}</View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  inner: {
    padding: 20,
    zIndex: 1,
  },
});
