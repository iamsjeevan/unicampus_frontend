// components/CommunityItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from './Card';

const CommunityItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card style={styles.communityCard}>
        <MaterialCommunityIcons name={item.icon || 'account-group-outline'} size={24} color="#007AFF" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description} numberOfLines={1}>{item.description}</Text>
          <Text style={styles.members}>{item.members} members</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  communityCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  name: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  description: { fontSize: 13, color: '#666', marginVertical: 2 },
  members: { fontSize: 12, color: '#888' },
});

export default CommunityItem;
