import React, { useState } from 'react';
import { useBannerState } from '../../context/BannerContext';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';

const WebinarDetailsForm: React.FC = () => {
  const { state, updateField } = useBannerState();
  const [isExpanded, setIsExpanded] = useState(false);

  const titleMaxLength = 100;

  return (
    <div className="bg-bento-card border border-bento-border rounded-bento shadow-soft overflow-hidden">
      {/* Collapsible Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-3 lg:p-4 hover:bg-gray-50 transition-colors min-h-[44px]"
        aria-expanded={isExpanded}
        aria-label="Toggle webinar details section"
      >
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-gray-700" aria-hidden="true" />
          <h2 className="text-lg font-semibold">Webinar Details</h2>
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

      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Webinar Title *
        </label>
        <input
          type="text"
          id="title"
          value={state.title}
          onChange={(e) => updateField('title', e.target.value)}
          maxLength={titleMaxLength}
          placeholder="e.g., How to Scale Your SaaS to $1M ARR"
          className="w-full px-3 py-3 lg:py-2 border border-bento-border rounded-bento outline-none transition-colors focus:border-[var(--accent-color)] focus:ring-2 min-h-[44px]"
          style={{
            '--tw-ring-color': 'color-mix(in srgb, var(--accent-color) 20%, transparent)',
          } as React.CSSProperties}
        />
        <div className="flex justify-between mt-2">
          <span className="text-xs text-gray-500">
            {state.title.length > titleMaxLength * 0.8 && (
              <span className="text-amber-600">Title is getting long</span>
            )}
          </span>
          <span className="text-xs text-gray-500">
            {state.title.length}/{titleMaxLength}
          </span>
        </div>
      </div>
        </div>
      )}
    </div>
  );
};

export default WebinarDetailsForm;
