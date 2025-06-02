// src/types/community.ts

export interface Author {
  id: string;
  _id?: string;
  name: string;
  avatarUrl?: string;
}

// For API responses that might use snake_case
interface CommunityApiSnakeCase {
  banner_image_url?: string | null;
  icon_url?: string | null;
  created_at?: string;
  updated_at?: string;
  member_count?: number;
  post_count?: number | null;
  is_member?: boolean;
}

export interface CommunityBase extends CommunityApiSnakeCase {
  id: string;
  _id?: string;
  name: string;
  description: string;
  slug?: string;
  icon?: string;
  bannerImage?: string;
  memberCount: number;
  postCount?: number | null;
  is_member?: boolean;
  tags?: string[];
  rules?: string[];
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface CommunitySummary extends CommunityBase {}
export interface CommunityDetail extends CommunityBase {}

interface PostApiSnakeCase {
    content_type?: 'text' | 'image' | 'link';
    content_text?: string;
    image_url?: string;
    link_url?: string;
    created_at?: string;
    updated_at?: string;
    comment_count?: number;
    user_vote?: 'up' | 'down' | null;
    last_activity_at?: string;
}

export interface Post extends PostApiSnakeCase {
  id: string;
  _id?: string;
  title: string;
  contentType: 'text' | 'image' | 'link';
  contentText?: string;
  contentPreview?: string;
  imageUrl?: string;
  linkUrl?: string;
  tags?: string[];
  author: Author;
  communityId: string;
  communityName?: string;
  communitySlug?: string;
  communityIcon?: string;
  community?: CommunitySummary;
  createdAt: string;
  updatedAt?: string;
  upvotes: number;
  downvotes: number;
  commentCount: number;
  userVote: 'up' | 'down' | null;
  lastActivityAt?: string;
}

// --- Comment Types ---
export interface Comment {
  id: string;
  _id?: string;
  postId: string;
  author: Author;
  text: string;
  parentId?: string | null;
  replyCount: number;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  updatedAt?: string;
  userVote: 'up' | 'down' | null;
  // For API responses that might use snake_case
  created_at?: string;
  updated_at?: string;
  parent_id?: string | null;
  reply_count?: number;
  user_vote?: 'up' | 'down' | null; // API might send snake_case
}


// --- API Response Structures ---
export interface CommunityDetailApiResponse {
  status: string;
  data: {
    community: CommunityDetail;
  };
}

export interface VoteApiResponse {
  status: string;
  data: {
    upvotes: number;
    downvotes: number;
    user_vote: 'up' | 'down' | null; // API sends snake_case
  };
}

export interface JoinLeaveApiResponse {
    status: string;
    message?: string;
    data?: {
        community: CommunityDetail;
    };
}

export interface CreatePostApiResponse {
  status: string;
  data: {
    post: Post;
  };
}

export interface PostDetailApiResponse {
  status: string;
  data: {
    post: Post;
  };
}

export interface CreateCommentApiResponse {
  status: string;
  data: {
    comment: Comment;
  };
}

// For PaginatedResponse<Comment> - make sure PaginatedResponse in apiClient.ts allows for optional 'message'
// Example for PaginatedResponse in apiClient.ts if not already done:
// export interface PaginatedResponse<T> {
//   status: string;
//   message?: string; // Optional message field
//   results?: number;
//   data: T[];
//   pagination?: { /* ... */ };
// }