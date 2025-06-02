// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import apiClient from '../lib/apiClient'; // Import the API client

// Updated User interface based on your /auth/login/student response
interface User {
  id: string;         // User's MongoDB ObjectId
  usn: string;
  name: string;
  email: string;       // e.g., usn@unicampus.app
  role: 'student' | 'admin'; // Assuming admin role also exists
  collegeProfile?: {
    officialName?: string;
    department?: string;
    semester?: number;
    section?: string;
    usn?: string; // Can be redundant but might be from a different source
    // Add other fields as per your API
  };
  mostRecentCGPA?: number | null;
  avatar?: string | null;
  // Add fields from /users/me if different/more comprehensive
  academicSummaries?: Array<{ code: string; name: string; cieTotal: number | null; attendancePercentage: number | null }>;
  examHistory?: Array<{ semesterName: string; creditsRegistered: number; creditsEarned: number; sgpa: number | null; cgpa: number | null }>;
  collegeDataLastUpdated?: string; // ISO datetime
  createdAt?: string; // ISO datetime
  updatedAt?: string; // ISO datetime
}

// API Response structure for login
interface LoginApiResponse {
  status: string;
  accessToken: string;
  refreshToken: string;
  data: {
    user: User;
  };
}

// API Response structure for /users/me
interface UserProfileApiResponse {
    status: string;
    data: {
        user: User;
    };
}

// API Response for token refresh
interface RefreshTokenApiResponse {
    status: string;
    accessToken: string;
}


interface AuthContextType {
  user: User | null;
  accessToken: string | null; // Store accessToken
  isLoading: boolean; // For initial load and login/logout processes
  isAuthenticated: boolean;
  login: (usn: string, dob_dd: string, dob_mm: string, dob_yyyy: string) => Promise<void>; // Update params
  logout: () => Promise<void>;
  fetchUserProfile: () => Promise<void>; // To load user on app start or refresh
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refreshToken'));
  const [isLoading, setIsLoading] = useState(true); // True initially to load user

  const isAuthenticated = !!accessToken && !!user; // User must also be loaded

  useEffect(() => {
    const loadUserFromToken = async () => {
      if (accessToken) {
        try {
          await fetchUserProfile(); // Try to fetch user profile if token exists
        } catch (error: any) {
          console.error("Failed to load user with existing token:", error);
          if (error.httpStatus === 401) { // If token is invalid/expired
            await attemptRefreshTokenAndRetry(fetchUserProfile);
          } else {
            // For other errors, or if refresh fails, clear auth data
            clearAuthData();
          }
        }
      }
      setIsLoading(false);
    };
    loadUserFromToken();
  }, []); // Empty dependency array: run once on mount

  const storeAuthData = (accessTok: string, refreshTok: string, userData?: User) => {
    localStorage.setItem('accessToken', accessTok);
    localStorage.setItem('refreshToken', refreshTok);
    setAccessToken(accessTok);
    setRefreshToken(refreshTok);
    if (userData) {
        setUser(userData);
    }
  };

  const clearAuthData = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  const login = async (usn: string, dob_dd: string, dob_mm: string, dob_yyyy: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await apiClient<LoginApiResponse>('/auth/login/student', {
        method: 'POST',
        data: { usn, dob_dd, dob_mm, dob_yyyy }, // Match your API request body
        isPublic: true, // Login doesn't require a token
      });

      if (response.status === 'success' && response.accessToken && response.refreshToken && response.data.user) {
        storeAuthData(response.accessToken, response.refreshToken, response.data.user);
      } else {
        // If API returns success but missing data, treat as error
        throw new Error(response.status || 'Login failed: Invalid response from server.');
      }
    } catch (error: any) {
      clearAuthData(); // Ensure tokens are cleared on login failure
      console.error("Login error:", error);
      throw error; // Re-throw to be caught by LoginScreen
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    // Call backend logout if it exists and does something meaningful (e.g., invalidates refresh token)
    try {
        if (accessToken) { // Only call if there's a token to invalidate
            await apiClient('/auth/logout', { method: 'POST' });
        }
    } catch (error) {
        console.warn("Backend logout call failed or not critical, clearing client-side tokens:", error);
    } finally {
        clearAuthData();
        setIsLoading(false);
        // Optionally navigate to login or home page after logout
        // navigate('/login'); // if using react-router
    }
  };

  const fetchUserProfile = async (): Promise<void> => {
    if (!localStorage.getItem('accessToken')) { // Use localStorage directly here as state might not be updated yet
      // setIsLoading(false); // Ensure loading state is managed
      return; // No token, no user to fetch
    }
    // setIsLoading(true); // Set loading true when fetching
    try {
      const response = await apiClient<UserProfileApiResponse>('/users/me', { method: 'GET' });
      if (response.status === 'success' && response.data.user) {
        setUser(response.data.user);
      } else {
        throw new Error('Failed to fetch user profile: Invalid response.');
      }
    } catch (error: any) {
      console.error("Fetch user profile error:", error);
      if (error.httpStatus === 401) { // Token might be expired
        // Attempt to refresh token, then retry fetching profile
        await attemptRefreshTokenAndRetry(fetchUserProfile);
      } else {
        // For other errors, or if refresh fails, clear auth data
        clearAuthData();
      }
      throw error; // Re-throw for components or initial load to handle
    }
    // finally { setIsLoading(false); } // Manage loading state appropriately
  };

  const attemptRefreshTokenAndRetry = async (retryCallback: () => Promise<void>) => {
    const currentRefreshToken = localStorage.getItem('refreshToken');
    if (!currentRefreshToken) {
      console.log("No refresh token available. Logging out.");
      clearAuthData();
      return;
    }

    try {
      console.log("Attempting to refresh token...");
      const refreshResponse = await apiClient<RefreshTokenApiResponse>('/auth/refresh-token', {
        method: 'POST',
        isRefreshTokenRequest: true, // Use refresh token for Authorization header
        isPublic: false, // Although it uses a token, it's a specific auth flow
      });

      if (refreshResponse.status === 'success' && refreshResponse.accessToken) {
        console.log("Token refreshed successfully.");
        // Store only the new access token. Refresh token might also be rotated by backend.
        // For simplicity, we assume refresh token remains valid or backend doesn't rotate it often.
        // If backend sends new refresh token, update it here.
        storeAuthData(refreshResponse.accessToken, currentRefreshToken); // Re-use old refresh token for now
        await retryCallback(); // Retry the original failed request (e.g., fetchUserProfile)
      } else {
        console.error("Token refresh failed with success status but no new token.");
        clearAuthData(); // If refresh fails, logout
      }
    } catch (refreshError) {
      console.error("Token refresh API call failed:", refreshError);
      clearAuthData(); // If refresh fails, logout
    }
  };


  return (
    <AuthContext.Provider value={{
      user,
      accessToken, // Expose accessToken if needed by other parts of app directly (though apiClient handles it)
      isLoading,
      login,
      logout,
      isAuthenticated,
      fetchUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};