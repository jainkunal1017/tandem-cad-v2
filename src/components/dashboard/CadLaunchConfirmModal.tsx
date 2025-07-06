
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Rocket, AlertCircle } from 'lucide-react';

interface CadLaunchConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  cadSoftware: string;
}

const CadLaunchConfirmModal = ({ open, onOpenChange, cadSoftware }: CadLaunchConfirmModalProps) => {
  const handleLaunch = () => {
    // This would launch the CAD software with Tandem's context-aware layer
    console.log(`Launching ${cadSoftware} with Tandem's context-aware layer...`);
    onOpenChange(false);
    // Show success toast or redirect to CAD interface
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Rocket className="w-5 h-5" />
            Launch CAD Tool
          </DialogTitle>
          <DialogDescription>
            Launch {cadSoftware} with Tandem's context-aware layer active?
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-blue-900 mb-1">What happens next:</p>
              <ul className="text-blue-800 space-y-1">
                <li>• {cadSoftware} will open with Tandem integration active</li>
                <li>• Your design actions will be automatically captured</li>
                <li>• Design intent will be recorded for documentation</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleLaunch}>
            Launch {cadSoftware}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CadLaunchConfirmModal;
