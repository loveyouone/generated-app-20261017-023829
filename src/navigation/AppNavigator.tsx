import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DynamicBlobBackground } from '../components/DynamicBlobBackground';
import { FloatingTabBar } from '../components/FloatingTabBar';
import { DynamicIslandOverlay } from '../components/DynamicIslandOverlay';
import { HomeScreen } from '../screens/HomeScreen';
import { ScriptsScreen } from '../screens/ScriptsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { AboutScreen } from '../screens/AboutScreen';

export const AppNavigator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Home');
  const [isIslandVisible, setIsIslandVisible] = useState<boolean>(false);

  const renderScreen = () => {
    switch (activeTab) {
      case 'Home':
        return (
          <HomeScreen
            onNavigateTab={setActiveTab}
            onInjectSuccess={() => setIsIslandVisible(true)}
          />
        );
      case 'Scripts':
        return <ScriptsScreen />;
      case 'Settings':
        return <SettingsScreen />;
      case 'About':
        return <AboutScreen />;
      default:
        return (
          <HomeScreen
            onNavigateTab={setActiveTab}
            onInjectSuccess={() => setIsIslandVisible(true)}
          />
        );
    }
  };

  return (
    <DynamicBlobBackground>
      <View style={styles.container}>
        {/* System Overlay Dynamic Island (Hidden initially, visible post injection) */}
        <DynamicIslandOverlay isVisible={isIslandVisible} />

        {/* Active Screen View */}
        <View style={styles.screenContainer}>{renderScreen()}</View>

        {/* Bottom Floating Glass Capsule TabBar */}
        <FloatingTabBar activeTab={activeTab} onTabChange={setActiveTab} />
      </View>
    </DynamicBlobBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
});
