// navigation/AppNavigator.js
import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // For back arrow in light theme

import { useAuth } from './AuthContext';
import { COLORS, FONTS, SIZES } from '../consts/theme'; // Adjust path
import TabBarIcon from '../components/TabBarIcon'; // Adjust path

// Auth Screens
import StartingScreen from '../screens/auth/StartingScreen'; // Adjust path
import StudentLoginScreen from '../screens/auth/StudentLoginScreen'; // Adjust path

// Main App Screens (ensure these paths are correct)
import HomeScreen from '../screens/HomeScreen';
import ResultsScreen from '../screens/ResultsScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import AttendanceDetailScreen from '../screens/AttendanceDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CommunitiesScreen from '../screens/communities/CommunitiesScreen';
import CommunityDetailScreen from '../screens/communities/CommunityDetailScreen';
import PostDetailScreen from '../screens/communities/PostDetailScreen';
import CreatePostScreen from '../screens/communities/CreatePostScreen';


const AuthStackNav = createStackNavigator();
const MainAppTabNav = createBottomTabNavigator();
const Stack = createStackNavigator(); // For Stacks within Tabs

// --- Auth Stack ---
const AuthNavigator = () => (
  <AuthStackNav.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
  >
    <AuthStackNav.Screen name="Starting" component={StartingScreen} />
    <AuthStackNav.Screen
      name="StudentLogin"
      component={StudentLoginScreen}
      options={{
        headerShown: true,
        title: 'Student Login',
        headerStyle: {
          backgroundColor: COLORS.backgroundLight,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: { ...FONTS.h3, color: COLORS.textDarkPrimary, marginLeft: -SIZES.paddingXS }, // Adjust for custom back button
        headerBackImage: () => (
          <MaterialCommunityIcons
            name="arrow-left"
            size={24}
            color={COLORS.textDarkPrimary} // Color for light theme back arrow
            style={{ marginLeft: SIZES.paddingS - 4 }} // Adjust spacing
          />
        ),
        headerBackTitleVisible: false,
      }}
    />
  </AuthStackNav.Navigator>
);

// --- Main App Stacks (Dark Theme) ---
const commonDarkStackScreenOptions = {
  headerStyle: { backgroundColor: COLORS.primary, elevation: 0, shadowOpacity: 0, borderBottomWidth: 0 },
  headerTintColor: COLORS.textPrimary,
  headerTitleStyle: { ...FONTS.h3, color: COLORS.textPrimary },
  headerBackTitleVisible: false,
};

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={commonDarkStackScreenOptions}>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
// ... (ResultsStack, AttendanceStack, CommunitiesNavigatorStack, SettingsStack remain the same as in the full script) ...
function ResultsStack() {
  return (
    <Stack.Navigator screenOptions={commonDarkStackScreenOptions}>
      <Stack.Screen name="ResultsMain" component={ResultsScreen} options={{ title: 'Results' }} />
    </Stack.Navigator>
  );
}
function AttendanceStack() {
  return (
    <Stack.Navigator screenOptions={commonDarkStackScreenOptions}>
      <Stack.Screen name="AttendanceMain" component={AttendanceScreen} options={{ title: 'Attendance Info' }}/>
      <Stack.Screen name="AttendanceDetail" component={AttendanceDetailScreen} />
    </Stack.Navigator>
  );
}
function CommunitiesNavigatorStack() {
  return (
    <Stack.Navigator screenOptions={commonDarkStackScreenOptions}>
      <Stack.Screen name="CommunitiesList" component={CommunitiesScreen} options={{ title: 'Clubs & Communities' }} />
      <Stack.Screen name="CommunityDetail" component={CommunityDetailScreen} />
      <Stack.Screen name="PostDetail" component={PostDetailScreen} />
      <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: 'Create Post', presentation: 'modal' }} />
    </Stack.Navigator>
  );
}
function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={commonDarkStackScreenOptions}>
      <Stack.Screen name="SettingsMain" component={SettingsScreen} options={{ title: 'Settings' }} />
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
        else if (route.name === 'AttendanceTab') iconName = focused ? 'calendar-check' : 'calendar-check-outline';
        else if (route.name === 'SettingsTab') iconName = focused ? 'cog' : 'cog-outline';
        return <TabBarIcon name={iconName} focused={focused} size={size} />;
      },
      tabBarActiveTintColor: COLORS.tabBarActive, // From your dark theme
      tabBarInactiveTintColor: COLORS.tabBarInactive, // From your dark theme
      tabBarStyle: {
        backgroundColor: COLORS.bottomNavBar, // From your dark theme
        borderTopColor: COLORS.divider, // From your dark theme
        height: Platform.OS === 'ios' ? 90 : 60,
        paddingBottom: Platform.OS === 'ios' ? 30 : 5, paddingTop: 5,
      },
      tabBarLabelStyle: { ...FONTS.body4, fontSize: 10, paddingBottom: Platform.OS === 'ios' ? 0 : 5 },
    })}
    initialRouteName="HomeTab"
  >
    <MainAppTabNav.Screen name="CommunitiesTab" component={CommunitiesNavigatorStack} options={{ tabBarLabel: 'Clubs' }} />
    <MainAppTabNav.Screen name="ResultsTab" component={ResultsStack} options={{ tabBarLabel: 'Results' }} />
    <MainAppTabNav.Screen name="HomeTab" component={HomeStack} options={{ tabBarLabel: 'Home' }} />
    <MainAppTabNav.Screen name="AttendanceTab" component={AttendanceStack} options={{ tabBarLabel: 'Attendance' }} />
    <MainAppTabNav.Screen name="SettingsTab" component={SettingsStack} options={{ tabBarLabel: 'Settings' }} />
  </MainAppTabNav.Navigator>
);

// --- Root Navigator ---
const AppNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainAppTabs /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;