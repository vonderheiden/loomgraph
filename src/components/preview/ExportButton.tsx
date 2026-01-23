import React, { useState } from 'react';
import { Download, Check, AlertCircle } from 'lucide-react';
import { toPng } from 'html-to-image';
import { useBannerState } from '../../context/BannerContext';
import { generateFileName, downloadBlob } from '../../utils/exportHelpers';

const ExportButton: React.FC = () => {
  const { state } = useBannerState();
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    setIsExporting(true);
    setExportSuccess(false);
    setError(null);

    try {
      // Get the banner template element
      const element = document.getElementById('banner-template');
      if (!element) {
        throw new Error('Banner template not found');
      }

      // Wait longer for images and fonts to load
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Convert to PNG with more robust settings
      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 2,
        width: 1200,
        height: 627,
        cacheBust: true,
        skipFonts: false,
        includeQueryParams: true,
        // Filter out problematic elements
        filter: (_node) => {
          // Allow all nodes - don't filter anything
          return true;
        },
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        },
      });

      // Convert data URL to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // Verify blob is valid
      if (blob.size === 0) {
        throw new Error('Generated image is empty');
      }

      // Generate filename and download
      const filename = generateFileName(state.title);
      downloadBlob(blob, filename);

      // Show success state
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (err) {
      console.error('Export failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      
      // More helpful error message
      let userMessage = 'Failed to export banner.\n\n';
      if (errorMessage.includes('tainted')) {
        userMessage += 'Image CORS error. Try using different images or wait for them to fully load.';
      } else if (errorMessage.includes('empty')) {
        userMessage += 'Generated image is empty. Please ensure all content is visible.';
      } else {
        userMessage += `Error: ${errorMessage}\n\nTry:\n1. Wait a few seconds for images to load\n2. Scroll to make sure the preview is visible\n3. Try again`;
      }
      
      alert(userMessage);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleExport}
        disabled={isExporting}
        className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
          exportSuccess
            ? 'bg-green-500 hover:bg-green-600'
            : error
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-action-primary hover:bg-blue-600'
        } ${isExporting ? 'opacity-75 cursor-not-allowed' : ''}`}
      >
        {isExporting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Generating...</span>
          </>
        ) : exportSuccess ? (
          <>
            <Check className="w-5 h-5" />
            <span>Downloaded!</span>
          </>
        ) : error ? (
          <>
            <AlertCircle className="w-5 h-5" />
            <span>Try Again</span>
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            <span>Download Banner</span>
          </>
        )}
      </button>
      {error && (
        <p className="text-xs text-red-600 text-center">
          Export failed. Check console for details.
        </p>
      )}
      {isExporting && (
        <p className="text-xs text-gray-600 text-center">
          Please wait while we generate your banner...
        </p>
      )}
    </div>
  );
};

export default ExportButton;
