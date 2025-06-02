// src/components/attendance/AttendanceScreen.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, Tooltip, Legend, CartesianGrid } from 'recharts';import BottomNavigation from '@/components/layout/BottomNavigation';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext'; // For checking authentication
import apiClient from '@/lib/apiClient';      // For making API calls
import { toast } from '@/hooks/use-toast';      // For showing error messages

// --- Define TypeScript Interfaces for API Responses ---

interface AttendanceSubject {
  code: string;         // e.g., "22CS62"
  name: string;         // e.g., "Cloud Computing and Big Data"
  attendancePercentage: number | null;
  // Add other fields if your API provides them, e.g., attendedClasses, totalClasses
  // attendedClasses?: number;
  // totalClasses?: number;
}

interface AttendanceSummaryApiResponse {
  status: string;
  data: {
    subjects: AttendanceSubject[];
    // Add overallAttendance if your API provides it directly
    // overallAttendancePercentage?: number | null;
  };
}

// --- AttendanceScreen Component ---

const AttendanceScreen = () => {
  const { theme } = useTheme();
  const { isAuthenticated, isLoading: authIsLoading } = useAuth();

  // State for API data
  const [attendanceData, setAttendanceData] = useState<AttendanceSubject[]>([]);
  const [isLoadingAttendance, setIsLoadingAttendance] = useState(true);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      if (!isAuthenticated) {
        setIsLoadingAttendance(false);
        return;
      }

      setIsLoadingAttendance(true);
      try {
        const response = await apiClient<AttendanceSummaryApiResponse>('/attendance/summary');
        if (response.status === 'success' && response.data?.subjects) {
          setAttendanceData(response.data.subjects);
        } else {
          console.warn("Attendance summary data format unexpected or missing:", response);
          setAttendanceData([]);
          toast({ title: "Attendance Data", description: "Could not load attendance summary.", variant: "default" });
        }
      } catch (error: any) {
        console.error("Error fetching attendance data:", error);
        toast({
          title: "Error Fetching Attendance",
          description: error.message || "Could not load attendance summary.",
          variant: "destructive",
        });
        setAttendanceData([]);
      } finally {
        setIsLoadingAttendance(false);
      }
    };

    if (isAuthenticated) {
      fetchAttendanceData();
    } else if (!authIsLoading) {
      setIsLoadingAttendance(false);
    }
  }, [isAuthenticated, authIsLoading]);

  const overallAttendance = attendanceData.length > 0
    ? Math.round(
        attendanceData.reduce((sum, subject) => sum + (subject.attendancePercentage || 0), 0) /
        attendanceData.filter(s => s.attendancePercentage !== null).length // Average only those with data
      ) || 0 // Default to 0 if all are null or array is empty
    : 0;

  const getBarColor = (percentage: number | null): string => {
    if (percentage === null) return theme === 'dark' ? '#4B5563' : '#9CA3AF'; // Gray for N/A
    if (percentage >= 75) return '#10B981'; // Green
    if (percentage >= 50) return '#F59E0B'; // Yellow
    return '#EF4444'; // Red
  };

  const CustomLabel = (props: any) => {
    const { x, y, width, value, fill } = props; // `fill` is passed by Bar's Cell
    if (value === null || value === undefined) return null;
    return (
      <text
        x={x + width / 2}
        y={y - 5}
        fill={fill === '#4B5563' || fill === '#9CA3AF' ? (theme === 'dark' ? '#E5E7EB' : '#374151') : fill} // Adjust label color based on bar color
        textAnchor="middle"
        fontSize="12"
        fontWeight="500"
      >
        {value}%
      </text>
    );
  };

  const chartData = attendanceData.map(item => ({
    code: item.code, // Use code for X-axis
    name: item.name, // For tooltip
    percentage: item.attendancePercentage,
  }));


  if (authIsLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading authentication...</div>;
  }

  if (!isAuthenticated && !authIsLoading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <p className="mb-4">Please log in to view your attendance.</p>
        </div>
    );
  }

  if (isLoadingAttendance) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 flex items-center justify-center">
        <p>Loading attendance data...</p> {/* Replace with Skeleton Loaders */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 py-6 sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Attendance</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Overall Attendance */}
        <Card className="animate-fade-in">
          <CardContent className="p-6 text-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Overall Attendance
            </h2>
            <div className={`text-4xl font-bold mb-2 ${getBarColor(overallAttendance).startsWith('#10B') ? 'text-green-500' : getBarColor(overallAttendance).startsWith('#F59') ? 'text-yellow-500' : 'text-red-500'}`}>
              {overallAttendance}%
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {overallAttendance >= 75 ? "Excellent! Keep it up." : overallAttendance >= 50 ? "Good, but aim higher." : "Attention needed!"}
            </p>
          </CardContent>
        </Card>

        {attendanceData.length > 0 ? (
          <>
            {/* Attendance Histogram */}
            <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">Subject-wise Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full sm:h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 30, right: 10, left: -15, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'} />
                      <XAxis
                        dataKey="code"
                        tick={{ fontSize: 12, fill: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}
                        tickLine={{ stroke: theme === 'dark' ? '#374151' : '#D1D5DB' }}
                        axisLine={{ stroke: theme === 'dark' ? '#374151' : '#D1D5DB' }}
                        interval={0}
                      />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fontSize: 12, fill: theme === 'dark' ? '#9CA3AF' : '#6B7280' }}
                        tickLine={{ stroke: theme === 'dark' ? '#374151' : '#D1D5DB' }}
                        axisLine={{ stroke: theme === 'dark' ? '#374151' : '#D1D5DB' }}
                      />
                      <Tooltip
                        contentStyle={{
                            backgroundColor: theme === 'dark' ? 'rgba(31, 41, 55, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                            borderColor: theme === 'dark' ? '#4B5563' : '#D1D5DB',
                            borderRadius: '0.375rem',
                        }}
                        labelStyle={{ color: theme === 'dark' ? '#F3F4F6' : '#1F2937', fontWeight: 'bold' }}
                        formatter={(value: number | null, name: string, props: any) => [`${props.payload.name}: ${value !== null ? value + '%' : 'N/A'}`, null]}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px' }} />
                      <Bar dataKey="percentage" name="Attendance %" label={<CustomLabel />}>
                        {chartData.map((entry, index) => (
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
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Subjects Details</h2>
              {attendanceData.map((subject, index) => (
                <Card
                  key={subject.code || index} // Use code as key
                  className="animate-slide-up hover:shadow-lg transition-all dark:bg-gray-800"
                  style={{ animationDelay: `${(index + 2) * 0.05}s` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate" title={subject.name}>
                          {subject.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          ({subject.code})
                          {/* If API provides attended/total classes, display here */}
                          {/* {subject.attendedClasses !== undefined && subject.totalClasses !== undefined &&
                            ` - ${subject.attendedClasses}/${subject.totalClasses} classes`
                          } */}
                        </p>
                      </div>
                      <div className="text-right pl-2">
                        <div
                          className={`text-2xl font-bold ${
                            getBarColor(subject.attendancePercentage).startsWith('#10B') ? 'text-green-500' :
                            getBarColor(subject.attendancePercentage).startsWith('#F59') ? 'text-yellow-500' :
                            getBarColor(subject.attendancePercentage).startsWith('#EF4') ? 'text-red-500' :
                            'text-gray-500' // For N/A
                          }`}
                        >
                          {subject.attendancePercentage !== null ? `${subject.attendancePercentage}%` : 'N/A'}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
            <Card className="dark:bg-gray-800">
                <CardContent className="p-8 text-center">
                    <div className="text-4xl mb-4 text-gray-400 dark:text-gray-500">📊</div>
                    <p className="text-gray-600 dark:text-gray-400">
                    Attendance data is not yet available or could not be loaded.
                    </p>
                </CardContent>
            </Card>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default AttendanceScreen;