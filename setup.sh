#!/bin/bash

echo "🚀 Setting up MSRIT College App UI demo files..."
echo "👉 Ensure you are in the root of your initialized Expo project."
echo "⚠️ This script WILL OVERWRITE your existing App.js."
echo ""
read -p "Do you want to continue? (y/N): " confirm
if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
    echo "Setup aborted by user."
    exit 0
fi
echo ""
sleep 1

# --- Helper Functions ---
echo_green() {
  echo -e "\033[0;32m$1\033[0m"
}

echo_yellow() {
  echo -e "\033[0;33m$1\033[0m"
}

echo_blue() {
  echo -e "\033[0;34m$1\033[0m"
}

# --- Create Directory Structure ---
echo_blue "Creating directory structure..."
mkdir -p assets/fonts
mkdir -p assets/images
mkdir -p components
mkdir -p consts
mkdir -p data
mkdir -p navigation
mkdir -p screens/communities

echo_green "Directory structure created/verified."
echo ""

# --- Create Files ---

# --- consts/theme.js ---
echo_blue "Creating consts/theme.js..."
cat << 'EOF' > consts/theme.js
// consts/theme.js
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  primary: '#101012', // Main dark background
  secondary: '#1C1C1E', // Card and slightly lighter elements
  tertiary: '#252527', // Input fields, some borders

  accent: '#00BCD4', // Teal/Cyan accent (like CIE)
  accentSecondary: '#0097A7', // Darker teal
  accentRed: '#F44336', // For active tab icon or errors
  textHighlight: '#FFFFFF',

  textPrimary: '#E0E0E0', // Main light text
  textSecondary: '#B0B0B0', // Softer light text
  textTertiary: '#757575', // Dimmed text, placeholders
  textOnAccent: '#FFFFFF',

  white: '#FFFFFF',
  black: '#000000',
  lightGray: '#F5F5F7',
  darkGray: '#333333',

  chartBlue: '#29B6F6',
  chartGreen: '#66BB6A',
  chartRed: '#EF5350',
  chartYellow: '#FFEE58',
  chartPurple: '#AB47BC',
  chartOrange: '#FFA726',
  chartPink: '#EC407A',
  chartLime: '#D4E157',

  attendanceColors: ['#00BCD4', '#4CAF50', '#FFC107', '#9C27B0', '#F44336', '#2196F3', '#E91E63', '#FF9800'],

  calendarBackground: '#1C1C1E',
  calendarText: '#E0E0E0',
  calendarSelected: '#00BCD4',
  calendarToday: '#FFEB3B',
  calendarPresent: '#66BB6A',
  calendarAbsent: '#EF5350',
  calendarDisabled: '#424242',
  calendarHoliday: '#757575',

  tabBarActive: '#F44336',
  tabBarInactive: '#757575',
  bottomNavBar: '#171719',

  cardBorder: 'transparent', // No visible border, use shadow/elevation for separation
  divider: '#2A2A2C',
  inputBackground: '#252527',

  switchActive: '#00BCD4',
  switchInactive: '#424242',
  switchThumb: '#E0E0E0',

  buttonPrimary: '#00BCD4',
  buttonSecondary: '#2C2C2E',
  buttonDestructive: '#D32F2F',

  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  cardElevation: 4,
};

export const SIZES = {
  base: 8,
  font: 14,
  radius: 16,
  radiusS: 10,
  padding: 16,
  paddingS: 12,
  paddingXS: 8,

  largeTitle: 32,
  h1: 28,
  h2: 22,
  h3: 18,
  h4: 16,
  body1: 16,
  body2: 14,
  body3: 12,
  body4: 10,

  width,
  height,
};

export const FONTS = {
  largeTitle: { fontFamily: 'Inter-Bold', fontSize: SIZES.largeTitle, lineHeight: 40, color: COLORS.textPrimary },
  h1: { fontFamily: 'Inter-Bold', fontSize: SIZES.h1, lineHeight: 36, color: COLORS.textPrimary },
  h2: { fontFamily: 'Inter-SemiBold', fontSize: SIZES.h2, lineHeight: 30, color: COLORS.textPrimary },
  h3: { fontFamily: 'Inter-SemiBold', fontSize: SIZES.h3, lineHeight: 26, color: COLORS.textPrimary },
  h4: { fontFamily: 'Inter-SemiBold', fontSize: SIZES.h4, lineHeight: 22, color: COLORS.textSecondary },
  body1: { fontFamily: 'Inter-Regular', fontSize: SIZES.body1, lineHeight: 24, color: COLORS.textPrimary },
  body2: { fontFamily: 'Inter-Regular', fontSize: SIZES.body2, lineHeight: 22, color: COLORS.textSecondary },
  body3: { fontFamily: 'Inter-Regular', fontSize: SIZES.body3, lineHeight: 20, color: COLORS.textSecondary },
  body4: { fontFamily: 'Inter-Regular', fontSize: SIZES.body4, lineHeight: 18, color: COLORS.textTertiary },
  button: { fontFamily: 'Inter-SemiBold', fontSize: SIZES.body2, color: COLORS.textOnAccent },
};

const appTheme = { COLORS, SIZES, FONTS };
export default appTheme;
EOF

# --- components/AppHeader.js ---
echo_blue "Creating components/AppHeader.js..."
cat << 'EOF' > components/AppHeader.js
// components/AppHeader.js
import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '../consts/theme';

const AppHeader = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/images/ramaiah_logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>RAMAIAH</Text>
        <Text style={styles.subtitle}>Institute of Technology</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.primary,
  },
  headerContainer: {
    paddingHorizontal: SIZES.padding,
    paddingTop: Platform.OS === 'ios' ? 0 : SIZES.paddingS, // Android might need more padding if not using SafeAreaView for status bar
    paddingBottom: SIZES.paddingS,
    alignItems: 'center', // Center logo and text block
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
  },
  logo: {
    width: 45,
    height: 45,
    marginRight: SIZES.paddingS,
  },
  title: {
    ...FONTS.h3,
    color: COLORS.textPrimary,
    fontWeight: 'bold', // Make sure bold is applied
  },
  subtitle: {
    ...FONTS.body4,
    color: COLORS.textSecondary,
    position: 'absolute',
    left: SIZES.padding + 45 + SIZES.paddingS, // Align under RAMAIAH
    bottom: SIZES.paddingS - 6, // Adjust for alignment
  },
});

export default AppHeader;
EOF

# --- components/Card.js ---
echo_blue "Creating components/Card.js..."
cat << 'EOF' > components/Card.js
// components/Card.js
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { COLORS, SIZES } from '../consts/theme';

