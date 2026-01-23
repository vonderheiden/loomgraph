import React from 'react';
import { useBannerState } from '../../context/BannerContext';
import { FileText } from 'lucide-react';

const WebinarDetailsForm: React.FC = () => {
  const { state, updateField } = useBannerState();

  const titleMaxLength = 100;

  return (
    <div className="bg-bento-card border border-bento-border rounded-bento shadow-soft p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-gray-700" />
        <h2 className="text-lg font-semibold">Webinar Details</h2>
      </div>

      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Webinar Title *
        </label>
        <input
          type="text"
          id="title"
          value={state.title}
          onChange={(e) => updateField('title', e.target.value)}
          maxLength={titleMaxLength}
          placeholder="e.g., How to Scale Your SaaS to $1M ARR"
          className="w-full px-3 py-2 border border-bento-border rounded-lg focus:border-action-primary focus:ring-2 focus:ring-action-primary/20 outline-none transition-colors"
        />
        <div className="flex justify-between mt-1">
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
  );
};

export default WebinarDetailsForm;
