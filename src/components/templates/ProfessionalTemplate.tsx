import React from 'react';
import { Speaker } from '../../types/banner.types';
import { formatDate, formatTime } from '../../utils/exportHelpers';

interface ProfessionalTemplateProps {
  title: string;
  speakers: Speaker[];
  date: string;
  time: string;
  timezone: 'PT' | 'ET' | 'GMT' | 'UTC' | 'CET';
  showTimezone: boolean;
  accentColor: string;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({
  title,
  speakers,
  date,
  time,
  timezone,
  showTimezone,
  accentColor,
}) => {
  const speaker = speakers[0] || { name: '', title: '', headshotUrl: null, companyLogoUrl: null };

  return (
    <div
      id="banner-template"
      className="relative w-[1200px] h-[627px] overflow-hidden"
      style={{ fontFamily: 'Inter, sans-serif', backgroundColor: accentColor }}
    >
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />

      {/* Content Container - Split Layout */}
      <div className="relative h-full flex">
        {/* Left Side - Content (60%) */}
        <div className="w-[60%] flex flex-col justify-center px-16 py-12">
          {/* Title */}
          <h1
            className="font-bold leading-tight mb-6 text-white"
            style={{
              fontSize: title.length > 50 ? '52px' : title.length > 30 ? '60px' : '72px',
            }}
          >
            {title || 'Your Webinar Title Here'}
          </h1>

          {/* Speaker Info */}
          <div className="mb-6">
            <p className="text-3xl font-semibold text-white mb-2">
              {speaker.name || 'Speaker Name'}
            </p>
            <p className="text-xl text-white/90">
              {speaker.title || 'Title & Company'}
            </p>
          </div>

          {/* Company Logo */}
          {speaker.companyLogoUrl && (
            <div className="mb-6">
              <img
                src={speaker.companyLogoUrl}
                alt="Company logo"
                className="h-12 object-contain"
                style={{ maxWidth: '200px' }}
              />
            </div>
          )}

          {/* Date & Time */}
          {(date || time) && (
            <div className="text-white/90 text-lg">
              {date && formatDate(date)}
              {date && time && ' • '}
              {time && formatTime(time, showTimezone ? timezone : undefined)}
            </div>
          )}
        </div>

        {/* Right Side - Headshot (40%) */}
        <div className="w-[40%] flex items-center justify-center p-12">
          {speaker.headshotUrl ? (
            <div className="w-80 h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl">
              <img
                src={speaker.headshotUrl}
                alt={speaker.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-80 h-80 rounded-full flex items-center justify-center text-white text-8xl font-bold border-8 border-white bg-white/20">
              {speaker.name ? speaker.name.charAt(0).toUpperCase() : '?'}
            </div>
          )}
        </div>
      </div>

      {/* Decorative Element - Diagonal Accent */}
      <div
        className="absolute bottom-0 left-0 w-64 h-2 opacity-50"
        style={{ backgroundColor: 'white' }}
      />
    </div>
  );
};

export default ProfessionalTemplate;
