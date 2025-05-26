// data/communitySampleData.js
export const users = {
  'user0': { id: 'user0', name: 'S Jeevan', avatarUrl: 'https://via.placeholder.com/100/00BCD4/FFFFFF?Text=SJ' },
  'user1': { id: 'user1', name: 'Priya Sharma', avatarUrl: 'https://via.placeholder.com/100/F44336/FFFFFF?Text=PS' },
  'user2': { id: 'user2', name: 'Amit Kumar', avatarUrl: 'https://via.placeholder.com/100/4CAF50/FFFFFF?Text=AK' },
  'user3': { id: 'user3', name: 'Rohan Reddy', avatarUrl: 'https://via.placeholder.com/100/9C27B0/FFFFFF?Text=RR' },
};

export const communities = [
  {
    id: 'c1',
    name: 'Placements & Internships Hub',
    description: 'Discuss interview experiences, job openings, resume tips, and career advice. Connect with alumni.',
    icon: 'briefcase-account-outline',
    memberCount: 285,
    bannerImage: require('../assets/images/community_banner_placeholder.jpg'),
  },
  {
    id: 'c2',
    name: 'Sports Central (MSRIT)',
    description: 'All about college sports - cricket, football, basketball, badminton. Find teammates and event updates.',
    icon: 'trophy-outline',
    memberCount: 152,
    bannerImage: 'https://source.unsplash.com/random/800x300/?sports,team',
  },
  {
    id: 'c3',
    name: 'CodeRIT Community',
    description: 'For all coders! Discuss programming languages, DSA, competitive coding, hackathons, and personal projects.',
    icon: 'xml',
    memberCount: 310,
    bannerImage: 'https://source.unsplash.com/random/800x300/?code,binary',
  },
  {
    id: 'c4',
    name: 'MSRIT Gaming Lounge',
    description: 'Valorant, BGMI, FIFA, and more. Find teammates, share clips, and discuss gaming setups.',
    icon: 'gamepad-variant-outline',
    memberCount: 190,
    bannerImage: 'https://source.unsplash.com/random/800x300/?gaming,esports',
  },
  {
    id: 'c5',
    name: 'College Events & Fests',
    description: 'Stay updated on upcoming college events, cultural fests, tech fests, workshops, and volunteer opportunities.',
    icon: 'calendar-star',
    memberCount: 450,
    bannerImage: 'https://source.unsplash.com/random/800x300/?festival,event',
  },
];

export const posts = {
  'c1': [ // Placements
    {
      id: 'p101',
      communityId: 'c1',
      title: 'Infosys Interview Experience - System Engineer',
      contentPreview: 'Just had my Infosys interview. They asked 2 DSA questions (one array, one tree based), basic DBMS concepts like normalization, and one logical puzzle. Overall difficulty was moderate. HR round was chill. Results expected in a week!',
      fullContent: 'Detailed experience: The first round was an online test with aptitude, logical reasoning, and verbal ability, followed by two coding questions. Those who cleared went to the technical interview. My technical interview lasted for about 45 minutes. Questions asked:\n1. Tell me about yourself.\n2. Explain your final year project.\n3. DSA: Reverse a linked list (iterative and recursive).\n4. DSA: Find if a binary tree is a Binary Search Tree.\n5. DBMS: What is normalization? Explain 1NF, 2NF, 3NF with examples.\n6. OS: What is a deadlock? How can it be prevented?\n7. Puzzle: You have two ropes that each take an hour to burn... (classic puzzle)\n\nThe interviewer was friendly and guided me when I got stuck. The HR round was just 15 minutes, mainly about relocation and salary expectations. \n\nTips: Be confident, communicate your thought process clearly, and revise your CS fundamentals well.',
      authorId: 'user1',
      timestamp: '2 hours ago',
      upvotes: 28,
      commentsCount: 5,
      image: null, // 'https://source.unsplash.com/random/800x600/?office,interview'
    },
    {
      id: 'p102',
      communityId: 'c1',
      title: 'Internship Opening at Tech Startup (React Native)',
      contentPreview: 'Hey everyone, my company (a small EdTech startup) is looking for React Native interns. 2-3 months, remote possible. DM me if interested with your resume/GitHub.',
      fullContent: 'Looking for passionate React Native developer interns to join our team. You will be working on enhancing our mobile application, adding new features, and fixing bugs. \nRequirements:\n- Good understanding of JavaScript, React, and React Native.\n- Familiarity with state management (Redux/Context API).\n- Experience with REST APIs.\n- Git version control.\n\nDuration: 2-3 months (extendable)\nStipend: Competitive\nLocation: Remote / Bangalore (optional)\n\nIf you are interested, please send your resume and GitHub profile link to [email protected] or DM me here.',
      authorId: 'user3',
      timestamp: '1 day ago',
      upvotes: 45,
      commentsCount: 12,
      image: null,
    },
  ],
  'c2': [ // Sports
    {
      id: 'p201',
      communityId: 'c2',
      title: 'Inter-departmental Cricket Tournament Next Week!',
      contentPreview: 'Get your teams ready! The annual cricket tournament starts next Monday. Fixtures will be out soon. Who is participating?',
      fullContent: 'The much-awaited inter-departmental cricket tournament is back! Registrations are closed. We have 16 teams participating this year. Fixtures will be displayed on the college notice board and shared here by tomorrow evening. Matches will be played on the main ground. Come support your departments! #MSRITCricket #CollegeSports',
      authorId: 'user2',
      timestamp: '6 hours ago',
      upvotes: 18,
      commentsCount: 3,
      image: 'https://source.unsplash.com/random/800x600/?cricket,match',
    }
  ],
  // Add more posts for other communities
  'c3': [], 'c4': [], 'c5': [],
};

export const comments = {
  'p101': [
    { id: 'cm1', postId: 'p101', authorId: 'user2', text: 'Thanks for sharing! Very helpful for upcoming placements.', timestamp: '1 hour ago' },
    { id: 'cm2', postId: 'p101', authorId: 'user3', text: 'Which puzzle did they ask specifically?', timestamp: '30 mins ago' },
    { id: 'cm3', postId: 'p101', authorId: 'user1', text: 'It was the "two ropes burn in one hour, measure 45 minutes" one.', timestamp: '25 mins ago' },
  ],
  'p102': [
     { id: 'cm4', postId: 'p102', authorId: 'user0', text: 'DM-ed you! Sounds interesting.', timestamp: '20 hours ago' },
  ],
  'p201': [],
};

// Helper to get populated post/comment data
export const getPopulatedPosts = (communityId) => {
  return (posts[communityId] || []).map(post => ({
    ...post,
    authorName: users[post.authorId]?.name || 'Unknown User',
    authorAvatar: users[post.authorId]?.avatarUrl,
  }));
};

export const getPopulatedComments = (postId) => {
  return (comments[postId] || []).map(comment => ({
    ...comment,
    authorName: users[comment.authorId]?.name || 'Unknown User',
    authorAvatar: users[comment.authorId]?.avatarUrl,
  }));
};
