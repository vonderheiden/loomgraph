import React, { useState } from 'react';
import { Download, Check, AlertCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useBannerState } from '../../context/BannerContext';
import { useAuth } from '../../context/AuthContext';
import { generateFileName, downloadBlob } from '../../utils/exportHelpers';
import { saveBanner } from '../../services/bannerStorage';
import { AuthModal } from '../auth/AuthModal';

interface ExportButtonProps {
  variant?: 'full' | 'compact';
}

const ExportButton: React.FC<ExportButtonProps> = ({ variant = 'full' }) => {
  const { state } = useBannerState();
  const { isAuthenticated } = useAuth();
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingExport, setPendingExport] = useState(false);

  const handleExport = async () => {
    // Check authentication first
    if (!isAuthenticated) {
      setShowAuthModal(true);
      setPendingExport(true);
      return;
    }

    await performExport();
  };

  const performExport = async () => {
    setIsExporting(true);
    setExportSuccess(false);
    setError(null);
    setPendingExport(false);

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

      // Generate filename and download locally
      const filename = generateFileName(state.title, state.dimension);
      downloadBlob(blob, filename);

      // Save to Supabase
      try {
        await saveBanner({
          title: state.title || 'Untitled Banner',
          dimension: state.dimension.label.toLowerCase() as 'landscape' | 'square' | 'portrait',
          imageBlob: blob,
          bannerState: state
        });
        console.log('[Export] Banner saved to Supabase successfully');
      } catch (saveError) {
        console.error('[Export] Failed to save to Supabase:', saveError);
        // Don't fail the export if cloud save fails - local download already succeeded
      }

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

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    if (pendingExport) {
      performExport();
    }
  };

  return (
    <>
      <div className={variant === 'full' ? 'space-y-2' : ''}>
        <button
          onClick={handleExport}
          disabled={isExporting}
          className={`
            ${variant === 'full' ? 'w-full px-6 h-[52px]' : 'px-5 h-[44px] lg:h-[40px]'}
            rounded-full font-medium tracking-tight text-white 
            transition-all duration-200 ease-out
            flex items-center justify-center gap-2.5
            focus:outline-none focus:ring-2 focus:ring-offset-2
            active:scale-[0.98] transform
            shadow-[0_1px_2px_rgba(0,0,0,0.12),0_2px_4px_rgba(0,0,0,0.08)]
            ${
              exportSuccess
                ? 'bg-gradient-to-b from-[#34c759] to-[#30d158] hover:from-[#30d158] hover:to-[#32d74b] focus:ring-green-500/50'
                : error
                ? 'bg-gradient-to-b from-[#ff3b30] to-[#ff453a] hover:from-[#ff453a] hover:to-[#ff4f44] focus:ring-red-500/50'
                : 'bg-gradient-to-b from-[#0071e3] to-[#0077ED] hover:from-[#0077ED] hover:to-[#007AFF] focus:ring-blue-500/50'
            }
            ${isExporting ? 'opacity-60 cursor-not-allowed active:scale-100' : 'hover:shadow-[0_2px_4px_rgba(0,0,0,0.15),0_4px_8px_rgba(0,0,0,0.1)]'}
          `}
        >
        {isExporting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            {variant === 'full' && <span>Generating...</span>}
          </>
        ) : exportSuccess ? (
          <>
            <Check className="w-5 h-5" />
            {variant === 'full' && <span>Downloaded!</span>}
          </>
        ) : error ? (
          <>
            <AlertCircle className="w-5 h-5" />
            {variant === 'full' && <span>Try Again</span>}
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            {variant === 'full' ? <span>Download Banner</span> : <span>Export</span>}
          </>
        )}
        </button>
        {variant === 'full' && error && (
          <p className="text-xs text-red-600 text-center">
            Export failed. Check console for details.
          </p>
        )}
        {variant === 'full' && isExporting && (
          <p className="text-xs text-gray-600 text-center">
            Please wait while we generate your banner...
          </p>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => {
          setShowAuthModal(false);
          setPendingExport(false);
        }}
        onSuccess={handleAuthSuccess}
        mode="signup"
      />
    </>
  );
};

export default ExportButton;
