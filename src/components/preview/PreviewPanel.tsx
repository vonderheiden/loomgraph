import React from 'react';
import BannerCanvas from './BannerCanvas';
import ExportButton from './ExportButton';

const PreviewPanel: React.FC = () => {
  return (
    <div className="w-full lg:w-1/2 p-6 bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Live Preview</h2>
          <p className="text-gray-600">Your banner updates in real-time as you type</p>
        </div>

        {/* Preview Container with scaling */}
        <div className="bg-white rounded-bento shadow-soft-lg p-4 mb-6">
          <div className="relative overflow-hidden rounded-lg">
            {/* Scale down the 1200x627 banner to fit preview */}
            <div className="w-full" style={{ aspectRatio: '1200/627' }}>
              <div
                className="origin-top-left"
                style={{
                  transform: 'scale(0.5)',
                  width: '1200px',
                  height: '627px',
                }}
              >
                <BannerCanvas />
              </div>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <ExportButton />
      </div>
    </div>
  );
};

export default PreviewPanel;
