// src/components/communities/FollowingFeedTab.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PostListItem from './PostListItem';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button'; // For "Browse Communities" button
import { Loader2, Users, Rss } from 'lucide-react';
import apiClient, { PaginatedResponse } from '@/lib/apiClient';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { CommunitySummary, Post, VoteApiResponse } from '@/types/community'; // Import types

// Helper to normalize post data (can be moved to a shared util if not already)
const normalizePostData = (apiPost: any): Post => {
    const id = apiPost.id || apiPost._id;
    if(!id) {
        // console.error("Following Feed Post Norm Error: Post data missing ID", apiPost);
        return { ...apiPost, id: `fallback-${Math.random()}`, title: "Error: Post data incomplete" } as Post;
    }
    return {
        id: id,
        _id: apiPost._id || id,
        title: apiPost.title || "Untitled Post",
        contentType: apiPost.content_type || 'text',
        contentText: apiPost.content_text || apiPost.contentPreview,
        contentPreview: apiPost.contentPreview || apiPost.content_text,
        imageUrl: apiPost.image_url,
        linkUrl: apiPost.link_url,
        tags: apiPost.tags || [],
        author: apiPost.author || { id: 'unknown', name: 'Unknown Author' },
        communityId: apiPost.communityId || apiPost.community?.id,
        community: apiPost.community,
        createdAt: apiPost.created_at || apiPost.createdAt || new Date().toISOString(),
        updatedAt: apiPost.updated_at || apiPost.updatedAt,
        upvotes: apiPost.upvotes ?? 0,
        downvotes: apiPost.downvotes ?? 0,
        commentCount: apiPost.comment_count ?? apiPost.commentCount ?? 0,
        userVote: apiPost.user_vote || null,
    };
};


const FollowingFeedTab = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authIsLoading } = useAuth();

  const [followedPosts, setFollowedPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // For simplicity, we'll fetch a limited number of recent posts per followed community.
  // True pagination for a combined feed is more complex.

  const fetchFollowingFeed = useCallback(async () => {
    if (!isAuthenticated) {
      setIsLoading(false);
      setFollowedPosts([]); // Clear posts if not authenticated
      return;
    }
    setIsLoading(true);
    setFollowedPosts([]); // Clear previous posts before fetching new

    try {
      // Step 1: Fetch all communities (or a large number) to find followed ones
      // Your /communities endpoint should return `is_member` based on the auth token
      const communitiesResponse = await apiClient<PaginatedResponse<CommunitySummary>>('/communities?limit=200'); // Fetch up to 200 communities

      if (communitiesResponse.status === 'success' && Array.isArray(communitiesResponse.data)) {
        const followedCommunities = communitiesResponse.data.filter(c => c.is_member);

        if (followedCommunities.length === 0) {
          setIsLoading(false);
          return; // No communities followed, so no posts to fetch
        }

        // Step 2: For each followed community, fetch its recent posts
        const postsPromises = followedCommunities.map(community =>
          apiClient<PaginatedResponse<any>>(`/communities/${community.id}/posts?limit=5&sortBy=new`) // Fetch top 5 new posts
            .then(res => (res.status === 'success' && Array.isArray(res.data) ? res.data.map(normalizePostData) : []))
            .catch(err => {
              console.error(`Failed to fetch posts for community ${community.id}`, err);
              return []; // Return empty array on error for this community
            })
        );

        const results = await Promise.all(postsPromises);
        const allPosts = results.flat(); // Combine posts from all communities

        // Sort all combined posts by date (newest first)
        allPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        
        setFollowedPosts(allPosts.slice(0, 50)); // Limit total displayed posts for performance

      } else {
        toast({ title: "Error", description: communitiesResponse.message || "Could not load your communities.", variant: "default" });
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to build your following feed.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!authIsLoading) { // Only fetch when auth status is resolved
        fetchFollowingFeed();
    }
  }, [isAuthenticated, authIsLoading, fetchFollowingFeed]);

  const handlePostVoteChange = (postId: string, newVoteData: VoteApiResponse['data']) => {
    setFollowedPosts(prevPosts => prevPosts.map(p =>
      p.id === postId ? { ...p, upvotes: newVoteData.upvotes, downvotes: newVoteData.downvotes, userVote: newVoteData.user_vote } : p
    ));
  };


  if (authIsLoading) {
    return <div className="flex-1 p-4 text-center">Checking authentication...</div>;
  }

  if (!isAuthenticated) { // Guard for not logged in users
    return (
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="dark:bg-gray-800">
          <CardContent className="p-8 text-center">
            <Users className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Log in to see posts from communities you follow.
            </p>
            <Button onClick={() => navigate('/login/student')} className="bg-unicampus-red hover:bg-unicampus-red-dark text-white">
                Log In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="flex-1 p-4 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-unicampus-red" />
        <span className="ml-2 text-gray-600 dark:text-gray-400">Building your feed...</span>
      </div>
    );
  }

  if (followedPosts.length === 0) {
    return (
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="dark:bg-gray-800">
          <CardContent className="p-8 text-center">
            <Rss className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No posts yet from communities you're following.
            </p>
            <Button onClick={() => navigate('/communities', { state: { activeTab: 'browse' }})} variant="outline">
              Browse Communities
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900">
      <div className="space-y-3 p-4">
        {followedPosts.map((post, index) => (
          <PostListItem
            key={post.id}
            post={post}
            index={index}
            showCommunity={true} // Important to show which community the post is from
            onClick={() => navigate(`/posts/${post.id}`)} // Navigate to Post Detail
            onVoteChange={handlePostVoteChange}
          />
        ))}
        {/* TODO: Add "Load More" if implementing pagination for the combined feed */}
      </div>
    </div>
  );
};

export default FollowingFeedTab;