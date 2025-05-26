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
