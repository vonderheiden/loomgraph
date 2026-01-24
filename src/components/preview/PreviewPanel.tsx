import React from 'react';
import BannerCanvas from './BannerCanvas';
import ExportButton from './ExportButton';

const PreviewPanel: React.FC = () => {
  return (
    <div className="w-full lg:w-3/5 bg-gray-50 flex flex-col">
      {/* Sticky header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
        <h2 className="text-xl font-bold text-gray-900">Live Preview</h2>
        <p className="text-sm text-gray-600">Updates in real-time as you type</p>
      </div>

      {/* Sticky content - preview stays in view */}
      <div className="sticky top-[73px] flex-1 overflow-y-auto p-6" style={{ height: 'calc(100vh - 73px)' }}>
        <div className="max-w-5xl mx-auto space-y-4">
          {/* Preview Container - Centered and responsive */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-center min-h-[400px]">
              <BannerCanvas />
            </div>
          </div>

          {/* Export Button */}
          <ExportButton />
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
