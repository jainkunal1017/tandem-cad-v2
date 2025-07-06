
import { useState } from 'react';
import { ChevronDown, ChevronRight, Folder, Edit, Trash2 } from 'lucide-react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

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
  onDeleteFolder?: (folderId: string) => void;
  onRenameFolder?: (folderId: string) => void;
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
  onFolderNameSubmit,
  onDeleteFolder,
  onRenameFolder
}: FolderItemProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const isEditing = editingFolder === folderId;
  // For nested folders, show only the last part of the path
  const displayName = name.includes('/') ? name.split('/').pop() : name;
  
  const handleRename = () => {
    onRenameFolder?.(folderId);
  };

  const handleDelete = () => {
    setShowDeleteAlert(true);
  };

  const confirmDelete = () => {
    onDeleteFolder?.(folderId);
    setShowDeleteAlert(false);
  };

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div
            className={`flex items-center gap-2 px-3 py-1 text-sm hover:bg-gray-50 cursor-pointer`}
            style={{ paddingLeft: `${12 + level * 16}px` }}
            onClick={() => !isEditing && onToggleFolder(folderId)}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-gray-400" strokeWidth={1.5} />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-400" strokeWidth={1.5} />
            )}
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
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={handleRename}>
            <Edit className="mr-2 h-4 w-4" />
            Rename
          </ContextMenuItem>
          <ContextMenuItem onClick={handleDelete} className="text-red-600">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Folder</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{displayName}"? This action cannot be undone and will also delete all files and subfolders within it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default FolderItem;
