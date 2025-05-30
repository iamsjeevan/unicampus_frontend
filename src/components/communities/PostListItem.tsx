
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ChevronUp, ChevronDown, MessageSquare } from 'lucide-react';
import { Post, User, Community } from '@/data/communitySampleData';

interface PostListItemProps {
  post: Post & { author: User; community?: Community };
  index: number;
  showCommunity?: boolean;
  onClick: () => void;
}

const PostListItem: React.FC<PostListItemProps> = ({ post, index, showCommunity = false, onClick }) => {
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(post.userVote || null);
  const [upvotes, setUpvotes] = useState(post.upvotes);

  const handleVote = (voteType: 'up' | 'down', e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (userVote === voteType) {
      // Remove vote
      setUserVote(null);
      setUpvotes(prev => voteType === 'up' ? prev - 1 : prev + 1);
    } else {
      // Change or add vote
      const change = voteType === 'up' ? 1 : -1;
      const currentChange = userVote === 'up' ? -1 : userVote === 'down' ? 1 : 0;
      setUpvotes(prev => prev + change + currentChange);
      setUserVote(voteType);
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <Card 
      className="animate-slide-up cursor-pointer hover:shadow-lg transition-all"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={onClick}
    >
      <CardContent className="p-4">
        {/* Community Badge (if showing in feed) */}
        {showCommunity && post.community && (
          <div className="mb-2">
            <Badge variant="outline" className="text-xs border-unicampus-red text-unicampus-red">
              {post.community.icon} {post.community.name}
            </Badge>
          </div>
        )}

        {/* Author Info */}
        <div className="flex items-center space-x-3 mb-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.author.avatarUrl} />
            <AvatarFallback>
              {post.author.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {post.author.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formatTimeAgo(post.timestamp)}
            </p>
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            {post.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {post.contentPreview}
          </p>
        </div>

        {/* Post Image */}
        {post.image && (
          <div className="mb-3 rounded-lg overflow-hidden">
            <img 
              src={post.image} 
              alt="Post content"
              className="w-full h-48 object-cover"
            />
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className={`p-1 h-8 w-8 ${
                userVote === 'up' 
                  ? 'text-unicampus-red bg-unicampus-red/10' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
              onClick={(e) => handleVote('up', e)}
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[2rem] text-center">
              {upvotes}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className={`p-1 h-8 w-8 ${
                userVote === 'down' 
                  ? 'text-unicampus-red bg-unicampus-red/10' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
              onClick={(e) => handleVote('down', e)}
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-unicampus-red"
            onClick={onClick}
          >
            <MessageSquare className="h-4 w-4" />
            <span className="text-sm">{post.commentsCount}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostListItem;
