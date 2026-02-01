import { pb } from '../lib/pocketbase';
import type { GeneratedAsset } from '../lib/pocketbase';
import type { BannerState } from '../types/banner.types';

export interface SaveBannerParams {
  title: string;
  dimension: 'landscape' | 'square' | 'portrait';
  imageBlob: Blob;
  bannerState: BannerState;
}

export interface SavedBanner {
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

/**
 * Save a banner to PocketBase storage and database
 */
export async function saveBanner(params: SaveBannerParams): Promise<SavedBanner> {
  const { title, imageBlob, bannerState } = params;

  // Get current user
  if (!pb.authStore.isValid || !pb.authStore.model) {
    throw new Error('User must be authenticated to save banners');
  }

  const userId = pb.authStore.model.id;

  // Generate unique filename
  const timestamp = Date.now();
  const filename = `banner-${userId}-${timestamp}.png`;

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

  // Create FormData for file upload
  const formData = new FormData();
  formData.append('user', userId);
  formData.append('asset_type', 'webinar_banner');
  formData.append('template_id', bannerState.template);
  formData.append('content', JSON.stringify(metadata));
  formData.append('title_preview', title || 'Untitled Banner');
  formData.append('image', new File([imageBlob], filename, { type: 'image/png' }));

  try {
    // Create record with file upload
    const record = await pb.collection('generated_assets').create<GeneratedAsset>(formData);
    
    console.log('[BannerStorage] Banner saved successfully:', record.id);
    return record as SavedBanner;
  } catch (error) {
    console.error('[BannerStorage] Save error:', error);
    throw new Error(`Failed to save banner: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get all banners for the current user
 */
export async function getUserBanners(): Promise<SavedBanner[]> {
  if (!pb.authStore.isValid || !pb.authStore.model) {
    throw new Error('User must be authenticated to retrieve banners');
  }

  const userId = pb.authStore.model.id;

  try {
    const records = await pb.collection('generated_assets').getFullList<GeneratedAsset>({
      filter: `user = "${userId}" && asset_type = "webinar_banner"`,
      sort: '-created'
    });

    return records as SavedBanner[];
  } catch (error) {
    console.error('[BannerStorage] Fetch error:', error);
    throw new Error(`Failed to fetch banners: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Delete a banner
 */
export async function deleteBanner(bannerId: string): Promise<void> {
  if (!pb.authStore.isValid || !pb.authStore.model) {
    throw new Error('User must be authenticated to delete banners');
  }

  const userId = pb.authStore.model.id;

  try {
    // Get banner record to verify ownership
    const banner = await pb.collection('generated_assets').getOne<GeneratedAsset>(bannerId);

    // Verify ownership
    if (banner.user !== userId) {
      throw new Error('You do not have permission to delete this banner');
    }

    // Delete record (PocketBase automatically deletes associated files)
    await pb.collection('generated_assets').delete(bannerId);
    
    console.log('[BannerStorage] Banner deleted successfully:', bannerId);
  } catch (error) {
    console.error('[BannerStorage] Delete error:', error);
    throw new Error(`Failed to delete banner: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get the URL for a banner image
 */
export function getBannerImageUrl(record: SavedBanner): string {
  return pb.files.getUrl(record, record.image);
}
