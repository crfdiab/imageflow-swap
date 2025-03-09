
import { toast } from "@/components/ui/use-toast";
import { ImageFormat, isSupportedFormat, normalizeFormat } from "./formatUtils";

// Get file extension from File object
export const getFileExtension = (file: File): string => {
  const fileName = file.name || '';
  const lastDotIndex = fileName.lastIndexOf('.');
  
  if (lastDotIndex === -1) {
    // Try to determine type from mime type if no extension
    const mimeType = file.type;
    if (mimeType.startsWith('image/')) {
      return mimeType.split('/')[1];
    }
    return '';
  }
  
  return fileName.slice(lastDotIndex + 1).toLowerCase();
};

// Detect image format from File object
export const detectImageFormat = async (file: File): Promise<ImageFormat | null> => {
  // First try by file extension
  const fileExtension = getFileExtension(file);
  if (fileExtension && isSupportedFormat(fileExtension)) {
    try {
      return normalizeFormat(fileExtension);
    } catch {
      // If normalization fails, continue to check by content
    }
  }
  
  // If extension check fails, try by mime type
  if (file.type.startsWith('image/')) {
    const mimeFormat = file.type.split('/')[1];
    if (isSupportedFormat(mimeFormat)) {
      try {
        return normalizeFormat(mimeFormat);
      } catch {
        // Continue to more detailed checks
      }
    }
  }
  
  // If both extension and mime type methods fail, try a more detailed check
  // by examining file headers or content signatures (a simplified version here)
  try {
    const buffer = await file.arrayBuffer();
    const arr = new Uint8Array(buffer.slice(0, 12));
    
    // Check file signatures (magic numbers)
    // PNG: 89 50 4E 47 0D 0A 1A 0A
    if (arr[0] === 0x89 && arr[1] === 0x50 && arr[2] === 0x4E && arr[3] === 0x47) {
      return 'png';
    }
    
    // JPEG: FF D8 FF
    if (arr[0] === 0xFF && arr[1] === 0xD8 && arr[2] === 0xFF) {
      return 'jpeg';
    }
    
    // GIF: 47 49 46 38
    if (arr[0] === 0x47 && arr[1] === 0x49 && arr[2] === 0x46 && arr[3] === 0x38) {
      return 'gif';
    }
    
    // WEBP: 52 49 46 46 ?? ?? ?? ?? 57 45 42 50
    if (arr[0] === 0x52 && arr[1] === 0x49 && arr[2] === 0x46 && arr[3] === 0x46 && 
        arr[8] === 0x57 && arr[9] === 0x45 && arr[10] === 0x42 && arr[11] === 0x50) {
      return 'webp';
    }
    
    // BMP: 42 4D
    if (arr[0] === 0x42 && arr[1] === 0x4D) {
      return 'bmp';
    }
    
    // AVIF & other formats would need more complex detection
  } catch (error) {
    console.error("Error in format detection:", error);
  }
  
  return null;
};

// Convert image to target format using Canvas API
export const convertImage = async (
  file: File, 
  targetFormat: ImageFormat
): Promise<{ url: string; blob: Blob } | null> => {
  try {
    // Create image element and load the file
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas with the same dimensions as the image
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw the image on the canvas
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          toast({
            title: "Conversion failed",
            description: "Could not create canvas context",
            variant: "destructive"
          });
          reject(new Error("Could not create canvas context"));
          return;
        }
        
        ctx.drawImage(img, 0, 0);
        
        // Convert to the target format
        let mimeType: string;
        let quality = 0.92;
        
        switch(targetFormat) {
          case 'jpeg':
          case 'jpg':
            mimeType = 'image/jpeg';
            break;
          case 'png':
            mimeType = 'image/png';
            break;
          case 'webp':
            mimeType = 'image/webp';
            quality = 0.85; // WebP works well with slightly lower quality
            break;
          case 'avif':
            // AVIF may not be supported in all browsers
            mimeType = 'image/avif';
            quality = 0.8;
            break;
          case 'bmp':
            mimeType = 'image/bmp';
            break;
          default:
            toast({
              title: "Format not supported",
              description: `Conversion to ${targetFormat} is not supported by your browser`,
              variant: "destructive"
            });
            reject(new Error(`Conversion to ${targetFormat} is not supported`));
            return;
        }
        
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error(`Failed to create blob in ${targetFormat} format`));
              return;
            }
            
            const url = URL.createObjectURL(blob);
            resolve({ url, blob });
          },
          mimeType,
          quality
        );
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      // Set source to the file
      img.src = URL.createObjectURL(file);
    });
  } catch (error) {
    console.error("Error in image conversion:", error);
    toast({
      title: "Conversion failed",
      description: error instanceof Error ? error.message : "Unknown error occurred",
      variant: "destructive"
    });
    return null;
  }
};
