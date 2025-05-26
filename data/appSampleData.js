// data/appSampleData.js
export const userProfile = {
  name: 'S Jeevan',
  avatar: require('../assets/images/user_avatar.jpg'), // Use require for local images
  class: 'SEM 06-C',
  course: 'B.E-CS',
  feesPaid: true, // or 'Partial', 'Due'
};

export const proctorAnnouncements = [
  // { id: '1', message: 'Class test on Unit 3 next Monday.', date: '2024-05-10' },
  // { id: '2', message: 'Submit assignments by Friday EOD.', date: '2024-05-08' },
]; // Empty for "No messages from proctor"

export const attendanceSummary = {
  subjects: [
    { id: '22AL61', name: 'Management & Entrepreneurship', code: '22AL61', percentage: 80, color: '#00BCD4' },
    { id: '22CS62', name: 'Cloud Computing and Big Data', code: '22CS62', percentage: 92, color: '#4CAF50' },
    { id: '22CSE635', name: 'Mobile Application Development', code: '22CSE635', percentage: 75, color: '#FFC107' },
    { id: '22CSE641', name: 'Cryptography & Network Security', code: '22CSE641', percentage: 88, color: '#9C27B0' },
    { id: '22CSL66', name: 'MAD Lab', code: '22CSL66', percentage: 95, color: '#F44336' },
    { id: '22CSP67', name: 'Project Work Phase-1', code: '22CSP67', percentage: 100, color: '#2196F3' },
    { id: '22ECOE01', name: 'Open Elective X', code: '22ECOE01', percentage: 70, color: '#E91E63' },
    // { id: 'EXTRA', name: 'Some Other Subject', code: 'EXTRA01', percentage: 60, color: '#FF9800' },
  ],
};

export const attendanceDetailData = {
  '22AL61': {
    subjectName: 'Management & Entrepreneurship',
    subjectCode: '22AL61',
    attended: 20,
    missed: 5,
    remaining: 16, // Hypothetical
    total: 41,
    percentage: 80,
    calendar: { // YYYY-MM-DD
      '2025-05-01': { selected: false, marked: true, dotColor: '#66BB6A' }, // Present
      '2025-05-02': { selected: false, marked: true, dotColor: '#66BB6A' },
      '2025-05-03': { selected: false, disabled: true, dotColor: '#757575' }, // Weekend/Holiday
      '2025-05-05': { selected: false, marked: true, dotColor: '#EF5350' }, // Absent
      '2025-05-06': { selected: false, marked: true, dotColor: '#66BB6A' },
      '2025-05-09': { selected: false, marked: true, dotColor: '#66BB6A' },
      '2025-05-13': { selected: false, marked: true, dotColor: '#66BB6A' },
      '2025-05-16': { selected: true, marked: true, dotColor: '#00BCD4', selectedColor: '#00BCD4' }, // Selected
    }
  },
  // Add more subject details similarly
  '22CS62': {
    subjectName: 'Cloud Computing and Big Data',
    subjectCode: '22CS62',
    attended: 23,
    missed: 2,
    remaining: 10,
    total: 35,
    percentage: 92,
    calendar: {} // Populate as needed
  },
};


export const resultsData = {
  cie: {
    subjects: [
      { id: 'r1', name: 'Management & Entrepreneurship', code: '22AL61', marks: 27, total: 30, value: 27 }, // value for chart
      { id: 'r2', name: 'Cloud Computing and Big Data', code: '22CS62', marks: 17, total: 30, value: 17 },
      { id: 'r3', name: 'Cryptography & Network Security', code: '22CSE641', marks: 29, total: 30, value: 29 },
      { id: 'r4', name: 'MAD Lab', code: '22CSL66', marks: 0, total: 30, value: 0 }, // Example for zero
      { id: 'r5', name: 'Open Elective X', code: '22ECOE01', marks: 22, total: 30, value: 22 },
      // Add more CIE subjects
    ],
    chartData: {
      labels: ['22AL61', '22CS62', '22CSE641', '22CSL66', '22ECOE01'], // Codes for x-axis
      datasets: [
        {
          data: [27, 17, 29, 0, 22], // Must match order of labels
          colors: [(opacity = 1) => `#29B6F6`, (opacity = 1) => `#EF5350`, (opacity = 1) => `#29B6F6`, (opacity = 1) => `#EF5350`, (opacity = 1) => `#29B6F6`], // Example alternating or map from subject
        },
      ],
    },
  },
  see: {
    cgpa: 7.81,
    semesters: [
      { id: 's1', name: 'Sem - 1', gpa: 7.55 },
      { id: 's2', name: 'Sem - 2', gpa: 8.55 },
      { id: 's3', name: 'Sem - 3', gpa: 8.04 },
      { id: 's4', name: 'Sem - 4', gpa: 7.65 },
      { id: 's5', name: 'Sem - 5', gpa: 7.31 },
      // Add more semesters
    ]
  }
};

export const settingsOptions = [
  { id: 'fee', text: 'Fee Payment', icon: 'currency-usd', screen: 'FeePayment', type: 'navigate' },
  { id: 'wifi', text: 'Register WiFi complaint', icon: 'wifi-alert', screen: 'WifiComplaint', type: 'navigate' },
  { id: 'darkmode', text: 'Dark Mode', icon: 'theme-light-dark', type: 'switch', stateKey: 'isDarkMode' },
  { id: 'feedback', text: 'Feedback', icon: 'lock-question', screen: 'Feedback', type: 'navigate' },
  { id: 'about', text: 'About', icon: 'information-outline', screen: 'About', type: 'navigate' },
  { id: 'updatedata', text: 'Update data', icon: 'update', action: 'syncData', type: 'action' },
];

export const clubsAndAcademics = {
  clubs: [
    {id: 'd1', name: 'MSRIT discord', icon: 'discord', color: '#5865F2', link: 'https://discord.gg/yourinvite'},
    {id: 'g1', name: 'GDSC-RIT', iconType: 'image', image: require('../assets/images/gdsc_logo_placeholder.png'), link: 'https://gdsc.community.dev/'}, // Replace with actual GDSC logo asset
    {id: 'c1', name: 'CodeRIT', iconType: 'image', image: require('../assets/images/coderit_logo_placeholder.png'), link: 'https://coderit.org'}, // Replace
    {id: 'n1', name: 'Nakama', iconType: 'image', image: require('../assets/images/nakama_logo_placeholder.png'), link: 'https://nakama.org'}, // Replace
  ],
  academics: [
    {id: 'cm1', name: 'Course Material', icon: 'book-open-variant', screen: 'CourseMaterial'},
    {id: 'syl1', name: 'Syllabi', icon: 'text-box-multiple-outline', screen: 'Syllabi'},
  ]
}
// Placeholder images for clubs - create these in assets/images:
// gdsc_logo_placeholder.png
// coderit_logo_placeholder.png
// nakama_logo_placeholder.png
