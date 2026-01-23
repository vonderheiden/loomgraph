import React from 'react';
import { Speaker } from '../../types/banner.types';
import { formatDate, formatTime } from '../../utils/exportHelpers';

interface PanelTemplateProps {
  title: string;
  speakers: Speaker[];
  date: string;
  time: string;
  timezone: 'PT' | 'ET' | 'GMT' | 'UTC' | 'CET';
  showTimezone: boolean;
  accentColor: string;
}

const PanelTemplate: React.FC<PanelTemplateProps> = ({
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
  const speaker3 = speakers[2] || { name: '', title: '', headshotUrl: null, companyLogoUrl: null };

  const renderSpeaker = (speaker: Speaker, index: number) => (
    <div key={index} className="flex flex-col items-center">
      {speaker.headshotUrl ? (
        <div className="w-44 h-44 rounded-full overflow-hidden border-6 border-white shadow-xl mb-3">
          <img
            src={speaker.headshotUrl}
            alt={speaker.name}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="w-44 h-44 rounded-full flex items-center justify-center text-white text-6xl font-bold border-6 border-white bg-white/20 mb-3">
          {speaker.name ? speaker.name.charAt(0).toUpperCase() : '?'}
        </div>
      )}
      <p className="text-xl font-semibold text-white text-center mb-1">
        {speaker.name || `Speaker ${index + 1}`}
      </p>
      <p className="text-base text-white/90 text-center mb-2">
        {speaker.title || 'Title & Company'}
      </p>
      {speaker.companyLogoUrl && (
        <img
          src={speaker.companyLogoUrl}
          alt="Company logo"
          className="h-6 object-contain"
          style={{ maxWidth: '100px' }}
        />
      )}
    </div>
  );

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
          background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 50%, ${accentColor}ee 100%)`,
        }}
      />

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-between px-12 py-10">
        {/* Title Section */}
        <div className="text-center">
          <h1
            className="font-bold leading-tight text-white"
            style={{
              fontSize: title.length > 50 ? '44px' : title.length > 30 ? '52px' : '60px',
            }}
          >
            {title || 'Your Webinar Title Here'}
          </h1>
        </div>

        {/* Speakers Section - Three in a Row */}
        <div className="flex justify-center items-center gap-12">
          {renderSpeaker(speaker1, 0)}
          {renderSpeaker(speaker2, 1)}
          {renderSpeaker(speaker3, 2)}
        </div>

        {/* Bottom Section - Date/Time and CTA */}
        <div className="flex justify-between items-center">
          {/* Date & Time */}
          {(date || time) && (
            <div className="text-white text-lg">
              {date && formatDate(date)}
              {date && time && ' • '}
              {time && formatTime(time, showTimezone ? timezone : undefined)}
            </div>
          )}

          {/* Register CTA */}
          <div className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold text-lg shadow-lg">
            Register Now
          </div>
        </div>
      </div>

      {/* Decorative geometric elements */}
      <div className="absolute top-6 left-6 w-16 h-16 border-4 border-white/20 rounded-lg rotate-12" />
      <div className="absolute bottom-6 right-6 w-12 h-12 bg-white/10 rounded-full" />
    </div>
  );
};

export default PanelTemplate;
