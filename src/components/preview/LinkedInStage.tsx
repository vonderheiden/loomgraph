import React from 'react';
import BannerCanvas from './BannerCanvas';

/**
 * LinkedInStage Component
 * 
 * A professional preview container that wraps the BannerCanvas in a LinkedIn-style
 * presentation frame with centered layout and shadow effects.
 * 
 * Features:
 * - Centered flex container with #F3F4F6 background
 * - Inner frame with Bento design (12px border-radius, border, shadow-lg)
 * - Maintains proper canvas dimensions
 * - Professional "stage" aesthetic for social media preview
 * - ARIA live region for screen reader announcements
 * 
 * Requirements: 4.1, 4.2, 4.3, 4.4, 9.5
 */
const LinkedInStage: React.FC = () => {
  return (
    <div 
      className="flex-1 flex items-center justify-center p-8 bg-[#F3F4F6]"
      data-testid="linkedin-stage"
      role="region"
      aria-label="Banner preview area"
    >
      {/* Inner frame with Bento styling */}
      <div 
        className="rounded-bento border border-bento-border bg-white shadow-lg p-4"
        data-testid="linkedin-stage-frame"
        aria-live="polite"
        aria-atomic="true"
      >
        <BannerCanvas />
      </div>
    </div>
  );
};

export default LinkedInStage;
