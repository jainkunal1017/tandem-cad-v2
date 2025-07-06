
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Settings, ExternalLink } from 'lucide-react';

interface CadIntegrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CadIntegrationModal = ({ open, onOpenChange }: CadIntegrationModalProps) => {
  const handleConnectSolidworks = () => {
    // This would typically open a connection flow or download installer
    console.log('Connecting to SOLIDWORKS...');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Connect CAD Software
          </DialogTitle>
          <DialogDescription>
            To use "Design in Tandem", you need to connect a supported CAD tool first.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div 
            className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
            onClick={handleConnectSolidworks}
          >
            <div className="p-2 bg-blue-100 rounded-lg">
              <ExternalLink className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-medium">SOLIDWORKS</div>
              <div className="text-sm text-muted-foreground">Connect to SOLIDWORKS with Tandem macro</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-4 border rounded-lg opacity-50 cursor-not-allowed">
            <div className="p-2 bg-gray-100 rounded-lg">
              <ExternalLink className="w-5 h-5 text-gray-400" />
            </div>
            <div>
              <div className="font-medium text-gray-400">Fusion 360</div>
              <div className="text-sm text-muted-foreground">Coming Soon</div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CadIntegrationModal;
