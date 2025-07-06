
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserSectionProps {
  collapsed: boolean;
  onToggle: () => void;
  displayName: string;
  avatarUrl?: string;
  avatarFallback: string;
}

const UserSection = ({ collapsed, onToggle, displayName, avatarUrl, avatarFallback }: UserSectionProps) => {
  return (
    <div className={cn("px-4 py-4 flex-shrink-0", collapsed && "px-2")}>
      {collapsed ? (
        <div className="flex flex-col items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={avatarUrl} alt="User Avatar" />
            <AvatarFallback className="bg-green-500 text-white text-xs">{avatarFallback}</AvatarFallback>
          </Avatar>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggle} 
            className="h-8 w-8 hover:bg-accent/50"
          >
            <PanelLeftOpen className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 p-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={avatarUrl} alt="User Avatar" />
              <AvatarFallback className="bg-green-500 text-white text-xs">{avatarFallback}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left">
              <div className="text-sm font-medium">{displayName}</div>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onToggle} 
            className="h-8 w-8 hover:bg-accent/50"
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserSection;
