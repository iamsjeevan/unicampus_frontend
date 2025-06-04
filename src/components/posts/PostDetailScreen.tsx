// src/components/posts/PostDetailScreen.tsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, Loader2, MessageSquare, ChevronUp, ChevronDown, ExternalLink, Send, ThumbsUp, ThumbsDown, CornerDownRight, UserCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import apiClient, { PaginatedResponse } from '@/lib/apiClient';
import { toast } from '@/hooks/use-toast';
import { Post, Comment, Author as PostAuthor, PostDetailApiResponse, CreateCommentApiResponse, VoteApiResponse, CommunitySummary } from '@/types/community';
import BottomNavigation from '@/components/layout/BottomNavigation'; // Optional

// --- Helper Normalization Functions (Consider moving to a shared util file) ---
const normalizePostData = (apiPost: any): Post => {
    const id = apiPost.id || apiPost._id;
    if (!id) {
        console.error("Post Detail Norm Error: Post data missing ID", apiPost);
        return { ...apiPost, id: `fallback-post-${Math.random()}`, title: "Error: Post data incomplete" } as Post;
    }
    return {
        id: id, _id: apiPost._id || id,
        title: apiPost.title || "Untitled Post",
        contentType: apiPost.content_type || apiPost.contentType || 'text',
        contentText: apiPost.content_text || apiPost.contentText || apiPost.contentPreview,
        contentPreview: apiPost.contentPreview || apiPost.content_text || apiPost.contentText,
        imageUrl: apiPost.image_url || apiPost.imageUrl,
        linkUrl: apiPost.link_url || apiPost.linkUrl,
        tags: apiPost.tags || [],
        author: apiPost.author || { id: 'unknown', name: 'Unknown Author', avatarUrl: undefined },
        communityId: apiPost.communityId || apiPost.community?.id,
        communityName: apiPost.communityName || apiPost.community?.name,
        communitySlug: apiPost.communitySlug || apiPost.community?.slug,
        communityIcon: apiPost.communityIcon || apiPost.community?.icon,
        community: apiPost.community,
        createdAt: apiPost.created_at || apiPost.createdAt || new Date().toISOString(),
        updatedAt: apiPost.updated_at || apiPost.updatedAt,
        lastActivityAt: apiPost.last_activity_at || apiPost.lastActivityAt,
        upvotes: apiPost.upvotes ?? 0,
        downvotes: apiPost.downvotes ?? 0,
        commentCount: apiPost.comment_count ?? apiPost.commentCount ?? 0,
        userVote: apiPost.user_vote || apiPost.userVote || null,
    };
};

const normalizeCommentData = (apiComment: any): Comment => {
    const id = apiComment.id || apiComment._id;
    if (!id) {
        console.error("Comment Norm Error: Comment data missing ID", apiComment);
        return { ...apiComment, id: `fallback-comment-${Math.random()}`, text: "Error: Comment data incomplete" } as Comment;
    }
    return {
        id: id, _id: apiComment._id || id,
        postId: apiComment.postId || apiComment.post_id,
        author: apiComment.author || { id: 'unknown', name: 'Unknown Author', avatarUrl: undefined },
        text: apiComment.text || "",
        parentId: apiComment.parentId || apiComment.parent_id,
        replyCount: apiComment.replyCount ?? apiComment.reply_count ?? 0,
        upvotes: apiComment.upvotes ?? 0,
        downvotes: apiComment.downvotes ?? 0,
        createdAt: apiComment.created_at || apiComment.createdAt || new Date().toISOString(),
        updatedAt: apiComment.updated_at || apiComment.updatedAt,
        userVote: apiComment.user_vote || apiComment.userVote || null,
    };
};