const Card = ({ children, style, onPress, activeOpacity }) => {
  const cardStyle = [
    styles.card,
    Platform.OS === 'ios' ? COLORS.cardShadow : {},
    style,
  ];

  if (onPress) {
    const { TouchableOpacity } = require('react-native'); // Lazy load for web compatibility
    return (
      <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={activeOpacity || 0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginVertical: SIZES.paddingXS,
    marginHorizontal: SIZES.padding, // Consistent horizontal margin
    //borderWidth: 1, // Optional: if you want a very subtle border
    //borderColor: COLORS.cardBorder,
    elevation: Platform.OS === 'android' ? COLORS.cardElevation : 0,
  },
});

export default Card;
EOF

# --- components/TabBarIcon.js ---
echo_blue "Creating components/TabBarIcon.js..."
cat << 'EOF' > components/TabBarIcon.js
// components/TabBarIcon.js
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../consts/theme';

const TabBarIcon = ({ name, focused, size }) => {
  return (
    <MaterialCommunityIcons
      name={name}
      size={size || 26}
      color={focused ? COLORS.tabBarActive : COLORS.tabBarInactive}
    />
  );
};
export default TabBarIcon;
EOF

# --- components/SettingsListItem.js ---
echo_blue "Creating components/SettingsListItem.js..."
cat << 'EOF' > components/SettingsListItem.js
// components/SettingsListItem.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../consts/theme';
import Card from './Card';

const SettingsListItem = ({ icon, iconColor = COLORS.accentRed, text, onPress, isSwitch, switchValue, onSwitchChange }) => {
  return (
    <Card style={styles.cardStyle} onPress={!isSwitch ? onPress : null}>
      <View style={styles.itemContainer}>
        {icon && <MaterialCommunityIcons name={icon} size={24} color={iconColor} style={styles.icon} />}
        <Text style={styles.text}>{text}</Text>
        {isSwitch ? (
          <Switch
            trackColor={{ false: COLORS.switchInactive, true: COLORS.switchActive }}
            thumbColor={switchValue ? COLORS.accent : COLORS.switchThumb}
            ios_backgroundColor={COLORS.switchInactive}
            onValueChange={onSwitchChange}
            value={switchValue}
          />
        ) : (
          onPress && <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.textSecondary} />
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    paddingVertical: SIZES.paddingS,
    paddingHorizontal: SIZES.padding,
    marginVertical: SIZES.paddingXS / 2,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: SIZES.padding,
  },
  text: {
    ...FONTS.body2,
    color: COLORS.textPrimary,
    flex: 1,
  },
});

export default SettingsListItem;
EOF

# --- components/ResultSubjectItem.js ---
echo_blue "Creating components/ResultSubjectItem.js..."
cat << 'EOF' > components/ResultSubjectItem.js
// components/ResultSubjectItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';
import { COLORS, FONTS, SIZES } from '../consts/theme';

const ResultSubjectItem = ({ subjectName, subjectCode, marks, totalMarks }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <View style={styles.subjectInfo}>
          <Text style={styles.subjectName} numberOfLines={2}>{subjectName}</Text>
          <Text style={styles.subjectCode}>{subjectCode}</Text>
        </View>
        <View style={styles.marksContainer}>
          <Text style={styles.marks}>{marks}</Text>
          <Text style={styles.totalMarks}>/{totalMarks}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: SIZES.paddingS,
    paddingVertical: SIZES.paddingS,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectInfo: {
    flex: 1,
    marginRight: SIZES.paddingS,
  },
  subjectName: {
    ...FONTS.h4,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  subjectCode: {
    ...FONTS.body4,
    color: COLORS.textSecondary,
  },
  marksContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  marks: {
    ...FONTS.h2,
    color: COLORS.accent,
    fontWeight: 'bold',
  },
  totalMarks: {
    ...FONTS.body2,
    color: COLORS.textSecondary,
    marginLeft: 2,
    paddingBottom: 2, // Align with baseline of marks
  },
});

export default ResultSubjectItem;
EOF

# --- components/SemesterResultItem.js ---
echo_blue "Creating components/SemesterResultItem.js..."
cat << 'EOF' > components/SemesterResultItem.js
// components/SemesterResultItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';
import { COLORS, FONTS, SIZES } from '../consts/theme';

const SemesterResultItem = ({ semester, gpa }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.semesterText}>{semester}</Text>
        <Text style={styles.gpaText}>{gpa.toFixed(2)}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: SIZES.paddingS,
    paddingVertical: SIZES.padding,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  semesterText: {
    ...FONTS.h4,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  gpaText: {
    ...FONTS.h3,
    color: COLORS.accent,
    fontWeight: 'bold',
  },
});

export default SemesterResultItem;
EOF

# --- components/AttendanceSubjectItem.js ---
echo_blue "Creating components/AttendanceSubjectItem.js..."
cat << 'EOF' > components/AttendanceSubjectItem.js
// components/AttendanceSubjectItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Card from './Card';
import { COLORS, FONTS, SIZES } from '../consts/theme';

const AttendanceSubjectItem = ({ subjectName, subjectCode, percentage, onPress }) => {
  const percentageColor = percentage >= 75 ? COLORS.chartGreen : percentage >= 50 ? COLORS.chartOrange : COLORS.chartRed;
  return (
    <Card style={styles.card} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.subjectInfo}>
          <Text style={styles.subjectName} numberOfLines={2}>{subjectName}</Text>
          <Text style={styles.subjectCode}>{subjectCode}</Text>
        </View>
        <Text style={[styles.percentageText, { color: percentageColor }]}>{percentage}%</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: SIZES.paddingS,
    paddingVertical: SIZES.paddingS,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectInfo: {
    flex: 1,
    marginRight: SIZES.paddingS,
  },
  subjectName: {
    ...FONTS.h4,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  subjectCode: {
    ...FONTS.body4,
    color: COLORS.textSecondary,
  },
  percentageText: {
    ...FONTS.h2,
    fontWeight: 'bold',
  },
});

export default AttendanceSubjectItem;
EOF

# --- components/CommunityListItem.js ---
echo_blue "Creating components/CommunityListItem.js..."
cat << 'EOF' > components/CommunityListItem.js
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
EOF

# --- components/PostListItem.js ---
echo_blue "Creating components/PostListItem.js..."
cat << 'EOF' > components/PostListItem.js
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
EOF

# --- components/CommentListItem.js ---
echo_blue "Creating components/CommentListItem.js..."
cat << 'EOF' > components/CommentListItem.js
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
EOF

# --- components/SegmentedControl.js ---
echo_blue "Creating components/SegmentedControl.js..."
cat << 'EOF' > components/SegmentedControl.js
// components/SegmentedControl.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../consts/theme';

