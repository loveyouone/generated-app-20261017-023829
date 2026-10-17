import React, { useEffect } from 'react';
import { StyleSheet, Text, Pressable, ViewStyle, TextStyle, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '../theme/ThemeContext';

interface HighlightButtonProps {
  title: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  variant?: 'primary' | 'glass' | 'outline';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const HighlightButton: React.FC<HighlightButtonProps> = ({
  title,
  onPress,
  icon,
  variant = 'primary',
  style,
  textStyle,
  disabled = false,
}) => {
  const { activeColor, isDark } = useTheme();
  const shimmerPosition = useSharedValue(-200);
  const scale = useSharedValue(1);

  useEffect(() => {
    shimmerPosition.value = withRepeat(
      withTiming(300, { duration: 3000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 12, stiffness: 200 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 12, stiffness: 200 });
  };

  const animatedShimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shimmerPosition.value }, { rotate: '25deg' }],
  }));

  const animatedScaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';

  const bgGradient = isPrimary
    ? [activeColor.hex, activeColor.secondaryHex]
    : isDark
    ? ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)']
    : ['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.5)'];

  const textColor = isPrimary
    ? activeColor.id === 'white' ? '#0F172A' : '#FFFFFF'
    : isDark ? '#FFFFFF' : '#0F172A';

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        styles.buttonContainer,
        animatedScaleStyle,
        isOutline && { borderWidth: 1.5, borderColor: activeColor.hex, backgroundColor: 'transparent' },
        style,
      ]}
    >
      {!isOutline && (
        <LinearGradient
          colors={bgGradient as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      )}

      {/* Shimmer Light Sweep Layer */}
      <View style={styles.shimmerMask}>
        <Animated.View style={[styles.shimmerBand, animatedShimmerStyle]}>
          <LinearGradient
            colors={['transparent', 'rgba(255, 255, 255, 0.55)', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      </View>

      <View style={styles.contentRow}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={[styles.text, { color: textColor }, textStyle]}>{title}</Text>
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 54,
    borderRadius: 27,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
    marginVertical: 6,
  },
  shimmerMask: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  shimmerBand: {
    width: 80,
    height: '200%',
    position: 'absolute',
    top: '-50%',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  iconContainer: {
    marginRight: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
