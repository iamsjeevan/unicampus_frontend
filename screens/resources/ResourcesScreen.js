// screens/resources/ResourcesScreen.js
import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../../consts/theme'; // Adjust path
import PickerComponent from '../../components/PickerComponent'; // Adjust path
import ResourceListItem from '../../components/ResourceListItem'; // Adjust path
import SegmentedControl from '../../components/SegmentedControl'; // Assuming you have this from previous steps
import { semesters, resourceTabs, resources as allResources } from '../../data/resourceSampleData'; // Adjust path

const screenWidth = Dimensions.get('window').width;

const ResourcesScreen = ({ navigation }) => {
  const [selectedSemester, setSelectedSemester] = useState(semesters[0].value); // Default to 'All Semesters'
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const currentTabId = resourceTabs[activeTabIndex].id;

  const filteredResources = useMemo(() => {
    let items = allResources[currentTabId] || [];
    if (selectedSemester !== 'all') {
      items = items.filter(item => item.semester === selectedSemester || item.semester === 'all');
    }
    return items;
  }, [selectedSemester, currentTabId]);

  // If you don't have SegmentedControl or prefer a simple horizontal scroll for tabs:
  const renderTab = (tab, index) => (
    <TouchableOpacity
      key={tab.id}
      style={[
        styles.tabItem,
        activeTabIndex === index && styles.activeTabItem,
      ]}
      onPress={() => setActiveTabIndex(index)}
    >
      <Text style={[styles.tabText, activeTabIndex === index && styles.activeTabText]}>
        {tab.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <PickerComponent
        label="Filter by Semester"
        selectedValue={selectedSemester}
        onValueChange={(itemValue) => setSelectedSemester(itemValue)}
        items={semesters}
      />

      {/* Option 1: Using your existing SegmentedControl (if it fits 4 tabs well) */}
      <SegmentedControl
         segments={resourceTabs.map(t => t.title)}
         activeIndex={activeTabIndex}
         onTabPress={setActiveTabIndex}
         // style={styles.segmentedControlStyle} // Add custom styling if needed
      />

      {/* Option 2: Simple Scrollable Tabs (Uncomment if SegmentedControl doesn't work well)
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
          {resourceTabs.map(renderTab)}
        </ScrollView>
      </View>
      */}

      <FlatList
        data={filteredResources}
        renderItem={({ item }) => <ResourceListItem resource={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="folder-information-outline" size={60} color={COLORS.textTertiary} />
            <Text style={styles.emptyText}>No resources found.</Text>
            <Text style={styles.emptySubText}>Try adjusting filters or check back later.</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.addResourceButton}
        onPress={() => alert('Navigate to Add Resource Screen (TBD)')}
      >
        <MaterialCommunityIcons name="plus" size={24} color={COLORS.buttonBlueText} />
        <Text style={styles.addResourceButtonText}>Add Resource</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary, // Dark theme background
  },
  // Styles for Option 2: Simple Scrollable Tabs
  tabContainer: {
    height: 50, // Adjust as needed
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.paddingS,
  },
  tabsScroll: {
    alignItems: 'center',
  },
  tabItem: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.paddingS,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.accent, // Or your tab active color
  },
  tabText: {
    ...FONTS.h4,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  activeTabText: {
    color: COLORS.accent, // Or your tab active text color
    fontWeight: 'bold',
  },
  // End Styles for Option 2

  listContentContainer: {
    paddingHorizontal: SIZES.padding,
    paddingBottom: 100, // Space for Add Resource button
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SIZES.height * 0.15, // Push down a bit
  },
  emptyText: {
    ...FONTS.h3,
    color: COLORS.textTertiary,
    marginTop: SIZES.paddingS,
  },
  emptySubText: {
    ...FONTS.body2,
    color: COLORS.textTertiary,
    marginTop: SIZES.paddingXS,
    textAlign: 'center',
    paddingHorizontal: SIZES.padding * 2,
  },
  addResourceButton: {
    position: 'absolute',
    bottom: SIZES.padding * 1.5, // Adjust as needed for tab bar height too
    left: SIZES.padding,
    right: SIZES.padding,
    backgroundColor: COLORS.buttonBlue, // Using the light theme button color
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.padding,
    borderRadius: SIZES.radius,
    ...COLORS.cardShadow, // If you want shadow
    elevation: COLORS.cardElevation,
  },
  addResourceButtonText: {
    ...FONTS.h4,
    color: COLORS.buttonBlueText, // Text color for the blue button
    fontWeight: 'bold',
    marginLeft: SIZES.paddingXS,
  },
});

export default ResourcesScreen;