import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// REMOVE BrowserRouter from here: import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom"; // Keep these
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext"; // AuthProvider is fine here
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
  const { isAuthenticated, isLoading } = useAuth(); // Add isLoading from useAuth

  if (isLoading) {
    return <div>Loading authentication...</div>; // Or a spinner/skeleton
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />; // Redirect to Index if not authenticated
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} /> {/* Starting/Public Page */}
      <Route path="/login/student" element={<LoginScreen />} /> {/* Removed type="student" assuming LoginScreen handles it or it's the only type */}
      {/* <Route path="/login/admin" element={<LoginScreen type="admin" />} /> Removed for now, assuming one login screen */}
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
  // AuthProvider should ideally be inside ThemeProvider if ThemeProvider doesn't depend on auth.
  // Or if AuthProvider uses hooks from ThemeProvider, then the order is fine.
  // For now, this order is okay.
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme"> {/* Added example props */}
      {/* AuthProvider is ALREADY provided in main.tsx wrapping App.
          If you need AuthProvider here, it means your main.tsx might be wrong,
          OR you intend nested AuthProviders which is unusual.
          Let's assume AuthProvider in main.tsx is correct and remove it from here IF
          your useAuth() in ProtectedRoute is meant to pick up the one from main.tsx.

          However, looking at your `main.tsx`, AuthProvider *is* outside App.
          So, having `useAuth` inside `AppRoutes` (via `ProtectedRoute`) means
          `AuthProvider` needs to be a parent of `AppRoutes`.
          The structure where `App` provides `AuthProvider` and `main.tsx` provides `Router`
          means `AuthProvider` IS a child of `Router` but a parent of `AppRoutes`. This is fine.
          What was wrong was `BrowserRouter` inside `App`.
      */}
      <TooltipProvider> {/* TooltipProvider can wrap AppRoutes */}
        <Toaster />
        <Sonner />
        {/* <BrowserRouter>  <--- REMOVED THIS LINE */}
        <AppRoutes />    {/* <--- AppRoutes is now directly rendered */}
        {/* </BrowserRouter> <--- REMOVED THIS LINE */}
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;