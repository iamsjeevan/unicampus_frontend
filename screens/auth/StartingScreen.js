// screens/auth/StartingScreen.js
import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '../../consts/theme'; // Adjust path
import AuthButton from '../../components/AuthButton'; // Adjust path

const StartingScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.backgroundLight} />
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>UniCampus</Text>
          <Text style={styles.subtitle}>Your Digital Campus Companion</Text>

          <AuthButton
            title="Student Login"
            type="primary"
            onPress={() => navigation.navigate('StudentLogin')}
            style={styles.button}
          />
          <AuthButton
            title="Admin Login"
            type="secondary"
            onPress={() => alert('Admin Login TBD')} // Replace with navigation later
            style={styles.button}
          />
          <AuthButton
            title="Register"
            type="secondary"
            onPress={() => alert('Register TBD')} // Replace with navigation later
            style={styles.button}
          />
        </View>
        <Text style={styles.footerText}>© 2025 UniCampus</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding * 1.5,
    paddingVertical: SIZES.padding,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    maxWidth: 400,
  },
  title: {
    ...FONTS.authTitle,
    fontSize: SIZES.largeTitle + 4,
    marginBottom: SIZES.paddingXS,
  },
  subtitle: {
    ...FONTS.authSubtitle,
    marginBottom: SIZES.padding * 3,
  },
  button: {
    marginVertical: SIZES.paddingS,
  },
  footerText: {
    ...FONTS.authFooter,
    paddingBottom: SIZES.padding,
  },
});

export default StartingScreen;