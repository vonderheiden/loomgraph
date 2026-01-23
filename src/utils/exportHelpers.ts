/**
 * Generate a filename for the exported banner
 */
export function generateFileName(title: string): string {
  const sanitized = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50); // Limit length

  const timestamp = new Date().getTime();
  return sanitized ? `loomgraph-${sanitized}-${timestamp}.png` : `loomgraph-banner-${timestamp}.png`;
}

/**
 * Trigger a download of a blob
 */
export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Format date for display
 */
export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format time for display
 */
export function formatTime(timeStr: string, timezone?: string): string {
  if (!timeStr) return '';
  const [hours, minutes] = timeStr.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  const formattedTime = `${displayHour}:${minutes} ${ampm}`;
  return timezone ? `${formattedTime} ${timezone}` : formattedTime;
}
