import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { BannerState, Speaker } from '../types/banner.types';

// Helper to create empty speaker
const createEmptySpeaker = (): Speaker => ({
  name: '',
  title: '',
  headshotUrl: null,
  headshotFile: null,
  companyLogoUrl: null,
  companyLogoFile: null,
});

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
  accentColor: '#3B82F6', // Electric Blue
};

// Context type
interface BannerContextType {
  state: BannerState;
  updateField: <K extends keyof BannerState>(field: K, value: BannerState[K]) => void;
  updateSpeaker: (index: number, updates: Partial<Speaker>) => void;
  updateSpeakerCount: (count: 1 | 2 | 3) => void;
  resetState: () => void;
}

// Create context
const BannerContext = createContext<BannerContextType | undefined>(undefined);

// Provider component
export const BannerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<BannerState>(initialState);

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

  // Reset to initial state
  const resetState = useCallback(() => {
    setState(initialState);
  }, []);

  const value = {
    state,
    updateField,
    updateSpeaker,
    updateSpeakerCount,
    resetState,
  };

  return <BannerContext.Provider value={value}>{children}</BannerContext.Provider>;
};

// Custom hook to use the banner context
export const useBannerState = (): BannerContextType => {
  const context = useContext(BannerContext);
  if (context === undefined) {
    throw new Error('useBannerState must be used within a BannerProvider');
  }
  return context;
};
