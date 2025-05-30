
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { useTheme } from '@/contexts/ThemeContext';

const AttendanceScreen = () => {
  const { theme } = useTheme();

  // Sample attendance data
  const attendanceData = [
    { subject: '22AL61', code: 'AIML', percentage: 85, attended: 34, total: 40 },
    { subject: '22CS62', code: 'CN', percentage: 92, attended: 46, total: 50 },
    { subject: '22CS63', code: 'DBMS', percentage: 78, attended: 39, total: 50 },
    { subject: '22CS64', code: 'SE', percentage: 88, attended: 44, total: 50 },
    { subject: '22CS65', code: 'OS', percentage: 76, attended: 38, total: 50 },
    { subject: '22IM66', code: 'IM', percentage: 95, attended: 38, total: 40 }
  ];

  const overallAttendance = Math.round(
    attendanceData.reduce((sum, subject) => sum + subject.percentage, 0) / attendanceData.length
  );

  const getBarColor = (percentage: number) => {
    if (percentage >= 75) return '#10B981'; // Green
    if (percentage >= 50) return '#F59E0B'; // Yellow
    return '#EF4444'; // Red
  };

  const CustomLabel = (props: any) => {
    const { x, y, width, value } = props;
    return (
      <text
        x={x + width / 2}
        y={y - 5}
        fill={theme === 'dark' ? '#E5E7EB' : '#374151'}
        textAnchor="middle"
        fontSize="12"
        fontWeight="500"
      >
        {value}%
      </text>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Attendance</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Overall Attendance */}
        <Card className="animate-fade-in">
          <CardContent className="p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Overall Attendance
            </h2>
            <div className="text-4xl font-bold text-unicampus-red mb-2">
              {overallAttendance}%
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Keep up the good work!
            </p>
          </CardContent>
        </Card>

        {/* Attendance Histogram */}
        <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="text-gray-900 dark:text-white">Subject-wise Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                  <XAxis 
                    dataKey="code" 
                    tick={{ fontSize: 12, fill: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}
                    tickLine={{ stroke: theme === 'dark' ? '#374151' : '#D1D5DB' }}
                  />
                  <YAxis 
                    domain={[0, 100]}
                    tick={{ fontSize: 12, fill: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}
                    tickLine={{ stroke: theme === 'dark' ? '#374151' : '#D1D5DB' }}
                    axisLine={{ stroke: theme === 'dark' ? '#374151' : '#D1D5DB' }}
                  />
                  <Bar dataKey="percentage" radius={[4, 4, 0, 0]} label={<CustomLabel />}>
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getBarColor(entry.percentage)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Subject List */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Subjects</h2>
          {attendanceData.map((subject, index) => (
            <Card 
              key={subject.subject} 
              className="animate-slide-up cursor-pointer hover:shadow-lg transition-all"
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {subject.subject} - {subject.code}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {subject.attended}/{subject.total} classes attended
                    </p>
                  </div>
                  <div className="text-right">
                    <div 
                      className={`text-2xl font-bold ${
                        subject.percentage >= 75 
                          ? 'text-green-500' 
                          : subject.percentage >= 50 
                          ? 'text-yellow-500' 
                          : 'text-red-500'
                      }`}
                    >
                      {subject.percentage}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default AttendanceScreen;
