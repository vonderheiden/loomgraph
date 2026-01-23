// Speaker interface for multi-speaker support
export interface Speaker {
  name: string;
  title: string;
  headshotUrl: string | null;
  headshotFile: File | null;
  companyLogoUrl: string | null;
  companyLogoFile: File | null;
}

// State model supporting 1-3 speakers
export interface BannerState {
  // Webinar Details
  title: string;
  speakerCount: 1 | 2 | 3;
  speakers: Speaker[];
  
  // Schedule
  date: string; // ISO date string
  time: string; // HH:MM format
  timezone: 'PT' | 'ET' | 'GMT' | 'UTC' | 'CET';
  showTimezone: boolean;
  
  // Visual Customization
  template: 'professional' | 'duo' | 'panel';
  accentColor: string;
}

// Template configuration
export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
}

// Form validation types
export interface ValidationError {
  field: keyof BannerState | 'speakers';
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Canvas rendering types
export interface CanvasRenderOptions {
  width: number;
  height: number;
  scale: number; // For @2x resolution
  quality: number; // 0-1 for JPEG quality
}

export interface TextScalingOptions {
  text: string;
  maxWidth: number;
  maxSize: number;
  minSize: number;
  fontFamily: string;
}

// Export types
export interface ExportOptions {
  format: 'png' | 'jpeg';
  quality: number;
  filename: string;
}
