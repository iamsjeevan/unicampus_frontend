// components/TabBarIcon.js
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../consts/theme';

const TabBarIcon = ({ name, focused, size }) => {
  return (
    <MaterialCommunityIcons
      name={name}
      size={size || 26}
      color={focused ? COLORS.tabBarActive : COLORS.tabBarInactive}
    />
  );
};
export default TabBarIcon;
