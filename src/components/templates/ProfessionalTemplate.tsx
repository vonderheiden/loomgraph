import React from 'react';
import { Speaker, BannerDimension } from '../../types/banner.types';
import { formatDate, formatTime } from '../../utils/exportHelpers';
import { getBackgroundById } from '../../constants/backgrounds';

interface ProfessionalTemplateProps {
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

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({
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
  const speaker = speakers[0] || { name: '', title: '', headshotUrl: null, companyLogoUrl: null };

  // Get background configuration
  const background = getBackgroundById(backgroundId);
  const isColorBackground = background?.type === 'color';
  const backgroundValue = customBackgroundUrl || background?.value || '#1a1a1a';

  // Calculate scale factor based on dimension
  const scaleFactor = dimension.label === 'portrait' ? 1.4 : dimension.label === 'square' ? 1.2 : 1;
  
  // Calculate responsive heights (80% top, 20% bottom)
  const topHeight = dimension.height * 0.8;
  const bottomHeight = dimension.height * 0.2;

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

        {/* Dark overlay for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.6) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between" style={{ padding: `${48 * scaleFactor}px ${64 * scaleFactor}px` }}>
          {/* Top Section - Webinar Tag, Title, Date/Time & Register */}
          <div>
            {/* Webinar Tag */}
            <div
              className="inline-block rounded-md font-bold tracking-wide"
              style={{
                backgroundColor: accentColor,
                color: '#000000',
                padding: `${8 * scaleFactor}px ${16 * scaleFactor}px`,
                fontSize: `${16 * scaleFactor}px`,
                marginBottom: `${32 * scaleFactor}px`,
              }}
            >
              Webinar
            </div>

            {/* Title */}
            <h1
              className="font-bold leading-tight text-white"
              style={{
                fontSize: title.length > 80 ? `${36 * scaleFactor}px` : title.length > 50 ? `${44 * scaleFactor}px` : `${52 * scaleFactor}px`,
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
                maxWidth: `${900 * scaleFactor}px`,
                marginBottom: `${24 * scaleFactor}px`,
              }}
            >
              {title || 'Your Webinar Title Here'}
            </h1>

            {/* Date/Time & Register Button */}
            <div className="flex items-center" style={{ gap: `${32 * scaleFactor}px` }}>
              {/* Date & Time */}
              {(date || time) && (
                <div className="flex items-center" style={{ gap: `${16 * scaleFactor}px` }}>
                  {date && (
                    <div
                      className="font-bold"
                      style={{ 
                        color: accentColor,
                        fontSize: `${20 * scaleFactor}px`,
                      }}
                    >
                      {formatDate(date)}
                    </div>
                  )}
                  {date && time && (
                    <div className="text-white" style={{ fontSize: `${20 * scaleFactor}px` }}>|</div>
                  )}
                  {time && (
                    <div
                      className="font-bold"
                      style={{ 
                        color: accentColor,
                        fontSize: `${20 * scaleFactor}px`,
                      }}
                    >
                      {formatTime(time, showTimezone ? timezone : undefined)}
                    </div>
                  )}
                </div>
              )}

              {/* Register Button */}
              <div
                className="rounded-lg font-bold"
                style={{
                  backgroundColor: accentColor,
                  color: '#000000',
                  padding: `${12 * scaleFactor}px ${32 * scaleFactor}px`,
                  fontSize: `${18 * scaleFactor}px`,
                }}
              >
                Register
              </div>
            </div>
          </div>

          {/* Bottom Section - Speaker */}
          <div className="flex items-center" style={{ gap: `${16 * scaleFactor}px` }}>
            {/* Headshot */}
            {speaker.headshotUrl ? (
              <div
                className="rounded-full overflow-hidden bg-white shadow-lg flex-shrink-0"
                style={{
                  width: `${80 * scaleFactor}px`,
                  height: `${80 * scaleFactor}px`,
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
                  width: `${80 * scaleFactor}px`,
                  height: `${80 * scaleFactor}px`,
                  border: `${3 * scaleFactor}px solid white`,
                  fontSize: `${32 * scaleFactor}px`,
                }}
              >
                {speaker.name ? speaker.name.charAt(0).toUpperCase() : '?'}
              </div>
            )}

            {/* Name & Title */}
            <div>
              <p className="font-bold text-white leading-tight" style={{ fontSize: `${20 * scaleFactor}px`, marginBottom: `${4 * scaleFactor}px` }}>
                {speaker.name || 'Speaker Name'}
              </p>
              <p className="text-white leading-tight" style={{ fontSize: `${14 * scaleFactor}px` }}>
                {speaker.title || 'Title & Company'}
              </p>
            </div>
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
        {/* Company Logo */}
        {speaker.companyLogoUrl && (
          <img
            src={speaker.companyLogoUrl}
            alt="Company logo"
            className="object-contain"
            style={{ 
              height: `${64 * scaleFactor}px`,
              maxWidth: `${300 * scaleFactor}px`,
            }}
            crossOrigin="anonymous"
          />
        )}
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
