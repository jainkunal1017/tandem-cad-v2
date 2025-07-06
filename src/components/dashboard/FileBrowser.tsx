
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
    'drone-gimbal-assembly',
    'drone-gimbal-assembly/cad-models', 
    'drone-gimbal-assembly/cad-models/exports',
    'drone-gimbal-assembly/documentation',
    'drone-gimbal-assembly/analysis'
  ]);
  const [editingFolder, setEditingFolder] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState('');

  // Organize files by their parent folders
  const fileStructure = {
    'drone-gimbal-assembly': [
      { name: 'design-intent.md', icon: FileText, color: 'text-blue-500' },
      { name: 'prd.md', icon: FileText, color: 'text-blue-500' },
      { name: 'bom.csv', icon: File, color: 'text-green-500' }
    ],
    'drone-gimbal-assembly/cad-models': [
      { name: 'base_mount.SLDPRT', icon: Code, color: 'text-purple-600' },
      { name: 'gimbal_arm.SLDPRT', icon: Code, color: 'text-purple-600' },
      { name: 'motor_housing.SLDPRT', icon: Code, color: 'text-purple-600' },
      { name: 'camera_plate.SLDPRT', icon: Code, color: 'text-purple-600' },
      { name: 'yaw_axis.SLDASM', icon: Code, color: 'text-indigo-600' },
      { name: 'fasteners_library.SLDPRT', icon: Code, color: 'text-purple-600' }
    ],
    'drone-gimbal-assembly/cad-models/exports': [
      { name: 'gimbal_arm.STEP', icon: File, color: 'text-orange-500' },
      { name: 'yaw_axis.IGES', icon: File, color: 'text-orange-500' }
    ],
    'drone-gimbal-assembly/documentation': [
      { name: 'manufacturing-notes.md', icon: FileText, color: 'text-blue-500' },
      { name: 'assembly-instructions.pdf', icon: File, color: 'text-red-500' },
      { name: 'compliance-checklist.md', icon: FileText, color: 'text-blue-500' },
      { name: 'revision-history.md', icon: FileText, color: 'text-blue-500' }
    ],
    'drone-gimbal-assembly/analysis': [
      { name: 'tolerance-analysis.xlsx', icon: File, color: 'text-green-600' },
      { name: 'qa-inspection-sheet.xlsx', icon: File, color: 'text-green-600' },
      { name: 'fea-summary.pdf', icon: File, color: 'text-red-500' }
    ]
  };

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

  // Get all files for search
  const allFiles = [
    ...folders,
    ...Object.values(fileStructure).flat().map(file => file.name)
  ];

  // Render folder and its contents recursively
  const renderFolderContent = (folderPath: string, level: number = 0) => {
    const isExpanded = expandedFolders.has(folderPath);
    const folderFiles = fileStructure[folderPath as keyof typeof fileStructure] || [];
    
    return (
      <div key={folderPath}>
        <FolderItem 
          name={folderPath} 
          folderId={folderPath}
          level={level}
          isExpanded={isExpanded}
          onToggleFolder={toggleFolder}
          editingFolder={editingFolder}
          newFolderName={newFolderName}
          setNewFolderName={setNewFolderName}
          onFolderNameSubmit={handleFolderNameSubmit}
        />
        
        {isExpanded && (
          <div>
            {/* Render child folders */}
            {folders
              .filter(f => f.startsWith(folderPath + '/') && f !== folderPath)
              .filter(f => f.split('/').length === folderPath.split('/').length + 1)
              .map(childFolder => renderFolderContent(childFolder, level + 1))}
            
            {/* Render files in this folder */}
            {folderFiles.map((file) => (
              <FileItem 
                key={file.name}
                icon={file.icon} 
                name={file.name} 
                iconColor={file.color} 
                fileId={file.name}
                mode={mode}
                selectedFiles={selectedFiles}
                onFileToggle={handleFileToggle}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  // Get root level folders (drone-gimbal-assembly only)
  const rootFolders = folders.filter(folder => !folder.includes('/'));

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
            {rootFolders.map(folder => renderFolderContent(folder, 0))}
          </div>
        </div>
      </div>

      {/* File Upload Modal */}
      <FileUploadModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} />
    </div>
  );
};

export default FileBrowser;
