
import { useState } from 'react';
import { ChevronDown, ChevronRight, Folder } from 'lucide-react';

interface FolderItemProps {
  name: string;
  folderId: string;
  level?: number;
  isExpanded: boolean;
  onToggleFolder: (folderId: string) => void;
  editingFolder: string | null;
  newFolderName: string;
  setNewFolderName: (name: string) => void;
  onFolderNameSubmit: (folderId: string) => void;
}

const FolderItem = ({ 
  name, 
  folderId, 
  level = 0,
  isExpanded,
  onToggleFolder,
  editingFolder,
  newFolderName,
  setNewFolderName,
  onFolderNameSubmit
}: FolderItemProps) => {
  const isEditing = editingFolder === folderId;
  const displayName = name.includes('/') ? name.split('/').pop() : name;
  const folderLevel = name.split('/').length - 1;
  
  return (
    <div>
      <div
        className={`flex items-center gap-2 px-3 py-1 text-sm hover:bg-gray-50 cursor-pointer`}
        style={{ paddingLeft: `${12 + folderLevel * 16}px` }}
        onClick={() => !isEditing && onToggleFolder(folderId)}
      >
        {isExpanded ? <ChevronDown className="h-4 w-4 text-gray-400" strokeWidth={1.5} /> : <ChevronRight className="h-4 w-4 text-gray-400" strokeWidth={1.5} />}
        <Folder className="h-4 w-4 text-blue-500" strokeWidth={1.5} />
        {isEditing ? (
          <input
            type="text"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onBlur={() => onFolderNameSubmit(folderId)}
            onKeyDown={(e) => e.key === 'Enter' && onFolderNameSubmit(folderId)}
            className="text-sm bg-transparent border-none outline-none"
            autoFocus
          />
        ) : (
          <span className="text-gray-700 text-sm">{displayName}</span>
        )}
      </div>
    </div>
  );
};

export default FolderItem;
