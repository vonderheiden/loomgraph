import React from 'react';
import { Maximize, Square, Smartphone } from 'lucide-react';
import { useBannerState } from '../../context/BannerContext';
import { BANNER_DIMENSIONS, BannerDimension } from '../../types/banner.types';

interface DimensionOption {
  dimension: BannerDimension;
  icon: React.ComponentType<{ className?: string }>;
}

const DimensionSelector: React.FC = () => {
  const { state, updateDimension } = useBannerState();

  const dimensionOptions: DimensionOption[] = [
    {
      dimension: BANNER_DIMENSIONS.landscape,
      icon: Maximize,
    },
    {
      dimension: BANNER_DIMENSIONS.square,
      icon: Square,
    },
    {
      dimension: BANNER_DIMENSIONS.portrait,
      icon: Smartphone,
    },
  ];

  const handleDimensionChange = (dimension: BannerDimension) => {
    updateDimension(dimension);
  };

  // Arrow key navigation for better keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent, currentIndex: number) => {
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      e.preventDefault();
      const prevOption = dimensionOptions[currentIndex - 1];
      updateDimension(prevOption.dimension);
      // Focus the previous button
      const buttons = document.querySelectorAll('[data-dimension-button]');
      (buttons[currentIndex - 1] as HTMLElement)?.focus();
    } else if (e.key === 'ArrowRight' && currentIndex < dimensionOptions.length - 1) {
      e.preventDefault();
      const nextOption = dimensionOptions[currentIndex + 1];
      updateDimension(nextOption.dimension);
      // Focus the next button
      const buttons = document.querySelectorAll('[data-dimension-button]');
      (buttons[currentIndex + 1] as HTMLElement)?.focus();
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Banner Dimensions
      </label>
      <div className="flex gap-2" role="group" aria-label="Banner dimension options">
        {dimensionOptions.map((option, index) => {
          const isSelected = state.dimension.label === option.dimension.label;
          const Icon = option.icon;
          
          return (
            <button
              key={option.dimension.label}
              type="button"
              onClick={() => handleDimensionChange(option.dimension)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              data-dimension-button
              className={`
                flex-1 flex flex-col items-center justify-center gap-1
                min-h-[60px] min-w-[44px] rounded-bento border transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-2
                lg:flex-row lg:gap-2
                ${
                  isSelected
                    ? 'bg-blue-50 border-action-primary shadow-soft'
                    : 'border-bento-border bg-white hover:border-action-primary hover:bg-blue-50'
                }
              `}
              style={{
                '--tw-ring-color': 'var(--accent-color)',
              } as React.CSSProperties}
              aria-label={`${option.dimension.label} - ${option.dimension.width}×${option.dimension.height}px`}
              aria-pressed={isSelected}
            >
              <Icon className="w-5 h-5 lg:w-4 lg:h-4 text-gray-700" aria-hidden="true" />
              <span className="hidden lg:inline text-sm font-medium text-gray-900 capitalize">
                {option.dimension.label}
              </span>
              <span className="text-xs text-gray-500 lg:hidden">
                {option.dimension.width}×{option.dimension.height}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DimensionSelector;
