import React, { useEffect, useState } from 'react';
import { useBannerState } from '../../context/BannerContext';
import ProfessionalTemplate from '../templates/ProfessionalTemplate';
import DuoTemplate from '../templates/DuoTemplate';
import PanelTemplate from '../templates/PanelTemplate';

const BannerCanvas: React.FC = () => {
  const { state } = useBannerState();
  const [isRendering, setIsRendering] = useState(false);

  // Debounce rendering for text inputs
  useEffect(() => {
    setIsRendering(true);
    const timer = setTimeout(() => {
      setIsRendering(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [state.title, state.speakers]);

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
    <div className="relative">
      {isRendering && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
          <div className="text-sm text-gray-600">Updating...</div>
        </div>
      )}
      
      {/* Render template at actual size, then scale down for preview */}
      <div className="transform-gpu" style={{ transformOrigin: 'top left' }}>
        {renderTemplate()}
      </div>
    </div>
  );
};

export default BannerCanvas;
