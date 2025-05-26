// components/AppHeader.js
import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '../consts/theme';

const AppHeader = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/images/ramaiah_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>RAMAIAH</Text>
        <Text style={styles.subtitle}>Institute of Technology</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.primary,
  },
  headerContainer: {
    paddingHorizontal: SIZES.padding,
    paddingTop: Platform.OS === 'ios' ? 0 : SIZES.paddingS, // Android might need more padding if not using SafeAreaView for status bar
    paddingBottom: SIZES.paddingS,
    alignItems: 'center', // Center logo and text block
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
  },
  logo: {
    width: 45,
    height: 45,
    marginRight: SIZES.paddingS,
  },
  title: {
    ...FONTS.h3,
    color: COLORS.textPrimary,
    fontWeight: 'bold', // Make sure bold is applied
  },
  subtitle: {
    ...FONTS.body4,
    color: COLORS.textSecondary,
    position: 'absolute',
    left: SIZES.padding + 45 + SIZES.paddingS, // Align under RAMAIAH
    bottom: SIZES.paddingS - 6, // Adjust for alignment
  },
});

export default AppHeader;
