
import { 
  LayoutDashboard, 
  Edit3, 
  Settings,
  Book,
  Users,
  LifeBuoy,
  ChevronDown,
  PanelLeftClose
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const DashboardSidebar = ({ collapsed, onToggle }: DashboardSidebarProps) => {
  const location = useLocation();
  
  const mainNavItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { to: '/editor', icon: Edit3, label: 'Editor' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  const footerItems = [
    { to: '/documentation', icon: Book, label: 'Documentation' },
    { to: '/invite', icon: Users, label: 'Invite Members' },
    { to: '/support', icon: LifeBuoy, label: 'Support' },
  ];

  const NavLink = ({ to, icon: Icon, label, isFooter = false }: { 
    to: string; 
    icon: any; 
    label: string; 
    isFooter?: boolean;
  }) => {
    const isActive = location.pathname === to;
    
    return (
      <Link
        to={to}
        className={cn(
          'group relative flex items-center gap-x-3 px-3 py-2 rounded-md font-medium transition-all',
          'hover:bg-accent hover:text-accent-foreground',
          isActive 
            ? 'bg-accent/80 text-accent-foreground' 
            : 'text-muted-foreground',
          collapsed ? 'justify-center' : 'w-full',
          isFooter && 'text-sm'
        )}
      >
        <Icon className="h-5 w-5 shrink-0" />
        {!collapsed && <span className="truncate">{label}</span>}
      </Link>
    );
  };

  return (
    <div 
      className={cn(
        'transition-all duration-300 ease-in-out flex flex-col h-full',
        collapsed ? 'w-16' : 'w-64'
      )}
      style={{ backgroundColor: '#F4F4F5' }}
    >
      {/* Header with Logo */}
      <div className="p-4 flex items-center justify-between">
        {collapsed ? (
          <img 
            src="/lovable-uploads/1b27103c-6057-451b-8485-9e865676ad9e.png" 
            alt="Tandem Symbol" 
            className="h-8 w-8"
          />
        ) : (
          <img 
            src="/lovable-uploads/bc95c9da-5321-45c2-971f-cfd7ef79f1e6.png" 
            alt="Tandem Logo" 
            className="h-8"
          />
        )}
      </div>

      {/* User Section */}
      <div className="px-4 pb-4">
        {collapsed ? (
          <div className="flex justify-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/lovable-uploads/fe8e1f7d-4e8e-4272-947e-1b5714b77511.png" alt="User Avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-auto p-0 hover:bg-accent/50 rounded-lg">
                  <div className="flex items-center gap-3 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/lovable-uploads/fe8e1f7d-4e8e-4272-947e-1b5714b77511.png" alt="User Avatar" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium">dreamslab</div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </div>
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

      {/* Main Navigation */}
      <nav className="flex flex-col space-y-1 px-2 py-2 flex-1">
        {mainNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </nav>
      
      {/* Footer Navigation */}
      <div className="px-2 py-4 space-y-1">
        {footerItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            isFooter={true}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardSidebar;
