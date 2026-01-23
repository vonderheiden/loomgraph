import React from 'react';
import { useBannerState } from '../../context/BannerContext';
import { BACKGROUND_OPTIONS, getBackgroundById } from '../../constants/backgrounds';

const BackgroundSelector: React.FC = () => {
  const { state, updateField } = useBannerState();

  const handleBackgroundChange = (backgroundId: string) => {
    updateField('backgroundId', backgroundId);
  };

  const selectedBackground = getBackgroundById(state.backgroundId);

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700">
        Background
      </label>

      {/* Grid of background options */}
      <div className="grid grid-cols-4 gap-3">
        {BACKGROUND_OPTIONS.map((bg) => {
          const isSelected = state.backgroundId === bg.id;
          
          return (
            <button
              key={bg.id}
              type="button"
              onClick={() => handleBackgroundChange(bg.id)}
              className={`
                relative h-20 rounded-lg border-2 transition-all overflow-hidden
                ${isSelected 
                  ? 'border-action-primary ring-2 ring-action-primary ring-offset-2' 
                  : 'border-gray-200 hover:border-gray-300'
                }
              `}
              title={bg.name}
            >
              {/* Background preview */}
              {bg.type === 'color' ? (
                <div
                  className="w-full h-full"
                  style={{ backgroundColor: bg.value }}
                />
              ) : (
                <img
                  src={bg.thumbnail || bg.value}
                  alt={bg.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image doesn't exist yet
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.style.backgroundColor = '#1a1a1a';
                      const text = document.createElement('div');
                      text.className = 'flex items-center justify-center h-full text-xs text-white';
                      text.textContent = bg.name;
                      parent.appendChild(text);
                    }
                  }}
                />
              )}

              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute inset-0 bg-action-primary bg-opacity-20 flex items-center justify-center">
                  <div className="w-6 h-6 bg-action-primary rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected background name */}
      <p className="text-xs text-gray-500">
        Selected: <span className="font-medium">{selectedBackground?.name || 'None'}</span>
      </p>

      {/* Info text */}
      <p className="text-xs text-gray-400 italic">
        Choose a solid color or preset image for your banner background
      </p>
    </div>
  );
};

export default BackgroundSelector;
