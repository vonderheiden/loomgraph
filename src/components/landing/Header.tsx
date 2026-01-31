import { NavigationProps } from '../../types/landing.types';
import { CTAButton } from './CTAButton';
import { GeometricShape } from './GeometricShape';
import { UserMenu } from '../auth/UserMenu';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { AuthModal } from '../auth/AuthModal';

/**
 * Header Component
 * 
 * Fixed navigation header with logo, navigation links, and CTA button.
 * Features smooth scrolling to anchor sections with header offset calculation.
 * 
 * Layout:
 * - Left: LoomGraph logo with geometric icon
 * - Center: Navigation links (hidden on mobile, visible on md: breakpoint)
 * - Right: "Launch Generator" CTA button
 * 
 * Navigation Links:
 * - "How it Works" → scrolls to #how-it-works section
 * 
 * Styling:
 * - Fixed positioning at top of viewport
 * - Backdrop blur effect for modern glass-morphism look
 * - White background with 95% opacity
 * - 1px bottom border for subtle separation
 * - z-50 to stay above all other content
 * 
 * Accessibility:
 * - Semantic <header> and <nav> elements
 * - Keyboard accessible navigation buttons
 * - ARIA labels for screen readers
 * 
 * @param onNavigate - Callback function to navigate to generator view
 */
export function Header({ onNavigate }: NavigationProps) {
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  /**
   * Smooth scroll to a section with header offset calculation
   * 
   * This function handles smooth scrolling to anchor sections while accounting
   * for the fixed header height. Without the offset, content would be hidden
   * behind the header after scrolling.
   * 
   * Includes fallback for browsers that don't support smooth scrolling.
   * 
   * @param sectionId - The ID of the target section element
   */
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Fixed header height in pixels
      const headerOffset = 80;
      
      // Get the element's position relative to the viewport
      const elementPosition = element.getBoundingClientRect().top;
      
      // Calculate the absolute scroll position accounting for current scroll and header offset
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      // Try smooth scroll with fallback for unsupported browsers
      try {
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } catch (error) {
        // Fallback to instant scroll for browsers that don't support smooth behavior
        window.scrollTo(0, offsetPosition);
      }
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center gap-2">
              <GeometricShape variant="logo" />
              <span className="text-xl font-bold text-gray-900">LoomGraph</span>
            </div>
            
            {/* Navigation Links - Hidden on mobile, visible on md: breakpoint */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              <button 
                onClick={() => scrollToSection('how-it-works')} 
                className="text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-3 py-2 min-h-[44px]"
                aria-label="Navigate to How it Works section"
                type="button"
              >
                How it Works
              </button>
              <button 
                onClick={() => scrollToSection('faq')} 
                className="text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-3 py-2 min-h-[44px]"
                aria-label="Navigate to FAQ section"
                type="button"
              >
                FAQ
              </button>
            </nav>
            
            {/* Auth Buttons or User Menu */}
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <UserMenu />
              ) : (
                <>
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="hidden sm:block text-[#1d1d1f] hover:text-[#0071e3] transition-colors px-4 py-2 rounded-full font-medium text-[15px] tracking-tight"
                  >
                    Sign In
                  </button>
                  <CTAButton 
                    text="Sign Up" 
                    onClick={() => handleAuthClick('signup')}
                    variant="primary"
                    size="medium"
                  />
                </>
              )}
              <CTAButton 
                text="Launch Generator" 
                onClick={onNavigate}
                variant="primary"
                size="medium"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
      />
    </>
  );
}
