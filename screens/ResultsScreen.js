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
