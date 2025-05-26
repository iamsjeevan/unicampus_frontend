// components/ResultItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';

const ResultItem = ({ item }) => {
  return (
    <Card>
      <Text style={styles.semester}>{item.semester}</Text>
      <Text style={styles.gpa}>SGPA: {item.sgpa} | CGPA: {item.cgpa}</Text>
      <View style={styles.subjectsContainer}>
        <Text style={styles.subjectHeader}>Subjects:</Text>
        {item.subjects.map(sub => (
          <Text key={sub.id} style={styles.subjectDetail}>
            - {sub.name}: {sub.grade} (Credits: {sub.credits})
          </Text>
        ))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  semester: { fontSize: 20, fontWeight: 'bold', marginBottom: 5, color: '#333' },
  gpa: { fontSize: 16, fontWeight: '600', color: '#007AFF', marginBottom: 10 },
  subjectsContainer: { marginTop: 5 },
  subjectHeader: { fontSize: 15, fontWeight: 'bold', color: '#555', marginBottom: 3},
  subjectDetail: { fontSize: 14, color: '#666', marginLeft: 10 },
});

export default ResultItem;
