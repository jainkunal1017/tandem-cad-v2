
import { useState } from 'react';
import FileBrowser from '@/components/dashboard/FileBrowser';
import ActionCards from '@/components/dashboard/ActionCards';
import TandemAssistantView from '@/components/dashboard/TandemAssistantView';

export type DocStudioMode = 'default' | 'assistant';

const DocStudio = () => {
  const [mode, setMode] = useState<DocStudioMode>('default');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const handleModeChange = (newMode: DocStudioMode) => {
    setMode(newMode);
    if (newMode === 'default') {
      setSelectedFiles([]);
    }
  };

  const handleFileSelection = (fileIds: string[]) => {
    setSelectedFiles(fileIds);
  };

  return (
    <div className="h-full flex bg-white overflow-hidden">
      {/* File Browser - Left Side with independent scrolling */}
      <div className="w-64 border-r border-gray-200 bg-white flex-shrink-0 flex flex-col min-h-0">
        <FileBrowser 
          mode={mode}
          selectedFiles={selectedFiles}
          onFileSelection={handleFileSelection}
        />
      </div>
      
      {/* Main Content - Right Side with independent scrolling */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {mode === 'default' ? (
          <ActionCards onTandemAssistantClick={() => handleModeChange('assistant')} />
        ) : (
          <TandemAssistantView 
            selectedFiles={selectedFiles}
            onBackToStudio={() => handleModeChange('default')}
          />
        )}
      </div>
    </div>
  );
};

export default DocStudio;
