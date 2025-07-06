
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
    'cad-models', 
    'cad-models/exports',
    'documentation',
    'analysis'
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
    // drone-gimbal-assembly folder files
    'design-intent.md',
    'prd.md', 
    'bom.csv',
    // cad-models folder files
    'base_mount.SLDPRT',
    'gimbal_arm.SLDPRT',
    'motor_housing.SLDPRT',
    'camera_plate.SLDPRT',
    'yaw_axis.SLDASM',
    'fasteners_library.SLDPRT',
    // cad-models/exports folder files
    'gimbal_arm.STEP',
    'yaw_axis.IGES',
    // documentation folder files
    'manufacturing-notes.md',
    'assembly-instructions.pdf',
    'compliance-checklist.md',
    'revision-history.md',
    // analysis folder files
    'tolerance-analysis.xlsx',
    'qa-inspection-sheet.xlsx',
    'fea-summary.pdf'
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
                level={folder.includes('/') ? 1 : 0}
              />
            ))}
            
            {/* drone-gimbal-assembly files */}
            <FileItem 
              icon={FileText} 
              name="design-intent.md" 
              iconColor="text-blue-500" 
              fileId="design-intent.md"
              mode={mode}
              selectedFiles={selectedFiles}
              onFileToggle={handleFileToggle}
            />
            <FileItem 
              icon={FileText} 
              name="prd.md" 
              iconColor="text-blue-500" 
              fileId="prd.md"
              mode={mode}
              selectedFiles={selectedFiles}
              onFileToggle={handleFileToggle}
            />
            <FileItem 
              icon={File} 
              name="bom.csv" 
              iconColor="text-green-500" 
              fileId="bom.csv"
              mode={mode}
              selectedFiles={selectedFiles}
              onFileToggle={handleFileToggle}
            />
            
            {/* CAD model files */}
            <FileItem 
              icon={Code} 
              name="base_mount.SLDPRT" 
              iconColor="text-purple-600" 
              fileId="base_mount.SLDPRT"
              mode={mode}
              selectedFiles={selectedFiles}
              onFileToggle={handleFileToggle}
              level={1}
            />
            <FileItem 
              icon={Code} 
              name="gimbal_arm.SLDPRT" 
              iconColor="text-purple-600" 
              fileId="gimbal_arm.SLDPRT"
              mode={mode}
              selectedFiles={selectedFiles}
              onFileToggle={handleFileToggle}
              level={1}
            />
            <FileItem 
              icon={Code} 
              name="motor_housing.SLDPRT" 
              iconColor="text-purple-600" 
              fileId="motor_housing.SLDPRT"
              mode={mode}
              selectedFiles={selectedFiles}
              onFileToggle={handleFileToggle}
              level={1}
            />
            <FileItem 
              icon={Code} 
              name="camera_plate.SLDPRT" 
              iconColor="text-purple-600" 
              fileId="camera_plate.SLDPRT"
              mode={mode}
              selectedFiles={selectedFiles}
              onFileToggle={handleFileToggle}
              level={1}
            />
            <FileItem 
              icon={Code} 
              name="yaw_axis.SLDASM" 
              iconColor="text-indigo-600" 
              fileId="yaw_axis.SLDASM"
              mode={mode}
              selectedFiles={selectedFiles}
              onFileToggle={handleFileToggle}
              level={1}
            />
            <FileItem 
              icon={Code} 
              name="fasteners_library.SLDPRT" 
              iconColor="text-purple-600" 
              fileId="fasteners_library.SLDPRT"
              mode={mode}
              selectedFiles={selectedFiles}
              onFileToggle={handleFileToggle}
              level={1}
            />
            
            {/* CAD exports */}
            <FileItem 
              icon={File} 
              name="gimbal_arm.STEP" 
              iconColor="text-orange-500" 
              fileId="gimbal_arm.STEP"
              mode={mode}
              selectedFiles={selectedFiles}
              onFileToggle={handleFileToggle}
              level={2}
            />
            <FileItem 
              icon={File} 
              name="yaw_axis.IGES" 
              iconColor="text-orange-500" 
              fileId="yaw_axis.IGES"
              mode={mode}
              selectedFiles={selectedFiles}
              onFileToggle={handleFileToggle}
              level={2}
            />
            
            {/* Documentation files */}
            <FileItem 
              icon={FileText} 
              name="manufacturing-notes.md" 
              iconColor="text-blue-500" 
              fileId="manufacturing-notes.md"
              mode={mode}
              selectedFiles={selectedFiles}
              onFileToggle={handleFileToggle}
              level={1}
            />
            <FileItem 
              icon={File} 
              name="assembly-instructions.pdf" 
              iconColor="text-red-500" 
              fileId="assembly-instructions.pdf"
              mode={mode}
              selectedFiles={selectedFiles}
              onFileToggle={handleFileToggle}
              level={1}
            />
            <FileItem 
              icon={FileText} 
              name="compliance-checklist.md" 
              iconColor="text-blue-500" 
              fileId="compliance-checklist.md"
              mode={mode}
              selectedFiles={selectedFiles}
              onFileToggle={handleFileToggle}
              level={1}
            />
            <FileItem 
              icon={FileText} 
              name="revision-history.md" 
              iconColor="text-blue-500" 
              fileId="revision-history.md"
              mode={mode}
              selectedFiles={selectedFiles}
              onFileToggle={handleFileToggle}
              level={1}
            />
            
            {/* Analysis files */}
            <FileItem 
              icon={File} 
              name="tolerance-analysis.xlsx" 
              iconColor="text-green-600" 
              fileId="tolerance-analysis.xlsx"
              mode={mode}
              selectedFiles={selectedFiles}
              onFileToggle={handleFileToggle}
              level={1}
            />
            <FileItem 
              icon={File} 
              name="qa-inspection-sheet.xlsx" 
              iconColor="text-green-600" 
              fileId="qa-inspection-sheet.xlsx"
              mode={mode}
              selectedFiles={selectedFiles}
              onFileToggle={handleFileToggle}
              level={1}
            />
            <FileItem 
              icon={File} 
              name="fea-summary.pdf" 
              iconColor="text-red-500" 
              fileId="fea-summary.pdf"
              mode={mode}
              selectedFiles={selectedFiles}
              onFileToggle={handleFileToggle}
              level={1}
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
