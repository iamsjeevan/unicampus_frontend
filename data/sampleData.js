// data/sampleData.js
export const sampleAttendance = [
  { id: '1', subjectName: 'Data Structures', totalClasses: 60, attendedClasses: 50 },
  { id: '2', subjectName: 'Algorithms', totalClasses: 55, attendedClasses: 52 },
  { id: '3', subjectName: 'Operating Systems', totalClasses: 50, attendedClasses: 40 },
  { id: '4', subjectName: 'Database Management', totalClasses: 45, attendedClasses: 44 },
];

export const sampleNotices = [
  { id: '1', title: 'Mid-Term Exam Schedule', date: '2023-10-15', content: 'The mid-term exams will commence from Nov 1st. Detailed schedule attached. Make sure to check the notice board near the library for the full PDF. Room allocations will be shared a day before each exam via email and SMS notifications. Bring your hall tickets.', postedBy: 'Admin Office' },
  { id: '2', title: 'Holiday: Diwali', date: '2023-10-20', content: 'The college will remain closed on Oct 24th on account of Diwali. We wish everyone a happy and prosperous Diwali. The library will also be closed. Enjoy the festival responsibly.', postedBy: 'Principal' },
  { id: '3', title: 'Workshop on AI', date: '2023-10-22', content: 'A workshop on "Future of AI" will be held on Nov 5th in the seminar hall from 10 AM to 4 PM. Register by Oct 30th. Limited seats available. Lunch will be provided. Guest speaker: Dr. AI Expert from Tech Innovations Inc.', postedBy: 'CSE Department' },
];

export const sampleResults = [
  {
    id: '1', semester: 'Semester 3', sgpa: 8.5, cgpa: 8.2,
    subjects: [
      { id: 's1', name: 'Data Structures', grade: 'A', credits: 4 },
      { id: 's2', name: 'Algorithms', grade: 'A+', credits: 4 },
      { id: 's3', name: 'Mathematics III', grade: 'B+', credits: 3 },
    ]
  },
  {
    id: '2', semester: 'Semester 4', sgpa: 8.8, cgpa: 8.4,
    subjects: [
      { id: 's4', name: 'Operating Systems', grade: 'A+', credits: 4 },
      { id: 's5', name: 'Database Management', grade: 'A', credits: 4 },
      { id: 's6', name: 'Computer Networks', grade: 'B', credits: 3 },
    ]
  },
];

export const sampleCommunities = [
  { id: 'c1', name: 'Placement Prep 2024', description: 'Discussing interview experiences, resources, and company drives.', members: 120, icon: 'briefcase-outline' },
  { id: 'c2', name: 'Coding Ninjas', description: 'For competitive programming and DSA.', members: 250, icon: 'code-tags' },
  { id: 'c3', name: 'React Native Devs', description: 'Share and learn React Native development.', members: 75, icon: 'react' },
  { id: 'c4', name: 'General Chit-Chat', description: 'Anything and everything college related.', members: 300, icon: 'chat-outline' },
];

export const samplePosts = {
  c1: [ // Posts for 'Placement Prep 2024'
    { id: 'p1', communityId: 'c1', title: 'Infosys Drive Experience', author: 'Rohan S.', upvotes: 15, commentsCount: 2, content: 'Just had my Infosys interview. They asked 2 DSA questions (one array, one tree based), basic DBMS concepts like normalization, and one logical puzzle. Be prepared for behavioral questions too! The process was smooth, results expected in a week.', timestamp: '2 hours ago' },
    { id: 'p2', communityId: 'c1', title: 'Best resources for Aptitude?', author: 'Priya M.', upvotes: 22, commentsCount: 1, content: 'Can anyone share good resources for quantitative aptitude preparation? Specifically for time-bound tests.', timestamp: '5 hours ago' },
  ],
  c2: [ // Posts for 'Coding Ninjas'
    { id: 'p3', communityId: 'c2', title: 'Need help with DP problem', author: 'Amit K.', upvotes: 8, commentsCount: 0, content: 'Stuck on this dynamic programming problem from Codeforces. The problem asks to find the minimum cost to reach the end of an array with certain jump rules. Any hints on the state definition or recurrence relation?', timestamp: '1 day ago' },
  ],
  c3: [], // No posts for React Native Devs yet
  c4: [
    { id: 'p4', communityId: 'c4', title: 'Lost my ID card', author: 'User123', upvotes: 2, commentsCount: 0, content: 'Has anyone found a student ID card near the canteen? Name: Anjali Sharma, Roll No: CS101. Please contact me if found.', timestamp: '30 mins ago' },
  ]
};

export const sampleComments = {
  p1: [ // Comments for post 'Infosys Drive Experience'
    { id: 'cm1', postId: 'p1', author: 'Sneha G.', text: 'Thanks for sharing, Rohan! Was it on-campus or virtual?', timestamp: '1 hour ago' },
    { id: 'cm2', postId: 'p1', author: 'Vikram P.', text: 'Which puzzle did they ask? Any specific topic?', timestamp: '30 mins ago' },
  ],
  p2: [
    { id: 'cm3', postId: 'p2', author: 'Admin', text: 'Check out IndiaBIX and RS Aggarwal for aptitude. Practice is key!', timestamp: '4 hours ago' },
  ]
};
