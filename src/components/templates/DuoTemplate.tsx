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
}

const DuoTemplate: React.FC<DuoTemplateProps> = ({
  title,
  speakers,
  date,
  time,
  timezone,
  showTimezone,
  accentColor,
}) => {
  const speaker1 = speakers[0] || { name: '', title: '', headshotUrl: null, companyLogoUrl: null };
  const speaker2 = speakers[1] || { name: '', title: '', headshotUrl: null, companyLogoUrl: null };

  return (
    <div
      id="banner-template"
      className="relative w-[1200px] h-[627px] overflow-hidden"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Background with gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%)`,
        }}
      />

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-between px-16 py-12">
        {/* Title Section */}
        <div className="text-center">
          <h1
            className="font-bold leading-tight text-white"
            style={{
              fontSize: title.length > 50 ? '48px' : title.length > 30 ? '56px' : '64px',
            }}
          >
            {title || 'Your Webinar Title Here'}
          </h1>
        </div>

        {/* Speakers Section - Side by Side */}
        <div className="flex justify-center items-center gap-16">
          {/* Speaker 1 */}
          <div className="flex flex-col items-center">
            {speaker1.headshotUrl ? (
              <div className="w-56 h-56 rounded-full overflow-hidden border-8 border-white shadow-2xl mb-4">
                <img
                  src={speaker1.headshotUrl}
                  alt={speaker1.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-56 h-56 rounded-full flex items-center justify-center text-white text-7xl font-bold border-8 border-white bg-white/20 mb-4">
                {speaker1.name ? speaker1.name.charAt(0).toUpperCase() : '?'}
              </div>
            )}
            <p className="text-2xl font-semibold text-white text-center mb-1">
              {speaker1.name || 'Speaker 1'}
            </p>
            <p className="text-lg text-white/90 text-center mb-2">
              {speaker1.title || 'Title & Company'}
            </p>
            {speaker1.companyLogoUrl && (
              <img
                src={speaker1.companyLogoUrl}
                alt="Company logo"
                className="h-8 object-contain"
                style={{ maxWidth: '120px' }}
              />
            )}
          </div>

          {/* Speaker 2 */}
          <div className="flex flex-col items-center">
            {speaker2.headshotUrl ? (
              <div className="w-56 h-56 rounded-full overflow-hidden border-8 border-white shadow-2xl mb-4">
                <img
                  src={speaker2.headshotUrl}
                  alt={speaker2.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-56 h-56 rounded-full flex items-center justify-center text-white text-7xl font-bold border-8 border-white bg-white/20 mb-4">
                {speaker2.name ? speaker2.name.charAt(0).toUpperCase() : '?'}
              </div>
            )}
            <p className="text-2xl font-semibold text-white text-center mb-1">
              {speaker2.name || 'Speaker 2'}
            </p>
            <p className="text-lg text-white/90 text-center mb-2">
              {speaker2.title || 'Title & Company'}
            </p>
            {speaker2.companyLogoUrl && (
              <img
                src={speaker2.companyLogoUrl}
                alt="Company logo"
                className="h-8 object-contain"
                style={{ maxWidth: '120px' }}
              />
            )}
          </div>
        </div>

        {/* Date & Time Section */}
        {(date || time) && (
          <div className="text-center text-white text-xl">
            {date && formatDate(date)}
            {date && time && ' • '}
            {time && formatTime(time, showTimezone ? timezone : undefined)}
          </div>
        )}
      </div>

      {/* Decorative dots */}
      <div className="absolute top-8 right-8 flex gap-2">
        <div className="w-3 h-3 rounded-full bg-white/30" />
        <div className="w-3 h-3 rounded-full bg-white/30" />
        <div className="w-3 h-3 rounded-full bg-white/30" />
      </div>
    </div>
  );
};

export default DuoTemplate;
