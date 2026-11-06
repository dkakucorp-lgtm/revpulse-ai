import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import UserManual from './components/UserManual';
import AppDashboard from './components/AppDashboard';
import KakuAssistant from './components/KakuAssistant';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const cleanPath = currentPath.replace(/\/$/, '') || '/';

  let currentView = <LandingPage />;
  if (cleanPath === '/privacy') {
    currentView = <PrivacyPolicy />;
  } else if (cleanPath === '/terms') {
    currentView = <TermsOfService />;
  } else if (cleanPath === '/manual') {
    currentView = <UserManual />;
  } else if (cleanPath === '/app') {
    currentView = <AppDashboard />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased relative">
      {currentView}
      {/* Global Floating Kaku AI Mascot */}
      <KakuAssistant />
    </div>
  );
}