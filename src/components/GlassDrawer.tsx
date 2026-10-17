import React from 'react';
import { StyleSheet, View, Text, Pressable, Modal, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { Home, Terminal, SlidersHorizontal, Info, X, Cpu, Zap, Shield } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';
import { YiyLogo } from './YiyLogo';

interface GlassDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tabKey: string) => void;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const DRAWER_WIDTH = Math.min(SCREEN_WIDTH * 0.8, 300);

export const GlassDrawer: React.FC<GlassDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const { activeColor, isDark } = useTheme();

  if (!isOpen) return null;

  const menuItems = [
    { key: 'Home', title: '首页 (Explore)', icon: Home },
    { key: 'Scripts', title: '注入 (Injection)', icon: Terminal },
    { key: 'Settings', title: '外观与材质设置 (Settings)', icon: SlidersHorizontal },
    { key: 'About', title: '关于 YIy注入 (About)', icon: Info },
  ];

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Pressable style={styles.backdropPressable} onPress={onClose} />

        {/* Drawer Panel pinned strictly to screen left edge */}
        <View style={[styles.drawerContainer, { width: DRAWER_WIDTH }]}>
          <BlurView
            intensity={98}
            tint={isDark ? 'dark' : 'light'}
            style={StyleSheet.absoluteFill}
          />

          <View
            style={[
              styles.drawerInner,
              {
                borderColor: isDark
                  ? 'rgba(255, 255, 255, 0.22)'
                  : 'rgba(255, 255, 255, 0.8)',
                backgroundColor: isDark
                  ? 'rgba(10, 15, 28, 0.92)'
                  : 'rgba(255, 255, 255, 0.92)',
              },
            ]}
          >
            {/* Drawer Header */}
            <View style={styles.headerRow}>
              <View style={styles.brandRow}>
                <YiyLogo size={40} color={activeColor.hex} />
                <View style={styles.brandTextCol}>
                  <Text style={[styles.brandTitle, { color: isDark ? '#FFFFFF' : '#0F172A' }]}>
                    YIy注入
                  </Text>
                  <Text style={[styles.brandSub, { color: activeColor.hex }]}>
                    Roblox 脚本注入器
                  </Text>
                </View>
              </View>

              <Pressable onPress={onClose} style={styles.closeBtn}>
                <X size={20} color={isDark ? '#E2E8F0' : '#1E293B'} />
              </Pressable>
            </View>

            {/* Menu Navigation List */}
            <View style={styles.menuList}>
              {menuItems.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <Pressable
                    key={item.key}
                    onPress={() => {
                      onNavigate(item.key);
                      onClose();
                    }}
                    style={({ pressed }) => [
                      styles.menuItem,
                      pressed && styles.menuItemPressed,
                      {
                        borderColor: isDark
                          ? 'rgba(255, 255, 255, 0.12)'
                          : 'rgba(0, 0, 0, 0.08)',
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.menuIconCircle,
                        { backgroundColor: activeColor.glowRgba },
                      ]}
                    >
                      <ItemIcon size={18} color={activeColor.hex} />
                    </View>
                    <Text
                      style={[
                        styles.menuItemText,
                        { color: isDark ? '#F1F5F9' : '#0F172A' },
                      ]}
                    >
                      {item.title}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {/* Drawer Footer Status */}
            <View
              style={[
                styles.drawerFooter,
                {
                  borderColor: isDark
                    ? 'rgba(255, 255, 255, 0.12)'
                    : 'rgba(0, 0, 0, 0.08)',
                },
              ]}
            >
              <View style={styles.footerStatusRow}>
                <Shield size={16} color={activeColor.hex} />
                <Text style={[styles.footerText, { color: isDark ? '#94A3B8' : '#64748B' }]}>
                  STATUS: ENGINE READY
                </Text>
              </View>
              <Text style={[styles.verText, { color: activeColor.hex }]}>
                v2.6 Liquid Glass Edition
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },
  backdropPressable: {
    ...StyleSheet.absoluteFillObject,
  },
  drawerContainer: {
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
    borderRightWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  drawerInner: {
    flex: 1,
    paddingTop: 54,
    paddingHorizontal: 18,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.12)',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandTextCol: {
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  brandSub: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  closeBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuList: {
    marginTop: 24,
    gap: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    gap: 14,
  },
  menuItemPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.98 }],
  },
  menuIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '600',
  },
  drawerFooter: {
    paddingTop: 16,
    borderTopWidth: 1,
    gap: 6,
  },
  footerStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  verText: {
    fontSize: 10,
    fontWeight: '600',
  },
});
