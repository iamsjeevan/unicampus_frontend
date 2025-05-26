// App.js
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './navigation/AppNavigator'; // Adjust path
import { AuthProvider } from './navigation/AuthContext'; // Adjust path
import { COLORS } from './consts/theme'; // Adjust path

// Optional: Ignore specific warnings if they appear during development
// LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

const customFonts = {
  'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'), // Adjust path
  'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'), // Adjust path
  'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'), // Adjust path
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFontsAsync = async () => {
    try {
      await Font.loadAsync(customFonts);
      setFontsLoaded(true);
    } catch (e) {
      console.warn("Font loading error:", e);
    }
  };

  useEffect(() => {
    loadFontsAsync();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.primary }}>
        <ActivityIndicator size="large" color={COLORS.accent || '#00BCD4'} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="auto" /> {/* 'auto' will adapt based on light/dark, or set explicitly in screens */}
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}