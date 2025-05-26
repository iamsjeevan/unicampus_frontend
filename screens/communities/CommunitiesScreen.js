// screens/communities/CommunitiesScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../../consts/theme';
import CommunityListItem from '../../components/CommunityListItem';
import { communities as sampleCommunities } from '../../data/communitySampleData'; // Renamed to avoid conflict

const CommunitiesScreen = ({ navigation }) => {
  const navigateToCommunityDetail = (community) => {
    navigation.navigate('CommunityDetail', { communityId: community.id, communityName: community.name });
  };

  const renderHeader = () => (
    <View style={styles.headerActions}>
        {/* Could add a search bar here */}
        <TouchableOpacity style={styles.createButton} onPress={() => alert('Create Community TBD')}>
            <MaterialCommunityIcons name="plus-circle-outline" size={28} color={COLORS.accent} />
            <Text style={styles.createButtonText}>New Community</Text>
        </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={sampleCommunities}
        renderItem={({ item }) => <CommunityListItem community={item} onPress={navigateToCommunityDetail} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContentContainer}
        // ListHeaderComponent={renderHeader} // Optional: If you want actions above list
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  listContentContainer: {
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.paddingS,
    paddingBottom: SIZES.padding * 2, // For bottom tab bar
  },
  headerActions: {
    marginBottom: SIZES.padding,
    alignItems: 'flex-end',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.paddingXS,
    paddingHorizontal: SIZES.paddingS,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radiusS,
  },
  createButtonText: {
    ...FONTS.h4,
    color: COLORS.accent,
    marginLeft: SIZES.paddingXS,
  },
});

export default CommunitiesScreen;
