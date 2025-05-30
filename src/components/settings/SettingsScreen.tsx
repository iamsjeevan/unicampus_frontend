
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@/components/layout/BottomNavigation';

const SettingsScreen = () => {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const settingsItems = [
    {
      id: 'fee-payment',
      icon: '💰',
      title: 'Fee Payment',
      color: 'text-unicampus-red'
    },
    {
      id: 'wifi-complaint',
      icon: '📶',
      title: 'Register WiFi complaint',
      color: 'text-unicampus-red'
    },
    {
      id: 'feedback',
      icon: '🔒',
      title: 'Feedback',
      color: 'text-unicampus-red'
    },
    {
      id: 'about',
      icon: 'ℹ️',
      title: 'About',
      color: 'text-unicampus-red'
    },
    {
      id: 'update-data',
      icon: '🔄',
      title: 'Update data',
      color: 'text-unicampus-red'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Settings Items */}
        {settingsItems.map((item, index) => (
          <Card key={item.id} className="animate-slide-up cursor-pointer hover:shadow-lg transition-all" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div className={`text-2xl ${item.color}`}>{item.icon}</div>
                <span className="flex-1 font-medium text-gray-900 dark:text-white">{item.title}</span>
                <div className="text-gray-400">›</div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Dark Mode Toggle */}
        <Card className="animate-slide-up" style={{ animationDelay: '0.5s' }}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-2xl text-unicampus-red">🌙</div>
                <span className="font-medium text-gray-900 dark:text-white">Dark Mode</span>
              </div>
              <Switch
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
                className="data-[state=checked]:bg-unicampus-red"
              />
            </div>
          </CardContent>
        </Card>

        {/* Sign Out Button */}
        <div className="pt-8">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full py-6 text-unicampus-red border-unicampus-red hover:bg-unicampus-red hover:text-white animate-slide-up"
            style={{ animationDelay: '0.6s' }}
          >
            Sign out
          </Button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default SettingsScreen;
