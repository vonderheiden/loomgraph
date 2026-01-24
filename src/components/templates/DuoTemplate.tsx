import React from 'react';
import { Speaker, BannerDimension } from '../../types/banner.types';
import { formatDate, formatTime } from '../../utils/exportHelpers';
import { getBackgroundById } from '../../constants/backgrounds';

interface DuoTemplateProps {
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

const DuoTemplate: React.FC<DuoTemplateProps> = ({
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

  const background = getBackgroundById(backgroundId);
  const isColorBackground = background?.type === 'color';
  const backgroundValue = customBackgroundUrl || background?.value || '#1a1a1a';

  // Calculate dimension-specific layout parameters
  const isSquare = dimension.label === 'square';
  const isPortrait = dimension.label === 'portrait';

  // Scale factors for different dimensions
  const scaleFactor = isPortrait ? 1.0 : isSquare ? 0.95 : 0.85;
  
  // Calculate responsive heights (75% top, 25% bottom for better balance)
  const topHeight = dimension.height * 0.75;
  const bottomHeight = dimension.height * 0.25;

  // Dimension-specific padding
  const horizontalPadding = isPortrait ? 40 : isSquare ? 48 : 64;
  const verticalPadding = isPortrait ? 56 : isSquare ? 48 : 48;

  // Font sizes adjusted for dimension
  const getTitleFontSize = () => {
    const baseSize = title.length > 80 ? 36 : title.length > 50 ? 44 : 52;
    if (isPortrait) return baseSize * 1.1;
    if (isSquare) return baseSize * 1.0;
    return baseSize * 0.9;
  };

  const renderSpeaker = (speaker: Speaker, index: number) => (
    <div key={index} className="flex items-center" style={{ gap: `${16 * scaleFactor}px` }}>
      {/* Headshot - Increased by 30% */}
      {speaker.headshotUrl ? (
        <div
          className="rounded-full overflow-hidden bg-white shadow-lg flex-shrink-0"
          style={{
            width: `${isPortrait ? 117 : isSquare ? 110 : 104}px`,
            height: `${isPortrait ? 117 : isSquare ? 110 : 104}px`,
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
            width: `${isPortrait ? 117 : isSquare ? 110 : 104}px`,
            height: `${isPortrait ? 117 : isSquare ? 110 : 104}px`,
            border: `${3 * scaleFactor}px solid white`,
            fontSize: `${isPortrait ? 47 : isSquare ? 44 : 42}px`,
          }}
        >
          {speaker.name ? speaker.name.charAt(0).toUpperCase() : '?'}
        </div>
      )}

      {/* Name & Title - Increased by 30% */}
      <div>
        <p 
          className="font-bold text-white leading-tight" 
          style={{ 
            fontSize: `${isPortrait ? 29 : isSquare ? 27 : 26}px`, 
            marginBottom: `${4 * scaleFactor}px` 
          }}
        >
          {speaker.name || `Speaker ${index + 1}`}
        </p>
        <p 
          className="text-white leading-tight" 
          style={{ fontSize: `${isPortrait ? 20 : isSquare ? 19 : 18}px` }}
        >
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
      {/* Top Section - Background with Dark Overlay */}
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

        {/* Content - Layout varies by dimension */}
        <div 
          className="relative h-full flex flex-col justify-between" 
          style={{ padding: `${verticalPadding}px ${horizontalPadding}px` }}
        >
          {/* Top - Webinar Tag, Title, Date/Time & Register */}
          <div style={{ maxWidth: isPortrait ? '100%' : isSquare ? '90%' : '70%' }}>
            {/* Webinar Tag */}
            <div
              className="inline-block rounded-bento font-bold tracking-wide"
              style={{
                backgroundColor: accentColor,
                color: '#000000',
                padding: `${8 * scaleFactor}px ${16 * scaleFactor}px`,
                fontSize: `${16 * scaleFactor}px`,
                marginBottom: `${isPortrait ? 24 : 32}px`,
              }}
            >
              Webinar
            </div>

            {/* Title */}
            <h1
              className="font-bold leading-tight text-white"
              style={{
                fontSize: `${getTitleFontSize()}px`,
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
                marginBottom: `${isPortrait ? 20 : 24}px`,
              }}
            >
              {title || 'Your Webinar Title Here'}
            </h1>

            {/* Date/Time & Register Button */}
            <div 
              className="flex items-center" 
              style={{ 
                gap: `${isPortrait ? 16 : 32}px`,
                flexWrap: isPortrait ? 'wrap' : 'nowrap',
              }}
            >
              {/* Date & Time */}
              {(date || time) && (
                <div className="flex items-center" style={{ gap: `${16 * scaleFactor}px` }}>
                  {date && (
                    <div
                      className="font-bold"
                      style={{ 
                        color: accentColor,
                        fontSize: `${18 * scaleFactor}px`,
                      }}
                    >
                      {formatDate(date)}
                    </div>
                  )}
                  {date && time && (
                    <div className="text-white" style={{ fontSize: `${18 * scaleFactor}px` }}>|</div>
                  )}
                  {time && (
                    <div
                      className="font-bold"
                      style={{ 
                        color: accentColor,
                        fontSize: `${18 * scaleFactor}px`,
                      }}
                    >
                      {formatTime(time, showTimezone ? timezone : undefined)}
                    </div>
                  )}
                </div>
              )}

              {/* Register Button */}
              <div
                className="rounded-bento font-bold"
                style={{
                  backgroundColor: accentColor,
                  color: '#000000',
                  padding: `${10 * scaleFactor}px ${28 * scaleFactor}px`,
                  fontSize: `${16 * scaleFactor}px`,
                }}
              >
                Register
              </div>
            </div>
          </div>

          {/* Bottom - Speakers (layout varies by dimension) */}
          <div 
            className="flex items-center" 
            style={{ 
              gap: `${isPortrait ? 24 : 32}px`,
              flexDirection: isPortrait ? 'column' : 'row',
              alignItems: isPortrait ? 'flex-start' : 'center',
            }}
          >
            {renderSpeaker(speaker1, 0)}
            {renderSpeaker(speaker2, 1)}
          </div>
        </div>
      </div>

      {/* Bottom Section - Accent Color Footer */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-end"
        style={{
          backgroundColor: accentColor,
          height: `${bottomHeight}px`,
          padding: `0 ${horizontalPadding}px`,
        }}
      >
        {/* Company Logos */}
        <div 
          className="flex items-center" 
          style={{ 
            gap: `${isPortrait ? 32 : 48}px`,
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
          }}
        >
          {speaker1.companyLogoUrl && (
            <img
              src={speaker1.companyLogoUrl}
              alt="Company logo"
              className="object-contain"
              style={{ 
                height: `${isPortrait ? 60 : isSquare ? 58 : 56}px`,
                maxWidth: `${isPortrait ? 180 : isSquare ? 190 : 200}px`,
              }}
              crossOrigin="anonymous"
            />
          )}
          {speaker2.companyLogoUrl && (
            <img
              src={speaker2.companyLogoUrl}
              alt="Company logo"
              className="object-contain"
              style={{ 
                height: `${isPortrait ? 60 : isSquare ? 58 : 56}px`,
                maxWidth: `${isPortrait ? 180 : isSquare ? 190 : 200}px`,
              }}
              crossOrigin="anonymous"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DuoTemplate;
