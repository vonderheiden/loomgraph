import React, { useEffect, useState } from 'react';
import { useBannerState } from '../../context/BannerContext';
import MinimalistTemplate from '../templates/MinimalistTemplate';

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
  }, [state.title, state.speakerName, state.speakerRole]);

  return (
    <div className="relative">
      {isRendering && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
          <div className="text-sm text-gray-600">Updating...</div>
        </div>
      )}
      
      {/* Render template at actual size, then scale down for preview */}
      <div className="transform-gpu" style={{ transformOrigin: 'top left' }}>
        <MinimalistTemplate state={state} />
      </div>
    </div>
  );
};

export default BannerCanvas;
