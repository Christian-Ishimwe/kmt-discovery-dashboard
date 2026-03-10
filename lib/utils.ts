import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a Google Drive sharing URL to an embeddable/direct view URL
 * @param url - The Google Drive URL (sharing or already converted)
 * @returns The embeddable URL format or the original URL if not a Google Drive link
 *
 * Examples:
 * Input: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * Output: https://drive.google.com/thumbnail?id=FILE_ID&sz=w1000
 *
 * Note: For public images, use thumbnail endpoint which is more reliable than uc?export=view
 * The sz parameter controls size (w1000 = max width 1000px, use s0 for original size)
 */
export function convertGoogleDriveUrl(url: string): string {
  if (!url || typeof url !== "string") return url;

  // Check if it's already in the thumbnail format
  if (url.includes("drive.google.com/thumbnail?id=")) {
    return url;
  }

  // Extract FILE_ID from various Google Drive URL formats
  const patterns = [
    /drive\.google\.com\/file\/d\/([^\/\?]+)/, // /file/d/FILE_ID/...
    /drive\.google\.com\/open\?id=([^&]+)/, // /open?id=FILE_ID
    /drive\.google\.com\/uc\?.*[?&]id=([^&]+)/, // /uc?...id=FILE_ID
    /drive\.google\.com\/thumbnail\?.*[?&]id=([^&]+)/, // /thumbnail?...id=FILE_ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      // Use thumbnail endpoint with sz=w2000 for high quality or s0 for original
      return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w2000`;
    }
  }

  // If it's not a Google Drive URL, return as is
  return url;
}
