// screens/communities/CommunityDetailScreen.js
import React, { useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../../consts/theme';
import PostListItem from '../../components/PostListItem';
import { communities, getPopulatedPosts } from '../../data/communitySampleData';

const CommunityDetailScreen = ({ route, navigation }) => {
  const { communityId, communityName } = route.params;
  const community = communities.find(c => c.id === communityId);
  const posts = getPopulatedPosts(communityId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: communityName,
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: SIZES.padding }}
          onPress={() => navigation.navigate('CreatePost', { communityId, communityName })}
        >
          <MaterialCommunityIcons name="plus-circle-outline" size={28} color={COLORS.accent} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, communityName, communityId]);

  if (!community) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centeredMessage}>
          <Text style={styles.messageText}>Community not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const ListHeader = () => (
    <View>
      <Image source={typeof community.bannerImage === 'string' ? {uri: community.bannerImage} : community.bannerImage} style={styles.bannerImage} />
      <View style={styles.headerContent}>
        <Text style={styles.communityName}>{community.name}</Text>
        <Text style={styles.communityDescription}>{community.description}</Text>
        <Text style={styles.memberCount}>{community.memberCount} members</Text>
        {/* Add Join/Joined button here if needed */}
      </View>
      <Text style={styles.postsHeader}>Posts</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostListItem post={item} onPress={(post) => navigation.navigate('PostDetail', { postId: post.id, communityName: community.name })} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
            <View style={styles.centeredMessage}>
                <Text style={styles.messageText}>No posts yet. Be the first!</Text>
            </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  listContainer: {
    paddingBottom: SIZES.padding * 2,
  },
  bannerImage: {
    width: '100%',
    height: 150,
    backgroundColor: COLORS.tertiary,
  },
  headerContent: {
    padding: SIZES.padding,
    backgroundColor: COLORS.secondary,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  communityName: {
    ...FONTS.h2,
    color: COLORS.textPrimary,
    marginBottom: SIZES.paddingXS,
  },
  communityDescription: {
    ...FONTS.body3,
    color: COLORS.textSecondary,
    marginBottom: SIZES.paddingS,
    lineHeight: 18,
  },
  memberCount: {
    ...FONTS.body4,
    color: COLORS.textTertiary,
  },
  postsHeader: {
    ...FONTS.h3,
    color: COLORS.textPrimary,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding,
    paddingBottom: SIZES.paddingXS,
    backgroundColor: COLORS.primary, // To distinguish from card list
  },
  centeredMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.padding,
  },
  messageText: {
    ...FONTS.body1,
    color: COLORS.textTertiary,
  },
});

export default CommunityDetailScreen;
