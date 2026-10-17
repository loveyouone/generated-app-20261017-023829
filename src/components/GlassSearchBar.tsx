import React from 'react';
import { StyleSheet, View, TextInput, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { Search, X } from 'lucide-react-native';
import { useTheme } from '../theme/ThemeContext';

interface GlassSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const GlassSearchBar: React.FC<GlassSearchBarProps> = ({
  value,
  onChangeText,
  placeholder = '搜索组件或动效...',
}) => {
  const { isDark } = useTheme();

  return (
    <View style={styles.container}>
      <BlurView
        intensity={80}
        tint={isDark ? 'dark' : 'light'}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[
          styles.inner,
          {
            borderColor: isDark
              ? 'rgba(255, 255, 255, 0.25)'
              : 'rgba(255, 255, 255, 0.65)',
            backgroundColor: isDark
              ? 'rgba(15, 23, 42, 0.4)'
              : 'rgba(255, 255, 255, 0.5)',
          },
        ]}
      >
        <Search
          size={18}
          color={isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(15, 23, 42, 0.55)'}
          style={styles.searchIcon}
        />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={
            isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(15, 23, 42, 0.45)'
          }
          style={[
            styles.input,
            { color: isDark ? '#FFFFFF' : '#0F172A' },
          ]}
        />
        {value.length > 0 && (
          <Pressable onPress={() => onChangeText('')} style={styles.clearBtn}>
            <X size={16} color={isDark ? '#CBD5E1' : '#64748B'} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderRadius: 22,
    overflow: 'hidden',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 22,
    borderWidth: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    height: '100%',
  },
  clearBtn: {
    padding: 4,
  },
});
