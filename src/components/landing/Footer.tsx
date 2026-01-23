import { CONTENT } from '../../constants/landingContent';

/**
 * Footer Component
 * 
 * The landing page footer with:
 * - "Coming Soon" badge for future features (Takeaway Carousel Generator)
 * - Copyright notice
 * 
 * Styling:
 * - Neutral colors consistent with Bento aesthetic
 * - Centered layout
 * - Subtle visual hierarchy
 * 
 * The "Coming Soon" badge serves as a teaser for future product expansion
 * while the copyright establishes legitimacy and professionalism.
 * 
 * Requirements: 11.1, 11.2, 11.3
 */
export function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Coming Soon Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
            {CONTENT.footer.comingSoon}
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-gray-600 text-sm">
          {CONTENT.footer.copyright}
        </div>
      </div>
    </footer>
  );
}
