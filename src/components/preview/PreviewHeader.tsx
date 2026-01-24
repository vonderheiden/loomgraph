import React from 'react';
import ExportButton from './ExportButton';

/**
 * PreviewHeader Component
 * 
 * Header bar for the preview panel with title, subtitle, and export button.
 * 
 * Features:
 * - Title "Preview" with subtitle "Real-time banner preview"
 * - ExportButton positioned at top-right using flex justify-between
 * - Border-bottom and padding for visual separation
 * - White background with Bento border styling
 * 
 * Requirements: 4.5, 10.1
 */
const PreviewHeader: React.FC = () => {
  return (
    <div 
      className="flex items-center justify-between p-6 bg-white border-b border-bento-border"
      data-testid="preview-header"
    >
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
        <p className="text-sm text-gray-600">Real-time banner preview</p>
      </div>
      <ExportButton variant="compact" />
    </div>
  );
};

export default PreviewHeader;
