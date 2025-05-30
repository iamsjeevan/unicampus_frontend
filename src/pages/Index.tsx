
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import StartingScreen from '@/components/auth/StartingScreen';
import Dashboard from '@/components/dashboard/Dashboard';

const Index = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return <StartingScreen />;
};

export default Index;
