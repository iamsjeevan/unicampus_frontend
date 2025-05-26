// components/ResultSubjectItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';
import { COLORS, FONTS, SIZES } from '../consts/theme';

const ResultSubjectItem = ({ subjectName, subjectCode, marks, totalMarks }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <View style={styles.subjectInfo}>
          <Text style={styles.subjectName} numberOfLines={2}>{subjectName}</Text>
          <Text style={styles.subjectCode}>{subjectCode}</Text>
        </View>
        <View style={styles.marksContainer}>
          <Text style={styles.marks}>{marks}</Text>
          <Text style={styles.totalMarks}>/{totalMarks}</Text>
        </View>
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
  marksContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  marks: {
    ...FONTS.h2,
    color: COLORS.accent,
    fontWeight: 'bold',
  },
  totalMarks: {
    ...FONTS.body2,
    color: COLORS.textSecondary,
    marginLeft: 2,
    paddingBottom: 2, // Align with baseline of marks
  },
});

export default ResultSubjectItem;
