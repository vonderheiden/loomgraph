// Background presets configuration
// This file can be easily migrated to fetch from Supabase later

export interface BackgroundOption {
  id: string;
  name: string;
  type: 'color' | 'image';
  value: string; // hex color or image path
  thumbnail?: string; // for image previews
}

export const BACKGROUND_OPTIONS: BackgroundOption[] = [
  // Solid Colors
  {
    id: 'color-black',
    name: 'Black',
    type: 'color',
    value: '#000000',
  },
  {
    id: 'color-dark-gray',
    name: 'Dark Gray',
    type: 'color',
    value: '#1a1a1a',
  },
  {
    id: 'color-white',
    name: 'White',
    type: 'color',
    value: '#ffffff',
  },
  {
    id: 'color-navy',
    name: 'Navy',
    type: 'color',
    value: '#1e3a8a',
  },
  
  // Preset Images
  {
    id: 'image-road-1',
    name: 'Desert Road',
    type: 'image',
    value: '/backgrounds/road-1.jpg',
    thumbnail: '/backgrounds/road-1-thumb.jpg',
  },
  {
    id: 'image-road-2',
    name: 'Autumn Road',
    type: 'image',
    value: '/backgrounds/road-2.jpg',
    thumbnail: '/backgrounds/road-2-thumb.jpg',
  },
  {
    id: 'image-road-3',
    name: 'Highway Road',
    type: 'image',
    value: '/backgrounds/road-3.jpg',
    thumbnail: '/backgrounds/road-3-thumb.jpg',
  },
];

// Helper function to get background by ID
export const getBackgroundById = (id: string): BackgroundOption | undefined => {
  return BACKGROUND_OPTIONS.find(bg => bg.id === id);
};

// Helper to get default background
export const getDefaultBackground = (): BackgroundOption => {
  return BACKGROUND_OPTIONS[1]; // Dark Gray
};
