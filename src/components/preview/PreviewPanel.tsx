import React from 'react';
import PreviewHeader from './PreviewHeader';
import LinkedInStage from './LinkedInStage';

/**
 * PreviewPanel Component
 * 
 * Right-side panel displaying the real-time banner preview with LinkedIn Stage aesthetic.
 * 
 * Features:
 * - Responsive: Shows on mobile below form, side-by-side on desktop
 * - Sticky on desktop for easy viewing while editing
 * - #F3F4F6 background for stage area
 * - PreviewHeader with export button
 * - LinkedInStage with centered, responsive canvas
 * 
 * Requirements: 1.5, 4.3, 10.1
 */
const PreviewPanel: React.FC = () => {
  return (
    <div 
      className="hidden lg:flex lg:w-[65%] flex-col lg:sticky lg:top-0 lg:h-screen bg-[#F3F4F6]" 
      data-testid="preview-panel"
    >
      <PreviewHeader />
      <LinkedInStage />
    </div>
  );
};

export default PreviewPanel;
