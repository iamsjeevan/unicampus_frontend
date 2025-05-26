// components/PickerComponent.js
import React from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../consts/theme'; // Adjust path

const PickerComponent = ({ selectedValue, onValueChange, items, prompt, style, label }) => {
  return (
    <View style={[styles.outerContainer, style]}>
      {label && <Text style={styles.labelStyle}>{label}</Text>}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
          dropdownIconColor={Platform.OS !== 'ios' ? COLORS.textPrimary : COLORS.textTertiary}
          prompt={prompt} // Android only
          itemStyle={styles.pickerItemIOS} // For iOS item styling
        >
          {items.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
              color={Platform.OS !== 'ios' ? COLORS.textPrimary : undefined} // For Android item text color in dropdown
            />
          ))}
        </Picker>
        {Platform.OS === 'ios' && ( // Custom dropdown icon for iOS
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={COLORS.textTertiary}
            style={styles.iosPickerIcon}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: SIZES.padding,
    marginVertical: SIZES.paddingS,
  },
  labelStyle: {
    ...FONTS.body3,
    color: COLORS.textSecondary,
    marginBottom: SIZES.paddingXS / 2,
    marginLeft: SIZES.paddingXS, // Slight indent if desired
  },
  pickerContainer: {
    backgroundColor: COLORS.secondary, // Dark theme card/input background
    borderRadius: SIZES.radius,       // Match your input field radius
    borderWidth: 1,                   // Add border similar to your text inputs
    borderColor: COLORS.tertiary,     // Border color
    flexDirection: 'row',             // For iOS custom icon
    alignItems: 'center',             // For iOS custom icon
    paddingHorizontal: Platform.OS === 'ios' ? SIZES.paddingS : 0, // Padding for iOS
  },
  picker: {
    flex: 1,                          // Take available width
    height: 50,                       // Consistent height
    color: COLORS.textPrimary,        // Color of the selected item text
    // For Android, styling the dropdown items directly is hard,
    // they mostly follow system theme.
    // For iOS, itemStyle prop on Picker helps.
  },
  pickerItemIOS: { // Specific to iOS items in the dropdown
    ...FONTS.body1,
    color: COLORS.textPrimary, // Or textDarkPrimary if your iOS picker background is light
    height: 120, // Increase height of the item list area on iOS if needed
  },
  iosPickerIcon: { // Custom icon for iOS since dropdownIconColor is Android only
    position: 'absolute',
    right: SIZES.paddingS,
    // pointerEvents: 'none', // If it interferes with touch
  }
});

export default PickerComponent;