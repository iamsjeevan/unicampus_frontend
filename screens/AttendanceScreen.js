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
