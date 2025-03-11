/**
 * Utility functions for converting to and from WebP format
 */

import { ImageFormat } from '../formatUtils';

/**
 * Convert any image file to WebP format
 * @param file The image file to convert
 * @returns A Promise that resolves to a Blob containing the converted WebP
 */
export async function convertToWebp(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Create a canvas element to draw the image
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the image on the canvas
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        // Draw the image
        ctx.drawImage(img, 0, 0);
        
        // Convert to WebP blob
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to convert to WebP'));
          }
        }, 'image/webp', 0.92); // 0.92 is a good quality setting
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      // Set the image source to the file data
      img.src = event.target?.result as string;
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    // Read the file as a data URL
    reader.readAsDataURL(file);
  });
}

/**
 * Convert a WebP file to another format
 * @param file The WebP file to convert
 * @param targetFormat The target format to convert to
 * @returns A Promise that resolves to a Blob containing the converted image
 */
export async function convertFromWebp(file: File, targetFormat: ImageFormat): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Create a canvas element to draw the image
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the image on the canvas
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        
        // For JPEG, fill with white background since it doesn't support transparency
        if (targetFormat === 'jpeg' || targetFormat === 'jpg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        // Draw the image
        ctx.drawImage(img, 0, 0);
        
        // Determine the MIME type based on the target format
        let mimeType = 'image/png'; // Default
        let quality = undefined;
        
        switch (targetFormat) {
          case 'jpeg':
          case 'jpg':
            mimeType = 'image/jpeg';
            quality = 0.92;
            break;
          case 'png':
            mimeType = 'image/png';
            break;
          case 'gif':
            mimeType = 'image/gif';
            break;
          case 'bmp':
            mimeType = 'image/bmp';
            break;
          // Other formats will use the default (PNG)
        }
        
        // Convert to the target format
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error(`Failed to convert WebP to ${targetFormat.toUpperCase()}`));
          }
        }, mimeType, quality);
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      // Set the image source to the file data
      img.src = event.target?.result as string;
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    // Read the file as a data URL
    reader.readAsDataURL(file);
  });
} 