const SegmentedControl = ({ segments, activeIndex, onTabPress }) => {
  return (
    <View style={styles.container}>
      {segments.map((segment, index) => (
        <TouchableOpacity
          key={segment}
          style={[
            styles.segmentButton,
            activeIndex === index && styles.activeSegment,
          ]}
          onPress={() => onTabPress(index)}
        >
          <Text
            style={[
              styles.segmentText,
              activeIndex === index && styles.activeText,
            ]}
          >
            {segment}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.radiusS,
    marginHorizontal: SIZES.padding,
    marginVertical: SIZES.padding,
    overflow: 'hidden',
    //borderWidth: 1,
    //borderColor: COLORS.divider
  },
  segmentButton: {
    flex: 1,
    paddingVertical: SIZES.paddingS,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeSegment: {
    backgroundColor: COLORS.accent, // Or COLORS.secondary for a more subtle look
  },
  segmentText: {
    ...FONTS.h4,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  activeText: {
    color: COLORS.textOnAccent, // Or COLORS.textPrimary if active segment is subtle
    fontWeight: 'bold',
  },
});

export default SegmentedControl;
EOF

# --- data/appSampleData.js ---
echo_blue "Creating data/appSampleData.js..."
cat << 'EOF' > data/appSampleData.js
// data/appSampleData.js
export const userProfile = {
  name: 'S Jeevan',
  avatar: require('../assets/images/user_avatar.jpg'), // Use require for local images
  class: 'SEM 06-C',
  course: 'B.E-CS',
  feesPaid: true, // or 'Partial', 'Due'
};

export const proctorAnnouncements = [
  // { id: '1', message: 'Class test on Unit 3 next Monday.', date: '2024-05-10' },
  // { id: '2', message: 'Submit assignments by Friday EOD.', date: '2024-05-08' },
]; // Empty for "No messages from proctor"

export const attendanceSummary = {
  subjects: [
    { id: '22AL61', name: 'Management & Entrepreneurship', code: '22AL61', percentage: 80, color: '#00BCD4' },
    { id: '22CS62', name: 'Cloud Computing and Big Data', code: '22CS62', percentage: 92, color: '#4CAF50' },
    { id: '22CSE635', name: 'Mobile Application Development', code: '22CSE635', percentage: 75, color: '#FFC107' },
    { id: '22CSE641', name: 'Cryptography & Network Security', code: '22CSE641', percentage: 88, color: '#9C27B0' },
    { id: '22CSL66', name: 'MAD Lab', code: '22CSL66', percentage: 95, color: '#F44336' },
    { id: '22CSP67', name: 'Project Work Phase-1', code: '22CSP67', percentage: 100, color: '#2196F3' },
    { id: '22ECOE01', name: 'Open Elective X', code: '22ECOE01', percentage: 70, color: '#E91E63' },
    // { id: 'EXTRA', name: 'Some Other Subject', code: 'EXTRA01', percentage: 60, color: '#FF9800' },
  ],
};

export const attendanceDetailData = {
  '22AL61': {
    subjectName: 'Management & Entrepreneurship',
    subjectCode: '22AL61',
    attended: 20,
    missed: 5,
    remaining: 16, // Hypothetical
    total: 41,
    percentage: 80,
    calendar: { // YYYY-MM-DD
      '2025-05-01': { selected: false, marked: true, dotColor: '#66BB6A' }, // Present
      '2025-05-02': { selected: false, marked: true, dotColor: '#66BB6A' },
      '2025-05-03': { selected: false, disabled: true, dotColor: '#757575' }, // Weekend/Holiday
      '2025-05-05': { selected: false, marked: true, dotColor: '#EF5350' }, // Absent
      '2025-05-06': { selected: false, marked: true, dotColor: '#66BB6A' },
      '2025-05-09': { selected: false, marked: true, dotColor: '#66BB6A' },
      '2025-05-13': { selected: false, marked: true, dotColor: '#66BB6A' },
      '2025-05-16': { selected: true, marked: true, dotColor: '#00BCD4', selectedColor: '#00BCD4' }, // Selected
    }
  },
  // Add more subject details similarly
  '22CS62': {
    subjectName: 'Cloud Computing and Big Data',
    subjectCode: '22CS62',
    attended: 23,
    missed: 2,
    remaining: 10,
    total: 35,
    percentage: 92,
    calendar: {} // Populate as needed
  },
};


export const resultsData = {
  cie: {
    subjects: [
      { id: 'r1', name: 'Management & Entrepreneurship', code: '22AL61', marks: 27, total: 30, value: 27 }, // value for chart
      { id: 'r2', name: 'Cloud Computing and Big Data', code: '22CS62', marks: 17, total: 30, value: 17 },
      { id: 'r3', name: 'Cryptography & Network Security', code: '22CSE641', marks: 29, total: 30, value: 29 },
      { id: 'r4', name: 'MAD Lab', code: '22CSL66', marks: 0, total: 30, value: 0 }, // Example for zero
      { id: 'r5', name: 'Open Elective X', code: '22ECOE01', marks: 22, total: 30, value: 22 },
      // Add more CIE subjects
    ],
    chartData: {
      labels: ['22AL61', '22CS62', '22CSE641', '22CSL66', '22ECOE01'], // Codes for x-axis
      datasets: [
        {
          data: [27, 17, 29, 0, 22], // Must match order of labels
          colors: [(opacity = 1) => `#29B6F6`, (opacity = 1) => `#EF5350`, (opacity = 1) => `#29B6F6`, (opacity = 1) => `#EF5350`, (opacity = 1) => `#29B6F6`], // Example alternating or map from subject
        },
      ],
    },
  },
  see: {
    cgpa: 7.81,
    semesters: [
      { id: 's1', name: 'Sem - 1', gpa: 7.55 },
      { id: 's2', name: 'Sem - 2', gpa: 8.55 },
      { id: 's3', name: 'Sem - 3', gpa: 8.04 },
      { id: 's4', name: 'Sem - 4', gpa: 7.65 },
      { id: 's5', name: 'Sem - 5', gpa: 7.31 },
      // Add more semesters
    ]
  }
};

export const settingsOptions = [
  { id: 'fee', text: 'Fee Payment', icon: 'currency-usd', screen: 'FeePayment', type: 'navigate' },
  { id: 'wifi', text: 'Register WiFi complaint', icon: 'wifi-alert', screen: 'WifiComplaint', type: 'navigate' },
  { id: 'darkmode', text: 'Dark Mode', icon: 'theme-light-dark', type: 'switch', stateKey: 'isDarkMode' },
  { id: 'feedback', text: 'Feedback', icon: 'lock-question', screen: 'Feedback', type: 'navigate' },
  { id: 'about', text: 'About', icon: 'information-outline', screen: 'About', type: 'navigate' },
  { id: 'updatedata', text: 'Update data', icon: 'update', action: 'syncData', type: 'action' },
];

export const clubsAndAcademics = {
  clubs: [
    {id: 'd1', name: 'MSRIT discord', icon: 'discord', color: '#5865F2', link: 'https://discord.gg/yourinvite'},
    {id: 'g1', name: 'GDSC-RIT', iconType: 'image', image: require('../assets/images/gdsc_logo_placeholder.png'), link: 'https://gdsc.community.dev/'}, // Replace with actual GDSC logo asset
    {id: 'c1', name: 'CodeRIT', iconType: 'image', image: require('../assets/images/coderit_logo_placeholder.png'), link: 'https://coderit.org'}, // Replace
    {id: 'n1', name: 'Nakama', iconType: 'image', image: require('../assets/images/nakama_logo_placeholder.png'), link: 'https://nakama.org'}, // Replace
  ],
  academics: [
    {id: 'cm1', name: 'Course Material', icon: 'book-open-variant', screen: 'CourseMaterial'},
    {id: 'syl1', name: 'Syllabi', icon: 'text-box-multiple-outline', screen: 'Syllabi'},
  ]
}
// Placeholder images for clubs - create these in assets/images:
// gdsc_logo_placeholder.png
// coderit_logo_placeholder.png
// nakama_logo_placeholder.png
EOF

# --- data/communitySampleData.js ---
echo_blue "Creating data/communitySampleData.js..."
cat << 'EOF' > data/communitySampleData.js
// data/communitySampleData.js
export const users = {
  'user0': { id: 'user0', name: 'S Jeevan', avatarUrl: 'https://via.placeholder.com/100/00BCD4/FFFFFF?Text=SJ' },
  'user1': { id: 'user1', name: 'Priya Sharma', avatarUrl: 'https://via.placeholder.com/100/F44336/FFFFFF?Text=PS' },
  'user2': { id: 'user2', name: 'Amit Kumar', avatarUrl: 'https://via.placeholder.com/100/4CAF50/FFFFFF?Text=AK' },
  'user3': { id: 'user3', name: 'Rohan Reddy', avatarUrl: 'https://via.placeholder.com/100/9C27B0/FFFFFF?Text=RR' },
};

export const communities = [
  {
    id: 'c1',
    name: 'Placements & Internships Hub',
    description: 'Discuss interview experiences, job openings, resume tips, and career advice. Connect with alumni.',
    icon: 'briefcase-account-outline',
    memberCount: 285,
    bannerImage: require('../assets/images/community_banner_placeholder.jpg'),
  },
  {
    id: 'c2',
    name: 'Sports Central (MSRIT)',
    description: 'All about college sports - cricket, football, basketball, badminton. Find teammates and event updates.',
    icon: 'trophy-outline',
    memberCount: 152,
    bannerImage: 'https://source.unsplash.com/random/800x300/?sports,team',
  },
  {
    id: 'c3',
    name: 'CodeRIT Community',
    description: 'For all coders! Discuss programming languages, DSA, competitive coding, hackathons, and personal projects.',
    icon: 'xml',
    memberCount: 310,
    bannerImage: 'https://source.unsplash.com/random/800x300/?code,binary',
  },
  {
    id: 'c4',
    name: 'MSRIT Gaming Lounge',
    description: 'Valorant, BGMI, FIFA, and more. Find teammates, share clips, and discuss gaming setups.',
    icon: 'gamepad-variant-outline',
    memberCount: 190,
    bannerImage: 'https://source.unsplash.com/random/800x300/?gaming,esports',
  },
  {
    id: 'c5',
    name: 'College Events & Fests',
    description: 'Stay updated on upcoming college events, cultural fests, tech fests, workshops, and volunteer opportunities.',
    icon: 'calendar-star',
    memberCount: 450,
    bannerImage: 'https://source.unsplash.com/random/800x300/?festival,event',
  },
];

export const posts = {
  'c1': [ // Placements
    {
      id: 'p101',
      communityId: 'c1',
      title: 'Infosys Interview Experience - System Engineer',
      contentPreview: 'Just had my Infosys interview. They asked 2 DSA questions (one array, one tree based), basic DBMS concepts like normalization, and one logical puzzle. Overall difficulty was moderate. HR round was chill. Results expected in a week!',
      fullContent: 'Detailed experience: The first round was an online test with aptitude, logical reasoning, and verbal ability, followed by two coding questions. Those who cleared went to the technical interview. My technical interview lasted for about 45 minutes. Questions asked:\n1. Tell me about yourself.\n2. Explain your final year project.\n3. DSA: Reverse a linked list (iterative and recursive).\n4. DSA: Find if a binary tree is a Binary Search Tree.\n5. DBMS: What is normalization? Explain 1NF, 2NF, 3NF with examples.\n6. OS: What is a deadlock? How can it be prevented?\n7. Puzzle: You have two ropes that each take an hour to burn... (classic puzzle)\n\nThe interviewer was friendly and guided me when I got stuck. The HR round was just 15 minutes, mainly about relocation and salary expectations. \n\nTips: Be confident, communicate your thought process clearly, and revise your CS fundamentals well.',
      authorId: 'user1',
      timestamp: '2 hours ago',
      upvotes: 28,
      commentsCount: 5,
      image: null, // 'https://source.unsplash.com/random/800x600/?office,interview'
    },
    {
      id: 'p102',
      communityId: 'c1',
      title: 'Internship Opening at Tech Startup (React Native)',
      contentPreview: 'Hey everyone, my company (a small EdTech startup) is looking for React Native interns. 2-3 months, remote possible. DM me if interested with your resume/GitHub.',
      fullContent: 'Looking for passionate React Native developer interns to join our team. You will be working on enhancing our mobile application, adding new features, and fixing bugs. \nRequirements:\n- Good understanding of JavaScript, React, and React Native.\n- Familiarity with state management (Redux/Context API).\n- Experience with REST APIs.\n- Git version control.\n\nDuration: 2-3 months (extendable)\nStipend: Competitive\nLocation: Remote / Bangalore (optional)\n\nIf you are interested, please send your resume and GitHub profile link to [email protected] or DM me here.',
      authorId: 'user3',
      timestamp: '1 day ago',
      upvotes: 45,
      commentsCount: 12,
      image: null,
    },
  ],
  'c2': [ // Sports
    {
      id: 'p201',
      communityId: 'c2',
      title: 'Inter-departmental Cricket Tournament Next Week!',
      contentPreview: 'Get your teams ready! The annual cricket tournament starts next Monday. Fixtures will be out soon. Who is participating?',
      fullContent: 'The much-awaited inter-departmental cricket tournament is back! Registrations are closed. We have 16 teams participating this year. Fixtures will be displayed on the college notice board and shared here by tomorrow evening. Matches will be played on the main ground. Come support your departments! #MSRITCricket #CollegeSports',
      authorId: 'user2',
      timestamp: '6 hours ago',
      upvotes: 18,
      commentsCount: 3,
      image: 'https://source.unsplash.com/random/800x600/?cricket,match',
    }
  ],
  // Add more posts for other communities
  'c3': [], 'c4': [], 'c5': [],
};

export const comments = {
  'p101': [
    { id: 'cm1', postId: 'p101', authorId: 'user2', text: 'Thanks for sharing! Very helpful for upcoming placements.', timestamp: '1 hour ago' },
    { id: 'cm2', postId: 'p101', authorId: 'user3', text: 'Which puzzle did they ask specifically?', timestamp: '30 mins ago' },
    { id: 'cm3', postId: 'p101', authorId: 'user1', text: 'It was the "two ropes burn in one hour, measure 45 minutes" one.', timestamp: '25 mins ago' },
  ],
  'p102': [
     { id: 'cm4', postId: 'p102', authorId: 'user0', text: 'DM-ed you! Sounds interesting.', timestamp: '20 hours ago' },
  ],
  'p201': [],
};

// Helper to get populated post/comment data
export const getPopulatedPosts = (communityId) => {
  return (posts[communityId] || []).map(post => ({
    ...post,
    authorName: users[post.authorId]?.name || 'Unknown User',
    authorAvatar: users[post.authorId]?.avatarUrl,
  }));
};

export const getPopulatedComments = (postId) => {
  return (comments[postId] || []).map(comment => ({
    ...comment,
    authorName: users[comment.authorId]?.name || 'Unknown User',
    authorAvatar: users[comment.authorId]?.avatarUrl,
  }));
};
EOF

# --- navigation/AppNavigator.js ---
echo_blue "Creating navigation/AppNavigator.js..."
cat << 'EOF' > navigation/AppNavigator.js
// navigation/AppNavigator.js
import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { COLORS, FONTS } from '../consts/theme';
import TabBarIcon from '../components/TabBarIcon';

// Screens
import HomeScreen from '../screens/HomeScreen';
import ResultsScreen from '../screens/ResultsScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import AttendanceDetailScreen from '../screens/AttendanceDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Community Screens
import CommunitiesScreen from '../screens/communities/CommunitiesScreen';
import CommunityDetailScreen from '../screens/communities/CommunityDetailScreen';
import PostDetailScreen from '../screens/communities/PostDetailScreen';
import CreatePostScreen from '../screens/communities/CreatePostScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const commonStackScreenOptions = {
  headerStyle: {
    backgroundColor: COLORS.primary,
    elevation: 0, // Android
    shadowOpacity: 0, // iOS
    borderBottomWidth: 0,
  },
  headerTintColor: COLORS.textPrimary,
  headerTitleStyle: {
    ...FONTS.h3,
    color: COLORS.textPrimary,
  },
  headerBackTitleVisible: false,
};

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={commonStackScreenOptions}>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      {/* Add other screens navigable from Home if any, e.g., Proctor Announcements detail */}
    </Stack.Navigator>
  );
}

function ResultsStack() {
  return (
    <Stack.Navigator screenOptions={commonStackScreenOptions}>
      <Stack.Screen name="ResultsMain" component={ResultsScreen} options={{ title: 'Results' }} />
    </Stack.Navigator>
  );
}

function AttendanceStack() {
  return (
    <Stack.Navigator screenOptions={commonStackScreenOptions}>
      <Stack.Screen name="AttendanceMain" component={AttendanceScreen} options={{ title: 'Attendance Info' }}/>
      <Stack.Screen name="AttendanceDetail" component={AttendanceDetailScreen} />
    </Stack.Navigator>
  );
}

function CommunitiesNavigatorStack() { // Renamed to avoid conflict with screen name
  return (
    <Stack.Navigator screenOptions={commonStackScreenOptions}>
      <Stack.Screen name="CommunitiesList" component={CommunitiesScreen} options={{ title: 'Clubs & Communities' }} />
      <Stack.Screen name="CommunityDetail" component={CommunityDetailScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: 'Create Post', presentation: 'modal' }} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={commonStackScreenOptions}>
      <Stack.Screen name="SettingsMain" component={SettingsScreen} options={{ title: 'Settings' }} />
      {/* Add screens for Fee Payment, Wifi Complaint etc. here */}
    </Stack.Navigator>
  );
}


