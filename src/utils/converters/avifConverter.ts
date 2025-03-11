/**
 * Utility functions for converting to and from AVIF format
 * Note: AVIF support may be limited in some browsers
 */

import { ImageFormat } from '../formatUtils';

/**
 * Convert any image file to AVIF format
 * @param file The image file to convert
 * @returns A Promise that resolves to a Blob containing the converted AVIF
 */
export async function convertToAvif(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    // Check if browser supports AVIF
    const canvas = document.createElement('canvas');
    if (!canvas.toBlob) {
      reject(new Error('Canvas toBlob not supported in this browser'));
      return;
    }
    
    const testBlob = new Blob(['test'], { type: 'image/avif' });
    if (testBlob.type !== 'image/avif') {
      // Fallback to WebP if AVIF is not supported
      console.warn('AVIF not supported in this browser, falling back to WebP');
      return convertToFallbackFormat(file, 'webp');
    }
    
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Create a canvas element to draw the image
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
        
        // Try to convert to AVIF blob
        try {
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              // Fallback to WebP if AVIF conversion fails
              console.warn('AVIF conversion failed, falling back to WebP');
              convertToFallbackFormat(file, 'webp').then(resolve).catch(reject);
            }
          }, 'image/avif', 0.8); // 0.8 is a good quality setting for AVIF
        } catch (error) {
          // Fallback to WebP if AVIF is not supported
          console.warn('AVIF not supported, falling back to WebP:', error);
          convertToFallbackFormat(file, 'webp').then(resolve).catch(reject);
        }
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
 * Convert an AVIF file to another format
 * @param file The AVIF file to convert
 * @param targetFormat The target format to convert to
 * @returns A Promise that resolves to a Blob containing the converted image
 */
export async function convertFromAvif(file: File, targetFormat: ImageFormat): Promise<Blob> {
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
          case 'webp':
            mimeType = 'image/webp';
            quality = 0.92;
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
            reject(new Error(`Failed to convert AVIF to ${targetFormat.toUpperCase()}`));
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

/**
 * Fallback conversion function when AVIF is not supported
 * @param file The image file to convert
 * @param fallbackFormat The fallback format to use
 * @returns A Promise that resolves to a Blob containing the converted image
 */
async function convertToFallbackFormat(file: File, fallbackFormat: 'webp' | 'png'): Promise<Blob> {
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
        
        // Convert to the fallback format
        const mimeType = fallbackFormat === 'webp' ? 'image/webp' : 'image/png';
        const quality = fallbackFormat === 'webp' ? 0.92 : undefined;
        
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error(`Failed to convert to ${fallbackFormat.toUpperCase()}`));
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