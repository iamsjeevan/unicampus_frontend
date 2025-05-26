// components/Card.js
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { COLORS, SIZES } from '../consts/theme';

const Card = ({ children, style, onPress, activeOpacity }) => {
  const cardStyle = [
    styles.card,
    Platform.OS === 'ios' ? COLORS.cardShadow : {},
    style,
  ];

  if (onPress) {
    const { TouchableOpacity } = require('react-native'); // Lazy load for web compatibility
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={activeOpacity || 0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginVertical: SIZES.paddingXS,
    marginHorizontal: SIZES.padding, // Consistent horizontal margin
    //borderWidth: 1, // Optional: if you want a very subtle border
    //borderColor: COLORS.cardBorder,
    elevation: Platform.OS === 'android' ? COLORS.cardElevation : 0,
  },
});

export default Card;
