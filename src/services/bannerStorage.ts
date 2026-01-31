import { supabase } from '../lib/supabase';
import type { BannerState } from '../types/banner.types';

export interface SaveBannerParams {
  title: string;
  dimension: 'landscape' | 'square' | 'portrait';
  imageBlob: Blob;
  bannerState: BannerState;
}

export interface SavedBanner {
  id: string;
  user_id: string;
  asset_type: string;
  template_id: string;
  content: Record<string, unknown>;
  title_preview: string;
  image_url: string;
  created_at: string;
}

/**
 * Save a banner to Supabase storage and database
 */
export async function saveBanner(params: SaveBannerParams): Promise<SavedBanner> {
  const { title, imageBlob, bannerState } = params;

  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User must be authenticated to save banners');
  }

  // Generate unique filename
  const timestamp = Date.now();
  const filename = `banner-${user.id}-${timestamp}.png`;
  const filePath = `banners/${user.id}/${filename}`;

  // Upload image to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from('generated-assets')
    .upload(filePath, imageBlob, {
      contentType: 'image/png',
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    console.error('[BannerStorage] Upload error:', uploadError);
    throw new Error(`Failed to upload banner image: ${uploadError.message}`);
  }

  // Get public URL for the uploaded image
  const { data: { publicUrl } } = supabase.storage
    .from('generated-assets')
    .getPublicUrl(filePath);

  // Prepare metadata
  const metadata = {
    title: bannerState.title,
    speakerCount: bannerState.speakerCount,
    speakers: bannerState.speakers.map(speaker => ({
      name: speaker.name,
      title: speaker.title,
      hasHeadshot: !!speaker.headshotUrl,
      hasLogo: !!speaker.companyLogoUrl
    })),
    date: bannerState.date,
    time: bannerState.time,
    timezone: bannerState.timezone,
    showTimezone: bannerState.showTimezone,
    template: bannerState.template,
    accentColor: bannerState.accentColor,
    backgroundId: bannerState.backgroundId,
    dimension: {
      width: bannerState.dimension.width,
      height: bannerState.dimension.height,
      label: bannerState.dimension.label
    }
  };

  // Insert record into database
  const { data: record, error: dbError } = await supabase
    .from('generated_assets')
    .insert({
      user_id: user.id,
      asset_type: 'webinar_banner',
      template_id: bannerState.template,
      content: metadata,
      title_preview: title || 'Untitled Banner',
      image_url: publicUrl
    })
    .select()
    .single();

  if (dbError) {
    console.error('[BannerStorage] Database error:', dbError);
    // Try to clean up uploaded file
    await supabase.storage.from('generated-assets').remove([filePath]);
    throw new Error(`Failed to save banner record: ${dbError.message}`);
  }

  return record;
}

/**
 * Get all banners for the current user
 */
export async function getUserBanners(): Promise<SavedBanner[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User must be authenticated to retrieve banners');
  }

  const { data, error } = await supabase
    .from('generated_assets')
    .select('*')
    .eq('user_id', user.id)
    .eq('asset_type', 'webinar_banner')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[BannerStorage] Fetch error:', error);
    throw new Error(`Failed to fetch banners: ${error.message}`);
  }

  return data || [];
}

/**
 * Delete a banner
 */
export async function deleteBanner(bannerId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User must be authenticated to delete banners');
  }

  // Get banner record to find image path
  const { data: banner, error: fetchError } = await supabase
    .from('generated_assets')
    .select('image_url, user_id')
    .eq('id', bannerId)
    .single();

  if (fetchError) {
    throw new Error(`Failed to fetch banner: ${fetchError.message}`);
  }

  // Verify ownership
  if (banner.user_id !== user.id) {
    throw new Error('You do not have permission to delete this banner');
  }

  // Extract file path from URL
  const urlParts = banner.image_url.split('/');
  const filePath = `banners/${user.id}/${urlParts[urlParts.length - 1]}`;

  // Delete from storage
  const { error: storageError } = await supabase.storage
    .from('generated-assets')
    .remove([filePath]);

  if (storageError) {
    console.error('[BannerStorage] Storage deletion error:', storageError);
  }

  // Delete from database
  const { error: dbError } = await supabase
    .from('generated_assets')
    .delete()
    .eq('id', bannerId)
    .eq('user_id', user.id);

  if (dbError) {
    throw new Error(`Failed to delete banner: ${dbError.message}`);
  }
}
