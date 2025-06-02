// src/main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { BrowserRouter as Router } from 'react-router-dom'; // Use an alias

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router> {/* Router is outermost */}
      <AuthProvider> {/* AuthProvider wraps App */}
        <App />
      </AuthProvider>
    </Router>
  </React.StrictMode>
);