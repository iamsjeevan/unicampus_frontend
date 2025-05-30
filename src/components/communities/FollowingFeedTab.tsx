
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getFollowingPosts } from '@/data/communitySampleData';
import { Card, CardContent } from '@/components/ui/card';
import PostListItem from './PostListItem';

const FollowingFeedTab = () => {
  const navigate = useNavigate();
  const followingPosts = getFollowingPosts();

  if (followingPosts.length === 0) {
    return (
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-4">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              No posts from communities you're following yet.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Follow some communities to see their posts here!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900">
      <div className="space-y-3 p-4">
        {followingPosts.map((post, index) => (
          <PostListItem
            key={post.id}
            post={post}
            index={index}
            showCommunity={true}
            onClick={() => navigate(`/communities/${post.communityId}/posts/${post.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default FollowingFeedTab;
