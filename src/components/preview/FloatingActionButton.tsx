import React, { useState } from 'react';
import { Download, Check, AlertCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useBannerState } from '../../context/BannerContext';
import { generateFileName, downloadBlob } from '../../utils/exportHelpers';

/**
 * FloatingActionButton Component
 * 
 * Mobile-only floating action button for exporting banners.
 * 
 * Features:
 * - Fixed positioning at bottom-right (bottom-6 right-6)
 * - 56×56px dimensions (w-14 h-14) for comfortable touch target
 * - Circular shape with rounded-full
 * - High z-index (z-30) for visibility above other content
 * - Only visible on mobile (<768px) with lg:hidden
 * - Connected to export functionality with visual feedback
 * 
 * Requirements: 7.3, 8.5, 10.2
 */
const FloatingActionButton: React.FC = () => {
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

      // Get the parent container that has the transform scale
      const scaledContainer = element.closest('[style*="transform"]') as HTMLElement;
      const originalTransform = scaledContainer?.style.transform || '';
      
      // Temporarily remove the scale transform to capture at full size
      if (scaledContainer) {
        scaledContainer.style.transform = 'scale(1)';
      }

      // Ensure element is visible and in viewport
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Wait for fonts to load with timeout - critical for text rendering
      console.log('Waiting for fonts to load...');
      try {
        await Promise.race([
          document.fonts.ready,
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Font load timeout')), 5000)
          )
        ]);
        console.log('Fonts loaded successfully');
      } catch (fontError) {
        console.warn('Font loading timed out, continuing with fallback fonts:', fontError);
        // Continue with export using fallback fonts
      }
      
      // Wait for images to load - check all img elements
      const images = element.querySelectorAll('img');
      await Promise.all(
        Array.from(images).map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise<void>((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => {
              console.warn('Image failed to load:', img.src);
              resolve(); // Continue even if image fails
            };
            // Timeout after 10 seconds
            setTimeout(() => resolve(), 10000);
          });
        })
      );

      // Additional wait for complete rendering
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Get dimension from state for dynamic sizing
      const { width, height } = state.dimension;

      // Use html2canvas for reliable conversion at exact dimensions
      const canvas = await html2canvas(element, {
        scale: 2, // 2x resolution for high quality
        width: width,
        height: height,
        useCORS: true, // Enable CORS for external images
        allowTaint: false,
        backgroundColor: null,
        logging: false,
        imageTimeout: 15000, // 15 second timeout for images
        onclone: (clonedDoc) => {
          // Ensure fonts are applied in the cloned document
          const clonedElement = clonedDoc.getElementById('banner-template');
          if (clonedElement) {
            clonedElement.style.fontFamily = 'Inter, sans-serif';
          }
        },
      });

      // Restore the original transform
      if (scaledContainer) {
        scaledContainer.style.transform = originalTransform;
      }

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob from canvas'));
          }
        }, 'image/png', 1.0);
      });

      // Verify blob is valid
      if (blob.size === 0) {
        throw new Error('Generated image has no data');
      }

      // Generate filename and download
      const filename = generateFileName(state.title, state.dimension);
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
      if (errorMessage.includes('tainted') || errorMessage.includes('CORS')) {
        userMessage += 'Image CORS error. Try refreshing the page and uploading your images again.';
      } else if (errorMessage.includes('empty') || errorMessage.includes('no data')) {
        userMessage += 'Generated image is empty. Please ensure all content is visible.';
      } else if (errorMessage.includes('timeout')) {
        userMessage += 'Image loading timed out. Please try again.';
      } else {
        userMessage += `Error: ${errorMessage}\n\nTry:\n1. Refresh the page\n2. Re-upload your images\n3. Wait a few seconds and try again`;
      }
      
      alert(userMessage);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className={`
        lg:hidden fixed bottom-6 right-6 z-30
        w-14 h-14 rounded-full
        flex items-center justify-center
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-action-primary
        ${
          exportSuccess
            ? 'bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl'
            : error
            ? 'bg-red-500 hover:bg-red-600 shadow-lg hover:shadow-xl'
            : 'bg-action-primary text-white shadow-lg hover:shadow-xl hover:bg-blue-600'
        }
        ${isExporting ? 'opacity-75 cursor-not-allowed' : ''}
      `}
      aria-label="Export banner"
      data-testid="floating-action-button"
    >
      {isExporting ? (
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : exportSuccess ? (
        <Check className="w-6 h-6 text-white" />
      ) : error ? (
        <AlertCircle className="w-6 h-6 text-white" />
      ) : (
        <Download className="w-6 h-6 text-white" />
      )}
    </button>
  );
};

export default FloatingActionButton;
