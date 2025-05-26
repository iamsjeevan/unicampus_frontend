// components/PostItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from './Card';

const PostItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.author}>by {item.author} - {item.timestamp}</Text>
        <Text style={styles.contentPreview} numberOfLines={3}>{item.content}</Text>
        <View style={styles.footer}>
          <View style={styles.metric}>
            <MaterialCommunityIcons name="arrow-up-bold-outline" size={18} color="#555" />
            <Text style={styles.metricText}>{item.upvotes}</Text>
          </View>
          <View style={styles.metric}>
            <MaterialCommunityIcons name="comment-outline" size={18} color="#555" />
            <Text style={styles.metricText}>{item.commentsCount}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 4, color: '#007AFF' },
  author: { fontSize: 12, color: '#777', marginBottom: 8 },
  contentPreview: { fontSize: 14, color: '#444', marginBottom: 10, lineHeight: 20 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
    marginTop: 8,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metricText: {
    marginLeft: 5,
    fontSize: 13,
    color: '#555',
  },
});

export default PostItem;
