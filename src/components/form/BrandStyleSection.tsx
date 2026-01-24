import React, { useState } from 'react';
import { useBannerState } from '../../context/BannerContext';
import { Palette, ChevronDown, ChevronUp } from 'lucide-react';
import { BACKGROUND_OPTIONS, getBackgroundById } from '../../constants/backgrounds';

const BrandStyleSection: React.FC = () => {
  const { state, updateField } = useBannerState();
  const [isExpanded, setIsExpanded] = useState(false);
  const [customBackgroundColor, setCustomBackgroundColor] = useState('#3B82F6');

  const presetColors = [
    { name: 'Electric Blue', value: '#3B82F6' },
    { name: 'Deep Purple', value: '#8B5CF6' },
    { name: 'Emerald Green', value: '#10B981' },
    { name: 'Rose Pink', value: '#F43F5E' },
  ];

  // Filter background options to only show road images
  const roadBackgrounds = BACKGROUND_OPTIONS.filter(bg => bg.type === 'image');

  const handleBackgroundChange = (backgroundId: string) => {
    updateField('backgroundId', backgroundId);
    updateField('customBackgroundUrl', null); // Clear custom background when selecting preset
  };

  const handleCustomColorSelect = (color: string) => {
    setCustomBackgroundColor(color);
    updateField('backgroundId', 'custom-color');
    updateField('customBackgroundUrl', color);
  };

  // Determine if a custom color is selected
  const isCustomColorSelected = state.backgroundId === 'custom-color' && state.customBackgroundUrl;
  const selectedBackground = getBackgroundById(state.backgroundId);

  return (
    <div className="bg-bento-card border border-bento-border rounded-bento shadow-soft overflow-hidden">
      {/* Collapsible Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 lg:p-4 hover:bg-gray-50 transition-colors min-h-[44px]"
        aria-expanded={isExpanded}
        aria-label="Toggle brand and style section"
      >
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-gray-700" aria-hidden="true" />
          <h2 className="text-lg font-semibold">Brand & Style</h2>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" aria-hidden="true" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" aria-hidden="true" />
        )}
      </button>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="px-4 pb-4 lg:px-6 lg:pb-6 space-y-6 border-t border-bento-border">
          {/* Brand Color Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Accent Color</h3>
            
            {/* Color Input */}
            <div className="mb-4">
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  id="accentColor"
                  value={state.accentColor}
                  onChange={(e) => updateField('accentColor', e.target.value)}
                  className="w-16 h-16 rounded-bento border border-bento-border cursor-pointer"
                  aria-label="Select accent color"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={state.accentColor}
                    onChange={(e) => updateField('accentColor', e.target.value)}
                    placeholder="#3B82F6"
                    className="w-full px-3 py-3 lg:py-2 border border-bento-border rounded-bento outline-none transition-colors font-mono text-sm focus:border-[var(--accent-color)] focus:ring-2 min-h-[44px]"
                    style={{
                      '--tw-ring-color': 'color-mix(in srgb, var(--accent-color) 20%, transparent)',
                    } as React.CSSProperties}
                    aria-label="Accent color hex code"
                  />
                </div>
              </div>
            </div>

            {/* Preset Swatches */}
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">
                Preset Colors
              </label>
              <div className="grid grid-cols-4 gap-2" role="group" aria-label="Preset color options">
                {presetColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => updateField('accentColor', color.value)}
                    className={`min-h-[48px] rounded-bento border transition-all ${
                      state.accentColor.toLowerCase() === color.value.toLowerCase()
                        ? 'border-gray-900 scale-105 border-2'
                        : 'border-bento-border hover:border-action-primary'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                    aria-label={`Select ${color.name} color`}
                    aria-pressed={state.accentColor.toLowerCase() === color.value.toLowerCase()}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Background Section */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Background</h3>

            {/* Custom Background Color Picker */}
            <div className="mb-4">
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  id="backgroundColor"
                  value={isCustomColorSelected ? state.customBackgroundUrl as string : customBackgroundColor}
                  onChange={(e) => handleCustomColorSelect(e.target.value)}
                  className="w-16 h-16 rounded-bento border border-bento-border cursor-pointer"
                  aria-label="Select background color"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={isCustomColorSelected ? state.customBackgroundUrl as string : customBackgroundColor}
                    onChange={(e) => handleCustomColorSelect(e.target.value)}
                    placeholder="#3B82F6"
                    className="w-full px-3 py-3 lg:py-2 border border-bento-border rounded-bento outline-none transition-colors font-mono text-sm focus:border-[var(--accent-color)] focus:ring-2 min-h-[44px]"
                    style={{
                      '--tw-ring-color': 'color-mix(in srgb, var(--accent-color) 20%, transparent)',
                    } as React.CSSProperties}
                    aria-label="Background color hex code"
                  />
                </div>
              </div>
            </div>

            {/* Grid of road background options */}
            <div className="grid grid-cols-3 gap-4" role="group" aria-label="Background options">
              {roadBackgrounds.map((bg) => {
                const isSelected = state.backgroundId === bg.id;
                
                return (
                  <button
                    key={bg.id}
                    type="button"
                    onClick={() => handleBackgroundChange(bg.id)}
                    className={`
                      relative min-h-[80px] rounded-bento border transition-all overflow-hidden
                      focus:outline-none focus:ring-2 focus:ring-offset-2
                      ${isSelected 
                        ? 'border-action-primary ring-2 ring-action-primary ring-offset-2 border-2' 
                        : 'border-bento-border hover:border-action-primary'
                      }
                    `}
                    style={{
                      '--tw-ring-color': 'var(--accent-color)',
                    } as React.CSSProperties}
                    title={bg.name}
                    aria-label={`Select ${bg.name} background`}
                    aria-pressed={isSelected}
                  >
                    {/* Background preview */}
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
            <p className="text-xs text-gray-500 mt-3">
              Selected: <span className="font-medium">
                {isCustomColorSelected 
                  ? `Custom Color (${state.customBackgroundUrl})` 
                  : selectedBackground?.name || 'None'}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandStyleSection;
