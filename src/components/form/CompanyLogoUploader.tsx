import React, { useRef } from 'react';
import { Upload, X, Building2 } from 'lucide-react';
import { validateImageFile } from '../../utils/fileValidation';

interface CompanyLogoUploaderProps {
  logoUrl: string | null;
  onLogoChange: (file: File | null, url: string | null) => void;
  speakerIndex: number;
}

const CompanyLogoUploader: React.FC<CompanyLogoUploaderProps> = ({
  logoUrl,
  onLogoChange,
  speakerIndex,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = validateImageFile(file, 2 * 1024 * 1024); // 2MB max for logos
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    // Create preview URL
    const url = URL.createObjectURL(file);
    onLogoChange(file, url);
  };

  const handleFile = (file: File) => {
    // Validate file
    const validation = validateImageFile(file, 2 * 1024 * 1024); // 2MB max for logos
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    // Create preview URL
    const url = URL.createObjectURL(file);
    onLogoChange(file, url);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = () => {
    if (logoUrl) {
      URL.revokeObjectURL(logoUrl);
    }
    onLogoChange(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4" />
          Company Logo (Optional)
        </div>
      </label>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        onChange={handleFileSelect}
        className="hidden"
        aria-label={`Upload company logo for speaker ${speakerIndex + 1}`}
      />

      {!logoUrl ? (
        <button
          type="button"
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`w-full min-h-[96px] p-4 border-2 border-dashed rounded-bento transition-colors flex flex-col items-center justify-center gap-2 text-gray-600 ${
            isDragging
              ? 'border-action-primary bg-blue-50'
              : 'border-bento-border hover:border-action-primary hover:bg-gray-50'
          }`}
        >
          <Upload className="w-6 h-6" />
          <span className="text-sm font-medium">
            {isDragging ? 'Drop logo here' : 'Upload Company Logo'}
          </span>
          <span className="text-xs text-gray-500">
            {isDragging ? 'Release to upload' : 'Click or drag & drop'}
          </span>
          <span className="text-xs text-gray-500">PNG or JPG, max 2MB</span>
        </button>
      ) : (
        <div className="relative inline-block">
          <div className="w-32 h-24 border border-bento-border rounded-bento overflow-hidden bg-white flex items-center justify-center p-2">
            <img
              src={logoUrl}
              alt="Company logo preview"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-md min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Remove company logo"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <p className="text-xs text-gray-500 mt-2">
        Upload the logo of the company this speaker represents
      </p>
    </div>
  );
};

export default CompanyLogoUploader;
