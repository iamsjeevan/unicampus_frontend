// components/CommentListItem.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../consts/theme';

const CommentListItem = ({ comment }) => {
  return (
    <View style={styles.commentContainer}>
      <Image source={{ uri: comment.authorAvatar || 'https://via.placeholder.com/32' }} style={styles.avatar} />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={styles.authorName}>{comment.authorName}</Text>
          <Text style={styles.timestamp}>{comment.timestamp}</Text>
        </View>
        <Text style={styles.commentText}>{comment.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    paddingVertical: SIZES.paddingS,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: SIZES.paddingS,
    backgroundColor: COLORS.tertiary,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.paddingXS / 2,
  },
  authorName: {
    ...FONTS.h4,
    color: COLORS.textPrimary,
    fontSize: SIZES.body2, // Smaller for comments
  },
  timestamp: {
    ...FONTS.body4,
    color: COLORS.textTertiary,
  },
  commentText: {
    ...FONTS.body3,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
});

export default CommentListItem;
