import React from 'react';
import { useBannerState } from '../../context/BannerContext';

const ColorPicker: React.FC = () => {
  const { state, updateField } = useBannerState();

  const presetColors = [
    { name: 'Electric Blue', value: '#3B82F6' },
    { name: 'Deep Purple', value: '#8B5CF6' },
    { name: 'Emerald Green', value: '#10B981' },
    { name: 'Rose Pink', value: '#F43F5E' },
  ];

  return (
    <div className="bg-bento-card border border-bento-border rounded-bento shadow-soft p-6">
      <h2 className="text-lg font-semibold mb-4">Brand Color</h2>

      {/* Color Input */}
      <div className="mb-4">
        <label htmlFor="accentColor" className="block text-sm font-medium text-gray-700 mb-2">
          Accent Color
        </label>
        <div className="flex items-center gap-3">
          <input
            type="color"
            id="accentColor"
            value={state.accentColor}
            onChange={(e) => updateField('accentColor', e.target.value)}
            className="w-16 h-16 rounded-lg border-2 border-bento-border cursor-pointer"
          />
          <div className="flex-1">
            <input
              type="text"
              value={state.accentColor}
              onChange={(e) => updateField('accentColor', e.target.value)}
              placeholder="#3B82F6"
              className="w-full px-3 py-2 border border-bento-border rounded-lg focus:border-action-primary focus:ring-2 focus:ring-action-primary/20 outline-none transition-colors font-mono text-sm"
            />
          </div>
        </div>
      </div>

      {/* Preset Swatches */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preset Colors
        </label>
        <div className="grid grid-cols-4 gap-2">
          {presetColors.map((color) => (
            <button
              key={color.value}
              onClick={() => updateField('accentColor', color.value)}
              className={`h-12 rounded-lg border-2 transition-all ${
                state.accentColor.toLowerCase() === color.value.toLowerCase()
                  ? 'border-gray-900 scale-105'
                  : 'border-bento-border hover:border-gray-400'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
              aria-label={color.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
