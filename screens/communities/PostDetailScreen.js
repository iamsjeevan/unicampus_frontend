// screens/communities/PostDetailScreen.js
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../../consts/theme';
import CommentListItem from '../../components/CommentListItem';
import { posts as allPostsData, getPopulatedComments, users } from '../../data/communitySampleData'; // Ensure correct import

const PostDetailScreen = ({ route, navigation }) => {
  const { postId, communityName } = route.params;
  // Find the post from allPostsData
  let post = null;
  for (const key in allPostsData) {
      const found = allPostsData[key].find(p => p.id === postId);
      if (found) {
          post = {
            ...found,
            authorName: users[found.authorId]?.name || 'Unknown User',
            authorAvatar: users[found.authorId]?.avatarUrl,
          };
          break;
      }
  }
  const comments = getPopulatedComments(postId);
  const [newComment, setNewComment] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({ title: post?.title || communityName || 'Post' });
  }, [navigation, post, communityName]);

  if (!post) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centeredMessage}>
          <Text style={styles.messageText}>Post not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    alert(`Comment: ${newComment}\n(This would be sent to a backend)`);
    // In a real app, you'd add to local state and/or send to backend
    // For demo, we're not updating the sampleData directly.
    setNewComment('');
  };

  const ListHeader = () => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: post.authorAvatar || 'https://via.placeholder.com/40' }} style={styles.avatar} />
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{post.authorName}</Text>
          <Text style={styles.timestamp}>{post.timestamp}</Text>
        </View>
      </View>
      <Text style={styles.title}>{post.title}</Text>
      {post.image && <Image source={{uri: post.image}} style={styles.postImage} />}
      <Text style={styles.fullContent}>{post.fullContent || post.contentPreview}</Text>
      <View style={styles.postFooter}>
        <View style={styles.actionItem}>
          <MaterialCommunityIcons name="arrow-up-bold" size={22} color={COLORS.textSecondary} />
          <Text style={styles.actionText}>{post.upvotes}</Text>
        </View>
        {/* Add downvote, share etc. */}
      </View>
      <Text style={styles.commentsHeader}>Comments ({comments.length})</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0} // Adjust as needed
      >
        <FlatList
          data={comments}
          renderItem={({ item }) => <CommentListItem comment={item} />}
          keyExtractor={item => item.id}
          ListHeaderComponent={ListHeader}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
              !post ? null : // If post is null, already handled
              <View style={styles.postCard}>
                <Text style={styles.noCommentsText}>No comments yet. Be the first!</Text>
              </View>
          )}
        />
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Write a comment..."
            placeholderTextColor={COLORS.textTertiary}
            value={newComment}
            onChangeText={setNewComment}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleAddComment}>
            <MaterialCommunityIcons name="send" size={24} color={COLORS.textOnAccent} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  listContainer: {
    paddingBottom: SIZES.padding, // Space for comment input
  },
  postCard: {
    backgroundColor: COLORS.secondary,
    padding: SIZES.padding,
    // No margin as it's the main content area
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.paddingS,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: SIZES.paddingS,
    backgroundColor: COLORS.tertiary,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    ...FONTS.h3,
    color: COLORS.textPrimary,
  },
  timestamp: {
    ...FONTS.body4,
    color: COLORS.textTertiary,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.textHighlight,
    marginBottom: SIZES.paddingS,
  },
  postImage: {
    width: '100%',
    height: 220,
    borderRadius: SIZES.radiusS,
    marginBottom: SIZES.padding,
    backgroundColor: COLORS.tertiary,
  },
  fullContent: {
    ...FONTS.body1,
    color: COLORS.textPrimary,
    lineHeight: 22,
    marginBottom: SIZES.padding,
  },
  postFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.paddingS,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.divider,
    marginBottom: SIZES.padding,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SIZES.padding * 1.5,
  },
  actionText: {
    ...FONTS.body2,
    color: COLORS.textSecondary,
    marginLeft: SIZES.paddingXS,
  },
  commentsHeader: {
    ...FONTS.h3,
    color: COLORS.textPrimary,
    marginBottom: SIZES.paddingS,
  },
  noCommentsText: {
    ...FONTS.body2,
    color: COLORS.textTertiary,
    textAlign: 'center',
    paddingVertical: SIZES.padding,
  },
  commentInputContainer: {
    flexDirection: 'row',
    padding: SIZES.paddingS,
    backgroundColor: COLORS.secondary,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    backgroundColor: COLORS.inputBackground,
    borderRadius: SIZES.radiusS,
    paddingHorizontal: SIZES.paddingS,
    paddingVertical: SIZES.paddingXS,
    marginRight: SIZES.paddingS,
    ...FONTS.body2,
    color: COLORS.textPrimary,
    minHeight: 40,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: COLORS.accent,
    borderRadius: SIZES.radiusS,
    padding: SIZES.paddingXS + 2,
    justifyContent: 'center',
    alignItems: 'center',
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

export default PostDetailScreen;
