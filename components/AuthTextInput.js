// components/AuthTextInput.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../consts/theme'; // Adjust path if needed

const AuthTextInput = ({
  iconName,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  containerStyle,
  ...props
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  return (
    <View style={[styles.container, containerStyle]}>
      {iconName && (
        <MaterialCommunityIcons name={iconName} size={22} color={COLORS.inputIconLight} style={styles.icon} />
      )}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={COLORS.inputLightPlaceholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!isPasswordVisible && secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        {...props}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIconContainer}>
          <MaterialCommunityIcons
            name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={22}
            color={COLORS.inputIconLight}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputLightBackground,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.inputLightBorder,
    paddingHorizontal: SIZES.paddingS,
    marginVertical: SIZES.paddingXS,
    minHeight: 50,
  },
  icon: {
    marginRight: SIZES.paddingXS,
  },
  input: {
    flex: 1,
    // Use a specific font style if FONTS.body1 from dark theme doesn't fit
    fontFamily: FONTS.body1.fontFamily, // Assuming Inter-Regular
    fontSize: SIZES.h4, // Match button font size
    color: COLORS.textDarkPrimary,
    paddingVertical: SIZES.paddingS - 2,
  },
  eyeIconContainer: {
    padding: SIZES.paddingXS,
  },
});

export default AuthTextInput;