// components/SettingsListItem.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../consts/theme';
import Card from './Card';

const SettingsListItem = ({ icon, iconColor = COLORS.accentRed, text, onPress, isSwitch, switchValue, onSwitchChange }) => {
  return (
    <Card style={styles.cardStyle} onPress={!isSwitch ? onPress : null}>
      <View style={styles.itemContainer}>
        {icon && <MaterialCommunityIcons name={icon} size={24} color={iconColor} style={styles.icon} />}
        <Text style={styles.text}>{text}</Text>
        {isSwitch ? (
          <Switch
            trackColor={{ false: COLORS.switchInactive, true: COLORS.switchActive }}
            thumbColor={switchValue ? COLORS.accent : COLORS.switchThumb}
            ios_backgroundColor={COLORS.switchInactive}
            onValueChange={onSwitchChange}
            value={switchValue}
          />
        ) : (
          onPress && <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.textSecondary} />
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    paddingVertical: SIZES.paddingS,
    paddingHorizontal: SIZES.padding,
    marginVertical: SIZES.paddingXS / 2,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: SIZES.padding,
  },
  text: {
    ...FONTS.body2,
    color: COLORS.textPrimary,
    flex: 1,
  },
});

export default SettingsListItem;
