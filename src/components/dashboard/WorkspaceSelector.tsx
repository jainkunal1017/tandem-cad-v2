
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkspaceSelectorProps {
  collapsed: boolean;
}

const WorkspaceSelector = ({ collapsed }: WorkspaceSelectorProps) => {
  if (collapsed) {
    return null; // Hide workspace selector when collapsed
  }

  return (
    <div className="px-2 pb-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-full justify-between h-auto p-2 hover:bg-accent/50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="text-sm font-medium">Workspace</div>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuItem>
            Switch Workspace
          </DropdownMenuItem>
          <DropdownMenuItem>
            Create New Workspace
          </DropdownMenuItem>
          <DropdownMenuItem>
            Workspace Settings
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default WorkspaceSelector;
