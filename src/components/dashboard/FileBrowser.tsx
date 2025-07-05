
import { ChevronDown, ChevronRight, Folder, FileText, Code, File } from 'lucide-react';
import { useState } from 'react';

const FileBrowser = () => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const FileItem = ({ icon: Icon, name, level = 0, iconColor = "text-gray-500" }: { 
    icon: any, 
    name: string, 
    level?: number, 
    iconColor?: string 
  }) => (
    <div className={`flex items-center justify-between px-3 py-1 text-sm hover:bg-gray-50 cursor-pointer`} style={{ paddingLeft: `${12 + level * 16}px` }}>
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${iconColor}`} strokeWidth={1.5} />
        <span className="text-gray-700 text-sm">{name}</span>
      </div>
      <ChevronRight className="h-4 w-4 text-gray-400 mr-2" strokeWidth={1.5} />
    </div>
  );

  const FolderItem = ({ name, folderId, level = 0 }: { 
    name: string, 
    folderId: string, 
    level?: number 
  }) => {
    const isExpanded = expandedFolders.has(folderId);
    
    return (
      <div
        className={`flex items-center gap-2 px-3 py-1 text-sm hover:bg-gray-50 cursor-pointer`}
        style={{ paddingLeft: `${12 + level * 16}px` }}
        onClick={() => toggleFolder(folderId)}
      >
        {isExpanded ? <ChevronDown className="h-4 w-4 text-gray-400" strokeWidth={1.5} /> : <ChevronRight className="h-4 w-4 text-gray-400" strokeWidth={1.5} />}
        <Folder className="h-4 w-4 text-blue-500" strokeWidth={1.5} />
        <span className="text-gray-700 text-sm">{name}</span>
      </div>
    );
  };

  return (
    <div className="h-full bg-white">
      {/* Header */}
      <div className="px-3 py-3 border-b border-gray-200">
        <h2 className="text-sm font-medium text-gray-900">Files</h2>
      </div>

      {/* Files Section */}
      <div className="py-1">
        <div className="space-y-0">
          {/* Folders */}
          <FolderItem name="api-reference" folderId="api-reference" />
          <FolderItem name="essentials" folderId="essentials" />
          <FolderItem name="images" folderId="images" />
          <FolderItem name="logo" folderId="logo" />
          <FolderItem name="snippets" folderId="snippets" />
          
          {/* Files */}
          <FileItem icon={FileText} name="README.md" iconColor="text-orange-500" />
          <FileItem icon={FileText} name="development.mdx" iconColor="text-orange-500" />
          <FileItem icon={Code} name="docs.json" iconColor="text-blue-600" />
          <FileItem icon={File} name="favicon.svg" iconColor="text-red-500" />
          <FileItem icon={FileText} name="index.mdx" iconColor="text-orange-500" />
          <FileItem icon={FileText} name="quickstart.mdx" iconColor="text-orange-500" />
        </div>
      </div>
    </div>
  );
};

export default FileBrowser;
