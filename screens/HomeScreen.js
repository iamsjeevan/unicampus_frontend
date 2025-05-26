// screens/HomeScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '../consts/theme';
import AppHeader from '../components/AppHeader';
import Card from '../components/Card';
import { userProfile, proctorAnnouncements, clubsAndAcademics } from '../data/appSampleData';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {

  const renderClubItem = ({ item }) => (
    <TouchableOpacity style={styles.clubItem} onPress={() => item.link ? Linking.openURL(item.link) : navigation.navigate(item.screen)}>
        {item.iconType === 'image' ? (
            <Image source={item.image} style={styles.clubIconImage} />
        ) : (
            <MaterialCommunityIcons name={item.icon} size={28} color={item.color || COLORS.accent} />
        )}
      <Text style={styles.clubName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderAcademicItem = ({ item }) => (
     <Card style={styles.academicItemCard} onPress={() => navigation.navigate(item.screen || 'HomeTab')}>
        <MaterialCommunityIcons name={item.icon} size={24} color={COLORS.accent} style={{marginRight: SIZES.paddingS}}/>
        <Text style={styles.academicItemText}>{item.name}</Text>
     </Card>
  );


  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Card style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Text style={styles.greeting}>Hi, {userProfile.name.split(' ')[0]} <Text style={styles.handWave}>🤘</Text></Text>
            <Text style={styles.userName}>{userProfile.name}</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Class</Text>
              <Text style={styles.detailValue}>{userProfile.class}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Course</Text>
              <Text style={styles.detailValue}>{userProfile.course}</Text>
            </View>
          </View>
          <Image source={userProfile.avatar} style={styles.avatar} />
        </Card>

        <View style={styles.section}>
          <View style={styles.sectionHeaderContainer}>
             <Text style={styles.sectionTitle}>Proctor Announcements</Text>
             {/* <MaterialCommunityIcons name="tune-variant" size={22} color={COLORS.textSecondary} /> */}
          </View>
          <View style={styles.divider} />
          {proctorAnnouncements.length === 0 ? (
            <Text style={styles.noMessages}>No messages from proctor</Text>
          ) : (
            <FlatList
              data={proctorAnnouncements}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.announcementItem}>
                  <Text style={styles.announcementText}>{item.message}</Text>
                  <Text style={styles.announcementDate}>{item.date}</Text>
                </View>
              )}
            />
          )}
           <View style={[styles.divider, {marginTop: SIZES.paddingS}]} />
        </View>

        <View style={styles.section}>
             <Text style={[styles.sectionTitle, {textAlign: 'center', marginVertical: SIZES.paddingS}]}>
                Your Fees Paid
             </Text>
        </View>

        {/* Clubs Section from one of the screenshots - assuming it's on home too */}
        <View style={styles.section}>
            <Text style={[styles.sectionTitle, {marginBottom: SIZES.paddingS}]}>Clubs</Text>
            {clubsAndAcademics.clubs.map(item => (
                 <Card key={item.id} style={styles.clubCardItem} onPress={() => item.link ? Linking.openURL(item.link) : alert('Navigate to ' + item.name)}>
                    {item.iconType === 'image' ? (
                        <Image source={item.image} style={styles.clubCardIconImage} />
                    ) : (
                        <MaterialCommunityIcons name={item.icon} size={28} color={item.color || COLORS.accent} style={styles.clubCardIcon} />
                    )}
                    <Text style={styles.clubCardName}>{item.name}</Text>
                 </Card>
            ))}
        </View>

         <View style={styles.section}>
            <Text style={[styles.sectionTitle, {marginBottom: SIZES.paddingS}]}>Academics</Text>
             {clubsAndAcademics.academics.map(item => (
                 <Card key={item.id} style={styles.clubCardItem} onPress={() => alert('Navigate to ' + item.name)}>
                    <MaterialCommunityIcons name={item.icon} size={28} color={COLORS.accent} style={styles.clubCardIcon} />
                    <Text style={styles.clubCardName}>{item.name}</Text>
                 </Card>
            ))}
        </View>


        <View style={{ height: SIZES.padding * 2 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
  },
  profileCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.secondary, // Matches card background
    margin: SIZES.padding,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
  },
  profileInfo: {
    flex: 1,
  },
  greeting: {
    ...FONTS.h1,
    color: COLORS.textPrimary,
    fontSize: 26, // Slightly smaller H1
    marginBottom: SIZES.paddingXS / 2,
  },
  handWave: {
    fontSize: 26,
  },
  userName: {
    ...FONTS.h3,
    color: COLORS.textPrimary,
    marginBottom: SIZES.padding,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: SIZES.paddingXS / 2,
  },
  detailLabel: {
    ...FONTS.body2,
    color: COLORS.textSecondary,
    width: 70, // Fixed width for alignment
  },
  detailValue: {
    ...FONTS.body2,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  section: {
    marginHorizontal: SIZES.padding,
    marginTop: SIZES.padding,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.paddingS,
  },
  sectionTitle: {
    ...FONTS.h2,
    color: COLORS.textPrimary,
    fontSize: SIZES.h3, // Slightly smaller than screen title
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginVertical: SIZES.paddingXS,
  },
  noMessages: {
    ...FONTS.body2,
    color: COLORS.textTertiary,
    textAlign: 'center',
    paddingVertical: SIZES.padding,
  },
  announcementItem: {
    paddingVertical: SIZES.paddingXS,
  },
  announcementText: {
    ...FONTS.body2,
    color: COLORS.textPrimary,
  },
  announcementDate: {
    ...FONTS.body4,
    color: COLORS.textTertiary,
    marginTop: 4,
  },
   clubCardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.paddingS, // Less padding for list items
    marginBottom: SIZES.paddingS / 2,
  },
  clubCardIcon: {
    marginRight: SIZES.padding,
  },
  clubCardIconImage: {
    width: 28,
    height: 28,
    marginRight: SIZES.padding,
    borderRadius: 6, // Slight rounding if needed
  },
  clubCardName: {
    ...FONTS.h4,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
});

export default HomeScreen;
