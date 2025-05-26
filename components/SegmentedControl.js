// components/SegmentedControl.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../consts/theme';

const SegmentedControl = ({ segments, activeIndex, onTabPress }) => {
  return (
    <View style={styles.container}>
      {segments.map((segment, index) => (
        <TouchableOpacity
          key={segment}
          style={[
            styles.segmentButton,
            activeIndex === index && styles.activeSegment,
          ]}
          onPress={() => onTabPress(index)}
        >
          <Text
            style={[
              styles.segmentText,
              activeIndex === index && styles.activeText,
            ]}
          >
            {segment}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.radiusS,
    marginHorizontal: SIZES.padding,
    marginVertical: SIZES.padding,
    overflow: 'hidden',
    //borderWidth: 1,
    //borderColor: COLORS.divider
  },
  segmentButton: {
    flex: 1,
    paddingVertical: SIZES.paddingS,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeSegment: {
    backgroundColor: COLORS.accent, // Or COLORS.secondary for a more subtle look
  },
  segmentText: {
    ...FONTS.h4,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  activeText: {
    color: COLORS.textOnAccent, // Or COLORS.textPrimary if active segment is subtle
    fontWeight: 'bold',
  },
});

export default SegmentedControl;
