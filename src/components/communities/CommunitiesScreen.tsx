
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';
import BottomNavigation from '@/components/layout/BottomNavigation';
import TrendingPostsTab from './TrendingPostsTab';
import FollowingFeedTab from './FollowingFeedTab';
import BrowseCommunitiesTab from './BrowseCommunitiesTab';
import CreatePostScreen from './CreatePostScreen';

const CommunitiesScreen = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const handleCreatePost = () => {
    setIsCreatePostOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Communities</h1>
        </div>
      </div>

      {/* Top Tab Navigator */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-transparent h-12 rounded-none border-b-0">
            <TabsTrigger 
              value="trending" 
              className="data-[state=active]:bg-transparent data-[state=active]:text-unicampus-red data-[state=active]:border-b-2 data-[state=active]:border-unicampus-red data-[state=active]:shadow-none rounded-none text-gray-600 dark:text-gray-400"
            >
              Trending
            </TabsTrigger>
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
          
          <TabsContent value="trending" className="mt-0">
            <TrendingPostsTab />
          </TabsContent>
          
          <TabsContent value="following" className="mt-0">
            <FollowingFeedTab />
          </TabsContent>
          
          <TabsContent value="browse" className="mt-0">
            <BrowseCommunitiesTab />
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Action Button */}
      <Button
        className="fixed bottom-24 right-6 h-14 w-14 rounded-full bg-unicampus-red hover:bg-unicampus-red-dark text-white shadow-lg z-40"
        onClick={handleCreatePost}
      >
        <Plus className="h-6 w-6" />
      </Button>

      {/* Create Post Modal */}
      <CreatePostScreen 
        isOpen={isCreatePostOpen} 
        onClose={() => setIsCreatePostOpen(false)} 
      />

      <BottomNavigation />
    </div>
  );
};

export default CommunitiesScreen;
