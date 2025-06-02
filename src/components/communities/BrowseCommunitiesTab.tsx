// src/components/communities/BrowseCommunitiesTab.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Loader2, Search, Users, MessageSquare } from 'lucide-react';
import apiClient, { PaginatedResponse } from '@/lib/apiClient';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { CommunitySummary } from '@/types/community'; // Assuming you created src/types/community.ts

const BrowseCommunitiesTab = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authIsLoading } = useAuth();

  const [communities, setCommunities] = useState<CommunitySummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchQuery(searchQuery), 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const fetchCommunities = useCallback(async (page = 1, isSearchChange = false) => {
    if (!isAuthenticated && !authIsLoading) {
        setIsLoading(false);
        return;
    }
    if (authIsLoading) return;

    setIsLoading(true);
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', '10');
    if (debouncedSearchQuery.trim()) {
      params.append('searchQuery', debouncedSearchQuery.trim());
    }

    try {
      const response = await apiClient<PaginatedResponse<CommunitySummary>>(`/communities?${params.toString()}`);
      if (response.status === 'success' && Array.isArray(response.data)) {
        const processedData = response.data.map(community => ({
            ...community,
            memberCount: community.memberCount ?? 0,
            postCount: community.postCount ?? 0,
        }));
        
        // If it's a new search or filter change, reset to new data for page 1
        // Otherwise, for "load more", append.
        setCommunities(isSearchChange || page === 1 ? processedData : prev => [...prev, ...processedData]);
        
        const itemsPerPage = 10;
        if (response.results) {
            setTotalResults(response.results);
            setTotalPages(Math.ceil(response.results / itemsPerPage));
        } else {
            setTotalResults(processedData.length + (page > 1 && !isSearchChange ? communities.length : 0) );
            setTotalPages(page + (processedData.length < itemsPerPage ? 0 : 1) );
        }
        setCurrentPage(page);

      } else {
        toast({ title: "Error", description: response.message || "Could not load communities.", variant: "default" });
        setCommunities([]); setTotalPages(1); setTotalResults(0);
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to fetch communities.", variant: "destructive" });
      setCommunities([]); setTotalPages(1); setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, authIsLoading, debouncedSearchQuery]); // Removed communities.length to avoid re-fetch on append

  useEffect(() => {
    // Effect for initial load and when debouncedSearchQuery changes
    if (!authIsLoading) {
        fetchCommunities(1, true); // Pass true to indicate it's a search change or initial load
    }
  }, [debouncedSearchQuery, isAuthenticated, authIsLoading, fetchCommunities]);


  const handleJoinCommunity = async (communityId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast({ title: "Authentication Required", description: "Please log in to join communities.", variant: "destructive"});
      navigate('/login/student');
      return;
    }
    const originalCommunities = communities.map(c => ({...c}));
    setCommunities(prev => prev.map(c => c.id === communityId ? { ...c, is_member: true, memberCount: (c.memberCount ?? 0) + 1 } : c));
    try {
      await apiClient(`/communities/${communityId}/join`, { method: 'POST' });
      toast({ title: "Success", description: "Joined community!" });
      // Optionally, re-fetch just this community's detail or the whole list if needed
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to join community.", variant: "destructive" });
      setCommunities(originalCommunities);
    }
  };

  const handleLoadMore = () => {
    if (currentPage < totalPages && !isLoading) {
      fetchCommunities(currentPage + 1, false); // Not a search change
    }
  };

  if (authIsLoading) {
    return <div className="flex-1 p-4 text-center">Checking authentication...</div>;
  }
  if (!isAuthenticated && !authIsLoading) {
    return <div className="flex-1 p-4 text-center">Please log in to browse communities.</div>;
  }

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900">
      <div className="p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        {isLoading && communities.length === 0 && (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-unicampus-red" />
            <span className="ml-2 text-gray-600 dark:text-gray-400">Loading communities...</span>
          </div>
        )}

        {!isLoading && communities.length === 0 && (
          <Card className="dark:bg-gray-800">
            <CardContent className="p-8 text-center">
              <Users className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No communities found {debouncedSearchQuery && `matching "${debouncedSearchQuery}"`}.
              </p>
            </CardContent>
          </Card>
        )}

        {communities.map((community, index) => (
          <Card
            key={community.id}
            className="animate-slide-up cursor-pointer hover:shadow-lg transition-all dark:bg-gray-800 dark:hover:border-unicampus-red/50"
            style={{ animationDelay: `${index * 0.05}s` }}
            onClick={() => navigate(`/communities/${community.slug || community.id}`)}
          >
            <CardContent className="p-0">
              {community.bannerImage && (
                <div className="h-32 w-full overflow-hidden rounded-t-lg">
                  <img src={community.bannerImage} alt={`${community.name} banner`} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="text-3xl mt-1">{community.icon || '👥'}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white hover:text-unicampus-red truncate" title={community.name}>
                      {community.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-2 line-clamp-2" title={community.description}>
                      {community.description}
                    </p>
                    <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center"><Users className="h-3.5 w-3.5 mr-1" /> {(community.memberCount ?? 0).toLocaleString()} members</span>
                      {(community.postCount !== undefined && community.postCount !== null) && (
                        <span className="flex items-center"><MessageSquare className="h-3.5 w-3.5 mr-1" />{community.postCount.toLocaleString()} posts</span>
                      )}
                    </div>
                  </div>
                  {!community.is_member && ( // Only show join button if not a member
                     <Button
                        size="sm"
                        variant="outline"
                        className="border-unicampus-red text-unicampus-red hover:bg-unicampus-red hover:text-white dark:hover:bg-unicampus-red dark:hover:text-white self-start"
                        onClick={(e) => handleJoinCommunity(community.id, e)}
                      > Join </Button>
                  )}
                   {community.is_member && ( // Show "Joined" if member
                     <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200 self-start">Joined</Badge>
                  )}
                </div>
                {community.tags && community.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                        {community.tags.slice(0, 3).map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                    </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {!isLoading && currentPage < totalPages && communities.length > 0 && (
          <div className="text-center mt-6">
            <Button variant="outline" onClick={handleLoadMore} disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null} Load More
            </Button>
          </div>
        )}
         {!isLoading && communities.length > 0 && currentPage >= totalPages && (
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">You've reached the end!</p>
        )}
      </div>
    </div>
  );
};

export default BrowseCommunitiesTab;