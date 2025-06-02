// src/components/results/ResultsScreen.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts'; // Added Tooltip, Legend
import BottomNavigation from '@/components/layout/BottomNavigation';
import { useAuth } from '@/contexts/AuthContext'; // For checking authentication
import apiClient from '@/lib/apiClient';      // For making API calls
import { toast } from '@/hooks/use-toast';      // For showing error messages

// --- Define TypeScript Interfaces for API Responses ---

// For individual CIE subject
interface CieSubject {
  code: string;
  name: string;
  cieTotal: number | null;
  // Add other fields if your API provides them, e.g., maxMarks for CIE
  // maxCieMarks?: number;
}

// For the /results/cie API response
interface CieResultsApiResponse {
  status: string;
  data: {
    subjects: CieSubject[];
  };
}

// For individual SEE semester result
interface SeeSemesterResult {
  semesterName: string;
  sgpa: number | null;
  cgpa: number | null;
  creditsRegistered?: number; // Optional, from your API doc example for /users/me
  creditsEarned?: number;   // Optional
  // Add other fields if your API provides them for each semester
}

// For the /results/see API response
interface SeeResultsApiResponse {
  status: string;
  data: {
    mostRecentCGPA: number | null;
    semesters: SeeSemesterResult[];
  };
}

// --- ResultsScreen Component ---

