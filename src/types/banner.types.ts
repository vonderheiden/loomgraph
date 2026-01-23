// Simplified state model for MVP (single speaker, flat structure)
export interface BannerState {
  // Webinar Details
  title: string;
  speakerName: string;
  speakerRole: string;
  headshotUrl: string | null;
  
  // Schedule
  date: string; // ISO date string
  time: string; // HH:MM format
  timezone: 'PT' | 'ET' | 'GMT' | 'UTC' | 'CET';
  showTimezone: boolean;
  
  // Visual Customization
  template: 'minimalist' | 'bold-founder' | 'duo';
  accentColor: string;
  
  // Transient state
  headshotFile: File | null;
}

// Template configuration
export interface TemplateConfig {
  id: string;
  name: string;
  description: string;
}

// Form validation types
export interface ValidationError {
  field: keyof BannerState;
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
