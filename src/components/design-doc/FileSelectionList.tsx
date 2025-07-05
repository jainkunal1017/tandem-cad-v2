
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AssetFile } from "@/types/file";

interface FileSelectionListProps {
  files: AssetFile[];
  selectedFiles: string[];
  onToggleSelection: (fileId: string) => void;
}

const FileSelectionList = ({ files, selectedFiles, onToggleSelection }: FileSelectionListProps) => {
  return (
    <ScrollArea className="max-h-[120px] overflow-y-auto pr-2">
      {files.map(file => (
        <div key={file.id} className="flex items-center space-x-2 py-1.5">
          <Checkbox 
            id={file.id} 
            checked={selectedFiles.includes(file.id)}
            onCheckedChange={() => onToggleSelection(file.id)}
          />
          <Label htmlFor={file.id} className="text-sm font-normal cursor-pointer">{file.name}</Label>
        </div>
      ))}
    </ScrollArea>
  );
};

export default FileSelectionList;
