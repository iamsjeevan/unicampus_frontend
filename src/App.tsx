
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
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

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login/student" element={<LoginScreen type="student" />} />
      <Route path="/login/admin" element={<LoginScreen type="admin" />} />
      <Route path="/register" element={<div className="min-h-screen flex items-center justify-center">Registration coming soon!</div>} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/results" 
        element={
          <ProtectedRoute>
            <ResultsScreen />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/communities" 
        element={
          <ProtectedRoute>
            <CommunitiesScreen />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/communities/:communityId" 
        element={
          <ProtectedRoute>
            <CommunityDetailScreen />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/attendance" 
        element={
          <ProtectedRoute>
            <AttendanceScreen />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/resources" 
        element={
          <ProtectedRoute>
            <ResourcesScreen />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <SettingsScreen />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
