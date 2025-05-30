
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BottomNavigation from '@/components/layout/BottomNavigation';

const Dashboard = () => {
  const { user } = useAuth();

  const announcements = [
    "No messages from proctor"
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-unicampus-red rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">UC</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">UniCampus</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ramaiah Institute of Technology</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Welcome Card */}
        <Card className="animate-slide-up">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Hi, {user?.name} 😎
                </h2>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Class</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{user?.class}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Course</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{user?.course}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Proctor Announcements */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>📢</span>
              <span>Proctor Announcements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-gray-600 dark:text-gray-400 text-center py-4">
              {announcements[0]}
            </div>
          </CardContent>
        </Card>

        {/* Fee Status */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <CardHeader>
            <CardTitle>Your Fees Paid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-8">
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-4 py-2 text-lg">
                ✅ Updated data
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="animate-slide-up cursor-pointer hover:shadow-lg transition-shadow" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-medium text-gray-900 dark:text-white">Results</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">View grades</p>
            </CardContent>
          </Card>
          
          <Card className="animate-slide-up cursor-pointer hover:shadow-lg transition-shadow" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-2">📚</div>
              <h3 className="font-medium text-gray-900 dark:text-white">Resources</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Study materials</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
