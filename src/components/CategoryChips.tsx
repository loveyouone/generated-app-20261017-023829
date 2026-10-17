import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../theme/ThemeContext';

interface CategoryChipsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const { activeColor, isDark } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      style={styles.container}
    >
      {categories.map((category) => {
        const isSelected = category === selectedCategory;
        return (
          <Pressable
            key={category}
            onPress={() => onSelectCategory(category)}
            style={styles.chipWrapper}
          >
            <View
              style={[
                styles.chip,
                {
                  borderColor: isSelected
                    ? activeColor.hex
                    : isDark
                    ? 'rgba(255, 255, 255, 0.18)'
                    : 'rgba(255, 255, 255, 0.5)',
                  backgroundColor: isSelected
                    ? activeColor.hex
                    : isDark
                    ? 'rgba(15, 23, 42, 0.4)'
                    : 'rgba(255, 255, 255, 0.5)',
                },
              ]}
            >
              {!isSelected && (
                <BlurView
                  intensity={50}
                  tint={isDark ? 'dark' : 'light'}
                  style={StyleSheet.absoluteFill}
                />
              )}
              <Text
                style={[
                  styles.chipText,
                  {
                    color: isSelected
                      ? activeColor.id === 'white'
                        ? '#0F172A'
                        : '#FFFFFF'
                      : isDark
                      ? 'rgba(255, 255, 255, 0.8)'
                      : '#334155',
                    fontWeight: isSelected ? '700' : '500',
                  },
                ]}
              >
                {category}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    maxHeight: 44,
  },
  scrollContent: {
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  chipWrapper: {
    marginRight: 10,
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipText: {
    fontSize: 14,
  },
});
