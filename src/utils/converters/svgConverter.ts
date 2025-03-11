/**
 * Utility functions for converting to and from SVG format
 * Note: SVG conversion is limited in browser environments
 */

import { ImageFormat } from '../formatUtils';

/**
 * Convert any image file to SVG format
 * @param file The image file to convert
 * @returns A Promise that resolves to a Blob containing the converted SVG
 */
export async function convertToSvg(file: File): Promise<Blob> {
  // Note: True SVG conversion would require tracing algorithms that are complex
  // This is a simplified version that creates an SVG wrapper around the image
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Get image dimensions
        const width = img.width;
        const height = img.height;
        
        // Create a data URL from the image
        const dataUrl = event.target?.result as string;
        
        // Create an SVG that embeds the original image
        const svgContent = `
          <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
            <image width="${width}" height="${height}" href="${dataUrl}"/>
            <text x="10" y="${height - 10}" font-family="Arial" font-size="12" fill="gray">
              Converted with Convertify
            </text>
          </svg>
        `;
        
        // Create a blob from the SVG content
        const blob = new Blob([svgContent], { type: 'image/svg+xml' });
        resolve(blob);
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
 * Convert an SVG file to another format
 * @param file The SVG file to convert
 * @param targetFormat The target format to convert to
 * @returns A Promise that resolves to a Blob containing the converted image
 */
export async function convertFromSvg(file: File, targetFormat: ImageFormat): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const svgText = event.target?.result as string;
      const img = new Image();
      
      img.onload = () => {
        // Create a canvas element to draw the SVG
        const canvas = document.createElement('canvas');
        
        // Set canvas size to match the SVG
        // For better quality, we can scale up the SVG
        const scale = 2; // Scale factor for better quality
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        
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
        
        // Draw the scaled image
        ctx.scale(scale, scale);
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
          case 'avif':
            mimeType = 'image/avif';
            quality = 0.8;
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
            reject(new Error(`Failed to convert SVG to ${targetFormat.toUpperCase()}`));
          }
        }, mimeType, quality);
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load SVG'));
      };
      
      // Create a Blob URL from the SVG text
      const blob = new Blob([svgText], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      
      // Set the image source to the SVG URL
      img.src = url;
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    // Read the file as text
    reader.readAsText(file);
  });
} 