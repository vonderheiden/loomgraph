import React from 'react';
import { Speaker } from '../../types/banner.types';
import { formatDate, formatTime } from '../../utils/exportHelpers';
import { Calendar, Clock } from 'lucide-react';

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
      {/* Background with rich gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 50%, ${accentColor}ee 100%)`,
        }}
      />

      {/* Decorative dots pattern - top right */}
      <div className="absolute top-8 right-8 grid grid-cols-6 gap-3 opacity-20">
        {[...Array(36)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-white" />
        ))}
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-between px-16 py-14">
        {/* Title Section */}
        <div className="text-center">
          <h1
            className="font-black leading-tight text-white"
            style={{
              fontSize: title.length > 50 ? '52px' : title.length > 30 ? '60px' : '68px',
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {title || 'Your Webinar Title Here'}
          </h1>
        </div>

        {/* Speakers Section - Side by Side */}
        <div className="flex justify-center items-center gap-20">
          {/* Speaker 1 */}
          <div className="flex flex-col items-center">
            {speaker1.headshotUrl ? (
              <div 
                className="rounded-full overflow-hidden bg-white shadow-2xl mb-5"
                style={{ 
                  width: '260px', 
                  height: '260px',
                  border: '10px solid white',
                  boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.3)',
                }}
              >
                <img
                  src={speaker1.headshotUrl}
                  alt={speaker1.name}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
            ) : (
              <div 
                className="rounded-full flex items-center justify-center text-white font-black bg-white/20 mb-5"
                style={{ 
                  width: '260px', 
                  height: '260px',
                  border: '10px solid white',
                  fontSize: '80px',
                }}
              >
                {speaker1.name ? speaker1.name.charAt(0).toUpperCase() : '?'}
              </div>
            )}
            <p className="text-3xl font-bold text-white text-center mb-2" style={{ letterSpacing: '-0.01em' }}>
              {speaker1.name || 'Speaker 1'}
            </p>
            <p className="text-lg text-white text-center mb-3" style={{ opacity: 0.95 }}>
              {speaker1.title || 'Title & Company'}
            </p>
            {speaker1.companyLogoUrl && (
              <img
                src={speaker1.companyLogoUrl}
                alt="Company logo"
                className="h-10 object-contain"
                style={{ maxWidth: '140px', filter: 'brightness(0) invert(1)' }}
                crossOrigin="anonymous"
              />
            )}
          </div>

          {/* Speaker 2 */}
          <div className="flex flex-col items-center">
            {speaker2.headshotUrl ? (
              <div 
                className="rounded-full overflow-hidden bg-white shadow-2xl mb-5"
                style={{ 
                  width: '260px', 
                  height: '260px',
                  border: '10px solid white',
                  boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.3)',
                }}
              >
                <img
                  src={speaker2.headshotUrl}
                  alt={speaker2.name}
                  className="w-full h-full object-cover"
                  crossOrigin="anonymous"
                />
              </div>
            ) : (
              <div 
                className="rounded-full flex items-center justify-center text-white font-black bg-white/20 mb-5"
                style={{ 
                  width: '260px', 
                  height: '260px',
                  border: '10px solid white',
                  fontSize: '80px',
                }}
              >
                {speaker2.name ? speaker2.name.charAt(0).toUpperCase() : '?'}
              </div>
            )}
            <p className="text-3xl font-bold text-white text-center mb-2" style={{ letterSpacing: '-0.01em' }}>
              {speaker2.name || 'Speaker 2'}
            </p>
            <p className="text-lg text-white text-center mb-3" style={{ opacity: 0.95 }}>
              {speaker2.title || 'Title & Company'}
            </p>
            {speaker2.companyLogoUrl && (
              <img
                src={speaker2.companyLogoUrl}
                alt="Company logo"
                className="h-10 object-contain"
                style={{ maxWidth: '140px', filter: 'brightness(0) invert(1)' }}
                crossOrigin="anonymous"
              />
            )}
          </div>
        </div>

        {/* Date & Time Section with Icons */}
        {(date || time) && (
          <div className="flex justify-center items-center gap-8 text-white text-xl">
            {date && (
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6" strokeWidth={2.5} />
                <span className="font-medium">{formatDate(date)}</span>
              </div>
            )}
            {time && (
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6" strokeWidth={2.5} />
                <span className="font-medium">{formatTime(time, showTimezone ? timezone : undefined)}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DuoTemplate;
