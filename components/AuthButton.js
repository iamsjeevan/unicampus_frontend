// components/AuthButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, FONTS, SIZES } from '../consts/theme'; // Adjust path if needed

const AuthButton = ({ title, onPress, type = 'primary', loading = false, style, textStyle }) => {
  const buttonStyles = [styles.buttonBase];
  const currentTextStyles = []; // Renamed to avoid conflict

  if (type === 'primary') {
    buttonStyles.push(styles.primaryButton);
    currentTextStyles.push(FONTS.authButtonPrimary);
  } else if (type === 'secondary') {
    buttonStyles.push(styles.secondaryButton);
    currentTextStyles.push(FONTS.authButtonSecondary);
  }

  buttonStyles.push(style); // Allow custom styles
  currentTextStyles.push(textStyle);

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress} disabled={loading}>
      {loading ? (
        <ActivityIndicator color={type === 'primary' ? COLORS.buttonBlueText : COLORS.buttonBlue} />
      ) : (
        <Text style={currentTextStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SIZES.paddingXS,
    minHeight: 50,
  },
  primaryButton: {
    backgroundColor: COLORS.buttonBlue,
  },
  secondaryButton: {
    backgroundColor: COLORS.buttonLightSecondaryBackground,
    // borderWidth: 1, // Optional border for secondary
    // borderColor: COLORS.inputLightBorder,
  },
});

export default AuthButton;