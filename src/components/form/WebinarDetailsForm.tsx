import React from 'react';
import { useBannerState } from '../../context/BannerContext';

const WebinarDetailsForm: React.FC = () => {
  const { state, updateField } = useBannerState();

  const titleMaxLength = 100;
  const nameMaxLength = 50;
  const roleMaxLength = 50;

  return (
    <div className="bg-bento-card border border-bento-border rounded-bento shadow-soft p-6">
      <h2 className="text-lg font-semibold mb-4">Webinar Details</h2>

      {/* Title Input */}
      <div className="mb-4">
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

      {/* Speaker Name Input */}
      <div className="mb-4">
        <label htmlFor="speakerName" className="block text-sm font-medium text-gray-700 mb-1">
          Speaker Name *
        </label>
        <input
          type="text"
          id="speakerName"
          value={state.speakerName}
          onChange={(e) => updateField('speakerName', e.target.value)}
          maxLength={nameMaxLength}
          placeholder="e.g., Jane Smith"
          className="w-full px-3 py-2 border border-bento-border rounded-lg focus:border-action-primary focus:ring-2 focus:ring-action-primary/20 outline-none transition-colors"
        />
        <span className="text-xs text-gray-500 mt-1 block text-right">
          {state.speakerName.length}/{nameMaxLength}
        </span>
      </div>

      {/* Speaker Role Input */}
      <div className="mb-0">
        <label htmlFor="speakerRole" className="block text-sm font-medium text-gray-700 mb-1">
          Speaker Title/Company *
        </label>
        <input
          type="text"
          id="speakerRole"
          value={state.speakerRole}
          onChange={(e) => updateField('speakerRole', e.target.value)}
          maxLength={roleMaxLength}
          placeholder="e.g., CEO at TechCorp"
          className="w-full px-3 py-2 border border-bento-border rounded-lg focus:border-action-primary focus:ring-2 focus:ring-action-primary/20 outline-none transition-colors"
        />
        <span className="text-xs text-gray-500 mt-1 block text-right">
          {state.speakerRole.length}/{roleMaxLength}
        </span>
      </div>
    </div>
  );
};

export default WebinarDetailsForm;
