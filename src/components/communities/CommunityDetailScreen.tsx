
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BottomNavigation from '@/components/layout/BottomNavigation';
import { communities, getPopulatedPosts, userFollowedCommunityIds } from '@/data/communitySampleData';
import PostListItem from './PostListItem';
import CreatePostScreen from './CreatePostScreen';
import { ChevronLeft } from 'lucide-react';

const CommunityDetailScreen = () => {
  const { communityId } = useParams<{ communityId: string }>();
  const navigate = useNavigate();
  
  const community = communities.find(c => c.id === communityId);
  const posts = getPopulatedPosts(communityId || '');

  // State for join/leave functionality
  const [isJoined, setIsJoined] = useState(
    userFollowedCommunityIds.includes(communityId || '')
  );
  const [memberCount, setMemberCount] = useState(community?.memberCount || 0);

  // State for create post modal
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  if (!community) {
    return <div>Community not found</div>;
  }

  const handleCreatePost = () => {
    setIsCreatePostOpen(true);
  };

  const handleJoinLeave = () => {
    if (isJoined) {
      // Leave community
      setIsJoined(false);
      setMemberCount(prev => prev - 1);
      alert(`You've left ${community.name}!`);
    } else {
      // Join community
      setIsJoined(true);
      setMemberCount(prev => prev + 1);
      alert(`You've joined ${community.name}!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm px-4 py-4">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/communities')}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              {community.name}
            </h1>
          </div>
          <Button 
            size="sm" 
            className="bg-unicampus-red hover:bg-unicampus-red-dark text-white"
            onClick={handleCreatePost}
          >
            Create Post
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Community Banner */}
        <Card className="mx-4 mt-4">
          <CardContent className="p-0">
            {community.bannerImage && (
              <div className="h-40 w-full overflow-hidden rounded-t-lg">
                <img 
                  src={community.bannerImage} 
                  alt={community.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{community.icon}</div>
                <div className="flex-1">
                  <h2 className="font-bold text-xl text-gray-900 dark:text-white">
                    {community.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {community.description}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <Badge variant="secondary">
                      {memberCount.toLocaleString()} members
                    </Badge>
                    <Button
                      variant={isJoined ? "secondary" : "outline"}
                      size="sm"
                      onClick={handleJoinLeave}
                      className={
                        isJoined 
                          ? "bg-gray-100 dark:bg-gray-700 text-unicampus-red hover:bg-gray-200 dark:hover:bg-gray-600" 
                          : "border-unicampus-red text-unicampus-red hover:bg-unicampus-red hover:text-white"
                      }
                    >
                      {isJoined ? 'Joined' : 'Join'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts */}
        <div className="px-4 space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Posts</h3>
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <PostListItem 
                key={post.id} 
                post={post} 
                index={index}
                onClick={() => navigate(`/communities/${communityId}/posts/${post.id}`)}
              />
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                  No posts yet. Be the first to start a discussion!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostScreen 
        isOpen={isCreatePostOpen} 
        onClose={() => setIsCreatePostOpen(false)}
        preselectedCommunityId={communityId}
      />

      <BottomNavigation />
    </div>
  );
};

export default CommunityDetailScreen;
