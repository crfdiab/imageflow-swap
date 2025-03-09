
export type ImageFormat = 'png' | 'jpg' | 'jpeg' | 'webp' | 'avif' | 'gif' | 'svg' | 'bmp' | 'ico';

export const IMAGE_FORMATS: ImageFormat[] = ['png', 'jpg', 'jpeg', 'webp', 'avif', 'gif', 'svg', 'bmp', 'ico'];

// Normalize format for consistent usage (e.g., jpg and jpeg are treated as the same)
export const normalizeFormat = (format: string): ImageFormat => {
  const normalized = format.toLowerCase().trim() as ImageFormat;
  if (normalized === 'jpg') return 'jpeg';
  if (IMAGE_FORMATS.includes(normalized)) return normalized;
  throw new Error(`Unsupported image format: ${format}`);
};

// Check if a file extension is supported
export const isSupportedFormat = (extension: string): boolean => {
  try {
    normalizeFormat(extension);
    return true;
  } catch {
    return false;
  }
};

// Generate all permutations of format conversions
export const generateConversionPairs = (): { source: ImageFormat, target: ImageFormat }[] => {
  const uniqueFormats = Array.from(new Set(IMAGE_FORMATS))
    .filter(format => format !== 'jpeg') // Filter out jpeg as we treat jpg and jpeg as the same
    .concat(['jpeg']); // Add jpeg back to ensure it's included
  
  const pairs: { source: ImageFormat, target: ImageFormat }[] = [];
  
  uniqueFormats.forEach(source => {
    uniqueFormats.forEach(target => {
      if (source !== target) {
        // Normalize both formats to handle jpg/jpeg equivalence
        const normalizedSource = normalizeFormat(source);
        const normalizedTarget = normalizeFormat(target);
        
        // Only add if the normalized pair doesn't exist yet
        const pairExists = pairs.some(
          pair => 
            normalizeFormat(pair.source) === normalizedSource && 
            normalizeFormat(pair.target) === normalizedTarget
        );
        
        if (!pairExists) {
          pairs.push({ source, target });
        }
      }
    });
  });
  
  return pairs;
};

// Get related converters for a given source format
export const getRelatedConverters = (sourceFormat: ImageFormat): { source: ImageFormat, target: ImageFormat }[] => {
  const normalized = normalizeFormat(sourceFormat);
  return generateConversionPairs().filter(pair => normalizeFormat(pair.source) === normalized);
};

// Generate URL slug from format pair
export const formatToSlug = (source: ImageFormat, target: ImageFormat): string => {
  return `${source.toLowerCase()}-${target.toLowerCase()}`;
};

// Parse source and target format from URL slug
export const slugToFormat = (slug: string): { source: ImageFormat, target: ImageFormat } | null => {
  const parts = slug.split('-');
  if (parts.length !== 2) return null;
  
  try {
    return {
      source: normalizeFormat(parts[0]),
      target: normalizeFormat(parts[1])
    };
  } catch {
    return null;
  }
};