const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false, // Handled by individual stacks
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'HomeTab') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'ResultsTab') iconName = focused ? 'chart-bar' : 'chart-bar';
            else if (route.name === 'CommunitiesTab') iconName = focused ? 'forum' : 'forum-outline'; // Changed to 'forum'
            else if (route.name === 'AttendanceTab') iconName = focused ? 'calendar-check' : 'calendar-check-outline';
            else if (route.name === 'SettingsTab') iconName = focused ? 'cog' : 'cog-outline';
            return <TabBarIcon name={iconName} focused={focused} size={size} />;
          },
          tabBarActiveTintColor: COLORS.tabBarActive,
          tabBarInactiveTintColor: COLORS.tabBarInactive,
          tabBarStyle: {
            backgroundColor: COLORS.bottomNavBar,
            borderTopColor: COLORS.divider,
            height: Platform.OS === 'ios' ? 90 : 60,
            paddingBottom: Platform.OS === 'ios' ? 30 : 5,
            paddingTop: 5,
          },
          tabBarLabelStyle: {
            ...FONTS.body4,
            fontSize: 10,
            paddingBottom: Platform.OS === 'ios' ? 0 : 5,
          },
        })}
      >
        <Tab.Screen name="CommunitiesTab" component={CommunitiesNavigatorStack} options={{ tabBarLabel: 'Clubs' }} />
        <Tab.Screen name="ResultsTab" component={ResultsStack} options={{ tabBarLabel: 'Results' }} />
        <Tab.Screen name="HomeTab" component={HomeStack} options={{ tabBarLabel: 'Home' }} />
        <Tab.Screen name="AttendanceTab" component={AttendanceStack} options={{ tabBarLabel: 'Attendance' }} />
        <Tab.Screen name="SettingsTab" component={SettingsStack} options={{ tabBarLabel: 'Settings' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
EOF

# --- screens/HomeScreen.js ---
echo_blue "Creating screens/HomeScreen.js..."
cat << 'EOF' > screens/HomeScreen.js
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
EOF

# --- screens/ResultsScreen.js ---
echo_blue "Creating screens/ResultsScreen.js..."
cat << 'EOF' > screens/ResultsScreen.js
// screens/ResultsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '../consts/theme';
import SegmentedControl from '../components/SegmentedControl';
import ResultSubjectItem from '../components/ResultSubjectItem';
import SemesterResultItem from '../components/SemesterResultItem';
import { resultsData } from '../data/appSampleData';

const screenWidth = Dimensions.get('window').width;

const ResultsScreen = () => {
  const [activeSegment, setActiveSegment] = useState(0); // 0 for CIE, 1 for SEE

  const chartConfig = {
    backgroundColor: COLORS.secondary,
    backgroundGradientFrom: COLORS.secondary,
    backgroundGradientTo: COLORS.secondary,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity * 0.7})`, // Axis and labels
    labelColor: (opacity = 1) => `rgba(224, 224, 224, ${opacity})`, // COLORS.textPrimary
    style: {
      borderRadius: SIZES.radiusS,
    },
    propsForDots: {
      r: '0', // Hide dots
      strokeWidth: '0',
    },
    propsForBackgroundLines: {
      stroke: COLORS.tertiary, // Grid lines
      strokeDasharray: '', // Solid lines
    },
    barPercentage: 0.6,
    // barRadius: 4, // Rounded bars if desired
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <SegmentedControl
          segments={['CIE', 'SEE']}
          activeIndex={activeSegment}
          onTabPress={setActiveSegment}
        />

        {activeSegment === 0 && ( // CIE View
          <View>
            {resultsData.cie.chartData.labels.length > 0 ? (
                <View style={styles.chartContainer}>
                    <BarChart
                        data={resultsData.cie.chartData}
                        width={screenWidth - SIZES.padding * 2}
                        height={220}
                        chartConfig={chartConfig}
                        verticalLabelRotation={0}
                        fromZero={true}
                        showValuesOnTopOfBars={true}
                        style={styles.chartStyle}
                        withCustomBarColorFromData={true} // Use colors from dataset
                        flatColor={true} // Necessary for withCustomBarColorFromData
                    />
                </View>
            ) : <Text style={styles.noDataText}>No CIE chart data available.</Text>}

            {resultsData.cie.subjects.map(subject => (
              <ResultSubjectItem
                key={subject.id}
                subjectName={subject.name}
                subjectCode={subject.code}
                marks={subject.marks}
                totalMarks={subject.total}
              />
            ))}
          </View>
        )}

        {activeSegment === 1 && ( // SEE View
          <View style={styles.seeContainer}>
            <Text style={styles.cgpaText}>CGPA - {resultsData.see.cgpa.toFixed(2)}</Text>
            <View style={styles.divider} />
            {resultsData.see.semesters.map(semester => (
              <SemesterResultItem
                key={semester.id}
                semester={semester.name}
                gpa={semester.gpa}
              />
            ))}
          </View>
        )}
        <View style={{height: SIZES.padding}} />
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
  chartContainer: {
    marginHorizontal: SIZES.padding,
    marginTop: SIZES.paddingS,
    marginBottom: SIZES.padding,
    alignItems: 'center', // Center chart if its width is less than container
  },
  chartStyle: {
    borderRadius: SIZES.radiusS,
  },
  noDataText: {
    ...FONTS.body2,
    color: COLORS.textTertiary,
    textAlign: 'center',
    marginVertical: SIZES.padding * 2,
  },
  seeContainer: {
    marginTop: SIZES.paddingS,
  },
  cgpaText: {
    ...FONTS.h1,
    color: COLORS.textHighlight,
    textAlign: 'center',
    marginVertical: SIZES.padding,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.padding,
  },
});

export default ResultsScreen;
EOF

# --- screens/AttendanceScreen.js ---
echo_blue "Creating screens/AttendanceScreen.js..."
cat << 'EOF' > screens/AttendanceScreen.js
// screens/AttendanceScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CircularProgress from 'react-native-circular-progress-indicator';
import { COLORS, FONTS, SIZES } from '../consts/theme';
import AttendanceSubjectItem from '../components/AttendanceSubjectItem';
import { attendanceSummary } from '../data/appSampleData';

const AttendanceScreen = ({ navigation }) => {
  const totalSubjects = attendanceSummary.subjects.length;
  const radius = SIZES.width * 0.35; // Main circle radius
  const strokeWidth = 14;
  const indicatorStrokeWidth = 12; // For individual subject arcs
  const gap = 1.5; // Gap between arcs in degrees

  // Calculate average attendance for the central text (optional)
  const overallAverage = totalSubjects > 0
    ? attendanceSummary.subjects.reduce((sum, sub) => sum + sub.percentage, 0) / totalSubjects
    : 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.chartContainer}>
          {totalSubjects > 0 ? (
            <View style={{ width: radius * 2, height: radius * 2, alignItems: 'center', justifyContent: 'center' }}>
              {attendanceSummary.subjects.map((subject, index) => (
                <View key={subject.id} style={StyleSheet.absoluteFill}>
                  <CircularProgress
                    value={subject.percentage}
                    radius={radius - index * (indicatorStrokeWidth + (gap * Math.PI * (radius - index * indicatorStrokeWidth / 2) / 180))} // Adjust radius for layering
                    duration={1000}
                    progressValueColor={'transparent'} // Hide default text
                    activeStrokeColor={subject.color || COLORS.attendanceColors[index % COLORS.attendanceColors.length]}
                    activeStrokeWidth={indicatorStrokeWidth}
                    inActiveStrokeColor={COLORS.tertiary}
                    inActiveStrokeWidth={indicatorStrokeWidth}
                    inActiveStrokeOpacity={0.3}
                    // rotation={-90 + (index * (360 / totalSubjects + gap)) } // Distribute starting points - complex
                    // startAngle for each segment is tricky, this creates concentric circles
                  />
                </View>
              ))}
              {/* Central Text - Optional */}
              <View style={styles.centralTextContainer}>
                <Text style={styles.centralPercentage}>{overallAverage.toFixed(0)}%</Text>
                <Text style={styles.centralLabel}>Overall</Text>
              </View>
            </View>
          ) : (
            <Text style={styles.noDataText}>No attendance data for chart.</Text>
          )}
        </View>

        <View style={styles.legendContainer}>
          {attendanceSummary.subjects.map((subject, index) => (
            <View key={subject.id} style={styles.legendItem}>
              <View style={[styles.legendColorBox, { backgroundColor: subject.color || COLORS.attendanceColors[index % COLORS.attendanceColors.length] }]} />
              <Text style={styles.legendText}>{subject.code}</Text>
            </View>
          ))}
        </View>

        <View style={styles.listContainer}>
          {attendanceSummary.subjects.map(subject => (
            <AttendanceSubjectItem
              key={subject.id}
              subjectName={subject.name}
              subjectCode={subject.code}
              percentage={subject.percentage}
              onPress={() => navigation.navigate('AttendanceDetail', { subjectId: subject.id })}
            />
          ))}
        </View>
        <View style={{height: SIZES.padding}} />
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
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SIZES.padding * 1.5, // More vertical margin
    position: 'relative', // For absolute positioning of text
  },
  centralTextContainer: { // To position text in the middle
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centralPercentage: {
    ...FONTS.largeTitle,
    color: COLORS.textHighlight,
    fontSize: SIZES.width * 0.1, // Dynamic size
    fontWeight: 'bold',
  },
  centralLabel: {
    ...FONTS.body2,
    color: COLORS.textSecondary,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.padding,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SIZES.padding,
    marginBottom: SIZES.paddingXS,
    minWidth: '28%', // Try to fit 3 items per row
  },
  legendColorBox: {
    width: 12,
    height: 12,
    borderRadius: 3,
    marginRight: SIZES.paddingXS,
  },
  legendText: {
    ...FONTS.body4,
    color: COLORS.textSecondary,
  },
  listContainer: {
    marginTop: SIZES.paddingS,
  },
  noDataText: {
    ...FONTS.body2,
    color: COLORS.textTertiary,
    textAlign: 'center',
    marginVertical: SIZES.padding * 2,
  },
});

export default AttendanceScreen;
EOF

# --- screens/AttendanceDetailScreen.js ---
echo_blue "Creating screens/AttendanceDetailScreen.js..."
cat << 'EOF' > screens/AttendanceDetailScreen.js
// screens/AttendanceDetailScreen.js
import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '../consts/theme';
import Card from '../components/Card';
import { attendanceDetailData } from '../data/appSampleData';

const AttendanceDetailScreen = ({ route, navigation }) => {
  const { subjectId } = route.params;
  const subjectData = attendanceDetailData[subjectId];
  const [selectedDate, setSelectedDate] = useState(''); // YYYY-MM-DD

  useLayoutEffect(() => {
    if (subjectData) {
      navigation.setOptions({ title: subjectData.subjectName });
    }
  }, [navigation, subjectData]);

  if (!subjectData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.containerCenter}>
          <Text style={styles.noDataText}>Attendance details not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
    // You could show specific details for this day if available
  };

  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM for initial month

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <ScrollView style={styles.container}>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryText}>Attended: {subjectData.attended}</Text>
          <Text style={styles.summaryText}>Missed: {subjectData.missed}</Text>
          {/* <Text style={styles.summaryText}>Remaining: {subjectData.remaining}</Text> */}
          <Text style={styles.summaryText}>Percentage: {subjectData.percentage}%</Text>
          <Text style={styles.summaryText}>Total: {subjectData.total}</Text>
        </Card>

        <Calendar
          current={currentMonth + '-16'} // To show May 2025 or current month
          onDayPress={onDayPress}
          markedDates={{
            ...subjectData.calendar,
            [selectedDate]: {
              ...(subjectData.calendar[selectedDate] || {}), // Preserve existing marks if any
              selected: true,
              disableTouchEvent: true,
              selectedColor: COLORS.calendarSelected,
              selectedTextColor: COLORS.textOnAccent,
            },
          }}
          monthFormat={'MMMM yyyy'}
          onMonthChange={(month) => {
            console.log('month changed', month);
          }}
          hideExtraDays={true}
          firstDay={1} // Monday
          enableSwipeMonths={true}
          theme={{
            backgroundColor: COLORS.primary,
            calendarBackground: COLORS.calendarBackground,
            textSectionTitleColor: COLORS.textSecondary,
            textSectionTitleDisabledColor: COLORS.calendarDisabled,
            selectedDayBackgroundColor: COLORS.calendarSelected,
            selectedDayTextColor: COLORS.textOnAccent,
            todayTextColor: COLORS.calendarToday,
            dayTextColor: COLORS.calendarText,
            textDisabledColor: COLORS.calendarDisabled,
            dotColor: COLORS.calendarSelected, // Default dot color if not specified in markedDates
            selectedDotColor: COLORS.textOnAccent,
            arrowColor: COLORS.accent,
            disabledArrowColor: COLORS.calendarDisabled,
            monthTextColor: COLORS.textHighlight,
            indicatorColor: COLORS.accent,
            textDayFontFamily: FONTS.body3.fontFamily,
            textMonthFontFamily: FONTS.h3.fontFamily,
            textDayHeaderFontFamily: FONTS.body4.fontFamily,
            textDayFontSize: SIZES.body2,
            textMonthFontSize: SIZES.h4,
            textDayHeaderFontSize: SIZES.body4,
            // Control day cell style
            'stylesheet.calendar.main': {
                dayContainer: {
                    borderColor: COLORS.tertiary, // Border between day cells
                    borderWidth: 0.5,
                    flex: 1,
                    alignItems:'center'
                },
                 week: {
                    marginTop: 2,
                    marginBottom: 2,
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                }
            },
            'stylesheet.calendar.header': {
                header: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingLeft: 10,
                    paddingRight: 10,
                    marginTop: 6,
                    alignItems: 'center',
                    backgroundColor: COLORS.secondary, // Header background
                    paddingVertical: SIZES.paddingXS,
                    borderRadius: SIZES.radiusS,
                    marginBottom: SIZES.paddingS,
                },
                monthText: {
                    ...FONTS.h3,
                     color: COLORS.textPrimary, // Month text color
                },
                arrow: {
                    padding: SIZES.paddingS, // Make arrows easier to tap
                }
            }
          }}
          style={styles.calendar}
        />

        {selectedDate && subjectData.calendar[selectedDate]?.marked ? (
          <Text style={styles.selectedDateStatus}>
            {subjectData.calendar[selectedDate].dotColor === COLORS.calendarPresent ? 'Status: Present' :
             subjectData.calendar[selectedDate].dotColor === COLORS.calendarAbsent ? 'Status: Absent' :
             'Status: Info'}
          </Text>
        ) : (
          <Text style={styles.selectedDateStatus}>No selected date or no data for this date</Text>
        )}

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
    paddingHorizontal: SIZES.padding,
  },
  containerCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.padding,
  },
  summaryCard: {
    marginVertical: SIZES.padding,
    padding: SIZES.padding,
  },
  summaryText: {
    ...FONTS.body2,
    color: COLORS.textPrimary,
    marginBottom: SIZES.paddingXS / 2,
    textAlign: 'center', // As per screenshot
  },
  calendar: {
    borderRadius: SIZES.radius,
    //borderWidth: 1,
    //borderColor: COLORS.divider,
    marginBottom: SIZES.padding,
  },
  selectedDateStatus: {
    ...FONTS.body2,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginVertical: SIZES.paddingS,
    fontStyle: 'italic',
  },
  noDataText: {
    ...FONTS.body1,
    color: COLORS.textTertiary,
  },
});

export default AttendanceDetailScreen;
EOF

# --- screens/SettingsScreen.js ---
echo_blue "Creating screens/SettingsScreen.js..."
cat << 'EOF' > screens/SettingsScreen.js
// screens/SettingsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, FONTS, SIZES } from '../consts/theme';
import SettingsListItem from '../components/SettingsListItem';
import Card from '../components/Card';
import { settingsOptions } from '../data/appSampleData';

const SettingsScreen = ({ navigation }) => {
  const [appSettings, setAppSettings] = useState({
    isDarkMode: true, // Default to dark mode as per app theme
    // ... other settings
  });

  const handleSwitchChange = (key, value) => {
    setAppSettings(prev => ({ ...prev, [key]: value }));
    if (key === 'isDarkMode') {
      // Here you would typically trigger a theme change in your app
      alert(`Dark Mode ${value ? 'Enabled' : 'Disabled'}`);
    }
  };

  const handleItemPress = (item) => {
    if (item.type === 'navigate') {
      // navigation.navigate(item.screen);
      alert(`Navigate to ${item.text}`);
    } else if (item.type === 'action') {
      if (item.action === 'syncData') {
        alert('Syncing data...');
      }
    } else if (item.link) {
        Linking.openURL(item.link).catch(err => console.error("Couldn't load page", err));
    } else {
        alert(`Action: ${item.text}`);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {settingsOptions.map((item) => (
          <SettingsListItem
            key={item.id}
            icon={item.icon}
            iconColor={item.iconColor || COLORS.accentRed}
            text={item.text}
            onPress={() => handleItemPress(item)}
            isSwitch={item.type === 'switch'}
            switchValue={item.type === 'switch' ? appSettings[item.stateKey] : undefined}
            onSwitchChange={(value) => item.type === 'switch' && handleSwitchChange(item.stateKey, value)}
          />
        ))}

        <TouchableOpacity
          style={styles.signOutButtonCard}
          onPress={() => alert('Sign Out Pressed')}
        >
          <Text style={styles.signOutButtonText}>Sign out</Text>
        </TouchableOpacity>
        <View style={{height: SIZES.padding}} />
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
    paddingTop: SIZES.paddingS, // Add some top padding
  },
  signOutButtonCard: {
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.padding,
    marginHorizontal: SIZES.padding,
    marginTop: SIZES.padding * 1.5,
    alignItems: 'center',
    ...COLORS.cardShadow, // Apply shadow
    elevation: COLORS.cardElevation,
  },
  signOutButtonText: {
    ...FONTS.h3,
    color: COLORS.accentRed, // Or textPrimary if you prefer
    fontWeight: '600',
  },
});

export default SettingsScreen;
EOF

# --- screens/communities/CommunitiesScreen.js ---
echo_blue "Creating screens/communities/CommunitiesScreen.js..."
cat << 'EOF' > screens/communities/CommunitiesScreen.js
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
EOF

# --- screens/communities/CommunityDetailScreen.js ---
echo_blue "Creating screens/communities/CommunityDetailScreen.js..."
cat << 'EOF' > screens/communities/CommunityDetailScreen.js
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
EOF

# --- screens/communities/PostDetailScreen.js ---
echo_blue "Creating screens/communities/PostDetailScreen.js..."
cat << 'EOF' > screens/communities/PostDetailScreen.js
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
EOF

# --- screens/communities/CreatePostScreen.js ---
echo_blue "Creating screens/communities/CreatePostScreen.js..."
cat << 'EOF' > screens/communities/CreatePostScreen.js
// screens/communities/CreatePostScreen.js
import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../../consts/theme';

const CreatePostScreen = ({ route, navigation }) => {
  const { communityId, communityName } = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const [imageUri, setImageUri] = useState(null); // For image uploads

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Post to ${communityName}`,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: SIZES.padding }}>
          <MaterialCommunityIcons name="close" size={26} color={COLORS.textPrimary} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={handlePostSubmit} style={{ marginRight: SIZES.padding }}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, communityName, title, content]); // Add title, content to update Post button state if needed

  const handlePostSubmit = () => {
    if (title.trim() === '' || content.trim() === '') {
      alert('Title and content cannot be empty.');
      return;
    }
    // In a real app, submit this data to your backend
    console.log({ communityId, title, content });
    alert('Post submitted (demo)!');
    navigation.goBack();
  };

  // const handlePickImage = async () => { /* ... image picker logic ... */ };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Adjust as needed for modal
      >
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
          <TextInput
            style={styles.inputTitle}
            placeholder="Post Title"
            placeholderTextColor={COLORS.textTertiary}
            value={title}
            onChangeText={setTitle}
          />
          <View style={styles.divider} />
          <TextInput
            style={styles.inputContent}
            placeholder="What's on your mind?"
            placeholderTextColor={COLORS.textTertiary}
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top" // Android
          />
          {/* 
          <TouchableOpacity style={styles.imagePickerButton} onPress={handlePickImage}>
            <MaterialCommunityIcons name="image-plus" size={24} color={COLORS.accent} />
            <Text style={styles.imagePickerText}>Add Image (Optional)</Text>
          </TouchableOpacity>
          {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}
          */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.secondary, // Modal background
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: SIZES.padding,
  },
  postButtonText: {
    ...FONTS.h4,
    color: COLORS.accent,
    fontWeight: '600',
  },
  inputTitle: {
    ...FONTS.h2,
    color: COLORS.textPrimary,
    paddingVertical: SIZES.paddingS,
    borderBottomWidth: 0, // No border, use divider
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginVertical: SIZES.paddingXS,
  },
  inputContent: {
    ...FONTS.body1,
    color: COLORS.textPrimary,
    minHeight: 200, // Ample space for content
    paddingVertical: SIZES.paddingS,
    lineHeight: 22,
  },
  imagePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.paddingS,
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.radiusS,
    marginTop: SIZES.padding,
    alignSelf: 'flex-start',
  },
  imagePickerText: {
    ...FONTS.body2,
    color: COLORS.accent,
    marginLeft: SIZES.paddingXS,
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: SIZES.radiusS,
    marginTop: SIZES.paddingS,
    backgroundColor: COLORS.tertiary,
  },
});

