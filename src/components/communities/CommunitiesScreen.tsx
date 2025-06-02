// src/components/communities/CommunitiesScreen.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit3 } from 'lucide-react';
import BottomNavigation from '@/components/layout/BottomNavigation';
// import TrendingPostsTab from './TrendingPostsTab'; // Remove Trending
import FollowingFeedTab from './FollowingFeedTab';
import BrowseCommunitiesTab from './BrowseCommunitiesTab';
import CreatePostScreen from './CreatePostScreen';
import { toast } from '@/hooks/use-toast'; // Assuming you use toast

const CommunitiesScreen = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const handleCreatePostOpen = () => setIsCreatePostOpen(true);
  const handleCreatePostClose = () => setIsCreatePostOpen(false);

  const handleGeneralPostCreated = (newPost?: any) => {
    setIsCreatePostOpen(false);
    toast({title: "Post Created!", description: "Your new post is live."});
    // TODO: Optionally refresh the active feed if a new post would appear there
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 py-4 sticky top-0 z-30">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Communities</h1>
           <Button
            size="sm"
            className="bg-unicampus-red hover:bg-unicampus-red-dark text-white text-xs px-3 py-1.5"
            onClick={handleCreatePostOpen}
          >
            <Edit3 className="h-4 w-4 mr-1.5" /> Create Post
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        {/* Default to 'following' or 'browse' */}
        <Tabs defaultValue="following" className="w-full">
          {/* Grid cols set to 2 for two tabs */}
          <TabsList className="grid w-full grid-cols-2 bg-transparent h-12 rounded-none border-b-0">
            <TabsTrigger
              value="following"
              className="data-[state=active]:bg-transparent data-[state=active]:text-unicampus-red data-[state=active]:border-b-2 data-[state=active]:border-unicampus-red data-[state=active]:shadow-none rounded-none text-gray-600 dark:text-gray-400"
            >
              Following
            </TabsTrigger>
            <TabsTrigger
              value="browse"
              className="data-[state=active]:bg-transparent data-[state=active]:text-unicampus-red data-[state=active]:border-b-2 data-[state=active]:border-unicampus-red data-[state=active]:shadow-none rounded-none text-gray-600 dark:text-gray-400"
            >
              Browse
            </TabsTrigger>
          </TabsList>
          
          {/* Removed TrendingPostsTab Content */}
          <TabsContent value="following" className="mt-0"><FollowingFeedTab /></TabsContent>
          <TabsContent value="browse" className="mt-0"><BrowseCommunitiesTab /></TabsContent>
        </Tabs>
      </div>

      <CreatePostScreen
        isOpen={isCreatePostOpen}
        onClose={handleCreatePostClose}
        onPostCreated={handleGeneralPostCreated}
      />

      <BottomNavigation />
    </div>
  );
};

export default CommunitiesScreen;