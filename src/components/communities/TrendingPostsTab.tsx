
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getTrendingPosts } from '@/data/communitySampleData';
import PostListItem from './PostListItem';

const TrendingPostsTab = () => {
  const navigate = useNavigate();
  const trendingPosts = getTrendingPosts();

  return (
    <div className="flex-1 bg-gray-50 dark:bg-gray-900">
      <div className="space-y-3 p-4">
        {trendingPosts.map((post, index) => (
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

export default TrendingPostsTab;
