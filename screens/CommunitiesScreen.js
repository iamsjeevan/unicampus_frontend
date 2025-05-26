// screens/CommunitiesScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { sampleCommunities } from '../data/sampleData';
import CommunityItem from '../components/CommunityItem';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const CommunitiesScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <CommunityItem
      item={item}
      onPress={() => navigation.navigate('CommunityDetail', { communityId: item.id, communityName: item.name })}
    />
  );

  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.header}>College Communities</Text>
            <TouchableOpacity style={styles.createButton} onPress={() => alert('Create new community - TBD')}>
                <MaterialCommunityIcons name="plus-circle-outline" size={28} color="#007AFF" />
            </TouchableOpacity>
        </View>
      {sampleCommunities.length > 0 ? (
        <FlatList
          data={sampleCommunities}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
         <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No communities found. Be the first to create one!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    flex: 1, // Allow text to take available space
    textAlign: 'center', // Center text within its flex space
    marginLeft: 30, // Adjust for icon on right
  },
  createButton: {
    padding: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
  },
});

export default CommunitiesScreen;
