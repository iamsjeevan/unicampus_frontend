// components/AttendanceSubjectItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Card from './Card';
import { COLORS, FONTS, SIZES } from '../consts/theme';

const AttendanceSubjectItem = ({ subjectName, subjectCode, percentage, onPress }) => {
  const percentageColor = percentage >= 75 ? COLORS.chartGreen : percentage >= 50 ? COLORS.chartOrange : COLORS.chartRed;
  return (
    <Card style={styles.card} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.subjectInfo}>
          <Text style={styles.subjectName} numberOfLines={2}>{subjectName}</Text>
          <Text style={styles.subjectCode}>{subjectCode}</Text>
        </View>
        <Text style={[styles.percentageText, { color: percentageColor }]}>{percentage}%</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: SIZES.paddingS,
    paddingVertical: SIZES.paddingS,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectInfo: {
    flex: 1,
    marginRight: SIZES.paddingS,
  },
  subjectName: {
    ...FONTS.h4,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  subjectCode: {
    ...FONTS.body4,
    color: COLORS.textSecondary,
  },
  percentageText: {
    ...FONTS.h2,
    fontWeight: 'bold',
  },
});

export default AttendanceSubjectItem;
