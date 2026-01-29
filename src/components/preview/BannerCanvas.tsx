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

      // Get the LinkedInStage container (grandparent - the gray background area)
      const frame = containerRef.current.parentElement; // Inner white frame
      if (!frame) return;
      const stage = frame.parentElement; // LinkedInStage (gray area)
      if (!stage) return;

      // Account for padding:
      // - LinkedInStage has p-8 (32px on each side) = 64px total
      // - Inner frame has p-4 (16px on each side) = 32px total
      // Total padding to account for: 96px
      const totalPadding = 96;
      const availableWidth = stage.clientWidth - totalPadding;
      const availableHeight = stage.clientHeight - totalPadding;

      // Calculate scale factors for both dimensions
      const scaleX = availableWidth / state.dimension.width;
      const scaleY = availableHeight / state.dimension.height;

      // Use the smaller scale factor to ensure the banner fits in both dimensions
      // Apply 0.85 multiplier to leave 15% margin for comfortable viewing
      const newScale = Math.min(scaleX, scaleY) * 0.85;

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
    <div 
      ref={containerRef} 
      className="relative"
      style={{
        width: `${state.dimension.width * scaleFactor}px`,
        height: `${state.dimension.height * scaleFactor}px`,
      }}
    >
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
