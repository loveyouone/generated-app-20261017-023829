import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, LayoutChangeEvent } from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Home, Terminal, SlidersHorizontal, Info } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';

export interface TabItem {
  key: string;
  title: string;
  icon: any;
}

const TABS: TabItem[] = [
  { key: 'Home', title: '首页', icon: Home },
  { key: 'Scripts', title: '注入', icon: Terminal },
  { key: 'Settings', title: '设置', icon: SlidersHorizontal },
  { key: 'About', title: '关于', icon: Info },
];

interface FloatingTabBarProps {
  activeTab: string;
  onTabChange: (tabKey: string) => void;
}

export const FloatingTabBar: React.FC<FloatingTabBarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const { activeColor, isDark } = useTheme();
  const [tabLayouts, setTabLayouts] = useState<{ [key: string]: { x: number; width: number } }>({});

  const indicatorX = useSharedValue(0);
  const indicatorWidth = useSharedValue(64);

  const handleTabLayout = (key: string, event: LayoutChangeEvent) => {
    const { x, width } = event.nativeEvent.layout;
    const newLayouts = { ...tabLayouts, [key]: { x, width } };
    setTabLayouts(newLayouts);

    if (key === activeTab) {
      indicatorX.value = withSpring(x, { damping: 18, stiffness: 240 });
      indicatorWidth.value = withSpring(width, { damping: 18, stiffness: 240 });
    }
  };

  const handlePress = (key: string) => {
    onTabChange(key);
    const layout = tabLayouts[key];
    if (layout) {
      indicatorX.value = withSpring(layout.x, { damping: 18, stiffness: 240 });
      indicatorWidth.value = withSpring(layout.width, { damping: 18, stiffness: 240 });
    }
  };

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorX.value }],
    width: indicatorWidth.value,
  }));

  return (
    <View style={styles.outerContainer}>
      <BlurView
        intensity={95}
        tint={isDark ? 'dark' : 'light'}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[
          styles.capsuleBorder,
          {
            borderColor: isDark
              ? 'rgba(255, 255, 255, 0.25)'
              : 'rgba(255, 255, 255, 0.75)',
            backgroundColor: isDark
              ? 'rgba(10, 15, 28, 0.75)'
              : 'rgba(255, 255, 255, 0.75)',
          },
        ]}
      >
        <View style={styles.tabsRow}>
          {/* Active Water-Drop Lens Sliding Indicator */}
          <Animated.View
            style={[
              styles.waterDropLens,
              {
                backgroundColor: activeColor.glowRgba,
                borderColor: activeColor.hex,
              },
              animatedIndicatorStyle,
            ]}
          >
            <View style={[styles.lensHighlight, { backgroundColor: activeColor.hex }]} />
          </Animated.View>

          {TABS.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = tab.key === activeTab;
            return (
              <Pressable
                key={tab.key}
                onLayout={(e) => handleTabLayout(tab.key, e)}
                onPress={() => handlePress(tab.key)}
                style={styles.tabButton}
              >
                <IconComponent
                  size={18}
                  color={
                    isActive
                      ? activeColor.hex
                      : isDark
                      ? '#94A3B8'
                      : '#64748B'
                  }
                />
                <Text
                  style={[
                    styles.tabLabel,
                    {
                      color: isActive
                        ? activeColor.hex
                        : isDark
                        ? '#94A3B8'
                        : '#64748B',
                      fontWeight: isActive ? '700' : '500',
                    },
                  ]}
                >
                  {tab.title}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    borderRadius: 32,
    overflow: 'hidden',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  capsuleBorder: {
    borderRadius: 32,
    borderWidth: 1.5,
    paddingHorizontal: 4,
    paddingVertical: 4,
    overflow: 'hidden',
  },
  tabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    height: 48,
    overflow: 'hidden',
  },
  waterDropLens: {
    position: 'absolute',
    top: 2,
    bottom: 2,
    borderRadius: 24,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  lensHighlight: {
    position: 'absolute',
    top: 0,
    left: '20%',
    right: '20%',
    height: 2,
    opacity: 0.8,
    borderRadius: 1,
  },
  tabButton: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    gap: 2,
  },
  tabLabel: {
    fontSize: 11,
    letterSpacing: 0.2,
  },
});
