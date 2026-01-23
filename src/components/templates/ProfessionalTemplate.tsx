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
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Top Section - Dark Background (80%) */}
      <div className="absolute inset-0 h-[502px]">
        {/* Dark filtered background */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          }}
        />
        
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Content */}
        <div className="relative h-full flex items-center px-16 py-12">
          {/* Left Side - Text Content */}
          <div className="flex-1 pr-12">
            {/* Webinar Tag */}
            <div
              className="inline-block px-4 py-1.5 rounded-md mb-6 font-bold text-sm tracking-wide"
              style={{
                backgroundColor: accentColor,
                color: 'white',
              }}
            >
              WEBINAR
            </div>

            {/* Title */}
            <h1
              className="font-bold leading-tight text-white mb-6"
              style={{
                fontSize: title.length > 60 ? '42px' : title.length > 40 ? '48px' : '56px',
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: '-0.01em',
                maxWidth: '650px',
              }}
            >
              {title || 'Your Webinar Title Here'}
            </h1>

            {/* Date & Time */}
            <div className="flex items-center gap-6 mb-8">
              {date && (
                <div
                  className="flex items-center gap-2 font-bold text-base"
                  style={{ color: accentColor }}
                >
                  <span className="text-xl">📅</span>
                  <span>{formatDate(date)}</span>
                </div>
              )}
              {time && (
                <div
                  className="flex items-center gap-2 font-bold text-base"
                  style={{ color: accentColor }}
                >
                  <span className="text-xl">🕐</span>
                  <span>{formatTime(time, showTimezone ? timezone : undefined)}</span>
                </div>
              )}
            </div>

            {/* Speaker Info */}
            <div className="space-y-2">
              <p className="text-2xl font-bold text-white">
                {speaker.name || 'Speaker Name'}
              </p>
              <p className="text-base text-gray-300">
                {speaker.title || 'Title & Company'}
              </p>
            </div>
          </div>

          {/* Right Side - Speaker Headshot */}
          <div className="flex-shrink-0">
            {speaker.headshotUrl ? (
              <div
                className="rounded-2xl overflow-hidden bg-white shadow-2xl"
                style={{
                  width: '320px',
                  height: '320px',
                  border: '6px solid rgba(255, 255, 255, 0.1)',
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
                className="rounded-2xl flex items-center justify-center text-white font-black bg-white/10"
                style={{
                  width: '320px',
                  height: '320px',
                  border: '6px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '100px',
                }}
              >
                {speaker.name ? speaker.name.charAt(0).toUpperCase() : '?'}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section - Accent Color Footer (20%) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[125px] flex items-center justify-between px-16"
        style={{
          backgroundColor: accentColor,
        }}
      >
        {/* Register Button */}
        <div
          className="px-10 py-4 rounded-lg font-bold text-lg"
          style={{
            backgroundColor: 'white',
            color: accentColor,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          }}
        >
          REGISTER NOW
        </div>

        {/* Company Logo */}
        {speaker.companyLogoUrl && (
          <img
            src={speaker.companyLogoUrl}
            alt="Company logo"
            className="h-16 object-contain"
            style={{ maxWidth: '200px', filter: 'brightness(0) invert(1)' }}
            crossOrigin="anonymous"
          />
        )}
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
