
import { ChevronDown, ChevronRight, Folder, FileText, Image, Code, Settings } from 'lucide-react';
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

  const FileItem = ({ icon: Icon, name, level = 0 }: { icon: any, name: string, level?: number }) => (
    <div className={`flex items-center gap-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer`} style={{ paddingLeft: `${12 + level * 16}px` }}>
      <Icon className="h-4 w-4 text-gray-500" />
      <span>{name}</span>
    </div>
  );

  const FolderItem = ({ name, children, folderId, level = 0 }: { name: string, children?: React.ReactNode, folderId: string, level?: number }) => {
    const isExpanded = expandedFolders.has(folderId);
    
    return (
      <div>
        <div 
          className={`flex items-center gap-2 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer`}
          style={{ paddingLeft: `${12 + level * 16}px` }}
          onClick={() => toggleFolder(folderId)}
        >
          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          <Folder className="h-4 w-4 text-gray-500" />
          <span>{name}</span>
        </div>
        {isExpanded && children}
      </div>
    );
  };

  return (
    <div className="h-full">
      {/* Header */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>main</span>
          </div>
          <span>•</span>
          <span>Updated 1 month ago</span>
        </div>
      </div>

      {/* Files Section */}
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Files</h3>
        
        <div className="space-y-1">
          <FolderItem name="api-reference" folderId="api-reference" />
          <FolderItem name="essentials" folderId="essentials" />
          <FolderItem name="images" folderId="images" />
          <FolderItem name="logo" folderId="logo" />
          <FolderItem name="snippets" folderId="snippets" />
          
          <FileItem icon={FileText} name="README.md" />
          <FileItem icon={FileText} name="development.mdx" />
          <FileItem icon={Code} name="docs.json" />
          <FileItem icon={Settings} name="favicon.svg" />
          <FileItem icon={FileText} name="index.mdx" />
          <FileItem icon={FileText} name="quickstart.mdx" />
        </div>
      </div>
    </div>
  );
};

export default FileBrowser;
