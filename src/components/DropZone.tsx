import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileImage } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface DropZoneProps {
  onFilesAccepted: (files: File[]) => void;
  isProcessing: boolean;
  progress: number;
  className?: string;
  maxFiles?: number;
  accept?: Record<string, string[]>;
}

export function DropZone({
  onFilesAccepted,
  isProcessing,
  progress,
  className,
  maxFiles = 50, // Increased to 50 files
  accept = {
    'image/*': []
  }
}: DropZoneProps) {
  const [files, setFiles] = useState<File[]>([]);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Limit to maxFiles
    const newFiles = [...files, ...acceptedFiles].slice(0, maxFiles);
    setFiles(newFiles);
    onFilesAccepted(newFiles);
  }, [files, onFilesAccepted, maxFiles]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    disabled: isProcessing,
    maxFiles,
    maxSize: 10485760, // 10MB max file size
  });
  
  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFilesAccepted(newFiles);
  };
  
  const clearFiles = () => {
    setFiles([]);
    onFilesAccepted([]);
  };
  
  return (
    <div className={cn("space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/50",
          isProcessing && "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
          <h3 className="font-medium text-lg">Drag & drop your images here</h3>
          <p className="text-sm text-muted-foreground">
            or click to select files (up to 50 images, 10MB each)
          </p>
          {files.length > 0 && (
            <p className="text-sm font-medium mt-2">
              {files.length} {files.length === 1 ? 'file' : 'files'} selected
            </p>
          )}
        </div>
      </div>
      
      {isProcessing && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-center text-muted-foreground">
            Processing {files.length} {files.length === 1 ? 'image' : 'images'}... {Math.round(progress)}%
          </p>
        </div>
      )}
      
      {files.length > 0 && !isProcessing && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-medium">Selected Files ({files.length})</h4>
            <Button variant="outline" size="sm" onClick={clearFiles}>
              Clear All
            </Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-60 overflow-y-auto p-1">
            {files.map((file, index) => (
              <div key={`${file.name}-${index}`} className="relative group">
                <div className="border rounded-md p-2 flex flex-col items-center text-center bg-card">
                  <FileImage className="h-8 w-8 text-muted-foreground mb-1" />
                  <span className="text-xs truncate w-full" title={file.name}>
                    {file.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(0)} KB
                  </span>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  className="h-5 w-5 absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 