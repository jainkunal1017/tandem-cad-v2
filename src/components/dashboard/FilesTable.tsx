
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, FileText, Folder, Image, Code, Download } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const filesData = [
  {
    name: 'api-reference',
    type: 'folder',
    size: '-',
    modified: '2 days ago',
    status: 'Active'
  },
  {
    name: 'essentials',
    type: 'folder', 
    size: '-',
    modified: '1 week ago',
    status: 'Active'
  },
  {
    name: 'images',
    type: 'folder',
    size: '-',
    modified: '3 days ago',
    status: 'Active'
  },
  {
    name: 'logo',
    type: 'folder',
    size: '-',
    modified: '1 month ago',
    status: 'Archived'
  },
  {
    name: 'snippets',
    type: 'folder',
    size: '-',
    modified: '5 days ago',
    status: 'Active'
  },
  {
    name: 'README.md',
    type: 'markdown',
    size: '2.4 KB',
    modified: '1 day ago',
    status: 'Active'
  },
  {
    name: 'development.mdx',
    type: 'mdx',
    size: '8.1 KB',
    modified: '3 hours ago',
    status: 'Draft'
  },
  {
    name: 'docs.json',
    type: 'json',
    size: '1.2 KB',
    modified: '2 days ago',
    status: 'Active'
  },
  {
    name: 'favicon.svg',
    type: 'svg',
    size: '892 B',
    modified: '1 week ago',
    status: 'Active'
  },
  {
    name: 'index.mdx',
    type: 'mdx',
    size: '3.7 KB',
    modified: '6 hours ago',
    status: 'Active'
  },
  {
    name: 'quickstart.mdx',
    type: 'mdx',
    size: '5.3 KB',
    modified: '1 day ago',
    status: 'Active'
  }
];

const getFileIcon = (type: string) => {
  switch (type) {
    case 'folder':
      return <Folder className="w-4 h-4 text-blue-500" />;
    case 'markdown':
    case 'mdx':
      return <FileText className="w-4 h-4 text-green-500" />;
    case 'json':
      return <Code className="w-4 h-4 text-yellow-500" />;
    case 'svg':
      return <Image className="w-4 h-4 text-purple-500" />;
    default:
      return <FileText className="w-4 h-4 text-gray-500" />;
  }
};

const getStatusBadge = (status: string) => {
  const variants = {
    'Active': 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
    'Draft': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    'Archived': 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
  };
  
  return (
    <Badge variant="secondary" className={variants[status as keyof typeof variants]}>
      {status}
    </Badge>
  );
};

const FilesTable = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Files</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Modified
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filesData.map((file, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.type)}
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {file.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {file.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {file.modified}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(file.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <DropdownMenuItem>
                          <FileText className="w-4 h-4 mr-2" />
                          Open
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 dark:text-red-400">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilesTable;
