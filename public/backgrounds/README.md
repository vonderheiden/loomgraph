# Background Images

This folder contains preset background images for the banner generator.

## Required Images

Please add the following images to this folder:

### Road Images
1. **road-1.jpg** - Desert road with mountains (1200x627px recommended)
2. **road-2.jpg** - Autumn road with trees (1200x627px recommended)
3. **road-3.jpg** - Highway road (1200x627px recommended)

### Optional Thumbnails (for faster loading)
- **road-1-thumb.jpg** - Thumbnail version (300x157px)
- **road-2-thumb.jpg** - Thumbnail version (300x157px)
- **road-3-thumb.jpg** - Thumbnail version (300x157px)

## Image Guidelines

- **Dimensions**: 1200x627px (LinkedIn banner size)
- **Format**: JPG or PNG
- **File size**: Keep under 500KB for fast loading
- **Content**: Professional, high-quality images with good contrast for text overlay

## Adding More Images

To add more preset images, edit `src/constants/backgrounds.ts` and add new entries to the `BACKGROUND_OPTIONS` array.

## Migration to Supabase

This folder structure is designed for easy migration to Supabase Storage:
1. Upload images to Supabase Storage bucket
2. Update `src/constants/backgrounds.ts` to fetch from Supabase
3. Replace local paths with Supabase public URLs

The code is already structured to support this migration with minimal changes.
