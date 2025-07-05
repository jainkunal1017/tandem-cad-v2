
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, Plug, File } from 'lucide-react';
import { useRef } from 'react';

interface FileUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FileUploadModal = ({ open, onOpenChange }: FileUploadModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLocalUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      console.log('Files selected:', Array.from(files).map(f => f.name));
      // Handle file upload logic here
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Files
          </DialogTitle>
          <DialogDescription>
            Choose how you'd like to upload files to your project.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div 
            className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
            onClick={handleLocalUpload}
          >
            <div className="p-2 bg-blue-100 rounded-lg">
              <File className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-medium">Upload from Computer</div>
              <div className="text-sm text-muted-foreground">Select files from your local computer</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
            <div className="p-2 bg-green-100 rounded-lg">
              <Plug className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="font-medium">Connect PDM / File Manager</div>
              <div className="text-sm text-muted-foreground">Connect to SolidWorks PDM or file system</div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept=".step,.iges,.stl,.pdf,.docx,.png,.jpg,.jpeg"
        />
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadModal;
