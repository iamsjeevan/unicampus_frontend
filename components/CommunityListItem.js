// components/CommunityListItem.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../consts/theme';
import Card from './Card'; // Assuming Card component is in the same directory or adjust path

const CommunityListItem = ({ community, onPress }) => {
  return (
    <Card style={styles.card} onPress={() => onPress(community)}>
        <Image source={{uri: community.bannerImage || 'https://via.placeholder.com/300x100.png?text=Community'}} style={styles.bannerImage} />
        <View style={styles.content}>
            <View style={styles.header}>
                {community.icon ? (
                     <MaterialCommunityIcons name={community.icon} size={28} color={COLORS.accent} style={styles.communityIcon} />
                ) : (
                    <View style={styles.iconPlaceholder} /> // Placeholder if no icon
                )}
                <Text style={styles.name}>{community.name}</Text>
            </View>
            <Text style={styles.description} numberOfLines={2}>{community.description}</Text>
            <Text style={styles.members}>{community.memberCount} members</Text>
        </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: SIZES.padding,
    padding: 0, // Card handles its own padding, we want image flush
    overflow: 'hidden', // To clip banner image corners
  },
  bannerImage: {
    width: '100%',
    height: 100, // Adjust as needed
    backgroundColor: COLORS.tertiary,
  },
  content: {
    padding: SIZES.paddingS,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.paddingXS,
  },
  communityIcon: {
    marginRight: SIZES.paddingS,
  },
  iconPlaceholder: {
    width: 28,
    height: 28,
    marginRight: SIZES.paddingS,
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.radiusS,
  },
  name: {
    ...FONTS.h3,
    color: COLORS.textPrimary,
    flex: 1,
  },
  description: {
    ...FONTS.body3,
    color: COLORS.textSecondary,
    marginBottom: SIZES.paddingXS,
    lineHeight: 18,
  },
  members: {
    ...FONTS.body4,
    color: COLORS.textTertiary,
  },
});

export default CommunityListItem;
