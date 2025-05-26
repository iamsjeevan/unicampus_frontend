// screens/auth/StudentLoginScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '../../consts/theme'; // Adjust path
import AuthButton from '../../components/AuthButton'; // Adjust path
import AuthTextInput from '../../components/AuthTextInput'; // Adjust path
import { useAuth } from '../../navigation/AuthContext'; // Adjust path

const StudentLoginScreen = ({ navigation }) => {
  const [emailOrUsn, setEmailOrUsn] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = () => {
    if (!emailOrUsn.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both Email/USN and Password.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (emailOrUsn.toLowerCase() === 'student' && password === 'password') {
        signIn();
      } else {
        Alert.alert('Login Failed', 'Invalid credentials. (Hint: student / password)');
      }
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.backgroundLight} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <AuthTextInput
            iconName="account-outline"
            placeholder="Email or USN"
            value={emailOrUsn}
            onChangeText={setEmailOrUsn}
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={styles.inputField}
          />
          <AuthTextInput
            iconName="lock-outline"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            containerStyle={styles.inputField}
          />
          <AuthButton
            title="Login"
            type="primary"
            onPress={handleLogin}
            loading={loading}
            style={styles.loginButton}
          />
          <TouchableOpacity onPress={() => alert('Forgot Password TBD')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: SIZES.padding * 1.5,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  inputField: {
    marginBottom: SIZES.padding, // Add space between input fields
  },
  loginButton: {
    marginTop: SIZES.padding * 1.5,
  },
  forgotPasswordText: {
    ...FONTS.authLink,
    textAlign: 'center',
    marginTop: SIZES.padding * 1.5,
  },
});

export default StudentLoginScreen;