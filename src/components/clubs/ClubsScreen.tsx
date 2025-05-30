
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BottomNavigation from '@/components/layout/BottomNavigation';

const ClubsScreen = () => {
  const clubs = [
    {
      id: 1,
      name: 'MSRIT Discord',
      icon: '💬',
      description: 'Official Discord server for MSRIT students',
      members: 1200,
      category: 'Communication'
    },
    {
      id: 2,
      name: 'GDSC-RIT',
      icon: '🌐',
      description: 'Google Developer Student Club at Ramaiah Institute of Technology',
      members: 450,
      category: 'Technology'
    },
    {
      id: 3,
      name: 'CodeRIT',
      icon: '💻',
      description: 'Competitive programming and coding community',
      members: 320,
      category: 'Programming'
    },
    {
      id: 4,
      name: 'Nakama',
      icon: '🎌',
      description: 'Japanese culture and anime enthusiasts club',
      members: 180,
      category: 'Culture'
    }
  ];

  const academics = [
    {
      id: 1,
      name: 'Course Material',
      icon: '📖',
      description: 'Access lecture notes and study materials'
    },
    {
      id: 2,
      name: 'Syllabi',
      icon: '📋',
      description: 'View course syllabi and curriculum'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Clubs</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Clubs Section */}
        <div className="space-y-4">
          {clubs.map((club, index) => (
            <Card key={club.id} className="animate-slide-up cursor-pointer hover:shadow-lg transition-all" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{club.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{club.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{club.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {club.members} members
                      </Badge>
                      <Badge className="bg-unicampus-red/10 text-unicampus-red border-unicampus-red/20">
                        {club.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 my-8"></div>

        {/* Academics Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Academics</h2>
          <div className="space-y-3">
            {academics.map((item, index) => (
              <Card key={item.id} className="animate-slide-up cursor-pointer hover:shadow-lg transition-all" style={{ animationDelay: `${(index + clubs.length) * 0.1}s` }}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{item.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ClubsScreen;
