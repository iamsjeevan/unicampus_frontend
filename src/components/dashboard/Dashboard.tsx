// src/components/dashboard/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BottomNavigation from '@/components/layout/BottomNavigation';
import apiClient from '@/lib/apiClient';
import { toast } from '@/hooks/use-toast';

// Define interfaces for API responses for this component

// --- Proctor Announcement Data Structures ---
interface ProctorAnnouncement {
  // Adjust these fields to match your actual API response for a single announcement
  id: string; // Or _id
  title?: string; // Optional title
  message: string; // Or content, text
  createdAt: string; // Or date, timestamp (ensure it's a string if API sends ISO string)
  // Add any other relevant fields like 'author', 'updatedAt', etc.
}

interface ProctorAnnouncementsApiResponse {
  status: string;
  data: ProctorAnnouncement[]; // 'data' is now directly the array of announcements
}

// --- Fees Status Data Structures ---
interface FeesStatus {
  // Adjust these fields to match your actual API response for fees
  statusText: string; // e.g., "All fees paid", "Fees due"
  isUpdated?: boolean; // Or a more specific status like 'paid', 'due', 'overdue'
  amountDue?: number;
  dueDate?: string;
  // Add any other relevant fields
}

interface FeesStatusApiResponse {
  status: string;
  data: FeesStatus; // Assuming 'data' is an object containing fees details
}


const Dashboard = () => {
  const { user, isAuthenticated, isLoading: authIsLoading } = useAuth();
  const navigate = useNavigate(); // Initialize navigate

  const [announcements, setAnnouncements] = useState<ProctorAnnouncement[]>([]);
  const [feesStatus, setFeesStatus] = useState<FeesStatus | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true); // Start true

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) {
        setIsLoadingData(false); // Not authenticated, nothing to load
        return;
      }

      setIsLoadingData(true); // Set loading true before fetching
      try {
        // Fetch Proctor Announcements
        const announcementsResponse = await apiClient<ProctorAnnouncementsApiResponse>('/announcements/proctor');
        if (announcementsResponse.status === 'success' && Array.isArray(announcementsResponse.data)) {
          setAnnouncements(announcementsResponse.data);
        } else {
          console.warn("Proctor announcements data format unexpected or not an array:", announcementsResponse);
          // Set an empty array or a placeholder if preferred, instead of fallback with message
          setAnnouncements([]);
        }

        // Fetch User Fees Status
        const feesResponse = await apiClient<FeesStatusApiResponse>('/users/me/fees');
        if (feesResponse.status === 'success' && feesResponse.data) {
          setFeesStatus(feesResponse.data);
        } else {
          console.warn("Fees status data format unexpected or missing:", feesResponse);
          setFeesStatus({ statusText: "Could not load fees data" }); // Fallback object
        }

      } catch (error: any) {
        console.error("Error fetching dashboard data:", error);
        toast({
          title: "Error Fetching Data",
          description: error.message || "Could not load dashboard information.",
          variant: "destructive",
        });
        // Set fallback/empty data on error
        setAnnouncements([]);
        setFeesStatus({ statusText: "Error loading fees data" });
      } finally {
        setIsLoadingData(false);
      }
    };

    if (isAuthenticated) {
        fetchData();
    } else if (!authIsLoading) { // If not authenticating and not authenticated
        setIsLoadingData(false); // Stop loading if user is definitely not logged in
    }
  }, [isAuthenticated, authIsLoading]); // Re-fetch if isAuthenticated changes or auth loading finishes

  if (authIsLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading authentication...</div>;
  }

  if (!isAuthenticated && !authIsLoading) {
    // This check ensures we don't flash this message while auth is still loading
    // For a better UX, ProtectedRoute in App.tsx should handle redirection.
    // If user somehow lands here without auth, provide a way back or info.
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <p className="mb-4">Please log in to view your dashboard.</p>
            <button 
                onClick={() => navigate('/login/student')} 
                className="px-4 py-2 bg-unicampus-red text-white rounded hover:bg-unicampus-red-dark"
            >
                Go to Login
            </button>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
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

      {isLoadingData && (
          <div className="flex items-center justify-center min-h-[calc(100vh-150px)]"> {/* Adjust height as needed */}
              Loading dashboard data... {/* Replace with a proper skeleton loader */}
          </div>
      )}

      {!isLoadingData && user && (
          <div className="p-4 space-y-6">
            {/* Welcome Card */}
            <Card className="animate-slide-up">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                    {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-2xl font-semibold">{user.name?.charAt(0).toUpperCase() || 'U'}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      Hi, {user.name || user.usn} 😎
                    </h2>
                    <div className="mt-2 space-y-1">
                      {user.collegeProfile?.semester && user.collegeProfile?.section && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Class:</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                SEM {user.collegeProfile.semester}-{user.collegeProfile.section}
                            </span>
                          </div>
                      )}
                      {user.collegeProfile?.department && (
                           <div className="flex justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Course:</span>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {user.collegeProfile.department} {/* Assuming full dept name */}
                            </span>
                          </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Proctor Announcements */}
            <Card className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-800 dark:text-gray-200">
                  <span>📢</span>
                  <span>Proctor Announcements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {announcements.length > 0 ? (
                  <ul className="space-y-2">
                    {announcements.map(ann => (
                      <li key={ann.id} className="text-sm text-gray-700 dark:text-gray-300 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                        {ann.title && <strong className="block mb-1">{ann.title}</strong>}
                        {ann.message}
                        {/* <span className="text-xs block mt-1 text-gray-500 dark:text-gray-400">
                            {new Date(ann.createdAt).toLocaleDateString()}
                        </span> */}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-gray-600 dark:text-gray-400 text-center py-4">
                    No new announcements.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Fee Status */}
            <Card className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="text-gray-800 dark:text-gray-200">Your Fees Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-8">
                  {feesStatus ? (
                      <Badge 
                        className={`${feesStatus.isUpdated === false ? // Example condition, adjust based on your 'FeesStatus' fields
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        } px-4 py-2 text-lg`}
                      >
                        {feesStatus.isUpdated === false ? '⚠️ ' : '✅ '} {feesStatus.statusText}
                      </Badge>
                  ) : (
                      <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 px-4 py-2 text-lg">
                        Loading...
                      </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Card 
                onClick={() => navigate('/results')}
                className="animate-slide-up cursor-pointer hover:shadow-lg transition-shadow dark:bg-gray-800" style={{ animationDelay: '0.3s' }}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">📊</div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Results</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">View grades</p>
                </CardContent>
              </Card>
              
              <Card 
                onClick={() => navigate('/resources')}
                className="animate-slide-up cursor-pointer hover:shadow-lg transition-shadow dark:bg-gray-800" style={{ animationDelay: '0.4s' }}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">📚</div>
                  <h3 className="font-medium text-gray-900 dark:text-white">Resources</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Study materials</p>
                </CardContent>
              </Card>
            </div>
          </div>
      )}

      <BottomNavigation />
    </div>
  );
};

export default Dashboard;