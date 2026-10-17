import React, { createContext, useContext, useState, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { PRESET_THEME_COLORS, ThemeColor } from './colors';

export type AppearanceMode = 'dark' | 'light' | 'system';

interface ThemeContextType {
  appearanceMode: AppearanceMode;
  setAppearanceMode: (mode: AppearanceMode) => void;
  isDark: boolean;
  activeColor: ThemeColor;
  setActiveColor: (color: ThemeColor) => void;
  blurIntensity: number; // 0 - 100
  setBlurIntensity: (val: number) => void;
  refractionHighlight: number; // 0 - 100
  setRefractionHighlight: (val: number) => void;
  glassStyle: {
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    borderRadius: number;
    shadowColor: string;
    shadowOffset: { width: number; height: number };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemScheme = useColorScheme();
  const [appearanceMode, setAppearanceMode] = useState<AppearanceMode>('dark');
  const [activeColor, setActiveColor] = useState<ThemeColor>(PRESET_THEME_COLORS[0]);
  const [blurIntensity, setBlurIntensity] = useState<number>(92);
  const [refractionHighlight, setRefractionHighlight] = useState<number>(88);

  const isDark = useMemo(() => {
    if (appearanceMode === 'system') {
      return systemScheme === 'dark';
    }
    return appearanceMode === 'dark';
  }, [appearanceMode, systemScheme]);

  const glassStyle = useMemo(() => {
    const borderAlpha = Math.min(0.55, (refractionHighlight / 100) * 0.38 + 0.15);
    const bgAlpha = isDark ? 0.22 : 0.45;
    
    // Crisp White custom crystal tint
    const isCrispWhite = activeColor.id === 'white';
    const activeBorderTint = isCrispWhite 
      ? `rgba(241, 245, 249, ${borderAlpha + 0.15})`
      : `rgba(255, 255, 255, ${borderAlpha})`;

    return {
      backgroundColor: isDark 
        ? `rgba(15, 20, 32, ${bgAlpha})` 
        : `rgba(255, 255, 255, ${bgAlpha})`,
      borderColor: activeBorderTint,
      borderWidth: 1,
      borderRadius: 28,
      shadowColor: isDark ? activeColor.hex : '#0F172A',
      shadowOffset: { width: 0, height: 14 },
      shadowOpacity: isDark ? 0.35 : 0.18,
      shadowRadius: 24,
      elevation: 12,
    };
  }, [isDark, activeColor, refractionHighlight]);

  const value = useMemo(
    () => ({
      appearanceMode,
      setAppearanceMode,
      isDark,
      activeColor,
      setActiveColor,
      blurIntensity,
      setBlurIntensity,
      refractionHighlight,
      setRefractionHighlight,
      glassStyle,
    }),
    [appearanceMode, isDark, activeColor, blurIntensity, refractionHighlight, glassStyle]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
