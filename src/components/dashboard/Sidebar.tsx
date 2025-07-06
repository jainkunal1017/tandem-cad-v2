
import { LayoutDashboard, Edit3, Settings, Book, Users, LifeBuoy, ChevronDown, PanelLeftClose, PanelLeftOpen, LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const DashboardSidebar = ({
  collapsed,
  onToggle
}: DashboardSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch user profile data
  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      
      return data;
    },
    enabled: !!user?.id,
  });

  const mainNavItems = [{
    to: '/dashboard',
    icon: LayoutDashboard,
    label: 'Overview'
  }, {
    to: '/editor',
    icon: Edit3,
    label: 'Doc Studio'
  }, {
    to: '/settings',
    icon: Settings,
    label: 'Settings'
  }];

  const footerItems = [{
    to: '/documentation',
    icon: Book,
    label: 'Documentation'
  }, {
    to: '/invite',
    icon: Users,
    label: 'Invite Members'
  }, {
    to: '/support',
    icon: LifeBuoy,
    label: 'Support'
  }];

  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem('tandem-auth');
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/");
  };

  const NavLink = ({
    to,
    icon: Icon,
    label,
    isFooter = false
  }: {
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
          isActive ? 'bg-accent/80 text-accent-foreground' : 'text-muted-foreground',
          collapsed ? 'justify-center px-2' : 'w-full',
          isFooter && 'text-sm'
        )}
      >
        <Icon className="h-5 w-5 shrink-0" />
        {!collapsed && <span className="truncate">{label}</span>}
      </Link>
    );
  };

  // Get display name and avatar
  const displayName = profile?.username || profile?.first_name || user?.email?.split('@')[0] || 'User';
  const avatarUrl = profile?.avatar_url;
  const avatarFallback = profile?.first_name?.[0] || profile?.username?.[0] || user?.email?.[0]?.toUpperCase() || 'U';

  return (
    <div 
      className={cn(
        'transition-all duration-300 ease-in-out flex flex-col h-full bg-[#F4F4F5]',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* User Section - Fixed at top */}
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-auto p-0 hover:bg-accent/50 rounded-lg">
                  <div className="flex items-center gap-3 p-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={avatarUrl} alt="User Avatar" />
                      <AvatarFallback className="bg-green-500 text-white text-xs">{avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium">{displayName}</div>
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

      {/* Main Navigation - Scrollable */}
      <nav className={cn("flex flex-col space-y-1 py-2 flex-1 overflow-y-auto", collapsed ? "px-1" : "px-2")}>
        {mainNavItems.map(item => (
          <NavLink key={item.to} to={item.to} icon={item.icon} label={item.label} />
        ))}
      </nav>
      
      {/* Footer Navigation - Fixed at bottom */}
      <div className={cn("py-4 space-y-1 flex-shrink-0 border-t border-border/40", collapsed ? "px-1" : "px-2")}>
        {footerItems.map(item => (
          <NavLink key={item.to} to={item.to} icon={item.icon} label={item.label} isFooter={true} />
        ))}
        
        {/* Profile Button */}
        {collapsed ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/profile')}
            className="h-10 w-10 text-muted-foreground hover:text-accent-foreground hover:bg-accent/50"
          >
            <User className="h-5 w-5" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            onClick={() => navigate('/profile')}
            className="w-full justify-start text-muted-foreground hover:text-accent-foreground hover:bg-accent/50 px-3 py-2 h-auto font-medium text-sm"
          >
            <User className="h-5 w-5 shrink-0 mr-3" />
            <span className="truncate">Profile</span>
          </Button>
        )}
        
        {/* Logout Button */}
        {collapsed ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
            className="h-10 w-10 text-muted-foreground hover:text-accent-foreground hover:bg-accent/50"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-muted-foreground hover:text-accent-foreground hover:bg-accent/50 px-3 py-2 h-auto font-medium text-sm"
          >
            <LogOut className="h-5 w-5 shrink-0 mr-3" />
            <span className="truncate">Log out</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
