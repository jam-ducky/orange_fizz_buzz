import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import AuthCallback from './components/AuthCallback';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;