import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDown, Zap, ShieldAlert, Activity, Terminal, Clock } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { GlassCard } from '../components/GlassCard';
import { HighlightButton } from '../components/HighlightButton';
import { GlassDrawer } from '../components/GlassDrawer';
import { YiyLogo } from '../components/YiyLogo';
import { RobloxIcon } from '../components/RobloxIcon';
import { NativeOverlayService } from '../services/NativeOverlayService';

interface HomeScreenProps {
  onNavigateTab: (tabKey: string) => void;
  onInjectSuccess?: () => void;
}

const AVAILABLE_SCRIPTS = [
  'Roblox 通用越狱 & 飞行 v2.4',
  'Roblox 穿墙与极速挂载',
  'Auto Farm Hub - 自动刷怪',
  '透视 ESP & 无敌机制',
];

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateTab,
  onInjectSuccess,
}) => {
  const { activeColor, isDark } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedScript, setSelectedScript] = useState<string>(AVAILABLE_SCRIPTS[0]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [isInjected, setIsInjected] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Timer seconds counter
  const [timerSeconds, setTimerSeconds] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isInjected && isRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setTimerSeconds(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isInjected, isRunning]);

  const formatTimer = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const handleInject = async () => {
    try {
      // Permission check
      const granted = await NativeOverlayService.checkPermission();
      if (!granted) {
        const requested = await NativeOverlayService.requestPermission();
        if (!requested) {
          Alert.alert(
            '悬浮窗权限说明',
            '启动系统悬浮灵动岛需要“显示在其他应用上”权限，已进行模拟注入与定时挂载。'
          );
        }
      }

      setIsInjected(true);
      setIsRunning(true);
      setTimerSeconds(0);
      onInjectSuccess?.();
      await NativeOverlayService.startOverlay(activeColor.hex);
    } catch (e) {
      console.warn('Native module injection error caught:', e);
      setIsInjected(true);
      setIsRunning(true);
      onInjectSuccess?.();
    }
  };

  return (
    <SafeAreaView style={styles.flex1} edges={['top', 'left', 'right']}>
      {/* Edge Slide Drawer */}
      <GlassDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={onNavigateTab}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Header: YiyLogo + App Title */}
        <View style={styles.topNav}>
          <View style={styles.brandContainer}>
            <YiyLogo size={42} color={activeColor.hex} />
            <View style={styles.titleCol}>
              <Text style={[styles.appName, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                YIy注入
              </Text>
              <Text style={[styles.appSub, { color: activeColor.hex }]}>
                Roblox 核心控制台
              </Text>
            </View>
          </View>

          <Pressable
            onPress={() => setDrawerOpen(true)}
            style={[
              styles.menuBtn,
              {
                borderColor: isDark
                  ? 'rgba(255, 255, 255, 0.25)'
                  : 'rgba(255, 255, 255, 0.7)',
                backgroundColor: isDark
                  ? 'rgba(15, 23, 42, 0.45)'
                  : 'rgba(255, 255, 255, 0.65)',
              },
            ]}
          >
            <View style={styles.hamburgerLines}>
              <View style={[styles.line, { backgroundColor: isDark ? '#FFF' : '#000' }]} />
              <View style={[styles.line, { backgroundColor: isDark ? '#FFF' : '#000' }]} />
              <View style={[styles.line, { backgroundColor: isDark ? '#FFF' : '#000' }]} />
            </View>
          </Pressable>
        </View>

        {/* Main Control Panel Card */}
        <GlassCard glow style={styles.mainControlCard}>
          <View style={styles.panelTopRow}>
            {/* Roblox Brand SVG Icon */}
            <RobloxIcon size={44} />

            {/* Script Dropdown Selector */}
            <View style={styles.scriptSelectorCol}>
              <Text style={[styles.selectLabel, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                选择脚本预设
              </Text>
              <Pressable
                onPress={() => setDropdownOpen(!dropdownOpen)}
                style={[
                  styles.dropdownBtn,
                  {
                    borderColor: isDark
                      ? 'rgba(255, 255, 255, 0.2)'
                      : 'rgba(0, 0, 0, 0.1)',
                    backgroundColor: isDark
                      ? 'rgba(0, 0, 0, 0.25)'
                      : 'rgba(255, 255, 255, 0.5)',
                  },
                ]}
              >
                <Text
                  numberOfLines={1}
                  style={[styles.dropdownText, { color: isDark ? '#F1F5F9' : '#0F172A' }]}
                >
                  {selectedScript}
                </Text>
                <ChevronDown size={18} color={activeColor.hex} />
              </Pressable>
            </View>
          </View>

          {/* Dropdown Options List */}
          {dropdownOpen && (
            <View
              style={[
                styles.dropdownMenu,
                {
                  borderColor: activeColor.hex,
                  backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
                },
              ]}
            >
              {AVAILABLE_SCRIPTS.map((script) => (
                <Pressable
                  key={script}
                  onPress={() => {
                    setSelectedScript(script);
                    setDropdownOpen(false);
                  }}
                  style={styles.dropdownOption}
                >
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color:
                          selectedScript === script
                            ? activeColor.hex
                            : isDark
                            ? '#E2E8F0'
                            : '#1E293B',
                        fontWeight: selectedScript === script ? '700' : '500',
                      },
                    ]}
                  >
                    {script}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}

          {/* Action Row: Inject Button */}
          <View style={styles.injectActionRow}>
            <HighlightButton
              title={isInjected ? '⚡ 重新注入进程' : '⚡ 注入 (Inject)'}
              onPress={handleInject}
              glowColor={activeColor.hex}
            />
          </View>

          {/* Status Footer Bar */}
          <View
            style={[
              styles.panelStatusFooter,
              {
                borderColor: isDark
                  ? 'rgba(255, 255, 255, 0.12)'
                  : 'rgba(0, 0, 0, 0.08)',
              },
            ]}
          >
            <View style={styles.statusItem}>
              <Activity size={12} color={isInjected ? '#10B981' : '#F43F5E'} />
              <Text
                style={[
                  styles.statusText,
                  { color: isInjected ? '#10B981' : isDark ? '#94A3B8' : '#64748B' },
                ]}
              >
                {isInjected ? '已注入' : '未注入'}
              </Text>
            </View>

            <Text style={styles.statusDivider}>|</Text>

            <View style={styles.statusItem}>
              <Zap size={12} color={isRunning ? activeColor.hex : '#94A3B8'} />
              <Text
                style={[
                  styles.statusText,
                  { color: isRunning ? activeColor.hex : isDark ? '#94A3B8' : '#64748B' },
                ]}
              >
                {isRunning ? '运行中' : '未运行'}
              </Text>
            </View>

            <Text style={styles.statusDivider}>|</Text>

            <View style={styles.statusItem}>
              <Clock size={12} color={activeColor.hex} />
              <Text
                style={[
                  styles.statusText,
                  { color: isDark ? '#E2E8F0' : '#1E293B', fontWeight: '700' },
                ]}
              >
                {formatTimer(timerSeconds)}
              </Text>
            </View>
          </View>
        </GlassCard>

        {/* Feature Entry Cards */}
        <Text style={[styles.sectionTitle, { color: isDark ? '#F1F5F9' : '#0F172A' }]}>
          核心驱动功能
        </Text>

        <Pressable onPress={() => onNavigateTab('Scripts')}>
          <GlassCard style={styles.featureCard}>
            <View style={styles.cardHeaderRow}>
              <View
                style={[
                  styles.iconCircle,
                  { backgroundColor: activeColor.glowRgba },
                ]}
              >
                <Terminal size={20} color={activeColor.hex} />
              </View>
              <View
                style={[
                  styles.badgeTag,
                  { backgroundColor: activeColor.glowRgba, borderColor: activeColor.hex },
                ]}
              >
                <Text style={[styles.badgeText, { color: activeColor.hex }]}>
                  EXTERNAL RUNNER
                </Text>
              </View>
            </View>
            <Text style={[styles.cardTitle, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
              外部脚本注入控制台
            </Text>
            <Text style={[styles.cardSub, { color: isDark ? '#94A3B8' : '#64748B' }]}>
              支持一键清空、复制、粘贴自定义 Lua/JS 脚本文本与实时控制台日志排错。
            </Text>
          </GlassCard>
        </Pressable>

        <Pressable onPress={handleInject}>
          <GlassCard style={styles.featureCard}>
            <View style={styles.cardHeaderRow}>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
                <ShieldAlert size={20} color="#10B981" />
              </View>
              <View
                style={[
                  styles.badgeTag,
                  { backgroundColor: 'rgba(16, 185, 129, 0.2)', borderColor: '#10B981' },
                ]}
              >
                <Text style={[styles.badgeText, { color: '#10B981' }]}>
                  SYSTEM OVERLAY
                </Text>
              </View>
            </View>
            <Text style={[styles.cardTitle, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
              跨应用悬浮窗灵动岛
            </Text>
            <Text style={[styles.cardSub, { color: isDark ? '#94A3B8' : '#64748B' }]}>
              基于 Android WindowManager Native 模块悬浮桌面，内置多重脚本功能快捷开关。
            </Text>
          </GlassCard>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 100,
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  titleCol: {
    justifyContent: 'center',
  },
  appName: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  appSub: {
    fontSize: 11,
    fontWeight: '600',
  },
  menuBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hamburgerLines: {
    gap: 3.5,
    width: 16,
    alignItems: 'center',
  },
  line: {
    width: 16,
    height: 2,
    borderRadius: 1,
  },
  mainControlCard: {
    marginTop: 8,
  },
  panelTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  scriptSelectorCol: {
    flex: 1,
  },
  selectLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 4,
  },
  dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
  },
  dropdownText: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  dropdownMenu: {
    marginTop: 8,
    borderRadius: 14,
    borderWidth: 1.5,
    paddingVertical: 6,
  },
  dropdownOption: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 13,
  },
  injectActionRow: {
    marginTop: 18,
  },
  panelStatusFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 18,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusDivider: {
    color: 'rgba(255, 255, 255, 0.2)',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    marginTop: 24,
    marginBottom: 12,
  },
  featureCard: {
    marginBottom: 12,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardSub: {
    fontSize: 12,
    lineHeight: 18,
  },
});
