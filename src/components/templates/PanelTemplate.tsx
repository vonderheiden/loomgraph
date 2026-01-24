import React from 'react';
import { Speaker, BannerDimension } from '../../types/banner.types';
import { formatDate, formatTime } from '../../utils/exportHelpers';
import { getBackgroundById } from '../../constants/backgrounds';

interface PanelTemplateProps {
  title: string;
  speakers: Speaker[];
  date: string;
  time: string;
  timezone: 'PT' | 'ET' | 'GMT' | 'UTC' | 'CET';
  showTimezone: boolean;
  accentColor: string;
  backgroundId: string;
  customBackgroundUrl?: string | null;
  dimension: BannerDimension;
}

const PanelTemplate: React.FC<PanelTemplateProps> = ({
  title,
  speakers,
  date,
  time,
  timezone,
  showTimezone,
  accentColor,
  backgroundId,
  customBackgroundUrl,
  dimension,
}) => {
  const speaker1 = speakers[0] || { name: '', title: '', headshotUrl: null, companyLogoUrl: null };
  const speaker2 = speakers[1] || { name: '', title: '', headshotUrl: null, companyLogoUrl: null };
  const speaker3 = speakers[2] || { name: '', title: '', headshotUrl: null, companyLogoUrl: null };

  const background = getBackgroundById(backgroundId);
  const isColorBackground = background?.type === 'color';
  const backgroundValue = customBackgroundUrl || background?.value || '#1a1a1a';

  // Calculate scale factor based on dimension
  const scaleFactor = dimension.label === 'portrait' ? 1.4 : dimension.label === 'square' ? 1.2 : 1;
  
  // Calculate responsive heights (80% top, 20% bottom)
  const topHeight = dimension.height * 0.8;
  const bottomHeight = dimension.height * 0.2;

  const renderSpeaker = (speaker: Speaker, index: number) => (
    <div key={index} className="flex items-center" style={{ gap: `${12 * scaleFactor}px` }}>
      {/* Headshot */}
      {speaker.headshotUrl ? (
        <div
          className="rounded-full overflow-hidden bg-white shadow-lg flex-shrink-0"
          style={{
            width: `${70 * scaleFactor}px`,
            height: `${70 * scaleFactor}px`,
            border: `${3 * scaleFactor}px solid white`,
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
            width: `${70 * scaleFactor}px`,
            height: `${70 * scaleFactor}px`,
            border: `${3 * scaleFactor}px solid white`,
            fontSize: `${28 * scaleFactor}px`,
          }}
        >
          {speaker.name ? speaker.name.charAt(0).toUpperCase() : '?'}
        </div>
      )}

      {/* Name & Title */}
      <div>
        <p className="font-bold text-white leading-tight" style={{ fontSize: `${18 * scaleFactor}px`, marginBottom: `${4 * scaleFactor}px` }}>
          {speaker.name || `Speaker ${index + 1}`}
        </p>
        <p className="text-white leading-tight" style={{ fontSize: `${12 * scaleFactor}px` }}>
          {speaker.title || 'Title & Company'}
        </p>
      </div>
    </div>
  );

  return (
    <div
      id="banner-template"
      className="relative overflow-hidden"
      style={{ 
        fontFamily: 'Inter, sans-serif',
        width: `${dimension.width}px`,
        height: `${dimension.height}px`,
      }}
    >
      {/* Top Section - Background with Dark Overlay (80%) */}
      <div className="absolute inset-0" style={{ height: `${topHeight}px` }}>
        {/* Background - Color or Image */}
        {isColorBackground ? (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: backgroundValue }}
          />
        ) : (
          <img
            src={backgroundValue}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
            crossOrigin="anonymous"
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
        <div className="relative h-full flex flex-col justify-between" style={{ padding: `${48 * scaleFactor}px ${64 * scaleFactor}px` }}>
          {/* Top - Webinar Tag, Title, Date/Time & Register */}
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
              className="font-bold leading-tight text-white mb-6"
              style={{
                fontSize: title.length > 80 ? '32px' : title.length > 50 ? '40px' : '48px',
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
                maxWidth: '900px',
              }}
            >
              {title || 'Your Webinar Title Here'}
            </h1>

            {/* Date/Time & Register Button */}
            <div className="flex items-center gap-8">
              {/* Date & Time */}
              {(date || time) && (
                <div className="flex items-center gap-4">
                  {date && (
                    <div
                      className="font-bold text-xl"
                      style={{ color: accentColor }}
                    >
                      {formatDate(date)}
                    </div>
                  )}
                  {date && time && (
                    <div className="text-white text-xl">|</div>
                  )}
                  {time && (
                    <div
                      className="font-bold text-xl"
                      style={{ color: accentColor }}
                    >
                      {formatTime(time, showTimezone ? timezone : undefined)}
                    </div>
                  )}
                </div>
              )}

              {/* Register Button */}
              <div
                className="px-8 py-3 rounded-lg font-bold text-lg"
                style={{
                  backgroundColor: accentColor,
                  color: '#000000',
                }}
              >
                Register
              </div>
            </div>
          </div>

          {/* Bottom - Speakers */}
          <div className="flex items-center gap-6">
            {renderSpeaker(speaker1, 0)}
            {renderSpeaker(speaker2, 1)}
            {renderSpeaker(speaker3, 2)}
          </div>
        </div>
      </div>

      {/* Bottom Section - Accent Color Footer (20%) */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-end"
        style={{
          backgroundColor: accentColor,
          height: `${bottomHeight}px`,
          padding: `0 ${64 * scaleFactor}px`,
        }}
      >
        {/* Company Logos */}
        <div className="flex items-center gap-10">
          {speaker1.companyLogoUrl && (
            <img
              src={speaker1.companyLogoUrl}
              alt="Company logo"
              className="h-12 object-contain"
              style={{ maxWidth: '160px' }}
              crossOrigin="anonymous"
            />
          )}
          {speaker2.companyLogoUrl && (
            <img
              src={speaker2.companyLogoUrl}
              alt="Company logo"
              className="h-12 object-contain"
              style={{ maxWidth: '160px' }}
              crossOrigin="anonymous"
            />
          )}
          {speaker3.companyLogoUrl && (
            <img
              src={speaker3.companyLogoUrl}
              alt="Company logo"
              className="h-12 object-contain"
              style={{ maxWidth: '160px' }}
              crossOrigin="anonymous"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PanelTemplate;
