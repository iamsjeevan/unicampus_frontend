// src/components/resources/ResourcesScreen.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { PlusCircle, Download, Link as LinkIcon, FileText, AlertCircle, Image as ImageIcon, FileArchive, FileAudio, FileVideo } from 'lucide-react'; // Added more icons
import BottomNavigation from '@/components/layout/BottomNavigation';
import { useAuth } from '@/contexts/AuthContext';
import apiClient, { PaginatedResponse } from '@/lib/apiClient';
import { toast } from '@/hooks/use-toast';
// Removed: import { API_BASE_URL } from '@/config'; // We'll use import.meta.env directly

interface Resource {
  id: string;
  title: string;
  uploaderId: string;
  resourceType: 'file' | 'link';
  semesterTag?: string;
  category: string;
  description?: string;
  tags?: string[];
  originalFilename?: string;
  fileSize?: number;
  mimeType?: string;
  linkUrl?: string;
  downloadCount: number;
  downloadUrl?: string; // This is what your backend API doc says it constructs
  createdAt: string;
  updatedAt: string;
  uploaderName?: string; // You might populate this later
}

const SEMESTERS = ['1', '2', '3', '4', '5', '6', '7', '8'];
const CATEGORIES = [
    { value: 'notes', label: 'Notes' },
    { value: 'pyqs', label: 'PYQs' },
    { value: 'textbooks', label: 'Books' },
    { value: 'syllabus', label: 'Syllabus' },
    { value: 'lab', label: 'Lab' },
    { value: 'assignments', label: 'Assignments' },
    { value: 'other', label: 'Other' },
];

