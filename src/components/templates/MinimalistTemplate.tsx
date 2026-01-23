import React from 'react';
import { BannerState } from '../../types/banner.types';
import { formatDate, formatTime } from '../../utils/exportHelpers';

interface MinimalistTemplateProps {
  state: BannerState;
}

const MinimalistTemplate: React.FC<MinimalistTemplateProps> = ({ state }) => {
  const { title, speakerName, speakerRole, headshotUrl, date, time, timezone, showTimezone, accentColor } = state;

  return (
    <div
      id="banner-template"
      className="relative w-[1200px] h-[627px] bg-white overflow-hidden"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-center items-center px-16 py-12">
        
        {/* Title */}
        <div className="text-center mb-8 max-w-4xl">
          <h1
            className="font-bold leading-tight"
            style={{
              fontSize: title.length > 50 ? '48px' : '64px',
              color: '#1F2937',
            }}
          >
            {title || 'Your Webinar Title Here'}
          </h1>
        </div>

        {/* Speaker Section */}
        <div className="flex items-center gap-6 mb-8">
          {/* Headshot */}
          {headshotUrl ? (
            <div
              className="w-24 h-24 rounded-full overflow-hidden border-4"
              style={{ borderColor: accentColor }}
            >
              <img
                src={headshotUrl}
                alt={speakerName}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold"
              style={{ backgroundColor: accentColor }}
            >
              {speakerName ? speakerName.charAt(0).toUpperCase() : '?'}
            </div>
          )}

          {/* Speaker Info */}
          <div className="text-left">
            <p className="text-2xl font-semibold text-gray-900">
              {speakerName || 'Speaker Name'}
            </p>
            <p className="text-lg text-gray-600">
              {speakerRole || 'Title & Company'}
            </p>
          </div>
        </div>

        {/* Date & Time */}
        {(date || time) && (
          <div className="text-center">
            <p className="text-xl text-gray-700">
              {date && formatDate(date)}
              {date && time && ' • '}
              {time && formatTime(time, showTimezone ? timezone : undefined)}
            </p>
          </div>
        )}

        {/* Accent Line at Bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-2"
          style={{ backgroundColor: accentColor }}
        />
      </div>
    </div>
  );
};

export default MinimalistTemplate;
