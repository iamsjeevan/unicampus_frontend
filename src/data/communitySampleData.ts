
export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  icon: string;
  memberCount: number;
  bannerImage?: string;
}

export interface Post {
  id: string;
  communityId: string;
  title: string;
  contentPreview: string;
  fullContent: string;
  authorId: string;
  timestamp: Date;
  upvotes: number;
  commentsCount: number;
  image?: string;
  userVote?: 'up' | 'down' | null;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  text: string;
  timestamp: Date;
}

// User following data for filtering posts
export const userFollowedCommunityIds = ['1', '4']; // Following Placement Prep and Coding Hangout

export const users: User[] = [
  { id: '1', name: 'Ananya Sharma', avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150' },
  { id: '2', name: 'Rahul Kumar', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
  { id: '3', name: 'Priya Singh', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
  { id: '4', name: 'Arjun Reddy', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' },
  { id: '5', name: 'Sneha Patel', avatarUrl: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150' }
];

export const communities: Community[] = [
  {
    id: '1',
    name: 'Placement Prep 2025',
    description: 'Share placement preparation resources, tips, and success stories',
    icon: '💼',
    memberCount: 1250,
    bannerImage: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800'
  },
  {
    id: '2',
    name: 'MSRIT Interview Experiences',
    description: 'Real interview experiences shared by students and alumni',
    icon: '🎯',
    memberCount: 890,
    bannerImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800'
  },
  {
    id: '3',
    name: 'Campus Sports',
    description: 'Organize sports events, tournaments, and fitness activities',
    icon: '⚽',
    memberCount: 456,
    bannerImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'
  },
  {
    id: '4',
    name: 'Coding Hangout',
    description: 'Discuss coding challenges, share projects, and collaborate',
    icon: '💻',
    memberCount: 678,
    bannerImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800'
  },
  {
    id: '5',
    name: 'General Chit-Chat',
    description: 'General discussions about campus life and everything else',
    icon: '💬',
    memberCount: 2100,
    bannerImage: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800'
  }
];

export const posts: { [communityId: string]: Post[] } = {
  '1': [
    {
      id: '1',
      communityId: '1',
      title: 'Microsoft SDE Interview Experience - Selected!',
      contentPreview: 'Just got selected at Microsoft as SDE-1! Here\'s my complete interview experience...',
      fullContent: 'Just got selected at Microsoft as SDE-1! Here\'s my complete interview experience:\n\nRound 1 (Online): 2 coding questions - one on arrays and one on trees. Make sure to optimize your solutions.\n\nRound 2 (Technical): Deep dive into system design. They asked me to design a URL shortener like bit.ly.\n\nRound 3 (Managerial): Behavioral questions and past project discussions.\n\nTips: Practice LeetCode medium problems, understand system design basics, and be confident about your projects!',
      authorId: '1',
      timestamp: new Date('2024-01-15T10:30:00Z'),
      upvotes: 45,
      commentsCount: 12,
      userVote: null
    },
    {
      id: '2',
      communityId: '1',
      title: 'Resume Review - Please help!',
      contentPreview: 'Can someone review my resume? I\'m applying for software engineer roles...',
      fullContent: 'Can someone review my resume? I\'m applying for software engineer roles and want to make sure it\'s competitive. I have 2 internships and 3 major projects. Any feedback would be appreciated!',
      authorId: '2',
      timestamp: new Date('2024-01-14T14:20:00Z'),
      upvotes: 23,
      commentsCount: 8,
      userVote: null
    }
  ],
  '2': [
    {
      id: '3',
      communityId: '2',
      title: 'Google Interview Questions - Round 1',
      contentPreview: 'Recently interviewed at Google. Here are the questions they asked...',
      fullContent: 'Recently interviewed at Google. Here are the questions they asked:\n\n1. Implement LRU Cache\n2. Find median in a stream of integers\n3. Design a parking lot system\n\nThe interviewers were very friendly and helped when I got stuck. Don\'t panic if you don\'t get the optimal solution immediately.',
      authorId: '3',
      timestamp: new Date('2024-01-13T16:45:00Z'),
      upvotes: 67,
      commentsCount: 15,
      userVote: null
    }
  ],
  '4': [
    {
      id: '4',
      communityId: '4',
      title: 'Looking for teammates - Hackathon next week',
      contentPreview: 'Anyone interested in forming a team for the upcoming hackathon?',
      fullContent: 'Anyone interested in forming a team for the upcoming hackathon? I\'m good with React/Node.js and looking for 2-3 more members. We can work on something related to web3 or AI.',
      authorId: '4',
      timestamp: new Date('2024-01-12T09:15:00Z'),
      upvotes: 18,
      commentsCount: 6,
      userVote: null
    }
  ]
};

export const comments: { [postId: string]: Comment[] } = {
  '1': [
    {
      id: '1',
      postId: '1',
      authorId: '2',
      text: 'Congratulations! This is really helpful. How long did you prepare?',
      timestamp: new Date('2024-01-15T11:00:00Z')
    },
    {
      id: '2',
      postId: '1',
      authorId: '3',
      text: 'Amazing! Can you share some system design resources?',
      timestamp: new Date('2024-01-15T11:30:00Z')
    }
  ],
  '2': [
    {
      id: '3',
      postId: '2',
      authorId: '1',
      text: 'Share your resume, I can help review it!',
      timestamp: new Date('2024-01-14T15:00:00Z')
    }
  ]
};

export const getPopulatedPosts = (communityId: string): (Post & { author: User })[] => {
  const communityPosts = posts[communityId] || [];
  return communityPosts.map(post => ({
    ...post,
    author: users.find(user => user.id === post.authorId)!
  }));
};

export const getPopulatedComments = (postId: string): (Comment & { author: User })[] => {
  const postComments = comments[postId] || [];
  return postComments.map(comment => ({
    ...comment,
    author: users.find(user => user.id === comment.authorId)!
  }));
};

// Helper function to get all posts with community info for feeds
export const getAllPopulatedPosts = (): (Post & { author: User; community: Community })[] => {
  const allPosts: (Post & { author: User; community: Community })[] = [];
  
  Object.values(posts).forEach(communityPosts => {
    communityPosts.forEach(post => {
      const author = users.find(user => user.id === post.authorId)!;
      const community = communities.find(comm => comm.id === post.communityId)!;
      allPosts.push({ ...post, author, community });
    });
  });

  return allPosts;
};

// Helper function to get trending posts (sorted by upvotes)
export const getTrendingPosts = (): (Post & { author: User; community: Community })[] => {
  return getAllPopulatedPosts().sort((a, b) => b.upvotes - a.upvotes);
};

// Helper function to get following posts (only from followed communities)
export const getFollowingPosts = (): (Post & { author: User; community: Community })[] => {
  return getAllPopulatedPosts()
    .filter(post => userFollowedCommunityIds.includes(post.communityId))
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};
