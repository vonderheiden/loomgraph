import React, { useEffect, useState, useRef } from 'react';
import { useBannerState } from '../../context/BannerContext';
import ProfessionalTemplate from '../templates/ProfessionalTemplate';
import DuoTemplate from '../templates/DuoTemplate';
import PanelTemplate from '../templates/PanelTemplate';

const BannerCanvas: React.FC = () => {
  const { state } = useBannerState();
  const [isRendering, setIsRendering] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Debounce rendering for text inputs
  useEffect(() => {
    setIsRendering(true);
    const timer = setTimeout(() => {
      setIsRendering(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [state.title, state.speakers]);

  // Calculate responsive scale factor based on available container space
  useEffect(() => {
    const calculateScale = () => {
      if (!containerRef.current) return;

      // Get the parent container dimensions (LinkedInStage)
      const parent = containerRef.current.parentElement;
      if (!parent) return;

      // Account for padding in LinkedInStage (p-4 = 16px on each side)
      const padding = 32; // 16px * 2
      const availableWidth = parent.clientWidth - padding;
      const availableHeight = parent.clientHeight - padding;

      // Calculate scale factors for both dimensions
      const scaleX = availableWidth / state.dimension.width;
      const scaleY = availableHeight / state.dimension.height;

      // Use the smaller scale factor to ensure the banner fits in both dimensions
      // Apply 0.9 multiplier to leave 10% margin for comfortable viewing
      const newScale = Math.min(scaleX, scaleY) * 0.9;

      setScaleFactor(newScale);
    };

    // Calculate on mount and dimension change
    calculateScale();

    // Recalculate on window resize
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [state.dimension]);

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
      dimension: state.dimension, // Pass dimension to templates
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

  return (
    <div ref={containerRef} className="relative">
      {isRendering && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
          <div className="text-sm text-gray-600">Updating...</div>
        </div>
      )}
      
      {/* Render template at actual size, then scale to fit container */}
      <div 
        className="transform-gpu" 
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
  );
};

export default BannerCanvas;
