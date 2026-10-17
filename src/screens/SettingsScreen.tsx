import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Palette, Moon, Sun, Smartphone, Sliders, ShieldCheck, Play, Square } from 'lucide-react-native';
import { useTheme, AppearanceMode } from '../theme/ThemeContext';
import { PRESET_THEME_COLORS, ThemeColor } from '../theme/colors';
import { GlassCard } from '../components/GlassCard';
import { GlassSlider } from '../components/GlassSlider';
import { HighlightButton } from '../components/HighlightButton';
import { NativeOverlayService } from '../services/NativeOverlayService';

export const SettingsScreen: React.FC = () => {
  const {
    appearanceMode,
    setAppearanceMode,
    isDark,
    activeColor,
    setActiveColor,
    blurIntensity,
    setBlurIntensity,
    refractionHighlight,
    setRefractionHighlight,
  } = useTheme();

  const [overlayActive, setOverlayActive] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  useEffect(() => {
    checkPermissionStatus();
  }, []);

  const checkPermissionStatus = async () => {
    const granted = await NativeOverlayService.checkPermission();
    setHasPermission(granted);
  };

  const handleToggleOverlay = async () => {
    if (!overlayActive) {
      if (!hasPermission) {
        const granted = await NativeOverlayService.requestPermission();
        if (!granted) {
          Alert.alert(
            '权限不足',
            '启动系统悬浮窗灵动岛需要“显示在其他应用上”权限，请在系统设置中允许。'
          );
          return;
        }
        setHasPermission(true);
      }
      const success = await NativeOverlayService.startOverlay(activeColor.hex);
      if (success) {
        setOverlayActive(true);
      }
    } else {
      const success = await NativeOverlayService.stopOverlay();
      if (success) {
        setOverlayActive(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.flex1} edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 页面标题 */}
        <Text style={[styles.headerTitle, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
          外观与材质设置
        </Text>
        <Text style={[styles.headerSub, { color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(15,23,42,0.7)' }]}>
          调节实时折射材质参数与 Android 原生灵动岛控制
        </Text>

        {/* 1. 外观模式切换 */}
        <GlassCard style={{ marginTop: 12 }}>
          <View style={styles.cardHeaderRow}>
            <View style={[styles.iconBox, { backgroundColor: activeColor.glowRgba }]}>
              <Sun size={20} color={activeColor.hex} />
            </View>
            <Text style={[styles.badgeText, { color: activeColor.hex }]}>显示模式</Text>
          </View>
          <Text style={[styles.cardTitle, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
            主题模式选择
          </Text>

          <View style={styles.modeGrid}>
            {[
              { mode: 'dark', label: '深色模式', icon: Moon },
              { mode: 'light', label: '浅色模式', icon: Sun },
              { mode: 'system', label: '跟随系统', icon: Smartphone },
            ].map(({ mode, label, icon: IconComp }) => {
              const isSelected = appearanceMode === mode;
              return (
                <Pressable
                  key={mode}
                  onPress={() => setAppearanceMode(mode as AppearanceMode)}
                  style={[
                    styles.modeButton,
                    {
                      borderColor: isSelected
                        ? activeColor.hex
                        : isDark
                        ? 'rgba(255, 255, 255, 0.15)'
                        : 'rgba(15, 23, 42, 0.15)',
                      backgroundColor: isSelected
                        ? activeColor.glowRgba
                        : isDark
                        ? 'rgba(255, 255, 255, 0.05)'
                        : 'rgba(255, 255, 255, 0.5)',
                    },
                  ]}
                >
                  <IconComp
                    size={18}
                    color={isSelected ? activeColor.hex : isDark ? '#E2E8F0' : '#1E293B'}
                  />
                  <Text
                    style={[
                      styles.modeText,
                      {
                        color: isSelected
                          ? activeColor.hex
                          : isDark
                          ? '#E2E8F0'
                          : '#1E293B',
                        fontWeight: isSelected ? '700' : '500',
                      },
                    ]}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </GlassCard>

        {/* 2. 7 Preset 主题配色选择器 */}
        <GlassCard style={{ marginTop: 16 }}>
          <View style={styles.cardHeaderRow}>
            <View style={[styles.iconBox, { backgroundColor: activeColor.glowRgba }]}>
              <Palette size={20} color={activeColor.hex} />
            </View>
            <Text style={[styles.badgeText, { color: activeColor.hex }]}>7 Preset 调色盘</Text>
          </View>
          <Text style={[styles.cardTitle, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
            全局主题色彩 (Global Color Sync)
          </Text>
          <Text style={[styles.cardSubText, { color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(15,23,42,0.7)' }]}>
            点击即时同步光斑背景、按钮填色、描边高光与 TabBar 水滴指示器：
          </Text>

          <View style={styles.colorGrid}>
            {PRESET_THEME_COLORS.map((c: ThemeColor) => {
              const isSelected = activeColor.id === c.id;
              return (
                <Pressable
                  key={c.id}
                  onPress={() => setActiveColor(c)}
                  style={[
                    styles.colorTile,
                    {
                      borderColor: isSelected ? '#FFFFFF' : 'transparent',
                      borderWidth: isSelected ? 2 : 0,
                    },
                  ]}
                >
                  <View style={[styles.colorBubble, { backgroundColor: c.hex }]} />
                  <Text
                    style={[
                      styles.colorLabel,
                      {
                        color: isSelected
                          ? activeColor.hex
                          : isDark
                          ? 'rgba(255,255,255,0.7)'
                          : 'rgba(15,23,42,0.7)',
                        fontWeight: isSelected ? '800' : '500',
                      },
                    ]}
                  >
                    {c.name}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </GlassCard>

        {/* 3. 材质光学参数调节 */}
        <GlassCard style={{ marginTop: 16 }}>
          <View style={styles.cardHeaderRow}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(124, 77, 255, 0.2)' }]}>
              <Sliders size={20} color="#7C4DFF" />
            </View>
            <Text style={[styles.badgeText, { color: '#7C4DFF' }]}>光学调节</Text>
          </View>
          <Text style={[styles.cardTitle, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
            高斯模糊与折射高光
          </Text>

          <View style={{ marginTop: 8 }}>
            <GlassSlider
              label="高斯模糊强度 (Blur Intensity)"
              value={blurIntensity}
              onValueChange={setBlurIntensity}
              min={10}
              max={100}
              unit="%"
            />

            <GlassSlider
              label="折射高光透明度 (Refraction Highlight)"
              value={refractionHighlight}
              onValueChange={setRefractionHighlight}
              min={10}
              max={100}
              unit="%"
            />
          </View>
        </GlassCard>

        {/* 4. Android 原生悬浮灵动岛模块 */}
        <GlassCard style={{ marginTop: 16 }}>
          <View style={styles.cardHeaderRow}>
            <View style={[styles.iconBox, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
              <ShieldCheck size={20} color="#10B981" />
            </View>
            <Text style={[styles.badgeText, { color: '#10B981' }]}>Android Native Module</Text>
          </View>
          <Text style={[styles.cardTitle, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
            系统级悬浮灵动岛 (System Overlay Window)
          </Text>
          <Text style={[styles.cardSubText, { color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(15,23,42,0.7)' }]}>
            利用 Android WindowManager (TYPE_APPLICATION_OVERLAY) 跨应用悬浮在桌面及任何 APP 上方。
          </Text>

          <View style={styles.statusBox}>
            <Text style={[styles.statusLabel, { color: isDark ? '#94A3B8' : '#64748B' }]}>
              权限状态：
            </Text>
            <Text style={[styles.statusVal, { color: hasPermission ? '#10B981' : '#EF4444' }]}>
              {hasPermission ? '已授予悬浮窗权限' : '未授予悬浮窗权限'}
            </Text>
          </View>

          <HighlightButton
            title={overlayActive ? '关闭系统悬浮灵动岛' : '启动系统悬浮灵动岛'}
            icon={overlayActive ? <Square size={16} color="#FFF" /> : <Play size={16} color="#FFF" />}
            onPress={handleToggleOverlay}
            style={{ marginTop: 14 }}
          />
        </GlassCard>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 16,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSubText: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  modeGrid: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  modeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1.5,
    gap: 6,
  },
  modeText: {
    fontSize: 12,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
  },
  colorTile: {
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    gap: 8,
  },
  colorBubble: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  colorLabel: {
    fontSize: 12,
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusLabel: {
    fontSize: 13,
  },
  statusVal: {
    fontSize: 13,
    fontWeight: '700',
  },
  bottomSpacer: {
    height: 110,
  },
});