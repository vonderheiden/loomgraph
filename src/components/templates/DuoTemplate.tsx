import React from 'react';
import { Speaker } from '../../types/banner.types';
import { formatDate, formatTime } from '../../utils/exportHelpers';

interface DuoTemplateProps {
  title: string;
  speakers: Speaker[];
  date: string;
  time: string;
  timezone: 'PT' | 'ET' | 'GMT' | 'UTC' | 'CET';
  showTimezone: boolean;
  accentColor: string;
  backgroundImageUrl?: string | null;
}

const DuoTemplate: React.FC<DuoTemplateProps> = ({
  title,
  speakers,
  date,
  time,
  timezone,
  showTimezone,
  accentColor,
  backgroundImageUrl,
}) => {
  const speaker1 = speakers[0] || { name: '', title: '', headshotUrl: null, companyLogoUrl: null };
  const speaker2 = speakers[1] || { name: '', title: '', headshotUrl: null, companyLogoUrl: null };

  const defaultBackground = 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)';

  const renderSpeaker = (speaker: Speaker, index: number) => (
    <div key={index} className="flex items-center gap-4">
      {/* Headshot */}
      {speaker.headshotUrl ? (
        <div
          className="rounded-full overflow-hidden bg-white shadow-lg flex-shrink-0"
          style={{
            width: '80px',
            height: '80px',
            border: '3px solid white',
          }}
        >
          <img
            src={speaker.headshotUrl}
            alt={speaker.name}
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
          />
        </div>
      ) : (
        <div
          className="rounded-full flex items-center justify-center text-white font-black bg-white/20 flex-shrink-0"
          style={{
            width: '80px',
            height: '80px',
            border: '3px solid white',
            fontSize: '32px',
          }}
        >
          {speaker.name ? speaker.name.charAt(0).toUpperCase() : '?'}
        </div>
      )}

      {/* Name & Title */}
      <div>
        <p className="text-xl font-bold text-white leading-tight mb-1">
          {speaker.name || `Speaker ${index + 1}`}
        </p>
        <p className="text-sm text-white leading-tight">
          {speaker.title || 'Title & Company'}
        </p>
      </div>
    </div>
  );

  return (
    <div
      id="banner-template"
      className="relative w-[1200px] h-[627px] overflow-hidden"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Top Section - Background Image with Dark Overlay (80%) */}
      <div className="absolute inset-0 h-[502px]">
        {/* Background Image or Gradient */}
        {backgroundImageUrl ? (
          <img
            src={backgroundImageUrl}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
            crossOrigin="anonymous"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: defaultBackground }}
          />
        )}

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.6) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between px-16 py-12">
          {/* Top - Webinar Tag & Title */}
          <div>
            {/* Webinar Tag */}
            <div
              className="inline-block px-4 py-2 rounded-md mb-8 font-bold text-base tracking-wide"
              style={{
                backgroundColor: accentColor,
                color: '#000000',
              }}
            >
              Webinar
            </div>

            {/* Title */}
            <h1
              className="font-bold leading-tight text-white mb-8"
              style={{
                fontSize: title.length > 80 ? '36px' : title.length > 50 ? '44px' : '52px',
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
                maxWidth: '900px',
              }}
            >
              {title || 'Your Webinar Title Here'}
            </h1>
          </div>

          {/* Bottom - Date/Time, Register Button, Speakers */}
          <div className="flex items-end justify-between">
            {/* Left Side - Date/Time & Speakers */}
            <div className="flex items-end gap-12">
              {/* Date & Time */}
              <div className="space-y-1">
                {date && (
                  <div
                    className="font-bold text-2xl"
                    style={{ color: accentColor }}
                  >
                    {formatDate(date)}
                  </div>
                )}
                {time && (
                  <div
                    className="font-bold text-2xl"
                    style={{ color: accentColor }}
                  >
                    {formatTime(time, showTimezone ? timezone : undefined)}
                  </div>
                )}
              </div>

              {/* Speakers */}
              <div className="flex items-center gap-8">
                {renderSpeaker(speaker1, 0)}
                {renderSpeaker(speaker2, 1)}
              </div>
            </div>

            {/* Right Side - Register Button */}
            <div
              className="px-10 py-4 rounded-lg font-bold text-xl"
              style={{
                backgroundColor: accentColor,
                color: '#000000',
              }}
            >
              Register
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Accent Color Footer (20%) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[125px] flex items-center justify-end px-16"
        style={{
          backgroundColor: accentColor,
        }}
      >
        {/* Company Logos */}
        <div className="flex items-center gap-12">
          {speaker1.companyLogoUrl && (
            <img
              src={speaker1.companyLogoUrl}
              alt="Company logo"
              className="h-14 object-contain"
              style={{ maxWidth: '200px' }}
              crossOrigin="anonymous"
            />
          )}
          {speaker2.companyLogoUrl && (
            <img
              src={speaker2.companyLogoUrl}
              alt="Company logo"
              className="h-14 object-contain"
              style={{ maxWidth: '200px' }}
              crossOrigin="anonymous"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DuoTemplate;
