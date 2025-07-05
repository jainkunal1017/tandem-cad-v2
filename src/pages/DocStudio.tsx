
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
    <div className="h-screen flex bg-white">
      {/* File Browser - Left Side */}
      <div className="w-64 border-r border-gray-200 bg-white">
        <FileBrowser 
          mode={mode}
          selectedFiles={selectedFiles}
          onFileSelection={handleFileSelection}
        />
      </div>
      
      {/* Main Content - Right Side */}
      <div className="flex-1 bg-white">
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