const ResultsScreen = () => {
  const { isAuthenticated, isLoading: authIsLoading } = useAuth();

  // State for API data
  const [cieData, setCieData] = useState<CieSubject[]>([]);
  const [seeData, setSeeData] = useState<SeeSemesterResult[]>([]);
  const [mostRecentCGPA, setMostRecentCGPA] = useState<number | null>(null);
  const [isLoadingResults, setIsLoadingResults] = useState(true); // For loading API data

  // Fetch data when component mounts and user is authenticated
  useEffect(() => {
    const fetchResultsData = async () => {
      if (!isAuthenticated) {
        setIsLoadingResults(false);
        return;
      }

      setIsLoadingResults(true);
      try {
        // Fetch CIE Results
        const cieResponse = await apiClient<CieResultsApiResponse>('/results/cie');
        if (cieResponse.status === 'success' && cieResponse.data?.subjects) {
          setCieData(cieResponse.data.subjects);
        } else {
          console.warn("CIE results data format unexpected or missing:", cieResponse);
          setCieData([]); // Set to empty array on error or unexpected format
          toast({ title: "CIE Data", description: "Could not load CIE results.", variant: "default" });
        }

        // Fetch SEE Results
        const seeResponse = await apiClient<SeeResultsApiResponse>('/results/see');
        if (seeResponse.status === 'success' && seeResponse.data) {
          setSeeData(seeResponse.data.semesters || []);
          setMostRecentCGPA(seeResponse.data.mostRecentCGPA);
        } else {
          console.warn("SEE results data format unexpected or missing:", seeResponse);
          setSeeData([]);
          setMostRecentCGPA(null);
          toast({ title: "SEE Data", description: "Could not load SEE results.", variant: "default" });
        }

      } catch (error: any) {
        console.error("Error fetching results data:", error);
        toast({
          title: "Error Fetching Results",
          description: error.message || "Could not load academic results.",
          variant: "destructive",
        });
        setCieData([]);
        setSeeData([]);
        setMostRecentCGPA(null);
      } finally {
        setIsLoadingResults(false);
      }
    };

    if (isAuthenticated) {
      fetchResultsData();
    } else if (!authIsLoading) { // If auth check is done and not authenticated
        setIsLoadingResults(false); // No data to load
    }
  }, [isAuthenticated, authIsLoading]); // Dependency array

  // Prepare data for CIE chart (assuming CIE total is out of 30 for the chart, adjust if needed)
  const cieChartData = cieData.map(item => ({
    subject: item.code, // Use code for brevity in chart
    name: item.name,    // For tooltip
    marks: item.cieTotal,
    total: 30 // Assuming a fixed total for chart Y-axis, or get from API if available
  }));

  // Prepare data for SEE chart (GPA per semester)
  const seeChartData = seeData.map(item => ({
    semester: item.semesterName.replace('Sem - ', 'S'), // Shorten for X-axis
    gpa: item.sgpa,
  }));


  if (authIsLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading authentication...</div>;
  }

  if (!isAuthenticated && !authIsLoading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <p className="mb-4">Please log in to view your results.</p>
            {/* Optionally add a login button here if needed */}
        </div>
    );
  }

  if (isLoadingResults) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 flex items-center justify-center">
        <p>Loading results...</p> {/* Replace with Skeleton Loaders */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 py-6 sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Academic Results</h1>
      </div>

      <div className="p-4">
        <Tabs defaultValue="cie" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="cie" className="data-[state=active]:bg-unicampus-red data-[state=active]:text-white">
              CIE (Internals)
            </TabsTrigger>
            <TabsTrigger value="see" className="data-[state=active]:bg-unicampus-red data-[state=active]:text-white">
              SEE (Semester End)
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cie" className="space-y-6">
            {cieData.length > 0 ? (
              <>
                {/* CIE Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Subject-wise CIE Marks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72 sm:h-80"> {/* Increased height for better readability */}
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={cieChartData} margin={{ top: 5, right: 0, left: -20, bottom: 55 }}> {/* Adjusted margins */}
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="subject" angle={-45} textAnchor="end" interval={0} /> {/* interval={0} to show all labels */}
                          <YAxis domain={[0, 30]} allowDataOverflow={true} /> {/* Or make domain dynamic */}
                          <Tooltip formatter={(value, name, props) => [`${props.payload.name}: ${value}`, null]}/>
                          <Legend />
                          <Bar dataKey="marks" name="CIE Marks" fill="#FF3B30" radius={[4, 4, 0, 0]} barSize={30} /> {/* Adjusted barSize */}
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* CIE Results List */}
                <div className="space-y-3">
                  {cieData.map((item, index) => (
                    <Card key={item.code || index} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">({item.code})</p>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-bold text-unicampus-red">
                              {item.cieTotal !== null ? `${item.cieTotal}/30` : 'N/A'} {/* Assuming total is 30 */}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <Card>
                <CardContent className="p-6 text-center text-gray-600 dark:text-gray-400">
                  No CIE data available or could not be loaded.
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="see" className="space-y-6">
            {seeData.length > 0 || mostRecentCGPA !== null ? (
              <>
                {/* CGPA Display */}
                {mostRecentCGPA !== null && (
                    <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Overall CGPA</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 text-center">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        {mostRecentCGPA.toFixed(2)}
                        </h2>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-2 bg-gradient-to-r from-unicampus-red to-unicampus-red-light rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${(mostRecentCGPA / 10) * 100}%` }} // Assuming CGPA is out of 10
                        ></div>
                        </div>
                    </CardContent>
                    </Card>
                )}

                {/* SEE GPA Chart */}
                {seeData.length > 0 && (
                    <Card>
                    <CardHeader>
                        <CardTitle>Semester-wise GPA (SGPA)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-72 sm:h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={seeChartData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="semester" />
                            <YAxis domain={[0, 10]} allowDataOverflow={true} />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="gpa" name="SGPA" fill="#FF6B6B" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                        </div>
                    </CardContent>
                    </Card>
                )}

                {/* Semester-wise Results List */}
                {seeData.length > 0 && (
                    <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 px-1">Semester Details</h3>
                    {seeData.map((item, index) => (
                        <Card key={item.semesterName || index} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                            <h3 className="font-medium text-gray-900 dark:text-white">{item.semesterName}</h3>
                            <div className="text-right space-y-1">
                                <span className="block text-md font-semibold text-unicampus-red">
                                SGPA: {item.sgpa !== null ? item.sgpa.toFixed(2) : 'N/A'}
                                </span>
                                {item.cgpa !== null && (
                                <span className="block text-xs text-gray-500 dark:text-gray-400">
                                    CGPA after this sem: {item.cgpa.toFixed(2)}
                                </span>
                                )}
                            </div>
                            </div>
                        </CardContent>
                        </Card>
                    ))}
                    </div>
                )}
              </>
            ) : (
              <Card>
                <CardContent className="p-6 text-center text-gray-600 dark:text-gray-400">
                  No SEE data available or could not be loaded.
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ResultsScreen;