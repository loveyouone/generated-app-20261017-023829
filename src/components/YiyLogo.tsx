import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, {
  Rect,
  Path,
  Defs,
  LinearGradient,
  Stop,
  RadialGradient,
  Circle,
  G,
  Filter,
  FeDropShadow,
} from 'react-native-svg';

interface YiyLogoProps {
  size?: number;
  color?: string;
}

export const YiyLogo: React.FC<YiyLogoProps> = ({ size = 44, color = '#00E5FF' }) => {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <Defs>
          {/* 3D Liquid Glass Body Gradient */}
          <LinearGradient id="glassBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.8} />
            <Stop offset="30%" stopColor={color} stopOpacity={0.4} />
            <Stop offset="70%" stopColor="#7C4DFF" stopOpacity={0.3} />
            <Stop offset="100%" stopColor="#00E5FF" stopOpacity={0.6} />
          </LinearGradient>

          {/* 3D Glass Bevel Border */}
          <LinearGradient id="glassBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.95} />
            <Stop offset="40%" stopColor="rgba(255,255,255,0.4)" />
            <Stop offset="80%" stopColor={color} stopOpacity={0.8} />
            <Stop offset="100%" stopColor="#7C4DFF" stopOpacity={0.9} />
          </LinearGradient>

          {/* Top Glossy Specular Light Sheen */}
          <LinearGradient id="topSheen" x1="50%" y1="0%" x2="50%" y2="100%">
            <Stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.7} />
            <Stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.0} />
          </LinearGradient>

          {/* 3D Yiy Text Gradient */}
          <LinearGradient id="yiyText3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FFFFFF" />
            <Stop offset="40%" stopColor="#00E5FF" />
            <Stop offset="100%" stopColor="#7C4DFF" />
          </LinearGradient>

          {/* 3D Shadow Gradient for Jelly Effect */}
          <RadialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopColor={color} stopOpacity={0.5} />
            <Stop offset="100%" stopColor="#000000" stopOpacity={0} />
          </RadialGradient>
        </Defs>

        {/* Outer 3D Soft Shadow */}
        <Rect
          x="6"
          y="8"
          width="52"
          height="52"
          rx="18"
          fill="#000000"
          fillOpacity={0.25}
        />

        {/* 3D Liquid Glass Container Base */}
        <Rect
          x="4"
          y="4"
          width="56"
          height="56"
          rx="18"
          fill="url(#glassBodyGrad)"
          stroke="url(#glassBorderGrad)"
          strokeWidth="2"
        />

        {/* Inner Radial Glow Layer */}
        <Rect
          x="6"
          y="6"
          width="52"
          height="52"
          rx="16"
          fill="url(#innerGlow)"
        />

        {/* Top Gloss Refraction Sheen Arc */}
        <Path
          d="M8 18C8 12.4772 12.4772 8 18 8H46C51.5228 8 56 12.4772 56 18C56 19.5 45 23 32 23C19 23 8 19.5 8 18Z"
          fill="url(#topSheen)"
        />

        {/* 3D Glassy Text: "Yiy" */}
        <G>
          {/* Shadow layer for 3D depth */}
          <Path
            d="M15 22L23 34V45M31 22L24 32"
            stroke="#000000"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.3}
          />
          <Circle cx="37" cy="24" r="2.5" fill="#000000" fillOpacity={0.3} />
          <Path
            d="M37 30V44M43 30V39C43 43 40 46 36 46"
            stroke="#000000"
            strokeWidth="4"
            strokeLinecap="round"
            strokeOpacity={0.3}
          />

          {/* Main 3D Glass "Yiy" Path */}
          {/* Y */}
          <Path
            d="M14 20L22 32V44"
            stroke="url(#yiyText3D)"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M30 20L22 32"
            stroke="url(#yiyText3D)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {/* Specular highlight on Y */}
          <Path
            d="M15 20L21 29"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity={0.9}
          />

          {/* i */}
          <Circle cx="36" cy="22" r="2.5" fill="#FFFFFF" />
          <Circle cx="36" cy="22" r="1.5" fill={color} />
          <Path
            d="M36 28V43"
            stroke="url(#yiyText3D)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <Path
            d="M36 29V36"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeOpacity={0.8}
          />

          {/* y */}
          <Path
            d="M42 28V38C42 42 39 45 35 45"
            stroke="url(#yiyText3D)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M42 29V35"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeOpacity={0.8}
          />
        </G>

        {/* Bottom Corner Glass Sparkle Reflection */}
        <Circle cx="48" cy="48" r="1.5" fill="#FFFFFF" fillOpacity={0.9} />
        <Circle cx="50" cy="45" r="1" fill="#FFFFFF" fillOpacity={0.6} />
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
