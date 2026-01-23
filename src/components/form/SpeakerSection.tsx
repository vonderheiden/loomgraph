import React, { useRef } from 'react';
import { Upload, X, User, ChevronDown, ChevronUp } from 'lucide-react';
import { Speaker } from '../../types/banner.types';
import { validateImageFile } from '../../utils/fileValidation';
import CompanyLogoUploader from './CompanyLogoUploader';

interface SpeakerSectionProps {
  speaker: Speaker;
  speakerIndex: number;
  onUpdate: (updates: Partial<Speaker>) => void;
  isExpanded: boolean;
  onToggle: () => void;
}

const SpeakerSection: React.FC<SpeakerSectionProps> = ({
  speaker,
  speakerIndex,
  onUpdate,
  isExpanded,
  onToggle,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const nameMaxLength = 50;
  const titleMaxLength = 50;

  const handleHeadshotSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = validateImageFile(file, 5 * 1024 * 1024); // 5MB max
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    // Create preview URL
    const url = URL.createObjectURL(file);
    onUpdate({ headshotFile: file, headshotUrl: url });
  };

  const handleHeadshotRemove = () => {
    if (speaker.headshotUrl) {
      URL.revokeObjectURL(speaker.headshotUrl);
    }
    onUpdate({ headshotFile: null, headshotUrl: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleHeadshotClick = () => {
    fileInputRef.current?.click();
  };

  const handleLogoChange = (file: File | null, url: string | null) => {
    onUpdate({ companyLogoFile: file, companyLogoUrl: url });
  };

  return (
    <div className="bg-bento-card border border-bento-border rounded-bento shadow-soft overflow-hidden">
      {/* Collapsible Header */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-gray-700" />
          <div className="text-left">
            <h3 className="text-lg font-semibold">Speaker {speakerIndex + 1}</h3>
            {!isExpanded && speaker.name && (
              <p className="text-sm text-gray-600">{speaker.name}</p>
            )}
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {/* Collapsible Content */}
      {isExpanded && (
        <div className="px-6 pb-6 space-y-4 border-t border-gray-100">
        {/* Speaker Name */}
        <div>
          <label
            htmlFor={`speaker-name-${speakerIndex}`}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Speaker Name *
          </label>
          <input
            type="text"
            id={`speaker-name-${speakerIndex}`}
            value={speaker.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            maxLength={nameMaxLength}
            placeholder="e.g., Jane Smith"
            className="w-full px-3 py-2 border border-bento-border rounded-lg focus:border-action-primary focus:ring-2 focus:ring-action-primary/20 outline-none transition-colors"
          />
          <span className="text-xs text-gray-500 mt-1 block text-right">
            {speaker.name.length}/{nameMaxLength}
          </span>
        </div>

        {/* Speaker Title */}
        <div>
          <label
            htmlFor={`speaker-title-${speakerIndex}`}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Speaker Title/Company *
          </label>
          <input
            type="text"
            id={`speaker-title-${speakerIndex}`}
            value={speaker.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            maxLength={titleMaxLength}
            placeholder="e.g., CEO at TechCorp"
            className="w-full px-3 py-2 border border-bento-border rounded-lg focus:border-action-primary focus:ring-2 focus:ring-action-primary/20 outline-none transition-colors"
          />
          <span className="text-xs text-gray-500 mt-1 block text-right">
            {speaker.title.length}/{titleMaxLength}
          </span>
        </div>

        {/* Headshot and Company Logo - Side by Side */}
        <div className="grid grid-cols-2 gap-4">
          {/* Headshot Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Speaker Headshot *
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={handleHeadshotSelect}
              className="hidden"
              aria-label={`Upload headshot for speaker ${speakerIndex + 1}`}
            />

            {!speaker.headshotUrl ? (
              <button
                type="button"
                onClick={handleHeadshotClick}
                className="w-full h-32 border-2 border-dashed border-bento-border rounded-lg hover:border-action-primary hover:bg-gray-50 transition-colors flex flex-col items-center justify-center gap-2 text-gray-600"
              >
                <Upload className="w-8 h-8" />
                <span className="text-sm">Upload Headshot</span>
                <span className="text-xs text-gray-500">PNG or JPG, max 5MB</span>
              </button>
            ) : (
              <div className="relative inline-block">
                <div className="w-32 h-32 border border-bento-border rounded-full overflow-hidden bg-gray-100">
                  <img
                    src={speaker.headshotUrl}
                    alt={`${speaker.name || 'Speaker'} headshot`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleHeadshotRemove}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-md"
                  aria-label="Remove headshot"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Company Logo Upload */}
          <div>
            <CompanyLogoUploader
              logoUrl={speaker.companyLogoUrl}
              onLogoChange={handleLogoChange}
              speakerIndex={speakerIndex}
            />
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default SpeakerSection;
