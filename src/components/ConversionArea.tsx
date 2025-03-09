
import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Upload, Download, File, ImageIcon, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { detectImageFormat, convertImage } from "@/utils/imageUtils";
import { formatToSlug, ImageFormat, normalizeFormat, slugToFormat } from "@/utils/formatUtils";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export function ConversionArea() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [formats, setFormats] = useState<{ source: ImageFormat; target: ImageFormat } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [convertedImage, setConvertedImage] = useState<{ url: string; blob: Blob } | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState(0);
  const [conversionTime, setConversionTime] = useState<number | null>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
    setIsDragging(false);
    
    if (!e.dataTransfer.files.length) return;
    
    const file = e.dataTransfer.files[0];
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }
    
    handleImageFile(file);
  }, []);
  
  // Handle file selection through file input
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }
    
    handleImageFile(file);
  };
  
  // Common file handling logic
  const handleImageFile = async (file: File) => {
    // Reset states
    setConversionProgress(0);
    setConversionTime(null);
    setConvertedImage(null);
    
    const detectedFormat = await detectImageFormat(file);
    
    if (!detectedFormat) {
      toast({
        title: "Format detection failed",
        description: "Unable to determine the image format",
        variant: "destructive"
      });
      return;
    }
    
    // If formats aren't loaded yet, wait
    if (!formats) return;
    
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
    
    setUploadedFile(file);
    
    // Auto-convert immediately after upload
    await convertImageFile(file, formats.target);
  };
  
  // Convert the image to the target format
  const convertImageFile = async (file: File, targetFormat: ImageFormat) => {
    setIsConverting(true);
    setConvertedImage(null);
    
    const startTime = performance.now();
    
    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setConversionProgress(prev => {
          const newProgress = prev + (Math.random() * 10);
          return newProgress >= 90 ? 90 : newProgress;
        });
      }, 100);
      
      const result = await convertImage(file, targetFormat);
      
      clearInterval(progressInterval);
      setConversionProgress(100);
      
      if (result) {
        setConvertedImage(result);
        const endTime = performance.now();
        const timeTaken = Math.round((endTime - startTime) / 10) / 100; // Convert to seconds with 2 decimal places
        setConversionTime(timeTaken);
        
        toast({
          title: "Conversion Successful",
          description: `Image converted to ${targetFormat.toUpperCase()} format in ${timeTaken}s`,
        });
      }
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
  
  // Download the converted image
  const handleDownload = () => {
    if (!convertedImage || !uploadedFile) return;
    
    const link = document.createElement('a');
    link.href = convertedImage.url;
    link.download = `${uploadedFile.name.split('.')[0]}.${formats?.target || 'png'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download started",
      description: "Your converted image is being downloaded",
    });
  };
  
  // Clear the current image and reset state
  const handleReset = () => {
    if (uploadedFile) {
      URL.revokeObjectURL(URL.createObjectURL(uploadedFile));
    }
    
    if (convertedImage) {
      URL.revokeObjectURL(convertedImage.url);
    }
    
    setUploadedFile(null);
    setConvertedImage(null);
    setConversionProgress(0);
    setConversionTime(null);
    
    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  // Drag event handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  // Trigger file upload dialog
  const triggerFileInput = () => {
    fileInputRef.current?.click();
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
          <p className="text-muted-foreground max-w-xl mx-auto">
            Upload your {formats.source.toUpperCase()} image and we'll convert it to {formats.target.toUpperCase()} format
            with the highest quality and smallest file size.
          </p>
        </div>
      )}
      
      {/* File upload area */}
      {!uploadedFile ? (
        <Card
          ref={dropAreaRef}
          className={cn(
            "border-2 border-dashed p-12 text-center transition-all duration-200 glass-card",
            isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-background/80"
          )}
          onDragOver={handleDragOver}
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
              Drag and Drop Your Image Here
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              or click to browse your files
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
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
              Choose File
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Original image */}
          <Card className="p-6 glass-card">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <File size={16} aria-hidden="true" />
                <h3 className="font-medium">Original {formats?.source.toUpperCase()}</h3>
              </div>
              <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                {(uploadedFile.size / 1024).toFixed(1)} KB
              </span>
            </div>
            
            <div className="relative border border-border rounded-md aspect-square flex items-center justify-center overflow-hidden mb-4">
              {uploadedFile && (
                <img
                  src={URL.createObjectURL(uploadedFile)}
                  alt={`Original ${formats?.source.toUpperCase()} image`}
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>
            
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={handleReset} 
                className="w-full"
                aria-label="Upload a different image"
              >
                Upload Different Image
              </Button>
            </div>
          </Card>
          
          {/* Converted image */}
          <Card className="p-6 glass-card">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <ImageIcon size={16} aria-hidden="true" />
                <h3 className="font-medium">Converted {formats?.target.toUpperCase()}</h3>
              </div>
              {convertedImage && (
                <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                  {(convertedImage.blob.size / 1024).toFixed(1)} KB
                </span>
              )}
            </div>
            
            <div className="relative border border-border rounded-md aspect-square flex items-center justify-center overflow-hidden mb-4">
              {isConverting ? (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <RefreshCw size={32} className="animate-spin mb-2" aria-hidden="true" />
                  <p>Converting... {Math.round(conversionProgress)}%</p>
                </div>
              ) : convertedImage ? (
                <img
                  src={convertedImage.url}
                  alt={`Converted ${formats?.target.toUpperCase()} image`}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="flex items-center justify-center text-muted-foreground">
                  <p>Waiting for conversion...</p>
                </div>
              )}
            </div>
            
            {conversionTime !== null && convertedImage && (
              <p className="text-xs text-muted-foreground text-center mb-2">
                Converted in {conversionTime} seconds • Size reduction: {' '}
                {uploadedFile && convertedImage ? (
                  (100 - (convertedImage.blob.size / uploadedFile.size * 100)).toFixed(1) + '%'
                ) : '0%'}
              </p>
            )}
            
            <div className="text-center">
              <Button 
                onClick={handleDownload} 
                className="w-full"
                disabled={!convertedImage || isConverting}
                aria-label={`Download converted ${formats?.target.toUpperCase()} image`}
              >
                <Download size={16} className="mr-2" aria-hidden="true" />
                Download
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
