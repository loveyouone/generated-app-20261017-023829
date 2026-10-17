import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, G } from 'react-native-svg';

interface RobloxIconProps {
  size?: number;
}

export const RobloxIcon: React.FC<RobloxIconProps> = ({ size = 40 }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
        {/* Roblox Brand Blue Background */}
        <Rect
          x="1"
          y="1"
          width="46"
          height="46"
          rx="12"
          fill="#00A2FF"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
        />

        {/* Center Tilted Square Group (Roblox Classic Logo Tilt ~15deg) */}
        <G transform="translate(24, 24) rotate(-14) translate(-24, -24)">
          {/* Outer White Square */}
          <Rect
            x="12"
            y="12"
            width="24"
            height="24"
            rx="3"
            fill="#FFFFFF"
          />
          {/* Inner Blue Square Hole */}
          <Rect
            x="20"
            y="20"
            width="8"
            height="8"
            rx="1.5"
            fill="#00A2FF"
          />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
