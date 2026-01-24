import React from 'react';
import { useBannerState } from '../../context/BannerContext';
import { BannerState } from '../../types/banner.types';

const DateTimeForm: React.FC = () => {
  const { state, updateField } = useBannerState();

  const timezones = [
    { value: 'PT', label: 'PT (Pacific Time)' },
    { value: 'ET', label: 'ET (Eastern Time)' },
    { value: 'GMT', label: 'GMT (Greenwich Mean Time)' },
    { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
    { value: 'CET', label: 'CET (Central European Time)' },
  ];

  // Format date for display
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Format time for display
  const formatTime = (timeStr: string) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="bg-bento-card border border-bento-border rounded-bento shadow-soft p-4 lg:p-6">
      <h2 className="text-lg font-semibold mb-4">Date & Time</h2>

      {/* Date and Time - Side by Side on larger screens, stacked on small mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Date Picker */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
            Webinar Date *
          </label>
          <input
            type="date"
            id="date"
            value={state.date}
            onChange={(e) => updateField('date', e.target.value)}
            className="w-full px-3 py-3 lg:py-2 border border-bento-border rounded-bento outline-none transition-colors focus:border-[var(--accent-color)] focus:ring-2 min-h-[44px]"
            style={{
              '--tw-ring-color': 'color-mix(in srgb, var(--accent-color) 20%, transparent)',
            } as React.CSSProperties}
          />
          {state.date && (
            <p className="text-xs text-gray-600 mt-1">{formatDate(state.date)}</p>
          )}
        </div>

        {/* Time Picker */}
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
            Webinar Time *
          </label>
          <input
            type="time"
            id="time"
            value={state.time}
            onChange={(e) => updateField('time', e.target.value)}
            className="w-full px-3 py-3 lg:py-2 border border-bento-border rounded-bento outline-none transition-colors focus:border-[var(--accent-color)] focus:ring-2 min-h-[44px]"
            style={{
              '--tw-ring-color': 'color-mix(in srgb, var(--accent-color) 20%, transparent)',
            } as React.CSSProperties}
          />
          {state.time && (
            <p className="text-xs text-gray-600 mt-1">{formatTime(state.time)}</p>
          )}
        </div>
      </div>

      {/* Timezone Toggle and Selector - Side by Side on larger screens, stacked on small mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Timezone Toggle */}
        <div className="flex items-center min-h-[44px]">
          <label className="flex items-center cursor-pointer py-2">
            <input
              type="checkbox"
              checked={state.showTimezone}
              onChange={(e) => updateField('showTimezone', e.target.checked)}
              className="w-5 h-5 text-action-primary border-bento-border rounded focus:ring-2"
              style={{
                '--tw-ring-color': 'color-mix(in srgb, var(--accent-color) 20%, transparent)',
              } as React.CSSProperties}
            />
            <span className="ml-2 text-sm font-medium text-gray-700">Show timezone</span>
          </label>
        </div>

        {/* Timezone Selector */}
        <div>
          {state.showTimezone && (
            <>
              <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <select
                id="timezone"
                value={state.timezone}
                onChange={(e) =>
                  updateField('timezone', e.target.value as BannerState['timezone'])
                }
                className="w-full px-3 py-3 lg:py-2 border border-bento-border rounded-bento outline-none transition-colors bg-white focus:border-[var(--accent-color)] focus:ring-2 min-h-[44px]"
                style={{
                  '--tw-ring-color': 'color-mix(in srgb, var(--accent-color) 20%, transparent)',
                } as React.CSSProperties}
              >
                {timezones.map((tz) => (
                  <option key={tz.value} value={tz.value}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateTimeForm;
