import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Upload, Download, File, ImageIcon, RefreshCw, X, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { detectImageFormat, convertImage } from "@/utils/imageUtils";
import { formatToSlug, ImageFormat, normalizeFormat, slugToFormat } from "@/utils/formatUtils";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export function ConversionArea() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [formats, setFormats] = useState<{ source: ImageFormat; target: ImageFormat } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [convertedImages, setConvertedImages] = useState<{ file: File; url: string; blob: Blob }[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [conversionTime, setConversionTime] = useState<number | null>(null);
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
    setConversionProgress(0);
    setConversionTime(null);
    setConvertedImages([]);
    
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
    
    setUploadedFiles(files);
    
    // Auto-convert immediately after upload
    await convertImageFiles(files, formats.target);
  };
  
  // Convert multiple images to the target format
  const convertImageFiles = async (files: File[], targetFormat: ImageFormat) => {
    setIsConverting(true);
    setConvertedImages([]);
    
    const startTime = performance.now();
    const results: { file: File; url: string; blob: Blob }[] = [];
    
    try {
      // Process each file sequentially
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Update progress based on file index
        const fileProgress = (i / files.length) * 100;
        setConversionProgress(fileProgress);
        
        // Convert the current file
        const result = await convertImage(file, targetFormat);
        
        if (result) {
          results.push({ file, ...result });
        }
      }
      
      setConversionProgress(100);
      setConvertedImages(results);
      
      const endTime = performance.now();
      const timeTaken = Math.round((endTime - startTime) / 10) / 100; // Convert to seconds with 2 decimal places
      setConversionTime(timeTaken);
      
      toast({
        title: "Conversion Successful",
        description: `${results.length} ${results.length === 1 ? 'image' : 'images'} converted to ${targetFormat.toUpperCase()} format in ${timeTaken}s`,
      });
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsConverting(false);
    }
  };
  
  // Download all converted images as a zip file
  const handleDownloadAll = async () => {
    if (!convertedImages.length || !formats) return;
    
    // If only one image, download it directly
    if (convertedImages.length === 1) {
      const { url, file } = convertedImages[0];
      const link = document.createElement('a');
      link.href = url;
      link.download = `${file.name.split('.')[0]}.${formats.target}`;
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
      convertedImages.forEach(({ blob, file }, index) => {
        const fileName = `${file.name.split('.')[0]}.${formats.target}`;
        zip.file(fileName, blob);
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
        description: `Your ${convertedImages.length} converted images are being downloaded as a zip file`,
      });
    } catch (error) {
      console.error('Error creating zip file:', error);
      toast({
        title: "Download failed",
        description: "Failed to create zip file. Try downloading images individually.",
        variant: "destructive"
      });
      
      // Fallback: download images individually
      convertedImages.forEach(({ url, file }) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = `${file.name.split('.')[0]}.${formats?.target}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  };
  
  // Download a single converted image
  const handleDownloadSingle = (index: number) => {
    if (!convertedImages[index] || !formats) return;
    
    const { url, file } = convertedImages[index];
    const link = document.createElement('a');
    link.href = url;
    link.download = `${file.name.split('.')[0]}.${formats.target}`;
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
    uploadedFiles.forEach(file => {
      URL.revokeObjectURL(URL.createObjectURL(file));
    });
    
    convertedImages.forEach(({ url }) => {
      URL.revokeObjectURL(url);
    });
    
    setUploadedFiles([]);
    setConvertedImages([]);
    setConversionProgress(0);
    setConversionTime(null);
    
    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Remove a single file from the batch
  const handleRemoveFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
    
    // Also remove the corresponding converted image if it exists
    if (convertedImages[index]) {
      const newConvertedImages = [...convertedImages];
      URL.revokeObjectURL(newConvertedImages[index].url);
      newConvertedImages.splice(index, 1);
      setConvertedImages(newConvertedImages);
    }
    
    // If all files are removed, reset the component
    if (newFiles.length === 0) {
      handleReset();
    }
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
    if (!uploadedFiles.length || !convertedImages.length) return '0%';
    
    const originalSize = uploadedFiles.reduce((sum, file) => sum + file.size, 0);
    const convertedSize = convertedImages.reduce((sum, { blob }) => sum + blob.size, 0);
    
    return (100 - (convertedSize / originalSize * 100)).toFixed(1) + '%';
  };
  
  // Show placeholder or conversion UI based on upload state
  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-8 pb-4 animate-fade-in">
      {/* Conversion title and description */}
      {formats && (
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Convert {formats.source.toUpperCase()} to {formats.target.toUpperCase()}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload your {formats.source.toUpperCase()} images and we'll convert them to {formats.target.toUpperCase()} format
            with the highest quality and smallest file size. Process up to 50 files at once!
          </p>
        </div>
      )}
      
      {/* File upload area */}
      {!uploadedFiles.length ? (
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
              <h3 className="text-xl font-semibold">
                Drag and Drop Your Images Here
              </h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                or click the button below to browse your files (up to 50 images at once)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
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
                Choose Files
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
                {uploadedFiles.length} {uploadedFiles.length === 1 ? 'image' : 'images'} selected
              </h3>
              <p className="text-sm text-muted-foreground">
                Total size: {(uploadedFiles.reduce((sum, file) => sum + file.size, 0) / 1024).toFixed(1)} KB
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleReset}
                aria-label="Upload different images"
              >
                Upload Different Images
              </Button>
              
              {convertedImages.length > 0 && (
                <Button 
                  onClick={handleDownloadAll}
                  disabled={isConverting}
                  aria-label="Download all converted images"
                >
                  <Download size={16} className="mr-2" aria-hidden="true" />
                  Download All
                </Button>
              )}
            </div>
          </div>
          
          {/* Conversion progress */}
          {isConverting && (
            <div className="space-y-2 bg-card p-4 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Converting images...</span>
                <span className="text-sm">{Math.round(conversionProgress)}%</span>
              </div>
              <Progress value={conversionProgress} className="h-2" />
            </div>
          )}
          
          {/* Conversion stats */}
          {conversionTime !== null && convertedImages.length > 0 && (
            <div className="bg-card p-4 rounded-lg text-center">
              <p className="text-sm">
                Converted {convertedImages.length} {convertedImages.length === 1 ? 'image' : 'images'} in {conversionTime} seconds
                • Average size reduction: {calculateSizeReduction()}
              </p>
            </div>
          )}
          
          {/* File grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {uploadedFiles.map((file, index) => (
              <Card key={`${file.name}-${index}`} className="p-4 glass-card relative">
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-6 w-6 absolute top-2 right-2 z-10"
                  onClick={() => handleRemoveFile(index)}
                  aria-label="Remove file"
                >
                  <X size={12} />
                </Button>
                
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 truncate pr-8">
                    <FileImage size={16} aria-hidden="true" />
                    <span className="text-sm font-medium truncate" title={file.name}>
                      {file.name}
                    </span>
                  </div>
                </div>
                
                <div className="relative border border-border rounded-md aspect-square flex items-center justify-center overflow-hidden mb-2">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Original ${formats?.source.toUpperCase()} image`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                
                <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
                  <span>Original: {(file.size / 1024).toFixed(1)} KB</span>
                  {convertedImages[index] && (
                    <span>Converted: {(convertedImages[index].blob.size / 1024).toFixed(1)} KB</span>
                  )}
                </div>
                
                {convertedImages[index] ? (
                  <Button 
                    size="sm"
                    className="w-full"
                    onClick={() => handleDownloadSingle(index)}
                    aria-label={`Download converted ${formats?.target.toUpperCase()} image`}
                  >
                    <Download size={14} className="mr-2" aria-hidden="true" />
                    Download
                  </Button>
                ) : (
                  <div className="h-9 flex items-center justify-center">
                    {isConverting ? (
                      <span className="text-xs text-muted-foreground flex items-center">
                        <RefreshCw size={14} className="animate-spin mr-2" aria-hidden="true" />
                        Converting...
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        Waiting for conversion...
                      </span>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
