import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useBannerState } from '../../context/BannerContext';
import ProfessionalTemplate from '../templates/ProfessionalTemplate';
import DuoTemplate from '../templates/DuoTemplate';
import PanelTemplate from '../templates/PanelTemplate';

/**
 * MobilePreview Component
 * 
 * Collapsible preview component for mobile viewports (<768px).
 * 
 * Features:
 * - Accordion-style expand/collapse functionality
 * - Sticky positioning at top of screen (z-20)
 * - Mini preview placeholder in collapsed state (h-16)
 * - Full scaled preview when expanded (0.3x scale for mobile)
 * - LinkedIn Stage aesthetic with shadow and border
 * 
 * Requirements: 7.2
 */
const MobilePreview: React.FC = () => {
  const { state } = useBannerState();
  const [isExpanded, setIsExpanded] = useState(false);

  // Template factory - select template based on speaker count
  const renderTemplate = () => {
    const templateProps = {
      title: state.title,
      speakers: state.speakers,
      date: state.date,
      time: state.time,
      timezone: state.timezone,
      showTimezone: state.showTimezone,
      accentColor: state.accentColor,
      backgroundId: state.backgroundId,
      customBackgroundUrl: state.customBackgroundUrl,
      dimension: state.dimension,
    };

    switch (state.template) {
      case 'duo':
        return <DuoTemplate {...templateProps} />;
      case 'panel':
        return <PanelTemplate {...templateProps} />;
      case 'professional':
      default:
        return <ProfessionalTemplate {...templateProps} />;
    }
  };

  // Calculate scale factor for mobile preview
  // Target width: ~300px for mobile screens
  const mobilePreviewWidth = 300;
  const scaleFactor = mobilePreviewWidth / state.dimension.width;

  return (
    <div 
      className="lg:hidden sticky top-0 z-20 bg-white border-b border-bento-border"
      data-testid="mobile-preview"
    >
      {/* Accordion Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors min-h-[44px]"
        aria-expanded={isExpanded}
        aria-controls="mobile-preview-content"
        aria-label={isExpanded ? "Collapse preview" : "Expand preview"}
      >
        <span className="font-medium text-gray-900">Preview</span>
        <ChevronDown 
          className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Preview Content */}
      {isExpanded ? (
        <div 
          id="mobile-preview-content"
          className="p-4 bg-[#F3F4F6]"
          role="region"
          aria-label="Banner preview"
        >
          <div className="rounded-bento border border-bento-border bg-white shadow-lg p-2 overflow-x-auto">
            {/* Scaled canvas for mobile */}
            <div 
              className="transform-gpu mx-auto" 
              style={{ 
                transformOrigin: 'top left',
                transform: `scale(${scaleFactor})`,
                width: `${state.dimension.width}px`,
                height: `${state.dimension.height}px`,
              }}
            >
              {renderTemplate()}
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 pb-4">
          <div className="h-16 rounded-bento border border-bento-border bg-[#F3F4F6] flex items-center justify-center">
            <span className="text-xs text-gray-500">Tap to expand preview</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobilePreview;
