
import { ChevronDown, ChevronRight, Folder, FileText, Code, File } from 'lucide-react';
import { useState } from 'react';

const FileBrowser = () => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['root']));

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const FileItem = ({ icon: Icon, name, level = 0, color = "text-gray-600" }: { icon: any, name: string, level?: number, color?: string }) => (
    <div className={`flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-gray-50 cursor-pointer`} style={{ paddingLeft: `${12 + level * 16}px` }}>
      <Icon className={`h-4 w-4 ${color}`} />
      <span className="text-gray-800 text-sm">{name}</span>
    </div>
  );

  const FolderItem = ({ name, children, folderId, level = 0 }: { name: string, children?: React.ReactNode, folderId: string, level?: number }) => {
    const isExpanded = expandedFolders.has(folderId);
    
    return (
      <div>
        <div 
          className={`flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-gray-50 cursor-pointer`}
          style={{ paddingLeft: `${12 + level * 16}px` }}
          onClick={() => toggleFolder(folderId)}
        >
          {isExpanded ? <ChevronDown className="h-4 w-4 text-gray-400" /> : <ChevronRight className="h-4 w-4 text-gray-400" />}
          <Folder className="h-4 w-4 text-gray-500" />
          <span className="text-gray-800 text-sm">{name}</span>
        </div>
        {isExpanded && children}
      </div>
    );
  };

  return (
    <div className="h-full bg-white">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-100">
        <h2 className="text-sm font-medium text-gray-900">Files</h2>
      </div>

      {/* Files Section */}
      <div className="py-2">
        <div className="space-y-0">
          <FolderItem name="api-reference" folderId="api-reference" />
          <FolderItem name="essentials" folderId="essentials" />
          <FolderItem name="images" folderId="images" />
          <FolderItem name="logo" folderId="logo" />
          <FolderItem name="snippets" folderId="snippets" />
          
          <FileItem icon={File} name="README.md" color="text-orange-500" />
          <FileItem icon={File} name="development.mdx" color="text-orange-500" />
          <FileItem icon={Code} name="docs.json" color="text-blue-500" />
          <FileItem icon={File} name="favicon.svg" color="text-red-500" />
          <FileItem icon={File} name="index.mdx" color="text-orange-500" />
          <FileItem icon={File} name="quickstart.mdx" color="text-orange-500" />
        </div>
      </div>
    </div>
  );
};

export default FileBrowser;
