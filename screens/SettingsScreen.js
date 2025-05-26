// screens/SettingsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '../consts/theme';
import SettingsListItem from '../components/SettingsListItem';
import Card from '../components/Card';
import { settingsOptions } from '../data/appSampleData';

const SettingsScreen = ({ navigation }) => {
  const [appSettings, setAppSettings] = useState({
    isDarkMode: true, // Default to dark mode as per app theme
    // ... other settings
  });

  const handleSwitchChange = (key, value) => {
    setAppSettings(prev => ({ ...prev, [key]: value }));
    if (key === 'isDarkMode') {
      // Here you would typically trigger a theme change in your app
      alert(`Dark Mode ${value ? 'Enabled' : 'Disabled'}`);
    }
  };

  const handleItemPress = (item) => {
    if (item.type === 'navigate') {
      // navigation.navigate(item.screen);
      alert(`Navigate to ${item.text}`);
    } else if (item.type === 'action') {
      if (item.action === 'syncData') {
        alert('Syncing data...');
      }
    } else if (item.link) {
        Linking.openURL(item.link).catch(err => console.error("Couldn't load page", err));
    } else {
        alert(`Action: ${item.text}`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {settingsOptions.map((item) => (
          <SettingsListItem
            key={item.id}
            icon={item.icon}
            iconColor={item.iconColor || COLORS.accentRed}
            text={item.text}
            onPress={() => handleItemPress(item)}
            isSwitch={item.type === 'switch'}
            switchValue={item.type === 'switch' ? appSettings[item.stateKey] : undefined}
            onSwitchChange={(value) => item.type === 'switch' && handleSwitchChange(item.stateKey, value)}
          />
        ))}

        <TouchableOpacity
          style={styles.signOutButtonCard}
          onPress={() => alert('Sign Out Pressed')}
        >
          <Text style={styles.signOutButtonText}>Sign out</Text>
        </TouchableOpacity>
        <View style={{height: SIZES.padding}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    paddingTop: SIZES.paddingS, // Add some top padding
  },
  signOutButtonCard: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.padding,
    marginHorizontal: SIZES.padding,
    marginTop: SIZES.padding * 1.5,
    alignItems: 'center',
    ...COLORS.cardShadow, // Apply shadow
    elevation: COLORS.cardElevation,
  },
  signOutButtonText: {
    ...FONTS.h3,
    color: COLORS.accentRed, // Or textPrimary if you prefer
    fontWeight: '600',
  },
});

export default SettingsScreen;
