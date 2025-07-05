
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Search, FolderPlus, Upload, FileText } from 'lucide-react';
import { DocStudioMode } from '@/pages/DocStudio';

interface FileBrowserHeaderProps {
  mode: DocStudioMode;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  onCreateFolder: () => void;
  onUploadFiles: () => void;
  allFiles: string[];
}

const FileBrowserHeader = ({
  mode,
  searchOpen,
  setSearchOpen,
  onCreateFolder,
  onUploadFiles,
  allFiles
}: FileBrowserHeaderProps) => {
  return (
    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between h-16">
      <h2 className="text-lg font-medium text-gray-900">Files</h2>
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
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onCreateFolder}>
          <FolderPlus className="h-4 w-4" strokeWidth={1.5} />
        </Button>

        {/* Upload Files */}
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onUploadFiles}>
          <Upload className="h-4 w-4" strokeWidth={1.5} />
        </Button>
      </div>
    </div>
  );
};

export default FileBrowserHeader;
