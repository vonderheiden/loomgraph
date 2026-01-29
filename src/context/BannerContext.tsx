import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { BannerState, Speaker, BANNER_DIMENSIONS } from '../types/banner.types';
import { updateAccentColorVariable } from '../utils/colorHelpers';

// Helper to create empty speaker
function createEmptySpeaker(): Speaker {
  return {
    name: '',
    title: '',
    headshotUrl: null,
    headshotFile: null,
    companyLogoUrl: null,
    companyLogoFile: null,
  };
}

// Initial state with sensible defaults
const initialState: BannerState = {
  title: '',
  speakerCount: 1,
  speakers: [createEmptySpeaker()],
  date: '',
  time: '',
  timezone: 'PT',
  showTimezone: true,
  template: 'professional',
  accentColor: '#a4d233', // Lime green
  backgroundId: 'image-road-1', // Default to Desert Road
  customBackgroundUrl: null,
  customBackgroundFile: null,
  dimension: BANNER_DIMENSIONS.landscape, // Default to landscape
};

// Context type
interface BannerContextType {
  state: BannerState;
  updateField: <K extends keyof BannerState>(field: K, value: BannerState[K]) => void;
  updateSpeaker: (index: number, updates: Partial<Speaker>) => void;
  updateSpeakerCount: (count: 1 | 2 | 3) => void;
  updateDimension: (dimension: BannerState['dimension']) => void;
  resetState: () => void;
}

// Create context
const BannerContext = createContext<BannerContextType | undefined>(undefined);

// Provider component
export const BannerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<BannerState>(initialState);

  // Update CSS custom property when accent color changes
  useEffect(() => {
    updateAccentColorVariable(state.accentColor);
  }, [state.accentColor]);

  // Update a single field
  const updateField = useCallback(<K extends keyof BannerState>(
    field: K,
    value: BannerState[K]
  ) => {
    setState((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Update a specific speaker
  const updateSpeaker = useCallback((index: number, updates: Partial<Speaker>) => {
    setState((prev) => {
      const newSpeakers = [...prev.speakers];
      newSpeakers[index] = { ...newSpeakers[index], ...updates };
      return { ...prev, speakers: newSpeakers };
    });
  }, []);

  // Update speaker count and adjust speakers array
  const updateSpeakerCount = useCallback((count: 1 | 2 | 3) => {
    setState((prev) => {
      const newSpeakers = [...prev.speakers];
      
      // Add empty speakers if increasing count
      while (newSpeakers.length < count) {
        newSpeakers.push(createEmptySpeaker());
      }
      
      // Keep all speakers even if count decreases (data preservation)
      // But only show the first 'count' speakers in the form
      
      // Auto-switch template based on speaker count
      let newTemplate: 'professional' | 'duo' | 'panel';
      if (count === 1) newTemplate = 'professional';
      else if (count === 2) newTemplate = 'duo';
      else newTemplate = 'panel';
      
      return {
        ...prev,
        speakerCount: count,
        speakers: newSpeakers,
        template: newTemplate,
      };
    });
  }, []);

  // Update dimension with validation
  const updateDimension = useCallback((dimension: BannerState['dimension']) => {
    // Validate dimension object has required fields
    if (!dimension || typeof dimension.width !== 'number' || typeof dimension.height !== 'number' || !dimension.label) {
      console.error('Invalid dimension object:', dimension);
      console.warn('Resetting to default landscape dimension');
      // Reset to default landscape dimension
      setState((prev) => ({ ...prev, dimension: BANNER_DIMENSIONS.landscape }));
      return;
    }
    
    setState((prev) => ({ ...prev, dimension }));
  }, []);

  // Reset to initial state
  const resetState = useCallback(() => {
    setState(initialState);
  }, []);

  const value = {
    state,
    updateField,
    updateSpeaker,
    updateSpeakerCount,
    updateDimension,
    resetState,
  };

  return <BannerContext.Provider value={value}>{children}</BannerContext.Provider>;
};

// Custom hook to use the banner context
// eslint-disable-next-line react-refresh/only-export-components
export const useBannerState = (): BannerContextType => {
  const context = useContext(BannerContext);
  if (context === undefined) {
    throw new Error('useBannerState must be used within a BannerProvider');
  }
  return context;
};
