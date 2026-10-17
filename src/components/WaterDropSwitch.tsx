import React, { useEffect } from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useTheme } from '../theme/ThemeContext';

interface WaterDropSwitchProps {
  value: boolean;
  onValueChange: (val: boolean) => void;
  size?: 'normal' | 'large';
}

export const WaterDropSwitch: React.FC<WaterDropSwitchProps> = ({
  value,
  onValueChange,
  size = 'normal',
}) => {
  const { activeColor, isDark } = useTheme();
  const progress = useSharedValue(value ? 1 : 0);

  const width = size === 'large' ? 68 : 56;
  const height = size === 'large' ? 36 : 30;
  const thumbSize = size === 'large' ? 28 : 22;
  const travel = width - thumbSize - 8;

  useEffect(() => {
    progress.value = withSpring(value ? 1 : 0, {
      damping: 15,
      stiffness: 180,
    });
  }, [value]);

  const animatedThumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: progress.value * travel }],
      backgroundColor: value ? '#FFFFFF' : isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(15, 23, 42, 0.4)',
    };
  });

  const animatedTrackStyle = useAnimatedStyle(() => {
    const activeBg = activeColor.hex;
    const inactiveBg = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)';
    const bg = interpolateColor(progress.value, [0, 1], [inactiveBg, activeBg]);
    return {
      backgroundColor: bg,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.6)',
    };
  });

  return (
    <Pressable onPress={() => onValueChange(!value)}>
      <Animated.View
        style={[
          styles.track,
          { width, height, borderRadius: height / 2 },
          animatedTrackStyle,
        ]}
      >
        <BlurView
          intensity={60}
          tint={isDark ? 'dark' : 'light'}
          style={StyleSheet.absoluteFill}
        />
        <Animated.View
          style={[
            styles.thumb,
            { width: thumbSize, height: thumbSize, borderRadius: thumbSize / 2 },
            animatedThumbStyle,
          ]}
        >
          {/* Internal fluid lens highlight */}
          <View style={styles.lensReflection} />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  track: {
    padding: 4,
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
  },
  thumb: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  lensReflection: {
    width: '40%',
    height: '40%',
    borderRadius: 99,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    position: 'absolute',
    top: '15%',
    left: '20%',
  },
});
