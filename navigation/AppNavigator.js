// navigation/AppNavigator.js
import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useAuth } from './AuthContext'; // Adjust path
import { COLORS, FONTS, SIZES } from '../consts/theme'; // Adjust path
import TabBarIcon from '../components/TabBarIcon'; // Adjust path

// Auth Screens
import StartingScreen from '../screens/auth/StartScreen'; // Adjust path
import StudentLoginScreen from '../screens/auth/StudentLoginScreen'; // Adjust path

// Main App Screens
import HomeScreen from '../screens/HomeScreen';
import ResultsScreen from '../screens/ResultsScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import AttendanceDetailScreen from '../screens/AttendanceDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CommunitiesScreen from '../screens/communities/CommunitiesScreen';
import CommunityDetailScreen from '../screens/communities/CommunityDetailScreen';
import PostDetailScreen from '../screens/communities/PostDetailScreen';
import CreatePostScreen from '../screens/communities/CreatePostScreen';
import ResourcesScreen from '../screens/ResourcesScreen'; // <-- NEW SCREEN IMPORT

const AuthStackNav = createStackNavigator();
const MainAppTabNav = createBottomTabNavigator();
const Stack = createStackNavigator();

// --- Auth Stack (remains the same) ---
const AuthNavigator = () => (
  <AuthStackNav.Navigator /* ... as before ... */ >
    <AuthStackNav.Screen name="Starting" component={StartingScreen} />
    <AuthStackNav.Screen name="StudentLogin" component={StudentLoginScreen} /* ... options as before ... */ />
  </AuthStackNav.Navigator>
);

// --- Main App Stacks (Dark Theme) ---
const commonDarkStackScreenOptions = {
  headerStyle: { backgroundColor: COLORS.primary, elevation: 0, shadowOpacity: 0, borderBottomWidth: 0 },
  headerTintColor: COLORS.textPrimary,
  headerTitleStyle: { ...FONTS.h3, color: COLORS.textPrimary },
  headerBackTitleVisible: false,
};

function HomeStack() { /* ... as before ... */
    return ( <Stack.Navigator screenOptions={commonDarkStackScreenOptions}><Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} /></Stack.Navigator> );
}
function ResultsStack() { /* ... as before ... */
    return ( <Stack.Navigator screenOptions={commonDarkStackScreenOptions}><Stack.Screen name="ResultsMain" component={ResultsScreen} options={{ title: 'Results' }} /></Stack.Navigator> );
}
function AttendanceStack() { /* ... as before ... */
    return ( <Stack.Navigator screenOptions={commonDarkStackScreenOptions}><Stack.Screen name="AttendanceMain" component={AttendanceScreen} options={{ title: 'Attendance Info' }}/><Stack.Screen name="AttendanceDetail" component={AttendanceDetailScreen} /></Stack.Navigator> );
}
function CommunitiesNavigatorStack() { /* ... as before ... */
    return ( <Stack.Navigator screenOptions={commonDarkStackScreenOptions}><Stack.Screen name="CommunitiesList" component={CommunitiesScreen} options={{ title: 'Clubs & Communities' }} /><Stack.Screen name="CommunityDetail" component={CommunityDetailScreen} /><Stack.Screen name="PostDetail" component={PostDetailScreen} /><Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: 'Create Post', presentation: 'modal' }} /></Stack.Navigator> );
}
function SettingsStack() { /* ... as before ... */
    return ( <Stack.Navigator screenOptions={commonDarkStackScreenOptions}><Stack.Screen name="SettingsMain" component={SettingsScreen} options={{ title: 'Settings' }} /></Stack.Navigator> );
}

// --- NEW: Resources Stack ---
function ResourcesStack() {
  return (
    <Stack.Navigator screenOptions={commonDarkStackScreenOptions}>
      <Stack.Screen name="ResourcesMain" component={ResourcesScreen} options={{ title: 'Resources' }} />
      {/* <Stack.Screen name="AddResource" component={AddResourceScreen} options={{ title: 'Add New Resource' }} /> */}
    </Stack.Navigator>
  );
}


// --- Main App Tab Navigator ---
const MainAppTabs = () => (
  <MainAppTabNav.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'HomeTab') iconName = focused ? 'home' : 'home-outline';
        else if (route.name === 'ResultsTab') iconName = focused ? 'chart-bar' : 'chart-bar';
        else if (route.name === 'CommunitiesTab') iconName = focused ? 'forum' : 'forum-outline';
        else if (route.name === 'ResourcesTab') iconName = focused ? 'folder-multiple-outline' : 'folder-outline'; // <-- NEW ICON
        else if (route.name === 'AttendanceTab') iconName = focused ? 'calendar-check' : 'calendar-check-outline';
        else if (route.name === 'SettingsTab') iconName = focused ? 'cog' : 'cog-outline';
        return <TabBarIcon name={iconName} focused={focused} size={size} />;
      },
      tabBarActiveTintColor: COLORS.tabBarActive,
      tabBarInactiveTintColor: COLORS.tabBarInactive,
      tabBarStyle: {
        backgroundColor: COLORS.bottomNavBar, borderTopColor: COLORS.divider,
        height: Platform.OS === 'ios' ? 90 : 65, // Slightly increased height for 5/6 tabs if needed
        paddingBottom: Platform.OS === 'ios' ? 30 : 5, paddingTop: 5,
      },
      tabBarLabelStyle: { ...FONTS.body4, fontSize: 9, paddingBottom: Platform.OS === 'ios' ? 0 : 5, }, // Slightly smaller font for more tabs
    })}
    initialRouteName="HomeTab"
  >
    <MainAppTabNav.Screen name="HomeTab" component={HomeStack} options={{ tabBarLabel: 'Home' }} />
    <MainAppTabNav.Screen name="CommunitiesTab" component={CommunitiesNavigatorStack} options={{ tabBarLabel: 'Clubs' }} />
    <MainAppTabNav.Screen name="ResourcesTab" component={ResourcesStack} options={{ tabBarLabel: 'Resources' }} /> {/* <-- NEW TAB */}
    <MainAppTabNav.Screen name="ResultsTab" component={ResultsStack} options={{ tabBarLabel: 'Results' }} />
    <MainAppTabNav.Screen name="AttendanceTab" component={AttendanceStack} options={{ tabBarLabel: 'Attendance' }} />
    {/* <MainAppTabNav.Screen name="SettingsTab" component={SettingsStack} options={{ tabBarLabel: 'Settings' }} /> */}
     {/* Moved Settings to be last if there are 6 tabs, or adjust order as preferred */}
  </MainAppTabNav.Navigator>
);

// --- Root Navigator ---
const AppNavigator = () => {
  const { isAuthenticated } = useAuth();
  // console.log("AppNavigator isAuthenticated:", isAuthenticated); // Keep for debugging
  return (
    <NavigationContainer>
      {isAuthenticated ? <MainAppTabs /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;