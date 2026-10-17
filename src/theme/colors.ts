export interface ThemeColor {
  id: string;
  name: string;
  hex: string;
  secondaryHex: string;
  glowRgba: string;
  accentRgb: string;
  isLightColor?: boolean;
}

export const PRESET_THEME_COLORS: ThemeColor[] = [
  {
    id: 'cyan',
    name: '极光青',
    hex: '#00E5FF',
    secondaryHex: '#0088FF',
    glowRgba: 'rgba(0, 229, 255, 0.38)',
    accentRgb: '0, 229, 255',
  },
  {
    id: 'purple',
    name: '幻彩紫',
    hex: '#7C4DFF',
    secondaryHex: '#D500F9',
    glowRgba: 'rgba(124, 77, 255, 0.38)',
    accentRgb: '124, 77, 255',
  },
  {
    id: 'green',
    name: '翡翠绿',
    hex: '#10B981',
    secondaryHex: '#059669',
    glowRgba: 'rgba(16, 185, 129, 0.38)',
    accentRgb: '16, 185, 129',
  },
  {
    id: 'gold',
    name: '琥珀金',
    hex: '#F59E0B',
    secondaryHex: '#EF4444',
    glowRgba: 'rgba(245, 158, 11, 0.38)',
    accentRgb: '245, 158, 11',
  },
  {
    id: 'rose',
    name: '玫瑰红',
    hex: '#F43F5E',
    secondaryHex: '#E11D48',
    glowRgba: 'rgba(244, 63, 94, 0.38)',
    accentRgb: '244, 63, 94',
  },
  {
    id: 'blue',
    name: '冰川蓝',
    hex: '#3B82F6',
    secondaryHex: '#1D4ED8',
    glowRgba: 'rgba(59, 130, 246, 0.38)',
    accentRgb: '59, 130, 246',
  },
  {
    id: 'white',
    name: '晶冷白',
    hex: '#F1F5F9',
    secondaryHex: '#38BDF8',
    glowRgba: 'rgba(241, 245, 249, 0.65)',
    accentRgb: '241, 245, 249',
    isLightColor: true,
  },
];

export const DARK_BACKGROUND = '#06080F';
export const LIGHT_BACKGROUND = '#E2E8F0';
