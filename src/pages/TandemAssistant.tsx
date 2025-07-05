
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import FileBrowser from '@/components/dashboard/FileBrowser';

const TandemAssistant = () => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [chatMessage, setChatMessage] = useState('');

  const handleFileSelect = (fileName: string) => {
    setSelectedFiles(prev => 
      prev.includes(fileName) 
        ? prev.filter(f => f !== fileName)
        : [...prev, fileName]
    );
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Handle chat message submission
      console.log('Sending message:', chatMessage);
      setChatMessage('');
    }
  };

  return (
    <div className="h-screen flex bg-white">
      {/* File Browser - Left Side */}
      <div className="w-64 border-r border-gray-200 bg-white">
        <FileBrowser />
      </div>
      
      {/* Main Content - Right Side */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-white h-16 flex items-center">
          <h1 className="text-lg font-medium text-gray-900">Studio: Tandem Assistant</h1>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 flex flex-col">
          {/* File Selection Area */}
          <div className="flex-1 p-6">
            <div className="space-y-6">
              {/* Parts & Assemblies Section */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Parts & Assemblies</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="battery-housing"
                      className="rounded border-gray-300"
                      onChange={() => handleFileSelect('battery-housing.stp')}
                    />
                    <label htmlFor="battery-housing" className="text-sm text-gray-600">
                      📄 battery-housing.stp
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="cooling-plate"
                      className="rounded border-gray-300"
                      onChange={() => handleFileSelect('cooling-plate-v2.sldprt')}
                    />
                    <label htmlFor="cooling-plate" className="text-sm text-gray-600">
                      📄 cooling-plate-v2.sldprt
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="cell-module"
                      className="rounded border-gray-300"
                      onChange={() => handleFileSelect('cell-module-assembly.asm')}
                    />
                    <label htmlFor="cell-module" className="text-sm text-gray-600">
                      📄 cell-module-assembly.asm
                    </label>
                  </div>
                </div>
              </div>

              {/* Context Files Section */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Context Files</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="thermal-requirements"
                      className="rounded border-gray-300"
                      onChange={() => handleFileSelect('thermal-requirements.pdf')}
                    />
                    <label htmlFor="thermal-requirements" className="text-sm text-gray-600">
                      📄 thermal-requirements.pdf
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="material-specs"
                      className="rounded border-gray-300"
                      onChange={() => handleFileSelect('material-specifications.docx')}
                    />
                    <label htmlFor="material-specs" className="text-sm text-gray-600">
                      📄 material-specifications.docx
                    </label>
                  </div>
                </div>
              </div>

              {/* CAD Transcript Section */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">CAD Transcript</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="housing-edit"
                      className="rounded border-gray-300"
                      onChange={() => handleFileSelect('housing-edit-session.swp')}
                    />
                    <label htmlFor="housing-edit" className="text-sm text-gray-600">
                      📄 housing-edit-session.swp
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="assembly-changes"
                      className="rounded border-gray-300"
                      onChange={() => handleFileSelect('assembly-changes.vba')}
                    />
                    <label htmlFor="assembly-changes" className="text-sm text-gray-600">
                      📄 assembly-changes.vba
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="design-history"
                      className="rounded border-gray-300"
                      onChange={() => handleFileSelect('design-history.csv')}
                    />
                    <label htmlFor="design-history" className="text-sm text-gray-600">
                      📄 design-history.csv
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Chat Interface at Bottom */}
          <div className="border-t border-gray-200 bg-gray-50 p-4">
            <div className="text-center text-sm text-gray-600 mb-4">
              Start chatting with your technical files.
            </div>
            <div className="flex gap-2">
              <Input
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask about your selected files..."
                className="flex-1"
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TandemAssistant;
