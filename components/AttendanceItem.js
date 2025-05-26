// components/AttendanceItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';

const AttendanceItem = ({ item }) => {
  const percentage = ((item.attendedClasses / item.totalClasses) * 100).toFixed(1);
  const barWidth = `${percentage}%`;
  const barColor = percentage >= 75 ? '#4CAF50' : percentage >= 50 ? '#FFC107' : '#F44336';

  return (
    <Card>
      <Text style={styles.subjectName}>{item.subjectName}</Text>
      <Text style={styles.details}>Attended: {item.attendedClasses} / {item.totalClasses}</Text>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: barWidth, backgroundColor: barColor }]} />
      </View>
      <Text style={[styles.percentage, { color: barColor }]}>{percentage}%</Text>
    </Card>
  );
};

const styles = StyleSheet.create({
  subjectName: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#333' },
  details: { fontSize: 14, color: '#555', marginBottom: 8 },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  percentage: { fontSize: 14, fontWeight: 'bold', textAlign: 'right' },
});

export default AttendanceItem;
