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
import CommunitiesScreen from '../screens/communities/CommunitiesScreen';
import CommunityDetailScreen from '../screens/communities/CommunityDetailScreen';
import PostDetailScreen from '../screens/communities/PostDetailScreen';
import CreatePostScreen from '../screens/communities/CreatePostScreen';
import StartScreen from '../screens/StartScreen';
import StudentLoginScreen from '../screens/StudentLoginScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const commonStackScreenOptions = {
  headerStyle: {
    backgroundColor: COLORS.primary,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTintColor: COLORS.textPrimary,
  headerTitleStyle: {
    ...FONTS.h3,
    color: COLORS.textPrimary,
  },
  headerBackTitleVisible: false,
};

// ---- Individual Stacks ----
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={commonStackScreenOptions}>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
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
      <Stack.Screen name="AttendanceMain" component={AttendanceScreen} options={{ title: 'Attendance Info' }} />
      <Stack.Screen name="AttendanceDetail" component={AttendanceDetailScreen} />
    </Stack.Navigator>
  );
}

function CommunitiesNavigatorStack() {
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
    </Stack.Navigator>
  );
}

// ---- Bottom Tabs ----
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'HomeTab') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'ResultsTab') iconName = focused ? 'chart-bar' : 'chart-bar';
          else if (route.name === 'CommunitiesTab') iconName = focused ? 'forum' : 'forum-outline';
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
  );
}

// ---- Root Navigator ----
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Start">
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="StudentLogin" component={StudentLoginScreen} />
        <Stack.Screen name="MainApp" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