export default CreatePostScreen;
EOF

# --- App.js (This will overwrite the default App.js) ---
echo_blue "Overwriting App.js..."
cat << 'EOF' > App.js
// App.js
import React, { useState, useEffect, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './navigation/AppNavigator';
import { COLORS } from './consts/theme';

// Define custom fonts
const customFonts = {
  'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
  'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
  'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFontsAsync = async () => {
    try {
      await Font.loadAsync(customFonts);
      setFontsLoaded(true);
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    loadFontsAsync();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.primary }}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" backgroundColor={COLORS.primary} />
      <AppNavigator />
    </SafeAreaProvider>
  );
}
EOF

# --- babel.config.js (Ensure reanimated plugin if you add it later) ---
# This script doesn't modify babel.config.js unless specifically needed.
# For basic apps, the default from `expo init` is usually fine.
# If you add react-native-reanimated:
# module.exports = function(api) {
#   api.cache(true);
#   return {
#     presets: ['babel-preset-expo'],
#     plugins: [
#       'react-native-reanimated/plugin', // Add this line
#     ],
#   };
# };

echo_green "✅ All files created successfully!"
echo ""
echo_yellow "--- NEXT STEPS ---"
echo_yellow "1. Install Dependencies: If you haven't already, run:"
echo_yellow "   npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack expo-font expo-status-bar react-native-svg react-native-chart-kit react-native-calendars react-native-circular-progress-indicator @expo/vector-icons react-native-screens react-native-safe-area-context"
echo_yellow "   (Or use 'yarn add ...' if you use Yarn)"
echo ""
echo_yellow "2. Add Font Files: Download 'Inter' font from Google Fonts."
echo_yellow "   Place 'Inter-Regular.ttf', 'Inter-SemiBold.ttf', 'Inter-Bold.ttf' into the 'assets/fonts/' directory."
echo ""
echo_yellow "3. Add Image Assets:"
echo_yellow "   - College Logo: 'assets/images/ramaiah_logo.png'"
echo_yellow "   - User Avatar: 'assets/images/user_avatar.jpg' (placeholder)"
echo_yellow "   - Community Banner: 'assets/images/community_banner_placeholder.jpg' (placeholder)"
echo_yellow "   - Club Logos (placeholders mentioned in appSampleData.js):"
echo_yellow "     'assets/images/gdsc_logo_placeholder.png'"
echo_yellow "     'assets/images/coderit_logo_placeholder.png'"
echo_yellow "     'assets/images/nakama_logo_placeholder.png'"
echo ""
echo_yellow "4. Run the app:"
echo_yellow "   npm start   (or expo start / yarn start)"
echo ""
echo_green "🚀 Happy Coding!"