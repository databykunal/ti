import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { StorageAnalyzer } from './components/StorageAnalyzer';
import { DuplicateFinder } from './components/DuplicateFinder';
import { SimilarFiles, LargeFiles, OldFiles, Cleanup, HistoryPage, Settings } from './components/Pages';
import { OnboardingTour } from './components/OnboardingTour';
import { ThemeProvider } from './context/ThemeContext';
import './main.css';

function AppContent() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem('tidydrive-onboarding-completed');
    if (!completed) {
      setShowOnboarding(true);
    }
  }, []);

  const renderContent = () => {
    switch (activeNav) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveNav} />;
      case 'analyze':
        return <StorageAnalyzer />;
      case 'duplicates':
        return <DuplicateFinder />;
      case 'similar':
        return <SimilarFiles />;
      case 'large-files':
        return <LargeFiles />;
      case 'old-files':
        return <OldFiles />;
      case 'cleanup':
        return <Cleanup />;
      case 'history':
        return <HistoryPage />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onNavigate={setActiveNav} />;
    }
  };

  return (
    <div className="flex h-screen bg-white dark:bg-slate-950">
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} />
      {renderContent()}
      <OnboardingTour 
        isOpen={showOnboarding} 
        onComplete={() => setShowOnboarding(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
