// components/PostListItem.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../consts/theme';
import Card from './Card'; // Assuming Card component

const PostListItem = ({ post, onPress }) => {
  return (
    <Card style={styles.card} onPress={() => onPress(post)}>
      <View style={styles.header}>
        <Image source={{ uri: post.authorAvatar || 'https://via.placeholder.com/40' }} style={styles.avatar} />
        <View style={styles.authorInfo}>
          <Text style={styles.authorName}>{post.authorName}</Text>
          <Text style={styles.timestamp}>{post.timestamp}</Text>
        </View>
      </View>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.contentPreview} numberOfLines={3}>{post.contentPreview}</Text>
      {post.image && <Image source={{uri: post.image}} style={styles.postImage} />}
      <View style={styles.footer}>
        <View style={styles.actionItem}>
          <MaterialCommunityIcons name="arrow-up-bold-outline" size={20} color={COLORS.textSecondary} />
          <Text style={styles.actionText}>{post.upvotes}</Text>
        </View>
        <View style={styles.actionItem}>
          <MaterialCommunityIcons name="comment-outline" size={20} color={COLORS.textSecondary} />
          <Text style={styles.actionText}>{post.commentsCount}</Text>
        </View>
        {/* <View style={styles.actionItem}>
          <MaterialCommunityIcons name="share-variant-outline" size={20} color={COLORS.textSecondary} />
          <Text style={styles.actionText}>Share</Text>
        </View> */}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: SIZES.paddingS,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.paddingS,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SIZES.paddingS,
    backgroundColor: COLORS.tertiary,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    ...FONTS.h4,
    color: COLORS.textPrimary,
  },
  timestamp: {
    ...FONTS.body4,
    color: COLORS.textTertiary,
  },
  title: {
    ...FONTS.h3,
    color: COLORS.textHighlight,
    marginBottom: SIZES.paddingXS,
  },
  contentPreview: {
    ...FONTS.body2,
    color: COLORS.textSecondary,
    marginBottom: SIZES.paddingS,
    lineHeight: 20,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: SIZES.radiusS,
    marginBottom: SIZES.paddingS,
    backgroundColor: COLORS.tertiary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Changed from space-around
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    paddingTop: SIZES.paddingS,
    marginTop: SIZES.paddingXS,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SIZES.padding * 1.5, // Spacing between items
  },
  actionText: {
    ...FONTS.body3,
    color: COLORS.textSecondary,
    marginLeft: SIZES.paddingXS / 2,
  },
});

export default PostListItem;
