// src/screens/SettingsScreen.tsx  (Note the .tsx extension)

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext'; // Adjust path if needed
import { useTheme } from '@/contexts/ThemeContext'; // Adjust path if needed
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { toast } from 'react-hot-toast'; // Import the toast library

const SettingsScreen = () => {
  // Destructure the functions you need from your excellent AuthContext
  const { logout, fetchUserProfile } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  // State to manage the loading status of the update button specifically
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const settingsItems = [
    { id: 'fee-payment', icon: '💰', title: 'Fee Payment', color: 'text-unicampus-red' },
    { id: 'wifi-complaint', icon: '📶', title: 'Register WiFi complaint', color: 'text-unicampus-red' },
    { id: 'feedback', icon: '🔒', title: 'Feedback', color: 'text-unicampus-red' },
    { id: 'about', icon: 'ℹ️', title: 'About', color: 'text-unicampus-red' },
    { id: 'update-data', icon: '🔄', title: 'Update data', color: 'text-unicampus-red' },
  ];

  const handleLogout = async () => {
    await logout(); // Your logout is async, so it's good practice to await it
    navigate('/');
  };

  // This is the main logic for your new button
  const handleUpdateData = async () => {
    if (isUpdating) return; // Prevent multiple clicks

    setIsUpdating(true);
    const toastId = toast.loading('Updating data...');

    try {
      // Call the function from your context. It handles the API call and state update!
      await fetchUserProfile();

      toast.success('Data updated successfully!', { id: toastId });

      // Navigate to the home page after a short delay to let the user see the success message
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 500);

    } catch (error: any) {
      console.error("Failed to update data from settings:", error);
      // Your context already handles logout on 401, but we can show an error for other cases
      toast.error(error.message || 'Update failed. Please try again.', { id: toastId });
    } finally {
      setIsUpdating(false); // Re-enable the button
    }
  };
  
  // A general handler to route clicks from the settings list
  const handleSettingClick = (id: string) => {
    switch (id) {
      case 'update-data':
        handleUpdateData();
        break;
      // Add other cases for your settings items here
      default:
        toast(`${settingsItems.find(item => item.id === id)?.title} coming soon!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
      </div>

      <div className="p-4 space-y-4">
        {settingsItems.map((item, index) => {
          const isUpdateBtn = item.id === 'update-data';
          return (
            <Card
              key={item.id}
              onClick={() => !isUpdating && handleSettingClick(item.id)} // Prevent clicks while updating
              className={`animate-slide-up hover:shadow-lg transition-all ${
                isUpdateBtn && isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className={`text-2xl ${item.color}`}>{item.icon}</div>
                  <span className="flex-1 font-medium text-gray-900 dark:text-white">{item.title}</span>
                  <div className="text-gray-400">›</div>
                </div>
              </CardContent>
            </Card>
          );
        })}

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
