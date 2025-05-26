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
