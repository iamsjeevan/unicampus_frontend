// src/main.tsx
// Previous version:
// import { createRoot } from 'react-dom/client';
// import App from './App.tsx';
// import './index.css';
// import { AuthProvider } from './contexts/AuthContext.tsx';
// import { BrowserRouter as Router } from 'react-router-dom';

// createRoot(document.getElementById("root")!).render(
//   <React.StrictMode> // <-- Line 9 where error likely occurs
//     <Router>
//       <AuthProvider>
//         <App />
//       </AuthProvider>
//     </Router>
//   </React.StrictMode>
// );

// Corrected version:
import React from 'react'; // <--- ADD THIS LINE
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);