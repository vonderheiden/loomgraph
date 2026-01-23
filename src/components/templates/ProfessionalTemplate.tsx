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
      {/* Background gradient overlay */}
      <div 
        className="absolute inset-0" 
        style={{
          background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%)`,
        }}
      />

      {/* Diagonal accent stripes - top right */}
      <div className="absolute top-0 right-0 w-96 h-96 overflow-hidden opacity-20">
        <div className="absolute top-12 -right-12 w-80 h-2 bg-white transform rotate-45" />
        <div className="absolute top-24 -right-12 w-96 h-3 bg-white transform rotate-45" />
        <div className="absolute top-40 -right-12 w-72 h-2 bg-white transform rotate-45" />
      </div>

      {/* Content Container - Split Layout */}
      <div className="relative h-full flex">
        {/* Left Side - Content (58%) */}
        <div className="w-[58%] flex flex-col justify-center px-16 py-16">
          {/* Title */}
          <h1
            className="font-black leading-tight mb-8 text-white"
            style={{
              fontSize: title.length > 50 ? '56px' : title.length > 30 ? '68px' : '76px',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {title || 'Your Webinar Title Here'}
          </h1>

          {/* Speaker Info */}
          <div className="mb-8">
            <p className="text-4xl font-bold text-white mb-3" style={{ letterSpacing: '-0.01em' }}>
              {speaker.name || 'Speaker Name'}
            </p>
            <p className="text-xl text-white" style={{ opacity: 0.95 }}>
              {speaker.title || 'Title & Company'}
            </p>
          </div>

          {/* Company Logo */}
          {speaker.companyLogoUrl && (
            <div className="mb-8">
              <img
                src={speaker.companyLogoUrl}
                alt="Company logo"
                className="h-16 object-contain"
                style={{ maxWidth: '220px', filter: 'brightness(0) invert(1)' }}
              />
            </div>
          )}

          {/* CTA */}
          <div className="mb-6">
            <div className="inline-block">
              <p className="text-2xl font-bold text-white mb-2">REGISTER NOW</p>
              <div className="h-1 bg-white" style={{ width: '180px' }} />
            </div>
          </div>

          {/* Date & Time */}
          {(date || time) && (
            <div className="text-white text-lg" style={{ opacity: 0.9 }}>
              {date && formatDate(date)}
              {date && time && ' • '}
              {time && formatTime(time, showTimezone ? timezone : undefined)}
            </div>
          )}
        </div>

        {/* Right Side - Headshot (42%) */}
        <div className="w-[42%] flex items-center justify-center p-12">
          {speaker.headshotUrl ? (
            <div 
              className="rounded-full overflow-hidden bg-white shadow-2xl"
              style={{ 
                width: '380px', 
                height: '380px',
                border: '12px solid white',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
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
              className="rounded-full flex items-center justify-center text-white font-black bg-white/20"
              style={{ 
                width: '380px', 
                height: '380px',
                border: '12px solid white',
                fontSize: '120px',
              }}
            >
              {speaker.name ? speaker.name.charAt(0).toUpperCase() : '?'}
            </div>
          )}
        </div>
      </div>

      {/* Decorative curved element - bottom left */}
      <div 
        className="absolute bottom-0 left-0 w-64 h-32 opacity-10"
        style={{
          background: 'white',
          borderTopRightRadius: '100%',
        }}
      />
    </div>
  );
};

export default ProfessionalTemplate;