const formatTimeAgo = (isoDate?: string) => {
    if (!isoDate) return 'some time ago';
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

// --- CommentListItem Component (can be moved to its own file) ---
interface CommentListItemProps {
    comment: Comment;
    onReply: (commentId: string, authorName: string) => void; // Callback to set reply target
    // onVote: (commentId: string, direction: 'up' | 'down' | 'none') => Promise<void>; // For comment voting
}
const CommentListItem: React.FC<CommentListItemProps> = ({ comment, onReply }) => (
    <div className="flex space-x-3 py-3 border-b dark:border-gray-700 last:border-b-0">
        <Avatar className="h-8 w-8">
            <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} />
            <AvatarFallback>{comment.author.name?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
            <div className="flex items-center space-x-2 text-xs mb-0.5">
                <span className="font-semibold text-gray-800 dark:text-gray-200">{comment.author.name}</span>
                <span className="text-gray-500 dark:text-gray-400">• {formatTimeAgo(comment.createdAt)}</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{comment.text}</p>
            <div className="flex items-center space-x-3 mt-1.5 text-xs">
                <Button variant="ghost" size="xs" className="p-1 h-auto text-gray-500 dark:text-gray-400 hover:text-unicampus-red" 
                        onClick={() => onReply(comment.id, comment.author.name)}>
                    <CornerDownRight className="h-3 w-3 mr-1" /> Reply ({comment.replyCount ?? 0})
                </Button>
                {/* Add vote buttons for comments here later */}
            </div>
        </div>
    </div>
);


// --- PostDetailScreen Component ---
const PostDetailScreen = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: authIsLoading } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);
  const [isVotingPost, setIsVotingPost] = useState(false);
  
  const [newCommentText, setNewCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [replyingTo, setReplyingTo] = useState<{ commentId: string; authorName: string } | null>(null);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);


  const [currentCommentsPage, setCurrentCommentsPage] = useState(1);
  const [totalCommentsPages, setTotalCommentsPages] = useState(1);
  // Add sortBy for comments if your API supports it
  // const [sortCommentsBy, setSortCommentsBy] = useState<'newest' | 'oldest' | 'top'>('newest');


  const fetchPostDetail = useCallback(async () => {
    if (!postId) { navigate(-1); return; }
    setIsLoadingPost(true);
    try {
      const response = await apiClient<PostDetailApiResponse>(`/posts/${postId}`);
      if (response.status === 'success' && response.data?.post) {
        setPost(normalizePostData(response.data.post));
      } else {
        toast({ title: "Error", description: (response as any).message || "Post not found.", variant: "destructive" });
        navigate(-1);
      }
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to load post.", variant: "destructive" });
      navigate(-1);
    } finally {
      setIsLoadingPost(false);
    }
  }, [postId, navigate]);

  const fetchComments = useCallback(async (page = 1) => {
    if (!postId) return;
    if (page === 1) setIsLoadingComments(true);
    const params = new URLSearchParams({ page: page.toString(), limit: '10', sortBy: 'newest' }); // Default sort
    try {
      const response = await apiClient<PaginatedResponse<any>>(`/posts/${postId}/comments?${params.toString()}`);
      if (response.status === 'success' && Array.isArray(response.data)) {
        const normalized = response.data.map(normalizeCommentData);
        setComments(prev => page === 1 ? normalized : [...prev, ...normalized]);
        const itemsPerPage = 10;
        setTotalCommentsPages(response.results ? Math.ceil(response.results / itemsPerPage) : page + (response.data.length < itemsPerPage ? 0 : 1));
        setCurrentCommentsPage(page);
      } else if (page === 1) setComments([]);
    } catch (error: any) { if (page === 1) setComments([]); } 
    finally { if (page === 1) setIsLoadingComments(false); }
  }, [postId]);

  useEffect(() => {
    if (!authIsLoading) { fetchPostDetail(); fetchComments(1); }
  }, [postId, authIsLoading, fetchPostDetail, fetchComments]);

  const handlePostVote = async (voteDirectionAttempt: 'up' | 'down') => {
    if (!isAuthenticated || !post) { toast({ title: "Login Required", description: "Please log in to vote.", variant: "destructive" }); return; }
    if (isVotingPost) return;
    setIsVotingPost(true);
    const originalUserVote = post.userVote, originalUpvotes = post.upvotes, originalDownvotes = post.downvotes;
    let newApiDirection: 'up' | 'down' | 'none' = post.userVote === voteDirectionAttempt ? 'none' : voteDirectionAttempt;
    
    const tempPost = { ...post }; // Optimistic update
    if (newApiDirection === 'none') { if (originalUserVote === 'up') tempPost.upvotes--; else if (originalUserVote === 'down') tempPost.downvotes--; tempPost.userVote = null; }
    else { if (originalUserVote === 'up') tempPost.upvotes--; else if (originalUserVote === 'down') tempPost.downvotes--;
           if (newApiDirection === 'up') tempPost.upvotes++; else tempPost.downvotes++; tempPost.userVote = newApiDirection; }
    setPost(tempPost);

    try {
        const response = await apiClient<VoteApiResponse>(`/posts/${post.id}/vote`, { method: 'POST', data: { direction: newApiDirection } });
        if (response.status === 'success' && response.data) {
            setPost(p => p ? { ...p, upvotes: response.data.upvotes, downvotes: response.data.downvotes, userVote: response.data.user_vote } : null);
        } else throw new Error((response as any).message || "Vote failed.");
    } catch (error: any) {
        toast({ title: "Vote Error", description: error.message, variant: "destructive" });
        setPost(p => p ? {...p, userVote: originalUserVote, upvotes: originalUpvotes, downvotes: originalDownvotes } : null);
    } finally { setIsVotingPost(false); }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !postId || !isAuthenticated) {
        toast({ title: "Cannot Comment", description: !isAuthenticated ? "Please log in." : "Comment cannot be empty.", variant: "destructive"});
        if (!isAuthenticated) navigate('/login/student');
        return;
    }
    setIsSubmittingComment(true);
    try {
        const payload: { text: string; parent_comment_id?: string } = { text: newCommentText.trim() };
        if (replyingTo) payload.parent_comment_id = replyingTo.commentId;

        const response = await apiClient<CreateCommentApiResponse>(`/posts/${postId}/comments`, {
            method: 'POST', data: payload,
        });
        if (response.status === 'success' && response.data?.comment) {
            const newComment = normalizeCommentData(response.data.comment);
            if (replyingTo) { // If it's a reply, we might need to update parent comment's replyCount or re-fetch replies for that parent
                setComments(prev => prev.map(c => c.id === replyingTo?.commentId ? {...c, replyCount: (c.replyCount || 0) + 1} : c));
                // Ideally, re-fetch replies for the parent comment if displaying them nested.
                // For now, just add to main list if not too deep or handle via state update of parent.
                // This simple add might not place it correctly in a threaded view.
                 setComments(prev => [...prev, newComment].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() ));

            } else { // Top-level comment
                setComments(prev => [newComment, ...prev]); // Add to top
            }
            setPost(p => p ? {...p, commentCount: (p.commentCount || 0) + 1} : null); // Update post's comment count
            setNewCommentText("");
            setReplyingTo(null);
            toast({ title: "Comment Posted!" });
        } else throw new Error((response as any).message || "Failed to post comment.");
    } catch (error: any) {
        toast({ title: "Comment Error", description: error.message, variant: "destructive"});
    } finally {
        setIsSubmittingComment(false);
    }
  };

  const handleSetReplyTo = (commentId: string, authorName: string) => {
    setReplyingTo({ commentId, authorName });
    commentInputRef.current?.focus(); // Focus the textarea
  };


  if (authIsLoading || isLoadingPost) {
    return <div className="flex items-center justify-center min-h-screen"><Loader2 className="h-8 w-8 animate-spin text-unicampus-red" /> Loading Post...</div>;
  }
  if (!post) return <div className="flex items-center justify-center min-h-screen p-4 text-center">Post not found.</div>;

  const score = (post.upvotes ?? 0) - (post.downvotes ?? 0);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 pb-16"> {/* Adjusted pb for BottomNav */}
      <div className="bg-white dark:bg-gray-900 shadow-sm px-2 py-3 sticky top-0 z-30">
        <div className="max-w-3xl mx-auto flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} title="Go Back">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{post.title}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-0 sm:p-4">
        <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-none sm:shadow-md sm:rounded-lg">
          <CardHeader className="p-4 md:p-6 border-b dark:border-gray-700">
            {post.community && (
              <div className="mb-2 flex items-center space-x-1.5">
                {post.community.icon && <span className="text-base">{post.community.icon}</span>}
                <RouterLink to={`/communities/${post.community.slug || post.community.id}`} className="text-xs font-semibold text-gray-700 dark:text-gray-300 hover:underline">
                  c/{post.community.name}
                </RouterLink>
                <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Posted by u/{post.author.name}</span>
                <span className="text-xs text-gray-400 dark:text-gray-500">•</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{formatTimeAgo(post.createdAt)}</span>
              </div>
            )}
            <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{post.title}</CardTitle>
            {post.tags && post.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                    {post.tags.map(tag => <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>)}
                </div>
            )}
          </CardHeader>
          <CardContent className="p-4 md:p-6 text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
            {post.contentType === 'text' && post.contentText && <div className="whitespace-pre-wrap">{post.contentText}</div>}
            {post.contentType === 'image' && post.imageUrl && (
              <img src={post.imageUrl} alt={post.title} className="rounded-md max-h-[70vh] w-auto mx-auto my-2" />
            )}
            {post.contentType === 'link' && post.linkUrl && (
              <a href={post.linkUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline break-all">
                <ExternalLink className="h-4 w-4 flex-shrink-0" /> <span>{post.linkUrl}</span>
              </a>
            )}
          </CardContent>
          <CardFooter className="p-4 md:p-6 border-t dark:border-gray-700 flex items-center justify-start space-x-4">
            <div className="flex items-center space-x-0.5">
                <Button variant="ghost" size="sm" className={`p-1 h-8 w-8 rounded-full ${post.userVote === 'up' ? 'text-unicampus-red bg-unicampus-red/10' : 'text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700'}`} onClick={() => handlePostVote('up')} disabled={isVotingPost}><ChevronUp className="h-5 w-5" /></Button>
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300 min-w-[2.5rem] text-center tabular-nums">{score}</span>
                <Button variant="ghost" size="sm" className={`p-1 h-8 w-8 rounded-full ${post.userVote === 'down' ? 'text-blue-600 bg-blue-600/10' : 'text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700'}`} onClick={() => handlePostVote('down')} disabled={isVotingPost}><ChevronDown className="h-5 w-5" /></Button>
            </div>
            <div className="flex items-center space-x-1.5 text-gray-500 dark:text-gray-400">
                <MessageSquare className="h-4 w-4" />
                <span className="text-sm">{post.commentCount} Comments</span>
            </div>
          </CardFooter>
        </Card>

        {/* Comments Section */}
        <Card className="mt-4 dark:bg-gray-800 dark:border-gray-700 shadow-none sm:shadow-md sm:rounded-lg">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {post.commentCount} {post.commentCount === 1 ? 'Comment' : 'Comments'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            {/* Comment Form */}
            {isAuthenticated && (
                <form onSubmit={handleCommentSubmit} className="mb-6">
                    {replyingTo && (
                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1 flex justify-between">
                            <span>Replying to {replyingTo.authorName}</span>
                            <Button variant="link" size="xs" className="p-0 h-auto text-unicampus-red" onClick={() => setReplyingTo(null)}>Cancel Reply</Button>
                        </div>
                    )}
                    <Textarea
                        ref={commentInputRef}
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        placeholder={replyingTo ? `Reply to ${replyingTo.authorName}...` : "Add a comment..."}
                        rows={3}
                        className="w-full mb-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <div className="flex justify-end">
                        <Button type="submit" size="sm" className="bg-unicampus-red hover:bg-unicampus-red-dark text-white" disabled={isSubmittingComment || !newCommentText.trim()}>
                        {isSubmittingComment ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                        {replyingTo ? "Post Reply" : "Post Comment"}
                        </Button>
                    </div>
                </form>
            )}

            {/* Comments List */}
            {isLoadingComments && comments.length === 0 ? (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">Loading comments...</div>
            ) : comments.length > 0 ? (
              <div className="space-y-3">
                {comments.map(comment => (
                  <CommentListItem key={comment.id} comment={comment} onReply={handleSetReplyTo} />
                ))}
                {!isLoadingComments && currentCommentsPage < totalCommentsPages && (
                    <div className="text-center mt-4">
                        <Button variant="outline" onClick={() => fetchComments(currentCommentsPage + 1)} disabled={isLoadingComments}>Load More Comments</Button>
                    </div>
                )}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400 py-6">No comments yet. Be the first to comment!</p>
            )}
          </CardContent>
        </Card>
      </div>
      {/* <BottomNavigation /> */} {/* Optional: Decide if BottomNav is needed here */}
    </div>
  );
};

export default PostDetailScreen;