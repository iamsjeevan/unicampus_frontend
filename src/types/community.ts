// src/types/community.ts

export interface Author {
  id: string;
  _id?: string; // Allow _id from API
  name: string;
  avatarUrl?: string; // Or avatar
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
  // Add any other snake_case fields your API sends
}

// Frontend uses camelCase primarily
export interface CommunityBase extends CommunityApiSnakeCase {
  id: string; // Will be normalized from id or _id
  _id?: string;
  name: string;
  description: string;
  slug?: string;
  icon?: string; // Normalized from icon_url or icon
  bannerImage?: string; // Normalized from banner_image_url or bannerImage
  memberCount: number; // Normalized
  postCount?: number | null; // Normalized
  is_member?: boolean; // Normalized
  tags?: string[];
  rules?: string[];
  createdAt?: string; // Normalized
  updatedAt?: string; // Normalized
}

export interface CommunitySummary extends CommunityBase {}

export interface CommunityDetail extends CommunityBase {
  // Add any fields specific to the detail view not in summary
}

// For API responses that might use snake_case for posts
interface PostApiSnakeCase {
    content_type?: 'text' | 'image' | 'link';
    content_text?: string;
    image_url?: string;
    link_url?: string;
    created_at?: string;
    updated_at?: string;
    comment_count?: number;
    user_vote?: 'up' | 'down' | null;
}


export interface Post extends PostApiSnakeCase {
  id: string;
  _id?: string;
  title: string;
  contentType: 'text' | 'image' | 'link'; // Normalized
  contentText?: string; // Normalized
  contentPreview?: string;
  imageUrl?: string; // Normalized
  linkUrl?: string; // Normalized
  tags?: string[];
  author: Author;
  communityId: string;
  community?: CommunitySummary;
  createdAt: string; // Normalized
  updatedAt?: string; // Normalized
  upvotes: number;
  downvotes: number;
  commentCount: number; // Normalized
  userVote: 'up' | 'down' | null; // Normalized
}

// --- API Response Structures ---

export interface CommunityDetailApiResponse {
  status: string;
  data: {
    community: CommunityDetail; // Expects the API to send an object that can map to CommunityDetail
  };
}

export interface VoteApiResponse {
  status: string;
  data: {
    upvotes: number;
    downvotes: number;
    user_vote: 'up' | 'down' | null;
  };
}

export interface JoinLeaveApiResponse {
    status: string;
    message?: string;
    data?: { // API might return the updated community object (nested)
        community: CommunityDetail;
    };
}