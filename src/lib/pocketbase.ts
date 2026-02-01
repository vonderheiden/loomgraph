import PocketBase from 'pocketbase';

const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL || 'https://training-pocketbase.g5amlv.easypanel.host';

console.log('[PocketBase] Initializing client with URL:', pocketbaseUrl);

export const pb = new PocketBase(pocketbaseUrl);

// Enable auto cancellation for duplicate requests
pb.autoCancellation(false);

console.log('[PocketBase] Client initialized successfully');

// Type definitions for collections
export interface User {
  id: string;
  email: string;
  emailVisibility: boolean;
  verified: boolean;
  name?: string;
  created: string;
  updated: string;
}

export interface Profile {
  id: string;
  user: string;
  company_name?: string;
  brand_color?: string;
  logo_url?: string;
  created: string;
  updated: string;
}

export interface GeneratedAsset {
  id: string;
  user: string;
  asset_type: string;
  template_id: string;
  content: Record<string, unknown>;
  title_preview: string;
  image: string;
  created: string;
  updated: string;
}
