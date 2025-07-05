
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ConnectPdmModal from './ConnectPdmModal';

const DashboardTopBar = () => {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  return (
    <>
      <div className="h-14 bg-sidebar flex items-center justify-between px-6">
        {/* Left side placeholder for potential future content */}
        <div></div>
        
        {/* Right side with the connect button */}
        <Button 
          onClick={() => setIsConnectModalOpen(true)}
          className="bg-green-600 text-white hover:bg-green-700"
        >
          Things to do
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
