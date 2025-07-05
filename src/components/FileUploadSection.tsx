import { useState, useRef, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Upload, FileText, Check, X } from "lucide-react";
import { AssetFile } from "@/types/file";
import { formatBytes } from "@/lib/utils";

interface FileUploadSectionProps {
  title: string;
  description: string;
  acceptedFileTypes: string;
  fileTypeDescriptions: string;
  mockFiles?: AssetFile[];
  headerButton?: ReactNode;
}

const FileUploadSection = ({
  title,
  description,
  acceptedFileTypes,
  fileTypeDescriptions,
  mockFiles = [],
  headerButton
}: FileUploadSectionProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };
  
  const handleFiles = (files: FileList) => {
    setIsUploading(true);
    
    // Mock file upload process
    const fileNames = Array.from(files).map(file => file.name);
    
    setTimeout(() => {
      setUploadedFiles(prev => [...prev, ...fileNames]);
      setIsUploading(false);
      toast.success(`${files.length} file(s) uploaded successfully`);
    }, 1500);
  };
  
  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  // Create a merged list of files that shows both the mock files and any newly uploaded files
  const allFiles = [
    ...mockFiles,
    ...uploadedFiles.map((name, index) => ({
      id: `uploaded-${index}`,
      name,
      type: name.split('.').pop() || '',
      size: Math.floor(Math.random() * 5000000),
      dateUploaded: new Date().toISOString().split('T')[0],
      uploadedBy: "Current User"
    }))
  ];
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">{title}</CardTitle>
        {headerButton && <div>{headerButton}</div>}
      </CardHeader>
      <CardContent>
        <div
          className={`border border-dashed rounded-lg p-6 text-center w-full ${
            isDragging ? 'border-primary bg-primary/5' : 'border-border'
          } transition-colors`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="font-medium mb-1">Drag & drop files here</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {description}
          </p>
          <Button 
            onClick={handleBrowseClick}
            disabled={isUploading}
            variant="outline"
          >
            {isUploading ? 'Uploading...' : 'Browse Files'}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={acceptedFileTypes}
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
        
        {allFiles.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Files ({allFiles.length})</h4>
            <div className="text-sm space-y-1 max-h-60 overflow-y-auto">
              {allFiles.map((file) => (
                <div 
                  key={file.id} 
                  className="p-3 bg-muted/50 rounded flex items-center justify-between hover:bg-muted"
                >
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <div>
                      <span className="font-medium">{file.name}</span>
                      <div className="text-xs text-muted-foreground flex flex-wrap gap-x-2">
                        <span>{formatBytes(file.size)}</span>
                        <span>• {file.dateUploaded}</span>
                        <span>• {file.uploadedBy}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mt-3 text-xs text-muted-foreground">
          {fileTypeDescriptions}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUploadSection;
