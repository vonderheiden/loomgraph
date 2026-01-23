import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { BannerState } from '../types/banner.types';

// Initial state with sensible defaults
const initialState: BannerState = {
  title: '',
  speakerName: '',
  speakerRole: '',
  headshotUrl: null,
  date: '',
  time: '',
  timezone: 'PT',
  showTimezone: true,
  template: 'minimalist',
  accentColor: '#3B82F6', // Electric Blue
  headshotFile: null,
};

// Context type
interface BannerContextType {
  state: BannerState;
  updateField: <K extends keyof BannerState>(field: K, value: BannerState[K]) => void;
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

  // Reset to initial state
  const resetState = useCallback(() => {
    setState(initialState);
  }, []);

  const value = {
    state,
    updateField,
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
