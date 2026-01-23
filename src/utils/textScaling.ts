import { TextScalingOptions } from '../types/banner.types';

/**
 * Calculate the optimal font size for text to fit within a given width
 */
export function calculateFontSize(options: TextScalingOptions): number {
  const { text, maxWidth, maxSize, minSize, fontFamily } = options;

  // Create a temporary canvas for text measurement
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) return minSize;

  let fontSize = maxSize;

  while (fontSize > minSize) {
    ctx.font = `${fontSize}px ${fontFamily}`;
    const metrics = ctx.measureText(text);

    if (metrics.width <= maxWidth) {
      return fontSize;
    }

    fontSize -= 2; // Decrease by 2px increments
  }

  return minSize;
}

/**
 * Measure text width with a given font size
 */
export function measureText(text: string, fontSize: number, fontFamily: string): number {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) return 0;

  ctx.font = `${fontSize}px ${fontFamily}`;
  return ctx.measureText(text).width;
}

/**
 * Truncate text to fit within a maximum width
 */
export function truncateText(
  text: string,
  maxWidth: number,
  fontSize: number,
  fontFamily: string
): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) return text;

  ctx.font = `${fontSize}px ${fontFamily}`;

  if (ctx.measureText(text).width <= maxWidth) {
    return text;
  }

  let truncated = text;
  while (truncated.length > 0 && ctx.measureText(truncated + '...').width > maxWidth) {
    truncated = truncated.slice(0, -1);
  }

  return truncated + '...';
}
