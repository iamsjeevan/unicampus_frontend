// data/resourceSampleData.js
export const semesters = [
  { label: 'All Semesters', value: 'all' },
  { label: 'Semester 1', value: 'sem1' },
  { label: 'Semester 2', value: 'sem2' },
  { label: 'Semester 3', value: 'sem3' },
  { label: 'Semester 4', value: 'sem4' },
  { label: 'Semester 5', value: 'sem5' },
  { label: 'Semester 6', value: 'sem6' },
  // Add more as needed
];

export const resourceTabs = [
  { id: 'notes', title: 'Shared Notes' },
  { id: 'pyqs', title: 'PYQs' },
  { id: 'textbooks', title: 'Textbooks' },
  { id: 'syllabus', title: 'Syllabus' },
];

export const resources = {
  notes: [
    {
      id: 'n1', title: 'DSA Unit 1 Notes.pdf', type: 'pdf',
      uploadedBy: 'Prof. Johnson', date: 'Sep 15, 2023', fileSize: '2.5 MB', semester: 'sem3',
      url: 'https://example.com/dsa_unit1.pdf'
    },
    {
      id: 'n2', title: 'DBMS Complete Notes.pdf', type: 'pdf',
      uploadedBy: 'Rahul Sharma', date: 'Oct 10, 2023', fileSize: '4.2 MB', semester: 'sem3',
      url: 'https://example.com/dbms_complete.pdf'
    },
    {
      id: 'n3', title: 'Computer Networks Handwritten.pdf', type: 'pdf',
      uploadedBy: 'Priya Patel', date: 'Nov 5, 2023', fileSize: '3.8 MB', semester: 'sem3',
      url: 'https://example.com/cn_handwritten.pdf'
    },
    {
      id: 'n4', title: 'OS Concepts Chapter 1-3.docx', type: 'docx',
      uploadedBy: 'Admin', date: 'Sep 1, 2023', fileSize: '1.1 MB', semester: 'sem2',
      url: 'https://example.com/os_concepts.docx'
    },
  ],
  pyqs: [
    {
      id: 'p1', title: 'DSA SEE 2022 Paper.pdf', type: 'pdf',
      uploadedBy: 'Alumni_Batch2020', date: 'Jan 20, 2023', fileSize: '0.8 MB', semester: 'sem3',
      url: 'https://example.com/dsa_see2022.pdf'
    },
    {
      id: 'p2', title: 'Maths-III CIE 2023 Set A.pdf', type: 'pdf',
      uploadedBy: 'Admin', date: 'Mar 15, 2023', fileSize: '0.5 MB', semester: 'sem3',
      url: 'https://example.com/math3_cie2023.pdf'
    },
     {
      id: 'p3', title: 'Physics Cycle Questions 2021.pdf', type: 'pdf',
      uploadedBy: 'SeniorsHelp', date: 'Aug 10, 2022', fileSize: '1.2 MB', semester: 'sem1',
      url: 'https://example.com/phy_cycle2021.pdf'
    },
  ],
  textbooks: [
    {
      id: 't1', title: 'Operating System Concepts - Galvin (9th Ed)', type: 'link',
      source: 'Archive.org', date: 'N/A', fileSize: 'Link', semester: 'sem3',
      url: 'https://archive.org/details/operating-system-concepts-9th-edition'
    },
    {
      id: 't2', title: 'Data Structures and Algorithms Made Easy - Karumanchi', type: 'link',
      source: 'College Library Portal', date: 'N/A', fileSize: 'Link', semester: 'sem3',
      url: 'https://example.com/library/dsa_karumanchi'
    },
  ],
  syllabus: [
    {
      id: 's1', title: 'CSE Syllabus 2022 Scheme (Sem 1-4).pdf', type: 'pdf',
      uploadedBy: 'Dept. of CSE', date: 'Jul 1, 2022', fileSize: '1.5 MB', semester: 'all', // Applicable to multiple
      url: 'https://example.com/cse_syllabus_2022.pdf'
    },
    {
      id: 's2', title: 'VTU Academic Calendar 2023-24.pdf', type: 'pdf',
      uploadedBy: 'VTU Official', date: 'Aug 15, 2023', fileSize: '0.3 MB', semester: 'all',
      url: 'https://vtu.ac.in/academic_calendar.pdf'
    },
  ],
};