
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  CheckCircle2, 
  Star, 
  Archive, 
  Bell, 
  Settings, 
  LifeBuoy,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import SidebarLink from './SidebarLink';
import { Button } from './ui/button';
import LogoutButton from './LogoutButton';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  // Simulated approval and notification counts - would come from API in real app
  const [approvalCount] = useState(3);
  const [notificationCount] = useState(5);

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/shared', icon: Users, label: 'Shared with Me' },
    { to: '/activity', icon: Activity, label: 'Recent Activity' },
    { to: '/approvals', icon: CheckCircle2, label: 'Approvals', badgeCount: approvalCount },
    { to: '/favorites', icon: Star, label: 'Favorites' },
    { to: '/archive', icon: Archive, label: 'Archive' },
    { to: '/notifications', icon: Bell, label: 'Notifications', badgeCount: notificationCount },
    { to: '/settings', icon: Settings, label: 'Settings' },
    { to: '/help', icon: LifeBuoy, label: 'Help & Feedback' },
  ];

  return (
    <div 
      className={cn(
        'border-r border-border bg-sidebar transition-all duration-300 ease-in-out flex flex-col',
        collapsed ? 'w-16' : 'w-56'
      )}
    >
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
        <Button 
          variant="ghost" 
          size="sm" 
          className={cn("p-1", collapsed && "ml-auto")}
          onClick={onToggle} 
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <nav className="flex flex-col space-y-1 px-2 py-4 flex-1">
        {navItems.map((item) => (
          <SidebarLink
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            collapsed={collapsed}
            badgeCount={item.badgeCount}
          />
        ))}
      </nav>
      
      {/* Add logout at the bottom of sidebar */}
      <div className="mt-auto border-t border-border px-2 py-4">
        {collapsed ? (
          <SidebarLink
            to="/"
            icon={LogOut}
            label="Log out"
            collapsed={true}
          />
        ) : (
          <LogoutButton />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
