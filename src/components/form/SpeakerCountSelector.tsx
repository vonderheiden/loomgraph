import React, { useState } from 'react';
import { useBannerState } from '../../context/BannerContext';
import { Users, ChevronDown, ChevronUp } from 'lucide-react';

const SpeakerCountSelector: React.FC = () => {
  const { state, updateSpeakerCount } = useBannerState();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-bento-card border border-bento-border rounded-bento shadow-soft overflow-hidden">
      {/* Collapsible Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 lg:p-4 hover:bg-gray-50 transition-colors min-h-[44px]"
        aria-expanded={isExpanded}
        aria-label="Toggle number of speakers section"
      >
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-gray-700" aria-hidden="true" />
          <h2 className="text-lg font-semibold">Number of Speakers</h2>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" aria-hidden="true" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" aria-hidden="true" />
        )}
      </button>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="px-4 pb-4 lg:px-6 lg:pb-6 border-t border-bento-border">

      <div className="space-y-2">
        <label htmlFor="speakerCount" className="block text-sm font-medium text-gray-700">
          How many speakers will be featured?
        </label>
        <select
          id="speakerCount"
          value={state.speakerCount}
          onChange={(e) => updateSpeakerCount(Number(e.target.value) as 1 | 2 | 3)}
          className="w-full px-3 py-3 lg:py-2 border border-bento-border rounded-bento outline-none transition-colors bg-white focus:border-[var(--accent-color)] focus:ring-2 min-h-[44px]"
          style={{
            '--tw-ring-color': 'color-mix(in srgb, var(--accent-color) 20%, transparent)',
          } as React.CSSProperties}
        >
          <option value={1}>1 Speaker (Professional)</option>
          <option value={2}>2 Speakers (Duo)</option>
          <option value={3}>3 Speakers (Panel)</option>
        </select>
        <p className="text-xs text-gray-500 mt-2">
          Template will automatically adjust based on speaker count
        </p>
      </div>
        </div>
      )}
    </div>
  );
};

export default SpeakerCountSelector;
