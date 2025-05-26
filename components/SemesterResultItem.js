// components/SemesterResultItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';
import { COLORS, FONTS, SIZES } from '../consts/theme';

const SemesterResultItem = ({ semester, gpa }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.semesterText}>{semester}</Text>
        <Text style={styles.gpaText}>{gpa.toFixed(2)}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: SIZES.paddingS,
    paddingVertical: SIZES.padding,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  semesterText: {
    ...FONTS.h4,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  gpaText: {
    ...FONTS.h3,
    color: COLORS.accent,
    fontWeight: 'bold',
  },
});

export default SemesterResultItem;
