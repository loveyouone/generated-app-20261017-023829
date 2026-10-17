import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Droplets, Code2, Cpu, Sparkles, Layers, ShieldCheck, Heart } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { GlassCard } from '../components/GlassCard';

export const AboutScreen: React.FC = () => {
  const { activeColor, isDark } = useTheme();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Brand Header */}
      <View style={styles.brandContainer}>
        <View style={[styles.logoBg, { backgroundColor: activeColor.glowRgba, borderColor: activeColor.hex }]}>
          <Droplets size={44} color={activeColor.hex} />
        </View>
        <Text style={[styles.appName, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
          Liquid Glass
        </Text>
        <View style={[styles.versionBadge, { backgroundColor: activeColor.glowRgba }]}>
          <Text style={[styles.versionText, { color: activeColor.hex }]}>
            版本 v2.6 Pro Showcase
          </Text>
        </View>
        <Text style={[styles.appDesc, { color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(15,23,42,0.7)' }]}>
          纯前端高刷新率 iOS 26 美学 UI/UX 展示原型
        </Text>
      </View>

      {/* 架构亮点 */}
      <GlassCard style={{ marginTop: 10 }}>
        <View style={styles.cardHeaderRow}>
          <View style={[styles.iconBox, { backgroundColor: activeColor.glowRgba }]}>
            <Cpu size={20} color={activeColor.hex} />
          </View>
          <Text style={[styles.badgeText, { color: activeColor.hex }]}>架构技术栈</Text>
        </View>
        <Text style={[styles.cardTitle, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
          零 API 依赖 & 纯前端渲染
        </Text>

        <View style={styles.specList}>
          {[
            { icon: Sparkles, title: 'iOS 26 美学语言', desc: '高透光折射，高斯模糊与多重物理阴影' },
            { icon: Layers, title: 'Reanimated v3', desc: '60fps/120fps 弹簧物理与 Ease-Out-Back 微缩放手感' },
            { icon: ShieldCheck, title: '原生 Android 悬浮窗', desc: 'TYPE_APPLICATION_OVERLAY 跨应用灵动岛' },
            { icon: Code2, title: '零 API 外部依赖', desc: '完全本地离线 Mock 数据，无登录无后端需求' },
          ].map((spec, i) => {
            const SpecIcon = spec.icon;
            return (
              <View key={i} style={styles.specRow}>
                <View style={[styles.miniIconBg, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
                  <SpecIcon size={16} color={activeColor.hex} />
                </View>
                <View style={styles.specTextCol}>
                  <Text style={[styles.specTitle, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                    {spec.title}
                  </Text>
                  <Text style={[styles.specDesc, { color: isDark ? 'rgba(255,255,255,0.65)' : 'rgba(15,23,42,0.65)' }]}>
                    {spec.desc}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </GlassCard>

      {/* 底部 Footer */}
      <View style={styles.footerContainer}>
        <View style={styles.heartRow}>
          <Text style={[styles.footerText, { color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(15,23,42,0.5)' }]}>
            Liquid Glass UI Prototype • Pure Frontend Showcase
          </Text>
        </View>
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  brandContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  logoBg: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  appName: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -0.8,
  },
  versionBadge: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 14,
    marginVertical: 8,
  },
  versionText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  appDesc: {
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 20,
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
    marginBottom: 12,
  },
  specList: {
    gap: 12,
  },
  specRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  miniIconBg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  specTextCol: {
    flex: 1,
  },
  specTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  specDesc: {
    fontSize: 12,
    marginTop: 2,
  },
  footerContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  heartRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontWeight: '500',
  },
  bottomSpacer: {
    height: 110,
  },
});
