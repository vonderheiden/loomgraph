import React from 'react';
import { useBannerState } from '../../context/BannerContext';
import { BANNER_DIMENSIONS, BannerDimension } from '../../types/banner.types';

const DimensionSelector: React.FC = () => {
  const { state, updateDimension } = useBannerState();

  const dimensions = Object.values(BANNER_DIMENSIONS);

  const handleDimensionChange = (dimension: BannerDimension) => {
    updateDimension(dimension);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Banner Dimensions
      </label>
      <div className="space-y-2">
        {dimensions.map((dimension) => {
          const isSelected = state.dimension.label === dimension.label;
          return (
            <button
              key={dimension.label}
              type="button"
              onClick={() => handleDimensionChange(dimension)}
              className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                isSelected
                  ? 'border-action-primary bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        isSelected
                          ? 'border-action-primary'
                          : 'border-gray-300'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-action-primary" />
                      )}
                    </div>
                    <span className="font-semibold text-gray-900 capitalize">
                      {dimension.label}
                    </span>
                    <span className="text-sm text-gray-500">
                      {dimension.width}×{dimension.height}px
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1 ml-6">
                    {dimension.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DimensionSelector;
