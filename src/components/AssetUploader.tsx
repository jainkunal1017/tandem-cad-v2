
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Upload } from "lucide-react";

interface AssetUploaderProps {
  projectId: string;
}

const AssetUploader = ({ projectId }: AssetUploaderProps) => {
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
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Assets</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center ${
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
            or click to browse for CAD files, FEA results, or documentation
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
            onChange={handleFileInputChange}
            className="hidden"
          />
        </div>
        
        {uploadedFiles.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Uploaded files ({uploadedFiles.length})</h4>
            <ul className="text-sm space-y-1 max-h-40 overflow-y-auto">
              {uploadedFiles.map((file, index) => (
                <li key={index} className="p-2 bg-muted/50 rounded flex items-center">
                  <span className="truncate">{file}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Supported formats: CAD (STEP, IGES, STL), documents (PDF, DOCX), and images
      </CardFooter>
    </Card>
  );
};

export default AssetUploader;
