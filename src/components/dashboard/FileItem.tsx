
import { ChevronRight } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { DocStudioMode } from '@/pages/DocStudio';

interface FileItemProps {
  icon: any;
  name: string;
  level?: number;
  iconColor?: string;
  fileId?: string;
  mode?: DocStudioMode;
  selectedFiles?: string[];
  onFileToggle?: (fileId: string) => void;
}

const FileItem = ({ 
  icon: Icon, 
  name, 
  level = 0, 
  iconColor = "text-gray-500",
  fileId,
  mode = 'default',
  selectedFiles = [],
  onFileToggle
}: FileItemProps) => (
  <div className={`flex items-center justify-between px-3 py-1 text-sm hover:bg-gray-50 cursor-pointer`} style={{ paddingLeft: `${12 + level * 16}px` }}>
    <div className="flex items-center gap-2">
      {mode === 'assistant' && fileId && onFileToggle && (
        <Checkbox
          checked={selectedFiles.includes(fileId)}
          onCheckedChange={() => onFileToggle(fileId)}
          className="mr-1"
        />
      )}
      <Icon className={`h-4 w-4 ${iconColor}`} strokeWidth={1.5} />
      <span className="text-gray-700 text-sm">{name}</span>
    </div>
    {mode === 'default' && <ChevronRight className="h-4 w-4 text-gray-400 mr-2" strokeWidth={1.5} />}
  </div>
);

export default FileItem;
