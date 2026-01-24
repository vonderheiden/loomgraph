import React from 'react';
import PreviewHeader from './PreviewHeader';
import LinkedInStage from './LinkedInStage';

/**
 * PreviewPanel Component
 * 
 * Right-side panel displaying the real-time banner preview with LinkedIn Stage aesthetic.
 * 
 * Features:
 * - Fully sticky panel (no scrolling) with h-screen
 * - Hidden on mobile with hidden lg:flex
 * - #F3F4F6 background for stage area
 * - PreviewHeader with export button at top-right
 * - LinkedInStage with centered canvas container
 * 
 * Requirements: 1.5, 4.3, 10.1
 */
const PreviewPanel: React.FC = () => {
  return (
    <div 
      className="w-full lg:w-[65%] hidden lg:flex lg:flex-col lg:sticky lg:top-0 lg:h-screen bg-[#F3F4F6]" 
      data-testid="preview-panel"
    >
      <PreviewHeader />
      <LinkedInStage />
    </div>
  );
};

export default PreviewPanel;
