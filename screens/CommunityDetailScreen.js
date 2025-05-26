// screens/CommunityDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { samplePosts } from '../data/sampleData';
import PostItem from '../components/PostItem';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CommunityDetailScreen = ({ route, navigation }) => {
  const { communityId, communityName } = route.params;
  const posts = samplePosts[communityId] || [];

  React.useLayoutEffect(() => {
    navigation.setOptions({ 
        title: communityName,
        headerRight: () => (
             <TouchableOpacity onPress={() => alert('New Post - TBD')} style={{ marginRight: 15 }}>
                <MaterialCommunityIcons name="plus-circle-outline" size={26} color="#007AFF" />
            </TouchableOpacity>
        )
    });
  }, [navigation, communityName]);

  const renderItem = ({ item }) => (
    <PostItem
      item={item}
      onPress={() => navigation.navigate('PostDetail', { postId: item.id, postTitle: item.title })}
    />
  );

  return (
    <View style={styles.container}>
      {posts.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No posts in this community yet. Be the first to post!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' }, // Slightly different background
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

export default CommunityDetailScreen;
