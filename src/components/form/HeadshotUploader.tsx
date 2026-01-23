import React, { useRef } from 'react';
import { Upload, X } from 'lucide-react';
import { useBannerState } from '../../context/BannerContext';

const HeadshotUploader: React.FC = () => {
  const { state, updateField } = useBannerState();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxFileSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png'];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a JPG or PNG image');
      return;
    }

    // Validate file size
    if (file.size > maxFileSize) {
      alert('File size must be less than 5MB');
      return;
    }

    // Convert to data URL for preview
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      updateField('headshotUrl', dataUrl);
      updateField('headshotFile', file);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    updateField('headshotUrl', null);
    updateField('headshotFile', null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-bento-card border border-bento-border rounded-bento shadow-soft p-6">
      <h2 className="text-lg font-semibold mb-4">Speaker Photo</h2>

      {!state.headshotUrl ? (
        <div
          onClick={handleClick}
          className="border-2 border-dashed border-bento-border rounded-lg p-8 text-center cursor-pointer hover:border-action-primary hover:bg-gray-50 transition-colors"
        >
          <Upload className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <p className="text-sm font-medium text-gray-700 mb-1">
            Click to upload headshot
          </p>
          <p className="text-xs text-gray-500">JPG or PNG, max 5MB</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      ) : (
        <div className="relative">
          <div className="flex items-center justify-center mb-3">
            <div className="relative w-32 h-32">
              <img
                src={state.headshotUrl}
                alt="Speaker headshot"
                className="w-full h-full rounded-full object-cover border-4 border-gray-200"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleClick}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-bento-border rounded-lg hover:bg-gray-50 transition-colors"
            >
              Replace
            </button>
            <button
              onClick={handleRemove}
              className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Remove
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

export default HeadshotUploader;
