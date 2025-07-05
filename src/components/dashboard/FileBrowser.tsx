
import { Folder, FileText, Image, Code } from 'lucide-react';

const filesData = [
  { name: 'api-reference', type: 'folder' },
  { name: 'essentials', type: 'folder' },
  { name: 'images', type: 'folder' },
  { name: 'logo', type: 'folder' },
  { name: 'snippets', type: 'folder' },
  { name: 'README.md', type: 'markdown' },
  { name: 'development.mdx', type: 'mdx' },
  { name: 'docs.json', type: 'json' },
  { name: 'favicon.svg', type: 'svg' },
  { name: 'index.mdx', type: 'mdx' },
  { name: 'quickstart.mdx', type: 'mdx' }
];

const getFileIcon = (type: string) => {
  switch (type) {
    case 'folder':
      return <Folder className="w-4 h-4 text-blue-500" />;
    case 'markdown':
    case 'mdx':
      return <FileText className="w-4 h-4 text-orange-500" />;
    case 'json':
      return <Code className="w-4 h-4 text-yellow-500" />;
    case 'svg':
      return <Image className="w-4 h-4 text-green-500" />;
    default:
      return <FileText className="w-4 h-4 text-gray-500" />;
  }
};

const FileBrowser = () => {
  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="font-semibold text-gray-900 dark:text-gray-100">Files</h2>
      </div>
      <div className="p-2">
        {filesData.map((file, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
          >
            {getFileIcon(file.type)}
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {file.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileBrowser;
