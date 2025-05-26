// consts/theme.js
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const COLORS = {
  // --- Dark Theme (Main App - Your Existing) ---
  primary: '#101012',      // Main dark background
  secondary: '#1C1C1E',    // Card and slightly lighter elements
  tertiary: '#252527',     // Input fields, some borders
  accent: '#00BCD4',       // Teal/Cyan accent (like CIE)
  accentSecondary: '#0097A7', // Darker teal
  accentRed: '#F44336',    // For active tab icon or errors
  textHighlight: '#FFFFFF',
  textPrimary: '#E0E0E0',   // Main light text
  textSecondary: '#B0B0B0', // Softer light text
  textTertiary: '#757575',  // Dimmed text, placeholders
  textOnAccent: '#FFFFFF',
  white: '#FFFFFF',
  black: '#000000',
  lightGray: '#F5F5F7',    // (General purpose, might not be used in dark theme)
  darkGray: '#333333',     // (General purpose)
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
  cardBorder: 'transparent',
  divider: '#2A2A2C',
  inputBackground: '#252527', // Dark theme input background
  switchActive: '#00BCD4',
  switchInactive: '#424242',
  switchThumb: '#E0E0E0',
  buttonPrimaryDark: '#00BCD4', // Renamed from buttonPrimary for clarity
  buttonSecondaryDark: '#2C2C2E', // Renamed from buttonSecondary for clarity
  buttonDestructive: '#D32F2F',
  cardShadow: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 6, },
  cardElevation: 4,

  // --- Light Theme (For Auth Screens - New Additions) ---
  backgroundLight: '#F7F8FC',         // Very light grey for auth background
  // backgroundLight: '#FFFFFF',      // Alternative pure white auth background
  cardLight: '#FFFFFF',               // Auth screen cards (if any, not in current design)
  textDarkPrimary: '#1A202C',        // Dark text for light backgrounds
  textDarkSecondary: '#4A5568',       // Medium dark text
  textDarkTertiary: '#A0AEC0',        // Light dark text (placeholders)
  buttonBlue: '#3A7BFE',              // Primary blue for auth buttons
  buttonBlueText: '#FFFFFF',          // Text on primary blue button
  buttonLightSecondaryBackground: '#EDF2F7', // Background for secondary light buttons
  buttonLightSecondaryText: '#3A7BFE',      // Text for secondary light buttons (can be COLORS.buttonBlue)
  inputLightBackground: '#FFFFFF',         // Background for text inputs on light theme
  inputLightBorder: '#DDE2E7',             // Border for text inputs on light theme
  inputLightPlaceholder: '#A0AEC0',       // Placeholder text color for light inputs
  inputIconLight: '#718096',               // Icon color for light inputs
  linkBlue: '#3A7BFE',                    // For "Forgot Password?" link
};

export const SIZES = {
  base: 8,
  font: 14,
  radius: 16,        // Main radius for cards, buttons
  radiusS: 10,       // Smaller radius
  radiusXS: 6,       // Even smaller radius (e.g., for input fields in some designs)
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
  // --- Dark Theme Fonts (Your Existing) ---
  largeTitle: { fontFamily: 'Inter-Bold', fontSize: SIZES.largeTitle, lineHeight: 40, color: COLORS.textPrimary },
  h1: { fontFamily: 'Inter-Bold', fontSize: SIZES.h1, lineHeight: 36, color: COLORS.textPrimary },
  h2: { fontFamily: 'Inter-SemiBold', fontSize: SIZES.h2, lineHeight: 30, color: COLORS.textPrimary },
  h3: { fontFamily: 'Inter-SemiBold', fontSize: SIZES.h3, lineHeight: 26, color: COLORS.textPrimary },
  h4: { fontFamily: 'Inter-SemiBold', fontSize: SIZES.h4, lineHeight: 22, color: COLORS.textSecondary },
  body1: { fontFamily: 'Inter-Regular', fontSize: SIZES.body1, lineHeight: 24, color: COLORS.textPrimary },
  body2: { fontFamily: 'Inter-Regular', fontSize: SIZES.body2, lineHeight: 22, color: COLORS.textSecondary },
  body3: { fontFamily: 'Inter-Regular', fontSize: SIZES.body3, lineHeight: 20, color: COLORS.textSecondary },
  body4: { fontFamily: 'Inter-Regular', fontSize: SIZES.body4, lineHeight: 18, color: COLORS.textTertiary },
  button: { fontFamily: 'Inter-SemiBold', fontSize: SIZES.body2, color: COLORS.textOnAccent }, // For dark theme buttons

  // --- Light Theme Fonts (For Auth Screens - New Additions) ---
  authTitle: { fontFamily: 'Inter-Bold', fontSize: SIZES.h1 + 2, color: COLORS.textDarkPrimary, textAlign: 'center' }, // Slightly larger for impact
  authSubtitle: { fontFamily: 'Inter-Regular', fontSize: SIZES.body2, color: COLORS.textDarkSecondary, textAlign: 'center', marginBottom: SIZES.padding * 2 },
  authButtonPrimary: { fontFamily: 'Inter-SemiBold', fontSize: SIZES.h4, color: COLORS.buttonBlueText },
  authButtonSecondary: { fontFamily: 'Inter-SemiBold', fontSize: SIZES.h4, color: COLORS.buttonLightSecondaryText },
  // authInputLabel: { fontFamily: 'Inter-Regular', fontSize: SIZES.body2, color: COLORS.textDarkSecondary }, // If you add labels above inputs
  authInputText: { fontFamily: 'Inter-Regular', fontSize: SIZES.h4, color: COLORS.textDarkPrimary }, // For the text typed into inputs
  authLink: { fontFamily: 'Inter-SemiBold', fontSize: SIZES.body2, color: COLORS.linkBlue },
  authFooter: { fontFamily: 'Inter-Regular', fontSize: SIZES.body3, color: COLORS.textDarkTertiary, textAlign: 'center'},
};

const appTheme = { COLORS, SIZES, FONTS };
export default appTheme;