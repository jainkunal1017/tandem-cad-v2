
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, PenTool } from 'lucide-react';
import CadIntegrationModal from './CadIntegrationModal';
import CadLaunchConfirmModal from './CadLaunchConfirmModal';

interface ActionCardsProps {
  onTandemAssistantClick: () => void;
}

const ActionCards = ({ onTandemAssistantClick }: ActionCardsProps) => {
  const [cadIntegrationModalOpen, setCadIntegrationModalOpen] = useState(false);
  const [cadLaunchConfirmModalOpen, setCadLaunchConfirmModalOpen] = useState(false);
  
  // Mock state - in real app this would come from user settings/preferences
  const [isCADConnected] = useState(false); // Set to true to test the confirmation flow
  const [connectedCAD] = useState('SOLIDWORKS'); // The connected CAD software

  const handleDesignInTandemClick = () => {
    if (!isCADConnected) {
      // User hasn't connected CAD software yet
      setCadIntegrationModalOpen(true);
    } else {
      // User has connected CAD software, show confirmation
      setCadLaunchConfirmModalOpen(true);
    }
  };

  return (
    <>
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white h-16 flex items-center">
          <h1 className="text-lg font-medium text-gray-900">Doc Studio</h1>
        </div>
        
        {/* Cards Container */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="grid grid-cols-2 gap-8 max-w-2xl w-full">
            {/* Design Session Card */}
            <Card 
              className="border border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all duration-200 cursor-pointer bg-white rounded-xl"
              onClick={handleDesignInTandemClick}
            >
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded">
                      <PenTool className="h-5 w-5 text-gray-600" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-900">Design in Tandem</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Capture your design intent in flow while you are designing in CAD. Click to open SOLIDWORKS.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Create a Tandem Doc Card */}
            <Card 
              className="border border-gray-200 hover:bg-gray-50 hover:shadow-md transition-all duration-200 cursor-pointer bg-white rounded-xl"
              onClick={onTandemAssistantClick}
            >
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded">
                      <Brain className="h-5 w-5 text-gray-600" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-900">Tandem Assistant</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">Chat with Tandem about your designs and select files to create Diffs, Contextual Design Docs.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CAD Integration Modal */}
      <CadIntegrationModal 
        open={cadIntegrationModalOpen} 
        onOpenChange={setCadIntegrationModalOpen} 
      />

      {/* CAD Launch Confirmation Modal */}
      <CadLaunchConfirmModal 
        open={cadLaunchConfirmModalOpen} 
        onOpenChange={setCadLaunchConfirmModalOpen}
        cadSoftware={connectedCAD}
      />
    </>
  );
};

export default ActionCards;
