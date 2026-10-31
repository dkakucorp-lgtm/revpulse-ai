import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import AppDashboard from './components/AppDashboard';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Standardize trailing slashes
  const cleanPath = currentPath.replace(/\/$/, '') || '/';

  if (cleanPath === '/privacy') {
    return <PrivacyPolicy />;
  }

  if (cleanPath === '/terms') {
    return <TermsOfService />;
  }

  if (cleanPath === '/app') {
    return <AppDashboard />;
  }

  return <LandingPage />;
}