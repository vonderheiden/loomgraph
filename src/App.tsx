import { useState, useCallback } from 'react';
import { BannerProvider } from './context/BannerContext';
import FormPanel from './components/FormPanel';
import PreviewPanel from './components/preview/PreviewPanel';
import MobilePreview from './components/preview/MobilePreview';
import FloatingActionButton from './components/preview/FloatingActionButton';
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
            {/* Two-column layout: 35% form, 65% preview */}
            <div className="flex flex-col lg:flex-row min-h-screen" data-testid="generator-layout">
              {/* Mobile Preview - Only visible on mobile (<768px) */}
              <MobilePreview />

              {/* Left Column: Form (35%) */}
              <FormPanel />

              {/* Right Column: Preview (65%) */}
              <PreviewPanel />
            </div>

            {/* Floating Action Button - Only visible on mobile (<768px) */}
            <FloatingActionButton />
          </div>
        </BannerProvider>
      )}
    </>
  );
}

export default App;
