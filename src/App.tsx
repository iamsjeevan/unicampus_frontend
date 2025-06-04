// src/App.tsx
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginScreen from "@/components/auth/LoginScreen";
import Dashboard from "@/components/dashboard/Dashboard";
import ResultsScreen from "@/components/results/ResultsScreen";
import CommunitiesScreen from "@/components/communities/CommunitiesScreen";
import CommunityDetailScreen from "@/components/communities/CommunityDetailScreen";
import AttendanceScreen from "@/components/attendance/AttendanceScreen";
import ResourcesScreen from "@/components/resources/ResourcesScreen";
import SettingsScreen from "@/components/settings/SettingsScreen";
import CreateResourceScreen from "@/components/resources/CreateResourceScreen";
import PostDetailScreen from '@/components/posts/PostDetailScreen'; // <--- IMPORT THE NEW SCREEN

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading Session...</div>;
  }
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login/student" element={<LoginScreen />} />
      <Route path="/register" element={<div className="min-h-screen flex items-center justify-center">Registration coming soon!</div>} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/results" element={<ProtectedRoute><ResultsScreen /></ProtectedRoute>} />
      <Route path="/communities" element={<ProtectedRoute><CommunitiesScreen /></ProtectedRoute>} />
      <Route path="/communities/:communityId" element={<ProtectedRoute><CommunityDetailScreen /></ProtectedRoute>} />
      
      {/* --- ADD OR CONFIRM THIS ROUTE FOR POST DETAIL --- */}
      <Route 
        path="/posts/:postId" 
        element={
          <ProtectedRoute> {/* Or make it public if posts can be viewed without login */}
            <PostDetailScreen />
          </ProtectedRoute>
        } 
      />
      {/* ------------------------------------------------- */}

      <Route path="/attendance" element={<ProtectedRoute><AttendanceScreen /></ProtectedRoute>} />
      <Route path="/resources" element={<ProtectedRoute><ResourcesScreen /></ProtectedRoute>} />
      <Route path="/resources/new" element={<ProtectedRoute><CreateResourceScreen /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsScreen /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppRoutes />
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;