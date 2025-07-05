
import { ChevronDown, ChevronRight, Folder, FileText, Code, File, Search, FolderPlus, Upload } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Checkbox } from '@/components/ui/checkbox';
import FileUploadModal from './FileUploadModal';
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

  const FileItem = ({ 
    icon: Icon, 
    name, 
    level = 0, 
    iconColor = "text-gray-500",
    fileId 
  }: { 
    icon: any, 
    name: string, 
    level?: number, 
    iconColor?: string,
    fileId?: string
  }) => (
    <div className={`flex items-center justify-between px-3 py-1 text-sm hover:bg-gray-50 cursor-pointer`} style={{ paddingLeft: `${12 + level * 16}px` }}>
      <div className="flex items-center gap-2">
        {mode === 'assistant' && fileId && (
          <Checkbox
            checked={selectedFiles.includes(fileId)}
            onCheckedChange={() => handleFileToggle(fileId)}
            className="mr-1"
          />
        )}
        <Icon className={`h-4 w-4 ${iconColor}`} strokeWidth={1.5} />
        <span className="text-gray-700 text-sm">{name}</span>
      </div>
      {mode === 'default' && <ChevronRight className="h-4 w-4 text-gray-400 mr-2" strokeWidth={1.5} />}
    </div>
  );

  const FolderItem = ({ name, folderId, level = 0 }: { 
    name: string, 
    folderId: string, 
    level?: number 
  }) => {
    const isExpanded = expandedFolders.has(folderId);
    const isEditing = editingFolder === folderId;
    
    return (
      <div>
        <div
          className={`flex items-center gap-2 px-3 py-1 text-sm hover:bg-gray-50 cursor-pointer`}
          style={{ paddingLeft: `${12 + level * 16}px` }}
          onClick={() => !isEditing && toggleFolder(folderId)}
        >
          {isExpanded ? <ChevronDown className="h-4 w-4 text-gray-400" strokeWidth={1.5} /> : <ChevronRight className="h-4 w-4 text-gray-400" strokeWidth={1.5} />}
          <Folder className="h-4 w-4 text-blue-500" strokeWidth={1.5} />
          {isEditing ? (
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onBlur={() => handleFolderNameSubmit(folderId)}
              onKeyDown={(e) => e.key === 'Enter' && handleFolderNameSubmit(folderId)}
              className="text-sm bg-transparent border-none outline-none"
              autoFocus
            />
          ) : (
            <span className="text-gray-700 text-sm">{name}</span>
          )}
        </div>
      </div>
    );
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
    <div className="h-full bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between h-16">
        <h2 className="text-lg font-medium text-gray-900">Files</h2>
        {mode === 'default' && (
          <div className="flex items-center gap-1">
            {/* Search Files */}
            <Popover open={searchOpen} onOpenChange={setSearchOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Search className="h-4 w-4" strokeWidth={1.5} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <Command>
                  <CommandInput placeholder="Search files..." />
                  <CommandList>
                    <CommandEmpty>No files found.</CommandEmpty>
                    <CommandGroup heading="Files">
                      {allFiles.map((file) => (
                        <CommandItem key={file} onSelect={() => setSearchOpen(false)}>
                          <FileText className="mr-2 h-4 w-4" />
                          <span>{file}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {/* Create New Folder */}
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCreateFolder}>
              <FolderPlus className="h-4 w-4" strokeWidth={1.5} />
            </Button>

            {/* Upload Files */}
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setUploadModalOpen(true)}>
              <Upload className="h-4 w-4" strokeWidth={1.5} />
            </Button>
          </div>
        )}
      </div>

      {/* Files Section */}
      <div className="py-1">
        <div className="space-y-0">
          {/* Folders */}
          {folders.map((folder) => (
            <FolderItem key={folder} name={folder} folderId={folder} />
          ))}
          
          {/* Files - same files in both modes */}
          <FileItem icon={FileText} name="README.md" iconColor="text-orange-500" fileId="README.md" />
          <FileItem icon={FileText} name="development.mdx" iconColor="text-orange-500" fileId="development.mdx" />
          <FileItem icon={Code} name="docs.json" iconColor="text-blue-600" fileId="docs.json" />
          <FileItem icon={File} name="favicon.svg" iconColor="text-red-500" fileId="favicon.svg" />
          <FileItem icon={FileText} name="index.mdx" iconColor="text-orange-500" fileId="index.mdx" />
          <FileItem icon={FileText} name="quickstart.mdx" iconColor="text-orange-500" fileId="quickstart.mdx" />
        </div>
      </div>

      {/* File Upload Modal */}
      <FileUploadModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} />
    </div>
  );
};

export default FileBrowser;