const formatFileSize = (bytes?: number): string => {
  if (bytes === undefined || bytes === null || isNaN(bytes) || bytes === 0) return 'N/A';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const ResourcesScreen = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authIsLoading, accessToken } = useAuth();

  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoadingResources, setIsLoadingResources] = useState(true);
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [currentCategory, setCurrentCategory] = useState<string>(CATEGORIES[0].value);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchQuery(searchQuery), 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const fetchResources = useCallback(async (page = 1) => {
    if (!isAuthenticated) {
      setIsLoadingResources(false);
      return;
    }
    setIsLoadingResources(true);
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', '10');
    if (selectedSemester !== 'all') params.append('semester', selectedSemester);
    // Ensure currentCategory is passed, even if 'all' is not a backend filter,
    // your backend should handle an 'all' category by not filtering or have a default.
    // For now, assuming API filters by category if provided.
    params.append('category', currentCategory);
    if (debouncedSearchQuery.trim()) params.append('searchQuery', debouncedSearchQuery.trim());

    try {
      const response = await apiClient<PaginatedResponse<Resource>>(`/resources?${params.toString()}`);
      if (response.status === 'success' && Array.isArray(response.data)) {
        setResources(response.data);
        const itemsPerPage = 10;
        if (response.results) {
            setTotalResults(response.results);
            setTotalPages(Math.ceil(response.results / itemsPerPage));
        } else {
            // If API doesn't return total results, pagination on frontend is limited.
            setTotalResults(response.data.length + (page -1) * itemsPerPage); // Rough estimate if more pages exist
            setTotalPages(page + (response.data.length < itemsPerPage ? 0 : 1) ); // Guess if there's a next page
        }
        setCurrentPage(page);
      } else {
        setResources([]); setTotalPages(1); setTotalResults(0);
        toast({ title: "Resources", description: response.message || "Could not load resources for this category.", variant: "default" });
      }
    } catch (error: any) {
      toast({ title: "Error Fetching Resources", description: error.message || "Could not load resources.", variant: "destructive" });
      setResources([]); setTotalPages(1); setTotalResults(0);
    } finally {
      setIsLoadingResources(false);
    }
  }, [isAuthenticated, selectedSemester, currentCategory, debouncedSearchQuery]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchResources(1); // Fetch page 1 when filters change or on initial load
    } else if (!authIsLoading) {
        setIsLoadingResources(false);
    }
  }, [isAuthenticated, authIsLoading, fetchResources]);


  const handleSemesterChange = (value: string) => setSelectedSemester(value);
  const handleCategoryChange = (value: string) => {
    setCurrentCategory(value);
    // Fetching will be triggered by useEffect watching `fetchResources` which depends on `currentCategory`
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value);

  const handleDownload = (resource: Resource) => {
    if (!accessToken) {
        toast({ title: "Authentication Error", description: "Please login to download.", variant: "destructive" });
        return;
    }
    const rawApiBaseUrlFromEnv = import.meta.env.VITE_API_BASE_URL; // e.g., http://host/api/v1

    if (!rawApiBaseUrlFromEnv) {
        toast({ title: "Configuration Error", description: "API Base URL is not configured.", variant: "destructive" });
        return;
    }
    
    // console.log("--- Download Debug ---");
    // console.log("VITE_API_BASE_URL:", rawApiBaseUrlFromEnv);
    // console.log("Original resource.downloadUrl:", resource.downloadUrl);

    if (resource.resourceType === 'file' && resource.id && resource.downloadUrl) {
      let fullDownloadUrl: string;

      if (resource.downloadUrl.startsWith('http')) {
        // If resource.downloadUrl is already a full absolute URL (e.g., from S3 signed URL)
        fullDownloadUrl = resource.downloadUrl;
      } else if (resource.downloadUrl.startsWith('/api/v1/')) {
        // If resource.downloadUrl starts with /api/v1/ (e.g., "/api/v1/resources/ID/download")
        // We need to prepend only the scheme and host.
        // Example: VITE_API_BASE_URL = "http://localhost:3001/api/v1"
        // We need "http://localhost:3001"
        const serviceRootUrl = rawApiBaseUrlFromEnv.substring(0, rawApiBaseUrlFromEnv.indexOf('/api/v1'));
        fullDownloadUrl = `${serviceRootUrl}${resource.downloadUrl}`;
      } else if (resource.downloadUrl.startsWith('/resources/')) {
        // If resource.downloadUrl is relative to /api/v1 (e.g., "/resources/ID/download")
        // Prepend the full VITE_API_BASE_URL
        fullDownloadUrl = `${rawApiBaseUrlFromEnv}${resource.downloadUrl}`;
      } else {
        // Fallback or if resource.downloadUrl is some other relative path or unexpected format
        console.warn("Unexpected resource.downloadUrl format, attempting default construction with full VITE_API_BASE_URL:", resource.downloadUrl);
        fullDownloadUrl = `${rawApiBaseUrlFromEnv}${resource.downloadUrl.startsWith('/') ? '' : '/'}${resource.downloadUrl}`;
      }
      
      // console.log("Constructed fullDownloadUrl for fetch:", fullDownloadUrl);

      fetch(fullDownloadUrl, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${accessToken}` },
      })
      .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(`Download failed: ${response.statusText} (${response.status}). Server: ${text.substring(0,100)}`);
            });
        }
        const disposition = response.headers.get('content-disposition');
        let filename = resource.originalFilename || `${resource.title || 'download'}.${resource.mimeType?.split('/')[1] || 'bin'}`;
        if (disposition?.includes('attachment')) {
            const filenameMatch = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(disposition);
            if (filenameMatch?.[1]) filename = decodeURIComponent(filenameMatch[1].replace(/['"]/g, ''));
        }
        return response.blob().then(blob => ({ blob, filename }));
      })
      .then(({ blob, filename }) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = filename; document.body.appendChild(a);
        a.click(); a.remove(); window.URL.revokeObjectURL(url);
        toast({ title: "Download Started", description: filename });
      })
      .catch(err => {
          console.error("Download error object:", err);
          toast({ title: "Download Failed", description: err.message || "Could not download the file.", variant: "destructive" });
      });

    } else if (resource.resourceType === 'link' && resource.linkUrl) {
      window.open(resource.linkUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const getIcon = (type: Resource['resourceType'], mimeType?: string) => {
    if (type === 'link') return <LinkIcon className="h-6 w-6 text-blue-500" />;
    if (type === 'file') {
      if (mimeType?.includes('pdf')) return <FileText className="h-6 w-6 text-red-600" />;
      if (mimeType?.includes('image')) return <ImageIcon className="h-6 w-6 text-green-600" />;
      if (mimeType?.includes('audio')) return <FileAudio className="h-6 w-6 text-purple-600" />;
      if (mimeType?.includes('video')) return <FileVideo className="h-6 w-6 text-orange-600" />;
      if (mimeType?.includes('zip') || mimeType?.includes('archive')) return <FileArchive className="h-6 w-6 text-yellow-600" />;
      return <FileText className="h-6 w-6 text-gray-500" />; // Generic file
    }
    return <AlertCircle className="h-6 w-6 text-gray-400" />; // Default/unknown
  };

  if (authIsLoading) return <div className="flex items-center justify-center min-h-screen">Loading Session...</div>;
  if (!isAuthenticated && !authIsLoading) return <div className="p-4 text-center">Please log in to view resources.</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 py-6 sticky top-0 z-40">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Resources</h1>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Input type="search" placeholder="Search resources..." value={searchQuery} onChange={handleSearchChange} className="w-full sm:w-64 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            <Select value={selectedSemester} onValueChange={handleSemesterChange}>
              <SelectTrigger className="w-full sm:w-36 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <SelectValue placeholder="Semester" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:text-white">
                <SelectItem value="all">All Semesters</SelectItem>
                {SEMESTERS.map(sem => <SelectItem key={sem} value={sem}>Sem {sem}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="p-4">
        <Tabs value={currentCategory} onValueChange={handleCategoryChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-1 mb-6">
            {CATEGORIES.map(cat => (
              <TabsTrigger key={cat.value} value={cat.value} className="text-xs sm:text-sm data-[state=active]:bg-unicampus-red data-[state=active]:text-white">
                {cat.label}
              </TabsTrigger>
            ))}
          </TabsList>

            <TabsContent value={currentCategory} className="mt-0 space-y-4">
              {isLoadingResources ? (
                <div className="text-center p-8 text-gray-600 dark:text-gray-400">Loading {CATEGORIES.find(c=>c.value === currentCategory)?.label.toLowerCase()}...</div>
              ) : resources.length > 0 ? (
                resources.map((resource, index) => (
                    <Card 
                        key={resource.id} 
                        className="animate-slide-up hover:shadow-lg transition-all dark:bg-gray-800" 
                        style={{ animationDelay: `${index * 0.05}s` }}
                    >
                    <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                        <div className="pt-1">{getIcon(resource.resourceType, resource.mimeType)}</div>
                        <div className="flex-1 min-w-0"> {/* Added min-w-0 for better truncation */}
                            <h3 className="font-medium text-gray-900 dark:text-white truncate" title={resource.title}>{resource.title}</h3>
                            {resource.description && <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 max-w-prose truncate" title={resource.description}>{resource.description}</p>}
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            By: {resource.uploaderName || 'User'} | {new Date(resource.createdAt).toLocaleDateString()}
                            </p>
                            <div className="flex items-center flex-wrap gap-2 mt-2">
                            {resource.resourceType === 'file' && resource.fileSize !== undefined && (
                                <Badge variant="outline" className="text-xs">{formatFileSize(resource.fileSize)}</Badge>
                            )}
                            {resource.semesterTag && (
                                <Badge className="bg-unicampus-red/10 text-unicampus-red border-unicampus-red/20 text-xs">Sem {resource.semesterTag}</Badge>
                            )}
                            {resource.tags?.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleDownload(resource)} title={resource.resourceType === 'file' ? 'Download File' : 'Open Link'}>
                            {resource.resourceType === 'file' ? <Download className="h-5 w-5 text-unicampus-red" /> : <LinkIcon className="h-5 w-5 text-unicampus-red" />}
                        </Button>
                        </div>
                    </CardContent>
                    </Card>
                ))
              ) : (
                <Card className="dark:bg-gray-800">
                    <CardContent className="p-8 text-center">
                        <div className="text-4xl mb-4 text-gray-400 dark:text-gray-500">📚</div>
                        <p className="text-gray-600 dark:text-gray-400">
                        No {CATEGORIES.find(c => c.value === currentCategory)?.label.toLowerCase()} found
                        {selectedSemester !== 'all' && ` for Semester ${selectedSemester}`}
                        {debouncedSearchQuery && ` matching "${debouncedSearchQuery}"`}.
                        </p>
                    </CardContent>
                </Card>
              )}
            </TabsContent>
        </Tabs>

        {totalPages > 1 && !isLoadingResources && resources.length > 0 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
                <Button onClick={() => fetchResources(currentPage - 1)} disabled={currentPage <= 1} variant="outline">Previous</Button>
                <span className="text-sm text-gray-700 dark:text-gray-300">Page {currentPage} of {totalPages} ({totalResults} items)</span>
                <Button onClick={() => fetchResources(currentPage + 1)} disabled={currentPage >= totalPages} variant="outline">Next</Button>
            </div>
        )}

        <div className="fixed bottom-24 right-4 z-50">
          <Button
            className="w-14 h-14 rounded-full bg-unicampus-red hover:bg-unicampus-red-dark shadow-lg text-white"
            title="Add New Resource"
            onClick={() => navigate('/resources/new')}
          >
            <PlusCircle size={28} />
          </Button>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default ResourcesScreen;