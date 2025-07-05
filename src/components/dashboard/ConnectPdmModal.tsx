
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plug, Folder } from 'lucide-react';

interface ConnectPdmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConnectPdmModal = ({ open, onOpenChange }: ConnectPdmModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plug className="w-5 h-5" />
            Connect PDM / File Manager
          </DialogTitle>
          <DialogDescription>
            Connect your Product Data Management system or file manager to automatically sync CAD files and design data.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Folder className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-medium">SolidWorks PDM</div>
              <div className="text-sm text-muted-foreground">Connect to SolidWorks PDM Professional</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
            <div className="p-2 bg-green-100 rounded-lg">
              <Folder className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="font-medium">File System</div>
              <div className="text-sm text-muted-foreground">Connect to local or network file system</div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            Coming Soon
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectPdmModal;
