// components/NoticeItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Card from './Card';

const NoticeItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>Posted on: {item.date} by {item.postedBy}</Text>
        <Text style={styles.contentPreview} numberOfLines={2}>{item.content}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#007AFF' },
  date: { fontSize: 12, color: '#777', marginBottom: 8 },
  contentPreview: { fontSize: 14, color: '#444' },
});

export default NoticeItem;
