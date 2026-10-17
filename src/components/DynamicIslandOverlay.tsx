import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Switch } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Sparkles, Zap, ChevronUp } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { PRESET_THEME_COLORS } from '../theme/colors';

interface FunctionToggle {
  id: string;
  label: string;
  active: boolean;
}

interface DynamicIslandOverlayProps {
  isVisible?: boolean;
}

export const DynamicIslandOverlay: React.FC<DynamicIslandOverlayProps> = ({
  isVisible = false,
}) => {
  const { activeColor, setActiveColor, isDark } = useTheme();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [toggles, setToggles] = useState<FunctionToggle[]>([
    { id: 'aimbot', label: '自动瞄准 (Aimbot)', active: true },
    { id: 'esp', label: '透视显示 (ESP)', active: true },
    { id: 'speed', label: '移动加速 (Speed)', active: false },
    { id: 'noclip', label: '无视碰撞 (Noclip)', active: false },
    { id: 'jump', label: '无限跳跃 (Jump)', active: true },
  ]);

  const islandWidth = useSharedValue(200);
  const islandHeight = useSharedValue(38);

  // If not injected / not visible, do not render overlay
  if (!isVisible) return null;

  const toggleExpand = () => {
    const nextState = !expanded;
    setExpanded(nextState);

    if (nextState) {
      islandWidth.value = withSpring(330, { damping: 14, stiffness: 180 });
      islandHeight.value = withSpring(240, { damping: 14, stiffness: 180 });
    } else {
      islandWidth.value = withSpring(200, { damping: 14, stiffness: 180 });
      islandHeight.value = withSpring(38, { damping: 14, stiffness: 180 });
    }
  };

  const toggleFunction = (id: string) => {
    setToggles((prev) =>
      prev.map((item) => (item.id === id ? { ...item, active: !item.active } : item))
    );
  };

  const animatedStyle = useAnimatedStyle(() => ({
    width: islandWidth.value,
    height: islandHeight.value,
  }));

  return (
    <View style={styles.topContainer} pointerEvents="box-none">
      <Animated.View
        style={[
          styles.islandCapsule,
          {
            borderColor: activeColor.hex,
            shadowColor: activeColor.hex,
          },
          animatedStyle,
        ]}
      >
        <BlurView
          intensity={95}
          tint={isDark ? 'dark' : 'light'}
          style={StyleSheet.absoluteFill}
        />
        <View
          style={[
            styles.innerOverlay,
            {
              backgroundColor: isDark
                ? 'rgba(6, 8, 15, 0.88)'
                : 'rgba(255, 255, 255, 0.88)',
            },
          ]}
        >
          {/* Compact Header Bar */}
          <Pressable onPress={toggleExpand} style={styles.headerPressable}>
            <View style={styles.headerLeft}>
              <View style={[styles.dot, { backgroundColor: activeColor.hex }]} />
              <Text
                numberOfLines={1}
                style={[
                  styles.titleText,
                  { color: isDark ? '#FFFFFF' : '#0F172A' },
                ]}
              >
                {expanded ? 'YIy注入 悬浮功能菜单' : 'YIy注入 悬浮岛'}
              </Text>
            </View>
            <View style={styles.headerRight}>
              <Zap size={13} color={activeColor.hex} />
              <Sparkles size={13} color={activeColor.hex} />
            </View>
          </Pressable>

          {/* Expanded Content View */}
          {expanded && (
            <View style={styles.expandedBody}>
              <Text style={[styles.sectionHeader, { color: activeColor.hex }]}>
                已注入脚本功能挂载:
              </Text>

              {/* Script Feature Toggles Grid */}
              <View style={styles.togglesContainer}>
                {toggles.map((item) => (
                  <View key={item.id} style={styles.toggleRow}>
                    <Text
                      style={[
                        styles.toggleLabel,
                        { color: isDark ? '#E2E8F0' : '#1E293B' },
                      ]}
                    >
                      {item.label}
                    </Text>
                    <Switch
                      value={item.active}
                      onValueChange={() => toggleFunction(item.id)}
                      trackColor={{ false: '#334155', true: activeColor.hex }}
                      thumbColor="#FFFFFF"
                    />
                  </View>
                ))}
              </View>

              {/* Quick Theme Color Picker */}
              <Text style={[styles.sectionHeader, { marginTop: 8, color: activeColor.hex }]}>
                快捷调色盘:
              </Text>
              <View style={styles.colorPaletteRow}>
                {PRESET_THEME_COLORS.map((color) => (
                  <Pressable
                    key={color.id}
                    onPress={() => setActiveColor(color)}
                    style={[
                      styles.paletteDot,
                      {
                        backgroundColor: color.hex,
                        borderColor:
                          activeColor.id === color.id
                            ? '#FFFFFF'
                            : 'transparent',
                      },
                    ]}
                  />
                ))}
              </View>
            </View>
          )}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 999,
  },
  islandCapsule: {
    borderRadius: 24,
    borderWidth: 1.5,
    overflow: 'hidden',
    elevation: 10,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
  },
  innerOverlay: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  headerPressable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 22,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  titleText: {
    fontSize: 12,
    fontWeight: '700',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  expandedBody: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
  },
  sectionHeader: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  togglesContainer: {
    gap: 4,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 26,
  },
  toggleLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  colorPaletteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  paletteDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
  },
});
