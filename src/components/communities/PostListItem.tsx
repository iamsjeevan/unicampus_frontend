// src/components/communities/PostListItem.tsx
import React, { useState, MouseEvent, useEffect } from 'react'; // Added useEffect
import { useNavigate } from 'react-router-dom'; // For navigating to community from badge
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ChevronUp, ChevronDown, MessageSquare, ExternalLink } from 'lucide-react';
import apiClient from '@/lib/apiClient';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Post, Author, CommunitySummary, VoteApiResponse } from '@/types/community'; // Assuming types are defined in src/types/community.ts

interface PostListItemProps {
  post: Post;
  index: number;
  showCommunity?: boolean;
  onClick: () => void; // For navigating to post detail
  onVoteChange?: (postId: string, newVoteData: VoteApiResponse['data']) => void;
}

const PostListItem: React.FC<PostListItemProps> = ({ post, index, showCommunity = false, onClick, onVoteChange }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [userVote, setUserVote] = useState<'up' | 'down' | null>(post.user_vote);
  const [score, setScore] = useState((post.upvotes ?? 0) - (post.downvotes ?? 0)); // Calculate net score
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    setUserVote(post.user_vote);
    setScore((post.upvotes ?? 0) - (post.downvotes ?? 0));
  }, [post.user_vote, post.upvotes, post.downvotes]);

  const handleVote = async (voteDirectionAttempt: 'up' | 'down', e: MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast({ title: "Authentication Required", description: "Please log in to vote.", variant: "destructive"});
      return;
    }
    if (isVoting) return;
    setIsVoting(true);

    const originalUserVote = userVote;
    const originalScore = score;

    let newApiDirection: 'up' | 'down' | 'none';
    if (userVote === voteDirectionAttempt) { // Clicking the same button to undo vote
      newApiDirection = 'none';
    } else {
      newApiDirection = voteDirectionAttempt;
    }

    // Optimistic UI Update
    let newOptimisticScore = score;
    if (newApiDirection === 'none') { // Clearing a vote
        if (originalUserVote === 'up') newOptimisticScore--;
        if (originalUserVote === 'down') newOptimisticScore++;
        setUserVote(null);
    } else { // Setting or changing a vote
        if (originalUserVote === 'up') newOptimisticScore--; // Remove previous upvote effect
        else if (originalUserVote === 'down') newOptimisticScore++; // Remove previous downvote effect

        if (newApiDirection === 'up') newOptimisticScore++;
        else if (newApiDirection === 'down') newOptimisticScore--;
        setUserVote(newApiDirection);
    }
    setScore(newOptimisticScore);

    try {
      const response = await apiClient<VoteApiResponse>(`/posts/${post.id}/vote`, {
        method: 'POST',
        data: { direction: newApiDirection },
      });

      if (response.status === 'success' && response.data) {
        setScore((response.data.upvotes ?? 0) - (response.data.downvotes ?? 0));
        setUserVote(response.data.user_vote);
        if (onVoteChange) {
            onVoteChange(post.id, response.data);
        }
      } else {
        throw new Error((response as any).message || "Failed to record vote.");
      }
    } catch (error: any) {
      toast({ title: "Error Voting", description: error.message || "Could not submit vote.", variant: "destructive" });
      setUserVote(originalUserVote); // Revert
      setScore(originalScore); // Revert
    } finally {
      setIsVoting(false);
    }
  };

  const formatTimeAgo = (isoDate: string) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSeconds < 5) return 'Just now';
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };
  
  const displayedContent = post.content_text || post.contentPreview || "";

  return (
    <Card
      className="animate-slide-up cursor-pointer hover:shadow-lg transition-all dark:bg-gray-800"
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={onClick}
    >
      <CardContent className="p-4">
        {showCommunity && post.community && (
          <div className="mb-2 flex items-center space-x-1.5">
            {post.community.icon && <span className="text-sm">{post.community.icon}</span>}
            <button
                className="text-xs font-medium text-gray-600 dark:text-gray-400 hover:underline focus:outline-none"
                onClick={(e) => { e.stopPropagation(); navigate(`/communities/${post.community?.slug || post.community?.id}`);}}
            >
                {post.community.name}
            </button>
            <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Posted by u/{post.author.name}</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{formatTimeAgo(post.createdAt)}</span>
          </div>
        )}

        {!showCommunity && (
            <div className="flex items-center space-x-3 mb-2">
            <Avatar className="h-6 w-6">
                <AvatarImage src={post.author.avatarUrl} alt={post.author.name}/>
                <AvatarFallback>{post.author.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">u/{post.author.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{formatTimeAgo(post.createdAt)}</p>
            </div>
            </div>
        )}


        <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-1 hover:text-unicampus-red">{post.title}</h3>
        
        {post.content_type === 'text' && displayedContent && (
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-4 mb-3">
            {displayedContent}
          </p>
        )}

        {post.content_type === 'image' && post.image_url && (
          <div className="my-3 rounded-lg overflow-hidden max-h-96 flex justify-center bg-gray-100 dark:bg-gray-700">
            <img src={post.image_url} alt="Post image" className="max-h-96 object-contain" />
          </div>
        )}

        {post.content_type === 'link' && post.link_url && (
            <a
                href={post.link_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="my-3 p-3 border dark:border-gray-700 rounded-md flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
                <ExternalLink className="h-4 w-4 flex-shrink-0" />
                <span className="truncate flex-grow">{post.link_url}</span>
            </a>
        )}
        {post.tags && post.tags.length > 0 && (
             <div className="mb-3 flex flex-wrap gap-1">
                {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
            </div>
        )}

        <div className="flex items-center justify-start space-x-4">
            <div className="flex items-center space-x-0.5">
            <Button
                variant="ghost" size="sm"
                className={`p-1 h-8 w-8 rounded-full ${userVote === 'up' ? 'text-unicampus-red bg-unicampus-red/10' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                onClick={(e) => handleVote('up', e)} // Simplified: always try 'up'
                disabled={isVoting}
            > <ChevronUp className="h-5 w-5" /> </Button>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[2.5rem] text-center tabular-nums">{score}</span>
            <Button
                variant="ghost" size="sm"
                className={`p-1 h-8 w-8 rounded-full ${userVote === 'down' ? 'text-blue-600 bg-blue-600/10' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                onClick={(e) => handleVote('down', e)} // Simplified: always try 'down'
                disabled={isVoting}
            > <ChevronDown className="h-5 w-5" /> </Button>
            </div>
          
          <Button variant="ghost" size="sm" className="flex items-center space-x-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" onClick={onClick}>
            <MessageSquare className="h-4 w-4" />
            <span className="text-sm">{post.commentCount}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostListItem;