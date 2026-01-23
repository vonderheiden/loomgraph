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
        <div 
          className="rounded-full overflow-hidden bg-white shadow-2xl mb-4"
          style={{ 
            width: '220px', 
            height: '220px',
            border: '10px solid white',
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.3)',
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
          className="rounded-full flex items-center justify-center text-white font-black bg-white/20 mb-4"
          style={{ 
            width: '220px', 
            height: '220px',
            border: '10px solid white',
            fontSize: '70px',
          }}
        >
          {speaker.name ? speaker.name.charAt(0).toUpperCase() : '?'}
        </div>
      )}
      <p className="text-2xl font-bold text-white text-center mb-2" style={{ letterSpacing: '-0.01em' }}>
        {speaker.name || `Speaker ${index + 1}`}
      </p>
      <p className="text-base text-white text-center mb-3" style={{ opacity: 0.95 }}>
        {speaker.title || 'Title & Company'}
      </p>
      {speaker.companyLogoUrl && (
        <img
          src={speaker.companyLogoUrl}
          alt="Company logo"
          className="h-8 object-contain"
          style={{ maxWidth: '120px', filter: 'brightness(0) invert(1)' }}
          crossOrigin="anonymous"
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
      {/* Background with rich gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 40%, ${accentColor}dd 70%, ${accentColor}ee 100%)`,
        }}
      />

      {/* Decorative geometric elements */}
      <div className="absolute top-8 left-8 w-20 h-20 border-4 border-white/20 rounded-xl transform rotate-12" />
      <div className="absolute bottom-8 right-8 w-16 h-16 bg-white/10 rounded-full" />
      <div className="absolute top-1/2 right-12 w-12 h-12 border-4 border-white/15 rounded-lg transform -rotate-6" />

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-between px-14 py-12">
        {/* Top Section - Time Badge & Title */}
        <div>
          {/* Time Badge */}
          {time && (
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full mb-6">
              <span className="text-white text-xl">🕐</span>
              <span className="text-white font-semibold text-base">
                {formatTime(time, showTimezone ? timezone : undefined)}
              </span>
            </div>
          )}

          {/* Title */}
          <h1
            className="font-black leading-tight text-white"
            style={{
              fontSize: title.length > 50 ? '48px' : title.length > 30 ? '56px' : '64px',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              maxWidth: '900px',
            }}
          >
            {title || 'Your Webinar Title Here'}
          </h1>
        </div>

        {/* Speakers Section - Three in a Row */}
        <div className="flex justify-center items-center gap-14">
          {renderSpeaker(speaker1, 0)}
          {renderSpeaker(speaker2, 1)}
          {renderSpeaker(speaker3, 2)}
        </div>

        {/* Bottom Section - Date & CTA */}
        <div className="flex justify-between items-center">
          {/* Date with Icon */}
          {date && (
            <div className="flex items-center gap-3 text-white text-lg">
              <span className="text-2xl">📅</span>
              <span className="font-medium">{formatDate(date)}</span>
            </div>
          )}

          {/* Register CTA Button */}
          <div 
            className="px-10 py-4 rounded-xl font-bold text-lg shadow-xl"
            style={{
              background: 'white',
              color: accentColor,
              boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)',
            }}
          >
            Register Now
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelTemplate;
