import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Upload, Download, File, ImageIcon, RefreshCw, X, FileImage, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { detectImageFormat, convertImage } from "@/utils/imageUtils";
import { formatToSlug, ImageFormat, normalizeFormat, slugToFormat } from "@/utils/formatUtils";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

// Import conversion functions
import { convertPngToJpeg, convertJpegToPng } from "@/utils/converters/pngJpegConverter";
import { convertToWebp, convertFromWebp } from "@/utils/converters/webpConverter";
import { convertToAvif, convertFromAvif } from "@/utils/converters/avifConverter";
import { convertToGif, convertFromGif } from "@/utils/converters/gifConverter";
import { convertToSvg, convertFromSvg } from "@/utils/converters/svgConverter";
import { convertToBmp, convertFromBmp } from "@/utils/converters/bmpConverter";
import { convertToIco, convertFromIco } from "@/utils/converters/icoConverter";

// Define the structure for a conversion result
interface ConversionResult {
  id: string;
  originalFile: File;
  convertedBlob: Blob | null;
  convertedUrl: string;
  status: 'waiting' | 'converting' | 'completed' | 'failed';
  originalSize: number;
  convertedSize: number | null;
}

export function ConversionArea() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [formats, setFormats] = useState<{ source: ImageFormat; target: ImageFormat } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<ConversionResult[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [conversionStats, setConversionStats] = useState<{
    time: number;
    count: number;
    sizeReduction: number;
  } | null>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Maximum number of files allowed
  const MAX_FILES = 50;
  
  // Parse slug to get source and target formats
  useEffect(() => {
    if (slug) {
      const parsed = slugToFormat(slug);
      if (parsed) {
        setFormats(parsed);
      } else {
        // Default to png-jpeg if invalid slug
        navigate("/png-jpeg", { replace: true });
      }
    } else {
      // Default when no slug provided
      navigate("/png-jpeg", { replace: true });
    }
  }, [slug, navigate]);
  
  // Handle file drop
  const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (!e.dataTransfer.files.length) return;
    
    // Filter for image files only
    const imageFiles = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (imageFiles.length === 0) {
      toast({
        title: "Invalid file type",
        description: "Please upload image files only",
        variant: "destructive"
      });
      return;
    }
    
    // Limit to MAX_FILES
    const filesToProcess = imageFiles.slice(0, MAX_FILES);
    
    if (imageFiles.length > MAX_FILES) {
      toast({
        title: "Too many files",
        description: `Only the first ${MAX_FILES} images will be processed`,
        variant: "default"
      });
    }
    
    handleImageFiles(filesToProcess);
  }, []);
  
  // Handle file selection through file input
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    // Filter for image files only
    const imageFiles = Array.from(e.target.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (imageFiles.length === 0) {
      toast({
        title: "Invalid file type",
        description: "Please upload image files only",
        variant: "destructive"
      });
      return;
    }
    
    // Limit to MAX_FILES
    const filesToProcess = imageFiles.slice(0, MAX_FILES);
    
    if (imageFiles.length > MAX_FILES) {
      toast({
        title: "Too many files",
        description: `Only the first ${MAX_FILES} images will be processed`,
        variant: "default"
      });
    }
    
    handleImageFiles(filesToProcess);
  };
  
  // Common file handling logic for multiple files
  const handleImageFiles = async (files: File[]) => {
    // Reset states
    setProgress(0);
    setConversionStats(null);
    setFiles([]);
    
    // If formats aren't loaded yet, wait
    if (!formats) return;
    
    // Check format of first file to determine if we need to redirect
    if (files.length > 0) {
      const firstFile = files[0];
      const detectedFormat = await detectImageFormat(firstFile);
    
    if (!detectedFormat) {
      toast({
        title: "Format detection failed",
        description: "Unable to determine the image format",
        variant: "destructive"
      });
      return;
    }
    
    // If detected format doesn't match the expected source format, redirect
    if (normalizeFormat(detectedFormat) !== normalizeFormat(formats.source)) {
      const newSlug = formatToSlug(detectedFormat, formats.target);
      
      toast({
        title: "Redirecting to correct converter",
        description: `Detected ${detectedFormat.toUpperCase()} format, redirecting to the appropriate converter`,
      });
      
      navigate(`/${newSlug}`, { replace: true });
      return;
    }
    }
    
    // Create new files with waiting status
    const newFiles: ConversionResult[] = files.map(file => ({
      id: Math.random().toString(36).substring(2, 9),
      originalFile: file,
      convertedBlob: null,
      convertedUrl: '',
      status: 'waiting',
      originalSize: file.size,
      convertedSize: null
    }));
    
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
    
    // Auto-convert immediately after upload
    await convertFiles();
  };
  
  // Function to convert files
  const convertFiles = useCallback(async () => {
    if (!formats || files.length === 0 || isConverting) return;
    
    setIsConverting(true);
    setProgress(0);
    
    const startTime = performance.now();
    let totalProcessed = 0;
    let totalSizeReduction = 0;
    
    // Create a copy of files to update
    const updatedFiles = [...files];
    
    for (let i = 0; i < updatedFiles.length; i++) {
      const file = updatedFiles[i];
      
      // Skip already converted files
      if (file.status === 'completed') {
        continue;
      }
      
      // Update status to converting
      file.status = 'converting';
      setFiles([...updatedFiles]);
      
      try {
        // Choose the appropriate conversion function based on formats
        let convertedBlob: Blob | null = null;
        
        const { source, target } = formats;
        
        if (source === 'png' && target === 'jpeg') {
          convertedBlob = await convertPngToJpeg(file.originalFile);
        } else if (source === 'jpeg' && target === 'png') {
          convertedBlob = await convertJpegToPng(file.originalFile);
        } else if (target === 'webp') {
          convertedBlob = await convertToWebp(file.originalFile);
        } else if (source === 'webp') {
          convertedBlob = await convertFromWebp(file.originalFile, target);
        } else if (target === 'avif') {
          convertedBlob = await convertToAvif(file.originalFile);
        } else if (source === 'avif') {
          convertedBlob = await convertFromAvif(file.originalFile, target);
        } else if (target === 'gif') {
          convertedBlob = await convertToGif(file.originalFile);
        } else if (source === 'gif') {
          convertedBlob = await convertFromGif(file.originalFile, target);
        } else if (target === 'svg') {
          convertedBlob = await convertToSvg(file.originalFile);
        } else if (source === 'svg') {
          convertedBlob = await convertFromSvg(file.originalFile, target);
        } else if (target === 'bmp') {
          convertedBlob = await convertToBmp(file.originalFile);
        } else if (source === 'bmp') {
          convertedBlob = await convertFromBmp(file.originalFile, target);
        } else if (target === 'ico') {
          convertedBlob = await convertToIco(file.originalFile);
        } else if (source === 'ico') {
          convertedBlob = await convertFromIco(file.originalFile, target);
        }
        
        if (convertedBlob) {
          // Create object URL for the converted blob
          const convertedUrl = URL.createObjectURL(convertedBlob);
          
          // Update file with conversion result
          file.convertedBlob = convertedBlob;
          file.convertedUrl = convertedUrl;
          file.status = 'completed';
          file.convertedSize = convertedBlob.size;
          
          // Calculate size reduction
          const sizeReduction = file.originalSize - convertedBlob.size;
          totalSizeReduction += sizeReduction;
        } else {
          file.status = 'failed';
        }
      } catch (error) {
        console.error('Conversion error:', error);
        file.status = 'failed';
      }
      
      totalProcessed++;
      setProgress(Math.round((totalProcessed / updatedFiles.length) * 100));
      setFiles([...updatedFiles]);
    }
    
    const endTime = performance.now();
    const conversionTime = ((endTime - startTime) / 1000).toFixed(2);
    
    // Calculate average size reduction percentage
    const successfulConversions = updatedFiles.filter(file => file.status === 'completed');
    const averageSizeReduction = successfulConversions.length > 0 
      ? Math.round((totalSizeReduction / totalProcessed) / 1024) // KB
      : 0;
    
    setConversionStats({
      time: parseFloat(conversionTime),
      count: totalProcessed,
      sizeReduction: averageSizeReduction
    });
    
    setIsConverting(false);
  }, [formats, files, isConverting]);
  
  // Auto-convert files when they are added
  useEffect(() => {
    if (files.length > 0 && !isConverting && files.some(file => file.status === 'waiting')) {
      convertFiles();
    }
  }, [files, isConverting, convertFiles]);
  
  // Download all converted images as a zip file
  const handleDownloadAll = async () => {
    if (!files.length || !formats) return;
    
    // If only one image, download it directly
    if (files.length === 1) {
      const { convertedUrl, originalFile } = files[0];
      const link = document.createElement('a');
      link.href = convertedUrl;
      link.download = `${originalFile.name.split('.')[0]}.${formats.target}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download started",
        description: "Your converted image is being downloaded",
      });
      return;
    }
    
    // For multiple images, use JSZip to create a zip file
    try {
      // Dynamically import JSZip
      const JSZip = (await import('jszip')).default;
      const zip = new JSZip();
      
      // Add each image to the zip
      files.forEach(({ convertedBlob, originalFile }, index) => {
        const fileName = `${originalFile.name.split('.')[0]}.${formats.target}`;
        zip.file(fileName, convertedBlob);
      });
      
      // Generate the zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      
      // Create download link
      const link = document.createElement('a');
      link.href = URL.createObjectURL(zipBlob);
      link.download = `convertify-${formats.source}-to-${formats.target}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
        
        toast({
        title: "Download started",
        description: `Your ${files.length} converted images are being downloaded as a zip file`,
        });
    } catch (error) {
      console.error('Error creating zip file:', error);
      toast({
        title: "Download failed",
        description: "Failed to create zip file. Try downloading images individually.",
        variant: "destructive"
      });
      
      // Fallback: download images individually
      files.forEach(({ convertedUrl, originalFile }) => {
        const link = document.createElement('a');
        link.href = convertedUrl;
        link.download = `${originalFile.name.split('.')[0]}.${formats?.target}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  };
  
  // Download a single converted image
  const handleDownloadSingle = (index: number) => {
    if (!files[index] || !formats) return;
    
    const { convertedUrl, originalFile } = files[index];
    const link = document.createElement('a');
    link.href = convertedUrl;
    link.download = `${originalFile.name.split('.')[0]}.${formats.target}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: "Your converted image is being downloaded",
    });
  };
  
  // Clear the current images and reset state
  const handleReset = () => {
    // Revoke object URLs to prevent memory leaks
    files.forEach(file => {
      if (file.convertedUrl) {
        URL.revokeObjectURL(file.convertedUrl);
      }
    });
    setFiles([]);
    setConversionStats(null);
    
    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Remove a single file from the batch
  const handleRemoveFile = (id: string) => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
  };
  
  // Drag event handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  // Trigger file upload dialog
  const triggerFileInput = (e: React.MouseEvent) => {
    // Stop propagation to prevent the card's onClick from firing
    e.stopPropagation();
    fileInputRef.current?.click();
  };
  
  // Calculate total size reduction
  const calculateSizeReduction = () => {
    if (!files.length || !files.some(file => file.status === 'completed')) return '0%';
    
    const originalSize = files.reduce((sum, file) => sum + file.originalSize, 0);
    const convertedSize = files.reduce((sum, file) => sum + (file.status === 'completed' ? file.convertedSize : 0), 0);
    
    return (100 - (convertedSize / originalSize * 100)).toFixed(1) + '%';
  };
  
  // If no formats, don't render
  if (!formats) return null;
  
  const { source, target } = formats;
  const hasCompletedFiles = files.some(file => file.status === 'completed');
  const allFilesCompleted = files.length > 0 && files.every(file => file.status === 'completed' || file.status === 'failed');
  
  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-8 pb-4 animate-fade-in">
      {/* Conversion title and description */}
      {formats && (
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {t('common.convert')} {source.toUpperCase()} {t('common.to')} {target.toUpperCase()}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('common.uploadDescription')}
          </p>
        </div>
      )}
      
      {/* File upload area */}
      {!files.length ? (
        <div>
        <Card
          ref={dropAreaRef}
          className={cn(
            "border-2 border-dashed p-12 text-center transition-all duration-200 glass-card",
            isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-background/80"
          )}
          onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          aria-label="Drop zone for image upload"
          role="region"
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="p-6 rounded-full bg-primary/10 text-primary">
              <Upload size={36} aria-hidden="true" />
            </div>
              <h2 className="text-xl font-semibold">
                {t('common.dragAndDrop')}
              </h2>
            <p className="text-muted-foreground mb-4 max-w-md">
                {t('common.uploadLimit')}
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept={`.${source}`}
                multiple
              className="hidden"
              onChange={handleFileSelect}
              aria-label="File input for image upload"
            />
            <Button 
              onClick={triggerFileInput} 
              size="lg" 
              className="font-medium"
              aria-label="Browse files"
            >
                {t('common.chooseFiles')}
            </Button>
          </div>
        </Card>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Batch info and controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-card p-4 rounded-lg">
            <div>
              <h3 className="font-medium">
                {files.length} {files.length === 1 ? 'image' : 'images'} selected
              </h3>
              <p className="text-sm text-muted-foreground">
                Total size: {(files.reduce((sum, file) => sum + file.originalSize, 0) / 1024).toFixed(1)} KB
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleReset} 
                aria-label="Upload different images"
              >
                {t('common.uploadDifferent')}
              </Button>
              
              {hasCompletedFiles && (
                <Button 
                  onClick={handleDownloadAll}
                  disabled={isConverting}
                  aria-label="Download all converted images"
                >
                  <Download size={16} className="mr-2" aria-hidden="true" />
                  {t('common.downloadAll')}
                </Button>
              )}
            </div>
          </div>
          
          {/* Conversion progress */}
          {isConverting && (
            <div className="space-y-2 bg-card p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{t('common.converting')}</span>
                <span className="text-sm">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}
          
          {/* Conversion stats */}
          {conversionStats && (
            <div className="bg-card p-4 rounded-lg text-center">
              <p className="text-sm">
                {t('common.conversionStats', {
                  count: conversionStats.count,
                  time: conversionStats.time,
                  reduction: conversionStats.sizeReduction > 0 
                    ? `${conversionStats.sizeReduction} KB` 
                    : t('common.noReduction')
                })}
              </p>
            </div>
          )}
          
          {/* File grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {files.map((file, index) => (
              <Card key={file.id} className="p-4 glass-card relative">
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-6 w-6 absolute top-2 right-2 z-10"
                  onClick={() => handleRemoveFile(file.id)}
                  aria-label="Remove file"
                >
                  <X size={12} />
                </Button>
                
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 truncate pr-8">
                    <FileImage size={16} aria-hidden="true" />
                    <span className="text-sm font-medium truncate" title={file.originalFile.name}>
                      {file.originalFile.name}
                    </span>
                  </div>
                </div>
                
                <div className="relative border border-border rounded-md aspect-square flex items-center justify-center overflow-hidden mb-2">
                <img
                    src={URL.createObjectURL(file.originalFile)}
                    alt={`Original ${source.toUpperCase()} image`}
                  className="max-w-full max-h-full object-contain"
                />
                </div>
                
                <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
                  <span>{t('common.original')}: {(file.originalSize / 1024).toFixed(1)} KB</span>
                  {file.status === 'completed' && (
                    <span>{t('common.converted')}: {(file.convertedSize / 1024).toFixed(1)} KB</span>
              )}
            </div>
            
                {file.status === 'completed' && (
              <Button 
                    size="sm"
                className="w-full"
                    onClick={() => handleDownloadSingle(index)}
                    aria-label={`Download converted ${target.toUpperCase()} image`}
              >
                    <Download size={14} className="mr-2" aria-hidden="true" />
                    {t('common.download')}
              </Button>
                )}
              </Card>
            ))}
            </div>
        </div>
      )}
    </div>
  );
}
