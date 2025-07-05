
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ConnectPdmModal from './ConnectPdmModal';

const DashboardTopBar = () => {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  return (
    <>
      <div className="h-14 border-b border-border bg-background flex items-center justify-end px-6">
        <Button 
          onClick={() => setIsConnectModalOpen(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Connect PDM / File Manager
        </Button>
      </div>
      
      <ConnectPdmModal 
        open={isConnectModalOpen} 
        onOpenChange={setIsConnectModalOpen} 
      />
    </>
  );
};

export default DashboardTopBar;
