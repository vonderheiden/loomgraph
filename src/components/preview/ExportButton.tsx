import React, { useState } from 'react';
import { Download, Check } from 'lucide-react';
import { toPng } from 'html-to-image';
import { useBannerState } from '../../context/BannerContext';
import { generateFileName, downloadBlob } from '../../utils/exportHelpers';

const ExportButton: React.FC = () => {
  const { state } = useBannerState();
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    setExportSuccess(false);

    try {
      // Get the banner template element
      const element = document.getElementById('banner-template');
      if (!element) {
        throw new Error('Banner template not found');
      }

      // Convert to PNG at 2x resolution for high quality
      const dataUrl = await toPng(element, {
        quality: 1.0,
        pixelRatio: 2, // 2x for retina displays
        width: 1200,
        height: 627,
      });

      // Convert data URL to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // Generate filename and download
      const filename = generateFileName(state.title);
      downloadBlob(blob, filename);

      // Show success state
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export banner. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${
        exportSuccess
          ? 'bg-green-500 hover:bg-green-600'
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
      ) : (
        <>
          <Download className="w-5 h-5" />
          <span>Download Banner</span>
        </>
      )}
    </button>
  );
};

export default ExportButton;
