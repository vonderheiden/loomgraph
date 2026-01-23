import { useState, useCallback } from 'react';
import { BannerProvider } from './context/BannerContext';
import FormPanel from './components/FormPanel';
import PreviewPanel from './components/preview/PreviewPanel';
import { LandingPage } from './components/landing/LandingPage';
import type { ViewType } from './types/landing.types';

/**
 * Root application component with view state management.
 * 
 * Manages navigation between the landing page and generator view using
 * conditional rendering. This approach avoids React Router complexity while
 * maintaining flexibility for future routing migration.
 * 
 * Requirements: 1.1, 1.2, 1.4
 */
function App() {
  // View state management: 'landing' is the default view
  const [currentView, setCurrentView] = useState<ViewType>('landing');

  /**
   * Navigate to the generator view and scroll to top.
   * Used by all CTA buttons on the landing page.
   */
  const navigateToGenerator = useCallback(() => {
    setCurrentView('generator');
    // Scroll to top when switching views for better UX
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <>
      {/* Landing Page View */}
      {currentView === 'landing' && (
        <LandingPage onNavigate={navigateToGenerator} />
      )}

      {/* Generator View */}
      {currentView === 'generator' && (
        <BannerProvider>
          <div className="min-h-screen bg-bento-bg">
            {/* Two-column layout: 40% form, 60% preview */}
            <div className="flex flex-col lg:flex-row min-h-screen">
              {/* Left Column: Form (40%) */}
              <FormPanel />

              {/* Right Column: Preview (60%) */}
              <PreviewPanel />
            </div>
          </div>
        </BannerProvider>
      )}
    </>
  );
}

export default App;
