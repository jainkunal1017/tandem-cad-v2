
import { useState } from 'react';
import { FileText, Code, File } from 'lucide-react';
import FileUploadModal from './FileUploadModal';
import FileBrowserHeader from './FileBrowserHeader';
import FolderItem from './FolderItem';
import FileItem from './FileItem';
import { DocStudioMode } from '@/pages/DocStudio';

interface FileBrowserProps {
  mode?: DocStudioMode;
  selectedFiles?: string[];
  onFileSelection?: (fileIds: string[]) => void;
}

const FileBrowser = ({ mode = 'default', selectedFiles = [], onFileSelection }: FileBrowserProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [searchOpen, setSearchOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [folders, setFolders] = useState([
    'api-reference',
    'essentials', 
    'images',
    'logo',
    'snippets'
  ]);
  const [editingFolder, setEditingFolder] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState('');

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const handleCreateFolder = () => {
    const newFolderId = `new-folder-${Date.now()}`;
    setFolders([...folders, newFolderId]);
    setEditingFolder(newFolderId);
    setNewFolderName('New Folder');
  };

  const handleFolderNameSubmit = (folderId: string) => {
    if (newFolderName.trim()) {
      setFolders(folders.map(f => f === folderId ? newFolderName.trim() : f));
    } else {
      setFolders(folders.filter(f => f !== folderId));
    }
    setEditingFolder(null);
    setNewFolderName('');
  };

  const handleFileToggle = (fileId: string) => {
    if (!onFileSelection) return;
    
    const newSelected = selectedFiles.includes(fileId)
      ? selectedFiles.filter(id => id !== fileId)
      : [...selectedFiles, fileId];
    
    onFileSelection(newSelected);
  };

  const allFiles = [
    ...folders,
    'README.md',
    'development.mdx',
    'docs.json',
    'favicon.svg',
    'index.mdx',
    'quickstart.mdx'
  ];

  return (
    <div className="h-full bg-white flex flex-col min-h-0">
      {/* Header - Fixed at top */}
      <div className="flex-shrink-0">
        <FileBrowserHeader
          mode={mode}
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
          onCreateFolder={handleCreateFolder}
          onUploadFiles={() => setUploadModalOpen(true)}
          allFiles={allFiles}
        />
      </div>

      {/* Files Section - Scrollable content */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="py-1">
          <div className="space-y-0">
            {/* Folders */}
            {folders.map((folder) => (
              <FolderItem 
                key={folder} 
                name={folder} 
                folderId={folder}
                isExpanded={expandedFolders.has(folder)}
                onToggleFolder={toggleFolder}
                editingFolder={editingFolder}
                newFolderName={newFolderName}
                setNewFolderName={setNewFolderName}
                onFolderNameSubmit={handleFolderNameSubmit}
              />
            ))}
            
            {/* Files - same files in both modes */}
            <FileItem 
              icon={FileText} 
              name="README.md" 
              iconColor="text-orange-500" 
              fileId="README.md"
              mode={mode}
              selectedFiles={selectedFiles}
              onFileToggle={handleFileToggle}
            />
            <FileItem 
              icon={FileText} 
              name="development.mdx" 
              iconColor="text-orange-500" 
              fileId="development.mdx"
              mode={mode}
              selectedFiles={selectedFiles}
              onFileToggle={handleFileToggle}
            />
            <FileItem 
              icon={Code} 
              name="docs.json" 
              iconColor="text-blue-600" 
              fileId="docs.json"
              mode={mode}
              selectedFiles={selectedFiles}
              onFileToggle={handleFileToggle}
            />
            <FileItem 
              icon={File} 
              name="favicon.svg" 
              iconColor="text-red-500" 
              fileId="favicon.svg"
              mode={mode}
              selectedFiles={selectedFiles}
              onFileToggle={handleFileToggle}
            />
            <FileItem 
              icon={FileText} 
              name="index.mdx" 
              iconColor="text-orange-500" 
              fileId="index.mdx"
              mode={mode}
              selectedFiles={selectedFiles}
              onFileToggle={handleFileToggle}
            />
            <FileItem 
              icon={FileText} 
              name="quickstart.mdx" 
              iconColor="text-orange-500" 
              fileId="quickstart.mdx"
              mode={mode}
              selectedFiles={selectedFiles}
              onFileToggle={handleFileToggle}
            />
          </div>
        </div>
      </div>

      {/* File Upload Modal */}
      <FileUploadModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} />
    </div>
  );
};

export default FileBrowser;
